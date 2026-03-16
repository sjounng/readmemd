"use client";

import { useState } from "react";
import {
  Card,
  CodeBlock,
  Callout,
  StepItem,
  WeekHero,
  Tag,
  SlidePresentation,
} from "@/components";
import {
  WEEK2_TAGS,
  WEEK2_TOC,
  NODEJS_CONCEPT,
  NODEJS_WHY,
  NODEJS_FLOW,
  NODEJS_CHECK_COMMANDS,
  NPM_CONCEPT,
  NPM_METAPHOR,
  NPM_COMMANDS,
  PACKAGE_MANAGERS,
  TS_BASIC_TYPES,
  TS_JS_COMPARE,
  TS_INTERFACE_EXAMPLE,
  REACT_CONCEPT,
  REACT_WHY_PROBLEM,
  REACT_WHY_SOLUTION,
  REACT_WHY_POINTS,
  COMPONENT_METAPHOR,
  COMPONENT_STRUCTURE,
  COMPONENT_COMPOSITION,
  JSX_EXAMPLE,
  JSX_RULES,
  JSX_EXPRESSION_EXAMPLES,
  PROPS_STEP_BY_STEP,
  PROPS_ANALOGY,
  STATE_EXAMPLE,
  STATE_SYNTAX,
  STATE_EXAMPLES,
  STATE_TOGGLE_EXAMPLE,
  CSS_WHAT_IS,
  CSS_PROBLEMS,
  TAILWIND_VS_CSS,
  TAILWIND_BENEFITS,
  TAILWIND_LAYOUT_FLEX,
  TAILWIND_LAYOUT_GRID,
  TAILWIND_FLEX_OPTIONS,
  TAILWIND_SPACING_DIAGRAM,
  TAILWIND_SIZE_SCALE,
  TAILWIND_CLASSES,
  TAILWIND_RESPONSIVE_EXAMPLE,
  TAILWIND_STATE_EXAMPLES,
  CREATE_NEXTAPP_STEPS,
  CREATE_OPTIONS,
  NEXTAPP_FOLDER_STRUCTURE,
  ROUTING_EXAMPLES,
  WEEK2_SUMMARY,
} from "@/constants/week2";

function ChapterTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span className="text-8xl md:text-9xl font-extrabold text-(--accent) font-mono mb-6">{num}</span>
      <h2 className="text-5xl md:text-7xl font-bold text-center">{title}</h2>
    </div>
  );
}

/* ── 라이브 프리뷰 브라우저 프레임 ── */
function LivePreview({ children, url = "localhost:3000" }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-300 bg-white flex flex-col h-full">
      <div className="bg-gray-100 border-b border-gray-200 px-3 py-2 flex items-center gap-2 shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 ml-2 bg-white rounded-md border border-gray-200 px-3 py-0.5">
          <span className="text-gray-400 text-xs font-mono">{url}</span>
        </div>
      </div>
      <div className="flex-1 p-5 overflow-auto">{children}</div>
    </div>
  );
}

/* ── 코드 + 프리뷰 나란히 ── */
function CodeWithPreview({ code, children, title, previewUrl }: {
  code: string;
  children: React.ReactNode;
  title?: string;
  previewUrl?: string;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col min-h-0">
        {title && <p className="text-xl font-semibold text-(--text-muted) mb-2">{title}</p>}
        <div className="flex-1 min-h-0 overflow-auto">
          <CodeBlock>{code}</CodeBlock>
        </div>
      </div>
      <div className="flex flex-col min-h-0">
        <p className="text-xl font-semibold text-(--accent) mb-2">실행 결과</p>
        <div className="flex-1 min-h-0">
          <LivePreview url={previewUrl}>{children}</LivePreview>
        </div>
      </div>
    </div>
  );
}

/* ── 인터랙티브 데모 컴포넌트들 ── */
function CounterDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="text-black">
      <p className="text-lg mb-3">클릭 횟수: <strong>{count}</strong></p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-black text-white px-5 py-2 rounded-lg text-base hover:bg-gray-800 transition-colors"
      >
        +1
      </button>
    </div>
  );
}

