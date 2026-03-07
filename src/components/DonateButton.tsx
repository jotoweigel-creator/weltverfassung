'use client'

import { useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Coffee, Sparkles, Globe, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations, type LanguageCode } from '@/lib/i18n/translations'

// Custom hook for client-only rendering
function useClientOnly() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

// Donation translations
const donateTranslations: Record<LanguageCode, {
  title: string
  subtitle: string
  description: string
  oneTime: string
  monthly: string
  customAmount: string
  chooseAmount: string
  thankYou: string
  supportProject: string
  paypal: string
  koFi: string
  patreon: string
  bankTransfer: string
  bankInfo: string
  close: string
}> = {
  de: {
    title: "Diese Verfassung Unterstützen",
    subtitle: "Helfen Sie, diese Vision zu verbreiten",
    description: "Ihre Spende hilft, diese Plattform werbefrei zu halten und die Verfassung der Vereinten Menschheit weltweit bekannt zu machen.",
    oneTime: "Einmalig",
    monthly: "Monatlich",
    customAmount: "Eigener Betrag",
    chooseAmount: "Betrag wählen",
    thankYou: "Vielen Dank für Ihre Unterstützung!",
    supportProject: "Projekt unterstützen",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Banküberweisung",
    bankInfo: "Bankverbindung",
    close: "Schließen"
  },
  en: {
    title: "Support This Constitution",
    subtitle: "Help spread this vision",
    description: "Your donation helps keep this platform ad-free and promotes the Constitution of United Humanity worldwide.",
    oneTime: "One-time",
    monthly: "Monthly",
    customAmount: "Custom Amount",
    chooseAmount: "Choose Amount",
    thankYou: "Thank you for your support!",
    supportProject: "Support Project",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Bank Transfer",
    bankInfo: "Bank Details",
    close: "Close"
  },
  fr: {
    title: "Soutenir Cette Constitution",
    subtitle: "Aidez à répandre cette vision",
    description: "Votre don aide à garder cette plateforme sans publicité et promeut la Constitution de l'Humanité Unie dans le monde entier.",
    oneTime: "Unique",
    monthly: "Mensuel",
    customAmount: "Montant Libre",
    chooseAmount: "Choisir le Montant",
    thankYou: "Merci pour votre soutien!",
    supportProject: "Soutenir le Projet",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Virement Bancaire",
    bankInfo: "Coordonnées Bancaires",
    close: "Fermer"
  },
  es: {
    title: "Apoyar Esta Constitución",
    subtitle: "Ayuda a difundir esta visión",
    description: "Tu donación ayuda a mantener esta plataforma sin publicidad y promueve la Constitución de la Humanidad Unida en todo el mundo.",
    oneTime: "Único",
    monthly: "Mensual",
    customAmount: "Cantidad Personalizada",
    chooseAmount: "Elegir Cantidad",
    thankYou: "¡Gracias por tu apoyo!",
    supportProject: "Apoyar Proyecto",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Transferencia Bancaria",
    bankInfo: "Datos Bancarios",
    close: "Cerrar"
  },
  zh: {
    title: "支持这部宪法",
    subtitle: "帮助传播这一愿景",
    description: "您的捐赠有助于保持此平台无广告，并在全球推广人类联合宪法。",
    oneTime: "一次性",
    monthly: "每月",
    customAmount: "自定义金额",
    chooseAmount: "选择金额",
    thankYou: "感谢您的支持！",
    supportProject: "支持项目",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "银行转账",
    bankInfo: "银行信息",
    close: "关闭"
  },
  ar: {
    title: "دعم هذا الدستور",
    subtitle: "ساعد في نشر هذه الرؤية",
    description: "تبرعك يساعد في الحفاظ على هذه المنصة بدون إعلانات ويعزز دستور الإنسانية المتحدة في جميع أنحاء العالم.",
    oneTime: "مرة واحدة",
    monthly: "شهرياً",
    customAmount: "مبلغ مخصص",
    chooseAmount: "اختر المبلغ",
    thankYou: "شكراً لدعمك!",
    supportProject: "دعم المشروع",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "تحويل بنكي",
    bankInfo: "معلومات البنك",
    close: "إغلاق"
  },
  ru: {
    title: "Поддержать Эту Конституцию",
    subtitle: "Помогите распространить это видение",
    description: "Ваше пожертвование помогает сохранять эту платформу без рекламы и продвигает Конституцию Объединённого Человечества по всему миру.",
    oneTime: "Разово",
    monthly: "Ежемесячно",
    customAmount: "Своя Сумма",
    chooseAmount: "Выбрать Сумму",
    thankYou: "Спасибо за вашу поддержку!",
    supportProject: "Поддержать Проект",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Банковский Перевод",
    bankInfo: "Банковские Реквизиты",
    close: "Закрыть"
  },
  pt: {
    title: "Apoiar Esta Constituição",
    subtitle: "Ajude a espalhar esta visão",
    description: "Sua doação ajuda a manter esta plataforma sem anúncios e promove a Constituição da Humanidade Unida em todo o mundo.",
    oneTime: "Única",
    monthly: "Mensal",
    customAmount: "Valor Personalizado",
    chooseAmount: "Escolher Valor",
    thankYou: "Obrigado pelo seu apoio!",
    supportProject: "Apoiar Projeto",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Transferência Bancária",
    bankInfo: "Dados Bancários",
    close: "Fechar"
  },
  it: {
    title: "Sostieni Questa Costituzione",
    subtitle: "Aiuta a diffondere questa visione",
    description: "La tua donazione aiuta a mantenere questa piattaforma senza pubblicità e promuove la Costituzione dell'Umanità Unita in tutto il mondo.",
    oneTime: "Una Tantum",
    monthly: "Mensile",
    customAmount: "Importo Personalizzato",
    chooseAmount: "Scegli Importo",
    thankYou: "Grazie per il tuo sostegno!",
    supportProject: "Sostieni il Progetto",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Bonifico Bancario",
    bankInfo: "Coordinate Bancarie",
    close: "Chiudi"
  },
  ja: {
    title: "この憲法を支援する",
    subtitle: "このビジョンを広めるのに協力してください",
    description: "あなたの寄付は、このプラットフォームを広告なしで維持し、人類統一憲法を世界中に広めるのに役立ちます。",
    oneTime: "一回限り",
    monthly: "毎月",
    customAmount: "カスタム金額",
    chooseAmount: "金額を選択",
    thankYou: "ご支援ありがとうございます！",
    supportProject: "プロジェクトを支援",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "銀行振込",
    bankInfo: "銀行情報",
    close: "閉じる"
  },
  hi: {
    title: "इस संविधान का समर्थन करें",
    subtitle: "इस दृष्टि को फैलाने में मदद करें",
    description: "आपका दान इस प्लेटफॉर्म को विज्ञापन-मुक्त रखने और दुनिया भर में संयुक्त मानवता के संविधान को बढ़ावा देने में मदद करता है।",
    oneTime: "एक बार",
    monthly: "मासिक",
    customAmount: "कस्टम राशि",
    chooseAmount: "राशि चुनें",
    thankYou: "आपके समर्थन के लिए धन्यवाद!",
    supportProject: "परियोजना का समर्थन करें",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "बैंक ट्रांसफर",
    bankInfo: "बैंक विवरण",
    close: "बंद करें"
  },
  ko: {
    title: "이 헌법 지지하기",
    subtitle: "이 비전을 전파하는 데 도움을 주세요",
    description: "여러분의 기부는 이 플랫폼을 광고 없이 유지하고 전 세계에 인류 통합 헌법을 홍보하는 데 도움이 됩니다.",
    oneTime: "일회성",
    monthly: "월간",
    customAmount: "사용자 지정 금액",
    chooseAmount: "금액 선택",
    thankYou: "지원해 주셔서 감사합니다!",
    supportProject: "프로젝트 지지",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "은행 이체",
    bankInfo: "은행 정보",
    close: "닫기"
  },
  tr: {
    title: "Bu Anayasayı Destekleyin",
    subtitle: "Bu vizyonu yaymaya yardımcı olun",
    description: "Bağışınız bu platformu reklamsız tutmaya ve Birleşik İnsanlık Anayasasını dünya çapında tanıtmaya yardımcı olur.",
    oneTime: "Tek Seferlik",
    monthly: "Aylık",
    customAmount: "Özel Tutar",
    chooseAmount: "Tutar Seç",
    thankYou: "Desteğiniz için teşekkürler!",
    supportProject: "Projeyi Destekle",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Banka Transferi",
    bankInfo: "Banka Bilgileri",
    close: "Kapat"
  },
  id: {
    title: "Dukung Konstitusi Ini",
    subtitle: "Bantu menyebarkan visi ini",
    description: "Donasi Anda membantu menjaga platform ini bebas iklan dan mempromosikan Konstitusi Kemanusiaan Bersatu di seluruh dunia.",
    oneTime: "Sekali",
    monthly: "Bulanan",
    customAmount: "Jumlah Kustom",
    chooseAmount: "Pilih Jumlah",
    thankYou: "Terima kasih atas dukungan Anda!",
    supportProject: "Dukung Proyek",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Transfer Bank",
    bankInfo: "Info Bank",
    close: "Tutup"
  },
  bn: {
    title: "এই সংবিধান সমর্থন করুন",
    subtitle: "এই দৃষ্টিভঙ্গি ছড়িয়ে দিতে সাহায্য করুন",
    description: "আপনার দান এই প্ল্যাটফর্মটিকে বিজ্ঞাপন-মুক্ত রাখতে এবং বিশ্বজুড়ে ইউনাইটেড হিউম্যানিটির সংবিধান প্রচার করতে সাহায্য করে।",
    oneTime: "একবার",
    monthly: "মাসিক",
    customAmount: "কাস্টম পরিমাণ",
    chooseAmount: "পরিমাণ নির্বাচন করুন",
    thankYou: "আপনার সমর্থনের জন্য ধন্যবাদ!",
    supportProject: "প্রকল্প সমর্থন করুন",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "ব্যাংক ট্রান্সফার",
    bankInfo: "ব্যাংক তথ্য",
    close: "বন্ধ করুন"
  },
  vi: {
    title: "Hỗ trợ Hiến pháp Này",
    subtitle: "Giúp lan tỏa tầm nhìn này",
    description: "Đóng góp của bạn giúp giữ nền tảng này không quảng cáo và thúc đẩy Hiến pháp Nhân loại Thống nhất trên toàn cầu.",
    oneTime: "Một lần",
    monthly: "Hàng tháng",
    customAmount: "Số lượng Tùy chỉnh",
    chooseAmount: "Chọn Số tiền",
    thankYou: "Cảm ơn sự hỗ trợ của bạn!",
    supportProject: "Hỗ trợ Dự án",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Chuyển khoản Ngân hàng",
    bankInfo: "Thông tin Ngân hàng",
    close: "Đóng"
  },
  fa: {
    title: "از این قانون اساسی حمایت کنید",
    subtitle: "کمک کنید این چشم‌انداز را گسترش دهید",
    description: "کمک مالی شما کمک می‌کند این پلتفرم را بدون تبلیغات نگه دارید و قانون اساسی بشریت متحد را در سراسر جهان ترویج کنید.",
    oneTime: "یک بار",
    monthly: "ماهانه",
    customAmount: "مبلغ سفارشی",
    chooseAmount: "انتخاب مبلغ",
    thankYou: "از حمایت شما متشکریم!",
    supportProject: "حمایت از پروژه",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "انتقال بانکی",
    bankInfo: "اطلاعات بانک",
    close: "بستن"
  },
  sw: {
    title: "Saidia Katiba Hii",
    subtitle: "Saidia kueneza maono haya",
    description: "Michango yako inasaidia kuweka jukwaa hili bila matangazo na kuendeleza Katiba ya Umoja wa Binadamu duniani kote.",
    oneTime: "Mara moja",
    monthly: "Kila mwezi",
    customAmount: "Kiasi cha Kibinafsi",
    chooseAmount: "Chagua Kiasi",
    thankYou: "Asante kwa msaada wako!",
    supportProject: "Saidia Mradi",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Uhamisho wa Benki",
    bankInfo: "Maelezo ya Benki",
    close: "Funga"
  },
  pl: {
    title: "Wesprzyj Tę Konstytucję",
    subtitle: "Pomóż rozprzestrzeniać tę wizję",
    description: "Twoja darowizna pomaga utrzymać tę platformę bez reklam i promuje Konstytucję Zjednoczonej Ludzkości na całym świecie.",
    oneTime: "Jednorazowo",
    monthly: "Miesięcznie",
    customAmount: "Własna Kwota",
    chooseAmount: "Wybierz Kwotę",
    thankYou: "Dziękujemy za wsparcie!",
    supportProject: "Wesprzyj Projekt",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Przelew Bankowy",
    bankInfo: "Dane Bankowe",
    close: "Zamknij"
  },
  uk: {
    title: "Підтримати Цю Конституцію",
    subtitle: "Допоможіть поширити це бачення",
    description: "Ваш внесок допомагає зберігати цю платформу без реклами та просуває Конституцію Об'єднаного Людства по всьому світу.",
    oneTime: "Разово",
    monthly: "Щомісяця",
    customAmount: "Власна Сума",
    chooseAmount: "Обрати Суму",
    thankYou: "Дякуємо за вашу підтримку!",
    supportProject: "Підтримати Проект",
    paypal: "PayPal",
    koFi: "Ko-fi",
    patreon: "Patreon",
    bankTransfer: "Банківський Переказ",
    bankInfo: "Банківські Реквізити",
    close: "Закрити"
  }
}

