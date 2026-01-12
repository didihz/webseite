# Lesegeschwindigkeits-Test App

Eine interaktive Web-Anwendung zur Messung der Lesegeschwindigkeit und des Textverständnisses mit Spracherkennung.

## Features

### 1. Textauswahl
- **Unterstufe (Klasse 5/6)**: Altersgerechte Texte für jüngere Schüler
- **Mittelstufe (Klasse 7/8)**: Texte mit mittlerem Schwierigkeitsgrad
- **Oberstufe**: Anspruchsvolle Texte für fortgeschrittene Leser
- **Eigener Text**: Möglichkeit, einen individuellen Text einzugeben

### 2. Spracherkennung
- Erkennt gesprochene Wörter in Echtzeit
- Vergleicht gesprochene mit erwarteten Wörtern
- Markiert korrekte Wörter (grün) und Fehler (rot)
- Toleriert kleine Abweichungen in der Aussprache
- Zeigt aktuell erkanntes Wort an

### 3. Lesetest (60 Sekunden)
- Timer mit 60 Sekunden
- Live-Visualisierung des Lesefortschritts
- Aktuelles Wort wird hervorgehoben
- Möglichkeit, den Test vorzeitig zu stoppen

### 4. Ergebnisse
- **Gelesene Wörter**: Gesamtanzahl der erkannten Wörter
- **Korrekte Wörter**: Anzahl der richtig gelesenen Wörter
- **Fehler**: Anzahl der falsch gelesenen Wörter
- **Wörter pro Minute**: Berechnung der Lesegeschwindigkeit

### 5. Textverständnis-Quiz
- 4 Multiple-Choice-Fragen pro Text
- Automatische Auswertung
- Anzeige von richtigen und falschen Antworten
- Prozentuale Bewertung

## Technische Details

### Browser-Kompatibilität
Die App verwendet die **Web Speech API** für die Spracherkennung. Diese wird unterstützt von:
- Google Chrome (empfohlen)
- Microsoft Edge
- Safari

**Hinweis**: Firefox unterstützt die Web Speech API derzeit nicht vollständig.

### Verwendete Technologien
- HTML5
- CSS3 (mit Flexbox und Grid)
- JavaScript (ES6+)
- Web Speech API (SpeechRecognition)

## Verwendung

1. **Öffne die App** im Browser (Chrome, Edge oder Safari empfohlen)
2. **Wähle einen Text** oder gib einen eigenen Text ein
3. **Klicke auf "Start"** und beginne, den Text laut vorzulesen
4. Die App erkennt deine Sprache und markiert die Wörter
5. Nach 60 Sekunden oder beim Klick auf "Stopp" werden die **Ergebnisse angezeigt**
6. Beantworte die **Quiz-Fragen** zum Textverständnis
7. Klicke auf "Neuer Test", um erneut zu starten

## Funktionsweise der Spracherkennung

### Wortabgleich
Die App verwendet einen intelligenten Algorithmus zum Vergleich:
1. **Normalisierung**: Entfernung von Satzzeichen und Umlauten
2. **Ähnlichkeitsprüfung**: Toleriert kleine Aussprachefehler (70% Übereinstimmung)
3. **Sequenzieller Abgleich**: Vergleicht Wörter in der richtigen Reihenfolge

### Fehlertoleranz
Die App erkennt ein Wort als korrekt, wenn:
- Es exakt dem erwarteten Wort entspricht
- Mindestens 70% der Buchstaben übereinstimmen
- Die Längenabweichung maximal 3 Zeichen beträgt

## Datenschutz
- Alle Daten werden lokal im Browser verarbeitet
- Keine Speicherung auf einem Server
- Die Spracherkennung erfolgt über die Browser-API
- Bei Chrome und Edge werden Sprachdaten zur Verarbeitung an Google-Server gesendet

## Tipps für beste Ergebnisse
- Verwende ein Headset oder Mikrofon in ruhiger Umgebung
- Sprich deutlich und in normalem Tempo
- Achte auf korrekte Betonung
- Bei Verbindungsproblemen: Teste die Mikrofon-Berechtigung im Browser

## Zukünftige Erweiterungen
- Mehr vordefinierte Texte
- Verschiedene Schwierigkeitsstufen
- Statistiken über mehrere Tests
- Export der Ergebnisse
- Unterstützung für weitere Sprachen

## Lizenz
Dieses Projekt ist frei verfügbar für Bildungszwecke.
