from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# Register fonts
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SimHei.ttf'))
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')

# Create document
doc = SimpleDocTemplate(
    "/home/z/my-project/download/Spenden_Einrichtung_Anfleitung.pdf",
    pagesize=A4,
    leftMargin=2*cm,
    rightMargin=2*cm,
    topMargin=2*cm,
    bottomMargin=2*cm
)

# Define styles
styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    name='Title',
    fontName='Times New Roman',
    fontSize=24,
    leading=30,
    alignment=TA_CENTER,
    spaceAfter=20
)

heading_style = ParagraphStyle(
    name='Heading',
    fontName='Times New Roman',
    fontSize=16,
    leading=22,
    alignment=TA_LEFT,
    spaceBefore=20,
    spaceAfter=10
)

subheading_style = ParagraphStyle(
    name='SubHeading',
    fontName='Times New Roman',
    fontSize=13,
    leading=18,
    alignment=TA_LEFT,
    spaceBefore=15,
    spaceAfter=8
)

body_style = ParagraphStyle(
    name='Body',
    fontName='Times New Roman',
    fontSize=11,
    leading=16,
    alignment=TA_JUSTIFY,
    spaceAfter=8
)

bullet_style = ParagraphStyle(
    name='Bullet',
    fontName='Times New Roman',
    fontSize=11,
    leading=16,
    alignment=TA_LEFT,
    leftIndent=20,
    spaceAfter=4
)

code_style = ParagraphStyle(
    name='Code',
    fontName='Times New Roman',
    fontSize=10,
    leading=14,
    alignment=TA_LEFT,
    leftIndent=20,
    backColor=colors.HexColor('#f5f5f5'),
    spaceAfter=8
)

story = []

# Title
story.append(Paragraph("<b>Anleitung: Spendenbutton Einrichtung</b>", title_style))
story.append(Paragraph("Weltverfassung Website (worldcodex.space.z.ai)", ParagraphStyle(
    name='Subtitle',
    fontName='Times New Roman',
    fontSize=14,
    leading=18,
    alignment=TA_CENTER,
    spaceAfter=30
)))

# Introduction
story.append(Paragraph("<b>1. Übersicht</b>", heading_style))
story.append(Paragraph(
    "Der Spendenbutton wurde bereits in Ihre Website integriert und ist als schwebender Button unten rechts auf jeder Seite sichtbar. "
    "Die Komponente unterstützt mehrere Zahlungsmethoden und ist vollständig mehrsprachig (20 Sprachen). Der Button zeigt ein Herz-Symbol "
    "mit der Aufschrift 'Projekt unterstützen' und öffnet beim Klick ein elegantes Spenden-Modal mit verschiedenen Optionen.",
    body_style
))

story.append(Spacer(1, 12))

# Current configuration
story.append(Paragraph("<b>2. Aktuelle Konfiguration</b>", heading_style))
story.append(Paragraph(
    "Die Spenden-Komponente befindet sich in der Datei <b>/src/components/DonateButton.tsx</b>. Die folgenden Einstellungen sind bereits vorkonfiguriert:",
    body_style
))

# Configuration table
config_data = [
    [Paragraph('<b>Einstellung</b>', ParagraphStyle(name='th', fontName='Times New Roman', fontSize=10, textColor=colors.white, alignment=TA_CENTER)),
     Paragraph('<b>Wert</b>', ParagraphStyle(name='th', fontName='Times New Roman', fontSize=10, textColor=colors.white, alignment=TA_CENTER)),
     Paragraph('<b>Status</b>', ParagraphStyle(name='th', fontName='Times New Roman', fontSize=10, textColor=colors.white, alignment=TA_CENTER))],
    [Paragraph('PayPal E-Mail', body_style), Paragraph('joto.weigel@gmail.com', body_style), Paragraph('Aktiv', body_style)],
    [Paragraph('Ko-fi Benutzername', body_style), Paragraph('(nicht konfiguriert)', body_style), Paragraph('Inaktiv', body_style)],
    [Paragraph('Patreon Benutzername', body_style), Paragraph('(nicht konfiguriert)', body_style), Paragraph('Inaktiv', body_style)],
    [Paragraph('Bankverbindung', body_style), Paragraph('(nicht konfiguriert)', body_style), Paragraph('Inaktiv', body_style)],
]

