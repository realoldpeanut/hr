export default function WorkbenchPage() {
  return (
    <div className="h-full overflow-auto p-6">
      <h1 className="text-3xl font-bold mb-4">战略制定工作台</h1>
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-card">
          <h2 className="font-semibold mb-3">5看分析维度</h2>
          <div className="grid grid-cols-5 gap-3">
            {["宏观趋势", "行业分析", "内部能力", "客户需求", "战略建议"].map(d => (
              <div key={d} className="border rounded p-3 text-center cursor-pointer hover:bg-muted">
                <div className="text-sm font-medium">{d}</div>
                <div className="text-xs text-muted-foreground mt-2">编辑</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-card">
          <h2 className="font-semibold mb-3">3定产物</h2>
          <div className="grid grid-cols-3 gap-3">
            {["定方向", "定目标", "定策略"].map(a => (
              <div key={a} className="border rounded p-3 text-center cursor-pointer hover:bg-muted">
                <div className="text-sm font-medium">{a}</div>
                <div className="text-xs text-muted-foreground mt-2">编辑</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
