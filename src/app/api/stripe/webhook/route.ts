import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = headers()
  const sig = headersList.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  const supabase = createServerSupabaseClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session

        // Extract metadata
        const campaignId = session.metadata?.campaignId
        const quantity = parseInt(session.metadata?.quantity || '0')
        const customerEmail = session.metadata?.customerEmail || session.customer_email
        const originalPrice = parseFloat(session.metadata?.originalPrice || '0')
        const discountApplied = session.metadata?.discountApplied === 'true'

        if (!campaignId || !quantity || !customerEmail) {
          console.error('Missing required metadata in session:', session.id)
          break
        }

        // Create order record
        const { error: orderError } = await supabase
          .from('orders')
          .insert([{
            campaign_id: campaignId,
            customer_email: customerEmail,
            quantity: quantity,
            amount: session.amount_total! / 100, // Convert from cents
            shared_status: false, // Will be updated when user shares
            payment_status: 'completed',
            stripe_payment_id: session.payment_intent as string,
          }] as any)

        if (orderError) {
          console.error('Error creating order:', orderError)
          break
        }

        // Update campaign current quantity  
        const { error: updateError } = await (supabase as any).rpc('increment_campaign_quantity', {
          campaign_id: campaignId,
          quantity_to_add: quantity
        })

        if (updateError) {
          console.error('Error updating campaign quantity:', updateError)
          
          // Fallback: Manual update
          const { data: campaign } = await supabase
            .from('campaigns')
            .select('current_quantity')
            .eq('id', campaignId)
            .single()

          if (campaign) {
            await (supabase as any)
              .from('campaigns')
              .update({ 
                current_quantity: (campaign as any).current_quantity + quantity 
              })
              .eq('id', campaignId)
          }
        }

        // Check if campaign reached target
        const { data: updatedCampaign } = await supabase
          .from('campaigns')
          .select('current_quantity, target_quantity')
          .eq('id', campaignId)
          .single()

        if (updatedCampaign && 
            (updatedCampaign as any).current_quantity >= (updatedCampaign as any).target_quantity) {
          // Mark campaign as completed
          await (supabase as any)
            .from('campaigns')
            .update({ status: 'completed' })
            .eq('id', campaignId)
        }

        console.log(`Order processed successfully for campaign ${campaignId}`)
        break

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Update order status to failed if exists
        if (paymentIntent.id) {
          await (supabase as any)
            .from('orders')
            .update({ payment_status: 'failed' })
            .eq('stripe_payment_id', paymentIntent.id)
        }
        
        console.log(`Payment failed for intent: ${paymentIntent.id}`)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}