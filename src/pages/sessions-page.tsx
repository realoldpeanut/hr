import { MOCK_SESSIONS } from "@/lib/mock-data"

export default function SessionsPage() {
  const inProgress = MOCK_SESSIONS.filter(s => s.status === "in_progress")
  const inReview = MOCK_SESSIONS.filter(s => s.status === "review")

  return (
    <div className="h-full overflow-auto">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">战略规划会话</h1>
          <p className="text-muted-foreground">管理您的战略制定和规划工作</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <div className="text-sm font-medium text-muted-foreground">进行中</div>
            <div className="text-3xl font-bold mt-2">{inProgress.length}</div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="text-sm font-medium text-muted-foreground">评审中</div>
            <div className="text-3xl font-bold mt-2">{inReview.length}</div>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <div className="text-sm font-medium text-muted-foreground">已发布</div>
            <div className="text-3xl font-bold mt-2">2</div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">会话列表</h2>
          {MOCK_SESSIONS.map(session => (
            <div key={session.id} className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{session.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{session.period}</p>
                  <div className="flex gap-2 mt-2">
                    {session.members.map(m => (
                      <span key={m} className="text-xs bg-muted px-2 py-1 rounded">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{session.progress}%</div>
                  <div className="w-24 h-2 bg-muted rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${session.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
