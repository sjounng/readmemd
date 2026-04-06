/* ── Week 5 콘텐츠 데이터 ── */

export const WEEK5_TAGS = ["Task Breakdown", "Workflow", "Code Review", "Problem Solving"];

export const WEEK5_TOC = [
  { num: "01", title: "작업 분해", href: "#breakdown" },
  { num: "02", title: "작업 배정 & 일정 관리", href: "#assignment" },
  { num: "03", title: "협업 워크플로우", href: "#workflow" },
  { num: "04", title: "문제 해결 방법론", href: "#problem-solving" },
];

/* ══════════════════════════════════════════
   Section 1: 작업 분해
   ══════════════════════════════════════════ */

export const BREAKDOWN_CONCEPT = {
  title: "요구사항 → 작업으로 쪼개기",
  desc: "정의서에 적힌 기능 하나는 곧바로 개발할 수 있는 단위가 아닙니다. \"시간표 CRUD\"같은 큰 기능을 실제로 코딩에 착수할 수 있는 크기까지 쪼개는 것이 작업 분해입니다.",
};

export const BREAKDOWN_LEVELS = [
  {
    level: "Epic",
    desc: "프로젝트의 큰 목표 단위",
    example: "시간표 관리 기능",
    size: "수 주",
  },
  {
    level: "Feature",
    desc: "정의서의 기능 ID(F-01, F-02...) 단위",
    example: "F-01: 시간표 생성",
    size: "수 일",
  },
  {
    level: "Task",
    desc: "한 사람이 하루 이내에 끝낼 수 있는 작업",
    example: "시간표 생성 폼 UI 구현",
    size: "수 시간",
  },
];

export const PM_TOOLS = [
  {
    name: "GitHub Issues + Projects",
    desc: "코드 저장소와 작업 관리가 한 곳에 통합됩니다. Issue를 만들고 칸반 보드로 관리하며, PR과 연결하면 머지 시 자동으로 닫힙니다.",
    good: "이미 GitHub을 쓰고 있으니 추가 도구 없이 바로 시작 가능",
    link: "github.com → 저장소 → Projects 탭",
    category: "추천",
  },
  {
    name: "Notion",
    desc: "문서, 칸반 보드, 테이블, 캘린더 등을 자유롭게 조합할 수 있습니다. 정의서, 회의록, 작업 관리를 한 워크스페이스에서 관리할 수 있습니다.",
    good: "문서와 작업 관리를 한 곳에서 하고 싶을 때",
    link: "notion.so",
    category: "추천",
  },
  {
    name: "Linear",
    desc: "개발팀에 특화된 프로젝트 관리 도구입니다. 빠른 단축키, GitHub 연동, 자동화 기능이 강점입니다. 스타트업과 개발팀에서 많이 사용합니다.",
    good: "체계적인 이슈 관리와 스프린트 운영이 필요할 때",
    link: "linear.app",
    category: "실무",
  },
  {
    name: "Jira",
    desc: "가장 널리 쓰이는 프로젝트 관리 도구입니다. 스프린트, 백로그, 번다운 차트 등 애자일 기능이 풍부합니다. 대기업과 큰 팀에서 많이 사용합니다.",
    good: "대규모 팀에서 체계적인 프로세스가 필요할 때",
    link: "atlassian.com/software/jira",
    category: "실무",
  },
  {
    name: "Figma",
    desc: "디자인 도구이지만, 디자이너와 협업하거나 와이어프레임을 만들 때 필수입니다. 피그마에서 디자인을 보고 CSS 값을 바로 확인할 수 있습니다.",
    good: "디자인 시안이 있거나, 와이어프레임을 직접 그릴 때",
    link: "figma.com",
    category: "디자인",
  },
  {
    name: "Slack / Discord",
    desc: "실시간 커뮤니케이션 도구입니다. 채널을 나눠서 주제별 대화를 관리하고, GitHub 알림을 연동하면 PR/Issue 알림을 자동으로 받을 수 있습니다.",
    good: "팀 커뮤니케이션과 알림 통합",
    link: "slack.com / discord.com",
    category: "소통",
  },
];

export const GOOD_TASK_CHECKLIST = [
  "한 문장으로 \"무엇을 만드는지\" 설명할 수 있는가?",
  "완료 기준이 명확한가? (\"~가 보인다\", \"~를 클릭하면 ~된다\")",
  "한 사람이 하루 안에 끝낼 수 있는 크기인가?",
  "다른 작업에 의존하지 않고 독립적으로 시작할 수 있는가?",
];

/* ══════════════════════════════════════════
   Section 2: 작업 배정 & 일정 관리
   ══════════════════════════════════════════ */

