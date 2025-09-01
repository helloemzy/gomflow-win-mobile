export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">
            GOMFLOW
          </h1>
          <p className="text-xl text-amber-800 mb-6">
            Influencer Group Buying Platform
          </p>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Create viral group buying campaigns for any product. 
            Influencers earn commission while customers unlock discounts through social sharing.
          </p>
        </div>

        {/* Status Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-800 mb-4">
            🚀 MVP Development Phase
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">Week 1</div>
              <div className="text-amber-600">Technical Foundation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$5,000</div>
              <div className="text-amber-600">GMV Target</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4 Weeks</div>
              <div className="text-amber-600">To Validation</div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">
              For Influencers
            </h3>
            <ul className="text-left text-amber-700 space-y-2">
              <li>• Monetize any audience niche</li>
              <li>• 15-20% commission on sales</li>
              <li>• No inventory risk</li>
              <li>• Easy campaign creation</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">
              For Customers
            </h3>
            <ul className="text-left text-amber-700 space-y-2">
              <li>• Exclusive product campaigns</li>
              <li>• Group discounts (10-30% off)</li>
              <li>• Share to unlock better prices</li>
              <li>• Premium products from trusted sources</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <div className="bg-purple-600 text-white rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-purple-200 mb-6">
              Join GOMFLOW as an influencer and start monetizing your audience through viral group buying campaigns.
            </p>
            <div className="space-x-4">
              <a 
                href="/auth" 
                className="inline-block bg-white text-purple-600 hover:bg-purple-50 font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Start as Influencer
              </a>
              <a 
                href="/campaigns" 
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-purple-600 font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Browse Campaigns
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}