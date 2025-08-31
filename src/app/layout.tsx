import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GOMFLOW - Indonesian Coffee Group Buying',
  description: 'Join coffee influencers in group buying campaigns for premium Indonesian coffee at discounted prices',
  keywords: 'Indonesian coffee, group buying, coffee influencers, coffee campaigns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
          {children}
        </div>
      </body>
    </html>
  )
}