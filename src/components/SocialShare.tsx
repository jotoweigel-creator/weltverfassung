'use client'

import { useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Share2,
  X,
  Twitter,
  Facebook,
  MessageCircle,
  Send,
  Link2,
  Check,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations, type LanguageCode } from '@/lib/i18n/translations'

// Social share translations
const shareTranslations: Record<LanguageCode, {
  title: string
  subtitle: string
  copyLink: string
  linkCopied: string
  shareOn: string
  close: string
}> = {
  de: { title: "Teilen", subtitle: "Verbreite die Vision einer vereinten Menschheit", copyLink: "Link kopieren", linkCopied: "Kopiert!", shareOn: "Teilen auf", close: "Schließen" },
  en: { title: "Share", subtitle: "Spread the vision of a united humanity", copyLink: "Copy Link", linkCopied: "Copied!", shareOn: "Share on", close: "Close" },
  fr: { title: "Partager", subtitle: "Répandre la vision d'une humanité unie", copyLink: "Copier le lien", linkCopied: "Copié!", shareOn: "Partager sur", close: "Fermer" },
  es: { title: "Compartir", subtitle: "Difunde la visión de una humanidad unida", copyLink: "Copiar enlace", linkCopied: "¡Copiado!", shareOn: "Compartir en", close: "Cerrar" },
  zh: { title: "分享", subtitle: "传播人类团结的愿景", copyLink: "复制链接", linkCopied: "已复制！", shareOn: "分享到", close: "关闭" },
  ar: { title: "مشاركة", subtitle: "انشر رؤية الإنسانية المتحدة", copyLink: "نسخ الرابط", linkCopied: "تم النسخ!", shareOn: "مشاركة على", close: "إغلاق" },
  ru: { title: "Поделиться", subtitle: "Распространите видение объединённого человечества", copyLink: "Скопировать ссылку", linkCopied: "Скопировано!", shareOn: "Поделиться в", close: "Закрыть" },
  pt: { title: "Compartilhar", subtitle: "Espalhe a visão de uma humanidade unida", copyLink: "Copiar link", linkCopied: "Copiado!", shareOn: "Compartilhar no", close: "Fechar" },
  it: { title: "Condividi", subtitle: "Diffondi la visione di un'umanità unita", copyLink: "Copia link", linkCopied: "Copiato!", shareOn: "Condividi su", close: "Chiudi" },
  ja: { title: "共有", subtitle: "人類統一のビジョンを広める", copyLink: "リンクをコピー", linkCopied: "コピーしました！", shareOn: "共有先", close: "閉じる" },
  hi: { title: "साझा करें", subtitle: "एकजुट मानवता की दृष्टि फैलाएं", copyLink: "लिंक कॉपी करें", linkCopied: "कॉपी हो गया!", shareOn: "पर साझा करें", close: "बंद करें" },
  ko: { title: "공유", subtitle: "통합 인류의 비전을 전파하세요", copyLink: "링크 복사", linkCopied: "복사됨!", shareOn: "공유하기", close: "닫기" },
  tr: { title: "Paylaş", subtitle: "Birleşik insanlık vizyonunu yayın", copyLink: "Linki kopyala", linkCopied: "Kopyalandı!", shareOn: "Paylaş", close: "Kapat" },
  id: { title: "Bagikan", subtitle: "Sebarkan visi kemanusiaan yang bersatu", copyLink: "Salin tautan", linkCopied: "Disalin!", shareOn: "Bagikan di", close: "Tutup" },
  bn: { title: "শেয়ার করুন", subtitle: "একত্রিত মানবতার দৃষ্টি ছড়িয়ে দিন", copyLink: "লিংক কপি করুন", linkCopied: "কপি হয়েছে!", shareOn: "শেয়ার করুন", close: "বন্ধ করুন" },
  vi: { title: "Chia sẻ", subtitle: "Lan tỏa tầm nhìn nhân loại thống nhất", copyLink: "Sao chép liên kết", linkCopied: "Đã sao chép!", shareOn: "Chia sẻ trên", close: "Đóng" },
  fa: { title: "اشتراک‌گذاری", subtitle: "چشم‌انداز بشریت متحد را گسترش دهید", copyLink: "کپی لینک", linkCopied: "کپی شد!", shareOn: "اشتراک در", close: "بستن" },
  sw: { title: "Shiriki", subtitle: "Sambaza maono ya ubinadamu uliounganishwa", copyLink: "Nakili kiungo", linkCopied: "Imenakiliwa!", shareOn: "Shiriki kwenye", close: "Funga" },
  pl: { title: "Udostępnij", subtitle: "Szerz wizję zjednoczonej ludzkości", copyLink: "Kopiuj link", linkCopied: "Skopiowano!", shareOn: "Udostępnij na", close: "Zamknij" },
  uk: { title: "Поділитися", subtitle: "Поширюйте бачення об'єднаного людства", copyLink: "Копіювати посилання", linkCopied: "Скопійовано!", shareOn: "Поділитися в", close: "Закрити" }
}