config_table = Table(config_data, colWidths=[5*cm, 6*cm, 3*cm])
config_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1F4E79')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 1), (-1, -1), colors.white),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
]))
story.append(Spacer(1, 12))
story.append(config_table)
story.append(Spacer(1, 18))

# PayPal Setup
story.append(Paragraph("<b>3. PayPal Einrichtung (Empfohlen)</b>", heading_style))
story.append(Paragraph(
    "PayPal ist die einfachste Methode, um Spenden zu empfangen. Ihre PayPal-Adresse ist bereits konfiguriert. "
    "Hier sind die Schritte, um sicherzustellen, dass alles funktioniert:",
    body_style
))

story.append(Paragraph("<b>Schritt 1: PayPal Konto verifizieren</b>", subheading_style))
story.append(Paragraph("• Stellen Sie sicher, dass Ihr PayPal-Konto vollständig verifiziert ist (Bankkonto oder Kreditkarte verknüpft)", bullet_style))
story.append(Paragraph("• Loggen Sie sich bei PayPal ein und gehen Sie zu 'Einstellungen' > 'Kontodetails'", bullet_style))

story.append(Paragraph("<b>Schritt 2: Spenden-Link testen</b>", subheading_style))
story.append(Paragraph(
    "Klicken Sie auf Ihrer Website auf den Spendenbutton und dann auf 'PayPal'. Es sollte sich ein neuer Tab öffnen mit der PayPal-Spendenseite, "
    "wo Ihre E-Mail-Adresse als Empfänger angezeigt wird. Testen Sie mit einem kleinen Betrag.",
    body_style
))

story.append(Paragraph("<b>Schritt 3: Spenden-Link anpassen (Optional)</b>", subheading_style))
story.append(Paragraph(
    "Für erweiterte Funktionen können Sie einen PayPal.me-Link erstellen:",
    body_style
))
story.append(Paragraph("1. Gehen Sie zu paypal.me", bullet_style))
story.append(Paragraph("2. Erstellen Sie Ihren persönlichen Link (z.B. paypal.me/johannesweigel)", bullet_style))
story.append(Paragraph("3. Diesen Link können Sie für eine professionellere Darstellung verwenden", bullet_style))

story.append(Spacer(1, 12))

# Ko-fi Setup
story.append(Paragraph("<b>4. Ko-fi Einrichtung (Optional)</b>", heading_style))
story.append(Paragraph(
    "Ko-fi ist eine beliebte Plattform für Kreativschaffende, die Spenden in Form von 'virtuellen Kaffees' (ca. 3€) ermöglichen. "
    "Die Plattform erhebt keine Gebühren auf Spenden und ist besonders in der Kreativ-Community beliebt. Die Einrichtung ist kostenlos und unkompliziert.",
    body_style
))

story.append(Paragraph("<b>Schritt 1: Ko-fi Konto erstellen</b>", subheading_style))
story.append(Paragraph("• Gehen Sie zu ko-fi.com und klicken Sie auf 'Get Started'", bullet_style))
story.append(Paragraph("• Erstellen Sie ein kostenloses Konto oder loggen Sie sich mit PayPal ein", bullet_style))

story.append(Paragraph("<b>Schritt 2: Profil einrichten</b>", subheading_style))
story.append(Paragraph("• Wählen Sie einen Benutzernamen (wird Teil Ihrer URL: ko-fi.com/benutzername)", bullet_style))
story.append(Paragraph("• Laden Sie ein Profilbild hoch und schreiben Sie eine kurze Beschreibung Ihres Projekts", bullet_style))

