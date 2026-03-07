'use client'

import { motion } from 'framer-motion'
import { Building, Scale, Gavel, Globe, Users, Shield, Leaf, Coins, Gavel as GavelIcon, Cpu, FileText, Heart, HandHeart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

// Constitution Structure Infographic - Three Branches of Power
export function ConstitutionStructure() {
  const { language } = useLanguage()
  const t = translations[language]

  const branches = [
    {
      name: language === 'de' ? 'Legislative' : language === 'en' ? 'Legislative' : language === 'fr' ? 'Législatif' : language === 'es' ? 'Legislativo' : language === 'zh' ? '立法机构' : 'Legislative',
      icon: Building,
      color: 'from-blue-500 to-cyan-500',
      description: language === 'de' ? 'Weltparlament' : language === 'en' ? 'World Parliament' : language === 'fr' ? 'Parlement Mondial' : language === 'es' ? 'Parlamento Mundial' : language === 'zh' ? '世界议会' : 'World Parliament',
      components: language === 'de' ? ['Kammer der Weltbürger', 'Kammer der Regionen'] : language === 'en' ? ['Chamber of World Citizens', 'Chamber of Regions'] : language === 'fr' ? ['Chambre des Citoyens', 'Chambre des Régions'] : language === 'es' ? ['Cámara de Ciudadanos', 'Cámara de Regiones'] : language === 'zh' ? ['公民院', '地区院'] : ['Chamber of World Citizens', 'Chamber of Regions']
    },
    {
      name: language === 'de' ? 'Exekutive' : language === 'en' ? 'Executive' : language === 'fr' ? 'Exécutif' : language === 'es' ? 'Ejecutivo' : language === 'zh' ? '行政机构' : 'Executive',
      icon: Scale,
      color: 'from-emerald-500 to-teal-500',
      description: language === 'de' ? 'Weltrat' : language === 'en' ? 'World Council' : language === 'fr' ? 'Conseil Mondial' : language === 'es' ? 'Consejo Mundial' : language === 'zh' ? '世界理事会' : 'World Council',
      components: language === 'de' ? ['7-11 Mitglieder', 'Ministerien'] : language === 'en' ? ['7-11 Members', 'Ministries'] : language === 'fr' ? ['7-11 Membres', 'Ministères'] : language === 'es' ? ['7-11 Miembros', 'Ministerios'] : language === 'zh' ? ['7-11名成员', '各部委'] : ['7-11 Members', 'Ministries']
    },
    {
      name: language === 'de' ? 'Judikative' : language === 'en' ? 'Judiciary' : language === 'fr' ? 'Judiciaire' : language === 'es' ? 'Judicial' : language === 'zh' ? '司法机构' : 'Judiciary',
      icon: Gavel,
      color: 'from-purple-500 to-violet-500',
      description: language === 'de' ? 'Weltgerichte' : language === 'en' ? 'World Courts' : language === 'fr' ? 'Cours Mondiales' : language === 'es' ? 'Tribunales Mundiales' : language === 'zh' ? '世界法院' : 'World Courts',
      components: language === 'de' ? ['Verfassungsgericht', 'Strafgericht', 'Handelsgericht'] : language === 'en' ? ['Constitutional Court', 'Criminal Court', 'Trade Court'] : language === 'fr' ? ['Cour Constitutionnelle', 'Cour Pénale', 'Cour Commerciale'] : language === 'es' ? ['Tribunal Constitucional', 'Tribunal Penal', 'Tribunal Comercial'] : language === 'zh' ? ['宪法法院', '刑事法院', '贸易法院'] : ['Constitutional Court', 'Criminal Court', 'Trade Court']
    }
  ]

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {language === 'de' ? 'Die Drei Gewalten der Weltverfassung' : 
           language === 'en' ? 'The Three Branches of the World Constitution' :
           language === 'fr' ? 'Les Trois Pouvoirs de la Constitution Mondiale' :
           language === 'es' ? 'Los Tres Poderes de la Constitución Mundial' :
           language === 'zh' ? '世界宪法三权分立' : 'The Three Branches of the World Constitution'}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {language === 'de' ? 'Gewaltenteilung zum Schutz der Demokratie' :
           language === 'en' ? 'Separation of powers to protect democracy' :
           language === 'fr' ? 'Séparation des pouvoirs pour protéger la démocratie' :
           language === 'es' ? 'Separación de poderes para proteger la democracia' :
           language === 'zh' ? '权力分立保护民主' : 'Separation of powers to protect democracy'}
        </p>
      </motion.div>

      {/* Main Diagram */}
      <div className="relative">
        {/* Three Branches */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, index) => {
            const Icon = branch.icon
            return (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-y-1/2" 
                  style={{
                    transform: index === 0 ? 'translateX(-100%) rotate(30deg)' : 
                               index === 1 ? 'translateX(-100%)' : 
                               'translateX(-100%) rotate(-30deg)'
                  }}
                />

                <div className={`bg-gradient-to-br ${branch.color} p-1 rounded-2xl shadow-xl`}>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${branch.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{branch.name}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{branch.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {branch.components.map((comp, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${branch.color}`} />
                          {comp}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Chapter Overview Infographic
export function ChapterOverview() {
  const { language } = useLanguage()
  const t = translations[language]
  const chapters = t.chapters

  const chapterIcons = [Scale, Heart, HandHeart, Building, Coins, Shield, Gavel, Cpu, FileText, Leaf, Globe, Users, FileText]
  const chapterColors = [
    'from-blue-500 to-cyan-500',
    'from-rose-500 to-pink-500',
    'from-amber-500 to-orange-500',
    'from-indigo-500 to-violet-500',
    'from-emerald-500 to-teal-500',
    'from-sky-500 to-blue-500',
    'from-purple-500 to-fuchsia-500',
    'from-violet-500 to-purple-500',
    'from-slate-500 to-gray-500',
    'from-green-500 to-emerald-500',
    'from-teal-500 to-cyan-500',
    'from-orange-500 to-amber-500',
    'from-pink-500 to-rose-500',
  ]

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {language === 'de' ? 'Die 10 Kapitel der Verfassung' :
           language === 'en' ? 'The 10 Chapters of the Constitution' :
           language === 'fr' ? 'Les 10 Chapitres de la Constitution' :
           language === 'es' ? 'Los 10 Capítulos de la Constitución' :
           language === 'zh' ? '宪法十章' : 'The 10 Chapters of the Constitution'}
        </h3>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {chapters.map((chapter, index) => {
          const Icon = chapterIcons[index] || FileText
          const color = chapterColors[index] || 'from-slate-500 to-gray-500'
          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className={`bg-gradient-to-br ${color} p-0.5 rounded-xl`}>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center h-full">
                  <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    {chapter.number === 'Anlage 1' || chapter.number === 'Annex 1' || chapter.number === 'Anexo 1' || chapter.number === 'Annexe 1' || chapter.number === '附件一' ? chapter.number : `${t.nav.chapter} ${chapter.number}`}
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-2">
                    {chapter.title}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">
                    {chapter.articles.length} {language === 'de' ? 'Art.' : language === 'en' ? 'Art.' : language === 'zh' ? '条' : 'Art.'}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Human Rights Diagram
export function HumanRightsDiagram() {
  const { language } = useLanguage()

  const rights = [
    { icon: Heart, label: language === 'de' ? 'Leben & Integrität' : language === 'en' ? 'Life & Integrity' : language === 'fr' ? 'Vie & Intégrité' : language === 'es' ? 'Vida e Integridad' : language === 'zh' ? '生命与完整' : 'Life & Integrity', color: 'from-red-500 to-rose-500' },
    { icon: Shield, label: language === 'de' ? 'Sicherheit' : language === 'en' ? 'Security' : language === 'fr' ? 'Sécurité' : language === 'es' ? 'Seguridad' : language === 'zh' ? '安全' : 'Security', color: 'from-blue-500 to-indigo-500' },
    { icon: Users, label: language === 'de' ? 'Bildung' : language === 'en' ? 'Education' : language === 'fr' ? 'Éducation' : language === 'es' ? 'Educación' : language === 'zh' ? '教育' : 'Education', color: 'from-green-500 to-emerald-500' },
    { icon: Scale, label: language === 'de' ? 'Gerechtigkeit' : language === 'en' ? 'Justice' : language === 'fr' ? 'Justice' : language === 'es' ? 'Justicia' : language === 'zh' ? '正义' : 'Justice', color: 'from-purple-500 to-violet-500' },
    { icon: Globe, label: language === 'de' ? 'Partizipation' : language === 'en' ? 'Participation' : language === 'fr' ? 'Participation' : language === 'es' ? 'Participación' : language === 'zh' ? '参与' : 'Participation', color: 'from-cyan-500 to-teal-500' },
    { icon: Leaf, label: language === 'de' ? 'Umwelt' : language === 'en' ? 'Environment' : language === 'fr' ? 'Environnement' : language === 'es' ? 'Medio Ambiente' : language === 'zh' ? '环境' : 'Environment', color: 'from-lime-500 to-green-500' },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {language === 'de' ? 'Grundrechte der Menschheit' :
           language === 'en' ? 'Fundamental Rights of Humanity' :
           language === 'fr' ? 'Droits Fondamentaux de l\'Humanité' :
           language === 'es' ? 'Derechos Fundamentales de la Humanidad' :
           language === 'zh' ? '人类基本权利' : 'Fundamental Rights of Humanity'}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {language === 'de' ? 'Artikel 5-10 garantieren unveräußerliche Rechte' :
           language === 'en' ? 'Articles 5-10 guarantee inalienable rights' :
           language === 'fr' ? 'Les articles 5-10 garantissent des droits inaliénables' :
           language === 'es' ? 'Los artículos 5-10 garantizan derechos inalienables' :
           language === 'zh' ? '第5-10条保障不可剥夺的权利' : 'Articles 5-10 guarantee inalienable rights'}
        </p>
      </motion.div>

      <div className="relative flex items-center justify-center py-8">
        {/* Rights arranged in a circle - rendered first with lower z-index */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 z-0">
          {rights.map((right, index) => {
            const Icon = right.icon
            const angle = (index * 60 - 90) * (Math.PI / 180)
            const radius = 120
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <motion.div
                key={right.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="absolute z-0"
                style={{
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 40px)`,
                }}
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${right.color} p-0.5 shadow-lg`}>
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex flex-col items-center justify-center">
                    <Icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                    <span className="text-[8px] md:text-[10px] text-slate-600 dark:text-slate-400 text-center mt-1 px-1">
                      {right.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Central Circle - rendered last with higher z-index to be on top */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl z-20"
        >
          <div className="text-center">
            <Users className="w-8 h-8 md:w-10 md:h-10 text-white mx-auto mb-1" />
            <span className="text-white text-xs md:text-sm font-bold">
              {language === 'de' ? 'Menschen' : language === 'en' ? 'People' : language === 'zh' ? '人民' : 'People'}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Governance Flow Diagram
export function GovernanceFlow() {
  const { language } = useLanguage()

  return (
    <div className="w-full max-w-5xl mx-auto py-8 overflow-x-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {language === 'de' ? 'Die Globale Ordnung' :
           language === 'en' ? 'The Global Order' :
           language === 'fr' ? 'L\'Ordre Mondial' :
           language === 'es' ? 'El Orden Global' :
           language === 'zh' ? '全球秩序' : 'The Global Order'}
        </h3>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 min-w-max px-4">
        {/* Citizens */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <span className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            {language === 'de' ? 'Weltbürger' : language === 'en' ? 'World Citizens' : language === 'zh' ? '世界公民' : 'World Citizens'}
          </span>
        </motion.div>

        {/* Arrow */}
        <div className="text-slate-400 rotate-90 md:rotate-0">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Parliament */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Building className="w-12 h-12 text-white" />
          </div>
          <span className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            {language === 'de' ? 'Weltparlament' : language === 'en' ? 'World Parliament' : language === 'zh' ? '世界议会' : 'World Parliament'}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'de' ? 'Gesetze' : language === 'en' ? 'Laws' : language === 'zh' ? '法律' : 'Laws'}
          </span>
        </motion.div>

        {/* Arrow */}
        <div className="text-slate-400 rotate-90 md:rotate-0">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Council */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <Scale className="w-12 h-12 text-white" />
          </div>
          <span className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            {language === 'de' ? 'Weltrat' : language === 'en' ? 'World Council' : language === 'zh' ? '世界理事会' : 'World Council'}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'de' ? 'Ausführung' : language === 'en' ? 'Execution' : language === 'zh' ? '执行' : 'Execution'}
          </span>
        </motion.div>

        {/* Arrow */}
        <div className="text-slate-400 rotate-90 md:rotate-0">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Courts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
            <Gavel className="w-12 h-12 text-white" />
          </div>
          <span className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            {language === 'de' ? 'Weltgerichte' : language === 'en' ? 'World Courts' : language === 'zh' ? '世界法院' : 'World Courts'}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'de' ? 'Rechtsprechung' : language === 'en' ? 'Judiciary' : language === 'zh' ? '司法' : 'Judiciary'}
          </span>
        </motion.div>
      </div>

      {/* Feedback Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mt-6"
      >
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{language === 'de' ? 'Kontrolle & Rechenschaft' : language === 'en' ? 'Oversight & Accountability' : language === 'zh' ? '监督与问责' : 'Oversight & Accountability'}</span>
        </div>
      </motion.div>
    </div>
  )
}
