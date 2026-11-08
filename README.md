# Tokenmeter

Eine dezente Leiste über dem Eingabefeld von Claude Code, die deine Nutzungslimits ständig im Blick hält:

```
5 Std. ███░░░░░░░ 31 %  Reset 18:00   ·   Woche █░░░░░░░░░ 7 %  Reset Mi 11.11. 21:00
```

- **5-Stunden-Limit** und **Wochenlimit** in Prozent, mit farbigem Balken (grün, ab 70 % gelb, ab 90 % rot)
- **Reset-Zeitpunkt** des jeweiligen Fensters
- Die Werte erscheinen mit der ersten Antwort von Claude in einer Sitzung und aktualisieren sich danach bei jeder weiteren Antwort
- Mit `/tokenmeter` blendest du die Leiste aus und wieder ein

> **Inoffizielles Community-Projekt.** Tokenmeter steht in keiner Verbindung zu Anthropic und wird von Anthropic weder unterstützt noch geprüft. „Claude“ ist eine Marke von Anthropic.

## Datenschutz und Sicherheit

- **Keine Netzwerkzugriffe.** Der Tokenmeter sendet nichts ins Internet und ruft keine Server auf.
- **Keine Dateizugriffe, keine Chat-Inhalte.** Er liest nur die Nutzungswerte, die Claude Code ohnehin bereitstellt (Prozentwerte, Reset-Zeit, Kontextgröße).
- **Keine Zugangsdaten.** Kein API-Key, kein Login, keine Passwörter.
- **Lokale Speicherung** nur der letzten Prozentwerte samt Zeitstempel, im Plugin-Speicher von Claude Code auf deinem Rechner.
- **Keine Abhängigkeiten.** Der gesamte Code steckt in [`mod/hooks/register.tsx`](mod/hooks/register.tsx) (rund 190 Zeilen) und lässt sich vor der Installation vollständig lesen.

## Voraussetzungen

- Claude Code (Desktop-App oder Terminal) mit Unterstützung für Plugin-Mods; getestet mit Version 2.1.317
- Ein Claude-Abo mit Nutzungslimits (Pro/Max). Ohne Limits gibt es nichts anzuzeigen.
- In der Desktop-App erscheint die Leiste in Sitzungen **mit Projektordner**.

## Installation

Im Terminal (Claude Code CLI):

```bash
claude plugin marketplace add AIPilot2026/tokenmeter
```

```bash
claude plugin install tokenmeter@tokenmeter --scope user
```

Alternativ kannst du Claude selbst bitten: *„Installiere das Plugin tokenmeter aus dem Marketplace AIPilot2026/tokenmeter.“*

Danach Claude neu starten. Die Leiste erscheint über dem Eingabefeld, sobald eine Sitzung läuft. Die Prozentwerte kommen mit der ersten Antwort von Claude.

### Aktualisieren

```bash
claude plugin marketplace update tokenmeter
```

```bash
claude plugin update tokenmeter@tokenmeter
```

### Deinstallieren

```bash
claude plugin uninstall tokenmeter@tokenmeter
```

## Häufige Fragen

**Warum keine absoluten Token-Zahlen?**
Claude stellt für die Abo-Limits nur den Prozentwert bereit, nicht die Größe des Budgets in Tokens. Die Gewichtung (Modell, Cache usw.) legt Anthropic serverseitig fest. Eine Token-Zahl wäre deshalb nur geschätzt.

**Was ist der Unterschied zur Anzeige „Kontext“?**
„Kontext“ zeigt, wie voll das Gedächtnis des aktuellen Chats ist. Der Tokenmeter zeigt, wie viel deines Abo-Kontingents verbraucht ist.

## Haftungsausschluss / Nutzung auf eigenes Risiko

Die Nutzung von Tokenmeter erfolgt **auf eigenes Risiko**. Die Software wird unentgeltlich und **ohne jede Gewährleistung** bereitgestellt, so wie sie ist („as is“). Es wird keine Gewähr für Richtigkeit, Vollständigkeit oder Verfügbarkeit der angezeigten Werte übernommen; maßgeblich sind allein die Angaben in deinem Claude-Konto. Eine Haftung für Schäden, die aus der Nutzung entstehen, ist ausgeschlossen, soweit das gesetzlich zulässig ist. Die Einzelheiten regelt die [MIT-Lizenz](LICENSE).

## Sicherheitslücke gefunden?

Siehe [SECURITY.md](SECURITY.md).

## Lizenz

[MIT](LICENSE)

---

## English summary

Tokenmeter is an unofficial Claude Code plugin that shows your 5-hour and weekly usage limits (percent, colored bar, reset time) in a small band above the prompt. It makes no network requests, reads no files or chat content and needs no credentials. Install with `claude plugin marketplace add AIPilot2026/tokenmeter`, then `claude plugin install tokenmeter@tokenmeter --scope user`, and restart Claude. Use at your own risk; provided "as is" without warranty under the MIT License. Not affiliated with Anthropic.
