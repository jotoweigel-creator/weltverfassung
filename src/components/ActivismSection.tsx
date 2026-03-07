'use client'

import { motion } from 'framer-motion'
import {
  Users,
  MessageSquare,
  Share2,
  PenTool,
  Globe,
  Heart,
  Megaphone,
  BookOpen,
  HandHeart,
  ArrowRight,
  ExternalLink,
  Mail,
  UsersRound
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations, type LanguageCode } from '@/lib/i18n/translations'

// Activism section translations
const activismTranslations: Record<LanguageCode, {
  title: string
  subtitle: string
  description: string
  takeAction: string
  waysToHelp: string
  learnMore: string
  actions: {
    share: { title: string; description: string; action: string }
    discuss: { title: string; description: string; action: string }
    translate: { title: string; description: string; action: string }
    advocate: { title: string; description: string; action: string }
    educate: { title: string; description: string; action: string }
    donate: { title: string; description: string; action: string }
    volunteer: { title: string; description: string; action: string }
    organize: { title: string; description: string; action: string }
  }
  stats: {
    supporters: string
    countries: string
    discussions: string
    translations: string
  }
  joinMovement: string
  newsletter: {
    title: string
    description: string
    placeholder: string
    subscribe: string
  }
}> = {
  de: {
    title: "Werde Teil der Bewegung",
    subtitle: "Dein Handeln zählt",
    description: "Die Verfassung der Vereinten Menschheit ist mehr als ein Dokument – sie ist ein Aufruf zum Handeln. Hier sind Möglichkeiten, wie du dich einbringen kannst.",
    takeAction: "Handle jetzt",
    waysToHelp: "Wie du helfen kannst",
    learnMore: "Mehr erfahren",
    actions: {
      share: { title: "Teile die Vision", description: "Verbreite die Verfassung in deinem Netzwerk und erreiche mehr Menschen.", action: "Jetzt teilen" },
      discuss: { title: "Diskutiere mit", description: "Tausche dich mit anderen aus und entwickle Ideen weiter.", action: "Diskussion starten" },
      translate: { title: "Hilf beim Übersetzen", description: "Bringe die Verfassung in neue Sprachen und Kulturen.", action: "Mitmachen" },
      advocate: { title: "Werde Fürsprecher", description: "Sprich mit Entscheidungsträgern und Organisationen über die Verfassung.", action: "Materialien ansehen" },
      educate: { title: "Bilde andere", description: "Organisiere Workshops oder Vorträge über die Verfassung.", action: "Ressourcen laden" },
      donate: { title: "Unterstütze finanziell", description: "Hilf, diese Plattform werbefrei und zugänglich zu halten.", action: "Spenden" },
      volunteer: { title: "Engagiere dich", description: "Werde Teil unseres Teams und bringe deine Fähigkeiten ein.", action: "Bewerben" },
      organize: { title: "Organisiere Events", description: "Plane Treffen, Lesungen oder Diskussionen in deiner Stadt.", action: "Event planen" }
    },
    stats: {
      supporters: "Unterstützer",
      countries: "Länder",
      discussions: "Diskussionen",
      translations: "Sprachen"
    },
    joinMovement: "Der Bewegung beitreten",
    newsletter: {
      title: "Bleib informiert",
      description: "Erhalte Updates zur Verfassung und der Bewegung.",
      placeholder: "Deine E-Mail-Adresse",
      subscribe: "Anmelden"
    }
  },
  en: {
    title: "Join the Movement",
    subtitle: "Your Action Counts",
    description: "The Constitution of United Humanity is more than a document – it's a call to action. Here are ways you can get involved.",
    takeAction: "Take Action Now",
    waysToHelp: "How You Can Help",
    learnMore: "Learn More",
    actions: {
      share: { title: "Share the Vision", description: "Spread the constitution in your network and reach more people.", action: "Share Now" },
      discuss: { title: "Join the Discussion", description: "Exchange ideas with others and develop concepts further.", action: "Start Discussion" },
      translate: { title: "Help Translate", description: "Bring the constitution to new languages and cultures.", action: "Contribute" },
      advocate: { title: "Become an Advocate", description: "Speak with decision-makers and organizations about the constitution.", action: "View Materials" },
      educate: { title: "Educate Others", description: "Organize workshops or presentations about the constitution.", action: "Get Resources" },
      donate: { title: "Support Financially", description: "Help keep this platform ad-free and accessible.", action: "Donate" },
      volunteer: { title: "Volunteer", description: "Join our team and contribute your skills.", action: "Apply" },
      organize: { title: "Organize Events", description: "Plan meetings, readings or discussions in your city.", action: "Plan Event" }
    },
    stats: {
      supporters: "Supporters",
      countries: "Countries",
      discussions: "Discussions",
      translations: "Languages"
    },
    joinMovement: "Join the Movement",
    newsletter: {
      title: "Stay Informed",
      description: "Receive updates about the constitution and movement.",
      placeholder: "Your email address",
      subscribe: "Subscribe"
    }
  },
  fr: {
    title: "Rejoignez le Mouvement",
    subtitle: "Votre Action Compte",
    description: "La Constitution de l'Humanité Unie est plus qu'un document – c'est un appel à l'action. Voici comment vous pouvez vous impliquer.",
    takeAction: "Agir Maintenant",
    waysToHelp: "Comment Aider",
    learnMore: "En Savoir Plus",
    actions: {
      share: { title: "Partagez la Vision", description: "Diffusez la constitution dans votre réseau.", action: "Partager" },
      discuss: { title: "Participez aux Discussions", description: "Échangez avec d'autres et développez des idées.", action: "Commencer" },
      translate: { title: "Aidez à Traduire", description: "Apportez la constitution à de nouvelles langues.", action: "Contribuer" },
      advocate: { title: "Devenez Défenseur", description: "Parlez aux décideurs de la constitution.", action: "Voir les Matériaux" },
      educate: { title: "Éduquez les Autres", description: "Organisez des ateliers sur la constitution.", action: "Ressources" },
      donate: { title: "Soutenez Financièrement", description: "Aidez à garder cette plateforme accessible.", action: "Donner" },
      volunteer: { title: "Devenez Bénévole", description: "Rejoignez notre équipe.", action: "Postuler" },
      organize: { title: "Organisez des Événements", description: "Planifiez des réunions dans votre ville.", action: "Planifier" }
    },
    stats: {
      supporters: "Partisans",
      countries: "Pays",
      discussions: "Discussions",
      translations: "Langues"
    },
    joinMovement: "Rejoindre le Mouvement",
    newsletter: {
      title: "Restez Informé",
      description: "Recevez des mises à jour sur la constitution.",
      placeholder: "Votre adresse e-mail",
      subscribe: "S'abonner"
    }
  },
  es: {
    title: "Únete al Movimiento",
    subtitle: "Tu Acción Cuenta",
    description: "La Constitución de la Humanidad Unida es más que un documento – es un llamado a la acción. Aquí están las formas en que puedes participar.",
    takeAction: "Actúa Ahora",
    waysToHelp: "Cómo Puedes Ayudar",
    learnMore: "Más Información",
    actions: {
      share: { title: "Comparte la Visión", description: "Difunde la constitución en tu red.", action: "Compartir" },
      discuss: { title: "Únete al Debate", description: "Intercambia ideas con otros.", action: "Iniciar" },
      translate: { title: "Ayuda a Traducir", description: "Lleva la constitución a nuevos idiomas.", action: "Contribuir" },
      advocate: { title: "Sé un Defensor", description: "Habla con tomadores de decisiones.", action: "Ver Materiales" },
      educate: { title: "Educa a Otros", description: "Organiza talleres sobre la constitución.", action: "Recursos" },
      donate: { title: "Apoya Financieramente", description: "Ayuda a mantener esta plataforma.", action: "Donar" },
      volunteer: { title: "Sé Voluntario", description: "Únete a nuestro equipo.", action: "Aplicar" },
      organize: { title: "Organiza Eventos", description: "Planifica reuniones en tu ciudad.", action: "Planificar" }
    },
    stats: {
      supporters: "Partidarios",
      countries: "Países",
      discussions: "Discusiones",
      translations: "Idiomas"
    },
    joinMovement: "Unirse al Movimiento",
    newsletter: {
      title: "Mantente Informado",
      description: "Recibe actualizaciones sobre la constitución.",
      placeholder: "Tu correo electrónico",
      subscribe: "Suscribirse"
    }
  },
  zh: {
    title: "加入运动",
    subtitle: "你的行动很重要",
    description: "人类联合宪法不仅仅是一份文件——它是行动的号召。以下是你参与的方式。",
    takeAction: "立即行动",
    waysToHelp: "如何帮助",
    learnMore: "了解更多",
    actions: {
      share: { title: "分享愿景", description: "在你的网络中传播宪法。", action: "立即分享" },
      discuss: { title: "参与讨论", description: "与他人交流想法。", action: "开始讨论" },
      translate: { title: "帮助翻译", description: "将宪法带到新的语言。", action: "贡献" },
      advocate: { title: "成为倡导者", description: "与决策者讨论宪法。", action: "查看资料" },
      educate: { title: "教育他人", description: "组织关于宪法的工作坊。", action: "获取资源" },
      donate: { title: "财务支持", description: "帮助保持平台无广告。", action: "捐款" },
      volunteer: { title: "成为志愿者", description: "加入我们的团队。", action: "申请" },
      organize: { title: "组织活动", description: "在你城市计划会议。", action: "计划活动" }
    },
    stats: {
      supporters: "支持者",
      countries: "国家",
      discussions: "讨论",
      translations: "语言"
    },
    joinMovement: "加入运动",
    newsletter: {
      title: "保持了解",
      description: "接收宪法和运动的更新。",
      placeholder: "你的电子邮箱",
      subscribe: "订阅"
    }
  },
  ar: {
    title: "انضم إلى الحركة",
    subtitle: "تصرفك مهم",
    description: "دستور الإنسانية المتحدة أكثر من مجرد وثيقة - إنه دعوة للعمل. إليك طرق للمشاركة.",
    takeAction: "تصرف الآن",
    waysToHelp: "كيف يمكنك المساعدة",
    learnMore: "اعرف المزيد",
    actions: {
      share: { title: "شارك الرؤية", description: "انشر الدستور في شبكتك.", action: "شارك الآن" },
      discuss: { title: "انضم للنقاش", description: "تبادل الأفكار مع الآخرين.", action: "ابدأ النقاش" },
      translate: { title: "ساعد في الترجمة", description: "أوصل الدستور إلى لغات جديدة.", action: "ساهم" },
      advocate: { title: "كن مدافعاً", description: "تحدث مع صانعي القرار.", action: "عرض المواد" },
      educate: { title: "علّم الآخرين", description: "نظم ورش عمل حول الدستور.", action: "الحصول على الموارد" },
      donate: { title: "ادعم مالياً", description: "ساعد في الحفاظ على المنصة.", action: "تبرع" },
      volunteer: { title: "تطوع", description: "انضم إلى فريقنا.", action: "قدم طلبك" },
      organize: { title: "نظم الفعاليات", description: "خطط لاجتماعات في مدينتك.", action: "خطط لفعالية" }
    },
    stats: {
      supporters: "مؤيد",
      countries: "دولة",
      discussions: "نقاش",
      translations: "لغة"
    },
    joinMovement: "انضم إلى الحركة",
    newsletter: {
      title: "ابق على اطلاع",
      description: "تلقي التحديثات حول الدستور.",
      placeholder: "بريدك الإلكتروني",
      subscribe: "اشترك"
    }
  },
  ru: {
    title: "Присоединяйтесь к Движению",
    subtitle: "Ваши Действия Важны",
    description: "Конституция Объединённого Человечества — это больше, чем документ. Это призыв к действию. Вот способы, которыми вы можете участвовать.",
    takeAction: "Действуйте Сейчас",
    waysToHelp: "Как Вы Можете Помочь",
    learnMore: "Узнать Больше",
    actions: {
      share: { title: "Поделитесь Видением", description: "Распространите конституцию в вашей сети.", action: "Поделиться" },
      discuss: { title: "Присоединитесь к Обсуждению", description: "Обменивайтесь идеями с другими.", action: "Начать" },
      translate: { title: "Помогите с Переводом", description: "Принесите конституцию на новые языки.", action: "Внести вклад" },
      advocate: { title: "Станьте Адвокатом", description: "Говорите с лицами, принимающими решения.", action: "Материалы" },
      educate: { title: "Просвещайте Других", description: "Организуйте семинары о конституции.", action: "Ресурсы" },
      donate: { title: "Поддержите Финансово", description: "Помогите сохранить платформу.", action: "Пожертвовать" },
      volunteer: { title: "Станьте Волонтёром", description: "Присоединитесь к нашей команде.", action: "Подать заявку" },
      organize: { title: "Организуйте Мероприятия", description: "Планируйте встречи в вашем городе.", action: "Запланировать" }
    },
    stats: {
      supporters: "Сторонников",
      countries: "Стран",
      discussions: "Обсуждений",
      translations: "Языков"
    },
    joinMovement: "Присоединиться к Движению",
    newsletter: {
      title: "Будьте в Курсе",
      description: "Получайте обновления о конституции.",
      placeholder: "Ваш email",
      subscribe: "Подписаться"
    }
  },
  pt: {
    title: "Junte-se ao Movimento",
    subtitle: "Sua Ação Importa",
    description: "A Constituição da Humanidade Unida é mais que um documento – é um chamado à ação. Aqui estão formas de participar.",
    takeAction: "Ajude Agora",
    waysToHelp: "Como Você Pode Ajudar",
    learnMore: "Saiba Mais",
    actions: {
      share: { title: "Compartilhe a Visão", description: "Espalhe a constituição na sua rede.", action: "Compartilhar" },
      discuss: { title: "Participe da Discussão", description: "Troque ideias com outros.", action: "Iniciar" },
      translate: { title: "Ajude a Traduzir", description: "Leve a constituição a novos idiomas.", action: "Contribuir" },
      advocate: { title: "Seja um Defensor", description: "Fale com tomadores de decisão.", action: "Ver Materiais" },
      educate: { title: "Eduque Outros", description: "Organize workshops sobre a constituição.", action: "Recursos" },
      donate: { title: "Apoie Financeiramente", description: "Ajude a manter esta plataforma.", action: "Doar" },
      volunteer: { title: "Seja Voluntário", description: "Junte-se à nossa equipe.", action: "Aplicar" },
      organize: { title: "Organize Eventos", description: "Planeje encontros na sua cidade.", action: "Planejar" }
    },
    stats: {
      supporters: "Apoiadores",
      countries: "Países",
      discussions: "Discussões",
      translations: "Idiomas"
    },
    joinMovement: "Juntar-se ao Movimento",
    newsletter: {
      title: "Fique Informado",
      description: "Receba atualizações sobre a constituição.",
      placeholder: "Seu e-mail",
      subscribe: "Inscrever-se"
    }
  },
  it: {
    title: "Unisciti al Movimento",
    subtitle: "La Tua Azione Conta",
    description: "La Costituzione dell'Umanità Unita è più di un documento – è un appello all'azione. Ecco come puoi partecipare.",
    takeAction: "Agisci Ora",
    waysToHelp: "Come Puoi Aiutare",
    learnMore: "Scopri di Più",
    actions: {
      share: { title: "Condividi la Visione", description: "Diffondi la costituzione nella tua rete.", action: "Condividi" },
      discuss: { title: "Partecipa alla Discussione", description: "Scambia idee con altri.", action: "Inizia" },
      translate: { title: "Aiuta a Tradurre", description: "Porta la costituzione in nuove lingue.", action: "Contribuisci" },
      advocate: { title: "Diventa un Sostenitore", description: "Parla con i decisori.", action: "Vedi Materiali" },
      educate: { title: "Educa gli Altri", description: "Organizza workshop sulla costituzione.", action: "Risorse" },
      donate: { title: "Sostieni Finanziariamente", description: "Aiuta a mantenere questa piattaforma.", action: "Dona" },
      volunteer: { title: "Diventa Volontario", description: "Unisciti al nostro team.", action: "Candidati" },
      organize: { title: "Organizza Eventi", description: "Pianifica incontri nella tua città.", action: "Pianifica" }
    },
    stats: {
      supporters: "Sostenitori",
      countries: "Paesi",
      discussions: "Discussioni",
      translations: "Lingue"
    },
    joinMovement: "Unisciti al Movimento",
    newsletter: {
      title: "Rimani Informato",
      description: "Ricevi aggiornamenti sulla costituzione.",
      placeholder: "La tua email",
      subscribe: "Iscriviti"
    }
  },
  ja: {
    title: "運動に参加しよう",
    subtitle: "あなたの行動が大切です",
    description: "人類統一憲法は単なる文書以上のものです。これは行動への呼びかけです。参加方法は以下の通りです。",
    takeAction: "今すぐ行動",
    waysToHelp: "協力方法",
    learnMore: "詳細を見る",
    actions: {
      share: { title: "ビジョンを共有", description: "ネットワークで憲法を広めましょう。", action: "今すぐ共有" },
      discuss: { title: "議論に参加", description: "他の人とアイデアを交換しましょう。", action: "議論を始める" },
      translate: { title: "翻訳を手伝う", description: "憲法を新しい言語に広めましょう。", action: "貢献する" },
      advocate: { title: "提唱者になる", description: "意思決定者と話しましょう。", action: "資料を見る" },
      educate: { title: "他の人を教育", description: "憲法に関するワークショップを企画。", action: "リソースを取得" },
      donate: { title: "財政的に支援", description: "プラットフォームを維持しましょう。", action: "寄付する" },
      volunteer: { title: "ボランティア", description: "チームに参加しましょう。", action: "申し込む" },
      organize: { title: "イベントを企画", description: "あなたの街で会合を計画。", action: "イベントを計画" }
    },
    stats: {
      supporters: "サポーター",
      countries: "カ国",
      discussions: "ディスカッション",
      translations: "言語"
    },
    joinMovement: "運動に参加",
    newsletter: {
      title: "最新情報を受け取る",
      description: "憲法と運動の更新を受け取る。",
      placeholder: "メールアドレス",
      subscribe: "購読する"
    }
  },
  hi: { title: "आंदोलन से जुड़ें", subtitle: "आपकी कार्रवाई मायने रखती है", description: "संयुक्त मानवता का संविधान एक दस्तावेज से कहीं अधिक है - यह कार्रवाई का आह्वान है।", takeAction: "अभी कार्रवाई करें", waysToHelp: "आप कैसे मदद कर सकते हैं", learnMore: "और जानें", actions: { share: { title: "दृष्टि साझा करें", description: "अपने नेटवर्क में संविधान फैलाएं।", action: "अभी साझा करें" }, discuss: { title: "चर्चा में शामिल हों", description: "दूसरों के साथ विचार बदलें।", action: "चर्चा शुरू करें" }, translate: { title: "अनुवाद में मदद करें", description: "संविधान को नई भाषाओं में लाएं।", action: "योगदान करें" }, advocate: { title: "अधिवक्ता बनें", description: "निर्णयकर्ताओं से बात करें।", action: "सामग्री देखें" }, educate: { title: "दूसरों को शिक्षित करें", description: "संविधान पर कार्यशालाएं आयोजित करें।", action: "संसाधन प्राप्त करें" }, donate: { title: "वित्तीय सहायता करें", description: "प्लेटफ़ॉर्म को बनाए रखने में मदद करें।", action: "दान करें" }, volunteer: { title: "स्वयंसेवक बनें", description: "हमारी टीम से जुड़ें।", action: "आवेदन करें" }, organize: { title: "आयोजन करें", description: "अपने शहर में बैठकों की योजना बनाएं।", action: "आयोजन की योजना बनाएं" } }, stats: { supporters: "समर्थक", countries: "देश", discussions: "चर्चाएं", translations: "भाषाएं" }, joinMovement: "आंदोलन से जुड़ें", newsletter: { title: "सूचना बनाए रखें", description: "संविधान के बारे में अपडेट प्राप्त करें।", placeholder: "आपका ईमेल", subscribe: "सदस्यता लें" } },
  ko: { title: "운동에 동참하세요", subtitle: "당신의 행동이 중요합니다", description: "인류 통합 헌법은 단순한 문서 이상입니다. 행동의 호소입니다. 참여 방법은 다음과 같습니다.", takeAction: "지금 행동하세요", waysToHelp: "도움 방법", learnMore: "더 알아보기", actions: { share: { title: "비전 공유", description: "네트워크에 헌법을 전파하세요.", action: "지금 공유" }, discuss: { title: "토론 참여", description: "다른 사람들과 아이디어를 교환하세요.", action: "토론 시작" }, translate: { title: "번역 돕기", description: "헌법을 새 언어로 가져오세요.", action: "기여하기" }, advocate: { title: "옹호자 되기", description: "의사결정자와 대화하세요.", action: "자료 보기" }, educate: { title: "다른 사람 교육", description: "헌법에 관한 워크샵을 조직하세요.", action: "리소스 얻기" }, donate: { title: "재정적 지원", description: "플랫폼을 유지하는 데 도움을 주세요.", action: "기부하기" }, volunteer: { title: "자원봉사", description: "팀에 합류하세요.", action: "신청하기" }, organize: { title: "이벤트 조직", description: "도시에서 모임을 계획하세요.", action: "이벤트 계획" } }, stats: { supporters: "지지자", countries: "국가", discussions: "토론", translations: "언어" }, joinMovement: "운동 참여", newsletter: { title: "정보 유지", description: "헌법에 대한 업데이트를 받으세요.", placeholder: "이메일 주소", subscribe: "구독" } },
  tr: { title: "Harekete Katıl", subtitle: "Eyleminiz Önemli", description: "Birleşik İnsanlık Anayasası bir belgeden daha fazlasıdır - bir eylem çağrısıdır. İşte katılabileceğiniz yollar.", takeAction: "Şimdi Harekete Geç", waysToHelp: "Nasıl Yardım Edebilirsiniz", learnMore: "Daha Fazla Bilgi", actions: { share: { title: "Vizyonu Paylaş", description: "Anayasayı ağınızda yayın.", action: "Şimdi Paylaş" }, discuss: { title: "Tartışmaya Katıl", description: "Başkalarıyla fikir alışverişi yapın.", action: "Tartışma Başlat" }, translate: { title: "Çeviriye Yardım Et", description: "Anayasayı yeni dillere taşıyın.", action: "Katkıda Bulun" }, advocate: { title: "Savunucu Ol", description: "Karar vericilerle konuşun.", action: "Materyalleri Gör" }, educate: { title: "Başkalarını Eğit", description: "Anayasa hakkında atölyeler düzenleyin.", action: "Kaynakları Al" }, donate: { title: "Mali Destek", description: "Platformu korumaya yardımcı olun.", action: "Bağış Yap" }, volunteer: { title: "Gönüllü Ol", description: "Ekibimize katılın.", action: "Başvur" }, organize: { title: "Etkinlik Düzenle", description: "Şehrinizde buluşmalar planlayın.", action: "Etkinlik Planla" } }, stats: { supporters: "Destekçi", countries: "Ülke", discussions: "Tartışma", translations: "Dil" }, joinMovement: "Harekete Katıl", newsletter: { title: "Bilgili Kalın", description: "Anayasa hakkında güncellemeler alın.", placeholder: "E-posta adresiniz", subscribe: "Abone Ol" } },
  id: { title: "Bergabung dengan Gerakan", subtitle: "Tindakan Anda Penting", description: "Konstitusi Kemanusiaan Bersatu lebih dari sekadar dokumen – ini adalah seruan untuk bertindak.", takeAction: "Bertindak Sekarang", waysToHelp: "Bagaimana Anda Dapat Membantu", learnMore: "Pelajari Lebih Lanjut", actions: { share: { title: "Bagikan Visi", description: "Sebarkan konstitusi di jaringan Anda.", action: "Bagikan Sekarang" }, discuss: { title: "Bergabung dalam Diskusi", description: "Bertukar ide dengan orang lain.", action: "Mulai Diskusi" }, translate: { title: "Bantu Menerjemahkan", description: "Bawa konstitusi ke bahasa baru.", action: "Berkontribusi" }, advocate: { title: "Menjadi Advokat", description: "Bicara dengan pembuat keputusan.", action: "Lihat Materi" }, educate: { title: "Edukasi Orang Lain", description: "Atur lokakarya tentang konstitusi.", action: "Dapatkan Sumber Daya" }, donate: { title: "Dukung Secara Keuangan", description: "Bantu menjaga platform ini.", action: "Donasi" }, volunteer: { title: "Menjadi Relawan", description: "Bergabung dengan tim kami.", action: "Lamar" }, organize: { title: "Atur Acara", description: "Rencanakan pertemuan di kota Anda.", action: "Rencanakan Acara" } }, stats: { supporters: "Pendukung", countries: "Negara", discussions: "Diskusi", translations: "Bahasa" }, joinMovement: "Bergabung dengan Gerakan", newsletter: { title: "Tetap Terinformasi", description: "Terima pembaruan tentang konstitusi.", placeholder: "Alamat email Anda", subscribe: "Berlangganan" } },
  bn: { title: "আন্দোলনে যোগ দিন", subtitle: "আপনার ক্রিয়া গুরুত্বপূর্ণ", description: "ইউনাইটেড হিউম্যানিটির সংবিধান একটি নথির চেয়ে বেশি - এটি কাজের আহ্বান।", takeAction: "এখনই পদক্ষেপ নিন", waysToHelp: "আপনি কীভাবে সাহায্য করতে পারেন", learnMore: "আরও জানুন", actions: { share: { title: "দৃষ্টিভঙ্গি শেয়ার করুন", description: "আপনার নেটওয়ার্কে সংবিধান ছড়িয়ে দিন।", action: "এখনই শেয়ার করুন" }, discuss: { title: "আলোচনায় যোগ দিন", description: "অন্যদের সাথে মতবিনিময় করুন।", action: "আলোচনা শুরু করুন" }, translate: { title: "অনুবাদে সাহায্য করুন", description: "সংবিধানকে নতুন ভাষায় নিয়ে আসুন।", action: "অবদান রাখুন" }, advocate: { title: "সমর্থক হন", description: "সিদ্ধান্ত গ্রহণকারীদের সাথে কথা বলুন।", action: "উপকরণ দেখুন" }, educate: { title: "অন্যদের শিক্ষিত করুন", description: "সংবিধানে কর্মশালার আয়োজন করুন।", action: "সংসাধন পান" }, donate: { title: "আর্থিকভাবে সহায়তা করুন", description: "প্ল্যাটফর্মটি বজায় রাখতে সাহায্য করুন।", action: "দান করুন" }, volunteer: { title: "স্বেচ্ছাসেবক হন", description: "আমাদের দলে যোগ দিন।", action: "আবেদন করুন" }, organize: { title: "ইভেন্ট আয়োজন করুন", description: "আপনার শহরে সভার পরিকল্পনা করুন।", action: "ইভেন্ট পরিকল্পনা" } }, stats: { supporters: "সমর্থক", countries: "দেশ", discussions: "আলোচনা", translations: "ভাষা" }, joinMovement: "আন্দোলনে যোগ দিন", newsletter: { title: "অবহিত থাকুন", description: "সংবিধান সম্পর্কে আপডেট পান।", placeholder: "আপনার ইমেইল", subscribe: "সাবস্ক্রাইব" } },
  vi: { title: "Tham Gia Phong Trào", subtitle: "Hành Động Của Bạn Quan Trọng", description: "Hiến pháp Nhân loại Thống nhất không chỉ là một văn bản - đó là lời kêu gọi hành động.", takeAction: "Hành Động Ngay", waysToHelp: "Bạn Có Thể Giúp Gì", learnMore: "Tìm Hiểu Thêm", actions: { share: { title: "Chia Sẻ Tầm Nhìn", description: "Lan tỏa hiến pháp trong mạng lưới của bạn.", action: "Chia Sẻ Ngay" }, discuss: { title: "Tham Gia Thảo Luận", description: "Trao đổi ý tưởng với người khác.", action: "Bắt Đầu Thảo Luận" }, translate: { title: "Giúp Dịch", description: "Mang hiến pháp đến ngôn ngữ mới.", action: "Đóng Góp" }, advocate: { title: "Trở Thành Người Ủng Hộ", description: "Nói chuyện với người ra quyết định.", action: "Xem Tài Liệu" }, educate: { title: "Giáo Dục Người Khác", description: "Tổ chức hội thảo về hiến pháp.", action: "Nhận Tài Nguyên" }, donate: { title: "Hỗ Trợ Tài Chính", description: "Giúp duy trì nền tảng này.", action: "Quyên Góp" }, volunteer: { title: "Tình Nguyện", description: "Tham gia đội ngũ của chúng tôi.", action: "Ứng Tuyển" }, organize: { title: "Tổ Chức Sự Kiện", description: "Lên kế hoạch họp tại thành phố.", action: "Lập Kế Hoạch" } }, stats: { supporters: "Người Ủng Hộ", countries: "Quốc Gia", discussions: "Thảo Luận", translations: "Ngôn Ngữ" }, joinMovement: "Tham Gia Phong Trào", newsletter: { title: "Cập Nhật Thông Tin", description: "Nhận cập nhật về hiến pháp.", placeholder: "Email của bạn", subscribe: "Đăng Ký" } },
  fa: { title: "به حرکت بپیوندید", subtitle: "عمل شما مهم است", description: "قانون اساسی بشریت متحد فراتر از یک سند است - این یک فراخوان برای اقدام است.", takeAction: "همین حالا اقدام کنید", waysToHelp: "چگونه می‌توانید کمک کنید", learnMore: "بیشتر بدانید", actions: { share: { title: "چشم‌انداز را به اشتراک بگذارید", description: "قانون اساسی را در شبکه خود پخش کنید.", action: "همین الان به اشتراک بگذارید" }, discuss: { title: "به بحث بپیوندید", description: "با دیگران ایده مبادله کنید.", action: "شروع بحث" }, translate: { title: "کمک به ترجمه", description: "قانون اساسی را به زبان‌های جدید بیاورید.", action: "مشارکت" }, advocate: { title: "مدافع شوید", description: "با تصمیم‌گیرندگان صحبت کنید.", action: "مشاهده مواد" }, educate: { title: "دیگران را آموزش دهید", description: "کارگاه‌هایی درباره قانون اساسی برگزار کنید.", action: "دریافت منابع" }, donate: { title: "حمایت مالی", description: "کمک به حفظ این پلتفرم.", action: "اهداء" }, volunteer: { title: "داوطب شوید", description: "به تیم ما بپیوندید.", action: "درخواست" }, organize: { title: "رویداد سازماندهی کنید", description: "جلسات را در شهرتان برنامه‌ریزی کنید.", action: "برنامه‌ریزی رویداد" } }, stats: { supporters: "حامی", countries: "کشور", discussions: "بحث", translations: "زبان" }, joinMovement: "به حرکت بپیوندید", newsletter: { title: "مطلع بمانید", description: "به‌روزرسانی‌های قانون اساسی دریافت کنید.", placeholder: "ایمیل شما", subscribe: "اشتراک" } },
  sw: { title: "Jiunge na Harakati", subtitle: "Kitendo Chako Kinahesabu", description: "Katiba ya Umoja wa Binadamu ni zaidi ya waraka - ni wito wa kuchukua hatua.", takeAction: "Chukua Hatua Sasa", waysToHelp: "Jinsi Unavyoweza Kusaidia", learnMore: "Jifunze Zaidi", actions: { share: { title: "Shiriki Maono", description: "Sambaza katiba mtandaoni kwako.", action: "Shiriki Sasa" }, discuss: { title: "Jiunge na Mjadala", description: "Badilishana mawazo na wengine.", action: "Anza Mjadala" }, translate: { title: "Saidia Kutafsiri", description: "Lete katiba kwa lugha mpya.", action: "Changia" }, advocate: { title: "Kuwa Mtetezi", description: "Zungumza na watengenezaji wa maamuzi.", action: "Tazama Vifaa" }, educate: { title: "Elimisha Wengine", description: "Panga warsha kuhusu katiba.", action: "Pata Rasilimali" }, donate: { title: "Saidia Kifedha", description: "Saidia kudumisha jukwaa hili.", action: "Toa Sadaka" }, volunteer: { title: "Kuwa Kujitolea", description: "Jiunge na timu yetu.", action: "Omba" }, organize: { title: "Panga Matukio", description: "Panga mikutano jiji mwako.", action: "Panga Tukio" } }, stats: { supporters: "Wafuasi", countries: "Nchi", discussions: "Majadaliano", translations: "Lugha" }, joinMovement: "Jiunge na Harakati", newsletter: { title: "Baki na Habari", description: "Pata mabadiliko kuhusu katiba.", placeholder: "Barua pepe yako", subscribe: "Jiandikishe" } },
  pl: { title: "Dołącz do Ruchu", subtitle: "Twoje Działanie Ma Znaczenie", description: "Konstytucja Zjednoczonej Ludzkości to więcej niż dokument – to wezwanie do działania.", takeAction: "Działaj Teraz", waysToHelp: "Jak Możesz Pomóc", learnMore: "Dowiedz Się Więcej", actions: { share: { title: "Podziel się Wizją", description: "Rozpowszechnij konstytucję w swojej sieci.", action: "Podziel się Teraz" }, discuss: { title: "Dołącz do Dyskusji", description: "Wymieniaj pomysły z innymi.", action: "Rozpocznij Dyskusję" }, translate: { title: "Pomóż w Tłumaczeniu", description: "Przenieś konstytucję do nowych języków.", action: "Wnieś Wkład" }, advocate: { title: "Zostań Rzecznikiem", description: "Rozmawiaj z decydentami.", action: "Zobacz Materiały" }, educate: { title: "Edukuj Innych", description: "Organizuj warsztaty o konstytucji.", action: "Uzyskaj Zasoby" }, donate: { title: "Wesprzyj Finansowo", description: "Pomóż utrzymać tę platformę.", action: "Darowizna" }, volunteer: { title: "Zostań Wolontariuszem", description: "Dołącz do naszego zespołu.", action: "Aplikuj" }, organize: { title: "Organizuj Wydarzenia", description: "Planuj spotkania w swoim mieście.", action: "Zaplanuj Wydarzenie" } }, stats: { supporters: "Zwolenników", countries: "Krajów", discussions: "Dyskusji", translations: "Języków" }, joinMovement: "Dołącz do Ruchu", newsletter: { title: "Bądź na Bieżąco", description: "Otrzymuj aktualizacje o konstytucji.", placeholder: "Twój email", subscribe: "Subskrybuj" } },
  uk: { title: "Приєднайтесь до Руху", subtitle: "Ваші Дії Важливі", description: "Конституція Об'єднаного Людства — це більше ніж документ. Це заклик до дії.", takeAction: "Дійте Зараз", waysToHelp: "Як Ви Можете Допомогти", learnMore: "Дізнатися Більше", actions: { share: { title: "Поділіться Баченням", description: "Поширюйте конституцію у своїй мережі.", action: "Поділитися" }, discuss: { title: "Приєднайтесь до Обговорення", description: "Обмінюйтесь ідеями з іншими.", action: "Почати" }, translate: { title: "Допоможіть з Перекладом", description: "Принесіть конституцію новими мовами.", action: "Зробити Внесок" }, advocate: { title: "Станьте Адвокатом", description: "Говоріть з особами, що приймають рішення.", action: "Матеріали" }, educate: { title: "Просвітлюйте Інших", description: "Організовуйте семіари про конституцію.", action: "Ресурси" }, donate: { title: "Підтримайте Фінансово", description: "Допоможіть зберегти платформу.", action: "Пожертвувати" }, volunteer: { title: "Станьте Волонтером", description: "Приєднайтесь до нашої команди.", action: "Подати Заявку" }, organize: { title: "Організовуйте Заходи", description: "Плануйте зустрічі у своєму місті.", action: "Запланувати" } }, stats: { supporters: "Прихильників", countries: "Країн", discussions: "Обговорень", translations: "Мов" }, joinMovement: "Приєднатися до Руху", newsletter: { title: "Будьте в Курсі", description: "Отримуйте оновлення про конституцію.", placeholder: "Ваш email", subscribe: "Підписатися" } }
}

