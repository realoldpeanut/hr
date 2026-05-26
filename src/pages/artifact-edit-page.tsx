export default function ArtifactEditPage() {
  return (
    <div className="h-full overflow-auto p-6">
      <h1 className="text-2xl font-bold mb-6">产物编辑：定目标</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 bg-card space-y-4">
          <h2 className="text-lg font-semibold">定方向</h2>
          <textarea
            className="w-full h-32 p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="输入战略方向..."
          />
        </div>
        <div className="border rounded-lg p-6 bg-card space-y-4">
          <h2 className="text-lg font-semibold">定目标</h2>
          <textarea
            className="w-full h-32 p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="输入战略目标..."
          />
        </div>
        <div className="col-span-2 border rounded-lg p-6 bg-card space-y-4">
          <h2 className="text-lg font-semibold">定策略</h2>
          <textarea
            className="w-full h-32 p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="输入战略举措..."
          />
        </div>
      </div>
    </div>
  )
}
