import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import CampaignForm from '@/components/campaigns/CampaignForm'
import Link from 'next/link'

export default async function NewCampaignPage() {
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

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex text-sm text-amber-600">
            <Link href="/dashboard" className="hover:text-amber-800">Dashboard</Link>
            <span className="mx-2">→</span>
            <span className="text-amber-800 font-medium">New Campaign</span>
          </nav>
        </div>

        {/* Status Check */}
        {(influencer as any)?.status !== 'active' && (
          <div className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-medium text-yellow-800 mb-2">Profile Approval Required</h3>
              <p className="text-yellow-700 mb-4">
                Your influencer profile is currently under review. You'll be able to create campaigns once approved.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/dashboard"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Back to Dashboard
                </Link>
                <button className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-4 py-2 rounded-lg font-medium transition-colors">
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Campaign Creation Form */}
        {(influencer as any)?.status === 'active' && (
          <CampaignForm
            onSuccess={(campaignId) => {
              // Redirect to campaign page
              window.location.href = `/campaigns/${campaignId}`
            }}
            onCancel={() => {
              window.location.href = '/dashboard'
            }}
          />
        )}

        {/* Guidelines */}
        <div className="mt-12 bg-amber-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">Campaign Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-amber-700">
            <div>
              <h3 className="font-medium text-amber-800 mb-2">✅ Best Practices</h3>
              <ul className="space-y-1">
                <li>• Use clear, descriptive product names</li>
                <li>• Set realistic target quantities</li>
                <li>• Price competitively for your audience</li>
                <li>• Choose appropriate campaign duration</li>
                <li>• Promote actively on social media</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-amber-800 mb-2">📋 Requirements</h3>
              <ul className="space-y-1">
                <li>• Minimum 10kg target quantity</li>
                <li>• Indonesian coffee products only</li>
                <li>• Quality assurance guarantee</li>
                <li>• Reliable supplier relationships</li>
                <li>• Active social media presence</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-2">💡 Success Tips</h4>
            <p className="text-amber-700 text-sm">
              Campaigns typically succeed when influencers actively promote them within the first 48 hours. 
              Share your campaign link on TikTok, Instagram, and WhatsApp to maximize reach and build momentum.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}