const actionIcons = [Share2, MessageSquare, Globe, Megaphone, BookOpen, Heart, UsersRound, Users]

export function ActivismSection() {
  const { language } = useLanguage()
  const t = activismTranslations[language] || activismTranslations.en
  const actions = Object.values(t.actions)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-rose-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 border-rose-300 text-rose-600 dark:border-rose-500 dark:text-rose-400">
            <HandHeart className="w-4 h-4 mr-2" />
            {t.takeAction}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: '10,000+', label: t.stats.supporters },
            { value: '150+', label: t.stats.countries },
            { value: '5,000+', label: t.stats.discussions },
            { value: '20', label: t.stats.translations }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400">{stat.value}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Action Cards */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
            {t.waysToHelp}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((action, index) => {
              const Icon = actionIcons[index]
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-emerald-500 to-teal-500',
                'from-orange-500 to-amber-500',
                'from-rose-500 to-pink-500',
                'from-indigo-500 to-violet-500',
                'from-sky-500 to-blue-500',
                'from-green-500 to-emerald-500'
              ]
              const color = colors[index % colors.length]

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm group">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                        {action.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        {action.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 p-0 h-auto group/btn"
                      >
                        {action.action}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 rounded-2xl p-8 text-white text-center"
        >
          <Mail className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-2">{t.newsletter.title}</h3>
          <p className="text-white/80 mb-6 max-w-md mx-auto">{t.newsletter.description}</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t.newsletter.placeholder}
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button className="bg-white text-purple-600 hover:bg-white/90 px-6 py-3 rounded-lg font-medium">
              {t.newsletter.subscribe}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ActivismSection
