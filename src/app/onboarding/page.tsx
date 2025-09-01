import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import OnboardingForm from '@/components/onboarding/OnboardingForm'

export default async function OnboardingPage() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Check if user already completed onboarding
  const { data: influencer } = await supabase
    .from('influencers')
    .select('*')
    .eq('email', user.email!)
    .single()

  // If influencer profile exists with TikTok handle, redirect to dashboard
  if (influencer && (influencer as any).tiktok_handle) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Welcome to GOMFLOW! 🚀
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Join the premier influencer platform and start earning commission 
            from viral group buying campaigns.
          </p>
        </div>

        {/* Onboarding Form */}
        <OnboardingForm
          userEmail={user.email!}
          onComplete={() => {
            window.location.href = '/dashboard?onboarding=complete'
          }}
        />

        {/* Benefits Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-amber-900 mb-8 text-center">
            Why Join GOMFLOW?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold text-amber-900 mb-2">Earn Commission</h3>
              <p className="text-amber-700 text-sm">
                Earn 15-20% commission on every successful campaign. No upfront costs or inventory required.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-amber-900 mb-2">Viral Growth</h3>
              <p className="text-amber-700 text-sm">
                Share campaigns go viral naturally as customers unlock group discounts by sharing with friends.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold text-amber-900 mb-2">Premium Products</h3>
              <p className="text-amber-700 text-sm">
                Promote high-quality products from verified suppliers. Your audience gets the best deals.
              </p>
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-amber-900 mb-8 text-center">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-medium text-amber-900 mb-2">Complete Profile</h3>
              <p className="text-amber-700 text-sm">Set up your influencer profile and get approved by our team.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-medium text-amber-900 mb-2">Create Campaigns</h3>
              <p className="text-amber-700 text-sm">Launch group buying campaigns for premium products in your niche.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-medium text-amber-900 mb-2">Share & Promote</h3>
              <p className="text-amber-700 text-sm">Share campaign links on your social media to reach your audience.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-medium text-amber-900 mb-2">Earn Commission</h3>
              <p className="text-amber-700 text-sm">Receive 15% commission when campaigns reach their targets.</p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 text-center text-amber-600">
          <p className="mb-2">Need help with onboarding?</p>
          <p className="text-sm">Contact our support team via WhatsApp or email</p>
        </div>
      </div>
    </main>
  )
}