story.append(Paragraph("<b>Schritt 3: In Website eintragen</b>", subheading_style))
story.append(Paragraph(
    "Öffnen Sie die Datei <b>/src/components/DonateButton.tsx</b> und suchen Sie nach der Zeile:",
    body_style
))
story.append(Paragraph("const KOFI_USERNAME = '' // Noch nicht eingerichtet", code_style))
story.append(Paragraph(
    "Ersetzen Sie sie durch (Beispiel):",
    body_style
))
story.append(Paragraph("const KOFI_USERNAME = 'worldcodex' // Ihr Ko-fi Benutzername", code_style))

story.append(Spacer(1, 12))

# Patreon Setup
story.append(Paragraph("<b>5. Patreon Einrichtung (Optional)</b>", heading_style))
story.append(Paragraph(
    "Patreon eignet sich besonders gut für wiederkehrende Unterstützer, die monatlich einen festen Betrag spenden möchten. "
    "Die Plattform ermöglicht verschiedene Mitgliedschaftsstufen mit exklusiven Vorteilen für Ihre Unterstützer. "
    "Dies ist ideal für langfristige Projekte mit engagierter Community.",
    body_style
))

story.append(Paragraph("<b>Schritt 1: Patreon-Konto erstellen</b>", subheading_style))
story.append(Paragraph("• Gehen Sie zu patreon.com und erstellen Sie ein Creator-Konto", bullet_style))
story.append(Paragraph("• Wählen Sie einen einprägsamen Benutzernamen", bullet_style))

story.append(Paragraph("<b>Schritt 2: Mitgliedschaftsstufen definieren</b>", subheading_style))
story.append(Paragraph("• Erstellen Sie verschiedene Unterstützer-Stufen (z.B. 5€, 10€, 25€ monatlich)", bullet_style))
story.append(Paragraph("• Bieten Sie exklusive Inhalte oder Vorteile für jede Stufe an", bullet_style))

story.append(Paragraph("<b>Schritt 3: In Website eintragen</b>", subheading_style))
story.append(Paragraph(
    "In der Datei <b>/src/components/DonateButton.tsx</b>:",
    body_style
))
story.append(Paragraph("const PATREON_USERNAME = 'worldcodex' // Ihr Patreon Benutzername", code_style))

story.append(Spacer(1, 12))

# Bank Transfer
story.append(Paragraph("<b>6. Banküberweisung Einrichten (Optional)</b>", heading_style))
story.append(Paragraph(
    "Für Unterstützer, die lieber direkt überweisen, können Sie Ihre Bankverbindung angeben. "
    "Dies ist besonders in Deutschland beliebt und vermeidet Gebühren durch Zahlungsanbieter. "
    "Die Bankdaten werden sicher auf der Website angezeigt, wenn sie konfiguriert sind.",
    body_style
))

story.append(Paragraph(
    "Bearbeiten Sie in <b>/src/components/DonateButton.tsx</b> den BANK_INFO-Block:",
    body_style
))
story.append(Paragraph("""const BANK_INFO = {
  name: 'Johannes Weigel',
  bank: 'Ihre Bank',        // z.B. 'Deutsche Bank'
  iban: 'DE89...',          // Ihre IBAN
  bic: 'DEUTDEFF...'        // Ihr BIC
}""", code_style))

story.append(Spacer(1, 12))

# Features
story.append(Paragraph("<b>7. Features des Spendenbuttons</b>", heading_style))

