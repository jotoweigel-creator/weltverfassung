export interface Article {
  id: string;
  title: string;
  content: string;
  chapter: string;
}

export const constitutionChapters = [
  {
    id: 'preamble',
    title: 'Präambel',
    articles: [{
      id: 'P',
      title: 'Präambel',
      content: `Wir, die Völker der Erde, in dem Bewusstsein unserer untrennbaren Verbundenheit untereinander und mit allen Ökosystemen dieses Planeten, in der Erkenntnis, dass Frieden, Gerechtigkeit und die Bewahrung der Schöpfung nur durch gemeinsames Handeln gesichert werden können, und in der Verantwortung gegenüber den Generationen, die nach uns kommen, geben uns diese Verfassung.

Sie ist das oberste Gesetz der Menschheit. Ihre Grundprinzipien sind unantastbar. Sie verpflichtet alle Individuen, Gemeinschaften, Institutionen und transnationalen Akteure auf das Ziel einer freien, gerechten und nachhaltigen Weltzivilisation.

Diese Verfassung erkennt die Vielfalt der Menschheit als Stärke, das Erbe vergangener Ungerechtigkeiten als Verpflichtung und die Würde jedes Lebewesens als Grundlage allen Rechts an. Sie ist kein Endpunkt, sondern ein lebendiger Prozess.`,
      chapter: 'Präambel'
    }]
  },
  {
    id: 'chapter1',
    title: 'Kapitel I – Grundprinzipien',
    articles: [
      {
        id: '1',
        title: 'Menschenwürde',
        content: `(1) Die Würde jedes Menschen ist unantastbar. Sie zu achten und zu schützen ist Verpflichtung aller Gewalt und jedes Einzelnen.

(2) Die Menschheit ist eine Schicksalsgemeinschaft. Die Vielfalt ihrer Kulturen und Lebensweisen ist ein zu schützender Reichtum.

(3) Im Falle eines Konflikts zwischen Grundrechten hat die Sicherung der unmittelbaren physischen Existenz (Leben, Gesundheit, Nahrung, Wasser) grundsätzlich Vorrang, sofern diese Sicherung nicht selbst die langfristige Existenzgrundlage Vieler durch die Überschreitung planetarer Grenzen zerstört.

(4) Die Definition von Menschenwürde ist offen für Erweiterung durch den Globalen Verfassungskonvent, insbesondere im Hinblick auf neue Erkenntnisse zu Bewusstsein, Empfindungsfähigkeit und digitalen Entitäten – sie kann jedoch niemals verengt werden.`,
        chapter: 'Kapitel I'
      },
      {
        id: '2',
        title: 'Gleichheit und Nichtdiskriminierung',
        content: `(1) Alle Menschen sind vor dem Gesetz gleich.

(2) Niemand darf wegen seiner Herkunft, Hautfarbe, Ethnie, seines Geschlechts, seiner Sprache, Religion, politischen oder sonstigen Überzeugung, seiner sexuellen Identität, seines Alters, einer Behinderung oder seines Kastenstatus benachteiligt oder bevorzugt werden.`,
        chapter: 'Kapitel I'
      },
      {
        id: '3',
        title: 'Freiheit und Verantwortung',
        content: `(1) Jeder Mensch hat das Recht auf freie Entfaltung seiner Persönlichkeit, Gedanken-, Gewissens- und Religionsfreiheit sowie die Freiheit der Meinungsäußerung und Kunst.

(2) Diese Freiheit findet ihre Grenzen in den Rechten anderer, den verfassungsmäßigen Gesetzen und den planetaren Belastungsgrenzen. Die Ausübung von Freiheit darf die natürlichen Lebensgrundlagen nicht dauerhaft schädigen.`,
        chapter: 'Kapitel I'
      },
      {
        id: '4',
        title: 'Nachhaltigkeit und Generationengerechtigkeit',
        content: `(1) Alle Maßnahmen und Entscheidungen sind am Prinzip der Nachhaltigkeit auszurichten. Die Regenerationsfähigkeit der Ökosysteme und die Verfügbarkeit von Ressourcen für zukünftige Generationen sind zu wahren.

(2) Die Senken des Planeten (Atmosphäre, Ozeane, Böden) sind als gemeinsames Erbe der Menschheit zu schützen.

(3) Tiere und andere empfindungsfähige Lebewesen haben ein Recht auf Schutz vor vermeidbarem Leid.`,
        chapter: 'Kapitel I'
      }
    ]
  },
  {
    id: 'chapter2',
    title: 'Kapitel II – Grund- und Menschenrechte',
    articles: [
      {
        id: '5',
        title: 'Recht auf Leben und körperliche Unversehrtheit',
        content: `(1) Jeder Mensch hat das Recht auf Leben und körperliche Unversehrtheit. Folter und grausame, unmenschliche oder erniedrigende Behandlung oder Strafe sind verboten.`,
        chapter: 'Kapitel II'
      },
      {
        id: '6',
        title: 'Recht auf Sicherheit und Schutz',
        content: `(1) Jeder Mensch hat das Recht auf Schutz vor Gewalt, Willkür, Unterdrückung und Ausbeutung.`,
        chapter: 'Kapitel II'
      },
      {
        id: '7',
        title: 'Recht auf Wohlergehen und Daseinsvorsorge',
        content: `(1) Jeder Mensch hat das Recht auf Zugang zu sauberem Trinkwasser, ausreichender und gesunder Nahrung, angemessener Unterkunft und sanitärer Grundversorgung.

(2) Jeder Mensch hat das Recht auf das erreichbare Höchstmaß an körperlicher und geistiger Gesundheit sowie auf Zugang zu einer medizinischen Grundversorgung.`,
        chapter: 'Kapitel II'
      },
      {
        id: '8',
        title: 'Recht auf Bildung und Wissen',
        content: `(1) Jeder Mensch hat das Recht auf eine kostenlose und ganzheitliche Bildung, die seine kognitiven, emotionalen, sozialen und kreativen Fähigkeiten fördert.

(2) Der Zugang zu Wissen, Wissenschaft, Technologie und kulturellem Erbe ist zu gewährleisten.`,
        chapter: 'Kapitel II'
      },
      {
        id: '9',
        title: 'Recht auf Privatsphäre und informationelle Selbstbestimmung',
        content: `(1) Die Privatsphäre, die Wohnung, die Kommunikation und die persönlichen Daten jedes Menschen sind unverletzlich.

(2) Jeder Mensch hat das Recht, selbst über die Preisgabe und Verwendung seiner persönlichen Daten zu bestimmen.`,
        chapter: 'Kapitel II'
      },
      {
        id: '9a',
        title: 'Digitale Rechte',
        content: `(1) Jeder Mensch hat das Recht auf Zugang zum Internet und auf digitale Teilhabe.

(2) Algorithmische Entscheidungen, die erhebliche Auswirkungen auf Einzelne haben, müssen transparent, nachvollziehbar und anfechtbar sein.

(3) Jeder Mensch hat das Recht zu wissen, ob er mit einer künstlichen Intelligenz oder einem Menschen interagiert.`,
        chapter: 'Kapitel II'
      },
      {
        id: '10',
        title: 'Recht auf politische Partizipation',
        content: `(1) Jeder Mensch hat das Recht, an der Gestaltung der öffentlichen Angelegenheiten seines unmittelbaren Lebensumfeldes sowie der globalen Politik mitzuwirken.

(2) Staatenlosen und Geflüchteten wird eine Wahlkreiszugehörigkeit nach dem Ort ihres gewöhnlichen Aufenthalts zugewiesen.`,
        chapter: 'Kapitel II'
      }
    ]
  },
  {
    id: 'chapter3',
    title: 'Kapitel III – Grundpflichten',
    articles: [
      {
        id: '11',
        title: 'Achtung der Rechte anderer',
        content: `(1) Jeder Mensch ist verpflichtet, die Rechte und die Würde anderer zu achten. Gewalt, Nötigung, Betrug und Ausbeutung sind verboten.`,
        chapter: 'Kapitel III'
      },
      {
        id: '12',
        title: 'Beitrag zum Gemeinwohl',
        content: `(1) Jeder Mensch soll nach seinen Fähigkeiten und Möglichkeiten zum materiellen, sozialen oder kulturellen Wohl der Gemeinschaft beitragen.`,
        chapter: 'Kapitel III'
      },
      {
        id: '13',
        title: 'Ökologische Verantwortung',
        content: `(1) Jeder Mensch ist verpflichtet, die natürlichen Lebensgrundlagen zu schonen und Schäden von ihnen abzuwenden.`,
        chapter: 'Kapitel III'
      },
      {
        id: '14',
        title: 'Rechtsgehorsam und Widerstandsrecht',
        content: `(1) Jeder Mensch ist verpflichtet, die geltenden Gesetze und rechtmäßigen Anordnungen zu befolgen.

(2) Gegen jede Person oder Institution, die es unternimmt, die verfassungsmäßige Ordnung zu beseitigen, hat jeder Mensch das Recht zum Widerstand.`,
        chapter: 'Kapitel III'
      }
    ]
  },
  {
    id: 'chapter4',
    title: 'Kapitel IV – Die Globale Ordnung',
    articles: [
      {
        id: '15',
        title: 'Vorrang des Weltrechts',
        content: `(1) Dieses Verfassungsrecht steht im Rang über allen regionalen, nationalen und lokalen Gesetzen.

(2) Nationale oder regionale Rechtsvorschriften, die gegen die Kapitel I, II und III dieser Verfassung verstoßen, sind nichtig.`,
        chapter: 'Kapitel IV'
      },
      {
        id: '16',
        title: 'Prinzip der Gewaltenteilung',
        content: `Die Ausübung der globalen Hoheitsgewalt wird durch eigene, voneinander unabhängige Organe der Gesetzgebung, der Exekutive und der Rechtsprechung ausgeübt.`,
        chapter: 'Kapitel IV'
      },
      {
        id: '17',
        title: 'Die Globale Legislative (Das Weltparlament)',
        content: `(1) Das Weltparlament ist die oberste gesetzgebende Körperschaft. Es verabschiedet Weltgesetze, die für alle Menschen verbindlich sind.

(2) Es besteht aus zwei Kammern: der Kammer der Weltbürger und der Kammer der Regionen.

(3) Gesetze bedürfen der Zustimmung beider Kammern.`,
        chapter: 'Kapitel IV'
      },
      {
        id: '18',
        title: 'Die Globale Exekutive (Der Weltrat)',
        content: `(1) Der Weltrat ist die ausführende Gewalt. Er führt die Weltgesetze aus, vertritt die Menschheit nach außen und leitet die globale Verwaltung.

(2) Der Weltrat wird vom Weltparlament gewählt. Sein Vorsitz rotiert turnusmäßig zwischen den Kontinentalregionen.`,
        chapter: 'Kapitel IV'
      },
      {
        id: '19',
        title: 'Die Globale Judikative',
        content: `(1) Die Rechtsprechung wird durch unabhängige Gerichte ausgeübt.

(2) Der Internationale Gerichtshof für Menschenrechte und Verfassungsfragen wacht über die Einhaltung dieser Verfassung.`,
        chapter: 'Kapitel IV'
      },
      {
        id: '20',
        title: 'Subsidiarität und regionale Autonomie',
        content: `(1) Die Globale Ordnung übernimmt nur jene Aufgaben, die auf regionaler, nationaler oder lokaler Ebene nicht wirksam erfüllt werden können.

(2) Die Regionen und lokalen Gemeinschaften behalten das Recht auf kulturelle, sprachliche und administrative Selbstbestimmung.`,
        chapter: 'Kapitel IV'
      }
    ]
  },
  {
    id: 'chapter5',
    title: 'Kapitel V – Wirtschaftsordnung und Finanzierung',
    articles: [
      {
        id: '21',
        title: 'Grundsätze der Wirtschaft und Eigentum',
        content: `(1) Die Wirtschaft dient dem Gemeinwohl und der Sicherung der menschenwürdigen Existenz für alle innerhalb der planetaren Grenzen.

(2) Die Eigentumsordnung wird durch Gesetz bestimmt. Eigentum verpflichtet.`,
        chapter: 'Kapitel V'
      },
      {
        id: '22',
        title: 'Globale Gerechtigkeit und Regulierung',
        content: `(1) Globale Handelsabkommen und Wirtschaftspolitik sind an den Zielen der sozialen Gerechtigkeit auszurichten.

(2) International tätige Unternehmen unterliegen einer weltweit verbindlichen Regulierung.`,
        chapter: 'Kapitel V'
      },
      {
        id: '23',
        title: 'Gemeinsame Güter',
        content: `(1) Die globalen Gemeinschaftsgüter (Atmosphäre, die Ozeane, die Artenvielfalt, der Weltraum und der digitale Raum) sind treuhänderisch für die gesamte Menschheit zu verwalten.`,
        chapter: 'Kapitel V'
      }
    ]
  },
  {
    id: 'chapter6',
    title: 'Kapitel VI – Friedenssicherung',
    articles: [
      {
        id: '24',
        title: 'Friedensgebot',
        content: `(1) Die Menschheit hat sich dem Frieden verpflichtet. Jede Form von Angriffskrieg ist völkerrechtswidrig und verboten.

(2) Konflikte sind primär durch Dialog, Verhandlung, Mediation oder verbindliche Schiedsverfahren zu lösen.`,
        chapter: 'Kapitel VI'
      },
      {
        id: '25',
        title: 'Weltfriedensdienst',
        content: `(1) Anstelle nationaler Streitkräfte wird ein gemeinsamer, dem Weltrat unterstellter Weltfriedensdienst eingerichtet.

(2) Sein Einsatz ist nur als Ultima Ratio zulässig. Jeder Einsatz bedarf der vorherigen Zustimmung des Weltparlaments.`,
        chapter: 'Kapitel VI'
      }
    ]
  },
  {
    id: 'chapter7',
    title: 'Kapitel VII – Sanktionen und Rehabilitation',
    articles: [
      {
        id: '26',
        title: 'Graduiertes Sanktionssystem',
        content: `Ziel der Sanktionen ist primär der Schutz der Gemeinschaft, die Wiederherstellung des Rechtsfriedens und die soziale Rehabilitation der Täter. Das System ist mehrstufig:

1. Stufe: Feststellung und Mediation
2. Stufe: Wiedergutmachung
3. Stufe: Therapeutische und Bildungsmaßnahmen
4. Stufe: Temporäre Einschränkung von Rechten
5. Stufe: Isolierung und Sicherungsverwahrung`,
        chapter: 'Kapitel VII'
      },
      {
        id: '27',
        title: 'Sanktionen gegen Staaten und Regionen',
        content: `(1) Verstößt eine Region oder ein Staat schwerwiegend gegen die Verfassung, kann der Weltrat gestufte Maßnahmen beschließen.`,
        chapter: 'Kapitel VII'
      }
    ]
  },
  {
    id: 'chapter8',
    title: 'Kapitel VIII – Technologie und Wissenschaft',
    articles: [
      {
        id: '28',
        title: 'Künstliche Intelligenz',
        content: `(1) Der Einsatz von Künstlicher Intelligenz muss dem Menschen dienen und die Grundrechte achten.

(2) Der Einsatz autonomer Waffensysteme ist verboten.`,
        chapter: 'Kapitel VIII'
      },
      {
        id: '29',
        title: 'Wissenschaft und Forschung',
        content: `(1) Die Wissenschaftsfreiheit ist gewährleistet.

(2) Forschung, die gegen die Menschenwürde verstößt, ist verboten.`,
        chapter: 'Kapitel VIII'
      }
    ]
  },
  {
    id: 'chapter9',
    title: 'Kapitel IX – Schlussbestimmungen',
    articles: [
      {
        id: '30',
        title: 'Ewigkeitsklausel',
        content: `(1) Die Grundprinzipien der Artikel 1 bis 4 sind einer Verfassungsänderung entzogen.`,
        chapter: 'Kapitel IX'
      },
      {
        id: '31',
        title: 'Evolutionsklausel',
        content: `(1) Alle zehn Jahre tritt ein globaler Verfassungskonvent zusammen, der die Wirksamkeit der Verfassung überprüft.`,
        chapter: 'Kapitel IX'
      },
      {
        id: '32',
        title: 'Verfassungsänderungen',
        content: `(1) Eine Änderung bedarf einer Zweidrittelmehrheit in beiden Kammern des Weltparlaments und einer Bestätigung durch einen globalen Volksentscheid.`,
        chapter: 'Kapitel IX'
      },
      {
        id: '33',
        title: 'Inkrafttreten',
        content: `(1) Diese Verfassung tritt in Kraft, sobald sie von der Mehrheit der Nationalstaaten angenommen wurde.`,
        chapter: 'Kapitel IX'
      }
    ]
  }
];

export const statistics = {
  chapters: 10,
  articles: 34,
  languages: 20,
  preamble: true
};
