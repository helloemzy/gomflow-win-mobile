import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import CheckoutButton from '@/components/stripe/CheckoutButton'
import ShareButtons from '@/components/share/ShareButtons'
import { isStripeConfigured, formatPrice } from '@/lib/stripe'

interface CampaignPageProps {
  params: { id: string }
  searchParams: { canceled?: string }
}

export default async function CampaignPage({ params, searchParams }: CampaignPageProps) {
  const supabase = createServerSupabaseClient()

  // Get campaign with influencer details
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      *,
      influencers (
        email,
        tiktok_handle,
        commission_rate
      )
    `)
    .eq('id', params.id)
    .single()

  if (error || !campaign) {
    notFound()
  }

  // Get orders count for social proof
  const { data: orders } = await supabase
    .from('orders')
    .select('quantity')
    .eq('campaign_id', params.id)
    .eq('payment_status', 'completed')

  const totalOrders = orders?.length || 0
  const progressPercent = Math.min(((campaign as any).current_quantity / (campaign as any).target_quantity) * 100, 100)
  const timeLeft = new Date((campaign as any).deadline).getTime() - Date.now()
  const daysLeft = Math.max(0, Math.ceil(timeLeft / (1000 * 60 * 60 * 24)))

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            {(campaign as any).coffee_product}
          </h1>
          <p className="text-xl text-amber-700 mb-2">
            Group Buying Campaign by @{(campaign as any).influencers?.tiktok_handle || 'verified influencer'}
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-amber-600">
            <span>⏰ {daysLeft} days left</span>
            <span>👥 {totalOrders} supporters</span>
            <span>📦 {(campaign as any).current_quantity}/{(campaign as any).target_quantity} kg</span>
          </div>
        </div>

        {/* Canceled Payment Banner */}
        {searchParams.canceled && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <h3 className="font-medium text-yellow-800 mb-2">Payment Canceled</h3>
            <p className="text-yellow-700 text-sm">
              Your payment was canceled. You can try again anytime before the campaign ends.
            </p>
          </div>
        )}

        {/* Campaign Status */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Campaign Progress</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-amber-700 mb-2">
                <span>Progress</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-amber-700">Current Orders:</span>
                <span className="font-medium text-amber-900">{(campaign as any).current_quantity} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Target Goal:</span>
                <span className="font-medium text-amber-900">{(campaign as any).target_quantity} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Base Price:</span>
                <span className="font-medium text-amber-900">{formatPrice((campaign as any).price_per_kg)}/kg</span>
              </div>
            </div>
          </div>

          {/* Discounts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Group Discounts</h3>
            
            <div className="space-y-3">
              <div className={`flex items-center p-3 rounded-lg ${(campaign as any).current_quantity >= (campaign as any).discount_threshold_1 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} border`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${(campaign as any).current_quantity >= (campaign as any).discount_threshold_1 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                  {(campaign as any).current_quantity >= (campaign as any).discount_threshold_1 ? '✓' : '1'}
                </div>
                <div>
                  <div className="font-medium text-amber-900">10% Discount</div>
                  <div className="text-sm text-amber-600">At {(campaign as any).discount_threshold_1}kg total orders</div>
                </div>
              </div>

              <div className={`flex items-center p-3 rounded-lg ${(campaign as any).current_quantity >= (campaign as any).discount_threshold_2 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} border`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${(campaign as any).current_quantity >= (campaign as any).discount_threshold_2 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                  {(campaign as any).current_quantity >= (campaign as any).discount_threshold_2 ? '✓' : '2'}
                </div>
                <div>
                  <div className="font-medium text-amber-900">20% Discount</div>
                  <div className="text-sm text-amber-600">At {(campaign as any).discount_threshold_2}kg total orders</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-amber-900 mb-6 text-center">
            Join the Group Buy
          </h2>

          {(campaign as any).status !== 'active' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-700">This campaign is no longer active.</p>
            </div>
          )}

          {(campaign as any).status === 'active' && daysLeft <= 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-700">This campaign has expired.</p>
            </div>
          )}

          {(campaign as any).status === 'active' && daysLeft > 0 && !isStripeConfigured() && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <h3 className="font-medium text-yellow-800 mb-2">🚧 Payment System Setup Required</h3>
              <p className="text-yellow-700 text-sm">
                Stripe payments are not yet configured. Complete the setup to enable purchases.
              </p>
            </div>
          )}

          {(campaign as any).status === 'active' && daysLeft > 0 && isStripeConfigured() && (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Quantity Options */}
              {[250, 500, 1000].map((grams) => {
                const kg = grams / 1000
                return (
                  <div key={grams} className="border border-amber-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      {grams}g Package
                    </h3>
                    <p className="text-amber-700 text-sm mb-4">
                      Perfect for {grams === 250 ? 'trying' : grams === 500 ? 'regular drinkers' : 'coffee enthusiasts'}
                    </p>
                    
                    <CheckoutButton
                      campaignId={params.id}
                      quantity={kg}
                      pricePerKg={(campaign as any).price_per_kg}
                      currentQuantity={(campaign as any).current_quantity}
                      discountThreshold1={(campaign as any).discount_threshold_1}
                      discountThreshold2={(campaign as any).discount_threshold_2}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Share Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <ShareButtons
            campaignId={params.id}
            campaignTitle={`${(campaign as any).coffee_product} - Group Buying Campaign`}
            campaignUrl={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/campaigns/${params.id}`}
          />
        </div>

        {/* Campaign Info */}
        <div className="mt-8 bg-amber-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-amber-900 mb-4">About This Campaign</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-amber-700">
            <div>
              <h4 className="font-medium text-amber-800 mb-2">Campaign Details</h4>
              <ul className="space-y-1">
                <li>• Premium Indonesian coffee beans</li>
                <li>• Sourced directly from local farmers</li>
                <li>• Group buying for better prices</li>
                <li>• Secure payment via Stripe</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-amber-800 mb-2">Delivery & Support</h4>
              <ul className="space-y-1">
                <li>• Ships within 7-14 days after campaign ends</li>
                <li>• Indonesia-wide delivery available</li>
                <li>• Quality guarantee included</li>
                <li>• Customer support via WhatsApp</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}