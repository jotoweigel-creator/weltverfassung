import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Weltverfassung - World Constitution | Eine Verfassung für die Menschheit',
  description: 'Die Weltverfassung - Eine Vision für Frieden, Menschenrechte und globale Solidarität. The World Constitution - A vision for peace, human rights and global solidarity.',
  keywords: ['Weltverfassung', 'World Constitution', 'Menschenrechte', 'Human Rights', 'Frieden', 'Peace', 'Global', 'Verfassung', 'Constitution', 'Humanity', 'Menschheit'],
  authors: [{ name: 'Johannes Weigel' }],
  creator: 'Johannes Weigel',
  publisher: 'Johannes Weigel',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://worldcodex.space.z.ai',
    languages: {
      'de': 'https://worldcodex.space.z.ai/?lang=de',
      'en': 'https://worldcodex.space.z.ai/?lang=en',
      'es': 'https://worldcodex.space.z.ai/?lang=es',
      'fr': 'https://worldcodex.space.z.ai/?lang=fr',
      'it': 'https://worldcodex.space.z.ai/?lang=it',
      'pt': 'https://worldcodex.space.z.ai/?lang=pt',
      'ru': 'https://worldcodex.space.z.ai/?lang=ru',
      'zh': 'https://worldcodex.space.z.ai/?lang=zh',
      'ja': 'https://worldcodex.space.z.ai/?lang=ja',
      'ko': 'https://worldcodex.space.z.ai/?lang=ko',
      'ar': 'https://worldcodex.space.z.ai/?lang=ar',
      'hi': 'https://worldcodex.space.z.ai/?lang=hi',
      'bn': 'https://worldcodex.space.z.ai/?lang=bn',
      'tr': 'https://worldcodex.space.z.ai/?lang=tr',
      'pl': 'https://worldcodex.space.z.ai/?lang=pl',
      'uk': 'https://worldcodex.space.z.ai/?lang=uk',
      'id': 'https://worldcodex.space.z.ai/?lang=id',
      'fa': 'https://worldcodex.space.z.ai/?lang=fa',
      'sw': 'https://worldcodex.space.z.ai/?lang=sw',
      'vi': 'https://worldcodex.space.z.ai/?lang=vi',
    },
  },
  openGraph: {
    title: 'Weltverfassung - World Constitution',
    description: 'Eine Verfassung für die Menschheit - A Constitution for Humanity',
    url: 'https://worldcodex.space.z.ai',
    siteName: 'Weltverfassung',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1344,
        height: 768,
        alt: 'Weltverfassung - World Constitution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weltverfassung - World Constitution',
    description: 'Eine Verfassung für die Menschheit - A Constitution for Humanity',
    images: ['/og-image.svg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png' }
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="theme-color" content="#1e3a8a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Weltverfassung',
              description: 'Eine Verfassung für die Menschheit',
              url: 'https://worldcodex.space.z.ai',
              author: {
                '@type': 'Person',
                name: 'Johannes Weigel',
              },
              inLanguage: ['de', 'en', 'es', 'fr', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'bn', 'tr', 'pl', 'uk', 'id', 'fa', 'sw', 'vi'],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
