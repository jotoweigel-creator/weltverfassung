'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileDown,
  X,
  FileText,
  Globe,
  Check,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations, type LanguageCode } from '@/lib/i18n/translations'

// Download translations
const downloadTranslations: Record<LanguageCode, {
  title: string
  subtitle: string
  description: string
  downloadPdf: string
  downloadFull: string
  downloadSummary: string
  downloading: string
  downloaded: string
  format: string
  size: string
  close: string
}> = {
  de: {
    title: "Verfassung Herunterladen",
    subtitle: "Laden Sie die Verfassung als PDF",
    description: "Speichern Sie die Verfassung der Vereinten Menschheit offline oder teilen Sie sie mit anderen.",
    downloadPdf: "Als PDF herunterladen",
    downloadFull: "Vollständige Version",
    downloadSummary: "Zusammenfassung",
    downloading: "Wird heruntergeladen...",
    downloaded: "Heruntergeladen!",
    format: "Format",
    size: "Größe",
    close: "Schließen"
  },
  en: {
    title: "Download Constitution",
    subtitle: "Download the constitution as PDF",
    description: "Save the Constitution of United Humanity offline or share it with others.",
    downloadPdf: "Download as PDF",
    downloadFull: "Full Version",
    downloadSummary: "Summary",
    downloading: "Downloading...",
    downloaded: "Downloaded!",
    format: "Format",
    size: "Size",
    close: "Close"
  },
  fr: {
    title: "Télécharger la Constitution",
    subtitle: "Téléchargez la constitution en PDF",
    description: "Enregistrez la Constitution de l'Humanité Unie hors ligne ou partagez-la avec d'autres.",
    downloadPdf: "Télécharger en PDF",
    downloadFull: "Version complète",
    downloadSummary: "Résumé",
    downloading: "Téléchargement...",
    downloaded: "Téléchargé!",
    format: "Format",
    size: "Taille",
    close: "Fermer"
  },
  es: {
    title: "Descargar Constitución",
    subtitle: "Descarga la constitución en PDF",
    description: "Guarda la Constitución de la Humanidad Unida sin conexión o compártela con otros.",
    downloadPdf: "Descargar como PDF",
    downloadFull: "Versión completa",
    downloadSummary: "Resumen",
    downloading: "Descargando...",
    downloaded: "¡Descargado!",
    format: "Formato",
    size: "Tamaño",
    close: "Cerrar"
  },
  zh: {
    title: "下载宪法",
    subtitle: "下载PDF版宪法",
    description: "离线保存人类联合宪法或与他人分享。",
    downloadPdf: "下载PDF",
    downloadFull: "完整版",
    downloadSummary: "摘要版",
    downloading: "下载中...",
    downloaded: "已下载！",
    format: "格式",
    size: "大小",
    close: "关闭"
  },
  ar: {
    title: "تحميل الدستور",
    subtitle: "حمّل الدستور كملف PDF",
    description: "احفظ دستور الإنسانية المتحدة دون اتصال أو شاركه مع الآخرين.",
    downloadPdf: "تحميل كـ PDF",
    downloadFull: "النسخة الكاملة",
    downloadSummary: "ملخص",
    downloading: "جاري التحميل...",
    downloaded: "تم التحميل!",
    format: "الصيغة",
    size: "الحجم",
    close: "إغلاق"
  },
  ru: {
    title: "Скачать Конституцию",
    subtitle: "Скачайте конституцию в PDF",
    description: "Сохраните Конституцию Объединённого Человечества офлайн или поделитесь с другими.",
    downloadPdf: "Скачать как PDF",
    downloadFull: "Полная версия",
    downloadSummary: "Краткая версия",
    downloading: "Загрузка...",
    downloaded: "Скачано!",
    format: "Формат",
    size: "Размер",
    close: "Закрыть"
  },
  pt: {
    title: "Baixar Constituição",
    subtitle: "Baixe a constituição em PDF",
    description: "Salve a Constituição da Humanidade Unida offline ou compartilhe com outros.",
    downloadPdf: "Baixar como PDF",
    downloadFull: "Versão completa",
    downloadSummary: "Resumo",
    downloading: "Baixando...",
    downloaded: "Baixado!",
    format: "Formato",
    size: "Tamanho",
    close: "Fechar"
  },
  it: {
    title: "Scarica Costituzione",
    subtitle: "Scarica la costituzione in PDF",
    description: "Salva la Costituzione dell'Umanità Unita offline o condividila con altri.",
    downloadPdf: "Scarica come PDF",
    downloadFull: "Versione completa",
    downloadSummary: "Riassunto",
    downloading: "Download in corso...",
    downloaded: "Scaricato!",
    format: "Formato",
    size: "Dimensione",
    close: "Chiudi"
  },
  ja: {
    title: "憲法をダウンロード",
    subtitle: "PDFで憲法をダウンロード",
    description: "人類統一憲法をオフラインで保存したり、他の人と共有したりできます。",
    downloadPdf: "PDFとしてダウンロード",
    downloadFull: "完全版",
    downloadSummary: "要約版",
    downloading: "ダウンロード中...",
    downloaded: "ダウンロード完了！",
    format: "形式",
    size: "サイズ",
    close: "閉じる"
  },
  hi: {
    title: "संविधान डाउनलोड करें",
    subtitle: "PDF के रूप में संविधान डाउनलोड करें",
    description: "संयुक्त मानवता के संविधान को ऑफ़लाइन सहेजें या दूसरों के साथ साझा करें।",
    downloadPdf: "PDF के रूप में डाउनलोड करें",
    downloadFull: "पूर्ण संस्करण",
    downloadSummary: "सारांश",
    downloading: "डाउनलोड हो रहा है...",
    downloaded: "डाउनलोड हो गया!",
    format: "प्रारूप",
    size: "आकार",
    close: "बंद करें"
  },
  ko: {
    title: "헌법 다운로드",
    subtitle: "PDF로 헌법 다운로드",
    description: "인류 통합 헌법을 오프라인으로 저장하거나 다른 사람과 공유하세요.",
    downloadPdf: "PDF로 다운로드",
    downloadFull: "전체 버전",
    downloadSummary: "요약",
    downloading: "다운로드 중...",
    downloaded: "다운로드 완료!",
    format: "형식",
    size: "크기",
    close: "닫기"
  },
  tr: {
    title: "Anayasayı İndir",
    subtitle: "Anayasayı PDF olarak indir",
    description: "Birleşik İnsanlık Anayasasını çevrimdışı kaydedin veya başkalarıyla paylaşın.",
    downloadPdf: "PDF olarak indir",
    downloadFull: "Tam sürüm",
    downloadSummary: "Özet",
    downloading: "İndiriliyor...",
    downloaded: "İndirildi!",
    format: "Format",
    size: "Boyut",
    close: "Kapat"
  },
  id: {
    title: "Unduh Konstitusi",
    subtitle: "Unduh konstitusi sebagai PDF",
    description: "Simpan Konstitusi Kemanusiaan Bersatu secara offline atau bagikan dengan orang lain.",
    downloadPdf: "Unduh sebagai PDF",
    downloadFull: "Versi lengkap",
    downloadSummary: "Ringkasan",
    downloading: "Mengunduh...",
    downloaded: "Terunduh!",
    format: "Format",
    size: "Ukuran",
    close: "Tutup"
  },
  bn: {
    title: "সংবিধান ডাউনলোড করুন",
    subtitle: "PDF হিসাবে সংবিধান ডাউনলোড করুন",
    description: "ইউনাইটেড হিউম্যানিটির সংবিধান অফলাইনে সংরক্ষণ করুন বা অন্যদের সাথে শেয়ার করুন।",
    downloadPdf: "PDF হিসাবে ডাউনলোড করুন",
    downloadFull: "সম্পূর্ণ সংস্করণ",
    downloadSummary: "সারাংশ",
    downloading: "ডাউনলোড হচ্ছে...",
    downloaded: "ডাউনলোড হয়েছে!",
    format: "ফরম্যাট",
    size: "আকার",
    close: "বন্ধ করুন"
  },
  vi: {
    title: "Tải xuống Hiến pháp",
    subtitle: "Tải xuống hiến pháp dưới dạng PDF",
    description: "Lưu Hiến pháp Nhân loại Thống nhất ngoại tuyến hoặc chia sẻ với người khác.",
    downloadPdf: "Tải xuống dưới dạng PDF",
    downloadFull: "Phiên bản đầy đủ",
    downloadSummary: "Tóm tắt",
    downloading: "Đang tải xuống...",
    downloaded: "Đã tải xuống!",
    format: "Định dạng",
    size: "Kích thước",
    close: "Đóng"
  },
  fa: {
    title: "دانلود قانون اساسی",
    subtitle: "قانون اساسی را به صورت PDF دانلود کنید",
    description: "قانون اساسی بشریت متحد را آفلاین ذخیره کنید یا با دیگران به اشتراک بگذارید.",
    downloadPdf: "دانلود به صورت PDF",
    downloadFull: "نسخه کامل",
    downloadSummary: "خلاصه",
    downloading: "در حال دانلود...",
    downloaded: "دانلود شد!",
    format: "فرمت",
    size: "حجم",
    close: "بستن"
  },
  sw: {
    title: "Pakua Katiba",
    subtitle: "Pakua katiba kama PDF",
    description: "Hifadhi Katiba ya Umoja wa Binadamu nje ya mtandao au ushiriki na wengine.",
    downloadPdf: "Pakua kama PDF",
    downloadFull: "Toleo kamili",
    downloadSummary: "Muhtasari",
    downloading: "Inapakua...",
    downloaded: "Imepakuliwa!",
    format: "Muundo",
    size: "Ukubwa",
    close: "Funga"
  },
  pl: {
    title: "Pobierz Konstytucję",
    subtitle: "Pobierz konstytucję jako PDF",
    description: "Zapisz Konstytucję Zjednoczonej Ludzkości offline lub udostępnij innym.",
    downloadPdf: "Pobierz jako PDF",
    downloadFull: "Pełna wersja",
    downloadSummary: "Podsumowanie",
    downloading: "Pobieranie...",
    downloaded: "Pobrano!",
    format: "Format",
    size: "Rozmiar",
    close: "Zamknij"
  },
  uk: {
    title: "Завантажити Конституцію",
    subtitle: "Завантажте конституцію як PDF",
    description: "Збережіть Конституцію Об'єднаного Людства офлайн або поділіться з іншими.",
    downloadPdf: "Завантажити як PDF",
    downloadFull: "Повна версія",
    downloadSummary: "Коротка версія",
    downloading: "Завантаження...",
    downloaded: "Завантажено!",
    format: "Формат",
    size: "Розмір",
    close: "Закрити"
  }
}

