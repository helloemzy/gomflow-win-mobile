import { NextRequest, NextResponse } from 'next/server'
import { stripe, formatAmountForStripe, isStripeConfigured } from '@/lib/stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json(
        { error: 'Payment system is not configured. This is a demo deployment.' },
        { status: 503 }
      )
    }

    const { campaignId, quantity } = await request.json()

    if (!campaignId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Invalid campaign ID or quantity' },
        { status: 400 }
      )
    }

    // Get campaign details from Supabase
    const supabase = createServerSupabaseClient()
    
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .select(`
        *,
        influencers (
          email,
          tiktok_handle,
          commission_rate
        )
      `)
      .eq('id', campaignId)
      .eq('status', 'active')
      .single()

    if (campaignError || !campaign) {
      return NextResponse.json(
        { error: 'Campaign not found or inactive' },
        { status: 404 }
      )
    }

    // Calculate pricing with potential discounts
    const basePrice = (campaign as any).price_per_kg * quantity
    let finalPrice = basePrice
    let discountApplied = false

    // Apply discount based on current progress
    const currentQuantity = (campaign as any).current_quantity
    const totalAfterOrder = currentQuantity + quantity

    if (totalAfterOrder >= (campaign as any).discount_threshold_2) {
      finalPrice = basePrice * 0.8 // 20% discount
      discountApplied = true
    } else if (totalAfterOrder >= (campaign as any).discount_threshold_1) {
      finalPrice = basePrice * 0.9 // 10% discount  
      discountApplied = true
    }

    // Get user email for the checkout session
    const { data: { user } } = await supabase.auth.getUser()
    const customerEmail = user?.email

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'idr',
            product_data: {
              name: `${(campaign as any).coffee_product} - Group Buying Campaign`,
              description: `Premium Indonesian coffee from ${(campaign as any).influencers?.tiktok_handle || 'verified influencer'}. Quantity: ${quantity}kg`,
              images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og/campaign/${campaignId}`],
            },
            unit_amount: formatAmountForStripe(finalPrice / quantity), // Price per kg in cents
          },
          quantity: quantity,
        },
      ],
      metadata: {
        campaignId: campaignId,
        quantity: quantity.toString(),
        originalPrice: basePrice.toString(),
        discountApplied: discountApplied.toString(),
        customerEmail: customerEmail || '',
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/campaigns/${campaignId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/campaigns/${campaignId}?canceled=true`,
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    })

    return NextResponse.json({ sessionId: session.id })
    
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}