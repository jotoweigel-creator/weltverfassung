'use client'

import React, { useState, useEffect, useSyncExternalStore } from 'react'
import { constitutionChapters } from '@/data/constitution'

// Client-only hook for hydration fix
function useClientOnly() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

// Language translations
const translations: Record<string, Record<string, string>> = {
  de: {
    siteName: 'Weltverfassung',
    tagline: 'Verfassung der Vereinten Menschheit',
    subtitle: 'Der Kodex der Weltzivilisation',
    vote: 'Abstimmen',
    yes: 'Ja',
    no: 'Nein',
    abstain: 'Enthaltung',
    visitors: 'Besucher',
    download: 'PDF Herunterladen',
    donate: 'Spenden',
    chapters: 'Kapitel',
    articles: 'Artikel',
    languages: 'Sprachen',
    share: 'Teilen',
    learnMore: 'Mehr erfahren',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    acceptCookies: 'Akzeptieren',
    cookieNotice: 'Diese Website verwendet Cookies.',
    readConstitution: 'Verfassung lesen',
    statistics: 'Statistik',
    supporters: 'Unterstützer weltweit',
    countries: 'Länder',
    votesByCountry: 'Stimmen nach Ländern',
    comments: 'Kommentare',
    writeComment: 'Kommentar schreiben',
    yourName: 'Ihr Name',
    yourCountry: 'Ihr Land',
    yourComment: 'Ihr Kommentar...',
    submit: 'Absenden',
    noComments: 'Noch keine Kommentare. Schreiben Sie den ersten!',
    downloadPDF: 'PDF herunterladen',
    selectLanguage: 'Sprache wählen',
    totalVotes: 'Gesamtstimmen',
    votes: 'Stimmen',
    close: 'Schließen',
    noVotesYet: 'Noch keine Stimmen abgegeben.',
    selectCountryFirst: 'Bitte wählen Sie zuerst Ihr Land aus.'
  },
  en: {
    siteName: 'World Constitution',
    tagline: 'Constitution of United Humanity',
    subtitle: 'The Code of World Civilization',
    vote: 'Vote',
    yes: 'Yes',
    no: 'No',
    abstain: 'Abstain',
    visitors: 'Visitors',
    download: 'Download PDF',
    donate: 'Donate',
    chapters: 'Chapters',
    articles: 'Articles',
    languages: 'Languages',
    share: 'Share',
    learnMore: 'Learn More',
    privacy: 'Privacy',
    imprint: 'Imprint',
    acceptCookies: 'Accept',
    cookieNotice: 'This website uses cookies.',
    readConstitution: 'Read Constitution',
    statistics: 'Statistics',
    supporters: 'Supporters worldwide',
    countries: 'Countries',
    votesByCountry: 'Votes by Country',
    comments: 'Comments',
    writeComment: 'Write a comment',
    yourName: 'Your name',
    yourCountry: 'Your country',
    yourComment: 'Your comment...',
    submit: 'Submit',
    noComments: 'No comments yet. Write the first one!',
    downloadPDF: 'Download PDF',
    selectLanguage: 'Select language',
    totalVotes: 'Total votes',
    votes: 'Votes',
    close: 'Close',
    noVotesYet: 'No votes cast yet.',
    selectCountryFirst: 'Please select your country first.'
  },
  es: {
    siteName: 'Constitución Mundial', tagline: 'Constitución de la Humanidad Unida', subtitle: 'El Código de la Civilización Mundial',
    vote: 'Votar', yes: 'Sí', no: 'No', abstain: 'Abstenerse',
    visitors: 'Visitantes', download: 'Descargar PDF', donate: 'Donar',
    chapters: 'Capítulos', articles: 'Artículos', languages: 'Idiomas',
    share: 'Compartir', learnMore: 'Más información',
    privacy: 'Privacidad', imprint: 'Aviso legal', acceptCookies: 'Aceptar',
    cookieNotice: 'Este sitio utiliza cookies.', readConstitution: 'Leer Constitución',
    statistics: 'Estadísticas', supporters: 'Seguidores', countries: 'Países',
    votesByCountry: 'Votos por país', comments: 'Comentarios', writeComment: 'Escribir comentario',
    yourName: 'Su nombre', yourCountry: 'Su país', yourComment: 'Su comentario...',
    submit: 'Enviar', noComments: 'Sin comentarios. ¡Escriba el primero!',
    downloadPDF: 'Descargar PDF', selectLanguage: 'Seleccionar idioma',
    totalVotes: 'Votos totales', votes: 'Votos', close: 'Cerrar',
    noVotesYet: 'Aún no hay votos.', selectCountryFirst: 'Por favor, seleccione primero su país.'
  },
  fr: {
    siteName: 'Constitution Mondiale', tagline: "Constitution de l'Humanité Unie", subtitle: 'Le Code de la Civilisation Mondiale',
    vote: 'Voter', yes: 'Oui', no: 'Non', abstain: "S'abstenir",
    visitors: 'Visiteurs', download: 'Télécharger PDF', donate: 'Donner',
    chapters: 'Chapitres', articles: 'Articles', languages: 'Langues',
    share: 'Partager', learnMore: 'En savoir plus',
    privacy: 'Confidentialité', imprint: 'Mentions légales', acceptCookies: 'Accepter',
    cookieNotice: 'Ce site utilise des cookies.', readConstitution: 'Lire la Constitution',
    statistics: 'Statistiques', supporters: 'Partisans', countries: 'Pays',
    votesByCountry: 'Votes par pays', comments: 'Commentaires', writeComment: 'Écrire un commentaire',
    yourName: 'Votre nom', yourCountry: 'Votre pays', yourComment: 'Votre commentaire...',
    submit: 'Soumettre', noComments: 'Pas de commentaires. Écrivez le premier!',
    downloadPDF: 'Télécharger PDF', selectLanguage: 'Choisir la langue',
    totalVotes: 'Votes totaux', votes: 'Votes', close: 'Fermer',
    noVotesYet: 'Aucun vote pour le moment.', selectCountryFirst: 'Veuillez d\'abord sélectionner votre pays.'
  },
  it: { siteName: 'Costituzione Mondiale', tagline: "Costituzione dell'Umanità Unita", subtitle: 'Il Codice della Civiltà Mondiale', vote: 'Votare', yes: 'Sì', no: 'No', abstain: 'Astenersi', visitors: 'Visitatori', download: 'Scaricare PDF', donate: 'Donare', chapters: 'Capitoli', articles: 'Articoli', languages: 'Lingue', share: 'Condividere', learnMore: 'Scopri', privacy: 'Privacy', imprint: 'Impronta', acceptCookies: 'Accettare', cookieNotice: 'Utilizziamo cookie.', readConstitution: 'Leggere', statistics: 'Statistiche', supporters: 'Sostenitori', countries: 'Paesi', votesByCountry: 'Voti per paese', comments: 'Commenti', writeComment: 'Scrivi commento', yourName: 'Tuo nome', yourCountry: 'Tuo paese', yourComment: 'Tuo commento...', submit: 'Inviare', noComments: 'Nessun commento. Scrivi il primo!', downloadPDF: 'Scaricare PDF', selectLanguage: 'Seleziona lingua', totalVotes: 'Voti totali', votes: 'Voti', close: 'Chiudere', noVotesYet: 'Nessun voto ancora.', selectCountryFirst: 'Seleziona prima il tuo paese.' },
  pt: { siteName: 'Constituição Mundial', tagline: 'Constituição da Humanidade Unida', subtitle: 'O Código da Civilização Mundial', vote: 'Votar', yes: 'Sim', no: 'Não', abstain: 'Abster-se', visitors: 'Visitantes', download: 'Baixar PDF', donate: 'Doar', chapters: 'Capítulos', articles: 'Artigos', languages: 'Idiomas', share: 'Compartilhar', learnMore: 'Saiba mais', privacy: 'Privacidade', imprint: 'Impressão', acceptCookies: 'Aceitar', cookieNotice: 'Usamos cookies.', readConstitution: 'Ler Constituição', statistics: 'Estatísticas', supporters: 'Apoiadores', countries: 'Países', votesByCountry: 'Votos por país', comments: 'Comentários', writeComment: 'Escrever comentário', yourName: 'Seu nome', yourCountry: 'Seu país', yourComment: 'Seu comentário...', submit: 'Enviar', noComments: 'Sem comentários. Escreva o primeiro!', downloadPDF: 'Baixar PDF', selectLanguage: 'Selecionar idioma', totalVotes: 'Votos totais', votes: 'Votos', close: 'Fechar', noVotesYet: 'Ainda sem votos.', selectCountryFirst: 'Por favor, selecione primeiro o seu país.' },
  ru: { siteName: 'Всемирная Конституция', tagline: 'Конституция Объединённого Человечества', subtitle: 'Кодекс Мировой Цивилизации', vote: 'Голосовать', yes: 'Да', no: 'Нет', abstain: 'Воздержаться', visitors: 'Посетители', download: 'Скачать PDF', donate: 'Пожертвовать', chapters: 'Главы', articles: 'Статьи', languages: 'Языки', share: 'Поделиться', learnMore: 'Узнать больше', privacy: 'Конфиденциальность', imprint: 'Импринт', acceptCookies: 'Принять', cookieNotice: 'Мы используем куки.', readConstitution: 'Читать Конституцию', statistics: 'Статистика', supporters: 'Сторонников', countries: 'Стран', votesByCountry: 'Голоса по странам', comments: 'Комментарии', writeComment: 'Написать комментарий', yourName: 'Ваше имя', yourCountry: 'Ваша страна', yourComment: 'Ваш комментарий...', submit: 'Отправить', noComments: 'Нет комментариев. Напишите первый!', downloadPDF: 'Скачать PDF', selectLanguage: 'Выбрать язык', totalVotes: 'Всего голосов', votes: 'Голосов', close: 'Закрыть', noVotesYet: 'Голосов пока нет.', selectCountryFirst: 'Пожалуйста, сначала выберите вашу страну.' },
  zh: { siteName: '世界宪法', tagline: '联合人类宪法', subtitle: '世界文明法典', vote: '投票', yes: '赞成', no: '反对', abstain: '弃权', visitors: '访客', download: '下载PDF', donate: '捐赠', chapters: '章节', articles: '条款', languages: '语言', share: '分享', learnMore: '了解更多', privacy: '隐私', imprint: '法律声明', acceptCookies: '接受', cookieNotice: '我们使用Cookie。', readConstitution: '阅读宪法', statistics: '统计', supporters: '支持者', countries: '国家', votesByCountry: '各国投票', comments: '评论', writeComment: '写评论', yourName: '您的姓名', yourCountry: '您的国家', yourComment: '您的评论...', submit: '提交', noComments: '暂无评论。写下第一条！', downloadPDF: '下载PDF', selectLanguage: '选择语言', totalVotes: '总票数', votes: '票', close: '关闭', noVotesYet: '暂无投票。', selectCountryFirst: '请先选择您的国家。' },
  ja: { siteName: '世界憲法', tagline: '連合人類憲法', subtitle: '世界文明法典', vote: '投票', yes: '賛成', no: '反対', abstain: '棄権', visitors: '訪問者', download: 'PDFダウンロード', donate: '寄付', chapters: '章', articles: '条項', languages: '言語', share: '共有', learnMore: '詳細', privacy: 'プライバシー', imprint: 'インプリント', acceptCookies: '同意', cookieNotice: 'Cookieを使用します。', readConstitution: '憲法を読む', statistics: '統計', supporters: '支持者', countries: '国', votesByCountry: '国別投票', comments: 'コメント', writeComment: 'コメントを書く', yourName: 'お名前', yourCountry: '国', yourComment: 'コメント...', submit: '送信', noComments: 'コメントなし。最初のコメントを書いてください！', downloadPDF: 'PDFダウンロード', selectLanguage: '言語を選択', totalVotes: '総投票数', votes: '票', close: '閉じる', noVotesYet: 'まだ投票がありません。', selectCountryFirst: 'まず国を選択してください。' },
  ko: { siteName: '세계 헌법', tagline: '연합 인류 헌법', subtitle: '세계 문명 법전', vote: '투표', yes: '찬성', no: '반대', abstain: '기권', visitors: '방문자', download: 'PDF 다운로드', donate: '기부', chapters: '장', articles: '조항', languages: '언어', share: '공유', learnMore: '더보기', privacy: '개인정보', imprint: '법적고지', acceptCookies: '수락', cookieNotice: '쿠키를 사용합니다.', readConstitution: '헌법 읽기', statistics: '통계', supporters: '지지자', countries: '국가', votesByCountry: '국가별 투표', comments: '댓글', writeComment: '댓글 쓰기', yourName: '이름', yourCountry: '국가', yourComment: '댓글...', submit: '제출', noComments: '댓글 없음. 첫 번째 댓글을 작성하세요!', downloadPDF: 'PDF 다운로드', selectLanguage: '언어 선택', totalVotes: '총 투표', votes: '표', close: '닫기', noVotesYet: '아직 투표가 없습니다.', selectCountryFirst: '먼저 국가를 선택해 주세요.' },
  ar: { siteName: 'الدستور العالمي', tagline: 'دستور البشرية المتحدة', subtitle: 'مدونة الحضارة العالمية', vote: 'صوّت', yes: 'نعم', no: 'لا', abstain: 'امتناع', visitors: 'زوار', download: 'تحميل PDF', donate: 'تبرع', chapters: 'فصول', articles: 'مواد', languages: 'لغات', share: 'شارك', learnMore: 'المزيد', privacy: 'الخصوصية', imprint: 'القانوني', acceptCookies: 'قبول', cookieNotice: 'نستخدم ملفات تعريف الارتباط.', readConstitution: 'اقرأ الدستور', statistics: 'إحصائيات', supporters: 'مؤيدون', countries: 'دول', votesByCountry: 'الأصوات حسب البلد', comments: 'تعليقات', writeComment: 'اكتب تعليق', yourName: 'اسمك', yourCountry: 'بلدك', yourComment: 'تعليقك...', submit: 'إرسال', noComments: 'لا توجد تعليقات. اكتب الأول!', downloadPDF: 'تحميل PDF', selectLanguage: 'اختر اللغة', totalVotes: 'إجمالي الأصوات', votes: 'أصوات', close: 'إغلاق', noVotesYet: 'لم يتم التصويت بعد.', selectCountryFirst: 'يرجى اختيار دولتك أولاً.' },
  hi: { siteName: 'विश्व संविधान', tagline: 'संयुक्त मानवता संविधान', subtitle: 'विश्व सभ्यता संहिता', vote: 'वोट करें', yes: 'हाँ', no: 'नहीं', abstain: 'वोट नहीं', visitors: 'आगंतुक', download: 'PDF डाउनलोड', donate: 'दान करें', chapters: 'अध्याय', articles: 'अनुच्छेद', languages: 'भाषाएँ', share: 'साझा करें', learnMore: 'और जानें', privacy: 'गोपनीयता', imprint: 'कानूनी', acceptCookies: 'स्वीकार करें', cookieNotice: 'हम कुकीज़ का उपयोग करते हैं।', readConstitution: 'संविधान पढ़ें', statistics: 'आंकड़े', supporters: 'समर्थक', countries: 'देश', votesByCountry: 'देश के अनुसार वोट', comments: 'टिप्पणियाँ', writeComment: 'टिप्पणी लिखें', yourName: 'आपका नाम', yourCountry: 'आपका देश', yourComment: 'आपकी टिप्पणी...', submit: 'जमा करें', noComments: 'कोई टिप्पणी नहीं। पहली लिखें!', downloadPDF: 'PDF डाउनलोड', selectLanguage: 'भाषा चुनें', totalVotes: 'कुल वोट', votes: 'वोट', close: 'बंद करें', noVotesYet: 'अभी तक कोई वोट नहीं।', selectCountryFirst: 'कृपया पहले अपना देश चुनें।' },
  bn: { siteName: 'বিশ্ব সংবিধান', tagline: 'সংযুক্ত মানবতা সংবিধান', subtitle: 'বিশ্ব সভ্যতা সংহিতা', vote: 'ভোট দিন', yes: 'হ্যাঁ', no: 'না', abstain: 'বর্জন', visitors: 'দর্শনার্থী', download: 'PDF ডাউনলোড', donate: 'দান', chapters: 'অধ্যায়', articles: 'অনুচ্ছেদ', languages: 'ভাষা', share: 'শেয়ার', learnMore: 'আরও জানুন', privacy: 'গোপনীয়তা', imprint: 'আইনি', acceptCookies: 'গ্রহণ', cookieNotice: 'আমরা কুকিজ ব্যবহার করি।', readConstitution: 'সংবিধান পড়ুন', statistics: 'পরিসংখ্যান', supporters: 'সমর্থক', countries: 'দেশ', votesByCountry: 'দেশ অনুযায়ী ভোট', comments: 'মন্তব্য', writeComment: 'মন্তব্য লিখুন', yourName: 'আপনার নাম', yourCountry: 'আপনার দেশ', yourComment: 'আপনার মন্তব্য...', submit: 'জমা', noComments: 'কোন মন্তব্য নেই। প্রথমটি লিখুন!', downloadPDF: 'PDF ডাউনলোড', selectLanguage: 'ভাষা নির্বাচন', totalVotes: 'মোট ভোট', votes: 'ভোট', close: 'বন্ধ', noVotesYet: 'এখনও কোনো ভোট নেই।', selectCountryFirst: 'প্রথমে আপনার দেশ নির্বাচন করুন।' },
  tr: { siteName: 'Dünya Anayasası', tagline: 'Birleşik İnsanlık Anayasası', subtitle: 'Dünya Medeniyeti Kanunu', vote: 'Oy Ver', yes: 'Evet', no: 'Hayır', abstain: 'Çekimser', visitors: 'Ziyaretçi', download: 'PDF İndir', donate: 'Bağış', chapters: 'Bölümler', articles: 'Maddeler', languages: 'Diller', share: 'Paylaş', learnMore: 'Daha Fazla', privacy: 'Gizlilik', imprint: 'Yasal', acceptCookies: 'Kabul', cookieNotice: 'Çerez kullanıyoruz.', readConstitution: 'Anayasayı Oku', statistics: 'İstatistikler', supporters: 'Destekçiler', countries: 'Ülke', votesByCountry: 'Ülkelere göre oylar', comments: 'Yorumlar', writeComment: 'Yorum yaz', yourName: 'Adınız', yourCountry: 'Ülkeniz', yourComment: 'Yorumunuz...', submit: 'Gönder', noComments: 'Yorum yok. İlkini yazın!', downloadPDF: 'PDF İndir', selectLanguage: 'Dil seçin', totalVotes: 'Toplam oy', votes: 'Oy', close: 'Kapat', noVotesYet: 'Henüz oy yok.', selectCountryFirst: 'Lütfen önce ülkenizi seçin.' },
  pl: { siteName: 'Konstytucja Światowa', tagline: 'Konstytucja Zjednoczonej Ludzkości', subtitle: 'Kodeks Światowej Cywilizacji', vote: 'Głosuj', yes: 'Tak', no: 'Nie', abstain: 'Wstrzymaj się', visitors: 'Odwiedzający', download: 'Pobierz PDF', donate: 'Darowizna', chapters: 'Rozdziały', articles: 'Artykuły', languages: 'Języki', share: 'Udostępnij', learnMore: 'Dowiedz się więcej', privacy: 'Prywatność', imprint: 'Nota prawna', acceptCookies: 'Akceptuj', cookieNotice: 'Używamy plików cookie.', readConstitution: 'Czytaj Konstytucję', statistics: 'Statystyki', supporters: 'Zwolennicy', countries: 'Kraje', votesByCountry: 'Głosy według krajów', comments: 'Komentarze', writeComment: 'Napisz komentarz', yourName: 'Twoje imię', yourCountry: 'Twój kraj', yourComment: 'Twój komentarz...', submit: 'Wyślij', noComments: 'Brak komentarzy. Napisz pierwszy!', downloadPDF: 'Pobierz PDF', selectLanguage: 'Wybierz język', totalVotes: 'Całkowita liczba głosów', votes: 'Głosów', close: 'Zamknij', noVotesYet: 'Brak głosów.', selectCountryFirst: 'Najpierw wybierz swój kraj.' },
  uk: { siteName: 'Світова Конституція', tagline: "Конституція Об'єднаного Людства", subtitle: 'Кодекс Світової Цивілізації', vote: 'Голосувати', yes: 'Так', no: 'Ні', abstain: 'Утриматися', visitors: 'Відвідувачі', download: 'Завантажити PDF', donate: 'Пожертвувати', chapters: 'Розділи', articles: 'Статті', languages: 'Мови', share: 'Поділитися', learnMore: 'Дізнатися більше', privacy: 'Приватність', imprint: 'Імпринт', acceptCookies: 'Прийняти', cookieNotice: 'Ми використовуємо файли cookie.', readConstitution: 'Читати Конституцію', statistics: 'Статистика', supporters: 'Прихильників', countries: 'Країн', votesByCountry: 'Голоси по країнах', comments: 'Коментарі', writeComment: 'Написати коментар', yourName: "Ваше ім'я", yourCountry: 'Ваша країна', yourComment: 'Ваш коментар...', submit: 'Надіслати', noComments: 'Немає коментарів. Напишіть перший!', downloadPDF: 'Завантажити PDF', selectLanguage: 'Вибрати мову', totalVotes: 'Загальна кількість голосів', votes: 'Голосів', close: 'Закрити', noVotesYet: 'Голосів поки немає.', selectCountryFirst: 'Будь ласка, спочатку виберіть свою країну.' },
  id: { siteName: 'Konstitusi Dunia', tagline: 'Konstitusi Kemanusiaan Bersatu', subtitle: 'Kode Peradaban Dunia', vote: 'Pilih', yes: 'Ya', no: 'Tidak', abstain: 'Menyampingkan', visitors: 'Pengunjung', download: 'Unduh PDF', donate: 'Donasi', chapters: 'Bab', articles: 'Pasal', languages: 'Bahasa', share: 'Bagikan', learnMore: 'Pelajari', privacy: 'Privasi', imprint: 'Cetak', acceptCookies: 'Terima', cookieNotice: 'Kami menggunakan cookie.', readConstitution: 'Baca Konstitusi', statistics: 'Statistik', supporters: 'Pendukung', countries: 'Negara', votesByCountry: 'Suara per negara', comments: 'Komentar', writeComment: 'Tulis komentar', yourName: 'Nama Anda', yourCountry: 'Negara Anda', yourComment: 'Komentar Anda...', submit: 'Kirim', noComments: 'Belum ada komentar. Tulis yang pertama!', downloadPDF: 'Unduh PDF', selectLanguage: 'Pilih bahasa', totalVotes: 'Total suara', votes: 'Suara', close: 'Tutup', noVotesYet: 'Belum ada suara.', selectCountryFirst: 'Silakan pilih negara Anda terlebih dahulu.' },
  fa: { siteName: 'قانون اساسی جهانی', tagline: 'قانون اساسی بشریت متحد', subtitle: 'مدون تمدن جهانی', vote: 'رأی دهید', yes: 'بله', no: 'خیر', abstain: 'ممتنع', visitors: 'بازدیدکنندگان', download: 'دانلود PDF', donate: 'اهدا', chapters: 'فصل', articles: 'مواد', languages: 'زبان‌ها', share: 'اشتراک‌گذاری', learnMore: 'بیشتر بدانید', privacy: 'حریم خصوصی', imprint: 'حقوق قانونی', acceptCookies: 'پذیرش', cookieNotice: 'ما از کوکی استفاده می‌کنیم.', readConstitution: 'خواندن قانون اساسی', statistics: 'آمار', supporters: 'حامیان', countries: 'کشورها', votesByCountry: 'آرا بر اساس کشور', comments: 'نظرات', writeComment: 'نظر بنویسید', yourName: 'نام شما', yourCountry: 'کشور شما', yourComment: 'نظر شما...', submit: 'ارسال', noComments: 'بدون نظر. اولی را بنویسید!', downloadPDF: 'دانلود PDF', selectLanguage: 'انتخاب زبان', totalVotes: 'کل آرا', votes: 'رأی', close: 'بستن', noVotesYet: 'هنوز رأیی ثبت نشده.', selectCountryFirst: 'لطفاً ابتدا کشور خود را انتخاب کنید.' },
  sw: { siteName: 'Katiba ya Dunia', tagline: 'Katiba ya Umoja wa Binadamu', subtitle: 'Kanuni za Ustaarabu wa Dunia', vote: 'Piga Kura', yes: 'Ndiyo', no: 'Hapana', abstain: 'Kukaa kimya', visitors: 'Wageni', download: 'Pakua PDF', donate: 'Changia', chapters: 'Sura', articles: 'Vifungu', languages: 'Lugha', share: 'Shiriki', learnMore: 'Jifunze zaidi', privacy: 'Faragha', imprint: 'Taarifa', acceptCookies: 'Kubali', cookieNotice: 'Tunatumia cookies.', readConstitution: 'Soma Katiba', statistics: 'Takwimu', supporters: 'Wafuasi', countries: 'Nchi', votesByCountry: 'Kura kwa nchi', comments: 'Maoni', writeComment: 'Andika maoni', yourName: 'Jina lako', yourCountry: 'Nchi yako', yourComment: 'Maoni yako...', submit: 'Tuma', noComments: 'Hakuna maoni. Andika la kwanza!', downloadPDF: 'Pakua PDF', selectLanguage: 'Chagua lugha', totalVotes: 'Jumla ya kura', votes: 'Kura', close: 'Funga', noVotesYet: 'Hakuna kura bado.', selectCountryFirst: 'Tafadhali chagua nchi yako kwanza.' },
  vi: { siteName: 'Hiến pháp Thế giới', tagline: 'Hiến pháp Nhân loại Thống nhất', subtitle: 'Bộ luật Văn minh Thế giới', vote: 'Bỏ phiếu', yes: 'Có', no: 'Không', abstain: 'Phiếu trắng', visitors: 'Khách truy cập', download: 'Tải xuống PDF', donate: 'Quyên góp', chapters: 'Chương', articles: 'Điều', languages: 'Ngôn ngữ', share: 'Chia sẻ', learnMore: 'Tìm hiểu thêm', privacy: 'Quyền riêng tư', imprint: 'Pháp lý', acceptCookies: 'Chấp nhận', cookieNotice: 'Chúng tôi sử dụng cookie.', readConstitution: 'Đọc Hiến pháp', statistics: 'Thống kê', supporters: 'Người ủng hộ', countries: 'Quốc gia', votesByCountry: 'Phiếu bầu theo quốc gia', comments: 'Bình luận', writeComment: 'Viết bình luận', yourName: 'Tên của bạn', yourCountry: 'Quốc gia của bạn', yourComment: 'Bình luận của bạn...', submit: 'Gửi', noComments: 'Chưa có bình luận. Hãy viết cái đầu tiên!', downloadPDF: 'Tải xuống PDF', selectLanguage: 'Chọn ngôn ngữ', totalVotes: 'Tổng số phiếu', votes: 'Phiếu', close: 'Đóng', noVotesYet: 'Chưa có phiếu bầu.', selectCountryFirst: 'Vui lòng chọn quốc gia của bạn trước.' }
}