export const PROGRESS_TRACKING_METHODS = [
  {
    method: "GitHub Issues",
    desc: "작업(Task)마다 Issue를 생성하고, 담당자를 지정합니다. PR과 연결하면 머지 시 자동으로 닫힙니다.",
    pros: "코드와 작업이 한 곳에서 관리됨",
  },
  {
    method: "GitHub Projects (칸반 보드)",
    desc: "To Do → In Progress → Done 칸반 보드로 전체 진행 상황을 한눈에 봅니다.",
    pros: "누가 뭘 하고 있는지 시각적으로 파악 가능",
  },
  {
    method: "간단한 스프레드시트",
    desc: "구글 시트에 작업 목록, 담당자, 상태, 기한을 적어 공유합니다.",
    pros: "도구 학습 없이 바로 시작 가능",
  },
];

export const KANBAN_COLUMNS = [
  {
    name: "To Do",
    desc: "아직 시작하지 않은 작업",
    items: ["T-09: 시간표 상세 페이지", "T-10: 로그인 폼 UI"],
  },
  {
    name: "In Progress",
    desc: "현재 진행 중인 작업",
    items: ["T-02: 과목 입력 폼 UI (김철수)", "T-07: Header 컴포넌트 (홍길동)"],
  },
  {
    name: "In Review",
    desc: "PR을 올리고 리뷰 대기 중",
    items: ["T-01: 시간표 생성 페이지 라우트"],
  },
  {
    name: "Done",
    desc: "머지 완료된 작업",
    items: ["T-08: Footer 컴포넌트", "T-00: 프로젝트 초기 셋업"],
  },
];

export const MILESTONE_EXAMPLE = [
  { week: "5주차", goal: "공통 레이아웃 + 각자 담당 페이지 빈 틀 완성", check: "모든 페이지 라우트가 동작하는가?" },
  { week: "6주차", goal: "각 페이지 UI 완성 (Mock 데이터 기반)", check: "Mock 데이터로 화면이 보이는가?" },
  { week: "7주차", goal: "페이지 간 연결 + 인터랙션 완성", check: "페이지 이동, 폼 제출이 동작하는가?" },
  { week: "8주차", goal: "마무리 + 발표 준비", check: "전체 시나리오를 처음부터 끝까지 돌릴 수 있는가?" },
];

/* ══════════════════════════════════════════
   Section 3: 협업 워크플로우
   ══════════════════════════════════════════ */

export const PR_WORKFLOW_STEPS = [
  {
    step: "1",
    title: "Issue 확인",
    desc: "칸반 보드에서 자신에게 배정된 작업(Issue)을 In Progress로 옮깁니다.",
  },
  {
    step: "2",
    title: "브랜치 생성",
    desc: "develop에서 feature/기능명 브랜치를 만듭니다. 브랜치 이름만 보고 무슨 작업인지 알 수 있어야 합니다.",
  },
  {
    step: "3",
    title: "작업 & 커밋",
    desc: "작은 단위로 자주 커밋합니다. 커밋 메시지는 \"무엇을 했는지\"를 적습니다.",
  },
  {
    step: "4",
    title: "PR 생성",
    desc: "작업이 끝나면 develop으로 PR을 만듭니다. 무엇을 만들었는지, 어떻게 확인하면 되는지를 적습니다.",
  },
  {
    step: "5",
    title: "코드 리뷰",
    desc: "팀원이 코드를 보고 질문하거나 개선점을 남깁니다. 리뷰어는 24시간 이내에 확인합니다.",
  },
  {
    step: "6",
    title: "머지 & Issue 닫기",
    desc: "리뷰가 통과되면 머지합니다. 연결된 Issue는 자동 또는 수동으로 닫습니다.",
  },
];

export const PR_TEMPLATE = {
  title: "PR 작성 가이드",
  sections: [
    { heading: "무엇을 했나요?", desc: "이 PR에서 구현한 내용을 1~3줄로 요약" },
    { heading: "어떻게 확인하나요?", desc: "리뷰어가 동작을 확인할 수 있는 방법 (어느 페이지에서 뭘 클릭하면 됨)" },
    { heading: "관련 Issue", desc: "Closes #이슈번호 를 적으면 머지 시 자동으로 닫힘" },
    { heading: "스크린샷", desc: "UI 변경이 있다면 전후 스크린샷 첨부" },
  ],
};

export const CODE_REVIEW_DO = [
  { do: "구체적으로 지적하기", example: "\"이 부분에서 사용자가 빈 값을 입력하면 어떻게 되나요?\"" },
  { do: "대안을 함께 제시하기", example: "\"이렇게 하면 어떨까요? [제안 코드/방법]\"" },
  { do: "좋은 점도 언급하기", example: "\"이 부분 깔끔하게 분리하셨네요!\"" },
  { do: "질문 형태로 쓰기", example: "\"여기서 이 방식을 선택한 이유가 있나요?\" (명령이 아니라 대화)" },
];

