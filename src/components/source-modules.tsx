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
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { sourceStats, questionnaireTasks } from "@/lib/mock-data"
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
}

interface ModuleCardProps {
  icon: typeof FileText
  title: string
  subtitle: string
  iconTone: string
  metrics: Metric[]
  actions: Action[]
  footer?: React.ReactNode
}

function ModuleCard({
  icon: Icon,
  title,
  subtitle,
  iconTone,
  metrics,
  actions,
  footer,
}: ModuleCardProps) {
  return (
    <Card className="group flex flex-col gap-4 p-5 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconTone}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-foreground leading-snug">
            {title}
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>
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

      {footer ? (
        <div className="text-xs text-muted-foreground">{footer}</div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        {actions.map((a, i) => {
          const ActionIcon = a.icon
          return (
            <Button
              key={i}
              size="sm"
              variant={a.primary ? "default" : "outline"}
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

export function SourceModules() {
  const activeQuestionnaire = questionnaireTasks[0]
  return (
    <section aria-label="六类技能来源">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            技能来源
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            来自组织、系统与个人补充的六类证据源共同支撑技能档案
          </p>
        </div>
        <span className="hidden text-xs text-muted-foreground md:inline">
          来源越多，证据强度越高
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* 1. 技能问卷 */}
        <ModuleCard
          icon={FileText}
          iconTone="bg-teal-50 text-teal-700"
          title="技能问卷"
          subtitle="承接组织统一发布的标准化技能问卷结果"
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
          footer={
            activeQuestionnaire ? (
              <span>
                当前：{activeQuestionnaire.questionnaire_name.slice(0, 20)}...
                · 截止 {activeQuestionnaire.due_date}
              </span>
            ) : (
              <span>上次完成 {sourceStats.questionnaire.lastCompleted}</span>
            )
          }
          actions={[
            { label: "继续作答", primary: true },
            { label: "查看历史" },
          ]}
        />

        {/* 2. 简历 */}
        <ModuleCard
          icon={Briefcase}
          iconTone="bg-slate-100 text-slate-700"
          title="简历上传 / 编辑"
          subtitle="把简历转为结构化职业经历与技能证据"
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
          footer={
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              {sourceStats.resume.fileName} · 解析成功
            </span>
          }
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
          subtitle="来自绩效系统的胜任力与评语证据（只读）"
          metrics={[
            { label: "同步周期", value: sourceStats.performance.syncedCycles },
            { label: "最近", value: sourceStats.performance.latestCycle },
            {
              label: "映射技能",
              value: sourceStats.performance.mappedSkills,
            },
          ]}
          footer={
            <div className="flex flex-wrap gap-1">
              {sourceStats.performance.competencyTags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-indigo-700"
                >
                  {t}
                </span>
              ))}
            </div>
          }
          actions={[{ label: "查看绩效证据", primary: true }]}
        />

        {/* 4. 项目 */}
        <ModuleCard
          icon={FolderKanban}
          iconTone="bg-amber-50 text-amber-800"
          title="项目经历"
          subtitle="补充最强的实战类技能证据"
          metrics={[
            { label: "项目总数", value: sourceStats.project.totalProjects },
            {
              label: "关键项目",
              value: sourceStats.project.keyProjects,
              tone: "success",
            },
            { label: "关联技能", value: sourceStats.project.linkedSkills },
          ]}
          footer={
            <span className="inline-flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-amber-600" />
              建议补充 1 个支撑「A/B 实验设计」的项目
            </span>
          }
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
          subtitle="LMS 学习记录、外部课程和证书凭证"
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
          footer={
            sourceStats.learning.expiringSoon > 0 ? (
              <span className="inline-flex items-center gap-1 text-amber-700">
                <AlertCircle className="h-3 w-3" />1 张证书将在 30 天内过期
              </span>
            ) : null
          }
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
          subtitle="直线经理的最终确认结果"
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
          footer={<span>最近提交于 {sourceStats.manager.lastSubmittedAt}</span>}
          actions={[
            { label: "提交经理认定", primary: true },
            { label: "查看反馈" },
          ]}
        />
      </div>
    </section>
  )
}
