import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { isStripeConfigured } from '@/lib/stripe'
import MobileCampaignHero from '@/components/campaigns/MobileCampaignHero'
import ViralShareComponent from '@/components/campaigns/ViralShareComponent'
import CheckoutButton from '@/components/stripe/CheckoutButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { calculateDiscount } from '@/lib/utils'

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
  const currentDiscount = calculateDiscount((campaign as any).current_quantity, (campaign as any).target_quantity)
  const timeLeft = new Date((campaign as any).deadline).getTime() - Date.now()
  const daysLeft = Math.max(0, Math.ceil(timeLeft / (1000 * 60 * 60 * 24)))

  const handlePurchase = (quantity: number) => {
    // This will be handled by the checkout integration
    console.log('Purchase:', quantity, 'units')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Hero */}
      <MobileCampaignHero
        campaign={campaign as any}
        onPurchase={handlePurchase}
        isLoading={false}
      />

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Canceled Payment Banner */}
        {searchParams.canceled && (
          <Card variant="outlined" className="border-yellow-300 bg-yellow-50">
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">⚠️</div>
                <div>
                  <h3 className="font-semibold text-yellow-800">Payment Canceled</h3>
                  <p className="text-yellow-700 text-sm">
                    No worries! You can try again anytime before the campaign ends.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Influencer Info */}
        <Card variant="elevated">
          <CardContent className="py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {((campaign as any).influencers?.tiktok_handle || 'U')[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  @{(campaign as any).influencers?.tiktok_handle || 'verified-influencer'}
                </div>
                <div className="text-sm text-gray-600 flex items-center space-x-1">
                  <span>✅ Verified Influencer</span>
                  <span>•</span>
                  <span>{(campaign as any).influencers?.commission_rate || 15}% commission</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Supporters</div>
                <div className="text-xl font-bold text-purple-600">{totalOrders}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Group Discount Tiers */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🎯</span>
              <span>Group Discount Tiers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                currentDiscount >= 10 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                  currentDiscount >= 10
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-400 text-white'
                }`}>
                  {currentDiscount >= 10 ? '✓' : '1'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">10% Group Discount</div>
                  <div className="text-sm text-gray-600">
                    When we reach {(campaign as any).discount_threshold_1} units
                  </div>
                </div>
                {currentDiscount >= 10 && (
                  <div className="text-green-600 font-bold">UNLOCKED!</div>
                )}
              </div>

              <div className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                currentDiscount >= 20 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                  currentDiscount >= 20
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-400 text-white'
                }`}>
                  {currentDiscount >= 20 ? '✓' : '2'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">20% Group Discount</div>
                  <div className="text-sm text-gray-600">
                    When we reach {(campaign as any).discount_threshold_2} units
                  </div>
                </div>
                {currentDiscount >= 20 && (
                  <div className="text-green-600 font-bold">UNLOCKED!</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Desktop Purchase Options (Hidden on Mobile) */}
        {(campaign as any).status === 'active' && daysLeft > 0 && isStripeConfigured() && (
          <div className="hidden md:block">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Choose Your Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 5].map((quantity) => (
                    <div key={quantity} className="border border-gray-200 rounded-lg p-4 text-center">
                      <div className="font-semibold text-gray-900 mb-2">
                        {quantity} Unit{quantity > 1 ? 's' : ''}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        {quantity === 1 ? 'Try it out' : quantity === 2 ? 'Popular choice' : 'Best value'}
                      </div>
                      <CheckoutButton
                        campaignId={params.id}
                        quantity={quantity}
                        pricePerKg={(campaign as any).price_per_kg}
                        currentQuantity={(campaign as any).current_quantity}
                        discountThreshold1={(campaign as any).discount_threshold_1}
                        discountThreshold2={(campaign as any).discount_threshold_2}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Viral Share Component */}
        <ViralShareComponent
          campaignId={params.id}
          campaignTitle={(campaign as any).coffee_product}
          campaignUrl={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/campaigns/${params.id}`}
          currentDiscount={currentDiscount}
          currentQuantity={(campaign as any).current_quantity}
        />

        {/* Campaign Details */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>About This Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Campaign Details</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span>Premium quality product</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span>Group buying for better prices</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span>Secure payment via Stripe</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span>Trusted by the community</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Delivery & Support</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>Ships within 7-14 days after campaign ends</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>International shipping available</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>Quality guarantee included</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}