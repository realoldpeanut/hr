import { CheckSquare, ChevronRight } from "lucide-react"

const todos = [
  {
    id: "td-1",
    title: "完成待处理技能问卷",
    tone: "danger" as const,
  },
  {
    id: "td-2",
    title: "补充项目成果指标",
    tone: "warning" as const,
  },
  {
    id: "td-3",
    title: "提交 5 项技能给经理确认",
    tone: "brand" as const,
  },
]

export function SidePanel() {
  return (
    <aside className="flex flex-col gap-4">
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
                className="group flex cursor-pointer items-center gap-3 px-4 py-3 transition hover:bg-slate-50/70"
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${toneMap[t.tone]}`}
                />
                <p className="flex-1 text-sm font-medium text-foreground leading-snug">
                  {t.title}
                </p>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
              </li>
            )
          })}
        </ul>
      </section>
    </aside>
  )
}
