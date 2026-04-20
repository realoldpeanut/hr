import { useMemo } from "react"
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react"
import type {
  QuestionnaireTask,
  RecognizedSkillSummary,
} from "@/lib/mock-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RecognizedSkillsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: QuestionnaireTask | null
}

export function RecognizedSkillsDialog({
  open,
  onOpenChange,
  task,
}: RecognizedSkillsDialogProps) {
  const grouped = useMemo(() => {
    if (!task?.recognized_skills) return []
    const map = new Map<string, RecognizedSkillSummary[]>()
    for (const s of task.recognized_skills) {
      if (!map.has(s.skill_category)) map.set(s.skill_category, [])
      map.get(s.skill_category)!.push(s)
    }
    return Array.from(map.entries())
  }, [task])

  const newCount = task?.recognized_skills?.filter((s) => s.is_new).length ?? 0
  const upCount =
    task?.recognized_skills?.filter((s) => s.delta === "up").length ?? 0

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-hidden sm:max-w-xl flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <DialogTitle className="text-base">识别出的技能</DialogTitle>
              <DialogDescription className="text-xs">
                {task.questionnaire_name}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          {task.recognition_summary ? (
            <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 text-sm leading-relaxed text-slate-700">
              {task.recognition_summary}
            </p>
          ) : null}

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              共识别{" "}
              <span className="font-semibold text-foreground tabular-nums">
                {task.recognized_skills?.length ?? 0}
              </span>{" "}
              项
            </span>
            {newCount > 0 ? (
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                新增{" "}
                <span className="font-medium text-foreground tabular-nums">
                  {newCount}
                </span>
              </span>
            ) : null}
            {upCount > 0 ? (
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <TrendingUp className="h-3 w-3" />
                提升{" "}
                <span className="font-medium tabular-nums">{upCount}</span>
              </span>
            ) : null}
          </div>

          <div className="mt-4 mb-6 space-y-5">
            {grouped.map(([category, items]) => (
              <section key={category}>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {category}
                  </h3>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {items.length}
                  </span>
                </div>
                <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
                  {items.map((s) => (
                    <li
                      key={s.skill_name}
                      className="flex items-center justify-between gap-3 px-3 py-2.5"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-sm text-foreground">
                          {s.skill_name}
                        </span>
                        {s.is_new ? (
                          <Badge
                            variant="outline"
                            className="border-teal-300 bg-teal-50 text-teal-800 text-[10px] py-0"
                          >
                            新增
                          </Badge>
                        ) : null}
                        {s.delta === "up" ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700">
                            <TrendingUp className="h-3 w-3" />
                            提升
                          </span>
                        ) : null}
                      </div>
                      <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold tabular-nums text-foreground">
                        {s.suggested_level}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <DialogFooter className="border-t border-border px-6 py-3">
          <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
          <Button size="sm">
            在技能档案中查看
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