const languageNames: Record<string, string> = {
  de: 'Deutsch', en: 'English', es: 'Español', fr: 'Français', it: 'Italiano',
  pt: 'Português', ru: 'Русский', zh: '中文', ja: '日本語', ko: '한국어',
  ar: 'العربية', hi: 'हिन्दी', bn: 'বাংলা', tr: 'Türkçe', pl: 'Polski',
  uk: 'Українська', id: 'Indonesia', fa: 'فارسی', sw: 'Kiswahili', vi: 'Tiếng Việt'
}

// Country list
const countries = [
  'Deutschland', 'United States', 'United Kingdom', 'France', 'España', 'Italia', 
  'Nederland', 'Belgique', 'Schweiz', 'Österreich', 'Polska', 'Česká republika',
  'Sverige', 'Norge', 'Danmark', 'Suomi', 'Portugal', 'Ελλάδα', 'Türkiye',
  'Россия', 'Україна', '日本', '한국', '中国', 'India', 'Indonesia', 'Brasil',
  'México', 'Argentina', 'Chile', 'Colombia', 'Perú', 'South Africa', 'Egypt',
  'Australia', 'New Zealand', 'Canada', 'Other'
]

// Comment type
interface Comment {
  id: string
  name: string
  country: string
  content: string
  createdAt: string
}

