'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
}

// This component displays a single ad unit
export function AdUnit({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '' 
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    // Push the ad to Google AdSense
    try {
      if (typeof window !== 'undefined') {
        // @ts-expect-error - adsbygoogle is defined by AdSense script
        const adsbygoogle = window.adsbygoogle || []
        adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format={format}
        data-ad-slot={slot}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}

// Example usage:
// <AdUnit slot="1234567890" format="horizontal" />
