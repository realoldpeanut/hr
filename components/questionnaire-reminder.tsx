"use client"

import { ArrowRight, Clock, AlertCircle, Building2 } from "lucide-react"
import { questionnaireTasks } from "@/lib/mock-data"

function daysUntil(date: string) {
  const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return diff
}

export function QuestionnaireReminder() {
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

  const cta = primary.employee_task_status === "in_progress" ? "继续作答" : "开始答卷"

  return (
    <section aria-label="待完成技能问卷" className="mx-auto w-full max-w-[1400px] px-6 pt-6 lg:px-8">
      <div className="overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 via-teal-50 to-white">
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-teal-300 bg-white px-2 py-0.5 text-[11px] font-medium text-teal-800">
                  组织发布 · {statusLabel}
                </span>
                {isOverdue ? (
                  <span className="inline-flex items-center rounded-full bg-rose-600 px-2 py-0.5 text-[11px] font-medium text-white">
                    已逾期
                  </span>
                ) : null}
                <span className="text-xs text-muted-foreground">
                  预计耗时 {primary.estimated_minutes} 分钟
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 leading-snug">
                {primary.questionnaire_name}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {primary.publisher_org}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  截止 {primary.due_date}
                  <span className={isOverdue ? "text-rose-600" : "text-amber-700"}>
                    （{isOverdue ? `逾期 ${Math.abs(days)} 天` : `剩余 ${days} 天`}）
                  </span>
                </span>
                {primary.employee_task_status === "in_progress" ? (
                  <span>作答进度 {primary.progress}%</span>
                ) : null}
              </div>

              {primary.employee_task_status === "in_progress" ? (
                <div className="mt-1 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-teal-100">
                  <div
                    className="h-full rounded-full bg-teal-600 transition-all"
                    style={{ width: `${primary.progress}%` }}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {others > 0 ? (
              <button className="text-sm font-medium text-teal-700 hover:text-teal-800">
                查看全部 {questionnaireTasks.length} 份
              </button>
            ) : null}
            <button className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700">
              {cta}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
