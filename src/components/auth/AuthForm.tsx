'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient, isDemoMode, mockAuth } from '@/lib/supabase'

interface AuthFormProps {
  mode: 'login' | 'signup'
  onToggleMode: () => void
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [userType, setUserType] = useState<'influencer' | 'customer'>('influencer')
  
  const router = useRouter()
  const supabase = createClient()
  const isDemo = isDemoMode()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      if (isDemo) {
        // Demo mode - simulate authentication
        console.log(`Demo ${mode} as ${userType}:`, email)
        
        // Store user type for demo
        if (typeof window !== 'undefined') {
          localStorage.setItem('demo_user_type', userType)
          localStorage.setItem('demo_user_email', email)
        }
        
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Redirect based on user type
        if (userType === 'influencer') {
          router.push('/dashboard')
        } else {
          router.push('/campaigns')
        }
        
        return
      }

      // Real Supabase authentication
      let result
      if (mode === 'login') {
        result = await supabase.auth.signInWithPassword({ email, password })
      } else {
        result = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              user_type: userType
            }
          }
        })
      }

      if (result.error) {
        setError(result.error.message)
      } else if (mode === 'signup') {
        setMessage('Check your email to confirm your account!')
      } else {
        // Redirect based on user type
        if (userType === 'influencer') {
          router.push('/dashboard')
        } else {
          router.push('/campaigns')
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      if (isDemo) {
        setMessage('✨ Demo Mode: Magic link sent! Click "Continue with Demo" below.')
        return
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email for the magic link!')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="font-semibold text-blue-900">Demo Mode Active</h3>
              <p className="text-sm text-blue-700">
                Try the platform without setting up accounts. All features work!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-2">
          {mode === 'login' ? 'Welcome Back' : 'Join GOMFLOW'}
        </h1>
        <p className="text-gray-600">
          {mode === 'login' 
            ? 'Continue your group buying journey' 
            : 'Create viral campaigns & unlock discounts'
          }
        </p>
      </div>

      {/* User Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-3">
          I want to {mode === 'login' ? 'sign in' : 'join'} as:
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setUserType('influencer')}
            className={`p-4 rounded-lg border-2 transition-all text-center ${
              userType === 'influencer'
                ? 'border-purple-500 bg-purple-50 text-purple-900'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="text-2xl mb-1">🌟</div>
            <div className="font-semibold text-sm">Influencer</div>
            <div className="text-xs opacity-75">Create campaigns</div>
          </button>
          <button
            type="button"
            onClick={() => setUserType('customer')}
            className={`p-4 rounded-lg border-2 transition-all text-center ${
              userType === 'customer'
                ? 'border-amber-500 bg-amber-50 text-amber-900'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="text-2xl mb-1">🛍️</div>
            <div className="font-semibold text-sm">Customer</div>
            <div className="text-xs opacity-75">Join & save</div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {!isDemo && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 text-sm">{message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-400 disabled:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{isDemo ? 'Starting Demo...' : mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
            </div>
          ) : (
            `${mode === 'login' ? 'Sign In' : 'Create Account'} ${isDemo ? '(Demo)' : ''}`
          )}
        </button>
      </form>

      {!isDemo && (
        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          <button
            onClick={handleMagicLink}
            disabled={isLoading}
            className="w-full mt-4 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-lg transition-colors"
          >
            Send Magic Link Instead
          </button>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={onToggleMode}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      {/* Trust indicators */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
          <div className="flex flex-col items-center">
            <span className="text-green-500 mb-1">🔒</span>
            <span>Secure</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-blue-500 mb-1">⚡</span>
            <span>Fast Setup</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-purple-500 mb-1">🌟</span>
            <span>Free to Join</span>
          </div>
        </div>
      </div>
    </div>
  )
}