import { cn } from "@/lib/utils"
import type { SkillStatus, EvidenceSourceType } from "@/lib/mock-data"
import {
  FileText,
  Briefcase,
  TrendingUp,
  FolderKanban,
  GraduationCap,
  UserCheck,
} from "lucide-react"

export const statusMeta: Record<
  SkillStatus,
  { label: string; className: string; dot: string }
> = {
  generated: {
    label: "已生成",
    className: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-400",
  },
  supported: {
    label: "证据支撑",
    className: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
  },
  pending_manager: {
    label: "待经理确认",
    className: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  confirmed: {
    label: "已认定",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  needs_evidence: {
    label: "需补充证据",
    className: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
  },
  stale: {
    label: "待更新",
    className: "bg-stone-100 text-stone-700 border-stone-200",
    dot: "bg-stone-400",
  },
}

export function StatusBadge({
  status,
  className,
}: {
  status: SkillStatus
  className?: string
}) {
  const m = statusMeta[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium",
        m.className,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", m.dot)} />
      {m.label}
    </span>
  )
}

export const sourceMeta: Record<
  EvidenceSourceType,
  { label: string; icon: typeof FileText; tone: string }
> = {
  questionnaire: {
    label: "技能问卷",
    icon: FileText,
    tone: "text-teal-700 bg-teal-50",
  },
  resume: {
    label: "简历",
    icon: Briefcase,
    tone: "text-slate-700 bg-slate-100",
  },
  performance: {
    label: "绩效",
    icon: TrendingUp,
    tone: "text-indigo-700 bg-indigo-50",
  },
  project: {
    label: "项目",
    icon: FolderKanban,
    tone: "text-amber-800 bg-amber-50",
  },
  learning: {
    label: "学习与证书",
    icon: GraduationCap,
    tone: "text-emerald-700 bg-emerald-50",
  },
  manager: {
    label: "经理认定",
    icon: UserCheck,
    tone: "text-rose-700 bg-rose-50",
  },
}

export function SourceChip({
  type,
  size = "sm",
}: {
  type: EvidenceSourceType
  size?: "sm" | "md"
}) {
  const m = sourceMeta[type]
  const Icon = m.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md font-medium",
        m.tone,
        size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-xs",
      )}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {m.label}
    </span>
  )
}
