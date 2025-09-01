import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Get influencer profile
  const { data: influencer } = await supabase
    .from('influencers')
    .select('*')
    .eq('email', user.email!)
    .single()

  // Get campaigns for this influencer
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .eq('influencer_id', (influencer as any)?.id || '')
    .order('created_at', { ascending: false })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">
              Welcome back! ☕
            </h1>
            <p className="text-amber-700">
              {user.email} • Status: <span className="capitalize font-medium">{(influencer as any)?.status || 'pending'}</span>
            </p>
          </div>
          
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Status Banner */}
        {(influencer as any)?.status === 'pending' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <h3 className="font-medium text-yellow-800 mb-2">Profile Under Review</h3>
            <p className="text-yellow-700 text-sm">
              Your influencer profile is being reviewed. You'll be able to create campaigns once approved.
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="ml-3">
                <div className="text-2xl font-bold text-purple-600">{campaigns?.length || 0}</div>
                <div className="text-amber-600">Total Campaigns</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="ml-3">
                <div className="text-2xl font-bold text-green-600">$0</div>
                <div className="text-amber-600">Total Earnings</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="text-2xl mb-2">📈</div>
              <div className="ml-3">
                <div className="text-2xl font-bold text-blue-600">{(influencer as any)?.commission_rate || 15}%</div>
                <div className="text-amber-600">Commission Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Campaign */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">Create Campaign</h3>
            <p className="text-amber-700 mb-4">
              Launch a new group buying campaign for premium Indonesian coffee.
            </p>
            <a
              href={(influencer as any)?.status === 'active' ? '/dashboard/campaigns/new' : '#'}
              className={`inline-block text-center font-medium py-2 px-4 rounded-lg transition-colors ${
                (influencer as any)?.status === 'active'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              {(influencer as any)?.status === 'active' ? 'New Campaign' : 'Pending Approval'}
            </a>
          </div>

          {/* Getting Started */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">Getting Started</h3>
            <ul className="text-amber-700 space-y-2 mb-4">
              <li>• Complete your profile setup</li>
              <li>• Connect your social media accounts</li>
              <li>• Review campaign best practices</li>
              <li>• Test sharing mechanisms</li>
            </ul>
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Setup Profile
            </button>
          </div>
        </div>

        {/* Recent Campaigns */}
        {campaigns && campaigns.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">Your Campaigns</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-amber-50 border-b">
                <div className="grid grid-cols-5 gap-4 font-medium text-amber-800">
                  <div>Campaign</div>
                  <div>Status</div>
                  <div>Progress</div>
                  <div>Deadline</div>
                  <div>Actions</div>
                </div>
              </div>
              {campaigns.map((campaign: any) => (
                <div key={campaign.id} className="px-6 py-4 border-b border-amber-100">
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div>
                      <div className="font-medium text-amber-900">{campaign.coffee_product}</div>
                      <div className="text-xs text-amber-600 mt-1">ID: {campaign.id.slice(0, 8)}...</div>
                    </div>
                    <div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full capitalize ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-amber-700">
                        {campaign.current_quantity}/{campaign.target_quantity} kg
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-1 mt-1">
                        <div 
                          className="bg-amber-500 h-1 rounded-full"
                          style={{ width: `${Math.min((campaign.current_quantity / campaign.target_quantity) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-amber-700">
                        {new Date(campaign.deadline).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-amber-600">
                        {Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} days left
                      </div>
                    </div>
                    <div>
                      <a
                        href={`/campaigns/${campaign.id}`}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        View →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}