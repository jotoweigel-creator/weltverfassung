# Ad Integration Configuration Guide

This website supports easy integration with Google AdSense and other ad providers.

## Quick Setup

### 1. Enable Ads

Edit `/src/lib/ads/config.ts`:

```typescript
export const adConfig: AdConfig = {
  enabled: true, // Set to true
  provider: 'google-adsense', // or 'custom'

  googleAdsense: {
    clientId: 'ca-pub-XXXXXXXXXXXXXXXX', // Your AdSense client ID
    slotIds: {
      header: '1234567890',     // Your header ad slot
      sidebar: '0987654321',    // Your sidebar ad slot
      footer: '1122334455',     // Your footer ad slot
      inContent: '5544332211',  // Your in-content ad slot
    }
  }
}
```

### 2. Add AdSense Script

The Google AdSense script is automatically loaded when ads are enabled.

### 3. Place Ad Banners

Use the `AdBanner` component in your pages:

```tsx
import { AdBanner } from '@/components/ads/AdBanner'

// In your component:
<AdBanner position="header" />
<AdBanner position="sidebar" className="my-4" />
<AdBanner position="inContent" />
<AdBanner position="footer" />
```

## Custom Ads

You can also use custom HTML/JavaScript ads:

```typescript
export const adConfig: AdConfig = {
  enabled: true,
  provider: 'custom',
  customAds: {
    headerHtml: '<div>Your custom ad HTML</div>',
    sidebarHtml: '<script src="..."></script>',
    footerHtml: '<iframe src="..."></iframe>',
    inContentHtml: '<div>Native ad content</div>',
  }
}
```

## Other Ad Providers

### Amazon Associates

Add to `customAds`:
```typescript
customAds: {
  sidebarHtml: `
    <script src="https://ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=..."></script>
  `
}
```

### Media.net

Add to `customAds`:
```typescript
customAds: {
  headerHtml: `
    <script data-cfasync="false" src="//www.ezoic.com/..."></script>
  `
}
```

### Ezoic

For Ezoic, you typically need to:
1. Point your DNS to Ezoic
2. Use their ad inserter

Or manually:
```typescript
customAds: {
  headerHtml: `
    <script data-cfasync="false" src="//www.ezoic.com/ezoic/ezoic.js"></script>
    <script data-ezscrex="false" data-cfasync="false">...</script>
  `
}
```

## Ad Placements

- **header**: Top of page, below navigation
- **sidebar**: Side column (if your layout has one)
- **footer**: Bottom of page, above copyright
- **inContent**: Between content sections

## Compliance

Ensure your ads comply with:
- Google AdSense policies
- GDPR (EU users)
- CCPA (California users)
- Local advertising regulations

Consider adding a cookie consent banner when using ads.
