'use client'

import { useEffect, useRef } from 'react'
import { adConfig, isAdsEnabled, getGoogleAdsenseClientId, getAdSlotId } from '@/lib/ads/config'

interface AdBannerProps {
  position: 'header' | 'sidebar' | 'footer' | 'inContent'
  className?: string
}

// Google AdSense Banner Component
export function AdBanner({ position, className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isAdEnabled = isAdsEnabled()
  const clientId = getGoogleAdsenseClientId()
  const slotId = getAdSlotId(position)

  useEffect(() => {
    // Only load ads if enabled and configured
    if (!isAdEnabled) return

    // Google AdSense loading
    if (adConfig.provider === 'google-adsense' && clientId && slotId) {
      try {
        // Push ad to Google AdSense
        if (typeof window !== 'undefined' && (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle) {
          ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle).push({})
        }
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [isAdEnabled, clientId, slotId])

  // Don't render if ads are disabled
  if (!isAdEnabled) {
    return null
  }

  // Custom Ads
  if (adConfig.provider === 'custom') {
    const customHtml = adConfig.customAds?.[`${position}Html` as keyof typeof adConfig.customAds]
    if (customHtml) {
      return (
        <div
          className={`ad-container ad-custom ad-${position} ${className}`}
          dangerouslySetInnerHTML={{ __html: customHtml }}
        />
      )
    }
    return null
  }

  // Google AdSense
  if (adConfig.provider === 'google-adsense' && clientId && slotId) {
    return (
      <div className={`ad-container ad-adsense ad-${position} ${className}`}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  return null
}

// Google AdSense Script Component - Add this to layout or page
export function GoogleAdSenseScript() {
  const clientId = getGoogleAdsenseClientId()
  const isAdEnabled = isAdsEnabled()

  if (!isAdEnabled || adConfig.provider !== 'google-adsense' || !clientId) {
    return null
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