// Predefined donation amounts
const DONATION_AMOUNTS = [5, 10, 25, 50, 100]

export function DonateButton() {
  const { language } = useLanguage()
  const t = donateTranslations[language] || donateTranslations.en
  const isClient = useClientOnly()
  const [isOpen, setIsOpen] = useState(false)
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10)
  const [customAmount, setCustomAmount] = useState('')

  // ==========================================
  // KONFIGURATION - Hier Ihre Daten eintragen
  // ==========================================
  
  // PayPal: Ersetzen Sie 'YOUR_PAYPAL_EMAIL' durch Ihre PayPal-E-Mail
  const PAYPAL_EMAIL = 'joto.weigel@gmail.com'
  
  // Ko-fi: Ersetzen Sie durch Ihren Ko-fi Benutzernamen (ohne @)
  // Beispiel: 'worldcodex' für kofi.com/worldcodex
  const KOFI_USERNAME = '' // Noch nicht eingerichtet
  
  // Patreon: Ersetzen Sie durch Ihren Patreon-Namen
  const PATREON_USERNAME = '' // Noch nicht eingerichtet
  
  // Bankverbindung für Überweisungen
  const BANK_INFO = {
    name: 'Johannes Weigel',
    bank: '', // Bankname
    iban: '', // IBAN
    bic: '' // BIC
  }

  // PayPal Link generieren
  const getPayPalLink = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount
    const baseUrl = 'https://www.paypal.com/donate'
    const params = new URLSearchParams({
      business: PAYPAL_EMAIL,
      currency_code: 'EUR',
      amount: amount?.toString() || '',
      item_name: `Spende für Weltverfassung (${donationType === 'monthly' ? 'monatlich' : 'einmalig'})`,
      custom: donationType
    })
    return `${baseUrl}?${params.toString()}`
  }

  // Ko-fi Link
  const getKoFiLink = () => {
    if (!KOFI_USERNAME) return null
    return `https://ko-fi.com/${KOFI_USERNAME}`
  }

  // Patreon Link
  const getPatreonLink = () => {
    if (!PATREON_USERNAME) return null
    return `https://patreon.com/${PATREON_USERNAME}`
  }

  const currentAmount = customAmount ? parseFloat(customAmount) : selectedAmount

  // Don't render until on client to prevent hydration mismatch
  if (!isClient) return null

  return (
    <>
      {/* Floating Donate Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-rose-500 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-rose-500/25 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <Heart className="w-6 h-6 group-hover:animate-pulse" />
        <span className="absolute -top-2 -right-2 bg-white text-rose-500 text-xs font-bold px-2 py-1 rounded-full shadow-md">
          {t.supportProject}
        </span>
      </motion.button>

      {/* Donation Modal */}
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
                <div className="relative bg-gradient-to-r from-rose-500 to-pink-600 p-6 text-white rounded-t-2xl">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{t.title}</h2>
                      <p className="text-white/80 text-sm">{t.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <p className="text-slate-600 dark:text-slate-300 text-center">
                    {t.description}
                  </p>

                  {/* Donation Type Toggle */}
                  <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                    <button
                      onClick={() => setDonationType('one-time')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        donationType === 'one-time'
                          ? 'bg-white dark:bg-slate-600 text-rose-600 dark:text-rose-400 shadow-sm'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {t.oneTime}
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        donationType === 'monthly'
                          ? 'bg-white dark:bg-slate-600 text-rose-600 dark:text-rose-400 shadow-sm'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {t.monthly}
                    </button>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      {t.chooseAmount} (EUR)
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {DONATION_AMOUNTS.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => {
                            setSelectedAmount(amount)
                            setCustomAmount('')
                          }}
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                            selectedAmount === amount && !customAmount
                              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          €{amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder={t.customAmount}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount(null)
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                      min="1"
                    />
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    {/* PayPal */}
                    <a
                      href={getPayPalLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-[#0070ba] hover:bg-[#005ea6] text-white rounded-lg font-medium transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.639h6.673c2.218 0 3.904.483 5.004 1.434.322.277.588.598.79.954.202.357.337.756.404 1.197.067.44.066.927-.002 1.456-.067.529-.197 1.107-.39 1.733-.192.626-.44 1.2-.744 1.722-.304.522-.66.983-1.069 1.383-.408.4-.862.73-1.362.99-.5.26-1.04.45-1.62.57-.58.12-1.187.18-1.82.18h-1.12l-.8 4.93a.641.641 0 0 1-.633.537H7.076z"/>
                      </svg>
                      {t.paypal}
                      {currentAmount && ` - €${currentAmount}`}
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </a>

                    {/* Ko-fi */}
                    {KOFI_USERNAME && (
                      <a
                        href={getKoFiLink()!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-[#ff5e5b] hover:bg-[#ff4a47] text-white rounded-lg font-medium transition-colors"
                      >
                        <Coffee className="w-5 h-5" />
                        {t.koFi}
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </a>
                    )}

                    {/* Patreon */}
                    {PATREON_USERNAME && (
                      <a
                        href={getPatreonLink()!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-[#ff424d] hover:bg-[#e63940] text-white rounded-lg font-medium transition-colors"
                      >
                        <Sparkles className="w-5 h-5" />
                        {t.patreon}
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </a>
                    )}

                    {/* Bank Transfer */}
                    {BANK_INFO.iban && (
                      <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          {t.bankTransfer}
                        </h4>
                        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <p><strong>{t.bankInfo}:</strong> {BANK_INFO.name}</p>
                          {BANK_INFO.bank && <p><strong>Bank:</strong> {BANK_INFO.bank}</p>}
                          {BANK_INFO.iban && <p><strong>IBAN:</strong> {BANK_INFO.iban}</p>}
                          {BANK_INFO.bic && <p><strong>BIC:</strong> {BANK_INFO.bic}</p>}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Note */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    {t.thankYou}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default DonateButton