features_data = [
    [Paragraph('<b>Feature</b>', ParagraphStyle(name='th', fontName='Times New Roman', fontSize=10, textColor=colors.white, alignment=TA_CENTER)),
     Paragraph('<b>Beschreibung</b>', ParagraphStyle(name='th', fontName='Times New Roman', fontSize=10, textColor=colors.white, alignment=TA_CENTER))],
    [Paragraph('Mehrsprachigkeit', body_style), Paragraph('Automatisch in 20 Sprachen verfügbar', body_style)],
    [Paragraph('Vorausgewählte Beträge', body_style), Paragraph('5€, 10€, 25€, 50€, 100€ + eigener Betrag', body_style)],
    [Paragraph('Einmalig / Monatlich', body_style), Paragraph('Unterstützer können zwischen beiden Optionen wählen', body_style)],
    [Paragraph('Responsives Design', body_style), Paragraph('Funktioniert auf Desktop und Mobile', body_style)],
    [Paragraph('Dunkelmodus', body_style), Paragraph('Automatische Anpassung an Website-Theme', body_style)],
]

features_table = Table(features_data, colWidths=[5*cm, 9*cm])
features_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1F4E79')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 1), (-1, -1), colors.white),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
]))
story.append(Spacer(1, 12))
story.append(features_table)
story.append(Spacer(1, 18))

# Quick Start
story.append(Paragraph("<b>8. Schnellstart: So aktivieren Sie alle Zahlungsmethoden</b>", heading_style))

story.append(Paragraph("<b>Datei: /src/components/DonateButton.tsx</b>", subheading_style))
story.append(Paragraph(
    "Suchen Sie den Konfigurations-Bereich (ca. Zeile 130-150) und passen Sie die Werte an:",
    body_style
))

story.append(Paragraph("""// ==========================================
// KONFIGURATION - Hier Ihre Daten eintragen
// ==========================================

// PayPal: Ihre PayPal-E-Mail
const PAYPAL_EMAIL = 'joto.weigel@gmail.com'

// Ko-fi: Ihr Benutzername (ohne @)
const KOFI_USERNAME = 'ihr-kofi-name'

// Patreon: Ihr Benutzername
const PATREON_USERNAME = 'ihr-patreon-name'

// Bankverbindung
const BANK_INFO = {
  name: 'Johannes Weigel',
  bank: 'Musterbank',
  iban: 'DE89 3704 0044 0532 0130 00',
  bic: 'COBADEFFXXX'
}""", code_style))

story.append(Spacer(1, 12))

# Legal Notice
story.append(Paragraph("<b>9. Rechtliche Hinweise</b>", heading_style))
story.append(Paragraph(
    "Da Sie Spenden für ein gemeinnütziges Projekt sammeln, beachten Sie bitte folgende Punkte für Deutschland:",
    body_style
))

story.append(Paragraph("• Spendenquittungen: Für Spenden unter 300€ reicht ein vereinfachter Nachweis (Kontodaten + Betrag + Datum)", bullet_style))
story.append(Paragraph("• Impressum: Ist bereits auf Ihrer Website vorhanden", bullet_style))
story.append(Paragraph("• Datenschutz: Ist bereits durch Ihre Datenschutzerklärung abgedeckt", bullet_style))
story.append(Paragraph("• Gemeinnützigkeit: Prüfen Sie, ob Sie einen offiziellen Status als gemeinnütziger Verein oder Stiftung benötigen", bullet_style))

story.append(Spacer(1, 12))

# Support
story.append(Paragraph("<b>10. Support</b>", heading_style))
story.append(Paragraph(
    "Bei Fragen zur Einrichtung können Sie mich jederzeit fragen. Die Spenden-Komponente ist vollständig funktionsfähig und "
    "PayPal ist bereits aktiviert. Sie können die Website sofort nutzen und Spenden empfangen!",
    body_style
))

story.append(Spacer(1, 20))

# Summary box
summary_style = ParagraphStyle(
    name='Summary',
    fontName='Times New Roman',
    fontSize=11,
    leading=16,
    alignment=TA_CENTER,
    backColor=colors.HexColor('#e8f4fd'),
    borderPadding=10
)
story.append(Paragraph(
    "<b>✓ PayPal ist aktiv und bereit für Spenden!</b><br/>"
    "Der Spendenbutton ist auf Ihrer Website sichtbar und funktionsfähig.",
    summary_style
))

# Build document
doc.build(story)
print("PDF erfolgreich erstellt!")
