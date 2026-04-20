import { useMemo, useState } from "react"
import { Search, SlidersHorizontal, AlertTriangle } from "lucide-react"
import { skills, type SkillSummary, type SkillStatus } from "@/lib/mock-data"
import { StatusBadge } from "./status-badge"
import { SkillDetailDrawer } from "./skill-detail-drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const STATUS_FILTERS: { value: "all" | SkillStatus; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "confirmed", label: "已认定" },
  { value: "pending_manager", label: "待经理确认" },
  { value: "supported", label: "证据支撑" },
  { value: "needs_evidence", label: "证据不足" },
  { value: "stale", label: "待更新" },
]

function LevelBar({ level }: { level: SkillSummary["current_level"] }) {
  const map = { L1: 1, L2: 2, L3: 3, L4: 4, L5: 5 }
  const n = map[level]
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-semibold text-foreground tabular-nums">
        {level}
      </span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-3 w-1 rounded-sm ${i <= n ? "bg-teal-600" : "bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  )
}

function ConfidenceBar({ score }: { score: number }) {
  const tone =
    score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-rose-500"
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${tone}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground tabular-nums">{score}</span>
    </div>
  )
}

export function SkillsOverview() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | SkillStatus>("all")
  const [selected, setSelected] = useState<SkillSummary | null>(null)

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      if (statusFilter !== "all" && s.status !== statusFilter) return false
      if (
        query &&
        !s.skill_name.includes(query) &&
        !s.skill_category.includes(query)
      )
        return false
      return true
    })
  }, [query, statusFilter])

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: skills.length }
    for (const s of skills) counts[s.status] = (counts[s.status] ?? 0) + 1
    return counts
  }, [])

  return (
    <section
      aria-label="技能总览"
      className="rounded-xl border border-border bg-card"
    >
      <header className="flex flex-col gap-4 border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            技能总览
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索技能名称或类别"
                className="h-9 w-60 pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <SlidersHorizontal />
              更多筛选
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {STATUS_FILTERS.map((f) => {
            const active = statusFilter === f.value
            const count = statusCounts[f.value] ?? 0
            return (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-border bg-card text-slate-700 hover:bg-muted"
                }`}
              >
                {f.label}
                <span
                  className={`rounded-full px-1.5 text-[10px] tabular-nums ${
                    active
                      ? "bg-white/15 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </header>

      <div className="overflow-x-auto subtle-scroll">
        <table className="w-full min-w-[780px] text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50/60 text-left text-xs font-medium text-muted-foreground">
              <th className="px-5 py-2.5 font-medium">技能</th>
              <th className="px-3 py-2.5 font-medium">等级</th>
              <th className="px-3 py-2.5 font-medium">状态</th>
              <th className="px-3 py-2.5 font-medium">证据强度</th>
              <th className="px-3 py-2.5 font-medium">来源</th>
              <th className="px-3 py-2.5 font-medium">最近更新</th>
              <th className="px-5 py-2.5 text-right font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.skill_id}
                className="group border-b border-border/70 last:border-0 transition hover:bg-slate-50/80"
              >
                <td className="px-5 py-3.5">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {s.skill_name}
                      </span>
                      {s.conflict ? (
                        <span
                          title="存在冲突"
                          className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800"
                        >
                          <AlertTriangle className="h-3 w-3" />
                          冲突
                        </span>
                      ) : null}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {s.skill_category}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3.5">
                  <LevelBar level={s.current_level} />
                </td>
                <td className="px-3 py-3.5">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-3 py-3.5">
                  <ConfidenceBar score={s.confidence_score} />
                </td>
                <td className="px-3 py-3.5 text-xs text-muted-foreground tabular-nums">
                  {s.source_count} 条
                </td>
                <td className="px-3 py-3.5 text-xs text-muted-foreground tabular-nums">
                  {s.last_updated_at}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-teal-700 hover:text-teal-800 h-auto px-0"
                    onClick={() => setSelected(s)}
                  >
                    查看证据
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-sm text-muted-foreground"
                >
                  没有符合条件的技能
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <footer className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
        共 <span className="text-foreground font-medium">{filtered.length}</span>{" "}
        项技能
      </footer>

      <SkillDetailDrawer
        skill={selected}
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      />
    </section>
  )
}
