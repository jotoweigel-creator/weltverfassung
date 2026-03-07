// Ad Integration Configuration
// This file allows easy configuration of various ad providers

export interface AdConfig {
  enabled: boolean
  provider: 'google-adsense' | 'custom' | 'none'
  googleAdsense?: {
    clientId?: string // Format: ca-pub-XXXXXXXXXXXXXXXX
    slotIds?: {
      header?: string
      sidebar?: string
      footer?: string
      inContent?: string
    }
  }
  customAds?: {
    headerHtml?: string
    sidebarHtml?: string
    footerHtml?: string
    inContentHtml?: string
  }
}

// Default configuration - modify this to enable ads
export const adConfig: AdConfig = {
  enabled: false, // Set to true to enable ads
  provider: 'none',

  // Google AdSense Configuration
  googleAdsense: {
    clientId: '', // Add your AdSense client ID: ca-pub-XXXXXXXXXXXXXXXX
    slotIds: {
      header: '',    // Ad slot for header
      sidebar: '',   // Ad slot for sidebar
      footer: '',    // Ad slot for footer
      inContent: '', // Ad slot for in-content placement
    }
  },

  // Custom Ad Configuration (HTML/JS)
  customAds: {
    headerHtml: '',
    sidebarHtml: '',
    footerHtml: '',
    inContentHtml: '',
  }
}

// Helper to check if ads are enabled
export function isAdsEnabled(): boolean {
  return adConfig.enabled && adConfig.provider !== 'none'
}

// Helper to get Google AdSense client ID
export function getGoogleAdsenseClientId(): string | undefined {
  return adConfig.googleAdsense?.clientId
}

// Helper to get ad slot ID
export function getAdSlotId(position: 'header' | 'sidebar' | 'footer' | 'inContent'): string | undefined {
  return adConfig.googleAdsense?.slotIds?.[position]
}
