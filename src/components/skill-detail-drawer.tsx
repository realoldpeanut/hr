import { AlertTriangle, ExternalLink, UserCheck } from "lucide-react"
import type { SkillSummary } from "@/lib/mock-data"
import { SourceChip, StatusBadge } from "./status-badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function SkillDetailDrawer({
  skill,
  open,
  onOpenChange,
}: {
  skill: SkillSummary | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!skill) return null
  const hasConflict = skill.conflict

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0">
        <SheetHeader className="gap-2">
          <SheetTitle>{skill.skill_name}</SheetTitle>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-sm font-semibold tabular-nums text-foreground">
              {skill.current_level}
            </span>
            <StatusBadge status={skill.status} />
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto subtle-scroll">
          {hasConflict ? (
            <section className="border-b border-border px-6 py-3">
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                来源间等级存在冲突
              </div>
            </section>
          ) : null}

          {skill.manager_comment ? (
            <section className="border-b border-border px-6 py-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-700">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-medium text-foreground">
                    经理意见
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {skill.manager_comment}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          <section className="px-6 py-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                证据明细{" "}
                <span className="text-muted-foreground font-normal">
                  ({skill.evidence.length})
                </span>
              </h3>
            </div>

            {skill.evidence.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                暂无证据记录
              </div>
            ) : (
              <ol className="flex flex-col gap-3">
                {skill.evidence.map((ev) => (
                  <li
                    key={ev.evidence_id}
                    className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3.5 transition hover:border-slate-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <SourceChip type={ev.source_type} />
                          <span className="text-sm font-medium text-foreground">
                            {ev.source_name}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600">
                          {ev.evidence_summary}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-foreground">
                          {ev.suggested_level}
                        </span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          {ev.event_time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end text-xs">
                      <button className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800">
                        查看原始记录
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        <SheetFooter>
          <div className="flex w-full items-center justify-end gap-2">
            <Button variant="outline" size="sm">
              补充证据
            </Button>
            {!skill.manager_confirmed_flag ? (
              <Button size="sm">提交经理认定</Button>
            ) : null}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
