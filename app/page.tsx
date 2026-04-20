import { PageHeader } from "@/components/page-header"
import { QuestionnaireReminder } from "@/components/questionnaire-reminder"
import { SkillsOverview } from "@/components/skills-overview"
import { SourceModules } from "@/components/source-modules"
import { EvidenceTimeline } from "@/components/evidence-timeline"
import { SidePanel } from "@/components/side-panel"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader />
      <QuestionnaireReminder />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <div className="flex flex-col gap-6 min-w-0">
          <SkillsOverview />
          <SourceModules />
          <EvidenceTimeline />
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <SidePanel />
        </div>
      </div>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-4 text-center text-xs text-muted-foreground lg:px-8">
          技能档案由系统聚合六类来源生成 · 所有手动编辑均记录审计日志 · AI 仅用于总结与提示
        </div>
      </footer>
    </main>
  )
}
