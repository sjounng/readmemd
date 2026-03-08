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
  email: "jwsong0595@hanyang.ac.kr",
};

export const STUDY_INFO = {
  title: "README.md",
  goal: "프론트엔드부터 백엔드, 데이터베이스까지 직접 만들어보는 풀스택 웹 개발 입문",
  target: "웹 개발을 처음 시작하는 분, 어려움을 느끼시는 분",
  format: "구조 설명 + 실습 위주 (9주 과정)",
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
    color: "border-t-violet-500",
  },
  {
    name: "PostgreSQL",
    role: "데이터베이스",
    desc: "관계형 DB. 데이터를 저장하고 조회합니다.",
    color: "border-t-sky-500",
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
    color: "border-t-violet-500",
  },
  {
    role: "데이터베이스",
    metaphor: "냉장고",
    desc: "재료(데이터)를 보관하는 곳",
    tech: "PostgreSQL",
    color: "border-t-sky-500",
  },
];

/* ── Section 2: 개발 환경 ── */

export const ENV_TABS = ["VS Code", "Node.js", "터미널 명령어"];

export const VSCODE_STEPS = [
  { num: 1, title: "폴더 열기", desc: "File → Open Folder로 프로젝트 폴더를 엽니다" },
  { num: 2, title: "터미널 열기", desc: "Ctrl + Shift + ` (백틱)으로 내장 터미널을 엽니다 (mac 기준)" },
  { num: 3, title: "확장 프로그램", desc: "왼쪽 사이드바에서 확장 프로그램 탭을 확인합니다" },
];

export const TERMINAL_COMMANDS_MAC = [
  { cmd: "cd 폴더이름", desc: "해당 폴더로 이동", ex: "cd my-project" },
  { cmd: "cd ..", desc: "상위 폴더로 이동", ex: "cd .." },
  { cmd: "ls", desc: "현재 폴더 파일 목록 확인", ex: "ls" },
  { cmd: "mkdir 이름", desc: "새 폴더 만들기", ex: "mkdir my-project" },
  { cmd: "pwd", desc: "현재 위치 확인", ex: "pwd" },
];

