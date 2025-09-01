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
                  <p className="text-gray-600">
                    Influencers create group buying campaigns for products their audience loves
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center">
                <CardContent className="py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Share & Buy</h3>
                  <p className="text-gray-600">
                    Customers join campaigns and share with friends to unlock group discounts
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center">
                <CardContent className="py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Everyone Wins</h3>
                  <p className="text-gray-600">
                    Higher quantities mean better prices for customers and more commission for influencers
                  </p>
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

          {/* CTA Section */}
          <Card variant="glass" className="bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
                Join GOMFLOW as an influencer and start monetizing your audience through viral group buying campaigns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
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
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}