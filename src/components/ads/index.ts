export { GoogleAdSense } from './GoogleAdSense'
export { AdUnit } from './AdUnit'

/**
 * Google AdSense Integration Guide
 * =================================
 * 
 * 1. Get your Publisher ID from Google AdSense dashboard
 *    Format: ca-pub-XXXXXXXXXXXXXXXX
 * 
 * 2. Add the GoogleAdSense component to your root layout:
 * 
 *    // src/app/layout.tsx
 *    import { GoogleAdSense } from '@/components/ads'
 *    
 *    export default function RootLayout({ children }) {
 *      return (
 *        <html>
 *          <head>
 *            <GoogleAdSense publisherId="ca-pub-YOUR_ID" />
 *          </head>
 *          <body>{children}</body>
 *        </html>
 *      )
 *    }
 * 
 * 3. Create Ad Units in AdSense dashboard and get their Slot IDs
 * 
 * 4. Add AdUnit components where you want ads:
 * 
 *    // Horizontal banner ad
 *    <AdUnit slot="1234567890" format="horizontal" />
 *    
 *    // Responsive ad
 *    <AdUnit slot="1234567890" format="auto" />
 *    
 *    // Sidebar ad
 *    <AdUnit slot="1234567890" format="vertical" />
 */
