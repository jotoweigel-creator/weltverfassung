'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Shield, Mail, MapPin, Phone, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface LegalModalProps {
  type: 'imprint' | 'privacy'
  isOpen: boolean
  onClose: () => void
}

export function LegalModal({ type, isOpen, onClose }: LegalModalProps) {
  const { language } = useLanguage()

  const content = {
    imprint: {
      de: {
        title: 'Impressum',
        sections: [
          {
            title: 'Angaben gemäß § 5 TMG',
            content: [
              { label: 'Name', value: 'Johannes Weigel' },
              { label: 'Adresse', value: 'Friesenstraße 8' },
              { label: 'PLZ/Ort', value: '06112 Halle (Saale)' },
              { label: 'Land', value: 'Deutschland' }
            ]
          },
          {
            title: 'Kontakt',
            content: [
              { label: 'E-Mail', value: 'joto.weigel@gmail.com' }
            ]
          },
          {
            title: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
            content: [
              { label: 'Name', value: 'Johannes Weigel' },
              { label: 'Adresse', value: 'Friesenstraße 8, 06112 Halle (Saale), Deutschland' }
            ]
          },
          {
            title: 'EU-Streitschlichtung',
            text: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben.'
          },
          {
            title: 'Verbraucherstreitbeilegung/Universalschlichtungsstelle',
            text: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
          },
          {
            title: 'Haftung für Inhalte',
            text: 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'
          },
          {
            title: 'Haftung für Links',
            text: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.'
          },
          {
            title: 'Urheberrecht',
            text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
          }
        ]
      },
      en: {
        title: 'Imprint',
        sections: [
          {
            title: 'Information according to § 5 TMG',
            content: [
              { label: 'Name', value: 'Johannes Weigel' },
              { label: 'Address', value: 'Friesenstraße 8' },
              { label: 'City', value: '06112 Halle (Saale)' },
              { label: 'Country', value: 'Germany' }
            ]
          },
          {
            title: 'Contact',
            content: [
              { label: 'Email', value: 'joto.weigel@gmail.com' }
            ]
          },
          {
            title: 'Responsible for content according to § 55 Abs. 2 RStV',
            content: [
              { label: 'Name', value: 'Johannes Weigel' },
              { label: 'Address', value: 'Friesenstraße 8, 06112 Halle (Saale), Germany' }
            ]
          },
          {
            title: 'EU Dispute Resolution',
            text: 'The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr/. Our email address can be found above.'
          },
          {
            title: 'Consumer Dispute Resolution',
            text: 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'
          },
          {
            title: 'Liability for Content',
            text: 'As a service provider, we are responsible for our own content on these pages according to § 7 Abs.1 TMG under general laws. However, according to §§ 8 to 10 TMG, we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming aware of such violations, we will remove this content immediately.'
          },
          {
            title: 'Liability for Links',
            text: 'Our offer contains links to external third-party websites, over whose content we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent control of the content of the linked pages is not reasonable without concrete evidence of a violation. Upon becoming aware of violations, we will remove such links immediately.'
          },
          {
            title: 'Copyright',
            text: 'The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of violations, we will remove such content immediately.'
          }
        ]
      }
    },
    privacy: {
      de: {
        title: 'Datenschutzerklärung',
        sections: [
          {
            title: '1. Datenschutz auf einen Blick',
            text: 'Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten durch den Verantwortlichen Johannes Weigel auf. Weitere Informationen finden Sie in unserer vollständigen Datenschutzerklärung unten.'
          },
          {
            title: '2. Verantwortlicher',
            text: 'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler Datenschutzgesetze sowie sonstiger datenschutzrechtlicher Bestimmungen ist: Johannes Weigel, Friesenstraße 8, 06112 Halle (Saale), Deutschland, E-Mail: joto.weigel@gmail.com'
          },
          {
            title: '3. Erhebung und Speicherung personenbezogener Daten',
            text: 'Beim Besuch unserer Website werden automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert: IP-Adresse des anfragenden Rechners, Datum und Uhrzeit des Zugriffs, Name und URL der abgerufenen Datei, Website, von der aus der Zugriff erfolgt (Referrer-URL), verwendeter Browser und Betriebssystem, Name des Access-Providers.'
          },
          {
            title: '4. Cookies',
            text: 'Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät gespeichert werden. Cookies richten auf Ihrem Endgerät keinen Schaden an, enthalten keine Viren, Trojaner oder sonstige Schadsoftware. Sie dienen dazu, unser Angebot nutzerfreundlicher und effektiver zu gestalten. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.'
          },
          {
            title: '5. Server-Log-Dateien',
            text: 'Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.'
          },
          {
            title: '6. Kontaktformular / E-Mail-Kontakt',
            text: 'Wenn Sie uns per E-Mail oder Kontaktformular kontaktieren, werden Ihre Angaben inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung Ihres Anliegens und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihres Anliegens).'
          },
          {
            title: '7. Abstimmungssystem',
            text: 'Auf unserer Website können Besucher über die Annahme der Weltverfassung abstimmen. Dabei werden folgende Daten gespeichert: Abstimmung (Ja/Nein), Land (basierend auf IP-Adresse), Zeitstempel. Eine persönliche Identifizierung ist nicht möglich. Die Abstimmung ist anonym und dient rein statistischen Zwecken.'
          },
          {
            title: '8. Kommentarfunktion',
            text: 'Bei Nutzung der Kommentarfunktion werden Ihr Name, Ihr Kommentartext und Ihr Land gespeichert. Ihre E-Mail-Adresse wird nicht gespeichert. Die Daten werden ausschließlich zur Anzeige der Kommentare auf unserer Website verwendet und nicht an Dritte weitergegeben.'
          },
          {
            title: '9. Besucherzähler',
            text: 'Wir nutzen einen Besucherzähler, um die Anzahl der Zugriffe auf unsere Website zu erfassen. Dabei wird keine personenbezogene IP-Adresse gespeichert, sondern nur ein anonymisierter Zähler erhöht.'
          },
          {
            title: '10. Ihre Rechte',
            text: 'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO), auf Datenübertragbarkeit (Art. 20 DSGVO) und auf Widerspruch (Art. 21 DSGVO). Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.'
          },
          {
            title: '11. SSL-Verschlüsselung',
            text: 'Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Sie erkennen eine verschlüsselte Verbindung an der Kennzeichnung "https://" in der Adresszeile Ihres Browsers.'
          }
        ]
      },
      en: {
        title: 'Privacy Policy',
        sections: [
          {
            title: '1. Privacy at a Glance',
            text: 'This privacy policy informs you about the type, scope, and purpose of the processing of personal data by the responsible party Johannes Weigel. For more information, please see our complete privacy policy below.'
          },
          {
            title: '2. Data Controller',
            text: 'The controller within the meaning of the General Data Protection Regulation (GDPR) and other national data protection laws as well as other data protection regulations is: Johannes Weigel, Friesenstraße 8, 06112 Halle (Saale), Germany, Email: joto.weigel@gmail.com'
          },
          {
            title: '3. Collection and Storage of Personal Data',
            text: 'When visiting our website, information is automatically sent to our server. This information is temporarily stored in a log file. The following information is collected and stored until automated deletion: IP address of the requesting computer, date and time of access, name and URL of the retrieved file, website from which access is made (referrer URL), browser and operating system used, name of the access provider.'
          },
          {
            title: '4. Cookies',
            text: 'We use cookies on our website. These are small files that your browser automatically creates and that are stored on your device. Cookies do not cause any damage to your device, do not contain viruses, Trojans, or other malware. They serve to make our offer more user-friendly and effective. You can set your browser to inform you about the setting of cookies and to allow cookies only in individual cases, to exclude the acceptance of cookies for certain cases or in general, and to activate the automatic deletion of cookies when closing the browser.'
          },
          {
            title: '5. Server Log Files',
            text: 'The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are: Browser type and version, operating system used, referrer URL, host name of the accessing computer, time of server request, IP address. A merger of this data with other data sources is not made.'
          },
          {
            title: '6. Contact Form / Email Contact',
            text: 'If you contact us by email or contact form, your details including the contact data you provided will be stored for the purpose of processing your request and in case of follow-up questions. We do not pass on this data without your consent. Processing is based on Art. 6 para. 1 lit. b GDPR (execution of pre-contractual measures) and Art. 6 para. 1 lit. f GDPR (legitimate interest in answering your request).'
          },
          {
            title: '7. Voting System',
            text: 'On our website, visitors can vote on the adoption of the World Constitution. The following data is stored: Vote (Yes/No), Country (based on IP address), Timestamp. Personal identification is not possible. The vote is anonymous and serves purely statistical purposes.'
          },
          {
            title: '8. Comment Function',
            text: 'When using the comment function, your name, your comment text, and your country are stored. Your email address is not stored. The data is used exclusively to display comments on our website and is not passed on to third parties.'
          },
          {
            title: '9. Visitor Counter',
            text: 'We use a visitor counter to record the number of accesses to our website. No personal IP address is stored, only an anonymized counter is increased.'
          },
          {
            title: '10. Your Rights',
            text: 'You have the right to access (Art. 15 GDPR), to rectification (Art. 16 GDPR), to erasure (Art. 17 GDPR), to restriction of processing (Art. 18 GDPR), to data portability (Art. 20 GDPR), and to object (Art. 21 GDPR). You also have the right to lodge a complaint with a data protection supervisory authority about the processing of your personal data by us.'
          },
          {
            title: '11. SSL Encryption',
            text: 'This site uses SSL encryption for security reasons and to protect the transmission of confidential content. You can recognize an encrypted connection by the "https://" designation in the address line of your browser.'
          }
        ]
      }
    }
  }

  // Get content for current language, fallback to German or English
  const pageContent = type === 'imprint' 
    ? (content.imprint[language as keyof typeof content.imprint] || content.imprint.de)
    : (content.privacy[language as keyof typeof content.privacy] || content.privacy.de)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                {type === 'imprint' ? (
                  <FileText className="w-6 h-6 text-blue-600" />
                ) : (
                  <Shield className="w-6 h-6 text-blue-600" />
                )}
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {pageContent.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              <div className="space-y-6">
                {pageContent.sections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                      {section.title}
                    </h3>
                    {section.text && (
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                        {section.text}
                      </p>
                    )}
                    {section.content && (
                      <div className="space-y-2">
                        {section.content.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <span className="font-medium text-slate-700 dark:text-slate-300 min-w-[100px]">
                              {item.label}:
                            </span>
                            <span className="text-slate-600 dark:text-slate-400">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Component to render links
export function LegalLinks() {
  const { language } = useLanguage()
  const [modalType, setModalType] = useState<'imprint' | 'privacy' | null>(null)

  const labels = {
    de: { imprint: 'Impressum', privacy: 'Datenschutz' },
    en: { imprint: 'Imprint', privacy: 'Privacy' },
    fr: { imprint: 'Mentions légales', privacy: 'Confidentialité' },
    es: { imprint: 'Aviso legal', privacy: 'Privacidad' },
    zh: { imprint: '法律声明', privacy: '隐私政策' }
  }

  const t = labels[language as keyof typeof labels] || labels.de

  return (
    <>
      <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <button
          onClick={() => setModalType('imprint')}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
        >
          {t.imprint}
        </button>
        <span>|</span>
        <button
          onClick={() => setModalType('privacy')}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
        >
          {t.privacy}
        </button>
      </div>

      <LegalModal
        type="imprint"
        isOpen={modalType === 'imprint'}
        onClose={() => setModalType(null)}
      />
      <LegalModal
        type="privacy"
        isOpen={modalType === 'privacy'}
        onClose={() => setModalType(null)}
      />
    </>
  )
}
