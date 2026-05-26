export const MOCK_SESSIONS = [
  {
    id: "sess-2026",
    name: "2026年战略规划",
    status: "in_progress",
    period: "2026年度",
    progress: 65,
    members: ["张总", "李副总", "王经理", "刘主管"],
  },
  {
    id: "sess-2025q4",
    name: "2025Q4季度调整",
    status: "review",
    period: "2025Q4",
    progress: 100,
    members: ["张总", "陈总"],
  },
  {
    id: "sess-2025",
    name: "2025年战略规划",
    status: "published",
    period: "2025年度",
    progress: 100,
    members: ["张总", "李副总", "王经理"],
  },
  {
    id: "sess-2024",
    name: "2024年战略规划",
    status: "published",
    period: "2024年度",
    progress: 100,
    members: ["张总", "李副总"],
  },
]

export const MOCK_DIMENSIONS = [
  { id: "macro_trend", name: "宏观趋势", shortName: "宏观", status: "completed", owner: "王经理" },
  { id: "industry", name: "行业分析", shortName: "行业", status: "in_progress", owner: "李副总" },
  { id: "internal", name: "内部能力", shortName: "内部", status: "in_progress", owner: "张总" },
  { id: "customer", name: "客户需求", shortName: "客户", status: "not_started", owner: "刘主管" },
  { id: "competitor", name: "竞争格局", shortName: "竞争", status: "not_started", owner: "王经理" },
]

export const MOCK_ARTIFACTS = [
  { id: "direction", name: "定方向", desc: "明确战略方向与愿景", status: "completed" },
  { id: "target", name: "定目标", desc: "设定财务与非财务目标", status: "in_progress" },
  { id: "strategy", name: "定策略", desc: "制定关键策略与举措", status: "not_started" },
]

export const MOCK_MESSAGES = [
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

export const MOCK_VERSIONS = [
  { id: "v3", version: "v3.0", date: "2024-01-15 14:30", author: "张总", status: "current", changes: "更新财务目标" },
  { id: "v2", version: "v2.0", date: "2024-01-10 10:15", author: "李副总", status: "archived", changes: "调整战略方向" },
  { id: "v1", version: "v1.0", date: "2024-01-05 09:00", author: "张总", status: "archived", changes: "初始版本" },
]
