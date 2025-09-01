import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatPrice } from '@/lib/stripe'
import Link from 'next/link'

export default async function CampaignsPage() {
  const supabase = createServerSupabaseClient()

  // Get active campaigns with influencer details
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select(`
      *,
      influencers (
        tiktok_handle
      )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Active Coffee Campaigns
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Join group buying campaigns from Indonesian coffee influencers. 
            Get premium coffee at discounted prices through the power of community.
          </p>
        </div>

        {/* Campaigns Grid */}
        {!campaigns || campaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-8">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">☕</span>
              </div>
              <h2 className="text-2xl font-semibold text-amber-900 mb-2">
                No Active Campaigns
              </h2>
              <p className="text-amber-700 mb-6">
                New coffee campaigns are launching soon! Check back later or sign up to be notified.
              </p>
              <Link 
                href="/auth"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Become an Influencer
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign: any) => {
              const progressPercent = Math.min((campaign.current_quantity / campaign.target_quantity) * 100, 100)
              const timeLeft = new Date(campaign.deadline).getTime() - Date.now()
              const daysLeft = Math.max(0, Math.ceil(timeLeft / (1000 * 60 * 60 * 24)))
              
              return (
                <Link 
                  key={campaign.id} 
                  href={`/campaigns/${campaign.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Campaign Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                    <span className="text-6xl">☕</span>
                  </div>

                  {/* Campaign Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-900 mb-2">
                      {campaign.coffee_product}
                    </h3>
                    
                    <p className="text-amber-700 text-sm mb-4">
                      by @{campaign.influencers?.tiktok_handle || 'verified influencer'}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-amber-600 mb-1">
                        <span>{campaign.current_quantity} kg raised</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-amber-700 mb-4">
                      <div>
                        <div className="font-medium text-amber-900">{formatPrice(campaign.price_per_kg)}/kg</div>
                        <div>Base Price</div>
                      </div>
                      <div>
                        <div className="font-medium text-amber-900">{daysLeft} days</div>
                        <div>Time Left</div>
                      </div>
                    </div>

                    {/* Discount Indicators */}
                    <div className="flex space-x-2 mb-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        campaign.current_quantity >= campaign.discount_threshold_1 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        10% at {campaign.discount_threshold_1}kg
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        campaign.current_quantity >= campaign.discount_threshold_2 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        20% at {campaign.discount_threshold_2}kg
                      </span>
                    </div>

                    {/* Action */}
                    <div className="text-center">
                      <span className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Join Campaign
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* How It Works */}
        <div className="mt-16 bg-amber-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-amber-900 mb-6 text-center">
            How Group Buying Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Choose Your Coffee</h3>
              <p className="text-amber-700 text-sm">Browse campaigns from verified Indonesian coffee influencers and select your preferred quantity.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Share & Save</h3>
              <p className="text-amber-700 text-sm">Share campaigns with friends to unlock group discounts. Everyone saves more when we buy together!</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Enjoy Fresh Coffee</h3>
              <p className="text-amber-700 text-sm">Once campaigns complete, coffee is freshly roasted and delivered directly to your door.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}