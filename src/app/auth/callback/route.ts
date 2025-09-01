import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createServerSupabaseClient()
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get user data to create/update influencer profile
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Check if influencer profile exists, create if not
        const { data: influencer } = await supabase
          .from('influencers')
          .select('id')
          .eq('email', user.email!)
          .single()

        if (!influencer) {
          // Create new influencer profile
          const { error: insertError } = await supabase
            .from('influencers')
            .insert([{
              email: user.email!,
              status: 'pending'
            }] as any)
          
          if (insertError) {
            console.error('Error creating influencer profile:', insertError)
          } else {
            // Redirect new users to onboarding
            return NextResponse.redirect(`${origin}/onboarding`)
          }
        }
      }
      
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth?error=Could not authenticate user`)
}