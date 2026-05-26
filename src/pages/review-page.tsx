export default function ReviewPage() {
  return (
    <div className="h-full overflow-auto p-6">
      <h1 className="text-2xl font-bold mb-6">评审与发布</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 bg-card">
          <h2 className="font-semibold mb-3">评审清单</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" defaultChecked />
              <span>5看分析完成</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" defaultChecked />
              <span>3定产物完整</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>所有参与者确认</span>
            </li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 bg-card">
          <h2 className="font-semibold mb-3">评审动态</h2>
          <div className="space-y-2 text-xs">
            <div className="border-l-2 border-primary pl-3 py-2">
              <div className="font-medium">张总 评论</div>
              <div className="text-muted-foreground">2024-01-26 14:30</div>
              <div className="mt-1">宏观趋势分析需要补充...</div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-card space-y-3">
          <h2 className="font-semibold">操作</h2>
          <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90">
            提交审批
          </button>
          <button className="w-full px-3 py-2 border rounded text-sm hover:bg-muted">
            退回修改
          </button>
          <button className="w-full px-3 py-2 border rounded text-sm hover:bg-muted">
            发布版本
          </button>
        </div>
      </div>
    </div>
  )
}
