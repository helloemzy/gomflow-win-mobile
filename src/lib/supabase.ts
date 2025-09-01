import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  return url !== 'your_supabase_url_here' && 
         key !== 'your_supabase_anon_key_here' &&
         url && 
         key
}

// Demo mode helper - returns true if we should use mock authentication
export const isDemoMode = () => {
  return !isSupabaseConfigured()
}

// Mock user for demo mode
export const mockUser = {
  id: 'demo-user-123',
  email: 'demo@gomflow.com',
  user_metadata: {
    name: 'Demo User',
    avatar_url: null
  },
  created_at: new Date().toISOString(),
  app_metadata: {},
  aud: 'authenticated'
}

// Mock authentication functions for demo mode
export const mockAuth = {
  signInWithOtp: async (email: string) => {
    console.log('Demo mode: Mock sign in with', email)
    return { data: { user: null }, error: null }
  },
  signUp: async (email: string, password: string) => {
    console.log('Demo mode: Mock sign up with', email)
    return { data: { user: mockUser }, error: null }
  },
  signInWithPassword: async ({ email, password }: { email: string, password: string }) => {
    console.log('Demo mode: Mock sign in with password', email)
    return { data: { user: mockUser }, error: null }
  },
  signOut: async () => {
    console.log('Demo mode: Mock sign out')
    return { error: null }
  },
  getUser: async () => {
    return { data: { user: mockUser }, error: null }
  }
}

// Client-side Supabase client
export const createClient = () => {
  if (isDemoMode()) {
    // Return mock client for demo mode
    return {
      auth: mockAuth,
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null })
      })
    } as any
  }
  
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}