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

export interface RecognizedSkillSummary {
  skill_name: string
  skill_category: string
  suggested_level: SkillLevel
  is_new?: boolean
  delta?: "up" | "down"
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
  recognition_summary?: string
  recognized_skills?: RecognizedSkillSummary[]
}

export const employeeProfile = {
  name: "林知远",
  employee_no: "E-2231",
  job_title: "高级产品经理",
  job_family: "产品条线",
  department: "支付业务部 · 交易产品组",
  level: "P6",
  manager: "王立",
  location: "上海",
  tenure_years: 4.2,
  profile_generated_at: "2026-04-18 14:32",
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
  {
    questionnaire_id: "q-2026-q1-001",
    questionnaire_name: "2026 Q1 标准化技能问卷",
    publisher_org: "人才发展中心 · COE",
    applicable_population: "全员",
    due_date: "2026-01-31",
    employee_task_status: "submitted",
    progress: 100,
    estimated_minutes: 20,
    submitted_at: "2026-01-27 10:14",
    generated_skill_count: 9,
    recognition_summary:
      "本次作答主要体现出你在产品需求分析与系统架构设计上的稳定能力，新增 2 项领导力相关技能证据。",
    recognized_skills: [
      {
        skill_name: "产品需求分析",
        skill_category: "产品能力",
        suggested_level: "L4",
        delta: "up",
      },
      {
        skill_name: "用户访谈与调研",
        skill_category: "产品能力",
        suggested_level: "L3",
      },
      {
        skill_name: "系统架构设计",
        skill_category: "技术能力",
        suggested_level: "L4",
      },
      {
        skill_name: "A/B 实验设计",
        skill_category: "技术能力",
        suggested_level: "L2",
      },
      {
        skill_name: "跨团队沟通",
        skill_category: "通用能力",
        suggested_level: "L4",
        delta: "up",
      },
      {
        skill_name: "目标拆解",
        skill_category: "通用能力",
        suggested_level: "L3",
      },
      {
        skill_name: "人员辅导",
        skill_category: "领导力",
        suggested_level: "L2",
        is_new: true,
      },
      {
        skill_name: "反馈与一对一",
        skill_category: "领导力",
        suggested_level: "L2",
        is_new: true,
      },
      {
        skill_name: "AI 工具应用",
        skill_category: "新技术",
        suggested_level: "L3",
      },
    ],
  },
  {
    questionnaire_id: "q-2025-h2-ai",
    questionnaire_name: "AI 工具应用情况调研",
    publisher_org: "技术委员会",
    applicable_population: "研发 & 产品",
    due_date: "2025-12-20",
    employee_task_status: "submitted",
    progress: 100,
    estimated_minutes: 10,
    submitted_at: "2025-12-15 21:48",
    generated_skill_count: 3,
    recognition_summary:
      "你在日常研发中已深度使用 AI 辅助编码与文档生成，Prompt 设计与结果验证能力突出。",
    recognized_skills: [
      {
        skill_name: "Prompt 设计",
        skill_category: "新技术",
        suggested_level: "L3",
        is_new: true,
      },
      {
        skill_name: "AI 辅助编码",
        skill_category: "技术能力",
        suggested_level: "L3",
      },
      {
        skill_name: "AI 结果验证",
        skill_category: "通用能力",
        suggested_level: "L2",
        is_new: true,
      },
    ],
  },
  {
    questionnaire_id: "q-2025-h2-001",
    questionnaire_name: "2025 H2 标准化技能问卷",
    publisher_org: "人才发展中心 · COE",
    applicable_population: "全员",
    due_date: "2025-08-15",
    employee_task_status: "submitted",
    progress: 100,
    estimated_minutes: 22,
    submitted_at: "2025-08-09 16:02",
    generated_skill_count: 11,
    recognition_summary:
      "整体能力稳定提升，产品与技术类技能均进入熟练区间，跨团队协作证据显著增加。",
    recognized_skills: [
      {
        skill_name: "产品需求分析",
        skill_category: "产品能力",
        suggested_level: "L3",
      },
      {
        skill_name: "竞品分析",
        skill_category: "产品能力",
        suggested_level: "L3",
      },
      {
        skill_name: "路线图规划",
        skill_category: "产品能力",
        suggested_level: "L2",
      },
      {
        skill_name: "系统架构设计",
        skill_category: "技术能力",
        suggested_level: "L3",
        delta: "up",
      },
      {
        skill_name: "服务端开发",
        skill_category: "技术能力",
        suggested_level: "L3",
      },
      {
        skill_name: "性能优化",
        skill_category: "技术能力",
        suggested_level: "L2",
      },
      {
        skill_name: "数据分析",
        skill_category: "数据能力",
        suggested_level: "L3",
      },
      {
        skill_name: "指标体系设计",
        skill_category: "数据能力",
        suggested_level: "L2",
        is_new: true,
      },
      {
        skill_name: "跨团队沟通",
        skill_category: "通用能力",
        suggested_level: "L3",
      },
      {
        skill_name: "会议主持",
        skill_category: "通用能力",
        suggested_level: "L2",
      },
      {
        skill_name: "技术文档写作",
        skill_category: "通用能力",
        suggested_level: "L3",
      },
    ],
  },
  {
    questionnaire_id: "q-2025-q2-collab",
    questionnaire_name: "跨团队协作能力 pulse 调研",
    publisher_org: "HRBP · 产品线",
    applicable_population: "产品条线",
    due_date: "2025-06-10",
    employee_task_status: "overdue",
    progress: 35,
    estimated_minutes: 8,
  },
  {
    questionnaire_id: "q-2025-h1-001",
    questionnaire_name: "2025 H1 标准化技能问卷",
    publisher_org: "人才发展中心 · COE",
    applicable_population: "全员",
    due_date: "2025-02-28",
    employee_task_status: "submitted",
    progress: 100,
    estimated_minutes: 20,
    submitted_at: "2025-02-20 09:36",
    generated_skill_count: 8,
    recognition_summary:
      "产品与工程类能力处于熟练区间，跨团队协作已有较多实证，建议在数据类技能补充更多证据。",
    recognized_skills: [
      {
        skill_name: "产品需求分析",
        skill_category: "产品能力",
        suggested_level: "L3",
      },
      {
        skill_name: "用户访谈与调研",
        skill_category: "产品能力",
        suggested_level: "L2",
      },
      {
        skill_name: "服务端开发",
        skill_category: "技术能力",
        suggested_level: "L3",
      },
      {
        skill_name: "前端开发",
        skill_category: "技术能力",
        suggested_level: "L2",
      },
      {
        skill_name: "数据库设计",
        skill_category: "技术能力",
        suggested_level: "L2",
      },
      {
        skill_name: "跨团队沟通",
        skill_category: "通用能力",
        suggested_level: "L3",
      },
      {
        skill_name: "项目推进",
        skill_category: "通用能力",
        suggested_level: "L3",
      },
      {
        skill_name: "技术文档写作",
        skill_category: "通用能力",
        suggested_level: "L2",
      },
    ],
  },
  {
    questionnaire_id: "q-2024-h2-001",
    questionnaire_name: "2024 H2 标准化技能问卷",
    publisher_org: "人才发展中心 · COE",
    applicable_population: "全员",
    due_date: "2024-08-15",
    employee_task_status: "closed",
    progress: 100,
    estimated_minutes: 20,
    submitted_at: "2024-08-10 14:20",
    generated_skill_count: 7,
    recognition_summary:
      "以技术开发类证据为主，产品与协作类能力已形成基础。",
    recognized_skills: [
      {
        skill_name: "服务端开发",
        skill_category: "技术能力",
        suggested_level: "L2",
      },
      {
        skill_name: "前端开发",
        skill_category: "技术能力",
        suggested_level: "L2",
      },
      {
        skill_name: "接口设计",
        skill_category: "技术能力",
        suggested_level: "L2",
      },
      {
        skill_name: "产品需求分析",
        skill_category: "产品能力",
        suggested_level: "L2",
      },
      {
        skill_name: "跨团队沟通",
        skill_category: "通用能力",
        suggested_level: "L2",
      },
      {
        skill_name: "技术文档写作",
        skill_category: "通用能力",
        suggested_level: "L2",
      },
      {
        skill_name: "版本管理",
        skill_category: "通用能力",
        suggested_level: "L2",
      },
    ],
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
    manager_comment:
      "在跨团队协作中展现出清晰的需求拆解能力，可独立负责复杂业务域。",
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
        evidence_summary: "主导需求澄清与验收标准定义，覆盖 6 条业务线",
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
        evidence_summary: "自评为 L3，情景题得分 82/100",
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
    ai_summary: "学习记录与项目证据较强，建议提交经理确认为 L3。",
    evidence: [
      {
        evidence_id: "ev-002-1",
        skill_id: "sk-002",
        source_type: "learning",
        source_name: "SQL 高阶实践（LMS）",
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
    ai_summary: "仅来自问卷自评，缺少项目或绩效佐证。建议补充 1 个相关项目经历。",
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
    description: "识别到 7 项技能，其中 4 项已合并到现有档案",
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
    description: "关联 3 项技能：产品需求分析、技术方案评审、跨团队协作",
    time: "2026-03-20 09:31",
  },
  {
    id: "t-4",
    type: "learning" as EvidenceSourceType,
    title: "完成「SQL 高阶实践」课程",
    description: "36 学时 · 关联技能：数据分析与洞察",
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

export type QuestionType =
  | "skill_level"
  | "single_choice"
  | "multi_choice"
  | "likert"
  | "text"

export interface LevelOption {
  value: SkillLevel
  label: string
  description: string
}

export interface QuestionOption {
  value: string
  label: string
  hint?: string
}

export interface Question {
  id: string
  type: QuestionType
  title: string
  subtitle?: string
  required?: boolean
  skill_name?: string
  levels?: LevelOption[]
  options?: QuestionOption[]
  scale?: { min: number; max: number; minLabel: string; maxLabel: string }
  placeholder?: string
  maxLength?: number
}

export interface QuestionnaireSection {
  id: string
  title: string
  description?: string
  questions: Question[]
}

export interface QuestionnaireContent {
  questionnaire_id: string
  questionnaire_name: string
  publisher_org: string
  due_date: string
  estimated_minutes: number
  instructions: string[]
  sections: QuestionnaireSection[]
}

const standardLevels: LevelOption[] = [
  {
    value: "L1",
    label: "L1 · 入门",
    description: "了解概念与基本术语，可在指导下完成简单任务。",
  },
  {
    value: "L2",
    label: "L2 · 基础",
    description: "能独立完成常规任务，遇到复杂问题需他人协助。",
  },
  {
    value: "L3",
    label: "L3 · 熟练",
    description: "可独立承担中等复杂度工作，偶尔需要专家把关。",
  },
  {
    value: "L4",
    label: "L4 · 精通",
    description: "能主导复杂项目，指导他人并识别非显性风险。",
  },
  {
    value: "L5",
    label: "L5 · 专家",
    description: "业务/技术领域意见领袖，可定义标准、引领创新。",
  },
]

export const questionnaireContent: QuestionnaireContent = {
  questionnaire_id: "q-2026-q2-001",
  questionnaire_name: "2026 Q2 产品与技术岗位标准化技能问卷",
  publisher_org: "人才发展中心 · COE",
  due_date: "2026-04-30",
  estimated_minutes: 18,
  instructions: [
    "请根据最近 6 个月的真实工作情况作答，作答结果将作为技能档案证据之一。",
    "所有作答自动保存，可随时关闭页面，下次进入从当前题目继续。",
    "等级自评将与简历、项目、绩效等来源交叉验证，存在差异时会提示补充证据。",
  ],
  sections: [
    {
      id: "s-1",
      title: "产品与需求能力",
      description: "评估你在需求发现、拆解与交付方面的实际水平。",
      questions: [
        {
          id: "q-1",
          type: "skill_level",
          title: "请评估你在「产品需求分析」方面的当前水平",
          subtitle: "结合最近完成的两个项目进行判断，而不是最高水平。",
          required: true,
          skill_name: "产品需求分析",
          levels: standardLevels,
        },
        {
          id: "q-2",
          type: "multi_choice",
          title: "最近 6 个月你主要承担了哪些需求类型？",
          subtitle: "可多选，至少选择 1 项。",
          required: true,
          options: [
            { value: "business", label: "业务流程类需求" },
            { value: "platform", label: "平台 / 基础设施类需求" },
            { value: "data", label: "数据与报表类需求" },
            { value: "ai", label: "AI / 智能化类需求" },
            { value: "compliance", label: "合规与风险类需求" },
          ],
        },
        {
          id: "q-3",
          type: "text",
          title: "请举一个最有代表性的需求分析案例",
          subtitle: "简要描述背景、你的做法和结果，200 字以内。",
          placeholder:
            "例：在支付重构项目中，我梳理了 12 个上下游系统的调用链，产出需求文档 3 份，推动交付提前 2 周上线……",
          maxLength: 200,
        },
      ],
    },
    {
      id: "s-2",
      title: "系统���计与架构",
      description: "评估你在技术方案设计、架构评审中的参与深度。",
      questions: [
        {
          id: "q-4",
          type: "skill_level",
          title: "请评估你在「系统架构设计」方面的当前水平",
          required: true,
          skill_name: "系统架构设计",
          levels: standardLevels,
        },
        {
          id: "q-5",
          type: "likert",
          title: "在最近的项目中，你主导架构方案设计的频率？",
          required: true,
          scale: { min: 1, max: 5, minLabel: "从未", maxLabel: "每个项目" },
        },
        {
          id: "q-6",
          type: "single_choice",
          title: "你在架构评审中最常承担的角色？",
          required: true,
          options: [
            { value: "owner", label: "方案主导人", hint: "负责出方案并答辩" },
            { value: "reviewer", label: "评审专家", hint: "评估他人方案" },
            { value: "contributor", label: "协同贡献者", hint: "提出局部优化" },
            { value: "observer", label: "参与学习", hint: "以学习观察为主" },
          ],
        },
      ],
    },
    {
      id: "s-3",
      title: "跨团队协作与影响力",
      questions: [
        {
          id: "q-7",
          type: "multi_choice",
          title: "你在过去半年推动过以下哪些跨团队事项？",
          options: [
            { value: "align", label: "跨部门目标对齐" },
            { value: "conflict", label: "解决跨团队冲突" },
            { value: "standard", label: "制定跨团队协作规范" },
            { value: "onboarding", label: "新成员融入与带教" },
            { value: "none", label: "以上皆未涉及" },
          ],
        },
        {
          id: "q-8",
          type: "likert",
          title: "你在跨团队沟通中的主动性如何？",
          scale: { min: 1, max: 5, minLabel: "被动响应", maxLabel: "持续引领" },
        },
      ],
    },
    {
      id: "s-4",
      title: "AI 与新技术应用",
      description: "可选板块，便于系统识别你在新兴技术上的经验。",
      questions: [
        {
          id: "q-9",
          type: "skill_level",
          title: "请评估你在「AI 工具应用」方面的当前水平",
          skill_name: "AI 工具应用",
          levels: standardLevels,
        },
        {
          id: "q-10",
          type: "text",
          title: "你希望在 AI / 新技术方向上获得怎样的成长机会？",
          placeholder: "例：希望参与 AI Agent 产品化项目，系统学习 RAG 落地经验……",
          maxLength: 150,
        },
      ],
    },
  ],
}

export const aiTips = [
  {
    id: "ai-1",
    type: "gap" as const,
    text: "「A/B 实验设计」仅有问卷自评，建议补充 1 个相关项目经历提升证据强度。",
  },
  {
    id: "ai-2",
    type: "conflict" as const,
    text: "「产品需求分析」在问卷中评为 L3，但项目与经理评估为 L4，存在轻微冲突。",
  },
  {
    id: "ai-3",
    type: "next" as const,
    text: "当前有 5 项技能已具备提交条件，可一次性发起经理认定。",
  },
]
