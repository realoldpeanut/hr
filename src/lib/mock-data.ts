export const MOCK_SESSIONS = [
  {
    id: "sess-2026",
    name: "2026年战略规划",
    status: "in_progress",
    period: "2026年度",
    progress: 65,
    members: ["张总", "李副总", "王经理"],
  },
  {
    id: "sess-2025q4",
    name: "2025Q4季度调整",
    status: "review",
    period: "2025Q4",
    progress: 100,
    members: ["张总", "陈总"],
  },
]

export const MOCK_DIMENSIONS = [
  { id: "macro_trend", name: "宏观趋势", shortName: "外部" },
  { id: "industry", name: "行业分析", shortName: "竞争" },
  { id: "internal", name: "内部能力", shortName: "内部" },
  { id: "customer", name: "客户需求", shortName: "客户" },
  { id: "strategy", name: "战略建议", shortName: "战略" },
]

export const MOCK_ARTIFACTS = [
  { id: "direction", name: "战略方向", desc: "集团战略方向确定" },
  { id: "target", name: "战略目标", desc: "财务与非财务目标定义" },
  { id: "strategy", name: "战略举措", desc: "关键策略与行动计划" },
]

export const MOCK_MESSAGES = [
  {
    id: "msg-1",
    sender: "kora",
    content: "DTC渠道销售业绩），将其与您的"全域渠道与客户体验优化"建立对齐关系。",
    timestamp: "04:08:13 PM",
  },
  {
    id: "msg-2",
    sender: "kora",
    content: "对于智无目标的下属（如李佳慧、蒋欣怡），为您创建级联目标建议。",
    timestamp: "04:08:14 PM",
  },
  {
    id: "msg-3",
    sender: "user",
    content: "同意以上方案",
    timestamp: "04:11:09 PM",
  },
]
