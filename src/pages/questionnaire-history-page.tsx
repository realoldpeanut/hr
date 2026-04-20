import { useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  FileDown,
  PlayCircle,
  Search,
  Sparkles,
} from "lucide-react"
import {
  questionnaireTasks,
  type QuestionnaireTask,
} from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type StatusFilter =
  | "all"
  | "in_progress"
  | "not_started"
  | "submitted"
  | "overdue"
  | "closed"

interface QuestionnaireHistoryPageProps {
  onExit: () => void
  onContinue: () => void
}

const statusMeta: Record<
  QuestionnaireTask["employee_task_status"],
  { label: string; className: string; dot: string }
> = {
  in_progress: {
    label: "进行中",
    className: "border-teal-300 bg-teal-50 text-teal-800",
    dot: "bg-teal-500",
  },
  not_started: {
    label: "未开始",
    className: "border-slate-300 bg-slate-50 text-slate-700",
    dot: "bg-slate-400",
  },
  submitted: {
    label: "已提交",
    className: "border-emerald-300 bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
  },
  overdue: {
    label: "已逾期",
    className: "border-rose-300 bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
  },
  closed: {
    label: "已关闭",
    className: "border-slate-200 bg-slate-50 text-slate-500",
    dot: "bg-slate-300",
  },
}

const filterTabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "in_progress", label: "进行中" },
  { value: "not_started", label: "未开始" },
  { value: "submitted", label: "已提交" },
  { value: "overdue", label: "已逾期" },
  { value: "closed", label: "已关闭" },
]

