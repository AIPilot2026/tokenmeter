export type MeterLimit = { kind: string; percentUsed: number; resetsAt?: string }

export type MeterSnapshot = {
  limits: MeterLimit[]
  contextPercent?: number
  contextTokens?: number
  contextWindow?: number
  updatedAt?: number
  /** true: Werte stammen aus einer früheren Sitzung und warten auf die nächste Antwort */
  isStale?: boolean
}

declare module 'claude-code' {
  interface PluginState {
    tokenmeter: { snapshot: Shaped<MeterSnapshot>; isHidden: boolean }
  }
}
