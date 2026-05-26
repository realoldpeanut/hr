export default function VersionsPage() {
  const versions = [
    { id: "v1", name: "初稿 v1.0", date: "2024-01-15", author: "张总" },
    { id: "v2", name: "修订 v1.1", date: "2024-01-18", author: "李副总" },
    { id: "v3", name: "最终稿 v2.0", date: "2024-01-25", author: "张总" },
  ]

  return (
    <div className="h-full overflow-auto p-6">
      <h1 className="text-2xl font-bold mb-6">版本历史与对比</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 bg-card">
          <h2 className="font-semibold mb-3">版本列表</h2>
          <div className="space-y-2">
            {versions.map(v => (
              <div key={v.id} className="border rounded p-3 cursor-pointer hover:bg-muted text-sm">
                <div className="font-medium">{v.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{v.date} · {v.author}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <h2 className="font-semibold mb-3">版本对比</h2>
          <div className="space-y-2 text-sm">
            <div>选择两个版本进行对比</div>
            <div className="mt-4 text-xs text-muted-foreground">
              <div className="text-red-600">- 删除内容</div>
              <div className="text-green-600">+ 新增内容</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
