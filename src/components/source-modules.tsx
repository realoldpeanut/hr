import {
  FileText,
  Briefcase,
  TrendingUp,
  FolderKanban,
  GraduationCap,
  UserCheck,
  ArrowRight,
  Upload,
  Plus,
  RefreshCw,
} from "lucide-react"
import { sourceStats } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Metric = {
  label: string
  value: string | number
  tone?: "default" | "warning" | "success" | "danger"
}
type Action = {
  label: string
  icon?: typeof Upload
  primary?: boolean
  onClick?: () => void
}

interface ModuleCardProps {
  icon: typeof FileText
  title: string
  iconTone: string
  metrics: Metric[]
  actions: Action[]
}

function ModuleCard({
  icon: Icon,
  title,
  iconTone,
  metrics,
  actions,
}: ModuleCardProps) {
  return (
    <Card className="group flex flex-col gap-4 p-5 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconTone}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-foreground leading-snug">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {metrics.map((m, i) => {
          const toneMap = {
            default: "text-foreground",
            warning: "text-amber-600",
            success: "text-emerald-600",
            danger: "text-rose-600",
          }
          return (
            <div
              key={i}
              className="flex flex-col gap-0.5 rounded-md bg-slate-50/70 px-2.5 py-2"
            >
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {m.label}
              </span>
              <span
                className={`text-lg font-semibold tabular-nums ${toneMap[m.tone ?? "default"]}`}
              >
                {m.value}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        {actions.map((a, i) => {
          const ActionIcon = a.icon
          return (
            <Button
              key={i}
              size="sm"
              variant={a.primary ? "default" : "outline"}
              onClick={a.onClick}
            >
              {ActionIcon ? <ActionIcon /> : null}
              {a.label}
              {a.primary ? <ArrowRight /> : null}
            </Button>
          )
        })}
      </div>
    </Card>
  )
}

interface SourceModulesProps {
  onContinueQuestionnaire?: () => void
  onViewQuestionnaireHistory?: () => void
}

export function SourceModules({
  onContinueQuestionnaire,
  onViewQuestionnaireHistory,
}: SourceModulesProps = {}) {
  return (
    <section aria-label="六类技能来源">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          技能来源
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* 1. 技能问卷 */}
        <ModuleCard
          icon={FileText}
          iconTone="bg-teal-50 text-teal-700"
          title="技能问卷"
          metrics={[
            {
              label: "待完成",
              value: sourceStats.questionnaire.activeCount,
              tone: "danger",
            },
            {
              label: "历史完成",
              value: sourceStats.questionnaire.historyCount,
            },
            {
              label: "识别技能",
              value: sourceStats.questionnaire.recognizedSkills,
            },
          ]}
          actions={[
            {
              label: "继续作答",
              primary: true,
              onClick: onContinueQuestionnaire,
            },
            { label: "查看历史", onClick: onViewQuestionnaireHistory },
          ]}
        />

        {/* 2. 简历 */}
        <ModuleCard
          icon={Briefcase}
          iconTone="bg-slate-100 text-slate-700"
          title="简历上传 / 编辑"
          metrics={[
            {
              label: "上传状态",
              value: sourceStats.resume.uploaded ? "已上传" : "未上传",
              tone: "success",
            },
            { label: "识别技能", value: sourceStats.resume.recognizedSkills },
            {
              label: "最近更新",
              value: sourceStats.resume.lastUploaded.slice(5),
            },
          ]}
          actions={[
            { label: "编辑经历", icon: Plus, primary: true },
            { label: "重新解析", icon: RefreshCw },
          ]}
        />

        {/* 3. 绩效 */}
        <ModuleCard
          icon={TrendingUp}
          iconTone="bg-indigo-50 text-indigo-700"
          title="绩效评估"
          metrics={[
            { label: "同步周期", value: sourceStats.performance.syncedCycles },
            { label: "最近", value: sourceStats.performance.latestCycle },
            {
              label: "映射技能",
              value: sourceStats.performance.mappedSkills,
            },
          ]}
          actions={[{ label: "查看绩效证据", primary: true }]}
        />

        {/* 4. 项目 */}
        <ModuleCard
          icon={FolderKanban}
          iconTone="bg-amber-50 text-amber-800"
          title="项目经历"
          metrics={[
            { label: "项目总数", value: sourceStats.project.totalProjects },
            {
              label: "关键项目",
              value: sourceStats.project.keyProjects,
              tone: "success",
            },
            { label: "关联技能", value: sourceStats.project.linkedSkills },
          ]}
          actions={[
            { label: "新增项目", icon: Plus, primary: true },
            { label: "导入内部项目" },
          ]}
        />

        {/* 5. 学习与证书 */}
        <ModuleCard
          icon={GraduationCap}
          iconTone="bg-emerald-50 text-emerald-700"
          title="学习与证书"
          metrics={[
            { label: "课程完成", value: sourceStats.learning.completedCourses },
            {
              label: "有效证书",
              value: sourceStats.learning.activeCertificates,
              tone: "success",
            },
            {
              label: "即将过期",
              value: sourceStats.learning.expiringSoon,
              tone: "warning",
            },
          ]}
          actions={[
            { label: "上传证书", icon: Upload, primary: true },
            { label: "同步学习记录", icon: RefreshCw },
          ]}
        />

        {/* 6. 经理认定 */}
        <ModuleCard
          icon={UserCheck}
          iconTone="bg-rose-50 text-rose-700"
          title="经理认定"
          metrics={[
            {
              label: "已认定",
              value: sourceStats.manager.confirmed,
              tone: "success",
            },
            {
              label: "待确认",
              value: sourceStats.manager.pending,
              tone: "warning",
            },
            {
              label: "被退回",
              value: sourceStats.manager.returned,
              tone: "danger",
            },
          ]}
          actions={[
            { label: "提交经理认定", primary: true },
            { label: "查看反馈" },
          ]}
        />
      </div>
    </section>
  )
}
