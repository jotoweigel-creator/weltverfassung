import type { Metadata, Viewport } from 'next'

// SEO Metadata for the World Constitution website
export const metadata: Metadata = {
  title: {
    default: 'Weltverfassung - Die Verfassung der Vereinten Menschheit',
    template: '%s | Weltverfassung'
  },
  description: 'Die Verfassung der Vereinten Menschheit - Ein visionärer Entwurf für eine gerechte, nachhaltige und friedliche Weltordnung. Unterstützt von Menschen weltweit in 20 Sprachen.',
  keywords: [
    'Weltverfassung',
    'Verfassung der Vereinten Menschheit',
    'World Constitution',
    'Constitution of United Humanity',
    'global governance',
    'Menschenrechte',
    'human rights',
    'Weltfrieden',
    'world peace',
    'Nachhaltigkeit',
    'sustainability',
    'Klimaschutz',
    'climate protection',
    'Gerechtigkeit',
    'justice',
    'Demokratie',
    'democracy',
    'Globalisierung',
    'globalization',
    'Vereinte Nationen',
    'United Nations',
    'Völkerrecht',
    'international law',
    'Weltordnung',
    'world order',
    'Verfassungsrecht',
    'constitutional law'
  ],
  authors: [{ name: 'Johannes Weigel' }],
  creator: 'Johannes Weigel',
  publisher: 'Johannes Weigel',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://worldcodex.space.z.ai'),
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/?lang=de',
      'en-US': '/?lang=en',
      'fr-FR': '/?lang=fr',
      'es-ES': '/?lang=es',
      'zh-CN': '/?lang=zh',
      'ar-SA': '/?lang=ar',
      'ru-RU': '/?lang=ru',
      'pt-BR': '/?lang=pt',
      'it-IT': '/?lang=it',
      'ja-JP': '/?lang=ja',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: ['en_US', 'fr_FR', 'es_ES', 'zh_CN', 'ar_SA', 'ru_RU'],
    url: 'https://worldcodex.space.z.ai',
    siteName: 'Weltverfassung - Verfassung der Vereinten Menschheit',
    title: 'Weltverfassung - Die Verfassung der Vereinten Menschheit',
    description: 'Die Verfassung der Vereinten Menschheit - Ein visionärer Entwurf für eine gerechte, nachhaltige und friedliche Weltordnung. Lies, diskutiere und teile die Verfassung.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Weltverfassung - Die Verfassung der Vereinten Menschheit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weltverfassung - Die Verfassung der Vereinten Menschheit',
    description: 'Die Verfassung der Vereinten Menschheit - Ein visionärer Entwurf für eine gerechte, nachhaltige und friedliche Weltordnung.',
    images: ['/og-image.png'],
    creator: '@weltverfassung',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Government',
  classification: 'Constitution',
  applicationName: 'Weltverfassung',
  referrer: 'origin-when-cross-origin',
  appLinks: {
    web: {
      url: 'https://worldcodex.space.z.ai',
      should_fallback: true,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e3a8a' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// Structured Data for SEO (JSON-LD)
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Weltverfassung',
  alternateName: 'Constitution of United Humanity',
  url: 'https://worldcodex.space.z.ai',
  description: 'Die Verfassung der Vereinten Menschheit - Ein visionärer Entwurf für eine gerechte, nachhaltige und friedliche Weltordnung.',
  inLanguage: ['de', 'en', 'fr', 'es', 'zh', 'ar', 'ru', 'pt', 'it', 'ja', 'hi', 'ko', 'tr', 'id', 'bn', 'vi', 'fa', 'sw', 'pl', 'uk'],
  author: {
    '@type': 'Person',
    name: 'Johannes Weigel',
    email: 'joto.weigel@gmail.com',
  },
  publisher: {
    '@type': 'Person',
    name: 'Johannes Weigel',
  },
  potentialAction: {
    '@type': 'ReadAction',
    target: 'https://worldcodex.space.z.ai',
  },
}

export const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Verfassung der Vereinten Menschheit',
  alternativeHeadline: 'World Constitution - Constitution of United Humanity',
  description: 'Eine umfassende Verfassung für die gesamte Menschheit mit Grundrechten, Governance-Strukturen und ökologischen Rahmenbedingungen.',
  author: {
    '@type': 'Person',
    name: 'Johannes Weigel',
  },
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'de',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://worldcodex.space.z.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Weltverfassung',
    logo: {
      '@type': 'ImageObject',
      url: 'https://worldcodex.space.z.ai/logo.png',
    },
  },
}

// FAQ Structured Data for rich snippets
export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist die Weltverfassung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Weltverfassung ist ein visionärer Entwurf für eine globale Ordnung, die auf Menschenrechten, Nachhaltigkeit, Gerechtigkeit und Frieden basiert. Sie wurde entwickelt als Rahmen für eine vereinte Menschheit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wer hat die Weltverfassung geschrieben?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Weltverfassung wurde von Johannes Weigel entwickelt und steht unter einer offenen Lizenz zur freien Nutzung und Weiterentwicklung.',
      },
    },
    {
      '@type': 'Question',
      name: 'In welchen Sprachen ist die Verfassung verfügbar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Verfassung ist derzeit in 20 Sprachen verfügbar: Deutsch, Englisch, Französisch, Spanisch, Chinesisch, Arabisch, Russisch, Portugiesisch, Italienisch, Japanisch, Hindi, Koreanisch, Türkisch, Indonesisch, Bengali, Vietnamesisch, Farsi, Swahili, Polnisch und Ukrainisch.',
      },
    },
  ],
}