export function QuestionnaireHistoryPage({
  onExit,
  onContinue,
}: QuestionnaireHistoryPageProps) {
  const [filter, setFilter] = useState<StatusFilter>("all")
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(
    questionnaireTasks[0]?.questionnaire_id ?? null,
  )

  const sorted = useMemo(
    () =>
      [...questionnaireTasks].sort((a, b) =>
        b.due_date.localeCompare(a.due_date),
      ),
    [],
  )

  const counts = useMemo(() => {
    const base: Record<StatusFilter, number> = {
      all: sorted.length,
      in_progress: 0,
      not_started: 0,
      submitted: 0,
      overdue: 0,
      closed: 0,
    }
    for (const t of sorted) base[t.employee_task_status]++
    return base
  }, [sorted])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sorted.filter((t) => {
      if (filter !== "all" && t.employee_task_status !== filter) return false
      if (!q) return true
      return (
        t.questionnaire_name.toLowerCase().includes(q) ||
        t.publisher_org.toLowerCase().includes(q) ||
        t.applicable_population.toLowerCase().includes(q)
      )
    })
  }, [sorted, filter, query])

  const selected =
    filtered.find((t) => t.questionnaire_id === selectedId) ??
    filtered[0] ??
    null

  const totalRecognized = sorted.reduce(
    (sum, t) => sum + (t.generated_skill_count ?? 0),
    0,
  )

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-6 py-3 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            返回
          </Button>
          <div className="hidden h-6 w-px bg-border md:block" />
          <h1 className="text-sm font-semibold text-foreground md:text-base">
            技能问卷 · 历史记录
          </h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1400px] px-6 py-6 lg:px-8">
        <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="问卷总数" value={counts.all} />
          <StatCard
            label="待作答"
            value={counts.in_progress + counts.not_started}
            tone="warning"
          />
          <StatCard
            label="历史已提交"
            value={counts.submitted + counts.closed}
            tone="success"
          />
          <StatCard label="识别技能数" value={totalRecognized} tone="brand" />
        </section>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as StatusFilter)}>
            <TabsList>
              {filterTabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>
                  {t.label}
                  <span className="ml-1 text-xs text-muted-foreground tabular-nums">
                    {counts[t.value]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索问卷名称 / 发布方"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {filtered.length === 0 ? (
              <div className="px-5 py-14 text-center text-sm text-muted-foreground">
                没有符合条件的问卷
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {filtered.map((t) => {
                  const active = selected?.questionnaire_id === t.questionnaire_id
                  const meta = statusMeta[t.employee_task_status]
                  const isActionable =
                    t.employee_task_status === "in_progress" ||
                    t.employee_task_status === "not_started"
                  return (
                    <li key={t.questionnaire_id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(t.questionnaire_id)}
                        className={cn(
                          "flex w-full items-center gap-4 px-5 py-4 text-left transition",
                          active
                            ? "bg-teal-50/60"
                            : "hover:bg-slate-50",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-1 h-2 w-2 shrink-0 rounded-full",
                            meta.dot,
                          )}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-sm font-medium text-foreground">
                              {t.questionnaire_name}
                            </h3>
                            <Badge
                              variant="outline"
                              className={cn("shrink-0", meta.className)}
                            >
                              {meta.label}
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span>{t.publisher_org}</span>
                            <span className="h-3 w-px bg-border" />
                            <span>{t.applicable_population}</span>
                            <span className="h-3 w-px bg-border" />
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              截止 {t.due_date}
                            </span>
                          </div>
                          {t.employee_task_status === "in_progress" ? (
                            <div className="mt-2 flex items-center gap-2">
                              <Progress
                                value={t.progress}
                                className="h-1.5 w-40 bg-teal-100"
                                indicatorClassName="bg-teal-600"
                              />
                              <span className="text-xs text-muted-foreground tabular-nums">
                                {t.progress}%
                              </span>
                            </div>
                          ) : null}
                        </div>
                        <div className="hidden shrink-0 text-right text-xs text-muted-foreground md:block">
                          {t.submitted_at ? (
                            <>
                              <div>提交于</div>
                              <div className="text-foreground tabular-nums">
                                {t.submitted_at}
                              </div>
                            </>
                          ) : t.employee_task_status === "overdue" ? (
                            <span className="text-rose-600">未提交</span>
                          ) : (
                            <span>—</span>
                          )}
                        </div>
                        {isActionable ? (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              onContinue()
                            }}
                          >
                            {t.employee_task_status === "in_progress"
                              ? "继续作答"
                              : "开始作答"}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedId(t.questionnaire_id)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            查看
                          </Button>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            {selected ? (
              <DetailPanel task={selected} onContinue={onContinue} />
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  )
}

function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: number
  tone?: "default" | "brand" | "success" | "warning"
}) {
  const toneMap = {
    default: "text-foreground",
    brand: "text-teal-700",
    success: "text-emerald-600",
    warning: "text-amber-600",
  }
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-1 text-2xl font-semibold tabular-nums",
          toneMap[tone],
        )}
      >
        {value}
      </div>
    </div>
  )
}

function DetailPanel({
  task,
  onContinue,
}: {
  task: QuestionnaireTask
  onContinue: () => void
}) {
  const meta = statusMeta[task.employee_task_status]
  const isActionable =
    task.employee_task_status === "in_progress" ||
    task.employee_task_status === "not_started"
  const isSubmitted =
    task.employee_task_status === "submitted" ||
    task.employee_task_status === "closed"

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <Badge variant="outline" className={meta.className}>
          {meta.label}
        </Badge>
        <h2 className="mt-2 text-base font-semibold text-foreground leading-snug">
          {task.questionnaire_name}
        </h2>
      </div>

      <dl className="divide-y divide-border text-sm">
        <InfoRow label="发布方" value={task.publisher_org} />
        <InfoRow label="适用对象" value={task.applicable_population} />
        <InfoRow label="截止时间" value={task.due_date} />
        <InfoRow
          label="预计耗时"
          value={`${task.estimated_minutes} 分钟`}
        />
        {task.submitted_at ? (
          <InfoRow label="提交时间" value={task.submitted_at} />
        ) : null}
      </dl>

      {task.employee_task_status === "in_progress" ? (
        <div className="border-t border-border px-5 py-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>作答进度</span>
            <span className="tabular-nums">{task.progress}%</span>
          </div>
          <Progress
            value={task.progress}
            className="mt-2 h-1.5 bg-teal-100"
            indicatorClassName="bg-teal-600"
          />
        </div>
      ) : null}

      {isSubmitted && task.generated_skill_count ? (
        <div className="border-t border-border px-5 py-4">
          <div className="flex items-center gap-2 rounded-lg bg-teal-50/70 px-3 py-2.5 text-sm text-teal-900">
            <Sparkles className="h-4 w-4 text-teal-700" />
            本次作答共识别
            <span className="font-semibold tabular-nums">
              {task.generated_skill_count}
            </span>
            项技能证据
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border px-5 py-4">
        {isActionable ? (
          <Button size="sm" onClick={onContinue}>
            <PlayCircle className="h-4 w-4" />
            {task.employee_task_status === "in_progress"
              ? "继续作答"
              : "开始作答"}
          </Button>
        ) : null}
        {isSubmitted ? (
          <>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4" />
              查看答卷
            </Button>
            <Button size="sm" variant="outline">
              <FileDown className="h-4 w-4" />
              导出 PDF
            </Button>
          </>
        ) : null}
        {task.employee_task_status === "overdue" ? (
          <span className="inline-flex items-center gap-1 text-xs text-rose-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            已关闭，不再可作答
          </span>
        ) : null}
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-2.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground tabular-nums">{value}</dd>
    </div>
  )
}
