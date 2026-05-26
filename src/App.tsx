import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import AppShell from "./components/app-shell"
import SessionsPage from "./pages/sessions-page"
import WorkbenchPage from "./pages/workbench-page"
import DimensionEditPage from "./pages/dimension-edit-page"
import ArtifactEditPage from "./pages/artifact-edit-page"
import VersionsPage from "./pages/versions-page"
import ReviewPage from "./pages/review-page"

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<SessionsPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/workbench/:sessionId" element={<WorkbenchPage />} />
          <Route path="/dimension/:sessionId/:dimension" element={<DimensionEditPage />} />
          <Route path="/artifact/:sessionId/:artifact" element={<ArtifactEditPage />} />
          <Route path="/versions/:sessionId" element={<VersionsPage />} />
          <Route path="/review/:sessionId" element={<ReviewPage />} />
        </Routes>
      </AppShell>
      <Toaster />
    </BrowserRouter>
  )
}