export const CODE_REVIEW_DONT = [
  { dont: "\"이거 왜 이렇게 했어?\"", better: "\"이 부분이 어떤 의도인지 궁금합니다\"" },
  { dont: "\"다시 해\"", better: "\"이 부분을 이렇게 바꾸면 더 좋을 것 같아요\"" },
  { dont: "리뷰 없이 바로 머지", better: "최소 1명의 승인(Approve) 후 머지" },
  { dont: "3일 뒤에 리뷰", better: "PR이 올라오면 24시간 이내에 확인" },
];

/* ══════════════════════════════════════════
   Section 4: 문제 해결 방법론
   ══════════════════════════════════════════ */

export const PROBLEM_CATEGORIES = [
  {
    category: "모르겠는 것",
    desc: "어떻게 구현하는지 방법 자체를 모를 때",
    approach: [
      "공식 문서를 먼저 검색한다 (Next.js Docs, MDN 등)",
      "키워드를 바꿔가며 검색한다 (영어 키워드가 결과가 많음)",
      "AI에게 물어본다 (구체적으로: 어떤 상황에서 뭘 하고 싶은지)",
      "15분 이상 혼자 삽질하면 팀원에게 물어본다",
    ],
  },
  {
    category: "에러가 나는 것",
    desc: "코드를 썼는데 에러 메시지가 나올 때",
    approach: [
      "에러 메시지를 끝까지 읽는다 (파일명:줄번호가 핵심)",
      "에러 메시지를 그대로 복사해서 검색한다",
      "최근에 변경한 코드를 되돌려보며 원인을 좁힌다",
      "console.log로 중간값을 확인한다",
    ],
  },
  {
    category: "안 되는 것",
    desc: "에러는 안 나는데 기대한 대로 동작하지 않을 때",
    approach: [
      "\"기대하는 동작\"과 \"실제 동작\"을 글로 정리한다",
      "데이터가 올바른지 console.log로 확인한다",
      "가장 단순한 형태로 줄여서 테스트한다",
      "팀원에게 설명하다 보면 스스로 원인을 발견하기도 한다 (러버덕 디버깅)",
    ],
  },
];

export const FIFTEEN_MIN_RULE = {
  title: "15분 규칙",
  desc: "15분 동안 혼자 해결을 시도합니다. 그래도 안 되면 반드시 팀원이나 멘토에게 질문합니다. 혼자 2시간 끙끙대는 것보다 5분 질문이 프로젝트 전체에 이롭습니다.",
  steps: [
    { time: "0~5분", action: "에러 메시지를 읽고 검색한다" },
    { time: "5~10분", action: "관련 코드를 다시 읽고 가설을 세운다" },
    { time: "10~15분", action: "가설을 테스트한다 (console.log, 코드 수정 등)" },
    { time: "15분 초과", action: "질문한다. 이때 시도한 것을 함께 공유한다" },
  ],
};

export const GOOD_QUESTION_FORMAT = [
  { part: "상황", desc: "지금 무엇을 하고 있는지", example: "시간표 생성 페이지에서 과목 추가 폼을 만들고 있습니다" },
  { part: "기대", desc: "어떻게 되어야 하는지", example: "추가 버튼을 누르면 아래 목록에 과목이 나타나야 합니다" },
  { part: "현상", desc: "실제로 어떻게 되는지", example: "버튼을 눌러도 목록이 비어 있습니다" },
  { part: "시도", desc: "이미 해본 것은 무엇인지", example: "console.log로 확인하니 state는 업데이트되는데 화면이 안 바뀝니다" },
];

export const BLOCKER_HANDLING = [
  {
    situation: "팀원의 작업이 안 끝나서 내 작업을 시작할 수 없다",
    solution: "Mock 데이터나 임시 컴포넌트를 만들어 독립적으로 진행합니다. 나중에 실제 컴포넌트로 교체하면 됩니다.",
  },
  {
    situation: "기획이 애매해서 어떻게 만들어야 할지 모르겠다",
    solution: "일단 가장 단순한 형태로 만들고 PR에서 팀원과 논의합니다. 완벽한 기획을 기다리는 것보다 빠른 피드백이 낫습니다.",
  },
  {
    situation: "머지 충돌이 계속 나서 무섭다",
    solution: "develop을 자주 pull 받으세요. 충돌은 빨리 해결할수록 작고, 미룰수록 커집니다.",
  },
  {
    situation: "내 코드가 다른 사람의 코드를 망가뜨릴까 걱정된다",
    solution: "그래서 브랜치를 쓰는 것입니다. feature 브랜치에서 작업하면 develop을 직접 건드리지 않으니 안전합니다.",
  },
];