interface DownloadOption {
  id: string
  name: string
  description: string
  url: string
  size: string
  icon: React.ReactNode
}

export function PDFDownloadButton() {
  const { language } = useLanguage()
  const t = downloadTranslations[language] || downloadTranslations.en
  const [isOpen, setIsOpen] = useState(false)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [downloadedId, setDownloadedId] = useState<string | null>(null)

  // Available downloads
  const downloads: DownloadOption[] = [
    {
      id: 'full-de',
      name: `${downloadTranslations.de.downloadFull} (Deutsch)`,
      description: 'Vollständige Verfassung mit allen Artikeln und Anlagen',
      url: '/upload/Weltverfassung_Final.pdf',
      size: '~2 MB',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'full-en',
      name: `${downloadTranslations.en.downloadFull} (English)`,
      description: 'Complete constitution with all articles and annexes',
      url: '/upload/Weltverfassung.pdf',
      size: '~2 MB',
      icon: <FileText className="w-5 h-5" />
    }
  ]

  const handleDownload = async (option: DownloadOption) => {
    setDownloadingId(option.id)
    
    try {
      // Create a temporary link to trigger download
      const link = document.createElement('a')
      link.href = option.url
      link.download = option.url.split('/').pop() || 'constitution.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setDownloadedId(option.id)
      setTimeout(() => {
        setDownloadedId(null)
        setDownloadingId(null)
      }, 2000)
    } catch (error) {
      console.error('Download failed:', error)
      setDownloadingId(null)
    }
  }

  return (
    <>
      {/* Download Button in Navigation */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium shadow-lg hover:shadow-emerald-500/25 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FileDown className="w-4 h-4" />
        <span className="hidden sm:inline">{t.downloadPdf}</span>
        <span className="sm:hidden">{t.downloadPdf}</span>
      </motion.button>

      {/* Download Modal */}
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
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white rounded-t-2xl">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Download className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{t.title}</h2>
                      <p className="text-white/80 text-sm">{t.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {t.description}
                  </p>

                  {/* Download Options */}
                  <div className="space-y-3">
                    {downloads.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleDownload(option)}
                        disabled={downloadingId !== null}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          downloadedId === option.id
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-slate-200 dark:border-slate-600 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          downloadedId === option.id
                            ? 'bg-green-500 text-white'
                            : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {downloadedId === option.id ? (
                            <Check className="w-5 h-5" />
                          ) : downloadingId === option.id ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Download className="w-5 h-5" />
                            </motion.div>
                          ) : (
                            option.icon
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-slate-900 dark:text-white">
                            {option.name}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {option.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400 dark:text-slate-500">PDF</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{option.size}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                      💡 {language === 'de' 
                        ? 'Die PDFs können frei geteilt und verbreitet werden.' 
                        : 'The PDFs can be freely shared and distributed.'}
                    </p>
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

export default PDFDownloadButton
