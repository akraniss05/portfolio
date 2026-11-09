# NovaLab Portfolio Builder

**Create. Customize. Publish.** – Ein visueller Portfolio-Editor im NovaLab-Academy-Design.

**Live nach Aktivierung von GitHub Pages:** https://akraniss05.github.io/portfolio/

**NovaLab Grafik Studio (eigenständiges Projekt):** https://github.com/akraniss05/Grafik-Web-NovaLab

Made with 💙 by NyxAtheris · NovaLab Studios.

## Funktionsumfang des kostenlosen MVP

- 6 fertige Vorlagen: Developer, Creative, Gamer, Minimal, Music, Futuristic
- 10 editierbare Bausteine: Hero, Über mich, Projekte, Skills, Erfahrung, Galerie, Socials, Kontakt, Zitat, Trenner
- Visueller Editor mit Blockauswahl, Drag-and-drop und Pfeiltasten zum Sortieren, Duplizieren und Löschen
- Texte, Projekte, Bilder und Links frei anpassen
- Eigene Profilbilder, Projektbilder, Galerien und Hintergrundbilder
- Farbverläufe, Farbe, Schriften, Eckenradius und visuelle Effekte einstellen
- Responsive Desktop-, Tablet- und Mobile-Vorschau
- Undo/Redo, lokale Projekte in IndexedDB, JSON-Backup und Import
- ZIP-Export einer eigenständigen, statischen Website mit eingebetteten Bildern
- Discord-Links, Hilfebereich und GitHub-Issue-Support
- Keine Registrierung, kein bezahlter Server, keine externen Frontend-Abhängigkeiten

**Nicht enthalten:** Cloud-Accounts, OAuth-Login, öffentlich gehostete Nutzerprofile, Community-Galerie, Moderation oder Discord-Bot-Befehle. Diese Funktionen brauchen ein sicheres Backend und werden als eigenständige Erweiterungen umgesetzt.

## Hosting mit GitHub Pages

1. Im Repository **portfolio** zu **Settings → Pages** gehen.
2. Unter **Build and deployment** als Source **GitHub Actions** auswählen.
3. In **Actions** den Workflow **Deploy NovaLab Portfolio** öffnen und mit **Run workflow** ausführen.
4. Nach dem erfolgreichen Lauf öffnet sich die Website über **https://akraniss05.github.io/portfolio/**.

Die erstmalige Pages-Aktivierung erfordert Repository-Einstellungen durch den Eigentümer; ein GitHub-Actions-Token darf das ggf. nicht selbst durchführen.

## Projektdateien

- \`index.html\`: Hauptoberfläche mit Dashboard, Vorlagen, Editor, Einstellungen und Support
- \`styles.css\`: NovaLab-Designsystem
- \`app.js\`: Editor, Vorlagen, Speicherung und Exporte
- \`tests/portfolio-smoke.cjs\`: statische Prüfung
- \`tests/portfolio-runtime.cjs\`: DOM-Laufzeittest
- \`.github/workflows/test.yml\`: automatische Tests
- \`.github/workflows/deploy.yml\`: Pages-Build und Veröffentlichung

### Lokal testen

\`\`\`bash
python3 -m http.server 8080
# Browser: http://localhost:8080/
\`\`\`

\`\`\`bash
node --check app.js
node tests/portfolio-smoke.cjs
npm install --no-save --ignore-scripts --no-package-lock jsdom@26.1.0
node tests/portfolio-runtime.cjs
\`\`\`

## Datenschutz und Backups

Entwürfe werden im Browser gespeichert. Löschen von Browserdaten oder Gerätetausch kann sie entfernen. Nutze den JSON-Export als Backup. Hochgeladene Bilder werden clientseitig verkleinert und in das exportierte HTML eingebettet. Die Exportdatei enthält vom Nutzer eingetragene Texte, Bilder und Links; überprüfe diese vor dem öffentlichen Veröffentlichen.

## Entwicklung (für zwei Personen)

GitHub-Issues und Feature-Branches helfen euch beim Aufteilen der Arbeit. Als nächste technische Schritte empfehlen sich Accessibility-/Touch-Tests, bessere Undo-Gruppierung, Bildgrößen-Limits und anschließend ein getrenntes Supabase-Projekt mit sicherer Authentifizierung, Row Level Security, Uploadregeln und öffentlicher Vorschau.
