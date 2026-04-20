export type SkillStatus =
  | "generated"
  | "supported"
  | "pending_manager"
  | "confirmed"
  | "needs_evidence"
  | "stale"

export type SkillLevel = "L1" | "L2" | "L3" | "L4" | "L5"

export type EvidenceSourceType =
  | "questionnaire"
  | "resume"
  | "performance"
  | "project"
  | "learning"
  | "manager"

export interface SkillEvidence {
  evidence_id: string
  skill_id: string
  source_type: EvidenceSourceType
  source_name: string
  suggested_level: SkillLevel
  evidence_summary: string
  event_time: string
  status: "active" | "expired" | "pending"
  confidence_score: number
}

export interface SkillSummary {
  skill_id: string
  skill_name: string
  skill_category: string
  current_level: SkillLevel
  status: SkillStatus
  confidence_score: number
  source_count: number
  last_updated_at: string
  manager_confirmed_flag: boolean
  conflict?: boolean
  ai_summary?: string
  manager_comment?: string
  evidence: SkillEvidence[]
}

export interface QuestionnaireTask {
  questionnaire_id: string
  questionnaire_name: string
  publisher_org: string
  applicable_population: string
  due_date: string
  employee_task_status:
    | "not_started"
    | "in_progress"
    | "submitted"
    | "overdue"
    | "closed"
  progress: number
  estimated_minutes: number
  submitted_at?: string
  generated_skill_count?: number
}

export const kpi = {
  completeness: 68,
  confirmed: 12,
  pendingManager: 5,
  pendingQuestionnaires: 2,
  lowEvidence: 4,
  lastUpdated: "2026-04-18 14:32",
  totalSkills: 24,
}

export const questionnaireTasks: QuestionnaireTask[] = [
  {
    questionnaire_id: "q-2026-q2-001",
    questionnaire_name: "2026 Q2 产品与技术岗位标准化技能问卷",
    publisher_org: "人才发展中心 · COE",
    applicable_population: "产品与技术条线",
    due_date: "2026-04-30",
    employee_task_status: "in_progress",
    progress: 42,
    estimated_minutes: 18,
  },
  {
    questionnaire_id: "q-2026-q2-leadership",
    questionnaire_name: "管理胜任力快速自评（试点）",
    publisher_org: "组织与领导力 COE",
    applicable_population: "P6 及以上",
    due_date: "2026-05-10",
    employee_task_status: "not_started",
    progress: 0,
    estimated_minutes: 12,
  },
]

