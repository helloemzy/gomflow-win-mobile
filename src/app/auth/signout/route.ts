import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.redirect('/dashboard?error=Could not sign out')
  }

  return NextResponse.redirect('/')
}