export const TERMINAL_COMMANDS_WIN = [
  { cmd: "cd 폴더이름", desc: "해당 폴더로 이동", ex: "cd my-project" },
  { cmd: "cd ..", desc: "상위 폴더로 이동", ex: "cd .." },
  { cmd: "dir", desc: "현재 폴더 파일 목록 확인", ex: "dir" },
  { cmd: "mkdir 이름", desc: "새 폴더 만들기", ex: "mkdir my-project" },
  { cmd: "cd", desc: "현재 위치 확인 (인수 없이 입력)", ex: "cd" },
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

export const GITHUB_SIGNUP_STEPS = [
  { num: 1, title: "github.com 접속 후 Sign up 클릭" },
  { num: 2, title: "이메일 주소 입력" },
  { num: 3, title: "비밀번호 설정" },
  { num: 4, title: "사용자 이름(username) 설정", desc: "GitHub URL에 표시됩니다. 예: github.com/username" },
  { num: 5, title: "이메일 인증 완료" },
];

export const GH_CLI_AUTH_STEPS = [
  { num: 1, title: "GitHub.com 선택" },
  { num: 2, title: "HTTPS 선택" },
  { num: 3, title: "Authenticate Git with your GitHub credentials? → Y" },
  { num: 4, title: "Login with a web browser 선택" },
  { num: 5, title: "브라우저에서 one-time code 입력 후 Authorize" },
];

export const GITHUB_REPO_STEPS = [
  { num: 1, title: "github.com에 접속 & 로그인" },
  { num: 2, title: "오른쪽 상단 '+' 버튼 → New repository" },
  { num: 3, title: "Repository name 입력", desc: "예: my-first-repo" },
  { num: 4, title: "Public 선택" },
  { num: 5, title: "초기화 옵션 모두 체크 해제", desc: "Add a README file, .gitignore, license 체크하지 않습니다. 로컬에서 직접 올릴 것이기 때문입니다." },
  { num: 6, title: "Create repository 클릭" },
];

export const FIRST_PUSH_STEPS = [
  { cmd: "$ mkdir my-first-repo", desc: "프로젝트 폴더 생성" },
  { cmd: "$ cd my-first-repo", desc: "폴더로 이동" },
  { cmd: "$ git init", desc: "Git 저장소 초기화" },
  { cmd: '$ echo "# My First Repo" > README.md', desc: "README 파일 생성" },
  { cmd: "$ git add README.md", desc: "변경사항 스테이징" },
  { cmd: '$ git commit -m "first commit"', desc: "커밋 생성" },
  { cmd: "$ git remote add origin <URL>", desc: "원격 저장소 연결" },
  { cmd: "$ git push -u origin main", desc: "GitHub에 Push!" },
];

export const GIT_WORKFLOW_ZONES = [
  { title: "Working Directory", sub: "작업 폴더" },
  { title: "Staging Area", sub: "준비 영역" },
  { title: "Repository", sub: "저장소 (Local)" },
];

/* ── Tech Details (각 기술 상세) ── */

export const TECH_DETAILS = [
  {
    name: "Next.js",
    role: "프론트엔드",
    tagline: "React 기반 풀스택 프레임워크",
    accentText: "text-(--accent)",
    borderTop: "border-t-(--accent)",
    calloutType: "tip" as const,
    features: [
      {
        title: "파일 기반 라우팅",
        desc: "app/page.tsx 파일 하나가 페이지 하나입니다. URL 설정 없이 폴더 구조만으로 라우팅이 결정됩니다.",
      },
      {
        title: "서버 컴포넌트 지원",
        desc: "서버에서 데이터를 미리 불러온 뒤 완성된 HTML을 브라우저에 전달합니다. 첫 화면 로딩이 빠릅니다.",
      },
      {
        title: "React 컴포넌트 조립",
        desc: "버튼·카드·헤더 같은 UI 조각(컴포넌트)을 만들고 조립해 화면을 완성합니다. 재사용성이 높습니다.",
      },
    ],
    studyGoal: "로그인 화면, 메인 페이지, 게시글 목록 등 사용자가 실제로 보는 화면(UI)을 직접 만들어봅니다.",
    codeTitle: "프로젝트 폴더 구조",
    codeContent: `my-app/
  └── app/
       ├── page.tsx          →  "/"  (메인 페이지)
       ├── about/
       │    └── page.tsx     →  "/about"
       └── posts/[id]/
            └── page.tsx     →  "/posts/123"`,
  },
  {
    name: "Nest.js",
    role: "백엔드",
    tagline: "TypeScript 기반 서버 프레임워크",
    accentText: "text-violet-500",
    borderTop: "border-t-violet-500",
    calloutType: "tip" as const,
    features: [
      {
        title: "모듈 / 컨트롤러 / 서비스 구조",
        desc: "역할에 따라 코드를 체계적으로 나눠 관리합니다. 프로젝트가 커져도 구조가 흔들리지 않습니다.",
      },
      {
        title: "REST API 개발",
        desc: "GET /posts, POST /login 같은 API 엔드포인트를 만들어 프론트엔드와 통신합니다.",
      },
      {
        title: "TypeScript 기반",
        desc: "타입을 명시해 런타임 오류를 미리 방지합니다. 코드 자동완성도 훨씬 강력해집니다.",
      },
    ],
    studyGoal: "프론트엔드 요청을 받아 데이터를 처리하고, 데이터베이스와 연결하는 API 서버를 만들어봅니다.",
    codeTitle: "폴더 구조",
    codeContent: `src/
  ├── app.module.ts          (앱 루트 모듈)
  ├── users/
  │    ├── users.module.ts
  │    ├── users.controller.ts  ← GET /users, POST /users
  │    └── users.service.ts     ← 비즈니스 로직
  └── posts/
       └── ...`,
  },
  {
    name: "PostgreSQL",
    role: "데이터베이스",
    tagline: "오픈소스 관계형 데이터베이스",
    accentText: "text-sky-500",
    borderTop: "border-t-sky-500",
    calloutType: "tip" as const,
    features: [
      {
        title: "테이블 구조",
        desc: "엑셀 시트처럼 행(Row)과 열(Column)으로 데이터를 체계적으로 저장합니다.",
      },
      {
        title: "SQL 언어",
        desc: "SELECT, INSERT, UPDATE, DELETE 명령어로 데이터를 읽고, 추가하고, 수정하고, 삭제합니다.",
      },
      {
        title: "Prisma ORM 연동",
        desc: "SQL을 직접 쓰지 않고 TypeScript 코드로 DB를 편하게 다룰 수 있도록 도와줍니다.",
      },
    ],
    studyGoal: "회원 정보, 게시글, 댓글 등 서비스의 모든 데이터를 저장하고 조회합니다.",
    codeTitle: "SQL 예시",
    codeContent: `-- 사용자 테이블 생성
CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  username VARCHAR(50),
  email    VARCHAR(100)
);

-- 데이터 조회
SELECT * FROM users WHERE id = 1;`,
  },
] as const;

/* ── Mac / Windows 설치 ── */

export const ENV_OS_TABS = ["Mac", "Windows"];

export const MAC_HOMEBREW_CMD =
  '$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';

export const MAC_HOMEBREW_PATH_CMD =
  `$ (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> ~/.zprofile\n$ eval "$(/opt/homebrew/bin/brew shellenv)"`;

/* ── VS Code 추천 확장 ── */

export const VSCODE_EXTENSIONS = [
  { name: "ESLint", desc: "코드의 문법 오류와 스타일 문제를 실시간으로 감지합니다" },
  { name: "Prettier", desc: "저장할 때마다 코드를 자동으로 정렬해줍니다" },
  { name: "Tailwind CSS IntelliSense", desc: "Tailwind 클래스를 자동완성해줍니다 (나중에 사용)" },
  { name: "GitLens", desc: "각 줄이 언제·누가 수정했는지 인라인으로 확인할 수 있습니다" },
];

/* ── Git 베스트 프랙티스 ── */

export const COMMIT_TYPES = [
  { type: "feat",     desc: "새로운 기능 추가",               color: "text-(--accent)" },
  { type: "fix",      desc: "버그 수정",                      color: "text-red-400" },
  { type: "docs",     desc: "문서 수정 (README 등)",           color: "text-sky-400" },
  { type: "style",    desc: "포맷팅, 세미콜론 등 (기능 무관)", color: "text-violet-400" },
  { type: "refactor", desc: "기능 변경 없는 코드 개선",        color: "text-yellow-400" },
  { type: "chore",    desc: "빌드 설정, 패키지 관리",          color: "text-(--text-muted)" },
];

export const GIT_FLOW_BRANCHES = [
  {
    name: "main",
    role: "배포 브랜치",
    desc: "실제 서비스에 배포되는 안정적인 코드만 존재합니다. 직접 커밋하지 않습니다.",
    color: "border-l-4 border-(--accent)",
    badge: "bg-(--accent)/10 text-(--accent)",
  },
  {
    name: "develop",
    role: "개발 통합 브랜치",
    desc: "다음 배포를 위한 기능들이 모이는 브랜치입니다. feature 브랜치의 기준점입니다.",
    color: "border-l-4 border-violet-500",
    badge: "bg-violet-500/10 text-violet-400",
  },
  {
    name: "feature/*",
    role: "기능 개발 브랜치",
    desc: "새 기능 하나당 브랜치 하나를 만듭니다. develop에서 분기하고 develop으로 병합합니다.",
    color: "border-l-4 border-sky-500",
    badge: "bg-sky-500/10 text-sky-400",
  },
  {
    name: "release/*",
    role: "배포 준비 브랜치",
    desc: "배포 직전 QA·버전 태깅 등을 처리합니다. main과 develop 양쪽에 병합합니다.",
    color: "border-l-4 border-yellow-500",
    badge: "bg-yellow-500/10 text-yellow-400",
  },
  {
    name: "hotfix/*",
    role: "긴급 수정 브랜치",
    desc: "배포 중인 main에서 발생한 버그를 즉시 수정합니다. main과 develop에 병합합니다.",
    color: "border-l-4 border-red-500",
    badge: "bg-red-500/10 text-red-400",
  },
];

export const GITHUB_FLOW_STEPS = [
  { num: 1, title: "브랜치 생성", cmd: "$ git checkout -b feature/login",           desc: "main에서 기능 단위 브랜치를 만듭니다." },
  { num: 2, title: "작업 & 커밋", cmd: '$ git commit -m "feat: 로그인 기능 추가"',   desc: "Conventional Commits 형식으로 커밋합니다." },
  { num: 3, title: "Push",         cmd: "$ git push origin feature/login",            desc: "브랜치를 원격 저장소에 올립니다." },
  { num: 4, title: "PR → Merge",   cmd: null,                                         desc: "GitHub에서 PR 열고 리뷰 후 main에 병합합니다." },
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
