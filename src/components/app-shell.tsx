import { NavLink } from "react-router-dom"
import {
  LayoutGrid,
  Target,
  Eye,
  FileEdit,
  GitCompare,
  CheckCircle,
  Compass,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ROUTES = [
  { path: "/", label: "会话列表", icon: LayoutGrid },
  { path: "/workbench/sess-2026", label: "战略工作台", icon: Target },
  { path: "/dimension/sess-2026/macro_trend", label: "5看维度编辑", icon: Eye },
  { path: "/artifact/sess-2026/target", label: "3定产物编辑", icon: FileEdit },
  { path: "/versions/sess-2026", label: "版本对比", icon: GitCompare },
  { path: "/review/sess-2025q4", label: "评审发布", icon: CheckCircle },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 border-r bg-white flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Compass className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">战略制定平台</h1>
              <p className="text-xs text-gray-500">5看 3定</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {ROUTES.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="size-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-sm font-medium text-white">
              张
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">张经理</div>
              <div className="text-xs text-gray-500 truncate">战略规划部</div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
