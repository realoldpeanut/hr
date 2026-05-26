import { Link } from "react-router-dom"
import { MOCK_SESSIONS } from "@/lib/mock-data"
import { Plus, Calendar, Users, TrendingUp } from "lucide-react"

export default function SessionsPage() {
  const inProgress = MOCK_SESSIONS.filter(s => s.status === "in_progress")
  const inReview = MOCK_SESSIONS.filter(s => s.status === "review")
  const published = MOCK_SESSIONS.filter(s => s.status === "published")

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">战略规划会话</h1>
            <p className="text-gray-500 mt-1">管理您的战略制定和规划工作</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium text-sm transition-colors shadow-sm">
            <Plus className="size-4" />
            新建会话
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="size-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <TrendingUp className="size-5 text-amber-600" />
              </div>
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                进行中
              </span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-gray-900">{inProgress.length}</div>
              <div className="text-sm text-gray-500 mt-1">个活跃会话</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="size-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="size-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                评审中
              </span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-gray-900">{inReview.length}</div>
              <div className="text-sm text-gray-500 mt-1">待评审</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="size-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Calendar className="size-5 text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                已发布
              </span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-gray-900">{published.length}</div>
              <div className="text-sm text-gray-500 mt-1">已完成发布</div>
            </div>
          </div>
        </div>

        {/* Session List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">会话列表</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {MOCK_SESSIONS.map(session => (
              <Link
                key={session.id}
                to={`/workbench/${session.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-900">{session.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      session.status === "in_progress"
                        ? "bg-amber-50 text-amber-700"
                        : session.status === "review"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}>
                      {session.status === "in_progress" ? "进行中" : session.status === "review" ? "评审中" : "已发布"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500">{session.period}</span>
                    <div className="flex items-center gap-1.5">
                      {session.members.slice(0, 3).map((m, i) => (
                        <div
                          key={i}
                          className="size-6 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-[10px] font-medium text-white ring-2 ring-white -ml-1.5 first:ml-0"
                        >
                          {m.charAt(0)}
                        </div>
                      ))}
                      {session.members.length > 3 && (
                        <span className="text-xs text-gray-400 ml-1">+{session.members.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{session.progress}%</div>
                    <div className="text-xs text-gray-500">完成度</div>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all"
                        style={{ width: `${session.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
