import { useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDot,
  Clock,
  Save,
} from "lucide-react"
import {
  questionnaireContent,
  type Question,
  type QuestionnaireSection,
} from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type AnswerValue = string | string[] | number | undefined
type Answers = Record<string, AnswerValue>

function daysUntil(date: string) {
  return Math.ceil(
    (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  )
}

function isAnswered(q: Question, v: AnswerValue) {
  if (q.type === "multi_choice") return Array.isArray(v) && v.length > 0
  if (q.type === "text") return typeof v === "string" && v.trim().length > 0
  return v !== undefined && v !== "" && v !== null
}

interface QuestionnairePageProps {
  onExit: () => void
}

export function QuestionnairePage({ onExit }: QuestionnairePageProps) {
  const { sections, questionnaire_name, due_date } = questionnaireContent

  const [sectionIndex, setSectionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    "q-1": "L3",
    "q-2": ["business", "platform"],
    "q-3": "在支付网关重构项目中，梳理 8 个上下游系统接口，产出 3 份需求文档并推动 API 标准统一。",
    "q-4": "L3",
  })

  const currentSection = sections[sectionIndex]
  const totalQuestions = sections.reduce((n, s) => n + s.questions.length, 0)
  const answeredCount = useMemo(
    () =>
      sections.reduce(
        (n, s) =>
          n + s.questions.filter((q) => isAnswered(q, answers[q.id])).length,
        0,
      ),
    [answers, sections],
  )
  const overallProgress = Math.round((answeredCount / totalQuestions) * 100)

  const isLastSection = sectionIndex === sections.length - 1
  const days = daysUntil(due_date)

  const setAnswer = (qid: string, val: AnswerValue) =>
    setAnswers((prev) => ({ ...prev, [qid]: val }))

  const sectionAnswered = (s: QuestionnaireSection) =>
    s.questions.filter((q) => isAnswered(q, answers[q.id])).length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
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
            <h1 className="truncate text-sm font-semibold text-foreground md:text-base">
              {questionnaire_name}
            </h1>
            <span className="hidden md:inline-flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="h-3 w-3" />
              剩余 {days} 天
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Save className="mr-1.5 h-4 w-4" />
            保存草稿
          </Button>
        </div>

        {/* Progress bar */}
        <div className="mx-auto max-w-[1400px] px-6 pb-3 lg:px-8">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              整体进度 {overallProgress}%
            </span>
            <span>
              已作答 {answeredCount} / {totalQuestions} 题
            </span>
            <Progress
              value={overallProgress}
              className="ml-auto h-1.5 w-48 bg-muted"
              indicatorClassName="bg-teal-600"
            />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        {/* Section navigator */}
        <aside className="lg:sticky lg:top-[104px] lg:self-start">
          <nav className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between px-1 pb-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                章节导航
              </h2>
              <span className="text-xs text-muted-foreground">
                {sectionIndex + 1}/{sections.length}
              </span>
            </div>
            <ul className="flex flex-col gap-1">
              {sections.map((s, i) => {
                const answered = sectionAnswered(s)
                const isCurrent = i === sectionIndex
                const isComplete = answered === s.questions.length
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => setSectionIndex(i)}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors",
                        isCurrent
                          ? "bg-teal-50 ring-1 ring-teal-200"
                          : "hover:bg-muted",
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                          isComplete
                            ? "bg-teal-600 text-white"
                            : isCurrent
                              ? "bg-white text-teal-700 ring-1 ring-teal-300"
                              : "bg-muted text-muted-foreground ring-1 ring-border",
                        )}
                      >
                        {isComplete ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            "text-sm truncate",
                            isCurrent
                              ? "font-semibold text-foreground"
                              : "font-medium text-foreground",
                          )}
                        >
                          {s.title}
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {answered} / {s.questions.length} 题
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Main question area */}
        <main className="min-w-0">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-foreground">
              {currentSection.title}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {currentSection.questions.map((q, idx) => (
              <QuestionCard
                key={q.id}
                index={idx + 1}
                question={q}
                value={answers[q.id]}
                onChange={(v) => setAnswer(q.id, v)}
              />
            ))}
          </div>

          {/* Bottom nav */}
          <div className="mt-8 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              disabled={sectionIndex === 0}
              onClick={() => setSectionIndex((i) => Math.max(0, i - 1))}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              上一节
            </Button>
            <div className="text-center text-xs text-muted-foreground">
              本节已作答 {sectionAnswered(currentSection)} /{" "}
              {currentSection.questions.length} 题
            </div>
            {isLastSection ? (
              <Button variant="accent">
                提交问卷
                <Check className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="accent"
                onClick={() =>
                  setSectionIndex((i) => Math.min(sections.length - 1, i + 1))
                }
              >
                下一节
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

/* ---------- Question Card ---------- */

interface QuestionCardProps {
  index: number
  question: Question
  value: AnswerValue
  onChange: (v: AnswerValue) => void
}

function QuestionCard({ index, question, value, onChange }: QuestionCardProps) {
  const answered = isAnswered(question, value)
  return (
    <section
      className={cn(
        "rounded-xl border bg-card p-5 transition-colors",
        answered ? "border-teal-200" : "border-border",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
            answered
              ? "bg-teal-600 text-white"
              : "bg-muted text-muted-foreground",
          )}
        >
          {answered ? <Check className="h-4 w-4" /> : index}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-foreground leading-snug">
            {question.title}
            {question.required ? (
              <span className="ml-1 text-rose-600">*</span>
            ) : null}
          </h3>

          <div className="mt-4">{renderInput(question, value, onChange)}</div>
        </div>
      </div>
    </section>
  )
}

function renderInput(
  q: Question,
  value: AnswerValue,
  onChange: (v: AnswerValue) => void,
) {
  switch (q.type) {
    case "skill_level":
      return <SkillLevelPicker question={q} value={value as string} onChange={onChange} />
    case "single_choice":
      return <SingleChoice question={q} value={value as string} onChange={onChange} />
    case "multi_choice":
      return <MultiChoice question={q} value={(value as string[]) ?? []} onChange={onChange} />
    case "likert":
      return <LikertScale question={q} value={value as number} onChange={onChange} />
    case "text":
      return <TextAnswer question={q} value={(value as string) ?? ""} onChange={onChange} />
    default:
      return null
  }
}

function SkillLevelPicker({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string | undefined
  onChange: (v: string) => void
}) {
  const levels = question.levels ?? []
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
      {levels.map((lv) => {
        const selected = value === lv.value
        return (
          <button
            key={lv.value}
            type="button"
            onClick={() => onChange(lv.value)}
            className={cn(
              "flex flex-col rounded-lg border p-3 text-left transition-all",
              selected
                ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500/20"
                : "border-border bg-card hover:border-slate-300 hover:bg-muted/50",
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "text-sm font-semibold",
                  selected ? "text-teal-800" : "text-foreground",
                )}
              >
                {lv.label}
              </span>
              {selected ? (
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
              ) : (
                <CircleDot className="h-4 w-4 text-muted-foreground/40" />
              )}
            </div>
            <p
              className={cn(
                "mt-1.5 text-xs leading-relaxed",
                selected ? "text-teal-900" : "text-muted-foreground",
              )}
            >
              {lv.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}

function SingleChoice({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string | undefined
  onChange: (v: string) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {(question.options ?? []).map((opt) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3 text-left transition-all",
              selected
                ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500/20"
                : "border-border bg-card hover:border-slate-300 hover:bg-muted/50",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                selected
                  ? "border-teal-600 bg-teal-600"
                  : "border-slate-300 bg-white",
              )}
            >
              {selected ? (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              ) : null}
            </span>
            <span className="flex-1">
              <span
                className={cn(
                  "block text-sm font-medium",
                  selected ? "text-teal-800" : "text-foreground",
                )}
              >
                {opt.label}
              </span>
              {opt.hint ? (
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {opt.hint}
                </span>
              ) : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function MultiChoice({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (v: string) => {
    if (value.includes(v)) onChange(value.filter((x) => x !== v))
    else onChange([...value, v])
  }
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {(question.options ?? []).map((opt) => {
        const selected = value.includes(opt.value)
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3 text-left transition-all",
              selected
                ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500/20"
                : "border-border bg-card hover:border-slate-300 hover:bg-muted/50",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2",
                selected
                  ? "border-teal-600 bg-teal-600"
                  : "border-slate-300 bg-white",
              )}
            >
              {selected ? <Check className="h-3 w-3 text-white" /> : null}
            </span>
            <span
              className={cn(
                "flex-1 text-sm font-medium",
                selected ? "text-teal-800" : "text-foreground",
              )}
            >
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function LikertScale({
  question,
  value,
  onChange,
}: {
  question: Question
  value: number | undefined
  onChange: (v: number) => void
}) {
  const scale = question.scale ?? { min: 1, max: 5, minLabel: "", maxLabel: "" }
  const points = Array.from(
    { length: scale.max - scale.min + 1 },
    (_, i) => scale.min + i,
  )
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground">{scale.minLabel}</span>
        <div className="flex flex-1 items-center justify-between gap-2">
          {points.map((p) => {
            const selected = value === p
            return (
              <button
                key={p}
                type="button"
                onClick={() => onChange(p)}
                className={cn(
                  "flex h-10 flex-1 items-center justify-center rounded-lg border text-sm font-semibold transition-all",
                  selected
                    ? "border-teal-500 bg-teal-600 text-white ring-2 ring-teal-500/20"
                    : "border-border bg-card text-foreground hover:border-slate-300 hover:bg-muted/50",
                )}
              >
                {p}
              </button>
            )
          })}
        </div>
        <span className="text-xs text-muted-foreground">{scale.maxLabel}</span>
      </div>
    </div>
  )
}

function TextAnswer({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string
  onChange: (v: string) => void
}) {
  const max = question.maxLength ?? 500
  return (
    <div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        placeholder={question.placeholder}
        rows={4}
      />
      <div className="mt-1.5 flex justify-end text-xs text-muted-foreground">
        {value.length} / {max}
      </div>
    </div>
  )
}
