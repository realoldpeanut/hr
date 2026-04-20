import { useMemo } from "react"
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  Download,
  FileDown,
  MapPin,
  Printer,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react"
import {
  employeeProfile,
  kpi,
  skills,
  type SkillLevel,
  type SkillSummary,
} from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const LEVEL_NUM: Record<SkillLevel, number> = { L1: 1, L2: 2, L3: 3, L4: 4, L5: 5 }

interface SkillProfilePreviewPageProps {
  onExit: () => void
}

export function SkillProfilePreviewPage({ onExit }: SkillProfilePreviewPageProps) {
  const grouped = useMemo(() => {
    const map = new Map<string, SkillSummary[]>()
    for (const s of skills) {
      if (!map.has(s.skill_category)) map.set(s.skill_category, [])
      map.get(s.skill_category)!.push(s)
    }
    for (const list of map.values()) {
      list.sort((a, b) => LEVEL_NUM[b.current_level] - LEVEL_NUM[a.current_level])
    }
    return Array.from(map.entries()).sort(
      (a, b) => b[1].length - a[1].length,
    )
  }, [])

  const topSkills = useMemo(
    () =>
      [...skills]
        .filter((s) => s.manager_confirmed_flag)
        .sort(
          (a, b) =>
            LEVEL_NUM[b.current_level] - LEVEL_NUM[a.current_level] ||
            b.confidence_score - a.confidence_score,
        )
        .slice(0, 4),
    [],
  )

  const categoryStats = useMemo(
    () =>
      grouped.map(([cat, list]) => {
        const avg =
          list.reduce((acc, s) => acc + LEVEL_NUM[s.current_level], 0) /
          list.length
        const maxLevel = list.reduce(
          (acc, s) => Math.max(acc, LEVEL_NUM[s.current_level]),
          0,
        )
        const confirmed = list.filter((s) => s.manager_confirmed_flag).length
        return { cat, list, avg, maxLevel, confirmed }
      }),
    [grouped],
  )

  const sourceCount = skills.reduce((acc, s) => acc + s.source_count, 0)
  const confirmedCount = skills.filter((s) => s.manager_confirmed_flag).length
  const confirmedRate = Math.round((confirmedCount / skills.length) * 100)

  return (
    <main className="min-h-screen bg-slate-100">
      {/* Toolbar */}
      <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              返回
            </Button>
            <div className="hidden h-6 w-px bg-border md:block" />
            <h1 className="truncate text-sm font-semibold text-foreground md:text-base">
              技能档案 · 预览
            </h1>
            <Badge
              variant="outline"
              className="hidden md:inline-flex border-teal-300 bg-teal-50 text-teal-800"
            >
              仅你可见
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4" />
              打印
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
              分享链接
            </Button>
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4" />
              导出 PDF
            </Button>
            <Button size="sm">
              <Send className="h-4 w-4" />
              提交经理认定
            </Button>
          </div>
        </div>
      </header>

      {/* A4-like document */}
      <div className="mx-auto max-w-[1040px] px-4 py-8 lg:px-8">
        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Cover */}
          <section className="relative border-b border-border bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-8 py-10 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-2xl font-semibold text-white ring-1 ring-white/20">
                  {employeeProfile.name.slice(0, 1)}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {employeeProfile.name}
                    </h2>
                    <Badge className="bg-teal-500 text-white hover:bg-teal-500">
                      {employeeProfile.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/80">
                    {employeeProfile.job_title} · {employeeProfile.department}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3 w-3" />
                      工号 {employeeProfile.employee_no}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {employeeProfile.job_family}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {employeeProfile.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      司龄 {employeeProfile.tenure_years} 年
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-2 text-right">
                <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                  <div className="text-[11px] uppercase tracking-wider text-white/60">
                    生成于
                  </div>
                  <div className="mt-0.5 text-sm font-medium tabular-nums">
                    {employeeProfile.profile_generated_at}
                  </div>
                </div>
              </div>
            </div>

            {/* Cover metrics */}
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              <MetricChip
                label="技能完整度"
                value={`${kpi.completeness}%`}
                accent="brand"
              />
              <MetricChip
                label="已认定技能"
                value={`${confirmedCount} / ${skills.length}`}
                accent="success"
                hint={`认定率 ${confirmedRate}%`}
              />
              <MetricChip
                label="能力类别"
                value={grouped.length}
                hint="覆盖方向"
              />
              <MetricChip
                label="累计证据"
                value={sourceCount}
                hint="多源交叉验证"
              />
            </div>
          </section>

          {/* Top skills highlight */}
          <section className="border-b border-border px-8 py-7">
            <SectionTitle
              icon={<BadgeCheck className="h-4 w-4 text-teal-700" />}
              title="核心能力"
              hint="直线经理已认定"
            />
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {topSkills.map((s) => (
                <div
                  key={s.skill_id}
                  className="flex flex-col gap-2 rounded-xl border border-teal-200/60 bg-teal-50/50 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-teal-800">
                      {s.skill_category}
                    </span>
                    <span className="rounded bg-white px-1.5 py-0.5 text-xs font-semibold text-teal-800 tabular-nums ring-1 ring-teal-200">
                      {s.current_level}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 leading-snug">
                    {s.skill_name}
                  </div>
                  <LevelDots level={s.current_level} />
                </div>
              ))}
              {topSkills.length === 0 ? (
                <div className="col-span-full rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                  暂未有经理认定的核心能力
                </div>
              ) : null}
            </div>
          </section>

          {/* Category distribution */}
          <section className="border-b border-border px-8 py-7">
            <SectionTitle
              icon={<Sparkles className="h-4 w-4 text-teal-700" />}
              title="能力画像"
              hint="按类别聚合"
            />
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categoryStats.map((c) => (
                <div
                  key={c.cat}
                  className="rounded-xl border border-border bg-slate-50/60 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {c.cat}
                    </h4>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {c.list.length} 项
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xl font-semibold tabular-nums text-foreground">
                      L{Math.round(c.avg)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      平均 · 最高 L{c.maxLevel}
                    </span>
                  </div>
                  <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="bg-teal-600"
                      style={{ width: `${(c.avg / 5) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground">
                    已认定{" "}
                    <span className="font-medium text-emerald-700">
                      {c.confirmed}
                    </span>{" "}
                    / {c.list.length}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All skills by category */}
          <section className="border-b border-border px-8 py-7">
            <SectionTitle
              icon={<ShieldCheck className="h-4 w-4 text-teal-700" />}
              title="技能明细"
              hint={`共 ${skills.length} 项`}
            />
            <div className="mt-4 flex flex-col gap-6">
              {grouped.map(([cat, list]) => (
                <div key={cat} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {cat}
                    </h4>
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-[11px] text-muted-foreground">
                      {list.length} 项
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {list.map((s) => (
                      <SkillRow key={s.skill_id} skill={s} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer meta */}
          <section className="flex flex-col gap-3 px-8 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {employeeProfile.department}
              </span>
              <span className="inline-flex items-center gap-1">
                直线经理 · {employeeProfile.manager}
              </span>
            </div>
            <div>本档案由系统自动生成，最终等级以经理认定为准</div>
          </section>
        </article>

        {/* Download prompt */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-3">
          <div className="text-sm text-muted-foreground">
            导出当前档案用于个人职业发展沟通或晋升述职
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              导出 PNG
            </Button>
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4" />
              导出 PDF
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

function MetricChip({
  label,
  value,
  hint,
  accent,
}: {
  label: string
  value: string | number
  hint?: string
  accent?: "default" | "success" | "brand"
}) {
  const valueTone = {
    default: "text-white",
    success: "text-emerald-300",
    brand: "text-teal-300",
  }[accent ?? "default"]
  return (
    <div className="flex flex-col gap-0.5 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
      <div className="text-[11px] uppercase tracking-wider text-white/60">
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={cn("text-xl font-semibold tabular-nums", valueTone)}>
          {value}
        </span>
        {hint ? (
          <span className="text-[11px] text-white/60">{hint}</span>
        ) : null}
      </div>
    </div>
  )
}

function SectionTitle({
  icon,
  title,
  hint,
}: {
  icon?: React.ReactNode
  title: string
  hint?: string
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {hint ? (
        <span className="text-xs text-muted-foreground">· {hint}</span>
      ) : null}
    </div>
  )
}

function LevelDots({ level }: { level: SkillLevel }) {
  const n = LEVEL_NUM[level]
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-full",
            i <= n ? "bg-teal-600" : "bg-slate-200",
          )}
        />
      ))}
    </div>
  )
}

function SkillRow({ skill }: { skill: SkillSummary }) {
  const level = LEVEL_NUM[skill.current_level]
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2.5 hover:border-slate-300">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-medium text-foreground">
            {skill.skill_name}
          </span>
          {skill.manager_confirmed_flag ? (
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-2.5 w-1 rounded-sm",
                  i <= level ? "bg-teal-600" : "bg-slate-200",
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {skill.source_count} 条证据
          </span>
        </div>
      </div>
      <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold tabular-nums text-foreground">
        {skill.current_level}
      </span>
    </div>
  )
}
