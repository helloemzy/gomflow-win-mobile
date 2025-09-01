'use client'

import { useState } from 'react'
import { isSupabaseConfigured } from '@/lib/supabase'
import AuthForm from '@/components/auth/AuthForm'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-4">
            GOMFLOW
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create viral group buying campaigns or join exclusive deals from your favorite influencers
          </p>
        </div>
        
        <AuthForm 
          mode={mode} 
          onToggleMode={() => setMode(mode === 'login' ? 'signup' : 'login')} 
        />

        {/* Benefits Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">For Influencers</h3>
                <ul className="space-y-2 text-gray-700 text-left">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Monetize your audience with any product</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>15-20% commission on all sales</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>No inventory risk or upfront costs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Built-in viral sharing mechanisms</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
              <div className="text-center">
                <div className="text-4xl mb-4">🛍️</div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">For Customers</h3>
                <ul className="space-y-2 text-gray-700 text-left">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Exclusive products from trusted influencers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Group discounts up to 30% off</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Share with friends to unlock better prices</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Secure payments & money-back guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}