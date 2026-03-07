'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Heart, MapPin, Clock, User, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Comment {
  id: string
  name: string
  text: string
  country: string
  countryName: string
  timestamp: string
  likes: number
}

export function CommentSection() {
  const { language } = useLanguage()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [userCountry, setUserCountry] = useState('Unknown')
  const [error, setError] = useState('')

  // Translations
  const t: Record<string, Record<string, string>> = {
    de: {
      title: 'Kommentare',
      subtitle: 'Teilen Sie Ihre Gedanken zur Weltverfassung',
      namePlaceholder: 'Ihr Name',
      commentPlaceholder: 'Schreiben Sie einen Kommentar...',
      submit: 'Absenden',
      loading: 'Laden...',
      noComments: 'Noch keine Kommentare. Schreiben Sie den ersten!',
      error: 'Ein Fehler ist aufgetreten',
      nameRequired: 'Name erforderlich',
      commentRequired: 'Kommentar erforderlich'
    },
    en: {
      title: 'Comments',
      subtitle: 'Share your thoughts on the World Constitution',
      namePlaceholder: 'Your name',
      commentPlaceholder: 'Write a comment...',
      submit: 'Submit',
      loading: 'Loading...',
      noComments: 'No comments yet. Be the first to write one!',
      error: 'An error occurred',
      nameRequired: 'Name required',
      commentRequired: 'Comment required'
    },
    fr: {
      title: 'Commentaires',
      subtitle: 'Partagez vos pensées sur la Constitution Mondiale',
      namePlaceholder: 'Votre nom',
      commentPlaceholder: 'Écrivez un commentaire...',
      submit: 'Envoyer',
      loading: 'Chargement...',
      noComments: 'Pas encore de commentaires. Soyez le premier!',
      error: 'Une erreur est survenue',
      nameRequired: 'Nom requis',
      commentRequired: 'Commentaire requis'
    },
    es: {
      title: 'Comentarios',
      subtitle: 'Comparta sus pensamientos sobre la Constitución Mundial',
      namePlaceholder: 'Su nombre',
      commentPlaceholder: 'Escriba un comentario...',
      submit: 'Enviar',
      loading: 'Cargando...',
      noComments: 'Sin comentarios aún. ¡Sea el primero!',
      error: 'Ocurrió un error',
      nameRequired: 'Nombre requerido',
      commentRequired: 'Comentario requerido'
    },
    zh: {
      title: '评论',
      subtitle: '分享您对世界宪法的看法',
      namePlaceholder: '您的名字',
      commentPlaceholder: '写下您的评论...',
      submit: '提交',
      loading: '加载中...',
      noComments: '暂无评论。成为第一个评论者！',
      error: '发生错误',
      nameRequired: '请输入名字',
      commentRequired: '请输入评论'
    },
    ar: {
      title: 'التعليقات',
      subtitle: 'شارك أفكارك حول الدستور العالمي',
      namePlaceholder: 'اسمك',
      commentPlaceholder: 'اكتب تعليقاً...',
      submit: 'إرسال',
      loading: 'جاري التحميل...',
      noComments: 'لا توجد تعليقات بعد. كن الأول!',
      error: 'حدث خطأ',
      nameRequired: 'الاسم مطلوب',
      commentRequired: 'التعليق مطلوب'
    },
    ru: {
      title: 'Комментарии',
      subtitle: 'Поделитесь мыслями о Конституции мира',
      namePlaceholder: 'Ваше имя',
      commentPlaceholder: 'Напишите комментарий...',
      submit: 'Отправить',
      loading: 'Загрузка...',
      noComments: 'Комментариев пока нет. Будьте первым!',
      error: 'Произошла ошибка',
      nameRequired: 'Требуется имя',
      commentRequired: 'Требуется комментарий'
    },
    pt: {
      title: 'Comentários',
      subtitle: 'Compartilhe seus pensamentos sobre a Constituição Mundial',
      namePlaceholder: 'Seu nome',
      commentPlaceholder: 'Escreva um comentário...',
      submit: 'Enviar',
      loading: 'Carregando...',
      noComments: 'Sem comentários ainda. Seja o primeiro!',
      error: 'Ocorreu um erro',
      nameRequired: 'Nome obrigatório',
      commentRequired: 'Comentário obrigatório'
    },
    it: {
      title: 'Commenti',
      subtitle: 'Condividi i tuoi pensieri sulla Costituzione Mondiale',
      namePlaceholder: 'Il tuo nome',
      commentPlaceholder: 'Scrivi un commento...',
      submit: 'Invia',
      loading: 'Caricamento...',
      noComments: 'Nessun commento ancora. Sii il primo!',
      error: 'Si è verificato un errore',
      nameRequired: 'Nome richiesto',
      commentRequired: 'Commento richiesto'
    },
    ja: {
      title: 'コメント',
      subtitle: '世界憲法に関するご意見をお聞かせください',
      namePlaceholder: 'お名前',
      commentPlaceholder: 'コメントを書く...',
      submit: '送信',
      loading: '読み込み中...',
      noComments: 'まだコメントはありません。最初のコメントを書こう！',
      error: 'エラーが発生しました',
      nameRequired: '名前が必要です',
      commentRequired: 'コメントが必要です'
    },
    hi: {
      title: 'टिप्पणियाँ',
      subtitle: 'विश्व संविधान पर अपने विचार साझा करें',
      namePlaceholder: 'आपका नाम',
      commentPlaceholder: 'टिप्पणी लिखें...',
      submit: 'जमा करें',
      loading: 'लोड हो रहा है...',
      noComments: 'अभी तक कोई टिप्पणी नहीं। पहले बनें!',
      error: 'एक त्रुटि हुई',
      nameRequired: 'नाम आवश्यक',
      commentRequired: 'टिप्पणी आवश्यक'
    },
    ko: {
      title: '댓글',
      subtitle: '세계 헌법에 대한 생각을 공유하세요',
      namePlaceholder: '이름',
      commentPlaceholder: '댓글을 작성하세요...',
      submit: '제출',
      loading: '로딩 중...',
      noComments: '아직 댓글이 없습니다. 첫 번째 댓글을 작성하세요!',
      error: '오류가 발생했습니다',
      nameRequired: '이름이 필요합니다',
      commentRequired: '댓글이 필요합니다'
    },
    tr: {
      title: 'Yorumlar',
      subtitle: 'Dünya Anayasası hakkındaki düşüncelerinizi paylaşın',
      namePlaceholder: 'Adınız',
      commentPlaceholder: 'Bir yorum yazın...',
      submit: 'Gönder',
      loading: 'Yükleniyor...',
      noComments: 'Henüz yorum yok. İlk siz olun!',
      error: 'Bir hata oluştu',
      nameRequired: 'Ad gerekli',
      commentRequired: 'Yorum gerekli'
    },
    id: {
      title: 'Komentar',
      subtitle: 'Bagikan pemikiran Anda tentang Konstitusi Dunia',
      namePlaceholder: 'Nama Anda',
      commentPlaceholder: 'Tulis komentar...',
      submit: 'Kirim',
      loading: 'Memuat...',
      noComments: 'Belum ada komentar. Jadilah yang pertama!',
      error: 'Terjadi kesalahan',
      nameRequired: 'Nama diperlukan',
      commentRequired: 'Komentar diperlukan'
    },
    bn: {
      title: 'মন্তব্য',
      subtitle: 'বিশ্ব সংবিধান সম্পর্কে আপনার মতামত শেয়ার করুন',
      namePlaceholder: 'আপনার নাম',
      commentPlaceholder: 'মন্তব্য লিখুন...',
      submit: 'জমা দিন',
      loading: 'লোড হচ্ছে...',
      noComments: 'এখনও কোনো মন্তব্য নেই। প্রথম হন!',
      error: 'একটি ত্রুটি হয়েছে',
      nameRequired: 'নাম প্রয়োজন',
      commentRequired: 'মন্তব্য প্রয়োজন'
    },
    vi: {
      title: 'Bình luận',
      subtitle: 'Chia sẻ suy nghĩ của bạn về Hiến pháp Thế giới',
      namePlaceholder: 'Tên của bạn',
      commentPlaceholder: 'Viết bình luận...',
      submit: 'Gửi',
      loading: 'Đang tải...',
      noComments: 'Chưa có bình luận. Hãy là người đầu tiên!',
      error: 'Đã xảy ra lỗi',
      nameRequired: 'Cần tên',
      commentRequired: 'Cần bình luận'
    },
    fa: {
      title: 'نظرات',
      subtitle: 'نظرات خود را در مورد قانون اساسی جهانی به اشتراک بگذارید',
      namePlaceholder: 'نام شما',
      commentPlaceholder: 'نظر بنویسید...',
      submit: 'ارسال',
      loading: 'در حال بارگذاری...',
      noComments: 'هنوز نظری وجود ندارد. اولین باشید!',
      error: 'خطایی رخ داد',
      nameRequired: 'نام لازم است',
      commentRequired: 'نظر لازم است'
    },
    sw: {
      title: 'Maoni',
      subtitle: 'Shiriki mawazo yako kuhusu Katiba ya Dunia',
      namePlaceholder: 'Jina lako',
      commentPlaceholder: 'Andika maoni...',
      submit: 'Tuma',
      loading: 'Inapakia...',
      noComments: 'Hakuna maoni bado. Kuwa wa kwanza!',
      error: 'Hitilafu imetokea',
      nameRequired: 'Jina linahitajika',
      commentRequired: 'Maoni yanahitajika'
    },
    pl: {
      title: 'Komentarze',
      subtitle: 'Podziel się swoimi przemyśleniami na temat Konstytucji Światowej',
      namePlaceholder: 'Twoje imię',
      commentPlaceholder: 'Napisz komentarz...',
      submit: 'Wyślij',
      loading: 'Ładowanie...',
      noComments: 'Brak komentarzy. Bądź pierwszy!',
      error: 'Wystąpił błąd',
      nameRequired: 'Wymagane imię',
      commentRequired: 'Wymagany komentarz'
    },
    uk: {
      title: 'Коментарі',
      subtitle: 'Поділіться думками про Конституцію світу',
      namePlaceholder: "Ваше ім'я",
      commentPlaceholder: 'Напишіть коментар...',
      submit: 'Надіслати',
      loading: 'Завантаження...',
      noComments: 'Коментарів поки немає. Будьте першим!',
      error: 'Сталася помилка',
      nameRequired: "Потрібне ім'я",
      commentRequired: 'Потрібен коментар'
    }
  }

  const i18n = t[language] || t.en

  // Get user's country
  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        setUserCountry(data.country_code || 'Unknown')
      } catch {
        setUserCountry('Unknown')
      }
    }
    getCountry()
  }, [])

  // Fetch comments
  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments')
      const data = await res.json()
      setComments(data.comments || [])
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError(i18n.nameRequired)
      return
    }
    if (!commentText.trim()) {
      setError(i18n.commentRequired)
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          text: commentText.trim(),
          country: userCountry
        })
      })

      const data = await res.json()
      if (data.success) {
        setComments([data.comment, ...comments])
        setName('')
        setCommentText('')
      } else {
        setError(data.error || i18n.error)
      }
    } catch (error) {
      setError(i18n.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = async (commentId: string) => {
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like', commentId })
      })

      const data = await res.json()
      if (data.success) {
        setComments(comments.map(c =>
          c.id === commentId ? { ...c, likes: data.likes } : c
        ))
      }
    } catch (error) {
      console.error('Like failed:', error)
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

  // Format time ago
  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000)

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    }

    for (const [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value)
      if (interval >= 1) {
        if (language === 'de') {
          const units: { [key: string]: [string, string] } = {
            year: ['Jahr', 'Jahren'],
            month: ['Monat', 'Monaten'],
            week: ['Woche', 'Wochen'],
            day: ['Tag', 'Tagen'],
            hour: ['Stunde', 'Stunden'],
            minute: ['Minute', 'Minuten']
          }
          return `vor ${interval} ${interval === 1 ? units[unit][0] : units[unit][1]}`
        } else if (language === 'zh') {
          const units: { [key: string]: string } = {
            year: '年', month: '个月', week: '周', day: '天', hour: '小时', minute: '分钟'
          }
          return `${interval}${units[unit]}前`
        } else {
          const plural = interval === 1 ? '' : 's'
          return `${interval} ${unit}${plural} ago`
        }
      }
    }
    return language === 'de' ? 'gerade eben' : language === 'zh' ? '刚刚' : 'just now'
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {i18n.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {i18n.subtitle}
          </p>
        </motion.div>

        {/* Comment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={i18n.namePlaceholder}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>{getCountryFlag(userCountry)} {userCountry}</span>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={i18n.commentPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                maxLength={1000}
              />
              <div className="absolute bottom-2 right-2 text-xs text-slate-400">
                {commentText.length}/1000
              </div>
            </div>

            <div className="flex items-center justify-between">
              {error && (
                <span className="text-sm text-red-500">{error}</span>
              )}
              <div className="flex-1" />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? i18n.loading : i18n.submit}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Comments List */}
        <div className="space-y-4">
          <AnimatePresence>
            {isLoading ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                {i18n.loading}
              </div>
            ) : comments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Globe className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                <p className="text-slate-500 dark:text-slate-400">
                  {i18n.noComments}
                </p>
              </motion.div>
            ) : (
              comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {comment.name}
                        </span>
                        <span className="text-sm text-slate-400">
                          {getCountryFlag(comment.country)} {comment.countryName}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                        {comment.text}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {timeAgo(comment.timestamp)}
                        </span>
                        <button
                          onClick={() => handleLike(comment.id)}
                          className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          {comment.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
