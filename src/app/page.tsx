import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-6">
                GOMFLOW
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">
                Influencer Group Buying Platform
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Create viral group buying campaigns for any product. 
                Influencers earn commission while customers unlock discounts through social sharing.
              </p>
            </div>
            
            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Button size="xl" className="w-full sm:w-auto">
                <a href="/auth" className="flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Start as Influencer</span>
                </a>
              </Button>
              <Button variant="ghost" size="xl" className="w-full sm:w-auto">
                <a href="/campaigns" className="flex items-center space-x-2">
                  <span>🛍️</span>
                  <span>Browse Campaigns</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Group Buying Explanation */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What is Group Buying? 🤔
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                More people = better prices for everyone! Here's how we unlock savings together:
              </p>
            </div>

            {/* Interactive Demo */}
            <div className="max-w-4xl mx-auto mb-12">
              <Card variant="glass" className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="py-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">
                      📱 Live Example: Premium Coffee Campaign
                    </h3>
                    <p className="text-blue-700">Watch how discounts unlock as more people join</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 text-center border-2 border-gray-200">
                      <div className="text-3xl mb-3">👥</div>
                      <div className="text-2xl font-bold text-gray-800 mb-2">1-24 People</div>
                      <div className="text-lg text-gray-600 mb-3">Regular Price</div>
                      <div className="text-3xl font-bold text-gray-800">$25</div>
                      <div className="text-sm text-gray-500 mt-2">per 500g bag</div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 text-center border-2 border-green-300 transform scale-105">
                      <div className="text-3xl mb-3">🎯</div>
                      <div className="text-2xl font-bold text-green-800 mb-2">25-49 People</div>
                      <div className="text-lg text-green-600 mb-3">Group Discount!</div>
                      <div className="text-3xl font-bold text-green-800">$22.50</div>
                      <div className="text-sm text-green-600 mt-2">Save $2.50 each!</div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 text-center border-2 border-purple-300">
                      <div className="text-3xl mb-3">🚀</div>
                      <div className="text-2xl font-bold text-purple-800 mb-2">50+ People</div>
                      <div className="text-lg text-purple-600 mb-3">Maximum Savings!</div>
                      <div className="text-3xl font-bold text-purple-800">$20</div>
                      <div className="text-sm text-purple-600 mt-2">Save $5 each!</div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <div className="bg-amber-100 rounded-lg p-4 inline-block">
                      <p className="text-amber-800 font-semibold">
                        💡 <strong>Key Insight:</strong> Everyone pays the same lowest price when the campaign ends!
                      </p>
                      <p className="text-amber-700 text-sm mt-1">
                        Early joiners aren't penalized - everyone gets the final discount tier achieved.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card variant="elevated" className="text-center">
                <CardContent className="py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Campaign</h3>
                  <p className="text-gray-600 mb-4">
                    Influencers create group buying campaigns for products their audience loves
                  </p>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm text-purple-700">
                      <strong>Example:</strong> "Let's get 50 people together for premium coffee at wholesale prices!"
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center">
                <CardContent className="py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Share & Buy</h3>
                  <p className="text-gray-600 mb-4">
                    Customers join campaigns and share with friends to unlock group discounts
                  </p>
                  <div className="bg-amber-50 rounded-lg p-3">
                    <p className="text-sm text-amber-700">
                      <strong>Tip:</strong> Share on WhatsApp to help everyone reach better discount tiers faster!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center">
                <CardContent className="py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Everyone Wins</h3>
                  <p className="text-gray-600 mb-4">
                    Higher quantities mean better prices for customers and more commission for influencers
                  </p>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-700">
                      <strong>Result:</strong> Community gets wholesale pricing, influencer earns 15-20% commission
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🎯</span>
                  <span>For Influencers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Monetize any audience niche</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>15-20% commission on sales</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>No inventory risk</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Easy campaign creation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🛍️</span>
                  <span>For Customers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Exclusive product campaigns</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Group discounts (10-30% off)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Share to unlock better prices</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Premium products from trusted sources</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Trust & Security Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Safe, Secure & Guaranteed 🛡️
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your money and data are protected by industry-leading security measures
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card variant="outlined" className="text-center">
                <CardContent className="py-6">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="font-bold text-gray-900 mb-2">SSL Encrypted</h3>
                  <p className="text-sm text-gray-600">Bank-level security for all payments</p>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="py-6">
                  <div className="text-4xl mb-3">💳</div>
                  <h3 className="font-bold text-gray-900 mb-2">Stripe Protected</h3>
                  <p className="text-sm text-gray-600">Global payment processing leader</p>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="py-6">
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="font-bold text-gray-900 mb-2">Delivery Guarantee</h3>
                  <p className="text-sm text-gray-600">Full refund if product doesn't arrive</p>
                </CardContent>
              </Card>

              <Card variant="outlined" className="text-center">
                <CardContent className="py-6">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-bold text-gray-900 mb-2">Quality Promise</h3>
                  <p className="text-sm text-gray-600">30-day return guarantee</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Card variant="glass" className="bg-green-50 border-green-200 max-w-2xl mx-auto">
                <CardContent className="py-6">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <span className="text-2xl">✅</span>
                    <h3 className="text-xl font-bold text-green-900">100% Money-Back Guarantee</h3>
                  </div>
                  <p className="text-green-700">
                    If a campaign doesn't reach its minimum target, everyone gets a full refund automatically.
                    No questions asked, no processing fees.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join Thousands of Happy Users 🌟
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card variant="elevated" className="text-center">
                <CardContent className="py-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    S
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-center text-yellow-400 text-xl mb-2">
                      ★★★★★
                    </div>
                    <p className="text-gray-600 italic">
                      "Made $850 in my first month selling premium coffee to my community. GOMFLOW made it so easy!"
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">Sarah Chen</p>
                  <p className="text-sm text-gray-500">Coffee Influencer, 8.5K followers</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center">
                <CardContent className="py-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    M
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-center text-yellow-400 text-xl mb-2">
                      ★★★★★
                    </div>
                    <p className="text-gray-600 italic">
                      "Got premium artisan coffee at 40% off retail price. The group buying concept is genius!"
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">Mike Rodriguez</p>
                  <p className="text-sm text-gray-500">Customer, Vancouver</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center">
                <CardContent className="py-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    L
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-center text-yellow-400 text-xl mb-2">
                      ★★★★★
                    </div>
                    <p className="text-gray-600 italic">
                      "Perfect for my lifestyle brand. My audience loves the exclusive products and I earn great commission."
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">Lisa Park</p>
                  <p className="text-sm text-gray-500">Lifestyle Influencer, 12K followers</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">2,500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-1">150+</div>
                  <div className="text-sm text-gray-600">Active Influencers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">$127K</div>
                  <div className="text-sm text-gray-600">Total Savings</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <Card variant="glass" className="bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
                Join GOMFLOW today and start earning through viral group buying campaigns or discover exclusive deals from your favorite influencers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
                <Button 
                  size="xl" 
                  className="bg-white text-purple-600 hover:bg-gray-100 w-full sm:w-auto"
                >
                  <a href="/auth" className="flex items-center space-x-2">
                    <span>🚀</span>
                    <span>Start as Influencer</span>
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="xl" 
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 w-full sm:w-auto"
                >
                  <a href="/campaigns" className="flex items-center space-x-2">
                    <span>🛍️</span>
                    <span>Browse Campaigns</span>
                  </a>
                </Button>
              </div>
              
              {/* Additional Trust Elements */}
              <div className="flex justify-center space-x-8 text-sm text-purple-200">
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Free to Join</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>No Setup Fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}