export const skills: SkillSummary[] = [
  {
    skill_id: "sk-001",
    skill_name: "产品需求分析",
    skill_category: "产品能力",
    current_level: "L4",
    status: "confirmed",
    confidence_score: 92,
    source_count: 4,
    last_updated_at: "2026-04-12",
    manager_confirmed_flag: true,
    ai_summary:
      "多个项目与绩效评语共同支撑。在「支付重构」项目中独立完成需求澄清，表现为 L4 级。",
    manager_comment: "在跨团队协作中展现出清晰的需求拆解能力,可独立负责复杂业务域。",
    evidence: [
      {
        evidence_id: "ev-001-1",
        skill_id: "sk-001",
        source_type: "performance",
        source_name: "2025 H2 绩效评估",
        suggested_level: "L4",
        evidence_summary: "需求梳理能力获得直线经理 A+ 评价",
        event_time: "2026-01-20",
        status: "active",
        confidence_score: 0.9,
      },
      {
        evidence_id: "ev-001-2",
        skill_id: "sk-001",
        source_type: "project",
        source_name: "支付系统重构",
        suggested_level: "L4",
        evidence_summary: "主导需求澄清与验收标准定义,覆盖 6 条业务线",
        event_time: "2025-11-05",
        status: "active",
        confidence_score: 0.88,
      },
      {
        evidence_id: "ev-001-3",
        skill_id: "sk-001",
        source_type: "manager",
        source_name: "直线经理 · 王立",
        suggested_level: "L4",
        evidence_summary: "经理确认为 L4",
        event_time: "2026-03-15",
        status: "active",
        confidence_score: 1,
      },
      {
        evidence_id: "ev-001-4",
        skill_id: "sk-001",
        source_type: "questionnaire",
        source_name: "2026 Q1 标准化问卷",
        suggested_level: "L3",
        evidence_summary: "自评为 L3,情景题得分 82/100",
        event_time: "2026-02-08",
        status: "active",
        confidence_score: 0.7,
      },
    ],
  },
  {
    skill_id: "sk-002",
    skill_name: "数据分析与洞察",
    skill_category: "数据能力",
    current_level: "L3",
    status: "pending_manager",
    confidence_score: 78,
    source_count: 3,
    last_updated_at: "2026-04-15",
    manager_confirmed_flag: false,
    ai_summary: "学习记录与项目证据较强,建议提交经理确认为 L3。",
    evidence: [
      {
        evidence_id: "ev-002-1",
        skill_id: "sk-002",
        source_type: "learning",
        source_name: "SQL 高阶实践(LMS)",
        suggested_level: "L3",
        evidence_summary: "完成进阶课程 36 学时",
        event_time: "2026-03-02",
        status: "active",
        confidence_score: 0.75,
      },
      {
        evidence_id: "ev-002-2",
        skill_id: "sk-002",
        source_type: "project",
        source_name: "用户增长归因分析",
        suggested_level: "L3",
        evidence_summary: "独立完成漏斗与归因模型",
        event_time: "2026-01-18",
        status: "active",
        confidence_score: 0.8,
      },
      {
        evidence_id: "ev-002-3",
        skill_id: "sk-002",
        source_type: "questionnaire",
        source_name: "2026 Q1 标准化问卷",
        suggested_level: "L3",
        evidence_summary: "情景题得分 74/100",
        event_time: "2026-02-08",
        status: "active",
        confidence_score: 0.72,
      },
    ],
  },
  {
    skill_id: "sk-003",
    skill_name: "跨团队协作",
    skill_category: "通用能力",
    current_level: "L4",
    status: "confirmed",
    confidence_score: 88,
    source_count: 3,
    last_updated_at: "2026-03-28",
    manager_confirmed_flag: true,
    evidence: [],
  },
  {
    skill_id: "sk-004",
    skill_name: "A/B 实验设计",
    skill_category: "数据能力",
    current_level: "L2",
    status: "needs_evidence",
    confidence_score: 42,
    source_count: 1,
    last_updated_at: "2026-02-08",
    manager_confirmed_flag: false,
    conflict: true,
    ai_summary: "仅来自问卷自评,缺少项目或绩效佐证。建议补充 1 个相关项目经历。",
    evidence: [],
  },
  {
    skill_id: "sk-005",
    skill_name: "用户访谈与研究",
    skill_category: "产品能力",
    current_level: "L3",
    status: "supported",
    confidence_score: 70,
    source_count: 2,
    last_updated_at: "2026-04-02",
    manager_confirmed_flag: false,
    evidence: [],
  },
  {
    skill_id: "sk-006",
    skill_name: "技术方案评审",
    skill_category: "技术能力",
    current_level: "L3",
    status: "pending_manager",
    confidence_score: 74,
    source_count: 3,
    last_updated_at: "2026-04-10",
    manager_confirmed_flag: false,
    evidence: [],
  },
  {
    skill_id: "sk-007",
    skill_name: "商业化与定价",
    skill_category: "业务能力",
    current_level: "L2",
    status: "generated",
    confidence_score: 55,
    source_count: 1,
    last_updated_at: "2026-04-18",
    manager_confirmed_flag: false,
    evidence: [],
  },
  {
    skill_id: "sk-008",
    skill_name: "演示与表达",
    skill_category: "通用能力",
    current_level: "L3",
    status: "stale",
    confidence_score: 60,
    source_count: 2,
    last_updated_at: "2025-09-10",
    manager_confirmed_flag: true,
    evidence: [],
  },
  {
    skill_id: "sk-009",
    skill_name: "需求优先级管理",
    skill_category: "产品能力",
    current_level: "L4",
    status: "supported",
    confidence_score: 82,
    source_count: 3,
    last_updated_at: "2026-04-05",
    manager_confirmed_flag: false,
    evidence: [],
  },
  {
    skill_id: "sk-010",
    skill_name: "敏捷项目管理",
    skill_category: "项目管理",
    current_level: "L3",
    status: "needs_evidence",
    confidence_score: 48,
    source_count: 1,
    last_updated_at: "2026-03-22",
    manager_confirmed_flag: false,
    evidence: [],
  },
]

