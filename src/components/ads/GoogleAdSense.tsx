'use client'

import Script from 'next/script'

interface GoogleAdSenseProps {
  publisherId: string
}

// This component loads the Google AdSense script
// Add it to your root layout or _app.tsx
export function GoogleAdSense({ publisherId }: GoogleAdSenseProps) {
  if (!publisherId) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

// Usage in layout.tsx:
// <GoogleAdSense publisherId="ca-pub-XXXXXXXXXXXXXXXX" />
