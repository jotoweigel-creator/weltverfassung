'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Globe, Users, BarChart3, Check, X, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface VoteStats {
  total: number
  for: number
  against: number
  percentageFor: number
  percentageAgainst: number
  countries: CountryStat[]
  lastUpdated: string
}

interface CountryStat {
  code: string
  name: string
  for: number
  against: number
  total: number
}

export function ConstitutionVote() {
  const { language } = useLanguage()
  const [stats, setStats] = useState<VoteStats | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<'for' | 'against' | null>(null)
  const [userCountry, setUserCountry] = useState<string>('Unknown')
  const [isLoading, setIsLoading] = useState(true)
  const [showStats, setShowStats] = useState(false)

  // Translations
  const t = {
    de: {
      title: 'Stimmen Sie ab',
      subtitle: 'Soll diese Verfassung angenommen werden?',
      for: 'Dafür',
      against: 'Dagegen',
      totalVotes: 'Stimmen insgesamt',
      results: 'Ergebnisse',
      countries: 'Länder',
      thankYou: 'Vielen Dank für Ihre Stimme!',
      youVoted: 'Sie haben',
      yourCountry: 'Ihr Land',
      viewStats: 'Statistiken anzeigen',
      hideStats: 'Statistiken ausblenden',
      from: 'aus',
      noVotes: 'Noch keine Stimmen',
      loading: 'Laden...'
    },
    en: {
      title: 'Cast Your Vote',
      subtitle: 'Should this constitution be adopted?',
      for: 'For',
      against: 'Against',
      totalVotes: 'Total Votes',
      results: 'Results',
      countries: 'Countries',
      thankYou: 'Thank you for your vote!',
      youVoted: 'You voted',
      yourCountry: 'Your country',
      viewStats: 'Show Statistics',
      hideStats: 'Hide Statistics',
      from: 'from',
      noVotes: 'No votes yet',
      loading: 'Loading...'
    },
    fr: {
      title: 'Votez',
      subtitle: 'Cette constitution doit-elle être adoptée?',
      for: 'Pour',
      against: 'Contre',
      totalVotes: 'Total des votes',
      results: 'Résultats',
      countries: 'Pays',
      thankYou: 'Merci pour votre vote!',
      youVoted: 'Vous avez voté',
      yourCountry: 'Votre pays',
      viewStats: 'Afficher les statistiques',
      hideStats: 'Masquer les statistiques',
      from: 'de',
      noVotes: 'Pas encore de votes',
      loading: 'Chargement...'
    },
    es: {
      title: 'Vote',
      subtitle: '¿Se debe adoptar esta constitución?',
      for: 'A favor',
      against: 'En contra',
      totalVotes: 'Votos totales',
      results: 'Resultados',
      countries: 'Países',
      thankYou: '¡Gracias por su voto!',
      youVoted: 'Usted votó',
      yourCountry: 'Su país',
      viewStats: 'Mostrar estadísticas',
      hideStats: 'Ocultar estadísticas',
      from: 'de',
      noVotes: 'Aún no hay votos',
      loading: 'Cargando...'
    },
    zh: {
      title: '投票',
      subtitle: '这部宪法应该被通过吗？',
      for: '赞成',
      against: '反对',
      totalVotes: '总票数',
      results: '结果',
      countries: '国家',
      thankYou: '感谢您的投票！',
      youVoted: '您投票',
      yourCountry: '您的国家',
      viewStats: '显示统计',
      hideStats: '隐藏统计',
      from: '来自',
      noVotes: '暂无投票',
      loading: '加载中...'
    },
    ar: {
      title: 'صوّت',
      subtitle: 'هل يجب تبني هذا الدستور؟',
      for: 'موافق',
      against: 'معارض',
      totalVotes: 'إجمالي الأصوات',
      results: 'النتائج',
      countries: 'الدول',
      thankYou: 'شكراً لتصويتك!',
      youVoted: 'صوّتت',
      yourCountry: 'بلدك',
      viewStats: 'عرض الإحصائيات',
      hideStats: 'إخفاء الإحصائيات',
      from: 'من',
      noVotes: 'لا توجد أصوات بعد',
      loading: 'جاري التحميل...'
    },
    ru: {
      title: 'Голосуйте',
      subtitle: 'Должна ли эта конституция быть принята?',
      for: 'За',
      against: 'Против',
      totalVotes: 'Всего голосов',
      results: 'Результаты',
      countries: 'Страны',
      thankYou: 'Спасибо за ваш голос!',
      youVoted: 'Вы проголосовали',
      yourCountry: 'Ваша страна',
      viewStats: 'Показать статистику',
      hideStats: 'Скрыть статистику',
      from: 'из',
      noVotes: 'Пока нет голосов',
      loading: 'Загрузка...'
    },
    pt: {
      title: 'Vote',
      subtitle: 'Esta constituição deve ser adotada?',
      for: 'A favor',
      against: 'Contra',
      totalVotes: 'Total de votos',
      results: 'Resultados',
      countries: 'Países',
      thankYou: 'Obrigado pelo seu voto!',
      youVoted: 'Você votou',
      yourCountry: 'Seu país',
      viewStats: 'Mostrar estatísticas',
      hideStats: 'Ocultar estatísticas',
      from: 'de',
      noVotes: 'Ainda sem votos',
      loading: 'Carregando...'
    },
    it: {
      title: 'Vota',
      subtitle: 'Questa costituzione dovrebbe essere adottata?',
      for: 'A favore',
      against: 'Contro',
      totalVotes: 'Voti totali',
      results: 'Risultati',
      countries: 'Paesi',
      thankYou: 'Grazie per il tuo voto!',
      youVoted: 'Hai votato',
      yourCountry: 'Il tuo paese',
      viewStats: 'Mostra statistiche',
      hideStats: 'Nascondi statistiche',
      from: 'da',
      noVotes: 'Nessun voto ancora',
      loading: 'Caricamento...'
    },
    ja: {
      title: '投票する',
      subtitle: 'この憲法を採択すべきですか？',
      for: '賛成',
      against: '反対',
      totalVotes: '総投票数',
      results: '結果',
      countries: '国',
      thankYou: 'ご投票ありがとうございます！',
      youVoted: 'あなたの投票',
      yourCountry: 'あなたの国',
      viewStats: '統計を表示',
      hideStats: '統計を非表示',
      from: 'から',
      noVotes: 'まだ投票がありません',
      loading: '読み込み中...'
    },
    hi: {
      title: 'वोट करें',
      subtitle: 'क्या यह संविधान अपनाया जाना चाहिए?',
      for: 'पक्ष में',
      against: 'विरोध में',
      totalVotes: 'कुल वोट',
      results: 'परिणाम',
      countries: 'देश',
      thankYou: 'आपके वोट के लिए धन्यवाद!',
      youVoted: 'आपने वोट दिया',
      yourCountry: 'आपका देश',
      viewStats: 'आंकड़े दिखाएं',
      hideStats: 'आंकड़े छिपाएं',
      from: 'से',
      noVotes: 'अभी तक कोई वोट नहीं',
      loading: 'लोड हो रहा है...'
    },
    ko: {
      title: '투표하기',
      subtitle: '이 헌법이 채택되어야 합니까?',
      for: '찬성',
      against: '반대',
      totalVotes: '총 투표수',
      results: '결과',
      countries: '국가',
      thankYou: '투표해 주셔서 감사합니다!',
      youVoted: '투표하셨습니다',
      yourCountry: '귀하의 국가',
      viewStats: '통계 보기',
      hideStats: '통계 숨기기',
      from: '에서',
      noVotes: '아직 투표 없음',
      loading: '로딩 중...'
    },
    tr: {
      title: 'Oy Verin',
      subtitle: 'Bu anayasa kabul edilmeli mi?',
      for: 'Evet',
      against: 'Hayır',
      totalVotes: 'Toplam Oy',
      results: 'Sonuçlar',
      countries: 'Ülkeler',
      thankYou: 'Oyunuz için teşekkürler!',
      youVoted: 'Oyunuz',
      yourCountry: 'Ülkeniz',
      viewStats: 'İstatistikleri Göster',
      hideStats: 'İstatistikleri Gizle',
      from: 'dan',
      noVotes: 'Henüz oy yok',
      loading: 'Yükleniyor...'
    },
    id: {
      title: 'Berikan Suara',
      subtitle: 'Apakah konstitusi ini harus diadopsi?',
      for: 'Setuju',
      against: 'Tidak Setuju',
      totalVotes: 'Total Suara',
      results: 'Hasil',
      countries: 'Negara',
      thankYou: 'Terima kasih atas suara Anda!',
      youVoted: 'Anda memilih',
      yourCountry: 'Negara Anda',
      viewStats: 'Tampilkan Statistik',
      hideStats: 'Sembunyikan Statistik',
      from: 'dari',
      noVotes: 'Belum ada suara',
      loading: 'Memuat...'
    },
    bn: {
      title: 'ভোট দিন',
      subtitle: 'এই সংবিধান গ্রহণ করা উচিত?',
      for: 'পক্ষে',
      against: 'বিপক্ষে',
      totalVotes: 'মোট ভোট',
      results: 'ফলাফল',
      countries: 'দেশ',
      thankYou: 'আপনার ভোটের জন্য ধন্যবাদ!',
      youVoted: 'আপনি ভোট দিয়েছেন',
      yourCountry: 'আপনার দেশ',
      viewStats: 'পরিসংখ্যান দেখুন',
      hideStats: 'পরিসংখ্যান লুকান',
      from: 'থেকে',
      noVotes: 'এখনও কোনো ভোট নেই',
      loading: 'লোড হচ্ছে...'
    },
    vi: {
      title: 'Bỏ Phiếu',
      subtitle: 'Hiến pháp này có nên được thông qua?',
      for: 'Ủng hộ',
      against: 'Phản đối',
      totalVotes: 'Tổng số phiếu',
      results: 'Kết quả',
      countries: 'Quốc gia',
      thankYou: 'Cảm ơn bạn đã bỏ phiếu!',
      youVoted: 'Bạn đã bỏ phiếu',
      yourCountry: 'Quốc gia của bạn',
      viewStats: 'Hiển thị thống kê',
      hideStats: 'Ẩn thống kê',
      from: 'từ',
      noVotes: 'Chưa có phiếu bầu',
      loading: 'Đang tải...'
    },
    fa: {
      title: 'رأی دهید',
      subtitle: 'آیا این قانون اساسی باید تصویب شود؟',
      for: 'موافق',
      against: 'مخالف',
      totalVotes: 'کل آرا',
      results: 'نتایج',
      countries: 'کشورها',
      thankYou: 'از رأی شما سپاسگزاریم!',
      youVoted: 'شما رأی دادید',
      yourCountry: 'کشور شما',
      viewStats: 'نمایش آمار',
      hideStats: 'مخفی کردن آمار',
      from: 'از',
      noVotes: 'هنوز رأیی ثبت نشده',
      loading: 'در حال بارگذاری...'
    },
    sw: {
      title: 'Piga Kura',
      subtitle: 'Je, katiba hii inapaswa kupitishwa?',
      for: 'Ndiyo',
      against: 'Hapana',
      totalVotes: 'Jumla ya Kura',
      results: 'Matokeo',
      countries: 'Nchi',
      thankYou: 'Asante kwa kura yako!',
      youVoted: 'Ulipiga kura',
      yourCountry: 'Nchi yako',
      viewStats: 'Onyesha Takwimu',
      hideStats: 'Ficha Takwimu',
      from: 'kutoka',
      noVotes: 'Hakuna kura bado',
      loading: 'Inapakia...'
    },
    pl: {
      title: 'Zagłosuj',
      subtitle: 'Czy ta konstytucja powinna zostać przyjęta?',
      for: 'Za',
      against: 'Przeciw',
      totalVotes: 'Łączna liczba głosów',
      results: 'Wyniki',
      countries: 'Kraje',
      thankYou: 'Dziękujemy za Twój głos!',
      youVoted: 'Zagłosowałeś',
      yourCountry: 'Twój kraj',
      viewStats: 'Pokaż statystyki',
      hideStats: 'Ukryj statystyki',
      from: 'z',
      noVotes: 'Brak głosów',
      loading: 'Ładowanie...'
    },
    uk: {
      title: 'Проголосуйте',
      subtitle: 'Чи повинна ця конституція бути прийнята?',
      for: 'За',
      against: 'Проти',
      totalVotes: 'Всього голосів',
      results: 'Результати',
      countries: 'Країни',
      thankYou: 'Дякуємо за ваш голос!',
      youVoted: 'Ви проголосували',
      yourCountry: 'Ваша країна',
      viewStats: 'Показати статистику',
      hideStats: 'Приховати статистику',
      from: 'з',
      noVotes: 'Поки немає голосів',
      loading: 'Завантаження...'
    }
  }

  const text = t[language] || t.en

  // Check if user has already voted (localStorage)
  useEffect(() => {
    const voted = localStorage.getItem('constitution_voted')
    const vote = localStorage.getItem('constitution_vote')
    const country = localStorage.getItem('constitution_country')
    if (voted === 'true') {
      setHasVoted(true)
      setUserVote(vote as 'for' | 'against')
      setUserCountry(country || 'Unknown')
    }
  }, [])

  // Fetch initial stats
  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/vote')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (vote: 'for' | 'against') => {
    if (hasVoted) return

    try {
      // Get user's country from browser
      let country = 'Unknown'
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        country = data.country_code || 'Unknown'
      } catch {
        country = 'Unknown'
      }

      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote, country })
      })

      const data = await res.json()
      if (data.success) {
        setHasVoted(true)
        setUserVote(vote)
        setUserCountry(data.country)
        localStorage.setItem('constitution_voted', 'true')
        localStorage.setItem('constitution_vote', vote)
        localStorage.setItem('constitution_country', data.country)
        fetchStats()
      }
    } catch (error) {
      console.error('Vote failed:', error)
    }
  }

  // Country flag emoji
  const getCountryFlag = (countryCode: string) => {
    if (countryCode === 'Unknown') return '🌐'
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {text.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {text.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Voting Section */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {!hasVoted ? (
                <motion.div
                  key="vote"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* For Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVote('for')}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/25 transition-all"
                    >
                      <ThumbsUp className="w-6 h-6" />
                      {text.for}
                    </motion.button>

                    {/* Against Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVote('against')}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-rose-500/25 transition-all"
                    >
                      <ThumbsDown className="w-6 h-6" />
                      {text.against}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="voted"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    userVote === 'for'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                      : 'bg-gradient-to-r from-rose-500 to-red-600'
                  }`}>
                    {userVote === 'for' ? (
                      <Check className="w-8 h-8 text-white" />
                    ) : (
                      <X className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {text.thankYou}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {text.youVoted} <span className="font-semibold">{userVote === 'for' ? text.for : text.against}</span> · {text.from} <span className="font-semibold">{getCountryFlag(userCountry)} {userCountry}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Statistics Section */}
          {!isLoading && stats && stats.total > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-700">
              {/* Progress Bar */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {text.results}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {stats.total.toLocaleString()} {text.totalVotes}
                  </span>
                </div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentageFor}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center"
                  >
                    {stats.percentageFor > 10 && (
                      <span className="text-xs font-bold text-white">{stats.percentageFor}%</span>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentageAgainst}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-rose-500 to-red-600 flex items-center justify-center"
                  >
                    {stats.percentageAgainst > 10 && (
                      <span className="text-xs font-bold text-white">{stats.percentageAgainst}%</span>
                    )}
                  </motion.div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    <ThumbsUp className="w-4 h-4 inline mr-1" />
                    {stats.for.toLocaleString()} {text.for}
                  </span>
                  <span className="text-rose-600 dark:text-rose-400 font-medium">
                    {stats.against.toLocaleString()} {text.against}
                    <ThumbsDown className="w-4 h-4 inline ml-1" />
                  </span>
                </div>
              </div>

              {/* Country Toggle */}
              <div className="px-6 pb-4">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {showStats ? text.hideStats : text.viewStats}
                </button>
              </div>

              {/* Country Statistics */}
              <AnimatePresence>
                {showStats && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {text.countries} ({stats.countries.length})
                          </span>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {stats.countries.slice(0, 20).map((country, index) => (
                            <motion.div
                              key={country.code}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between py-2 px-3 bg-white dark:bg-slate-800 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getCountryFlag(country.code)}</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                  {country.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-emerald-600 dark:text-emerald-400">
                                  {country.for}
                                </span>
                                <span className="text-rose-600 dark:text-rose-400">
                                  {country.against}
                                </span>
                                <span className="text-slate-400 dark:text-slate-500 font-medium w-10 text-right">
                                  {country.total}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                          <span>🟢 {text.for}</span>
                          <span>🔴 {text.against}</span>
                          <span>Σ {text.totalVotes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              {text.loading}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
