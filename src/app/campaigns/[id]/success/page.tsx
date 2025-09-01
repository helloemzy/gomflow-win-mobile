import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatPrice } from '@/lib/stripe'
import Link from 'next/link'

interface SuccessPageProps {
  params: { id: string }
  searchParams: { session_id?: string }
}

export default async function SuccessPage({ params, searchParams }: SuccessPageProps) {
  const supabase = createServerSupabaseClient()

  // Get campaign details
  const { data: campaign } = await supabase
    .from('campaigns')
    .select(`
      *,
      influencers (
        tiktok_handle
      )
    `)
    .eq('id', params.id)
    .single()

  // Get the order if session_id is provided
  let order = null
  if (searchParams.session_id) {
    // In a real app, you'd verify the session with Stripe
    // For now, get the most recent order for this campaign
    const { data: recentOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('campaign_id', params.id)
      .eq('payment_status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    order = recentOrder
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-green-600">
            Welcome to the {(campaign as any)?.coffee_product} group buy!
          </p>
        </div>

        {/* Order Details */}
        {order && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-amber-900 mb-4">Order Confirmation</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-amber-700">Campaign:</span>
                <span className="font-medium text-amber-900">{(campaign as any)?.coffee_product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Quantity:</span>
                <span className="font-medium text-amber-900">{(order as any).quantity} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Amount Paid:</span>
                <span className="font-medium text-amber-900">{formatPrice((order as any).amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Order Email:</span>
                <span className="font-medium text-amber-900">{(order as any).customer_email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-amber-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">What Happens Next?</h2>
          <div className="text-left space-y-3 text-amber-700">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs font-bold text-amber-800 mr-3 mt-0.5">
                1
              </div>
              <div>
                <div className="font-medium text-amber-800">Share & Unlock Discounts</div>
                <div className="text-sm">Share this campaign with friends to unlock group discounts for everyone!</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs font-bold text-amber-800 mr-3 mt-0.5">
                2
              </div>
              <div>
                <div className="font-medium text-amber-800">Campaign Completion</div>
                <div className="text-sm">We'll process orders once the campaign reaches its goal or deadline.</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs font-bold text-amber-800 mr-3 mt-0.5">
                3
              </div>
              <div>
                <div className="font-medium text-amber-800">Coffee Delivery</div>
                <div className="text-sm">Fresh coffee will be roasted and delivered within 7-14 days.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-purple-600 text-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Help Your Friends Save Too! ☕</h2>
          <p className="text-purple-200 mb-4">
            Share this campaign and help everyone unlock better group discounts.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium transition-colors">
              Share on WhatsApp
            </button>
            <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Copy Link
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link 
            href={`/campaigns/${params.id}`}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            View Campaign
          </Link>
          <Link 
            href="/campaigns"
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Browse More Campaigns
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 text-sm text-amber-600">
          <p>Need help? Contact our support team via WhatsApp or email.</p>
          <p className="mt-1">Order confirmation has been sent to your email address.</p>
        </div>
      </div>
    </main>
  )
}