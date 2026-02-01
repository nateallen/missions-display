export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
    timeout: 10000,
  },
  features: {
    useMockData: process.env.NEXT_PUBLIC_USE_MOCK === 'true',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableSocialMedia: process.env.NEXT_PUBLIC_ENABLE_SOCIAL === 'true',
  },
  display: {
    defaultResolution: '1080p' as const,
    enableTouchOptimization: true,
    kioskMode: process.env.NEXT_PUBLIC_KIOSK_MODE === 'true',
  },
} as const;
