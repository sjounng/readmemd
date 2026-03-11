/* ── Week 2 콘텐츠 데이터 ── */

export const WEEK2_TAGS = ["npm", "TypeScript", "React", "Next.js", "Routing"];

export const WEEK2_TOC = [
  { num: "01", title: "npm이란?", href: "#npm" },
  { num: "02", title: "TypeScript 기초", href: "#typescript" },
  { num: "03", title: "React 기초", href: "#react" },
  { num: "04", title: "Tailwind CSS", href: "#tailwind" },
  { num: "05", title: "Next.js 프로젝트 생성", href: "#create" },
  { num: "06", title: "페이지와 라우팅", href: "#routing" },
];

/* ── Section 1: npm ── */

export const NPM_CONCEPT = {
  title: "npm (Node Package Manager)",
  desc: "Node.js와 함께 설치되는 패키지 관리 도구입니다. 다른 사람이 만든 코드(패키지)를 내 프로젝트에 쉽게 가져다 쓸 수 있습니다.",
};

export const NPM_METAPHOR = [
  {
    role: "패키지",
    metaphor: "앱스토어의 앱",
    desc: "미리 만들어진 기능 묶음. 직접 만들 필요 없이 가져다 씁니다.",
    color: "border-t-(--accent)",
  },
  {
    role: "npm",
    metaphor: "앱스토어",
    desc: "수백만 개의 패키지가 등록된 저장소. 설치·삭제·업데이트를 담당합니다.",
    color: "border-t-violet-500",
  },
  {
    role: "package.json",
    metaphor: "설치 목록",
    desc: "내 프로젝트가 사용하는 패키지 목록을 기록하는 파일입니다.",
    color: "border-t-sky-500",
  },
];

export const NPM_COMMANDS = [
  { cmd: "npm install <패키지>",    desc: "패키지 설치",             ex: "npm install react" },
  { cmd: "npm install",             desc: "package.json 기반 일괄 설치", ex: "npm install" },
  { cmd: "npm run <스크립트>",      desc: "스크립트 실행",            ex: "npm run dev" },
  { cmd: "npm uninstall <패키지>",  desc: "패키지 제거",             ex: "npm uninstall react" },
];

/* ── 패키지 매니저 비교 ── */

export const PACKAGE_MANAGERS = [
  {
    name: "npm",
    full: "Node Package Manager",
    badge: "기본",
    badgeColor: "bg-(--accent)/10 text-(--accent)",
    border: "border-t-(--accent)",
    desc: "Node.js에 기본 내장된 패키지 매니저입니다. 별도 설치 없이 바로 사용할 수 있습니다.",
    installCmd: null,
    devCmd: "npm run dev",
    installPkgCmd: "npm install react",
    pros: ["별도 설치 불필요", "가장 널리 사용"],
    cons: ["속도가 상대적으로 느림", "디스크 중복 저장"],
  },
  {
    name: "pnpm",
    full: "Performant npm",
    badge: "권장",
    badgeColor: "bg-violet-500/10 text-violet-400",
    border: "border-t-violet-500",
    desc: "패키지를 하드링크로 공유해 디스크를 절약하고 설치 속도가 빠릅니다. 이 스터디에서 사용합니다.",
    installCmd: "npm install -g pnpm",
    devCmd: "pnpm dev",
    installPkgCmd: "pnpm add react",
    pros: ["설치 속도 빠름", "디스크 공간 절약", "엄격한 의존성 관리"],
    cons: ["별도 설치 필요"],
  },
  {
    name: "yarn",
    full: "Yet Another Resource Negotiator",
    badge: "대안",
    badgeColor: "bg-sky-500/10 text-sky-400",
    border: "border-t-sky-500",
    desc: "Facebook이 만든 패키지 매니저입니다. npm보다 빠르고 안정적인 잠금 파일을 제공합니다.",
    installCmd: "npm install -g yarn",
    devCmd: "yarn dev",
    installPkgCmd: "yarn add react",
    pros: ["빠른 설치", "안정적인 yarn.lock"],
    cons: ["별도 설치 필요", "pnpm 대비 디스크 사용 많음"],
  },
];