export const timelineEvents = [
  {
    id: "t-1",
    type: "questionnaire" as EvidenceSourceType,
    title: "完成「2026 Q1 标准化技能问卷」",
    description: "识别到 7 项技能,其中 4 项已合并到现有档案",
    time: "2026-02-08 16:22",
  },
  {
    id: "t-2",
    type: "manager" as EvidenceSourceType,
    title: "经理确认「产品需求分析」为 L4",
    description: "直线经理 · 王立",
    time: "2026-03-15 10:04",
  },
  {
    id: "t-3",
    type: "project" as EvidenceSourceType,
    title: "新增项目「支付系统重构」",
    description: "关联 3 项技能:产品需求分析、技术方案评审、跨团队协作",
    time: "2026-03-20 09:31",
  },
  {
    id: "t-4",
    type: "learning" as EvidenceSourceType,
    title: "完成「SQL 高阶实践」课程",
    description: "36 学时 · 关联技能:数据分析与洞察",
    time: "2026-03-02 21:15",
  },
  {
    id: "t-5",
    type: "performance" as EvidenceSourceType,
    title: "同步 2025 H2 绩效结果",
    description: "新增 2 项胜任力标签",
    time: "2026-01-20 11:00",
  },
  {
    id: "t-6",
    type: "resume" as EvidenceSourceType,
    title: "简历重新解析完成",
    description: "识别 3 段职业经历、5 项技能关键词",
    time: "2025-12-18 14:08",
  },
]

export const sourceStats = {
  questionnaire: {
    activeCount: 2,
    historyCount: 6,
    lastCompleted: "2026-02-08",
    recognizedSkills: 7,
  },
  resume: {
    uploaded: true,
    lastUploaded: "2025-12-18",
    parseStatus: "success" as const,
    recognizedSkills: 5,
    fileName: "Resume_ZhangLe_2025.pdf",
  },
  performance: {
    syncedCycles: 4,
    latestCycle: "2025 H2",
    mappedSkills: 6,
    competencyTags: ["需求拆解", "跨团队协作", "结果导向", "体系化思考"],
  },
  project: {
    totalProjects: 7,
    keyProjects: 3,
    linkedSkills: 11,
  },
  learning: {
    completedCourses: 14,
    activeCertificates: 3,
    expiringSoon: 1,
  },
  manager: {
    pending: 5,
    confirmed: 12,
    returned: 1,
    lastSubmittedAt: "2026-04-03",
  },
}

export const aiTips = [
  {
    id: "ai-1",
    type: "gap" as const,
    text: "「A/B 实验设计」仅有问卷自评,建议补充 1 个相关项目经历提升证据强度。",
  },
  {
    id: "ai-2",
    type: "conflict" as const,
    text: "「产品需求分析」在问卷中评为 L3,但项目与经理评估为 L4,存在轻微冲突。",
  },
  {
    id: "ai-3",
    type: "next" as const,
    text: "当前有 5 项技能已具备提交条件,可一次性发起经理认定。",
  },
]
