import { NavLink } from "react-router-dom"
import { LayoutGrid, BookOpen, GitCompare, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const ROUTES = [
  { path: "/", label: "会话列表", icon: LayoutGrid },
  { path: "/workbench/sess-2026", label: "战略工作台", icon: BookOpen },
  { path: "/dimension/sess-2026/macro_trend", label: "5看维度编辑", icon: BookOpen },
  { path: "/artifact/sess-2026/target", label: "3定产物编辑", icon: BookOpen },
  { path: "/versions/sess-2026", label: "版本对比", icon: GitCompare },
  { path: "/review/sess-2025q4", label: "评审发布", icon: CheckCircle },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r bg-background">
        <div className="p-6">
          <h1 className="text-xl font-bold">战略制定平台</h1>
          <p className="text-sm text-muted-foreground">5看 3定</p>
        </div>
        <nav className="space-y-2 px-4">
          {ROUTES.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
