import { ArrowRight, Clock, AlertCircle } from "lucide-react"
import { questionnaireTasks } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

function daysUntil(date: string) {
  const diff = Math.ceil(
    (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  )
  return diff
}

interface QuestionnaireReminderProps {
  onStart?: () => void
}

export function QuestionnaireReminder({ onStart }: QuestionnaireReminderProps = {}) {
  if (!questionnaireTasks.length) return null
  const primary = [...questionnaireTasks].sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
  )[0]
  const others = questionnaireTasks.length - 1
  const days = daysUntil(primary.due_date)
  const isOverdue = days < 0

  const statusLabel =
    primary.employee_task_status === "in_progress"
      ? "作答中"
      : primary.employee_task_status === "not_started"
        ? "未开始"
        : primary.employee_task_status === "overdue"
          ? "已逾期"
          : "已提交"

  const cta =
    primary.employee_task_status === "in_progress" ? "继续作答" : "开始答卷"

  return (
    <section
      aria-label="待完成技能问卷"
      className="mx-auto w-full max-w-[1400px] px-6 pt-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 via-teal-50 to-white">
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-teal-300 bg-white text-teal-800"
                >
                  {statusLabel}
                </Badge>
                {isOverdue ? (
                  <Badge className="bg-rose-600 text-white">已逾期</Badge>
                ) : null}
              </div>
              <h3 className="text-base font-semibold text-slate-900 leading-snug">
                {primary.questionnaire_name}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span className={isOverdue ? "text-rose-600" : undefined}>
                    {isOverdue ? `逾期 ${Math.abs(days)} 天` : `剩余 ${days} 天`}
                  </span>
                </span>
              </div>

              {primary.employee_task_status === "in_progress" ? (
                <Progress
                  value={primary.progress}
                  className="mt-1 h-1.5 w-full max-w-md bg-teal-100"
                  indicatorClassName="bg-teal-600"
                />
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {others > 0 ? (
              <Button variant="link" className="text-teal-700 hover:text-teal-800">
                查看全部 {questionnaireTasks.length} 份
              </Button>
            ) : null}
            <Button variant="accent" onClick={onStart}>
              {cta}
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
