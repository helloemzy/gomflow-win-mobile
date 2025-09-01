/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations for Indonesian 3G networks
  images: {
    domains: ['localhost', 'gomflow.com'],
    deviceSizes: [360, 390, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Enable SWC minification for better performance
  swcMinify: true,

  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    // Optimize bundle size
    optimizePackageImports: [
      '@supabase/supabase-js',
      '@stripe/stripe-js',
      'react-hook-form',
    ],
  },

  // PWA configuration for offline support
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=300',
          },
        ],
      },
    ]
  },

  // Webpack optimization for bundle splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize client-side bundles
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Supabase chunk
            supabase: {
              name: 'supabase',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](@supabase)[\\/]/,
              priority: 30,
              enforce: true,
            },
            // Stripe chunk
            stripe: {
              name: 'stripe',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](@stripe|stripe)[\\/]/,
              priority: 30,
              enforce: true,
            },
            // Common components
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
            // All other packages
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([[\\/]|$)/
                )?.[1]
                return `npm.${packageName?.replace('@', '') || 'unknown'}`
              },
              priority: 10,
              minChunks: 2,
            },
          },
          maxAsyncRequests: 30,
          maxInitialRequests: 25,
          minSize: 20000,
        },
      }
    }

    // Add aliases for cleaner imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': './src/components',
      '@/hooks': './src/hooks',
      '@/lib': './src/lib',
      '@/styles': './src/styles',
      '@/types': './src/types',
      '@/utils': './src/utils',
    }

    return config
  },

  // Redirects for common patterns
  async redirects() {
    return [
      {
        source: '/coffee/:path*',
        destination: '/campaigns/:path*',
        permanent: true,
      },
    ]
  },

  // Environment variables to expose to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: 'GOMFLOW',
    NEXT_PUBLIC_APP_DESCRIPTION: 'Indonesian Coffee Influencer Group Buying Platform',
    NEXT_PUBLIC_DEFAULT_LOCALE: 'id-ID',
    NEXT_PUBLIC_CURRENCY: 'IDR',
  },
}

module.exports = nextConfig