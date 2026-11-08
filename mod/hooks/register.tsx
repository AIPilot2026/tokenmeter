import { atom, read, update } from 'claude-code'
import type { Register, SessionContextUsage, SessionRateLimit } from 'claude-code'

import type { MeterLimit, MeterSnapshot } from '../types'

const STORE_KEY = 'lastLimits'

type Saved = { limits: MeterLimit[]; savedAt: number }

function readSaved(raw: unknown): Saved | undefined {
  if (typeof raw !== 'object' || raw === null) return undefined
  const { limits, savedAt } = raw as { limits?: unknown; savedAt?: unknown }
  if (!Array.isArray(limits) || typeof savedAt !== 'number') return undefined
  const clean = limits.filter(
    (l): l is MeterLimit =>
      typeof l === 'object' &&
      l !== null &&
      typeof (l as MeterLimit).kind === 'string' &&
      typeof (l as MeterLimit).percentUsed === 'number',
  )
  return clean.length > 0 ? { limits: clean, savedAt } : undefined
}

/** Ein Fenster, dessen Reset schon vorbei ist, steht wieder bei 0 %. */
function ageLimits(limits: MeterLimit[], now: number): MeterLimit[] {
  return limits.map(l => {
    const at = l.resetsAt ? new Date(l.resetsAt).getTime() : NaN
    return !Number.isNaN(at) && at <= now ? { kind: l.kind, percentUsed: 0 } : l
  })
}

const snapshot = atom(
  { plugin: 'tokenmeter', key: 'snapshot' } as const,
  { limits: [] } as MeterSnapshot,
  { shape: 'snapshot-1' },
)
const isHidden = atom({ plugin: 'tokenmeter', key: 'isHidden' } as const, false)

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
const pad = (n: number) => String(n).padStart(2, '0')

function toSnapshot(
  limits: SessionRateLimit[],
  context: SessionContextUsage,
  now: number,
): MeterSnapshot {
  return json({
    limits: limits.map(l => ({ kind: l.kind, percentUsed: l.percentUsed, resetsAt: l.resetsAt })),
    contextPercent: context.percent,
    contextTokens: context.tokens,
    contextWindow: context.window,
    updatedAt: now,
  })
}

/** Reines JSON (ohne undefined-Felder), wie es $.state und $.store erwarten. */
function json<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function label(kind: string): string {
  if (kind === 'five_hour') return '5 Std.'
  if (kind === 'seven_day') return 'Woche'
  if (kind === 'spend_limit') return 'Ausgaben'
  return kind
}

function formatReset(iso: string | undefined, now: number): string {
  if (!iso) return ''
  const at = new Date(iso)
  if (Number.isNaN(at.getTime())) return ''
  const clock = `${pad(at.getHours())}:${pad(at.getMinutes())}`
  if (new Date(now).toDateString() === at.toDateString()) return `Reset ${clock}`
  return `Reset ${WEEKDAYS[at.getDay()]} ${pad(at.getDate())}.${pad(at.getMonth() + 1)}. ${clock}`
}

function formatStand(ms: number, now: number): string {
  const at = new Date(ms)
  const clock = `${pad(at.getHours())}:${pad(at.getMinutes())}`
  if (new Date(now).toDateString() === at.toDateString()) return clock
  return `${WEEKDAYS[at.getDay()]} ${pad(at.getDate())}.${pad(at.getMonth() + 1)}. ${clock}`
}

function bar(percent: number, width = 10): string {
  const filled = Math.max(0, Math.min(width, Math.round((percent / 100) * width)))
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

function tone(percent: number): 'success' | 'warning' | 'error' {
  if (percent >= 90) return 'error'
  if (percent >= 70) return 'warning'
  return 'success'
}

const ORDER = ['five_hour', 'seven_day']
const rank = (kind: string) => {
  const i = ORDER.indexOf(kind)
  return i === -1 ? 99 : i
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'tokenmeter',
      description: 'Tokenmeter-Leiste über dem Eingabefeld ein- oder ausblenden',
    })
    const usage = await $.session.usage()
    const now = await $.clock.now()
    if (usage.rateLimits.length > 0) {
      await update($, snapshot, () => toSnapshot(usage.rateLimits, usage.context, now))
    } else {
      const saved = readSaved(await $.store.get(STORE_KEY))
      await update($, snapshot, () =>
        saved
          ? { limits: ageLimits(saved.limits, now), updatedAt: saved.savedAt, isStale: true }
          : toSnapshot([], usage.context, now),
      )
    }

    return next(e)
  })

  on('command.run', { command: 'tokenmeter' }, async $ => {
    const hidden = await update($, isHidden, v => !v)

    return { text: hidden ? 'Tokenmeter ausgeblendet.' : 'Tokenmeter eingeblendet.' }
  })

  on('session.measure', async ($, e, next) => {
    const now = await $.clock.now()
    if (e.rateLimits.length > 0) {
      await update($, snapshot, () => toSnapshot(e.rateLimits, e.context, now))
      const saved: Saved = {
        limits: e.rateLimits.map(l => ({ kind: l.kind, percentUsed: l.percentUsed, resetsAt: l.resetsAt })),
        savedAt: now,
      }
      await $.store.set(STORE_KEY, json(saved))
    }

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey || (await read($, isHidden))) return next(e)

    const snap = await read($, snapshot)
    const limits = [...snap.limits].sort((a, b) => rank(a.kind) - rank(b.kind))
    const { Box, Text } = $.ui.resolve(e)
    const now = await $.clock.now()

    if (limits.length === 0) {
      return (
        <Box>
          <Text dimColor size="footnote">
            Tokenmeter: Werte erscheinen nach der nächsten Antwort
          </Text>
        </Box>
      )
    }

    return (
      <Box flexDirection="row" gap={2} flexWrap="wrap">
        {limits.map((l, i) => (
          <Box flexDirection="row" gap={1}>
            {i > 0 && <Text dimColor>·</Text>}
            <Text dimColor size="footnote">
              {label(l.kind)}
            </Text>
            <Text color={tone(l.percentUsed)} mono size="footnote">
              {bar(l.percentUsed)}
            </Text>
            <Text tabular size="footnote">
              {l.percentUsed} %
            </Text>
            <Text dimColor size="footnote">
              {formatReset(l.resetsAt, now)}
            </Text>
          </Box>
        ))}
        {snap.isStale && snap.updatedAt !== undefined && (
          <Text dimColor size="footnote">
            (Stand {formatStand(snap.updatedAt, now)})
          </Text>
        )}
      </Box>
    )
  })
}
