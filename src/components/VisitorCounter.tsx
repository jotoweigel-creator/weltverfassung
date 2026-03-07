'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Eye, Clock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface VisitorStats {
  totalVisitors: number
  uniqueVisitors: number
  onlineSince: string
  isNewVisitor: boolean
}

export function VisitorCounter() {
  const { language } = useLanguage()
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch visitor stats
    fetch('/api/visitors')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const localeMap: Record<string, string> = {
      de: 'de-DE',
      en: 'en-US',
      fr: 'fr-FR',
      es: 'es-ES',
      zh: 'zh-CN',
      ar: 'ar-SA',
      ru: 'ru-RU',
      pt: 'pt-BR',
      it: 'it-IT',
      ja: 'ja-JP'
    }
    return date.toLocaleDateString(localeMap[language] || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Translations
  const translations = {
    de: {
      visitors: 'Besucher',
      pageViews: 'Seitenaufrufe',
      onlineSince: 'Online seit',
      welcome: 'Willkommen!'
    },
    en: {
      visitors: 'Visitors',
      pageViews: 'Page Views',
      onlineSince: 'Online since',
      welcome: 'Welcome!'
    },
    fr: {
      visitors: 'Visiteurs',
      pageViews: 'Pages vues',
      onlineSince: 'En ligne depuis',
      welcome: 'Bienvenue!'
    },
    es: {
      visitors: 'Visitantes',
      pageViews: 'Vistas de página',
      onlineSince: 'En línea desde',
      welcome: '¡Bienvenido!'
    },
    zh: {
      visitors: '访客',
      pageViews: '页面浏览',
      onlineSince: '上线时间',
      welcome: '欢迎!'
    },
    ar: {
      visitors: 'الزوار',
      pageViews: 'مشاهدات الصفحة',
      onlineSince: 'عبر الإنترنت منذ',
      welcome: 'أهلاً بك!'
    },
    ru: {
      visitors: 'Посетители',
      pageViews: 'Просмотры',
      onlineSince: 'В сети с',
      welcome: 'Добро пожаловать!'
    },
    pt: {
      visitors: 'Visitantes',
      pageViews: 'Visualizações',
      onlineSince: 'Online desde',
      welcome: 'Bem-vindo!'
    },
    it: {
      visitors: 'Visitatori',
      pageViews: 'Visualizzazioni',
      onlineSince: 'Online dal',
      welcome: 'Benvenuto!'
    },
    ja: {
      visitors: '訪問者',
      pageViews: 'ページビュー',
      onlineSince: 'オンライン開始',
      welcome: 'ようこそ!'
    }
  }

  const t = translations[language] || translations.en

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded"></div>
          <div className="w-20 h-4 bg-slate-300 rounded"></div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm"
    >
      {/* Unique Visitors */}
      <div className="flex items-center gap-2 text-slate-400">
        <Users className="w-4 h-4" />
        <span className="font-medium text-slate-500 dark:text-slate-400">
          {stats.uniqueVisitors.toLocaleString()}
        </span>
        <span>{t.visitors}</span>
      </div>

      {/* Page Views */}
      <div className="flex items-center gap-2 text-slate-400">
        <Eye className="w-4 h-4" />
        <span className="font-medium text-slate-500 dark:text-slate-400">
          {stats.totalVisitors.toLocaleString()}
        </span>
        <span>{t.pageViews}</span>
      </div>

      {/* Online Since */}
      <div className="flex items-center gap-2 text-slate-400">
        <Clock className="w-4 h-4" />
        <span>{t.onlineSince}</span>
        <span className="font-medium text-slate-500 dark:text-slate-400">
          {formatDate(stats.onlineSince)}
        </span>
      </div>
    </motion.div>
  )
}