/* ── Summary ── */

export const WEEK5_SUMMARY = [
  "기능 하나를 하루 이내에 끝낼 수 있는 Task 크기로 분해한다",
  "칸반 보드로 전체 진행 상황을 시각화하고 매주 점검한다",
  "PR → 코드 리뷰 → 머지 흐름을 지키고, 리뷰는 24시간 이내에 한다",
  "15분 규칙: 혼자 15분 시도 후 안 되면 상황-기대-현상-시도를 정리해서 질문한다",
];

/* ══════════════════════════════════════════
   중간 프로젝트 안내
   ══════════════════════════════════════════ */

export const MIDTERM_INFO = {
  title: "중간 프로젝트 제출 안내",
  desc: "이번 수업이 중간고사 전 마지막 수업입니다. 지금까지 작업한 프론트엔드 프로젝트를 GitHub에 올리고 레포지토리를 공유해주세요.",
};

export const MIDTERM_SUBMIT_STEPS = [
  { step: "1", title: "코드 정리 & Push", desc: "현재까지 작업한 코드를 모두 커밋하고 GitHub에 Push합니다. 작업 중인 브랜치가 있다면 develop 또는 main에 머지하세요." },
  { step: "2", title: "README 작성", desc: "프로젝트 이름, 팀원, 기술 스택, 현재까지 구현된 기능을 간단히 적어주세요." },
  { step: "3", title: "레포지토리 공유", desc: "GitHub 레포지토리 링크를 제출합니다. Private 레포라면 협업자(Collaborator)로 초대해주세요." },
];

export const MIDTERM_CHECKLIST = [
  "GitHub에 최신 코드가 Push되어 있는가?",
  "pnpm install → pnpm dev로 로컬에서 실행이 되는가?",
  "정의서에 적은 페이지 라우트가 생성되어 있는가?",
  "최소 1개 이상의 페이지에 UI가 구현되어 있는가?",
  "README에 프로젝트 설명이 적혀 있는가?",
];

export const MIDTERM_EVALUATION = [
  { criteria: "프로젝트 구조", desc: "Next.js 폴더 구조가 정의서의 페이지 설계와 일치하는가" },
  { criteria: "코드 품질", desc: "컴포넌트 분리, 타입 정의 등 수업에서 배운 패턴이 적용되었는가" },
  { criteria: "협업 흔적", desc: "커밋 히스토리, 브랜치, PR 등 팀 협업의 흔적이 보이는가" },
  { criteria: "완성도", desc: "Mock 데이터 기반으로 화면이 동작하는가" },
];

/* ══════════════════════════════════════════
   6주차 이후 백엔드 안내
   ══════════════════════════════════════════ */

export const BACKEND_PREVIEW = {
  title: "6주차부터: 백엔드 시작",
  desc: "중간고사 이후에는 프론트엔드에서 사용하던 Mock 데이터를 실제 백엔드 서버로 교체합니다. 데이터를 저장하고, 불러오고, 수정하고, 삭제하는 기능을 직접 만들어봅니다.",
};

export const BACKEND_TOPICS = [
  {
    topic: "API란?",
    desc: "프론트엔드와 백엔드가 데이터를 주고받는 약속. 지금은 Mock 데이터를 import하고 있지만, API를 통해 서버에서 데이터를 가져오게 됩니다.",
  },
  {
    topic: "데이터베이스",
    desc: "데이터를 영구적으로 저장하는 곳. 지금은 새로고침하면 데이터가 사라지지만, DB에 저장하면 유지됩니다.",
  },
  {
    topic: "CRUD",
    desc: "Create(생성), Read(조회), Update(수정), Delete(삭제). 거의 모든 웹 서비스의 핵심 동작입니다.",
  },
  {
    topic: "인증 & 로그인",
    desc: "사용자를 구분하고, 로그인 상태를 유지하는 방법. 로그인 페이지를 만들었다면 실제로 동작하게 만들 수 있습니다.",
  },
];

export const FRONTEND_VS_BACKEND = [
  { aspect: "역할", frontend: "사용자에게 화면을 보여줌", backend: "데이터를 저장하고 처리함" },
  { aspect: "실행 위치", frontend: "브라우저 (사용자의 컴퓨터)", backend: "서버 (원격 컴퓨터)" },
  { aspect: "데이터", frontend: "Mock 데이터, 화면에 표시", backend: "데이터베이스에서 읽고 쓰기" },
  { aspect: "지금까지", frontend: "페이지, 컴포넌트, 스타일링", backend: "아직 안 배움" },
  { aspect: "앞으로", frontend: "API 호출로 데이터 연동", backend: "API 만들기, DB 연결" },
];