interface SocialPlatform {
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  getShareUrl: (url: string, text: string) => string
}

// Custom hook for client-only rendering
function useClientOnly() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function SocialShare() {
  const { language } = useLanguage()
  const t = shareTranslations[language] || shareTranslations.en
  const isClient = useClientOnly()
  const [isOpen, setIsOpen] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const shareUrl = 'https://worldcodex.space.z.ai'
  const shareText = language === 'de' 
    ? 'Die Verfassung der Vereinten Menschheit - Eine Vision für eine gerechte und nachhaltige Welt'
    : language === 'en'
    ? 'The Constitution of United Humanity - A vision for a just and sustainable world'
    : 'The Constitution of United Humanity - A vision for a just and sustainable world'

  // Social platforms configuration
  const platforms: SocialPlatform[] = [
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-5 h-5" />,
      color: 'text-white',
      bgColor: 'bg-black hover:bg-gray-800',
      getShareUrl: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'text-white',
      bgColor: 'bg-[#1877f2] hover:bg-[#166fe5]',
      getShareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'text-white',
      bgColor: 'bg-[#25d366] hover:bg-[#22c55e]',
      getShareUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      color: 'text-white',
      bgColor: 'bg-[#0088cc] hover:bg-[#0077b5]',
      getShareUrl: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    },
    {
      name: 'Reddit',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      ),
      color: 'text-white',
      bgColor: 'bg-[#ff4500] hover:bg-[#e63e00]',
      getShareUrl: (url, text) => `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
    },
    {
      name: 'Discord',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      color: 'text-white',
      bgColor: 'bg-[#5865f2] hover:bg-[#4752c4]',
      getShareUrl: (url, text) => `https://discord.com/channels/@me?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'text-white',
      bgColor: 'bg-[#0a66c2] hover:bg-[#004182]',
      getShareUrl: (url, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    {
      name: 'Pinterest',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
        </svg>
      ),
      color: 'text-white',
      bgColor: 'bg-[#e60023] hover:bg-[#c8102e]',
      getShareUrl: (url, text) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`
    },
    {
      name: 'Mastodon',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 5.354-4.426.08-.35.166-.71.22-1.07.096-.623.166-1.25.19-1.882.054-1.378.042-2.761-.02-4.138-.02-.437-.05-.875-.094-1.31zM19.37 14.395h-2.47v-6.06c0-1.275-.535-1.923-1.59-1.923-1.172 0-1.76.758-1.76 2.254v3.267h-2.457V8.666c0-1.496-.588-2.254-1.76-2.254-1.055 0-1.59.648-1.59 1.922v6.061H5.27V8.283c0-1.274.324-2.285.974-3.032.67-.75 1.55-1.134 2.64-1.134 1.262 0 2.217.485 2.853 1.455l.615 1.033.615-1.033c.636-.97 1.59-1.455 2.852-1.455 1.09 0 1.97.384 2.64 1.134.65.747.974 1.758.974 3.032v6.112z"/>
        </svg>
      ),
      color: 'text-white',
      bgColor: 'bg-[#6364ff] hover:bg-[#563acc]',
      getShareUrl: (url, text) => `https://mastodon.social/share?text=${encodeURIComponent(text + ' ' + url)}`
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 6-10 7L2 6"/>
        </svg>
      ),
      color: 'text-white',
      bgColor: 'bg-gray-600 hover:bg-gray-700',
      getShareUrl: (url, text) => `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = (platform: SocialPlatform) => {
    const url = platform.getShareUrl(shareUrl, shareText)
    window.open(url, '_blank', 'width=600,height=400')
  }

  // Don't render until on client to prevent hydration mismatch
  if (!isClient) return null

  return (
    <>
      {/* Floating Share Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <Share2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-white text-blue-500 text-xs font-bold px-2 py-1 rounded-full shadow-md">
          {t.title}
        </span>
      </motion.button>

      {/* Share Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white rounded-t-2xl">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{t.title}</h2>
                      <p className="text-white/80 text-sm">{t.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Social Platforms Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {platforms.map((platform) => (
                      <button
                        key={platform.name}
                        onClick={() => handleShare(platform)}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl ${platform.bgColor} ${platform.color} transition-all transform hover:scale-105 shadow-md`}
                      >
                        {platform.icon}
                        <span className="text-xs font-medium">{platform.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Copy Link */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {t.copyLink}
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm"
                      />
                      <button
                        onClick={copyToClipboard}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          linkCopied
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500'
                        }`}
                      >
                        {linkCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            {t.linkCopied}
                          </>
                        ) : (
                          <>
                            <Link2 className="w-4 h-4" />
                            {t.copyLink}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default SocialShare