/* ── Section 2: TypeScript ── */

export const TS_BASIC_TYPES = [
  { type: "string",   example: 'let name: string = "Alice"',        desc: "문자열" },
  { type: "number",   example: "let age: number = 25",              desc: "숫자" },
  { type: "boolean",  example: "let isLoggedIn: boolean = true",    desc: "참/거짓" },
  { type: "string[]", example: 'let tags: string[] = ["a", "b"]',  desc: "배열" },
  { type: "any",      example: "let data: any = 42",                desc: "타입 검사 해제 (남용 금지)" },
];

export const TS_JS_COMPARE = {
  js: `// JavaScript — 타입 없음
function greet(name) {
  return "Hello, " + name;
}

greet(123); // 오류 없이 실행됨`,
  ts: `// TypeScript — 타입 명시
function greet(name: string): string {
  return "Hello, " + name;
}

greet(123); // 컴파일 오류 → 미리 잡힘`,
};

export const TS_INTERFACE_EXAMPLE = `interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // ? = 선택 필드
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};`;

/* ── Section 3: React ── */

export const REACT_CONCEPT = {
  title: "React",
  desc: "Facebook이 만든 UI 라이브러리입니다. 화면을 '컴포넌트'라는 단위로 쪼개어 만들고 조립합니다. Next.js는 React 위에서 동작합니다.",
};

export const COMPONENT_METAPHOR = [
  {
    label: "레고 블록",
    desc: "버튼, 카드, 헤더 같은 UI 조각 하나하나가 컴포넌트입니다.",
    color: "border-t-(--accent)",
  },
  {
    label: "조립",
    desc: "작은 컴포넌트를 조합해 페이지를 완성합니다. 재사용이 쉽습니다.",
    color: "border-t-violet-500",
  },
  {
    label: "상태 관리",
    desc: "컴포넌트는 자신만의 상태(state)를 가질 수 있고, 변경되면 화면이 자동으로 업데이트됩니다.",
    color: "border-t-sky-500",
  },
];

export const JSX_EXAMPLE = `// JSX — JavaScript 안에 HTML처럼 작성
export default function Hello() {
  return (
    <div className="p-4">
      <h1>안녕하세요!</h1>
      <p>React 컴포넌트입니다.</p>
    </div>
  );
}`;

export const PROPS_EXAMPLE = `// Props — 부모가 자식에게 데이터를 전달
interface CardProps {
  title: string;
  desc: string;
}

function Card({ title, desc }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}

// 사용
<Card title="React" desc="UI 라이브러리" />`;

export const STATE_EXAMPLE = `"use client"; // 상태를 쓰려면 클라이언트 컴포넌트로 선언

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0); // 초기값 0

  return (
    <div>
      <p>클릭 횟수: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`;

/* ── Section 4: Tailwind CSS ── */

export const TAILWIND_VS_CSS = {
  css: `/* 기존 방식: CSS 파일 따로 작성 */
.button {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
}`,
  tailwind: `{/* Tailwind: JSX 안에서 바로 */}
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
  버튼
</button>`,
};

export const TAILWIND_CLASSES = [
  { cls: "flex",            desc: "Flexbox 적용",         category: "레이아웃" },
  { cls: "items-center",    desc: "세로 가운데 정렬",      category: "레이아웃" },
  { cls: "justify-between", desc: "양 끝 정렬",            category: "레이아웃" },
  { cls: "gap-4",           desc: "자식 간 간격 1rem",     category: "레이아웃" },
  { cls: "p-4",             desc: "안쪽 여백 사방 1rem",   category: "간격" },
  { cls: "px-4 / py-2",     desc: "좌우 / 상하 여백",      category: "간격" },
  { cls: "mt-4 / mb-4",     desc: "위 / 아래 바깥 여백",   category: "간격" },
  { cls: "text-sm / text-xl",desc: "글자 크기 조절",       category: "텍스트" },
  { cls: "font-bold",       desc: "굵은 글씨",             category: "텍스트" },
  { cls: "text-gray-500",   desc: "글자색 지정",           category: "텍스트" },
  { cls: "bg-blue-500",     desc: "배경색 지정",           category: "색상" },
  { cls: "rounded-lg",      desc: "모서리 둥글게",         category: "색상" },
  { cls: "border",          desc: "테두리",                category: "색상" },
  { cls: "w-full / h-screen",desc: "너비/높이 지정",       category: "크기" },
];

