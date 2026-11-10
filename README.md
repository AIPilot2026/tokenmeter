# Tokenmeter

**English** · [Deutsch](#deutsch)

A small, unobtrusive band above the Claude Code prompt that keeps your usage limits in view:

```
5 Std. ███░░░░░░░ 31 %  Reset 18:00   ·   Woche █░░░░░░░░░ 7 %  Reset Mi 11.11. 21:00
```

- **5-hour limit** and **weekly limit** in percent, with a colored bar (green, yellow from 70 %, red from 90 %)
- **Reset time** of each window
- Values appear with Claude's first reply in a session and update with every reply after that
- Type `/tokenmeter` to hide or show the band

The labels in the band are currently in German ("5 Std." = 5 hours, "Woche" = week).

> **Unofficial community project.** Tokenmeter is not affiliated with, endorsed or reviewed by Anthropic. "Claude" is a trademark of Anthropic.

## Privacy and security

- **No network access.** Tokenmeter sends nothing to the internet and calls no servers.
- **No file access, no chat content.** It only reads the usage values Claude Code already provides (percentages, reset time, context size).
- **No credentials.** No API key, no login, no passwords.
- **Local storage** of the last percentages and a timestamp only, in Claude Code's plugin storage on your machine.
- **No dependencies.** All the code is in [`mod/hooks/register.tsx`](mod/hooks/register.tsx) (about 190 lines) and can be read in full before installing.

## Requirements

- **Claude Code**, i.e. the **Code tab** of the Claude desktop app or the terminal. It does **not** work in the regular chat (including chat "Projects") or on claude.ai in the browser.
- A recent version with plugin mod support; tested with version 2.1.317
- **Git** installed on your computer (needed to download the plugin from GitHub)
- A Claude subscription with usage limits (Pro/Max). Without limits there is nothing to show.
- In the desktop app the band appears in sessions **with a project folder** (any folder).

## Installation

**In the desktop app:** click **+** next to the prompt box → **Plugins** → **Add marketplace**, enter `AIPilot2026/tokenmeter`, then **Add plugin** and choose `tokenmeter`.

**In a terminal** (Claude Code CLI):

```bash
claude plugin marketplace add AIPilot2026/tokenmeter
```

```bash
claude plugin install tokenmeter@tokenmeter --scope user
```

Or simply ask Claude: *"Install the plugin tokenmeter from the marketplace AIPilot2026/tokenmeter."*

Choose the **user** scope so the band works in all your sessions. Then **fully restart** Claude (quit the app, not just close the window). The band appears above the prompt once a session is running; the percentages arrive with Claude's first reply.

### Update

```bash
claude plugin marketplace update tokenmeter
```

```bash
claude plugin update tokenmeter@tokenmeter
```

### Uninstall

```bash
claude plugin uninstall tokenmeter@tokenmeter
```

## Troubleshooting: the band does not appear

1. **Code tab?** Tokenmeter only works in Claude Code (Code tab or terminal), not in the regular chat or its "Projects".
2. **Project folder?** In the desktop app, the session needs a project folder.
3. **Is the plugin loaded?** Type `/` in a Code session. If `/tokenmeter` is listed, the plugin is loaded: run `/tokenmeter` once, the band may have been hidden.
4. **Not listed?** Run `claude plugin list` in a terminal. `tokenmeter@tokenmeter` should be listed as *enabled* with scope *user*. If it is missing, install again and watch for error messages (often: Git is not installed).
5. **Up to date?** Update the Claude desktop app / Claude Code. Older versions ignore mods silently.
6. **Restarted?** Fully quit Claude and start it again after installing.

Still not working? Open an [issue](https://github.com/AIPilot2026/tokenmeter/issues) with your Claude Code version and the output of `claude plugin list`.

## FAQ

**Why no absolute token numbers?**
For subscription limits Claude only provides the percentage, not the size of the budget in tokens. The weighting (model, cache etc.) is set by Anthropic on the server. A token number would therefore only be an estimate.

**How is this different from the "Context" display?**
"Context" shows how full the memory of the current chat is. Tokenmeter shows how much of your subscription allowance is used.

## Disclaimer / use at your own risk

Tokenmeter is used **at your own risk**. The software is provided free of charge and **without any warranty**, "as is". No guarantee is given for the accuracy, completeness or availability of the displayed values; the figures in your Claude account are authoritative. Liability for damages resulting from its use is excluded to the extent permitted by law. Details are governed by the [MIT License](LICENSE).

## Found a security issue?

See [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)

---

<a id="deutsch"></a>

## Deutsch

Eine dezente Leiste über dem Eingabefeld von Claude Code, die deine Nutzungslimits ständig im Blick hält.

- **5-Stunden-Limit** und **Wochenlimit** in Prozent, mit farbigem Balken (grün, ab 70 % gelb, ab 90 % rot)
- **Reset-Zeitpunkt** des jeweiligen Fensters
- Die Werte erscheinen mit der ersten Antwort von Claude in einer Sitzung und aktualisieren sich danach bei jeder weiteren Antwort
- Mit `/tokenmeter` blendest du die Leiste aus und wieder ein

> **Inoffizielles Community-Projekt.** Tokenmeter steht in keiner Verbindung zu Anthropic und wird von Anthropic weder unterstützt noch geprüft. „Claude“ ist eine Marke von Anthropic.

### Datenschutz und Sicherheit

- **Keine Netzwerkzugriffe.** Der Tokenmeter sendet nichts ins Internet und ruft keine Server auf.
- **Keine Dateizugriffe, keine Chat-Inhalte.** Er liest nur die Nutzungswerte, die Claude Code ohnehin bereitstellt (Prozentwerte, Reset-Zeit, Kontextgröße).
- **Keine Zugangsdaten.** Kein API-Key, kein Login, keine Passwörter.
- **Lokale Speicherung** nur der letzten Prozentwerte samt Zeitstempel, im Plugin-Speicher von Claude Code auf deinem Rechner.
- **Keine Abhängigkeiten.** Der gesamte Code steckt in [`mod/hooks/register.tsx`](mod/hooks/register.tsx) (rund 190 Zeilen).

### Voraussetzungen

- **Claude Code**, also der **Code-Tab** der Claude-Desktop-App oder das Terminal. Im normalen Chat (auch in dessen „Projekten“) und auf claude.ai im Browser funktioniert es **nicht**.
- Eine aktuelle Version mit Unterstützung für Plugin-Mods; getestet mit Version 2.1.317
- **Git** auf deinem Rechner (wird zum Herunterladen von GitHub gebraucht)
- Ein Claude-Abo mit Nutzungslimits (Pro/Max)
- In der Desktop-App erscheint die Leiste in Sitzungen **mit Projektordner** (egal welcher).

### Installation

**In der Desktop-App:** auf **+** neben dem Eingabefeld klicken → **Plugins** → **Add marketplace**, `AIPilot2026/tokenmeter` eingeben, dann **Add plugin** und `tokenmeter` wählen.

**Im Terminal:**

```bash
claude plugin marketplace add AIPilot2026/tokenmeter
```

```bash
claude plugin install tokenmeter@tokenmeter --scope user
```

Alternativ kannst du Claude selbst bitten: *„Installiere das Plugin tokenmeter aus dem Marketplace AIPilot2026/tokenmeter.“*

Als Bereich **user** wählen, damit die Leiste in allen Sitzungen erscheint. Danach Claude **komplett neu starten** (App beenden, nicht nur das Fenster schließen).

Aktualisieren: `claude plugin marketplace update tokenmeter`, dann `claude plugin update tokenmeter@tokenmeter`
Deinstallieren: `claude plugin uninstall tokenmeter@tokenmeter`

### Fehlersuche: Die Leiste erscheint nicht

1. **Code-Tab?** Der Tokenmeter funktioniert nur in Claude Code (Code-Tab oder Terminal), nicht im normalen Chat oder dessen „Projekten“.
2. **Projektordner?** In der Desktop-App braucht die Sitzung einen Projektordner.
3. **Ist das Plugin geladen?** In einer Code-Sitzung `/` tippen. Steht `/tokenmeter` in der Liste, ist es geladen: einmal `/tokenmeter` ausführen, vielleicht wurde die Leiste ausgeblendet.
4. **Nicht in der Liste?** Im Terminal `claude plugin list` ausführen. Dort sollte `tokenmeter@tokenmeter` als *enabled* mit Bereich *user* stehen. Fehlt es, erneut installieren und auf Fehlermeldungen achten (häufig: Git ist nicht installiert).
5. **Aktuell?** Claude-Desktop-App bzw. Claude Code aktualisieren. Ältere Versionen ignorieren Mods ohne Meldung.
6. **Neu gestartet?** Nach der Installation Claude komplett beenden und neu starten.

Klappt es trotzdem nicht? Eröffne ein [Issue](https://github.com/AIPilot2026/tokenmeter/issues) mit deiner Claude-Code-Version und der Ausgabe von `claude plugin list`.

### Häufige Fragen

**Warum keine absoluten Token-Zahlen?**
Claude stellt für die Abo-Limits nur den Prozentwert bereit, nicht die Größe des Budgets in Tokens. Eine Token-Zahl wäre deshalb nur geschätzt.

**Was ist der Unterschied zur Anzeige „Kontext“?**
„Kontext“ zeigt, wie voll das Gedächtnis des aktuellen Chats ist. Der Tokenmeter zeigt, wie viel deines Abo-Kontingents verbraucht ist.

### Haftungsausschluss / Nutzung auf eigenes Risiko

Die Nutzung von Tokenmeter erfolgt **auf eigenes Risiko**. Die Software wird unentgeltlich und **ohne jede Gewährleistung** bereitgestellt, so wie sie ist („as is“). Es wird keine Gewähr für Richtigkeit, Vollständigkeit oder Verfügbarkeit der angezeigten Werte übernommen; maßgeblich sind allein die Angaben in deinem Claude-Konto. Eine Haftung für Schäden, die aus der Nutzung entstehen, ist ausgeschlossen, soweit das gesetzlich zulässig ist. Die Einzelheiten regelt die [MIT-Lizenz](LICENSE).

Sicherheitslücke gefunden? Siehe [SECURITY.md](SECURITY.md).