// Votes by country type
interface VotesByCountry {
  [country: string]: { yes: number; no: number; abstain: number }
}

export default function Home() {
  const [language, setLanguage] = useState('de')
  const [votes, setVotes] = useState({ yes: 0, no: 0, abstain: 0 })
  const [votesByCountry, setVotesByCountry] = useState<VotesByCountry>({})
  const [voted, setVoted] = useState(false)
  const [visitorCount, setVisitorCount] = useState(0)
  const [showPDFModal, setShowPDFModal] = useState(false)
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [showLegal, setShowLegal] = useState<'none' | 'imprint' | 'privacy'>('none')
  const [showShare, setShowShare] = useState(false)
  const [showCookie, setShowCookie] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState('')
  
  // Comment state
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ name: '', country: '', content: '' })
  const [submitting, setSubmitting] = useState(false)
  
  const isClient = useClientOnly()
  const t = translations[language] || translations.de

  useEffect(() => {
    if (!isClient) return
    
    // Load saved preferences
    const savedLang = localStorage.getItem('language')
    const hasVoted = localStorage.getItem('hasVoted')
    const savedCountry = localStorage.getItem('selectedCountry')
    const cookieConsent = localStorage.getItem('cookieConsent')
    
    // Batch state updates
    const updates: (() => void)[] = []
    
    if (savedLang && translations[savedLang]) {
      updates.push(() => setLanguage(savedLang))
    }
    if (hasVoted) {
      updates.push(() => setVoted(true))
    }
    if (savedCountry) {
      updates.push(() => setSelectedCountry(savedCountry))
    }
    if (cookieConsent) {
      updates.push(() => setShowCookie(false))
    }
    
    // Apply all updates in next tick
    if (updates.length > 0) {
      setTimeout(() => updates.forEach(u => u()), 0)
    }
    
    // Fetch votes (real data only, no fallback to mock data)
    fetch('/api/vote')
      .then(r => r.json())
      .then(data => {
        setVotes({ yes: data.yes || 0, no: data.no || 0, abstain: data.abstain || 0 })
        if (data.votesByCountry) setVotesByCountry(data.votesByCountry)
      })
      .catch(() => {
        setVotes({ yes: 0, no: 0, abstain: 0 })
      })
    
    // Fetch visitors (real data only)
    fetch('/api/visitors')
      .then(r => r.json())
      .then(d => setVisitorCount(d.count || 0))
      .catch(() => setVisitorCount(0))
    
    // Fetch comments (real data only)
    fetch('/api/comments')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data)
      })
      .catch(() => setComments([]))
  }, [isClient])

  const handleVote = async (type: 'yes' | 'no' | 'abstain') => {
    if (voted) return
    
    // Require country selection
    const countryToUse = selectedCountry || newComment.country
    if (!countryToUse) {
      alert(t.selectCountryFirst)
      return
    }
    
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote: type, country: countryToUse })
      })
      const data = await res.json()
      setVotes({ yes: data.yes || 0, no: data.no || 0, abstain: data.abstain || 0 })
      if (data.votesByCountry) setVotesByCountry(data.votesByCountry)
      setVoted(true)
      localStorage.setItem('hasVoted', 'true')
    } catch {
      // Error - don't set mock data
      console.error('Vote failed')
    }
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }
  
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    setNewComment({ ...newComment, country })
    localStorage.setItem('selectedCountry', country)
  }

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true')
    setShowCookie(false)
  }

  const submitComment = async () => {
    if (!newComment.name || !newComment.content) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
      })
      if (!res.ok) {
        console.error('Comment error:', await res.json())
        return
      }
      const data = await res.json()
      if (!data.id) return // safety check: ensure we got a real comment back
      setComments([data, ...comments])
      setNewComment({ name: '', country: selectedCountry, content: '' })
    } catch {
      // Error - don't add locally
      console.error('Comment failed')
    }
    setSubmitting(false)
  }

  const total = votes.yes + votes.no + votes.abstain
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Sort countries by total votes for display
  const sortedCountryVotes = Object.entries(votesByCountry)
    .map(([country, data]) => ({
      country,
      yes: data.yes,
      no: data.no,
      abstain: data.abstain,
      total: data.yes + data.no + data.abstain
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  if (!isClient) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '42px', margin: '0 0 8px 0', fontWeight: 'bold' }}>{t.siteName}</h1>
        <p style={{ fontSize: '22px', margin: '0 0 8px 0', opacity: 0.95 }}>{t.tagline}</p>
        <p style={{ fontSize: '16px', margin: '0 0 24px 0', opacity: 0.8 }}>{t.subtitle}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: 'white', fontSize: '14px', cursor: 'pointer' }}
          >
            {Object.entries(languageNames).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
          <button onClick={() => setShowPDFModal(true)} style={{ padding: '10px 20px', background: 'white', color: '#1e3a8a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            📄 {t.download}
          </button>
          <a
            href="https://youtu.be/cXoRXzphQvw"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '10px 20px', background: '#FF0000', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            ▶ YouTube
          </a>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px 100px' }}>
        {/* Visitor Counter */}
        <div style={{ textAlign: 'center', padding: '16px', background: '#f3f4f6', borderRadius: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>{visitorCount.toLocaleString()}</span>
          <span style={{ marginLeft: '8px', color: '#6b7280' }}>{t.visitors}</span>
        </div>

        {/* Statistics Panel */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #8b5cf6 100%)',
          borderRadius: '20px',
          padding: '40px 20px',
          margin: '40px 0',
          color: 'white'
        }}>
          <h3 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>
            🌍 {t.statistics}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{total.toLocaleString()}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>{t.totalVotes}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#22c55e' }}>{votes.yes.toLocaleString()}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>{t.yes}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ef4444' }}>{votes.no.toLocaleString()}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>{t.no}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{votes.abstain.toLocaleString()}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>{t.abstain}</div>
            </div>
          </div>
        </div>

        {/* Votes by Country - Only show if there are votes */}
        {sortedCountryVotes.length > 0 && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#1e3a8a' }}>📊 {t.votesByCountry}</h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {sortedCountryVotes.map((c, i) => {
                const yesPct = c.total > 0 ? Math.round((c.yes / c.total) * 100) : 0
                const noPct = c.total > 0 ? Math.round((c.no / c.total) * 100) : 0
                return (
                  <div key={i} style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold' }}>{c.country}</span>
                      <span style={{ color: '#6b7280' }}>{c.total} {t.votes}</span>
                    </div>
                    <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${yesPct}%`, background: '#22c55e' }} />
                      <div style={{ width: `${noPct}%`, background: '#ef4444' }} />
                      <div style={{ width: `${100 - yesPct - noPct}%`, background: '#6b7280' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '12px', color: '#6b7280' }}>
                      <span>{t.yes}: {yesPct}%</span>
                      <span>{t.no}: {noPct}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Country Selection for Voting */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1e3a8a' }}>
            🌍 {t.yourCountry}
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', background: 'white' }}
          >
            <option value="">{t.selectCountryFirst}</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Vote Section */}
        <div style={{ background: 'linear-gradient(135deg, #eff6ff, #f5f3ff)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>{t.vote}</h2>
          {voted ? (
            <div>
              {total > 0 ? (
                <>
                  <div style={{ display: 'flex', height: '40px', borderRadius: '20px', overflow: 'hidden', marginBottom: '16px' }}>
                    <div style={{ width: `${(votes.yes / total) * 100}%`, background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                      {Math.round((votes.yes / total) * 100)}%
                    </div>
                    <div style={{ width: `${(votes.no / total) * 100}%`, background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                      {Math.round((votes.no / total) * 100)}%
                    </div>
                    <div style={{ width: `${(votes.abstain / total) * 100}%`, background: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                      {Math.round((votes.abstain / total) * 100)}%
                    </div>
                  </div>
                </>
              ) : (
                <p style={{ textAlign: 'center', color: '#6b7280' }}>{t.noVotesYet}</p>
              )}
              <p style={{ textAlign: 'center', color: '#6b7280' }}>✓ {language === 'de' ? 'Danke für Ihre Stimme!' : 'Thank you for voting!'}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => handleVote('yes')} style={{ padding: '16px 48px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>{t.yes}</button>
              <button onClick={() => handleVote('no')} style={{ padding: '16px 48px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>{t.no}</button>
              <button onClick={() => handleVote('abstain')} style={{ padding: '16px 48px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>{t.abstain}</button>
            </div>
          )}
        </div>

        {/* Comment Section */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#1e3a8a' }}>💬 {t.comments}</h3>
          
          {/* Comment Form */}
          <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <input
                type="text"
                placeholder={t.yourName}
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
              <select
                value={newComment.country || selectedCountry}
                onChange={(e) => {
                  setNewComment({ ...newComment, country: e.target.value })
                  setSelectedCountry(e.target.value)
                }}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', background: 'white' }}
              >
                <option value="">{t.yourCountry}</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <textarea
              placeholder={t.yourComment}
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' }}
            />
            <button
              onClick={submitComment}
              disabled={submitting || !newComment.name || !newComment.content}
              style={{
                marginTop: '12px',
                padding: '12px 24px',
                background: submitting || !newComment.name || !newComment.content ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: submitting || !newComment.name || !newComment.content ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              {submitting ? '...' : t.submit}
            </button>
          </div>
          
          {/* Comments List */}
          <div style={{ display: 'grid', gap: '12px' }}>
            {comments.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>{t.noComments}</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold', color: '#1e3a8a' }}>{comment.name}</span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{comment.country}</span>
                  </div>
                  <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Constitution Chapters */}
        {constitutionChapters.map((chapter) => (
          <div key={chapter.id} style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '16px', borderBottom: '2px solid #3b82f6', paddingBottom: '8px' }}>
              {chapter.title}
            </h2>
            {chapter.articles.map((article) => (
              <div key={article.id} style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#1e3a8a', fontSize: '18px' }}>
                  Artikel {article.id}: {article.title}
                </h3>
                <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{article.content}</p>
              </div>
            ))}
          </div>
        ))}

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <button onClick={() => setShowLegal('imprint')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>{t.imprint}</button>
          <button onClick={() => setShowLegal('privacy')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>{t.privacy}</button>
        </footer>
      </main>

      {/* Floating Buttons */}
      {/* Share Button */}
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}>
        {showShare && (
          <div style={{ position: 'absolute', bottom: '60px', left: '0', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '280px' }}>
            {[
              { name: 'X', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(t.siteName)}&url=${encodeURIComponent(shareUrl)}`, icon: '𝕏' },
              { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, icon: 'f' },
              { name: 'WhatsApp', url: `https://wa.me/?text=${encodeURIComponent(t.siteName + ' ' + shareUrl)}`, icon: 'W' },
              { name: 'Telegram', url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(t.siteName)}`, icon: 'T' },
              { name: 'Reddit', url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(t.siteName)}`, icon: 'R' },
              { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, icon: 'in' },
              { name: 'Email', url: `mailto:?subject=${encodeURIComponent(t.siteName)}&body=${encodeURIComponent(shareUrl)}`, icon: '@' },
            ].map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1e40af', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                {p.icon}
              </a>
            ))}
          </div>
        )}
        <button onClick={() => setShowShare(!showShare)} style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '24px', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
          {showShare ? '✕' : '↗'}
        </button>
      </div>

      {/* Donate Button with text in selected language */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        {showDonateModal && (
          <div style={{ position: 'absolute', bottom: '70px', right: '0', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: '20px', width: '300px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#1e3a8a' }}>{t.donate}</h3>
            <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '14px', lineHeight: 1.5 }}>
              {language === 'de' ? 'Unterstützen Sie die Vision einer friedlichen Weltgemeinschaft.' : 'Support the vision of a peaceful world community.'}
            </p>
            <a
              href="https://www.paypal.com/pool/9neHYjl32G?sr=ancr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                textAlign: 'center',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              💝 {t.donate}
            </a>
          </div>
        )}
        <button 
          onClick={() => setShowDonateModal(!showDonateModal)} 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 24px',
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '30px', 
            cursor: 'pointer', 
            fontSize: '16px', 
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)'
          }}
        >
          ❤️ {t.donate}
        </button>
      </div>

      {/* PDF Modal */}
      {showPDFModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#1e3a8a' }}>📄 {t.downloadPDF}</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <a href="/upload/Weltverfassung_Final.pdf" download style={{ display: 'block', padding: '16px', background: '#eff6ff', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', color: '#1e3a8a', fontWeight: 'bold' }}>
                📥 Deutsch (PDF)
              </a>
              <a href="/upload/Weltverfassung_Final.pdf" download style={{ display: 'block', padding: '16px', background: '#eff6ff', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', color: '#1e3a8a', fontWeight: 'bold' }}>
                📥 English (PDF)
              </a>
            </div>
            <button onClick={() => setShowPDFModal(false)} style={{ marginTop: '20px', width: '100%', padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* Legal Modals */}
      {showLegal !== 'none' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '600px', width: '100%', maxHeight: '80vh', overflow: 'auto' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#1e3a8a' }}>
              {showLegal === 'imprint' ? t.imprint : t.privacy}
            </h3>
            {showLegal === 'imprint' ? (
              <div style={{ color: '#4b5563', lineHeight: 1.8 }}>
                <p><strong>Angaben gemäß § 5 TMG</strong></p>
                <p><br/>Johannes Weigel<br/>Deutschland</p>
                <p><br/><strong>Kontakt:</strong><br/>E-Mail: joto.weigel@gmail.com</p>
                <p><br/><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br/>Johannes Weigel</p>
              </div>
            ) : (
              <div style={{ color: '#4b5563', lineHeight: 1.8 }}>
                <p><strong>Datenschutzerklärung</strong></p>
                <p><br/>Diese Website erhebt und speichert folgende Daten:</p>
                <p>• Besucherzählung (basierend auf IP-Adresse)</p>
                <p>• Abstimmungen (Ja/Nein/Enthaltung)</p>
                <p>• Kommentare (Name, Land, Inhalt)</p>
                <p><br/>Die Daten werden ausschließlich für die Darstellung der Statistiken auf dieser Website verwendet und nicht an Dritte weitergegeben.</p>
                <p><br/><strong>Cookies:</strong></p>
                <p>Diese Website verwendet Cookies für die Speicherung von Spracheinstellungen und Consent-Entscheidungen.</p>
              </div>
            )}
            <button onClick={() => setShowLegal('none')} style={{ marginTop: '20px', width: '100%', padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* Cookie Consent */}
      {showCookie && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#1e3a8a', color: 'white', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', zIndex: 3000 }}>
          <span style={{ fontSize: '14px' }}>🍪 {t.cookieNotice}</span>
          <button onClick={acceptCookies} style={{ padding: '8px 20px', background: 'white', color: '#1e3a8a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            {t.acceptCookies}
          </button>
        </div>
      )}
    </div>
  )
}