function ToggleDemo() {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="text-black">
      <p className="text-lg mb-3">상태: <strong>{isOn ? "켜짐" : "꺼짐"}</strong></p>
      <button
        onClick={() => setIsOn(!isOn)}
        className={`px-5 py-2 rounded-lg text-base transition-colors ${
          isOn ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {isOn ? "끄기" : "켜기"}
      </button>
    </div>
  );
}

/* ── 파일 트리 노드 ── */
interface TreeNode {
  name: string;
  path?: string;
  children?: TreeNode[];
}

/* Step 1: 기본 페이지 구조 (posts 없음) */
const TREE_STEP1: TreeNode[] = [
  {
    name: "src",
    children: [
      {
        name: "app",
        children: [
          { name: "layout.tsx", path: "layout" },
          { name: "page.tsx", path: "page" },
          { name: "globals.css", path: "globals" },
        ],
      },
      {
        name: "components",
        children: [
          { name: "Navbar.tsx", path: "navbar" },
          { name: "Footer.tsx", path: "footer" },
        ],
      },
    ],
  },
  { name: "public" },
  { name: "package.json", path: "package" },
  { name: "next.config.ts" },
];

/* Step 2: 목록 페이지 추가 */
const TREE_STEP2: TreeNode[] = [
  {
    name: "src",
    children: [
      {
        name: "app",
        children: [
          { name: "layout.tsx", path: "layout" },
          { name: "page.tsx", path: "page" },
          { name: "globals.css", path: "globals" },
          {
            name: "posts",
            children: [
              { name: "page.tsx", path: "posts" },
            ],
          },
        ],
      },
      {
        name: "data",
        children: [
          { name: "posts.ts", path: "postsData" },
        ],
      },
      {
        name: "components",
        children: [
          { name: "Navbar.tsx", path: "navbar" },
          { name: "Footer.tsx", path: "footer" },
        ],
      },
    ],
  },
  { name: "public" },
  { name: "package.json", path: "package" },
  { name: "next.config.ts" },
];

/* Step 3: 상세 페이지 추가 */
const TREE_STEP3: TreeNode[] = [
  {
    name: "src",
    children: [
      {
        name: "app",
        children: [
          { name: "layout.tsx", path: "layout" },
          { name: "page.tsx", path: "page" },
          { name: "globals.css", path: "globals" },
          {
            name: "posts",
            children: [
              { name: "page.tsx", path: "posts" },
              {
                name: "[id]",
                children: [
                  { name: "page.tsx", path: "postDetail" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "data",
        children: [
          { name: "posts.ts", path: "postsData" },
        ],
      },
      {
        name: "components",
        children: [
          { name: "Navbar.tsx", path: "navbar" },
          { name: "Footer.tsx", path: "footer" },
        ],
      },
    ],
  },
  { name: "public" },
  { name: "package.json", path: "package" },
  { name: "next.config.ts" },
];

const FILE_CONTENTS: Record<string, { lang: string; code: string; desc: string }> = {
  layout: {
    lang: "tsx",
    desc: "모든 페이지를 감싸는 공통 레이아웃. Navbar와 Footer를 여기에 넣으면 모든 페이지에 자동 적용됩니다.",
    code: `import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "내 사이트",
  description: "내 첫 번째 Next.js 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}`,
  },
  page: {
    lang: "tsx",
    desc: '"/" 경로의 메인 페이지. layout.tsx의 {children} 자리에 이 내용이 들어갑니다.',
    code: `export default function Home() {
  return (
    <div>
      {/* Hero 섹션 */}
      <section className="text-center py-20 border-b">
        <h1 className="text-5xl font-bold mb-4">
          안녕하세요
        </h1>
        <p className="text-gray-500 mb-6">
          내 첫 번째 Next.js 페이지입니다.
        </p>
        <button className="bg-black text-white
          px-6 py-2 rounded hover:bg-gray-800">
          시작하기
        </button>
      </section>

      {/* 카드 섹션 */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold mb-8">
          Main Content
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-6
            text-center">
            <h3 className="font-bold mb-2">카드 1</h3>
            <p className="text-sm text-gray-500">
              설명을 입력하세요
            </p>
          </div>
          <div className="border rounded-lg p-6
            text-center">
            <h3 className="font-bold mb-2">카드 2</h3>
            <p className="text-sm text-gray-500">
              설명을 입력하세요
            </p>
          </div>
          <div className="border rounded-lg p-6
            text-center">
            <h3 className="font-bold mb-2">카드 3</h3>
            <p className="text-sm text-gray-500">
              설명을 입력하세요
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}`,
  },
  globals: {
    lang: "css",
    desc: "전역 스타일 파일. Tailwind CSS 지시문과 커스텀 CSS를 작성합니다.",
    code: `@import "tailwindcss";`,
  },
  navbar: {
    lang: "tsx",
    desc: "상단 네비게이션 바 컴포넌트. layout.tsx에서 불러와 모든 페이지에 표시됩니다.",
    code: `import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b px-6 py-4
      grid grid-cols-3 items-center">
      <span className="font-bold text-xl">
        Navbar
      </span>
      <div className="flex gap-6 justify-center">
        <Link href="/">메인</Link>
        <Link href="/posts">목록</Link>
      </div>
      <div className="flex justify-end">
        <button className="border rounded
          px-4 py-1 text-sm hover:bg-gray-100">
          로그인
        </button>
      </div>
    </nav>
  );
}`,
  },
  footer: {
    lang: "tsx",
    desc: "하단 푸터 컴포넌트. layout.tsx에서 불러와 모든 페이지 하단에 표시됩니다.",
    code: `export default function Footer() {
  return (
    <footer className="border-t px-6 py-6
      text-center text-sm text-gray-500">
      © 2026 내 사이트. All rights reserved.
    </footer>
  );
}`,
  },
  postsData: {
    lang: "ts",
    desc: "게시글 데이터를 관리하는 파일. 목록과 상세 페이지에서 함께 사용합니다.",
    code: `export interface Post {
  id: number;
  title: string;
  desc: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "첫 번째 글",
    desc: "Next.js를 시작했습니다.",
    content: "Next.js는 React 기반의 풀스택 프레임워크입니다. 서버 컴포넌트, 파일 기반 라우팅 등 다양한 기능을 제공합니다.",
  },
  {
    id: 2,
    title: "두 번째 글",
    desc: "Tailwind CSS로 스타일링하기",
    content: "Tailwind CSS는 유틸리티 클래스 기반의 CSS 프레임워크입니다. 클래스 이름만으로 빠르게 스타일링할 수 있습니다.",
  },
  {
    id: 3,
    title: "세 번째 글",
    desc: "컴포넌트를 만들어봅시다",
    content: "React 컴포넌트는 UI를 재사용 가능한 조각으로 나눈 것입니다. props로 데이터를 전달하고 조합할 수 있습니다.",
  },
];`,
  },
  posts: {
    lang: "tsx",
    desc: '"/posts" 경로의 목록 페이지. 데이터 파일에서 글 목록을 가져와 보여줍니다.',
    code: `import Link from "next/link";
import { posts } from "@/data/posts";

export default function PostsPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-8">
        목록
      </h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={\`/posts/\${post.id}\`}
            className="block border rounded-lg p-6
              hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold
              mb-2">
              {post.title}
            </h2>
            <p className="text-gray-500">
              {post.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}`,
  },
  postDetail: {
    lang: "tsx",
    desc: '"/posts/[id]" 동적 라우트. URL의 id에 해당하는 글을 찾아 보여줍니다.',
    code: `import Link from "next/link";
import { posts } from "@/data/posts";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find(
    (p) => p.id === Number(id)
  );

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-16
        px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          글을 찾을 수 없습니다
        </h1>
        <Link href="/posts"
          className="text-blue-500 underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <Link href="/posts"
        className="text-gray-500
          hover:text-black mb-6 inline-block">
        ← 목록으로
      </Link>
      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>
      <p className="text-gray-500 mb-8">
        {post.desc}
      </p>
      <div className="prose">
        <p>{post.content}</p>
      </div>
    </div>
  );
}`,
  },
  package: {
    lang: "json",
    desc: "프로젝트의 패키지 목록과 스크립트를 관리하는 파일입니다.",
    code: `{
  "name": "my-app",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`,
  },
};

/* ── Step 1 전용: 목록 링크 없는 Navbar ── */
const NAVBAR_STEP1 = {
  lang: "tsx",
  desc: "상단 네비게이션 바 컴포넌트. layout.tsx에서 불러와 모든 페이지에 표시됩니다.",
  code: `import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b px-6 py-4
      grid grid-cols-3 items-center">
      <span className="font-bold text-xl">
        Navbar
      </span>
      <div className="flex gap-6 justify-center">
        <Link href="/">메인</Link>
      </div>
      <div className="flex justify-end">
        <button className="border rounded
          px-4 py-1 text-sm hover:bg-gray-100">
          로그인
        </button>
      </div>
    </nav>
  );
}`,
};

/* ── git 상태 ── */
type GitStatus = "new" | "modified";
interface FileStatusEntry {
  status: GitStatus;
  lines?: number[]; // 1-based, 생략 시 전체 (new 파일)
}
type FileStatusMap = Record<string, FileStatusEntry>;

const GIT_COLORS: Record<GitStatus, string> = {
  new: "#73c991",
  modified: "#e2c08d",
};
const GIT_BADGES: Record<GitStatus, string> = {
  new: "U",
  modified: "M",
};

function getFolderStatus(node: TreeNode, fileStatus: FileStatusMap): GitStatus | null {
  if (node.path && fileStatus[node.path]) return fileStatus[node.path].status;
  if (!node.children) return null;
  for (const child of node.children) {
    const s = getFolderStatus(child, fileStatus);
    if (s) return s;
  }
  return null;
}

/* ── 구문 강조 ── */
interface Token { text: string; color: string }

function highlightLine(line: string): Token[] {
  const tokens: Token[] = [];
  const rules: [RegExp, string][] = [
    [/\/\/.*/, "#6a9955"],                                           // 주석
    [/\/\*[\s\S]*?\*\//, "#6a9955"],                                 // 블록 주석
    [/\{\/\*.*?\*\/\}/, "#6a9955"],                                  // JSX 주석
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/, "#ce9178"], // 문자열
    [/\b(import|export|from|default|as|async|await)\b/, "#c586c0"],  // import 키워드
    [/\b(const|let|var|function|return|if|else|switch|case|break|for|of|in|new|throw|typeof|void)\b/, "#569cd6"], // 키워드
    [/\b(interface|type|enum|extends|implements|readonly)\b/, "#569cd6"], // TS 키워드
    [/\b(string|number|boolean|null|undefined|true|false|void|any|never|Promise)\b/, "#4ec9b0"], // 타입
    [/\b(React|Metadata|Link|Post)\b/, "#4ec9b0"],                   // 커스텀 타입
    [/\b\d+\b/, "#b5cea8"],                                          // 숫자
    [/<\/?[A-Z]\w*/, "#4ec9b0"],                                     // 컴포넌트 태그
    [/<\/?(?:div|span|nav|main|html|body|section|button|footer|header|h[1-6]|p|a|pre|code|img|ul|li)\b/, "#569cd6"], // HTML 태그
    [/\/>/, "#808080"],                                              // 닫기 태그
    [/[{}()\[\]]/, "#ffd700"],                                       // 괄호
    [/className/, "#92d1e7"],                                        // className
  ];

  let remaining = line;
  while (remaining.length > 0) {
    let earliest = { index: remaining.length, length: 0, color: "" };
    for (const [re, color] of rules) {
      const m = remaining.match(re);
      if (m && m.index !== undefined && m.index < earliest.index) {
        earliest = { index: m.index, length: m[0].length, color };
      }
    }
    if (earliest.color) {
      if (earliest.index > 0) {
        tokens.push({ text: remaining.slice(0, earliest.index), color: "#d4d4d4" });
      }
      tokens.push({ text: remaining.slice(earliest.index, earliest.index + earliest.length), color: earliest.color });
      remaining = remaining.slice(earliest.index + earliest.length);
    } else {
      tokens.push({ text: remaining, color: "#d4d4d4" });
      break;
    }
  }
  return tokens;
}

