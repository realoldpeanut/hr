import {
  Sparkles,
  CheckSquare,
  Info,
  AlertTriangle,
  GitMerge,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import { aiTips } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

const todos = [
  {
    id: "td-1",
    title: "完成待处理技能问卷",
    hint: "「2026 Q2 产品与技术岗位」剩余 12 分钟",
    tone: "danger" as const,
  },
  {
    id: "td-2",
    title: "补充项目成果指标",
    hint: "3 个项目缺少结果指标",
    tone: "warning" as const,
  },
  {
    id: "td-3",
    title: "提交 5 项技能给经理确认",
    hint: "已具备提交条件",
    tone: "brand" as const,
  },
]

const rules = [
  {
    title: "技能如何形成",
    text: "技能来自问卷、简历、绩效、项目、学习与证书、经理认定六类来源，系统会聚合并输出统一的等级与证据强度。",
  },
  {
    title: "影响结果的来源",
    text: "项目经历与经理确认权重更高；学习与证书可提升可信度但不单独决定认定。",
  },
  {
    title: "经理认定的作用",
    text: "经理确认后的技能优先于系统建议等级；被退回的技能状态会更新为「需补充证据」。",
  },
  {
    title: "已认定与证据不足",
    text: "「已认定」由经理确认；「证据不足」指仅有单一或弱来源，建议补充项目或证书证据。",
  },
]

function tipIcon(type: (typeof aiTips)[number]["type"]) {
  if (type === "conflict") return AlertTriangle
  if (type === "gap") return GitMerge
  return Sparkles
}

function tipTone(type: (typeof aiTips)[number]["type"]) {
  if (type === "conflict") return "bg-amber-50 text-amber-700 border-amber-200"
  if (type === "gap") return "bg-rose-50 text-rose-700 border-rose-200"
  return "bg-teal-50 text-teal-700 border-teal-200"
}

export function SidePanel() {
  return (
    <aside className="flex flex-col gap-4">
      {/* Todos */}
      <section className="rounded-xl border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-teal-700" />
            <h3 className="text-sm font-semibold text-foreground">待办事项</h3>
          </div>
          <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-700">
            {todos.length} 项
          </span>
        </header>
        <ul className="flex flex-col divide-y divide-border/70">
          {todos.map((t) => {
            const toneMap = {
              danger: "bg-rose-500",
              warning: "bg-amber-500",
              brand: "bg-teal-600",
            }
            return (
              <li
                key={t.id}
                className="group flex cursor-pointer items-start gap-3 px-4 py-3 transition hover:bg-slate-50/70"
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${toneMap[t.tone]}`}
                />
                <div className="flex flex-1 flex-col gap-0.5">
                  <p className="text-sm font-medium text-foreground leading-snug">
                    {t.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.hint}</p>
                </div>
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
              </li>
            )
          })}
        </ul>
      </section>

      {/* AI Tips */}
      <section className="rounded-xl border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-teal-700" />
            <h3 className="text-sm font-semibold text-foreground">AI 提示</h3>
          </div>
          <span className="text-[10px] text-muted-foreground">
            仅用于总结与提示
          </span>
        </header>
        <div className="flex flex-col gap-2 p-3">
          {aiTips.map((tip) => {
            const Icon = tipIcon(tip.type)
            return (
              <div
                key={tip.id}
                className={`flex gap-2 rounded-lg border px-3 py-2.5 ${tipTone(tip.type)}`}
              >
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <p className="text-xs leading-relaxed">{tip.text}</p>
              </div>
            )
          })}
          <Button variant="outline" size="sm" className="w-full">
            让 AI 总结我的技能档案
            <ArrowRight />
          </Button>
        </div>
      </section>

      {/* Rules */}
      <section className="rounded-xl border border-border bg-card">
        <header className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Info className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-foreground">规则说明</h3>
        </header>
        <dl className="flex flex-col divide-y divide-border/70">
          {rules.map((r) => (
            <div key={r.title} className="px-4 py-3">
              <dt className="text-xs font-semibold text-foreground">
                {r.title}
              </dt>
              <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {r.text}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </aside>
  )
}
