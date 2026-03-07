'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Custom hook for client-only rendering
function useClientOnly() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function CookieConsent() {
  const { language } = useLanguage()
  const isClient = useClientOnly()
  
  // Get consent status only on client - use initial value based on server render
  const [isVisible, setIsVisible] = useState(false)

  // Check consent on mount - this is a valid pattern for localStorage check
  useEffect(() => {
    if (isClient && !localStorage.getItem('cookie-consent')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true)
    }
  }, [isClient])

  const translations = {
    de: {
      title: 'Cookie-Einstellungen',
      description: 'Diese Website verwendet Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten. Einige von ihnen sind technisch notwendig, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.',
      acceptAll: 'Alle akzeptieren',
      acceptNecessary: 'Nur notwendige',
      settings: 'Einstellungen',
      necessary: 'Notwendig',
      necessaryDesc: 'Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden.',
      analytics: 'Analyse',
      analyticsDesc: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.',
      marketing: 'Marketing',
      marketingDesc: 'Diese Cookies werden verwendet, um Werbung relevanter zu machen.',
      save: 'Einstellungen speichern'
    },
    en: {
      title: 'Cookie Settings',
      description: 'This website uses cookies to provide you with the best experience on our website. Some of them are technically necessary, while others help us improve this website and your experience.',
      acceptAll: 'Accept All',
      acceptNecessary: 'Necessary Only',
      settings: 'Settings',
      necessary: 'Necessary',
      necessaryDesc: 'These cookies are required for the website to function and cannot be disabled.',
      analytics: 'Analytics',
      analyticsDesc: 'These cookies help us understand how visitors interact with our website.',
      marketing: 'Marketing',
      marketingDesc: 'These cookies are used to make advertising more relevant.',
      save: 'Save Settings'
    },
    fr: {
      title: 'Paramètres des cookies',
      description: 'Ce site web utilise des cookies pour vous offrir la meilleure expérience sur notre site. Certains sont techniquement nécessaires, tandis que d\'autres nous aident à améliorer ce site et votre expérience.',
      acceptAll: 'Tout accepter',
      acceptNecessary: 'Seulement nécessaires',
      settings: 'Paramètres',
      necessary: 'Nécessaires',
      necessaryDesc: 'Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.',
      analytics: 'Analyse',
      analyticsDesc: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site.',
      marketing: 'Marketing',
      marketingDesc: 'Ces cookies sont utilisés pour rendre la publicité plus pertinente.',
      save: 'Enregistrer'
    },
    es: {
      title: 'Configuración de cookies',
      description: 'Este sitio web utiliza cookies para brindarle la mejor experiencia en nuestro sitio. Algunas son técnicamente necesarias, mientras que otras nos ayudan a mejorar este sitio y su experiencia.',
      acceptAll: 'Aceptar todas',
      acceptNecessary: 'Solo necesarias',
      settings: 'Configuración',
      necessary: 'Necesarias',
      necessaryDesc: 'Estas cookies son necesarias para el funcionamiento del sitio y no se pueden desactivar.',
      analytics: 'Análisis',
      analyticsDesc: 'Estas cookies nos ayudan a entender cómo interactúan los visitantes con nuestro sitio.',
      marketing: 'Marketing',
      marketingDesc: 'Estas cookies se utilizan para hacer la publicidad más relevante.',
      save: 'Guardar'
    },
    zh: {
      title: 'Cookie设置',
      description: '本网站使用cookies为您提供最佳的网站体验。其中一些在技术上是必要的，而其他则帮助我们改进本网站和您的体验。',
      acceptAll: '接受全部',
      acceptNecessary: '仅必要',
      settings: '设置',
      necessary: '必要',
      necessaryDesc: '这些cookies是网站运行所必需的，无法禁用。',
      analytics: '分析',
      analyticsDesc: '这些cookies帮助我们了解访客如何与我们的网站互动。',
      marketing: '营销',
      marketingDesc: '这些cookies用于使广告更相关。',
      save: '保存设置'
    }
  }

  const t = translations[language as keyof typeof translations] || translations.de

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setIsVisible(false)
    // Enable all cookies
    window.location.reload()
  }

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    setIsVisible(false)
  }

  // Don't render on server
  if (!isClient) return null

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="cookie-consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {t.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {t.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    {t.acceptAll}
                  </button>
                  <button
                    onClick={handleAcceptNecessary}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-sm transition-colors"
                  >
                    {t.acceptNecessary}
                  </button>
                </div>
              </div>
              <button
                onClick={handleAcceptNecessary}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
