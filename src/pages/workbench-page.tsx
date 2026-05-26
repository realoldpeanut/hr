import { Link } from "react-router-dom"
import { MOCK_DIMENSIONS, MOCK_ARTIFACTS } from "@/lib/mock-data"
import {
  Eye,
  Target,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react"

const DIMENSION_STATUS = {
  macro_trend: { status: "completed", progress: 100 },
  industry: { status: "in_progress", progress: 75 },
  internal: { status: "in_progress", progress: 60 },
  customer: { status: "draft", progress: 30 },
  strategy: { status: "draft", progress: 0 },
}

const ARTIFACT_STATUS = {
  direction: { status: "completed", progress: 100 },
  target: { status: "in_progress", progress: 50 },
  strategy: { status: "draft", progress: 0 },
}

export default function WorkbenchPage() {
  return (
    <div className="h-full overflow-auto bg-gray-50/50">
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">2026年战略规划</h1>
              <p className="text-gray-500">2026年度 · 年度战略规划</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 rounded-full">
                进行中
              </span>
              <span className="text-sm text-gray-500">版本 v2.3</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Clock className="size-5 text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">开始日期</div>
                <div className="text-sm font-medium">2025-10-15</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Target className="size-5 text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">目标完成</div>
                <div className="text-sm font-medium">2025-12-31</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Users className="size-5 text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">参与人员</div>
                <div className="text-sm font-medium">5 人</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <TrendingUp className="size-5 text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">整体进度</div>
                <div className="text-sm font-medium">65%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5看维度 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Eye className="size-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">5看分析</h2>
            <span className="text-sm text-gray-500 ml-2">深度洞察与环境分析</span>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {MOCK_DIMENSIONS.map((dim) => {
              const status = DIMENSION_STATUS[dim.id as keyof typeof DIMENSION_STATUS]
              return (
                <Link
                  key={dim.id}
                  to={`/dimension/sess-2026/${dim.id}`}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      status.status === "completed"
                        ? "bg-emerald-50"
                        : status.status === "in_progress"
                        ? "bg-blue-50"
                        : "bg-gray-50"
                    }`}>
                      {status.status === "completed" ? (
                        <CheckCircle className="size-5 text-emerald-600" />
                      ) : status.status === "in_progress" ? (
                        <Clock className="size-5 text-blue-600" />
                      ) : (
                        <Eye className="size-5 text-gray-400" />
                      )}
                    </div>
                    <ArrowRight className="size-4 text-gray-300 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{dim.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{dim.shortName}视角</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        status.status === "completed"
                          ? "bg-emerald-500"
                          : status.status === "in_progress"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                      style={{ width: `${status.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{status.progress}%</div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* 3定产物 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="size-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">3定产物</h2>
            <span className="text-sm text-gray-500 ml-2">战略方向、目标与举措</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {MOCK_ARTIFACTS.map((art) => {
              const status = ARTIFACT_STATUS[art.id as keyof typeof ARTIFACT_STATUS]
              return (
                <Link
                  key={art.id}
                  to={`/artifact/sess-2026/${art.id}`}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      status.status === "completed"
                        ? "bg-emerald-50"
                        : status.status === "in_progress"
                        ? "bg-blue-50"
                        : "bg-gray-50"
                    }`}>
                      {art.id === "direction" ? (
                        <Lightbulb className={`size-6 ${
                          status.status === "completed" ? "text-emerald-600" : "text-gray-400"
                        }`} />
                      ) : art.id === "target" ? (
                        <Target className={`size-6 ${
                          status.status === "in_progress" ? "text-blue-600" : "text-gray-400"
                        }`} />
                      ) : (
                        <AlertTriangle className="size-6 text-gray-400" />
                      )}
                    </div>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      status.status === "completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : status.status === "in_progress"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-50 text-gray-500"
                    }`}>
                      {status.status === "completed" ? "已完成" : status.status === "in_progress" ? "进行中" : "待开始"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    {art.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{art.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mr-3">
                      <div
                        className={`h-full rounded-full transition-all ${
                          status.status === "completed"
                            ? "bg-emerald-500"
                            : status.status === "in_progress"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                        style={{ width: `${status.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{status.progress}%</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
