import { timelineEvents } from "@/lib/mock-data"
import { sourceMeta } from "./status-badge"

export function EvidenceTimeline() {
  return (
    <section
      aria-label="技能证据时间线"
      className="rounded-xl border border-border bg-card"
    >
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">最近更新</h2>
          <p className="text-xs text-muted-foreground mt-0.5">技能档案的形成与更新记录</p>
        </div>
        <button className="text-xs font-medium text-teal-700 hover:text-teal-800">
          查看全部
        </button>
      </header>

      <ol className="flex flex-col">
        {timelineEvents.map((ev, i) => {
          const m = sourceMeta[ev.type]
          const Icon = m.icon
          return (
            <li
              key={ev.id}
              className={`relative flex gap-4 px-5 py-4 ${
                i !== timelineEvents.length - 1 ? "border-b border-border/60" : ""
              }`}
            >
              {/* vertical line */}
              {i !== timelineEvents.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[2.375rem] top-10 h-[calc(100%-1.5rem)] w-px bg-border"
                />
              ) : null}

              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-card ${m.tone}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-foreground leading-snug">{ev.title}</p>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                    {ev.time}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{ev.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
