'use client'

import { useState } from 'react'
import { isSupabaseConfigured } from '@/lib/supabase'
import AuthForm from '@/components/auth/AuthForm'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  if (!isSupabaseConfigured()) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-amber-900 mb-4">
              🚧 Setup Required
            </h1>
            <p className="text-amber-700 mb-4">
              Authentication is not yet configured. Please follow the setup guide:
            </p>
            <ol className="text-left text-amber-600 space-y-2 mb-6">
              <li>1. Create Supabase project</li>
              <li>2. Run database schema</li>
              <li>3. Update environment variables</li>
              <li>4. Restart development server</li>
            </ol>
            <p className="text-sm text-amber-500">
              See <code>SUPABASE_SETUP.md</code> for detailed instructions
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">GOMFLOW</h1>
        <p className="text-amber-700">Indonesian Coffee Group Buying</p>
      </div>
      
      <AuthForm 
        mode={mode} 
        onToggleMode={() => setMode(mode === 'login' ? 'signup' : 'login')} 
      />
    </main>
  )
}