/* ── 파일 트리 렌더러 ── */
function FileTreeNode({
  node,
  depth,
  activeFile,
  onSelect,
  fileStatus,
}: {
  node: TreeNode;
  depth: number;
  activeFile: string;
  onSelect: (path: string) => void;
  fileStatus: FileStatusMap;
}) {
  const isFolder = !!node.children;
  const isActive = node.path === activeFile;
  const [open, setOpen] = useState(true);
  const entry = node.path ? fileStatus[node.path] : undefined;
  const status = entry?.status;
  const folderGit = isFolder ? getFolderStatus(node, fileStatus) : null;
  const gitColor = status ? GIT_COLORS[status] : folderGit ? GIT_COLORS[folderGit] : undefined;

  const paddingLeft = 8 + depth * 14;

  if (isFolder) {
    return (
      <>
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left py-0.5 hover:bg-[#2a2d2e] flex items-center gap-1 text-[13px] font-mono"
          style={{ paddingLeft }}
        >
          <span className="text-[#8a8a8a] text-xs">{open ? "▾" : "▸"}</span>
          <span style={gitColor ? { color: gitColor } : undefined} className={gitColor ? undefined : "text-[#cccccc]"}>{node.name}</span>
        </button>
        {open &&
          node.children!.map((child) => (
            <FileTreeNode key={child.name} node={child} depth={depth + 1} activeFile={activeFile} onSelect={onSelect} fileStatus={fileStatus} />
          ))}
      </>
    );
  }

  return (
    <button
      onClick={() => node.path && onSelect(node.path)}
      className={`w-full text-left py-0.5 text-[13px] font-mono flex items-center gap-1.5 transition-colors ${
        isActive ? "bg-[#37373d]" : node.path ? "hover:bg-[#2a2d2e] cursor-pointer" : ""
      }`}
      style={{ paddingLeft: paddingLeft + 14, color: gitColor ?? (isActive ? "#ffffff" : node.path ? "#cccccc" : "#8a8a8a") }}
      disabled={!node.path}
    >
      {/* 파일 아이콘 */}
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke={gitColor ?? (isActive ? "#e0e0e0" : "#8a8a8a")} strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
      </svg>
      <span className="flex-1">{node.name}</span>
      {status && (
        <span className="text-[11px] font-semibold mr-2" style={{ color: GIT_COLORS[status] }}>
          {GIT_BADGES[status]}
        </span>
      )}
    </button>
  );
}

/* ── VS Code 에디터 ── */
function VSCodeEditor({
  tree,
  defaultFile = "layout",
  fileStatus = {},
  fileOverrides = {},
}: {
  tree: TreeNode[];
  defaultFile?: string;
  fileStatus?: FileStatusMap;
  fileOverrides?: Record<string, { lang: string; code: string; desc: string }>;
}) {
  // 트리에서 path가 있는 파일만 수집
  const collectPaths = (nodes: TreeNode[]): Set<string> => {
    const paths = new Set<string>();
    const walk = (n: TreeNode) => {
      if (n.path) paths.add(n.path);
      n.children?.forEach(walk);
    };
    nodes.forEach(walk);
    return paths;
  };
  const treePaths = collectPaths(tree);
  const files = { ...FILE_CONTENTS, ...fileOverrides };

  const [activeFile, setActiveFile] = useState(defaultFile);
  const [copied, setCopied] = useState(false);
  const file = files[activeFile];
  const currentEntry = fileStatus[activeFile];
  const currentStatus = currentEntry?.status;

  const handleCopy = async () => {
    if (!file) return;
    await navigator.clipboard.writeText(file.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fileNames: Record<string, string> = {
    layout: "layout.tsx",
    page: "page.tsx",
    globals: "globals.css",
    postsData: "data/posts.ts",
    posts: "posts/page.tsx",
    postDetail: "posts/[id]/page.tsx",
    navbar: "Navbar.tsx",
    footer: "Footer.tsx",
    package: "package.json",
  };

  return (
    <div className="rounded-lg overflow-hidden border border-[#3c3c3c] bg-[#1e1e1e] h-145 flex flex-col">
      {/* 타이틀 바 */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#323233] border-b border-[#3c3c3c] shrink-0">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[#cccccc] text-xs font-mono ml-2">
          {fileNames[activeFile] ?? ""} — my-app
        </span>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* 파일 트리 */}
        <div className="w-48 shrink-0 border-r border-[#3c3c3c] bg-[#252526] py-2 overflow-y-auto">
          <p className="text-[#8a8a8a] text-[11px] font-semibold tracking-wider uppercase px-3 mb-1">Explorer</p>
          <p className="text-[#cccccc] text-[13px] font-semibold font-mono px-3 mb-1">MY-APP</p>
          {tree.map((node) => (
            <FileTreeNode key={node.name} node={node} depth={0} activeFile={activeFile} onSelect={setActiveFile} fileStatus={fileStatus} />
          ))}
        </div>

        {/* 탭 + 코드 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 탭 바 */}
          <div className="flex items-center bg-[#252526] border-b border-[#3c3c3c] shrink-0 overflow-x-auto">
            {Object.entries(fileNames)
              .filter(([key]) => treePaths.has(key))
              .map(([key, name]) => {
                const tabEntry = fileStatus[key];
                const tabStatus = tabEntry?.status;
                const tabColor = tabStatus ? GIT_COLORS[tabStatus] : undefined;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFile(key)}
                    className={`px-4 py-2 text-xs font-mono border-r border-[#3c3c3c] whitespace-nowrap transition-colors ${
                      key === activeFile
                        ? "bg-[#1e1e1e] border-t-2 border-t-[#007acc]"
                        : "hover:bg-[#2d2d2d]"
                    }`}
                    style={{ color: key === activeFile ? (tabColor ?? "#ffffff") : (tabColor ?? "#8a8a8a") }}
                  >
                    {name}
                    {tabStatus && <span className="ml-1.5 text-[10px]" style={{ color: tabColor }}>●</span>}
                  </button>
                );
              })}
          </div>

          {/* 설명 */}
          {file && (
            <div className="px-4 py-2 bg-[#252526] border-b border-[#3c3c3c] shrink-0">
              <p className="text-[#8a8a8a] text-xs">{file.desc}</p>
            </div>
          )}

          {/* 코드 영역 */}
          <div className="flex-1 overflow-auto relative">
            {/* 복사 버튼 */}
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#3c3c3c] hover:bg-[#4c4c4c] transition-colors text-[#cccccc] text-xs font-mono"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#28c840" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  Copy
                </>
              )}
            </button>

            {file && (
              <pre className="p-4 pr-24 text-sm font-mono leading-6 text-[#d4d4d4]">
                {file.code.split("\n").map((line, i) => {
                  const lineNum = i + 1;
                  const changedLines = currentEntry?.lines;
                  const isChanged = currentStatus && (!changedLines || changedLines.includes(lineNum));
                  const gutterColor = isChanged ? GIT_COLORS[currentStatus!] : undefined;
                  const bgColor = isChanged
                    ? currentStatus === "new" ? "rgba(115,201,145,0.08)" : "rgba(226,192,141,0.08)"
                    : undefined;
                  const tokens = highlightLine(line);
                  return (
                    <div key={i} className="flex" style={{ backgroundColor: bgColor }}>
                      <span className="w-1 shrink-0" style={{ backgroundColor: gutterColor }} />
                      <span className="w-8 shrink-0 text-right mr-4 text-[#5a5a5a] select-none">{lineNum}</span>
                      <span className="whitespace-pre">
                        {tokens.length > 0 ? tokens.map((t, j) => (
                          <span key={j} style={{ color: t.color }}>{t.text}</span>
                        )) : "\u00A0"}
                      </span>
                    </div>
                  );
                })}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Week2Content() {
  return (
    <SlidePresentation>

      {/* ── 1. 제목 ── */}
      <div>
        <WeekHero
          weekNum={2}
          title="Next.js"
          subtitle="시작하기"
          description="Next.js에 대해 배우고, create-next-app으로 첫 Next.js 프로젝트를 만들어봅니다."
        />
        <div className="flex flex-wrap gap-2 mt-8">
          {WEEK2_TAGS.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* ── 2. 목차 ── */}
      <div>
        <h2 className="text-5xl md:text-6xl font-bold mb-10">목차</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WEEK2_TOC.map((item) => (
            <a
              key={item.num}
              href={item.href}
              className="group flex items-center gap-4 p-5 rounded-xl bg-(--bg-card) border border-(--border) hover:border-(--accent) transition-colors"
            >
              <span className="text-4xl font-bold text-(--accent) font-mono">{item.num}</span>
              <span className="text-xl font-medium group-hover:text-(--accent) transition-colors">
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── 01. Node.js와 npm (표지) ── */}
      <div data-slide-id="npm">
        <ChapterTitle num="01" title="Node.js와 npm" />
      </div>

      {/* ── 01. Node.js란? ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-4xl font-bold text-(--accent) mb-3">{NODEJS_CONCEPT.title}</h3>
          <p className="text-2xl text-(--text-sub)">{NODEJS_CONCEPT.desc}</p>
        </Card>
        <CodeWithPreview
          code={`// 원래 JavaScript는 브라우저에서만 동작
// index.html 안의 <script> 태그에서만 실행 가능

// Node.js가 생기면서:
// 터미널에서 직접 JS 파일을 실행 가능!
$ node hello.js
> "Hello, World!"`}
          title="브라우저 밖에서 JS 실행"
        >
          <div className="text-black">
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <p className="text-gray-400">$ node hello.js</p>
              <p className="text-green-400 mt-1">Hello, World!</p>
            </div>
            <p className="text-gray-500 text-sm mt-3">터미널에서 JavaScript를 바로 실행할 수 있습니다.</p>
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 01. Node.js가 왜 필요한가? ── */}
      <div>
        <h3 className="text-5xl font-bold mb-8">Node.js가 왜 필요한가?</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {NODEJS_WHY.map((item) => (
            <Card key={item.label} className={`border-t-2 ${item.color}`}>
              <p className="text-2xl font-bold mb-2">{item.label}</p>
              <p className="text-xl text-(--text-sub)">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 01. Node.js → npm → 개발 흐름 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">개발 환경의 전체 흐름</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <CodeBlock>{NODEJS_FLOW}</CodeBlock>
          </div>
          <div className="space-y-4">
            <Callout type="tip">
              1주차에 Node.js를 이미 설치했습니다! 터미널에서 아래 명령어로 확인해보세요.
            </Callout>
            <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
              {NODEJS_CHECK_COMMANDS.map((row) => (
                <div key={row.cmd} className="flex items-center gap-4 px-5 py-3 bg-(--surface)">
                  <code className="font-mono text-xl text-(--accent) flex-1">{row.cmd}</code>
                  <span className="text-xl text-(--text-sub)">{row.desc}</span>
                  <code className="font-mono text-xl text-(--text-muted)">{row.result}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 01. npm이란? ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-4xl font-bold text-(--accent) mb-3">{NPM_CONCEPT.title}</h3>
          <p className="text-2xl text-(--text-sub)">{NPM_CONCEPT.desc}</p>
        </Card>
        <div className="grid md:grid-cols-3 gap-4">
          {NPM_METAPHOR.map((item) => (
            <Card key={item.role} className={`border-t-2 ${item.color}`}>
              <p className="text-xl text-(--text-muted) mb-1">{item.role}</p>
              <p className="text-2xl font-bold mb-2">{item.metaphor}</p>
              <p className="text-xl text-(--text-sub)">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 01. npm 자주 쓰는 명령어 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">npm 자주 쓰는 명령어</h3>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
          {NPM_COMMANDS.map((row) => (
            <div key={row.cmd} className="flex items-center gap-4 px-5 py-4 bg-(--surface)">
              <code className="font-mono text-xl text-(--accent) w-56 shrink-0">{row.cmd}</code>
              <span className="text-xl text-(--text-sub) flex-1">{row.desc}</span>
              <code className="font-mono text-xl text-(--text-muted) hidden md:block">{row.ex}</code>
            </div>
          ))}
        </div>
      </div>

      {/* ── 01. 패키지 매니저 비교 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">패키지 매니저 비교</h3>
        <Callout type="tip" className="mb-6">
          npm, pnpm, yarn은 모두 같은 저장소에서 패키지를 가져옵니다.{" "}
          <strong>명령어만 조금 다를 뿐</strong> 역할은 동일합니다.
        </Callout>
        <div className="grid md:grid-cols-3 gap-4">
          {PACKAGE_MANAGERS.map((pm) => (
            <Card key={pm.name} className={`border-t-2 ${pm.border} flex flex-col gap-3`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{pm.name}</span>
                <span className={`text-base font-semibold px-2.5 py-0.5 rounded-full ${pm.badgeColor}`}>
                  {pm.badge}
                </span>
              </div>
              <p className="text-xl text-(--text-muted)">{pm.full}</p>
              <p className="text-xl text-(--text-sub)">{pm.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 01. 명령어 비교 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">패키지 매니저 명령어 비교</h3>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
          <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-(--surface-hover) text-xl font-semibold text-(--text-muted)">
            <span>작업</span>
            <span>npm</span>
            <span>pnpm</span>
            <span>yarn</span>
          </div>
          {[
            { action: "개발 서버 실행", npm: "npm run dev",        pnpm: "pnpm dev",        yarn: "yarn dev" },
            { action: "패키지 설치",    npm: "npm install react",  pnpm: "pnpm add react",  yarn: "yarn add react" },
            { action: "전체 설치",      npm: "npm install",        pnpm: "pnpm install",    yarn: "yarn" },
            { action: "패키지 제거",    npm: "npm uninstall react",pnpm: "pnpm remove react",yarn: "yarn remove react" },
          ].map((row) => (
            <div key={row.action} className="grid grid-cols-4 gap-4 px-5 py-4 bg-(--surface) items-center">
              <span className="text-xl text-(--text-sub)">{row.action}</span>
              <code className="font-mono text-xl text-(--text-muted)">{row.npm}</code>
              <code className="font-mono text-base text-violet-400">{row.pnpm}</code>
              <code className="font-mono text-base text-sky-400">{row.yarn}</code>
            </div>
          ))}
        </div>
      </div>

      {/* ── 02. TypeScript 기초 (표지) ── */}
      <div data-slide-id="typescript">
        <ChapterTitle num="02" title="TypeScript 기초" />
      </div>

      {/* ── 02. TypeScript 기초 (내용) ── */}
      <div>
        <Card className="mb-6">
          <p className="text-xl text-(--text-sub)">
            TypeScript는 JavaScript에 <strong className="text-(--accent)">타입(Type)</strong>을 추가한 언어입니다.
            코드를 실행하기 전에 오류를 잡아줘서 더 안전하고 예측 가능한 코드를 작성할 수 있습니다.
          </p>
        </Card>

        <h3 className="text-2xl font-semibold mb-4">JS vs TS 비교</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xl font-semibold text-(--text-muted) mb-2">JavaScript</p>
            <CodeBlock>{TS_JS_COMPARE.js}</CodeBlock>
          </div>
          <div>
            <p className="text-xl font-semibold text-(--accent) mb-2">TypeScript</p>
            <CodeBlock>{TS_JS_COMPARE.ts}</CodeBlock>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-3">기본 타입</h3>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border) mb-6">
          {TS_BASIC_TYPES.map((row) => (
            <div key={row.type} className="flex items-center gap-4 px-4 py-3 bg-(--surface)">
              <code className="font-mono text-xl text-(--accent) w-24 shrink-0">{row.type}</code>
              <code className="font-mono text-sm text-(--text-sub) flex-1">{row.example}</code>
              <span className="text-sm text-(--text-muted) hidden md:block shrink-0">{row.desc}</span>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-semibold mb-3">interface — 객체 타입 정의</h3>
        <CodeBlock>{TS_INTERFACE_EXAMPLE}</CodeBlock>
      </div>

      {/* ── 03. React 기초 (표지) ── */}
      <div data-slide-id="react">
        <ChapterTitle num="03" title="React 기초" />
      </div>

      {/* ── 03. React: 소개 ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-4xl font-bold text-(--accent) mb-3">{REACT_CONCEPT.title}</h3>
          <p className="text-2xl text-(--text-sub)">{REACT_CONCEPT.desc}</p>
        </Card>
        <div className="grid md:grid-cols-3 gap-4">
          {REACT_WHY_POINTS.map((item) => (
            <Card key={item.label} className={`border-t-2 ${item.color}`}>
              <p className="text-2xl font-bold mb-2">{item.label}</p>
              <p className="text-xl text-(--text-sub)">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 03. React: 전통 방식 vs React ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">전통 방식 vs React</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xl font-semibold text-(--text-muted) mb-2">기존 방식 (HTML + JS)</p>
            <CodeBlock>{REACT_WHY_PROBLEM}</CodeBlock>
          </div>
          <div>
            <p className="text-xl font-semibold text-(--accent) mb-2">React 방식</p>
            <CodeBlock>{REACT_WHY_SOLUTION}</CodeBlock>
          </div>
        </div>
        <Callout type="tip">
          기존: &quot;데이터가 바뀌면 <strong>직접 화면을 수정</strong>&quot; / React: &quot;데이터만 바꾸면 <strong>화면은 자동 업데이트</strong>&quot;
        </Callout>
      </div>

      {/* ── 03. React: 컴포넌트란? ── */}
      <div>
        <h3 className="text-5xl font-bold mb-8">컴포넌트란?</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {COMPONENT_METAPHOR.map((item) => (
            <Card key={item.label} className={`border-t-2 ${item.color}`}>
              <p className="text-2xl font-bold mb-2">{item.label}</p>
              <p className="text-xl text-(--text-sub)">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 03. React: 컴포넌트 기본 구조 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">컴포넌트의 기본 구조</h3>
        <CodeBlock>{COMPONENT_STRUCTURE}</CodeBlock>
      </div>

      {/* ── 03. React: 컴포넌트 조합 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">컴포넌트 조합으로 페이지 만들기</h3>
        <CodeWithPreview code={COMPONENT_COMPOSITION}>
          <div className="text-black text-sm flex flex-col h-full">
            <nav className="border-b border-gray-200 px-4 py-2 font-bold text-base">네비게이션 바</nav>
            <div className="flex-1 p-4 space-y-2">
              <div className="border border-gray-200 rounded-lg p-3">카드 내용</div>
              <div className="border border-gray-200 rounded-lg p-3">카드 내용</div>
            </div>
            <footer className="border-t border-gray-200 px-4 py-2 text-gray-400 text-xs">푸터</footer>
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 03. React: JSX 기본 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">JSX란?</h3>
        <Callout type="tip" className="mb-4">
          JSX는 JavaScript 안에서 HTML처럼 UI를 작성하는 문법입니다.
        </Callout>
        <CodeWithPreview code={JSX_EXAMPLE}>
          <div className="text-black p-4">
            <h1 className="text-2xl font-bold mb-2">안녕하세요!</h1>
            <p className="text-gray-600">React 컴포넌트입니다.</p>
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 03. React: JSX 표현식 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">JSX 안에서 { } 사용하기</h3>
        <CodeWithPreview code={JSX_EXPRESSION_EXAMPLES}>
          <div className="text-black">
            <p className="text-base mb-1">이름: Alice</p>
            <p className="text-base mb-1">내년 나이: 26</p>
            <p className="text-base mb-3">성인</p>
            <ul className="list-disc list-inside text-base">
              <li>React</li>
              <li>Next.js</li>
              <li>Tailwind</li>
            </ul>
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 03. React: JSX 규칙 1-2 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">JSX 규칙 (1/2)</h3>
        <div className="space-y-5">
          {JSX_RULES.slice(0, 2).map((rule, i) => (
            <Card key={rule.rule} className="border-l-4 border-l-(--accent)">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-lg font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="text-2xl font-bold">{rule.rule}</p>
              </div>
              <p className="text-xl text-(--text-sub) mb-3">{rule.desc}</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xl font-semibold text-red-400 mb-1">X 잘못된 코드</p>
                  <CodeBlock>{rule.bad}</CodeBlock>
                </div>
                <div>
                  <p className="text-xl font-semibold text-(--accent) mb-1">O 올바른 코드</p>
                  <CodeBlock>{rule.good}</CodeBlock>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 03. React: JSX 규칙 3-4 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">JSX 규칙 (2/2)</h3>
        <div className="space-y-5">
          {JSX_RULES.slice(2, 4).map((rule, i) => (
            <Card key={rule.rule} className="border-l-4 border-l-(--accent)">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-lg font-bold shrink-0">
                  {i + 3}
                </span>
                <p className="text-2xl font-bold">{rule.rule}</p>
              </div>
              <p className="text-xl text-(--text-sub) mb-3">{rule.desc}</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xl font-semibold text-red-400 mb-1">X 잘못된 코드</p>
                  <CodeBlock>{rule.bad}</CodeBlock>
                </div>
                <div>
                  <p className="text-xl font-semibold text-(--accent) mb-1">O 올바른 코드</p>
                  <CodeBlock>{rule.good}</CodeBlock>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 03. React: Props 개념 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-8">Props — 데이터 전달</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {PROPS_ANALOGY.map((item) => (
            <Card key={item.label} className={`border-t-2 ${item.color}`}>
              <p className="text-2xl font-bold mb-2">{item.label}</p>
              <p className="text-xl text-(--text-sub)">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 03. React: Props Step 1 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">Props 단계별 이해 (1/2)</h3>
        <p className="text-xl text-(--text-sub) mb-3">비슷한 카드 3개를 만들려면 같은 HTML을 3번 복붙해야 합니다.</p>
        <CodeWithPreview code={PROPS_STEP_BY_STEP.step1}>
          <div className="text-black space-y-3">
            {[
              { title: "React", desc: "UI 라이브러리" },
              { title: "Next.js", desc: "React 프레임워크" },
              { title: "Tailwind", desc: "CSS 프레임워크" },
            ].map((c) => (
              <div key={c.title} className="border border-gray-200 rounded-lg p-4">
                <h2 className="font-bold text-base mb-1">{c.title}</h2>
                <p className="text-gray-500 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 03. React: Props Step 2-3 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">Props 단계별 이해 (2/2)</h3>
        <CodeWithPreview code={PROPS_STEP_BY_STEP.step2 + "\n\n" + PROPS_STEP_BY_STEP.step3}>
          <div className="text-black space-y-3">
            <p className="text-xs text-gray-400 mb-2">같은 결과, 깔끔한 코드</p>
            {[
              { title: "React", desc: "UI 라이브러리" },
              { title: "Next.js", desc: "React 프레임워크" },
              { title: "Tailwind", desc: "CSS 프레임워크" },
            ].map((c) => (
              <div key={c.title} className="border border-gray-200 rounded-lg p-4">
                <h2 className="font-bold text-base mb-1">{c.title}</h2>
                <p className="text-gray-500 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 03. React: State 개념 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">State — 상태 관리</h3>
        <Callout type="info" className="mb-6">
          State는 컴포넌트가 &quot;기억&quot;하는 데이터입니다.
          <code className="mx-1">useState</code>로 선언한 값이 바뀌면 React가 자동으로 화면을 다시 그립니다.
        </Callout>
        <h4 className="text-2xl font-semibold mb-4">useState 문법</h4>
        <CodeBlock>{STATE_SYNTAX}</CodeBlock>
      </div>

      {/* ── 03. React: State 다양한 타입 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">다양한 타입의 State</h3>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border) mb-6">
          <div className="grid grid-cols-3 px-4 py-3 bg-(--surface-hover) text-xl font-semibold text-(--text-muted)">
            <span>타입</span>
            <span>선언</span>
            <span>업데이트</span>
          </div>
          {STATE_EXAMPLES.map((row) => (
            <div key={row.name} className="grid grid-cols-3 items-center px-4 py-3 bg-(--surface)">
              <span className="text-xl font-semibold text-(--accent)">{row.name}</span>
              <code className="font-mono text-sm text-(--text-sub)">{row.code}</code>
              <code className="font-mono text-sm text-(--text-muted)">{row.update}</code>
            </div>
          ))}
        </div>
        <Callout type="warn">
          State를 사용하려면 파일 맨 위에 <code>&quot;use client&quot;;</code>를 반드시 추가해야 합니다!
          Next.js는 기본적으로 서버 컴포넌트이고, useState는 클라이언트에서만 동작합니다.
        </Callout>
      </div>

      {/* ── 03. React: State 예제 - 카운터 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">State 예제: 카운터</h3>
        <Callout type="tip" className="mb-4">오른쪽 버튼을 직접 클릭해보세요!</Callout>
        <CodeWithPreview code={STATE_EXAMPLE}>
          <CounterDemo />
        </CodeWithPreview>
      </div>

      {/* ── 03. React: State 예제 - 토글 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">State 예제: 토글</h3>
        <Callout type="tip" className="mb-4">버튼을 클릭하면 상태가 반전됩니다!</Callout>
        <CodeWithPreview code={STATE_TOGGLE_EXAMPLE}>
          <ToggleDemo />
        </CodeWithPreview>
      </div>

      {/* ── 04. Tailwind CSS (표지) ── */}
      <div data-slide-id="tailwind">
        <ChapterTitle num="04" title="Tailwind CSS" />
      </div>

      {/* ── 04. CSS란 무엇인가? ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">먼저, CSS란?</h3>
        <p className="text-2xl text-(--text-sub) mb-6">
          웹페이지는 <strong>HTML</strong>(구조)과 <strong>CSS</strong>(스타일) 두 가지로 이루어집니다.
          HTML이 건물의 뼈대라면, CSS는 인테리어입니다.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xl font-semibold text-(--text-muted) mb-2">HTML = 구조</p>
            <CodeBlock>{CSS_WHAT_IS.html}</CodeBlock>
          </div>
          <div>
            <p className="text-xl font-semibold text-(--accent) mb-2">CSS = 스타일</p>
            <CodeBlock>{CSS_WHAT_IS.css}</CodeBlock>
          </div>
        </div>
      </div>

      {/* ── 04. 기존 CSS의 불편한 점 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-8">기존 CSS 방식의 불편한 점</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {CSS_PROBLEMS.map((item) => (
            <Card key={item.problem} className={`border-t-2 ${item.color}`}>
              <p className="text-2xl font-bold mb-2">{item.problem}</p>
              <p className="text-xl text-(--text-sub)">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 04. Tailwind CSS 소개 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">Tailwind CSS란?</h3>
        <p className="text-2xl text-(--text-sub) mb-4">
          CSS 파일을 따로 만들지 않고, <strong>클래스 이름만으로</strong> 스타일을 바로 적용합니다.
        </p>
        <CodeWithPreview code={TAILWIND_VS_CSS.tailwind} title="Tailwind 코드">
          <div className="flex items-center justify-center h-full">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-base hover:bg-blue-600 transition-colors">
              버튼
            </button>
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 04. Tailwind 장점 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-8">Tailwind의 장점</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {TAILWIND_BENEFITS.map((item) => (
            <Card key={item.label} className={`border-t-2 ${item.color}`}>
              <p className="text-2xl font-bold mb-2">{item.label}</p>
              <p className="text-xl text-(--text-sub)">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 04. Flex 레이아웃 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">Flex — 가로/세로 배치</h3>
        <CodeWithPreview code={TAILWIND_LAYOUT_FLEX}>
          <div className="text-black space-y-6">
            <div>
              <p className="text-xs text-gray-400 mb-2 font-mono">flex gap-4</p>
              <div className="flex gap-4">
                <div className="bg-blue-100 border border-blue-300 rounded-lg px-5 py-3 font-bold text-blue-700">A</div>
                <div className="bg-blue-100 border border-blue-300 rounded-lg px-5 py-3 font-bold text-blue-700">B</div>
                <div className="bg-blue-100 border border-blue-300 rounded-lg px-5 py-3 font-bold text-blue-700">C</div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2 font-mono">flex flex-col gap-4</p>
              <div className="flex flex-col gap-3">
                <div className="bg-violet-100 border border-violet-300 rounded-lg px-5 py-2 font-bold text-violet-700">A</div>
                <div className="bg-violet-100 border border-violet-300 rounded-lg px-5 py-2 font-bold text-violet-700">B</div>
              </div>
            </div>
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 04. Flex 옵션 + Grid ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">Flex 옵션 정리</h3>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border) mb-8">
          {TAILWIND_FLEX_OPTIONS.map((row) => (
            <div key={row.cls} className="flex items-center gap-4 px-5 py-3 bg-(--surface)">
              <code className="font-mono text-xl text-(--accent) w-48 shrink-0">{row.cls}</code>
              <span className="text-xl text-(--text-sub)">{row.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 04. Grid 레이아웃 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">Grid — 격자 배치</h3>
        <CodeWithPreview code={TAILWIND_LAYOUT_GRID}>
          <div className="text-black">
            <p className="text-xs text-gray-400 mb-3 font-mono">grid grid-cols-3 gap-4</p>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-emerald-100 border border-emerald-300 rounded-lg p-4 text-center font-bold text-emerald-700 text-lg">
                  {n}
                </div>
              ))}
            </div>
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 04. Padding & Margin 개념 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">Padding & Margin</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-t-2 border-t-(--accent)">
            <p className="text-2xl font-bold mb-2">Padding (안쪽 여백)</p>
            <p className="text-xl text-(--text-sub) mb-4">상자 안쪽에 빈 공간을 만듭니다.</p>
            <div className="bg-(--surface-hover) rounded-lg p-4">
              <div className="border-2 border-dashed border-(--accent)/50 rounded p-8 text-center">
                <div className="bg-(--accent)/10 rounded p-4">
                  <span className="text-xl font-mono">내용</span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="border-t-2 border-t-violet-500">
            <p className="text-2xl font-bold mb-2">Margin (바깥 여백)</p>
            <p className="text-xl text-(--text-sub) mb-4">상자 바깥에 빈 공간을 만듭니다.</p>
            <div className="bg-(--surface-hover) rounded-lg p-4">
              <div className="bg-violet-500/10 rounded p-4 mb-3">
                <div className="border-2 border-dashed border-violet-500/50 rounded p-4 text-center">
                  <span className="text-xl font-mono">상자 1 (mb-3)</span>
                </div>
              </div>
              <div className="border-2 border-dashed border-violet-500/50 rounded p-4 text-center">
                <span className="text-xl font-mono">상자 2</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ── 04. 간격 클래스 정리 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">간격 클래스 정리</h3>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
          <div className="grid grid-cols-3 px-5 py-3 bg-(--surface-hover) text-xl font-semibold text-(--text-muted)">
            <span>클래스</span>
            <span>CSS 속성</span>
            <span>방향</span>
          </div>
          {TAILWIND_SPACING_DIAGRAM.map((row) => (
            <div key={row.cls} className="grid grid-cols-3 items-center px-5 py-3 bg-(--surface)">
              <code className="font-mono text-xl text-(--accent)">{row.cls}</code>
              <span className="text-xl text-(--text-sub)">{row.meaning}</span>
              <span className="text-xl text-(--text-muted)">{row.direction}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 04. 숫자 체계 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">Tailwind 숫자 체계</h3>
        <Callout type="tip" className="mb-6">
          Tailwind의 숫자는 <strong>4 = 16px = 1rem</strong>이 기준입니다.
          <code className="ml-1">p-4</code>는 패딩 16px, <code>p-8</code>은 32px입니다.
        </Callout>
        <div className="flex flex-wrap gap-3">
          {TAILWIND_SIZE_SCALE.map((s) => (
            <div key={s.num} className="flex flex-col items-center px-5 py-3 rounded-xl bg-(--surface) border border-(--border) min-w-20">
              <code className="font-mono text-2xl text-(--accent) font-bold">{s.num}</code>
              <span className="text-xl text-(--text-muted) mt-1">{s.px}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 04. 자주 쓰는 클래스 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">자주 쓰는 클래스</h3>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
          <div className="grid grid-cols-3 px-5 py-3 bg-(--surface-hover) text-xl font-semibold text-(--text-muted)">
            <span>클래스</span>
            <span>의미</span>
            <span>분류</span>
          </div>
          {TAILWIND_CLASSES.map((row) => (
            <div key={row.cls} className="grid grid-cols-3 items-center px-5 py-3 bg-(--surface)">
              <code className="font-mono text-xl text-(--accent)">{row.cls}</code>
              <span className="text-xl text-(--text-sub)">{row.desc}</span>
              <span className="text-xl text-(--text-muted)">{row.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 04. 반응형 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-4">반응형 디자인</h3>
        <p className="text-2xl text-(--text-sub) mb-4">
          접두사를 붙이면 특정 화면 크기 이상에서만 스타일이 적용됩니다.
        </p>
        <CodeWithPreview code={TAILWIND_RESPONSIVE_EXAMPLE}>
          <div className="text-black space-y-4">
            <div>
              <p className="text-xs text-gray-400 mb-2">모바일 (1열)</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="bg-orange-100 border border-orange-300 rounded p-2 text-center text-sm font-bold text-orange-700">1</div>
                <div className="bg-orange-100 border border-orange-300 rounded p-2 text-center text-sm font-bold text-orange-700">2</div>
                <div className="bg-orange-100 border border-orange-300 rounded p-2 text-center text-sm font-bold text-orange-700">3</div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2">데스크톱 (3열)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-100 border border-blue-300 rounded p-2 text-center text-sm font-bold text-blue-700">1</div>
                <div className="bg-blue-100 border border-blue-300 rounded p-2 text-center text-sm font-bold text-blue-700">2</div>
                <div className="bg-blue-100 border border-blue-300 rounded p-2 text-center text-sm font-bold text-blue-700">3</div>
              </div>
            </div>
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 04. 상태 변형 ── */}
      <div>
        <h3 className="text-5xl font-bold mb-6">상태 변형</h3>
        <p className="text-2xl text-(--text-sub) mb-6">
          콜론(:) 앞에 상태를 적으면 특정 조건에서만 스타일이 적용됩니다.
        </p>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border) mb-6">
          {TAILWIND_STATE_EXAMPLES.map((row) => (
            <div key={row.cls} className="flex items-center gap-4 px-5 py-4 bg-(--surface)">
              <code className="font-mono text-xl text-(--accent) w-56 shrink-0">{row.cls}</code>
              <span className="text-2xl text-(--text-sub)">{row.desc}</span>
            </div>
          ))}
        </div>
        <Callout type="info">
          조합도 가능합니다. <code>md:hover:bg-blue-600</code>은 md 이상에서 hover 시 적용됩니다.
        </Callout>
      </div>

      {/* ── 05. Next.js 프로젝트 생성 (표지) ── */}
      <div data-slide-id="create">
        <ChapterTitle num="05" title="Next.js 프로젝트 생성" />
      </div>

      {/* ── 05. 생성 순서 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-6">생성 순서</h3>
        <Callout type="tip" className="mb-6">
          <strong>npx</strong>는 npm에 포함된 실행 도구입니다. 패키지를 설치하지 않고 바로 실행할 수 있습니다.
        </Callout>
        <div className="space-y-3">
          {CREATE_NEXTAPP_STEPS.map((step) => (
            <StepItem key={step.num} num={step.num} title={step.title}>
              {step.cmd && (
                <CodeBlock className="mt-2">{step.cmd}</CodeBlock>
              )}
              {step.desc && (
                <p className="text-xl text-(--text-sub) mt-1">{step.desc}</p>
              )}
            </StepItem>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-xl bg-(--bg-card) border border-(--border)">
          <p className="text-xl text-(--text-muted) mb-2">생성 명령어</p>
          <CodeBlock>{"$ npx create-next-app@latest 프로젝트이름 --typescript --tailwind"}</CodeBlock>
        </div>
      </div>

      {/* ── 05. 설정 질문 답변 가이드 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-6">설정 질문 답변 가이드</h3>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
          {CREATE_OPTIONS.map((opt) => (
            <div key={opt.question} className="flex items-center gap-4 px-4 py-3 bg-(--surface)">
              <span className="text-xl text-(--text-sub) flex-1">{opt.question}</span>
              <span className="text-xl font-semibold text-(--accent) shrink-0">{opt.answer}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 05. 생성할 폴더 구조 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-6">생성할 폴더 구조</h3>
        <CodeBlock>{NEXTAPP_FOLDER_STRUCTURE}</CodeBlock>
      </div>

      {/* ── 06. 페이지 구조 만들기 (표지) ── */}
      <div data-slide-id="routing">
        <ChapterTitle num="06" title="페이지 구조 만들기" />
      </div>

      {/* ── 06. 완성 화면 미리보기 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-6">우리가 만들 페이지</h3>
        <p className="text-xl text-(--text-sub) mb-6">
          이런 구조의 페이지를 만들어봅니다. 각 영역을 채우는 건 <strong className="text-(--accent)">과제</strong>입니다.
        </p>
        <div className="border-2 border-black rounded-lg overflow-hidden bg-white max-w-2xl mx-auto">
          <div className="border-b-2 border-black px-6 py-4 grid grid-cols-3 items-center">
            <span className="text-black font-bold text-lg">Navbar</span>
            <div className="flex gap-6 justify-center">
              <span className="text-black/50 text-sm">메인</span>
            </div>
            <div className="flex justify-end">
              <span className="text-black/50 text-sm border border-black/30 rounded px-3 py-1">로그인</span>
            </div>
          </div>
          <div className="border-b-2 border-black px-6 py-12 text-center">
            <span className="text-black font-bold text-xl">Hero 섹션</span>
            <p className="text-black/40 text-sm mt-2">제목, 소개 문구, CTA 버튼</p>
          </div>
          <div className="border-b-2 border-black px-6 py-10">
            <span className="text-black font-bold text-lg">Main Content</span>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="border border-black/30 rounded p-4 text-center"><span className="text-black/40 text-sm">카드 1</span></div>
              <div className="border border-black/30 rounded p-4 text-center"><span className="text-black/40 text-sm">카드 2</span></div>
              <div className="border border-black/30 rounded p-4 text-center"><span className="text-black/40 text-sm">카드 3</span></div>
            </div>
          </div>
          <div className="px-6 py-4 text-center">
            <span className="text-black font-bold text-lg">Footer</span>
            <p className="text-black/40 text-sm mt-1">저작권, 링크 등</p>
          </div>
        </div>
      </div>

      {/* ── 06. 인터랙티브 VS Code 에디터 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-2">파일 구조 & 코드</h3>
        <p className="text-xl text-(--text-sub) mb-4">
          왼쪽 파일을 클릭해서 각 파일의 코드를 확인하세요.
        </p>
        <VSCodeEditor
          tree={TREE_STEP1}
          defaultFile="layout"
          fileOverrides={{ navbar: NAVBAR_STEP1 }}
          fileStatus={{
            layout: { status: "new" },
            page: { status: "new" },
            globals: { status: "new" },
            navbar: { status: "new" },
            footer: { status: "new" },
          }}
        />
      </div>

      {/* ── 06. 목록 페이지 — 화면 미리보기 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-6">목록 페이지 (/posts)</h3>
        <p className="text-xl text-(--text-sub) mb-6">
          Navbar에서 &quot;목록&quot;을 클릭하면 이 페이지로 이동합니다.
          <code className="ml-1">app/posts/page.tsx</code> 파일을 만들면 됩니다.
        </p>
        <div className="border-2 border-black rounded-lg overflow-hidden bg-white max-w-2xl mx-auto">
          {/* 브라우저 바 */}
          <div className="bg-black/5 border-b border-black/20 px-3 py-1.5 flex items-center gap-2">
            <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-green-400" /></div>
            <span className="text-black/40 text-xs font-mono ml-2">localhost:3000/posts</span>
          </div>
          {/* Navbar */}
          <div className="border-b-2 border-black px-6 py-4 grid grid-cols-3 items-center">
            <span className="text-black font-bold text-lg">Navbar</span>
            <div className="flex gap-6 justify-center">
              <span className="text-black/50 text-sm">메인</span>
              <span className="text-black font-semibold text-sm underline underline-offset-4">목록</span>
            </div>
            <div className="flex justify-end">
              <span className="text-black/50 text-sm border border-black/30 rounded px-3 py-1">로그인</span>
            </div>
          </div>
          {/* 목록 콘텐츠 */}
          <div className="px-8 py-8">
            <span className="text-black font-bold text-xl block mb-6">목록</span>
            <div className="space-y-3">
              <div className="border border-black/30 rounded-lg p-5">
                <span className="text-black font-semibold">첫 번째 글</span>
                <p className="text-black/40 text-sm mt-1">Next.js를 시작했습니다.</p>
              </div>
              <div className="border border-black/30 rounded-lg p-5">
                <span className="text-black font-semibold">두 번째 글</span>
                <p className="text-black/40 text-sm mt-1">Tailwind CSS로 스타일링하기</p>
              </div>
              <div className="border border-black/30 rounded-lg p-5">
                <span className="text-black font-semibold">세 번째 글</span>
                <p className="text-black/40 text-sm mt-1">컴포넌트를 만들어봅시다</p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="border-t-2 border-black px-6 py-4 text-center">
            <span className="text-black/50 text-sm">© 2026 내 사이트. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* ── 06. 목록 페이지 — 파일 구조 & 코드 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-2">파일 구조 & 코드</h3>
        <p className="text-xl text-(--text-sub) mb-4">
          <code>data/posts.ts</code>에 데이터를 분리하고, <code>posts/page.tsx</code>에서 가져와 씁니다.
        </p>
        <VSCodeEditor
          tree={TREE_STEP2}
          defaultFile="postsData"
          fileStatus={{
            postsData: { status: "new" },
            posts: { status: "new" },
            navbar: { status: "modified", lines: [12] },
          }}
        />
      </div>

      {/* ── 06. 상세 페이지 — 화면 미리보기 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-6">상세 페이지 (/posts/1)</h3>
        <p className="text-xl text-(--text-sub) mb-6">
          목록에서 글을 클릭하면 해당 글의 상세 페이지로 이동합니다.
          <code className="ml-1">app/posts/[id]/page.tsx</code>가 이 URL을 담당합니다.
        </p>
        <div className="border-2 border-black rounded-lg overflow-hidden bg-white max-w-2xl mx-auto">
          {/* 브라우저 바 */}
          <div className="bg-black/5 border-b border-black/20 px-3 py-1.5 flex items-center gap-2">
            <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-green-400" /></div>
            <span className="text-black/40 text-xs font-mono ml-2">localhost:3000/posts/1</span>
          </div>
          {/* Navbar */}
          <div className="border-b-2 border-black px-6 py-4 grid grid-cols-3 items-center">
            <span className="text-black font-bold text-lg">Navbar</span>
            <div className="flex gap-6 justify-center">
              <span className="text-black/50 text-sm">메인</span>
              <span className="text-black/50 text-sm">목록</span>
            </div>
            <div className="flex justify-end">
              <span className="text-black/50 text-sm border border-black/30 rounded px-3 py-1">로그인</span>
            </div>
          </div>
          {/* 상세 콘텐츠 */}
          <div className="px-8 py-8">
            <span className="text-black/50 text-sm block mb-6">← 목록으로</span>
            <h1 className="text-black text-2xl font-bold mb-3">첫 번째 글</h1>
            <p className="text-black/50 text-sm mb-6">Next.js를 시작했습니다.</p>
            <div className="border-t border-black/10 pt-6">
              <p className="text-black/70 text-sm leading-relaxed">
                Next.js는 React 기반의 풀스택 프레임워크입니다. 서버 컴포넌트, 파일 기반 라우팅 등 다양한 기능을 제공합니다.
              </p>
            </div>
          </div>
          {/* Footer */}
          <div className="border-t-2 border-black px-6 py-4 text-center">
            <span className="text-black/50 text-sm">© 2026 내 사이트. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* ── 06. 상세 페이지 — 파일 구조 & 코드 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-2">파일 구조 & 코드</h3>
        <p className="text-xl text-(--text-sub) mb-4">
          <code>[id]</code> 폴더 안의 <code>page.tsx</code>가 동적 라우트를 처리합니다. URL의 id 값으로 해당 글을 찾습니다.
        </p>
        <VSCodeEditor
          tree={TREE_STEP3}
          defaultFile="postDetail"
          fileStatus={{
            postDetail: { status: "new" },
          }}
        />
      </div>

      {/* ── 06. 과제 ── */}
      <div>
        <h3 className="text-4xl font-bold mb-6">과제</h3>
        <Callout type="warn" className="mb-6">
          와이어프레임을 참고해서 <code>page.tsx</code>의 Hero 섹션, 카드 영역 등을 자유롭게 채워보세요.
          Tailwind CSS 클래스를 활용해 스타일링합니다.
        </Callout>

        <h3 className="text-2xl font-semibold mb-4">페이지 추가 = 폴더 추가</h3>
        <Callout type="tip" className="mb-6">
          Next.js App Router는 <strong>폴더 구조 = URL 구조</strong>입니다.{" "}
          <code>page.tsx</code> 파일을 만들면 그 폴더 경로가 곧 URL이 됩니다.
        </Callout>

        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
          <div className="flex gap-4 px-4 py-2 bg-(--surface-hover) text-sm font-semibold text-(--text-muted)">
            <span className="w-64 shrink-0">파일 경로</span>
            <span className="w-36 shrink-0">URL</span>
            <span>설명</span>
          </div>
          {ROUTING_EXAMPLES.map((row) => (
            <div key={row.file} className="flex items-center gap-4 px-4 py-3 bg-(--surface)">
              <code className="font-mono text-xl text-(--accent) w-64 shrink-0">{row.file}</code>
              <code className="font-mono text-base w-36 shrink-0">{row.url}</code>
              <span className="text-xl text-(--text-sub)">{row.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 정리 ── */}
      <div>
        <ChapterTitle num="정리" title="오늘 배운 것" />
      </div>

      <div>
        <div className="space-y-3">
          {WEEK2_SUMMARY.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-base font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-xl font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </SlidePresentation>
  );
}