export const TAILWIND_RESPONSIVE_EXAMPLE = `{/* sm: 640px+ / md: 768px+ / lg: 1024px+ */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  ...
</div>`;

export const TAILWIND_STATE_EXAMPLES = [
  { cls: "hover:bg-blue-600",    desc: "마우스 올렸을 때" },
  { cls: "focus:outline-none",   desc: "포커스 됐을 때" },
  { cls: "disabled:opacity-50",  desc: "비활성화 상태" },
  { cls: "dark:bg-gray-800",     desc: "다크 모드" },
];

/* ── Section 5: Next.js 프로젝트 생성 ── */

export const CREATE_NEXTAPP_STEPS = [
  { num: 1, title: "터미널에서 아래 명령어 실행", cmd: "$ npx create-next-app@latest 프로젝트이름 --typescript --tailwind", desc: "프로젝트이름 자리에 원하는 이름을 넣으세요. (예: my-portfolio, blog 등)" },
  { num: 2, title: "설정 질문에 답하기 (기본값 Enter)", desc: "ESLint, React Compiler, src 폴더, App Router 등을 물어봅니다." },
  { num: 3, title: "프로젝트 폴더로 이동 (필수!)", cmd: "$ cd 프로젝트이름", desc: "생성된 폴더 안으로 들어가야 명령어가 동작합니다." },
  { num: 4, title: "개발 서버 실행", cmd: "$ npm run dev" },
  { num: 5, title: "브라우저에서 확인", desc: "http://localhost:3000 으로 접속합니다." },
];

export const CREATE_OPTIONS = [
  { question: "Would you like to use ESLint or Biome?",          answer: "ESLint" },
  { question: "Would you like to use the React Compiler?",       answer: "No" },
  { question: "Would you like to use `src/` directory?",         answer: "Yes" },
  { question: "Would you like to use App Router?",               answer: "Yes" },
  { question: "Would you like to customize the import alias?",   answer: "No (기본값)" },
];

export const NEXTAPP_FOLDER_STRUCTURE = `프로젝트이름/
├── src/
│   ├── app/
│   │   ├── layout.tsx       ← 공통 레이아웃 (Navbar, Footer 등)
│   │   ├── page.tsx         ← "/" 메인 페이지
│   │   ├── globals.css      ← 전역 스타일
│   │   └── posts/
│   │       ├── page.tsx     ← "/posts" 목록 페이지
│   │       └── [id]/
│   │           └── page.tsx ← "/posts/1" 상세 페이지
│   ├── data/
│   │   └── posts.ts         ← 게시글 데이터
│   └── components/          ← 직접 만드는 폴더
│       ├── Navbar.tsx       ← 상단 네비게이션
│       └── Footer.tsx       ← 하단 푸터
├── public/                  ← 이미지 등 정적 파일
├── package.json             ← 패키지 목록
└── next.config.ts           ← Next.js 설정`;

/* ── Section 3: 라우팅 ── */

export const ROUTING_EXAMPLES = [
  { file: "app/page.tsx",              url: "/",              desc: "메인 페이지" },
  { file: "app/about/page.tsx",        url: "/about",         desc: "소개 페이지" },
  { file: "app/posts/page.tsx",        url: "/posts",         desc: "게시글 목록" },
  { file: "app/posts/[id]/page.tsx",   url: "/posts/123",     desc: "게시글 상세 (동적 라우트)" },
];

export const WEEK2_SUMMARY = [
  "npm의 역할과 기본 명령어 (pnpm, yarn 비교)",
  "TypeScript — 타입으로 버그를 미리 잡는다",
  "React — 컴포넌트, Props, State 핵심 개념",
  "Tailwind CSS — 클래스 이름으로 바로 스타일링",
  "create-next-app으로 프로젝트 생성",
  "App Router 파일 기반 라우팅",
];
