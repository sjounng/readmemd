/* ── Week 1 콘텐츠 데이터 ── */

export const WEEK1_TAGS = ["Frontend", "Git", "Github"];

export const WEEK1_TOC = [
  { num: "00", title: "OT", href: "#ot" },
  { num: "01", title: "웹 서비스 이해", href: "#web" },
  { num: "02", title: "개발 환경 세팅", href: "#env" },
  { num: "03", title: "Git 기본 개념", href: "#git" },
  { num: "04", title: "GitHub 첫 Push", href: "#github" },
];

/* ── Section 0: OT ── */

export const MENTOR = {
  name: "송준우",
  department: "정보시스템학과 3학년",
  github: "sjounng",
};

export const STUDY_INFO = {
  title: "README.md",
  goal: "프론트엔드부터 백엔드, 데이터베이스까지 직접 만들어보는 풀스택 웹 개발 입문",
  target: "웹 개발을 처음 시작하는 분",
  format: "이론 설명 + 실습 위주 (8주 과정)",
};

export const TECH_STACK = [
  {
    name: "Next.js",
    role: "프론트엔드",
    desc: "React 기반 풀스택 프레임워크. 화면을 만듭니다.",
    color: "border-t-(--accent)",
  },
  {
    name: "Nest.js",
    role: "백엔드",
    desc: "TypeScript 기반 서버 프레임워크. API를 만듭니다.",
    color: "border-t-emerald-500",
  },
  {
    name: "PostgreSQL",
    role: "데이터베이스",
    desc: "관계형 DB. 데이터를 저장하고 조회합니다.",
    color: "border-t-amber-500",
  },
];

/* ── Section 1: 웹 서비스 ── */

export const REQUEST_FLOW = [
  { label: "사용자", desc: "브라우저에 주소 입력", icon: "user" },
  { label: "프론트엔드", desc: "화면을 보여줌", icon: "monitor" },
  { label: "백엔드", desc: "데이터를 처리", icon: "gear" },
  { label: "데이터베이스", desc: "데이터를 저장/조회", icon: "database" },
] as const;

export const RESTAURANT_METAPHOR = [
  {
    role: "프론트엔드",
    metaphor: "식당의 홀",
    desc: "손님이 보는 메뉴판, 인테리어, 주문 화면",
    tech: "Next.js",
    color: "border-t-(--accent)",
  },
  {
    role: "백엔드",
    metaphor: "식당의 주방",
    desc: "주문을 받아 요리를 만드는 곳",
    tech: "Nest.js",
    color: "border-t-emerald-500",
  },
  {
    role: "데이터베이스",
    metaphor: "냉장고",
    desc: "재료(데이터)를 보관하는 곳",
    tech: "PostgreSQL",
    color: "border-t-amber-500",
  },
];

/* ── Section 2: 개발 환경 ── */

export const ENV_TABS = ["VS Code", "Node.js", "터미널 명령어"];

export const VSCODE_STEPS = [
  { num: 1, title: "폴더 열기", desc: "File → Open Folder로 프로젝트 폴더를 엽니다" },
  { num: 2, title: "터미널 열기", desc: "Ctrl + Shift + ` (백틱)으로 내장 터미널을 엽니다 (mac 기준)" },
  { num: 3, title: "확장 프로그램", desc: "왼쪽 사이드바에서 확장 프로그램 탭을 확인합니다" },
];

export const TERMINAL_COMMANDS = [
  { cmd: "cd 폴더이름", desc: "해당 폴더로 이동", ex: "cd my-project" },
  { cmd: "cd ..", desc: "상위 폴더로 이동", ex: "cd .." },
  { cmd: "ls / dir", desc: "현재 폴더 파일 목록 확인", ex: "ls (Mac) / dir (Win)" },
  { cmd: "mkdir 이름", desc: "새 폴더 만들기", ex: "mkdir my-project" },
  { cmd: "pwd", desc: "현재 위치 확인", ex: "pwd" },
];

/* ── Section 3: Git ── */

export const FILE_VERSION_EXAMPLES = [
  "보고서_최종.docx",
  "보고서_최종_수정.docx",
  "보고서_진짜최종.docx",
  "보고서_진짜최종_v2.docx",
  "보고서_진짜최종_최종_FINAL.docx",
];

export const GIT_BENEFITS = [
  { title: "버전 관리", desc: "모든 변경 이력을 자동으로 기록" },
  { title: "되돌리기", desc: "언제든 이전 버전으로 복원 가능" },
  { title: "협업", desc: "여러 사람이 동시에 작업 가능" },
];

export const GIT_CONCEPT_TABS = ["Repository", "Commit", "Branch"];

export const COMMIT_TIMELINE = [
  { hash: "a1b2c3", msg: "프로젝트 생성", time: "3일 전" },
  { hash: "d4e5f6", msg: "메인 페이지 추가", time: "2일 전" },
  { hash: "g7h8i9", msg: "스타일 적용", time: "1일 전" },
  { hash: "j0k1l2", msg: "버그 수정", time: "오늘" },
];

/* ── Section 4: GitHub ── */

export const GITHUB_REPO_STEPS = [
  { num: 1, title: "github.com에 접속 & 로그인" },
  { num: 2, title: "오른쪽 상단 '+' 버튼 → New repository" },
  { num: 3, title: "Repository name 입력", desc: "예: my-first-repo" },
  { num: 4, title: "Public 선택" },
  { num: 5, title: "Create repository 클릭" },
];

export const FIRST_PUSH_STEPS = [
  { cmd: "mkdir my-first-repo", desc: "프로젝트 폴더 생성" },
  { cmd: "cd my-first-repo", desc: "폴더로 이동" },
  { cmd: "git init", desc: "Git 저장소 초기화" },
  { cmd: 'echo "# My First Repo" > README.md', desc: "README 파일 생성" },
  { cmd: "git add README.md", desc: "변경사항 스테이징" },
  { cmd: 'git commit -m "first commit"', desc: "커밋 생성" },
  { cmd: "git remote add origin <URL>", desc: "원격 저장소 연결" },
  { cmd: "git push -u origin main", desc: "GitHub에 Push!" },
];

export const GIT_WORKFLOW_ZONES = [
  { title: "Working Directory", sub: "작업 폴더" },
  { title: "Staging Area", sub: "준비 영역" },
  { title: "Repository", sub: "저장소 (Local)" },
];

/* ── Summary ── */

export const WEEK1_SUMMARY = [
  "웹 서비스의 구조 (프론트/백엔드/DB)",
  "VS Code와 Node.js 설치",
  "터미널 기본 명령어",
  "Git의 필요성과 핵심 개념",
  "Git 설치 및 초기 설정",
  "GitHub에 첫 Push 성공!",
];
