import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { QuestionnaireReminder } from "@/components/questionnaire-reminder"
import { SkillsOverview } from "@/components/skills-overview"
import { SourceModules } from "@/components/source-modules"
import { EvidenceTimeline } from "@/components/evidence-timeline"
import { SidePanel } from "@/components/side-panel"
import { QuestionnairePage } from "@/pages/questionnaire-page"
import { QuestionnaireHistoryPage } from "@/pages/questionnaire-history-page"
import { SkillProfilePreviewPage } from "@/pages/skill-profile-preview-page"

type View =
  | "dashboard"
  | "questionnaire"
  | "questionnaire-history"
  | "profile-preview"

export default function App() {
  const [view, setView] = useState<View>("dashboard")

  if (view === "questionnaire") {
    return <QuestionnairePage onExit={() => setView("dashboard")} />
  }

  if (view === "questionnaire-history") {
    return (
      <QuestionnaireHistoryPage
        onExit={() => setView("dashboard")}
        onContinue={() => setView("questionnaire")}
      />
    )
  }

  if (view === "profile-preview") {
    return <SkillProfilePreviewPage onExit={() => setView("dashboard")} />
  }

  return (
    <main className="min-h-screen bg-background">
      <PageHeader onPreviewProfile={() => setView("profile-preview")} />
      <QuestionnaireReminder onStart={() => setView("questionnaire")} />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <div className="flex flex-col gap-6 min-w-0">
          <SkillsOverview />
          <SourceModules
            onContinueQuestionnaire={() => setView("questionnaire")}
            onViewQuestionnaireHistory={() =>
              setView("questionnaire-history")
            }
          />
          <EvidenceTimeline />
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <SidePanel />
        </div>
      </div>
    </main>
  )
}
