import { Bell, Eye, Send } from "lucide-react"
import { kpi } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

function KpiCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string
  value: string | number
  hint?: string
  accent?: "default" | "success" | "warning" | "danger" | "brand"
}) {
  const accentMap = {
    default: "text-slate-900",
    success: "text-emerald-600",
    warning: "text-amber-600",
    danger: "text-rose-600",
    brand: "text-teal-700",
  }
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-card px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-2xl font-semibold tabular-nums ${accentMap[accent ?? "default"]}`}
        >
          {value}
        </span>
        {hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
    </div>
  )
}

interface PageHeaderProps {
  onPreviewProfile?: () => void
}

export function PageHeader({ onPreviewProfile }: PageHeaderProps = {}) {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
              个人技能认定
            </h1>
            <p className="text-xs text-muted-foreground">
              最近更新于{" "}
              <span className="text-foreground">{kpi.lastUpdated}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="default">
              <Bell />
              查看待办
              <span className="ml-1 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                3
              </span>
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={onPreviewProfile}
            >
              <Eye />
              预览技能档案
            </Button>
            <Button variant="default" size="default">
              <Send />
              提交经理认定
            </Button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <KpiCard
            label="技能完整度"
            value={`${kpi.completeness}%`}
            accent="brand"
          />
          <KpiCard label="已认定技能" value={kpi.confirmed} accent="success" />
          <KpiCard label="待经理确认" value={kpi.pendingManager} accent="warning" />
          <KpiCard
            label="待完成问卷"
            value={kpi.pendingQuestionnaires}
            accent="danger"
          />
          <KpiCard label="证据不足" value={kpi.lowEvidence} accent="danger" />
          <KpiCard label="技能总数" value={kpi.totalSkills} />
        </div>
      </div>
    </header>
  )
}
