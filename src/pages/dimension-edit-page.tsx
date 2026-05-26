import { MOCK_MESSAGES } from "@/lib/mock-data"

export default function DimensionEditPage() {
  return (
    <div className="h-full flex">
      <div className="flex-1 border-r overflow-auto p-6">
        <h1 className="text-2xl font-bold mb-4">宏观趋势分析</h1>
        <div className="border rounded-lg p-4 bg-card">
          <textarea
            className="w-full h-64 p-4 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="输入分析内容..."
            defaultValue="全球经济增速放缓，地缘政治风险上升。中国消费升级趋势不变，中产阶级规模扩大..."
          />
        </div>
      </div>

      <div className="w-80 border-l overflow-auto flex flex-col bg-muted/30">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-8 rounded-full bg-primary" />
            <div>
              <div className="font-medium">Kora</div>
              <div className="text-xs text-muted-foreground">绩效成功顾问</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {MOCK_MESSAGES.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs rounded-lg p-3 ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border"
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t space-y-2">
          <input
            type="text"
            placeholder="询问 Kora ..."
            className="w-full px-3 py-2 border rounded bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground">输入 "@" 以提及现有目标或衡量指标</p>
        </div>
      </div>
    </div>
  )
}
