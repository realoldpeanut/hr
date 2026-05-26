import { KoraChat } from "@/components/kora-chat"
import { ArrowLeft, Save, Send, FileText } from "lucide-react"
import { Link } from "react-router-dom"

const MOCK_MESSAGES = [
  {
    id: "msg-1",
    sender: "kora" as const,
    content: "DTC渠道销售业绩），将其与您的「全域渠道与客户体验优化」建立对齐关系。\n\n2. 对于暂无目标的下属（如李佳慧、蒋欣怡），为您创建级联目标建议。\n\n3. 对上述4个目标中各测量指标做细微的SMART完善。\n\n在开始执行前，请您确认以下几点：\n\n• 是否同意以上级联分配方案，或有其他偏好？\n• 对「品牌知名度提升至行业前3名」等指标，是否希望添加更具体的定义或衡量方式？",
    timestamp: "04:08:13 PM",
  },
  {
    id: "msg-2",
    sender: "user" as const,
    content: "同意以上方案",
    timestamp: "04:11:09 PM",
  },
  {
    id: "msg-3",
    sender: "kora" as const,
    content: "好的，王总。我现在开始执行级联与目标完善工作，具体包括以下几个步骤：\n\n1. 获取直接下属列表，确认刘敏龙、陈磊刚、李佳慧、蒋欣怡等人的角色信息，以及目前已有目标的情况。\n\n2. 检查每个目标当前的级联状态，确保不会重复级联或与已有对齐关系冲突\n\n3. 对于已有目标的下属（如刘敏龙），将对齐操作落实到您的目标下",
    timestamp: "04:11:15 PM",
  },
]

const SUGGESTIONS = [
  "审查和完善所有现有目标",
  "基于角色和团队目标建议新目标",
  "与上级的目标保持一致",
  "向下属级联目标",
]

export default function DimensionEditPage() {
  return (
    <div className="h-full flex">
      {/* Left: Editor */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Toolbar */}
        <div className="shrink-0 h-14 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              to="/workbench/sess-2026"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="size-5 text-gray-600" />
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <h1 className="font-semibold text-gray-900">宏观趋势分析</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
              <Save className="size-4" />
              保存草稿
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <Send className="size-4" />
              提交报告
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="size-4" />
              查看报告
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分析报告
              </label>
              <textarea
                className="w-full h-72 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm leading-relaxed"
                placeholder="输入分析内容..."
                defaultValue={`全球经济增速放缓，地缘政治风险上升。中国消费升级趋势不变，中产阶级规模扩大。

主要趋势：
1. 数字化转型加速，企业需要加快技术投入
2. ESG成为投资和消费决策的重要考量因素
3. 供应链本土化趋势明显，区域化生产布局调整

机会：
- 新能源和绿色技术领域投资机会
- 数字化服务需求持续增长
- 银发经济和健康产业前景广阔

风险：
- 地缘政治不确定性
- 通胀压力和利率上升
- 技术人才短缺`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  关键发现
                </label>
                <textarea
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="输入关键发现..."
                  defaultValue="消费升级趋势持续，数字化转型成为必选项"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  机会与风险
                </label>
                <textarea
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="输入机会与风险..."
                  defaultValue="机会：新能源、数字化服务\n风险：地缘政治、通胀压力"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Kora Chat */}
      <div className="w-96 border-l shrink-0">
        <KoraChat messages={MOCK_MESSAGES} suggestions={SUGGESTIONS} />
      </div>
    </div>
  )
}
