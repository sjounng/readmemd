/* ── Week 3 콘텐츠 데이터 ── */

export const WEEK3_TAGS = ["Next.js", "React", "Server Component", "Client Component", "Patterns"];

export const WEEK3_TOC = [
  { num: "01", title: "Server vs Client Component", href: "#server-client" },
  { num: "02", title: "레이아웃 패턴", href: "#layout" },
  { num: "03", title: "리스트 → 상세 패턴", href: "#list-detail" },
  { num: "04", title: "데이터 Fetching 패턴", href: "#fetching" },
  { num: "05", title: "폼 & 이벤트 패턴", href: "#form" },
  { num: "06", title: "조건부 렌더링 패턴", href: "#conditional" },
];

/* ── Section 1: Server vs Client Component ── */

export const COMPONENT_TYPE_CONCEPT = {
  title: "Server Component vs Client Component",
  desc: 'Next.js에서 모든 컴포넌트는 기본적으로 Server Component입니다. 브라우저에서 동작하는 기능(클릭, 입력 등)이 필요하면 파일 맨 위에 "use client"를 추가하여 Client Component로 만듭니다.',
};

export const SERVER_CLIENT_COMPARE = {
  server: {
    title: "Server Component (기본값)",
    features: [
      "서버에서 HTML을 미리 만들어 보냄",
      "데이터베이스, 파일 시스템 직접 접근 가능",
      "비밀 키(API Key) 안전하게 사용 가능",
      "JavaScript 번들에 포함되지 않아 가벼움",
    ],
    cantDo: [
      "useState, useEffect 사용 불가",
      "onClick, onChange 등 이벤트 사용 불가",
      "브라우저 API (localStorage 등) 사용 불가",
    ],
  },
  client: {
    title: 'Client Component ("use client")',
    features: [
      "브라우저에서 JavaScript로 동작",
      "useState, useEffect 등 Hook 사용 가능",
      "onClick, onChange 등 이벤트 처리 가능",
      "브라우저 API (localStorage 등) 접근 가능",
    ],
    cantDo: [
      "async 컴포넌트 불가 (서버에서 데이터 fetch X)",
      "비밀 키 노출 위험 (브라우저에서 코드 보임)",
    ],
  },
};

export const SERVER_CLIENT_DECISION = [
  { situation: "데이터를 서버에서 불러와 보여주기만 하는 페이지", answer: "Server Component", reason: "상호작용 없이 데이터를 표시만 하면 됨" },
  { situation: "버튼 클릭 시 카운터 증가", answer: "Client Component", reason: "useState + onClick 이벤트 필요" },
  { situation: "검색 입력창", answer: "Client Component", reason: "useState + onChange 이벤트 필요" },
  { situation: "블로그 글 목록 페이지", answer: "Server Component", reason: "데이터를 보여주기만 하면 됨" },
  { situation: "다크모드 토글 버튼", answer: "Client Component", reason: "useState + onClick + localStorage 필요" },
  { situation: "API에서 데이터를 가져와 표시", answer: "Server Component", reason: "서버에서 fetch하면 더 빠르고 안전" },
];

export const SERVER_COMPONENT_CODE = `// app/posts/page.tsx
// "use client" 없음 → Server Component (기본값)

import { posts } from "@/data/posts";

export default function PostsPage() {
  // 서버에서 데이터를 바로 사용 가능
  return (
    <div>
      <h1>게시글 목록</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.desc}</p>
        </div>
      ))}
    </div>
  );
}`;

export const CLIENT_COMPONENT_CODE = `"use client";  // ← 이 한 줄이 핵심!

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>클릭 횟수: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`;

export const USE_CLIENT_ERROR_CODE = `// app/counter/page.tsx
// "use client" 빠뜨리면?

import { useState } from "react";
//      ^^^^^^^^
// Error: useState only works in Client Components.
// Add the "use client" directive at the top of
// the file to use it.

export default function Counter() {
  const [count, setCount] = useState(0);
  // ...
}`;

export const MIXED_COMPONENT_CODE = `// app/posts/page.tsx (Server Component)
import LikeButton from "@/components/LikeButton";
import { posts } from "@/data/posts";

export default function PostsPage() {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.desc}</p>
          {/* Client Component를 자식으로 사용 */}
          <LikeButton />
        </div>
      ))}
    </div>
  );
}`;

export const MIXED_CLIENT_CODE = `// components/LikeButton.tsx (Client Component)
"use client";

import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "♥ 좋아요 취소" : "♡ 좋아요"}
    </button>
  );
}`;

/* ── Section 2: 레이아웃 패턴 ── */

export const LAYOUT_CONCEPT = {
  title: "layout.tsx 패턴",
  desc: "layout.tsx는 하위 페이지들을 감싸는 공통 껍데기입니다. Header, Footer, Sidebar 등 모든 페이지에 반복되는 UI를 여기에 넣으면 한 번만 작성해도 모든 페이지에 적용됩니다.",
};

export const LAYOUT_CODE = `// app/layout.tsx — 전체 사이트 공통 레이아웃
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
}`;

export const NESTED_LAYOUT_CODE = `// app/dashboard/layout.tsx — 대시보드 전용 레이아웃
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 border-r p-4">
        <nav>
          <a href="/dashboard">홈</a>
          <a href="/dashboard/settings">설정</a>
          <a href="/dashboard/profile">프로필</a>
        </nav>
      </aside>
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}`;

export const LAYOUT_STRUCTURE = [
  {
    file: "app/layout.tsx",
    desc: "사이트 전체를 감싸는 레이아웃 (Navbar, Footer)",
    scope: "모든 페이지",
    color: "border-l-(--accent)",
  },
  {
    file: "app/dashboard/layout.tsx",
    desc: "대시보드 섹션 전용 레이아웃 (Sidebar)",
    scope: "/dashboard/* 페이지만",
    color: "border-l-violet-500",
  },
  {
    file: "app/dashboard/page.tsx",
    desc: "대시보드 메인 페이지 내용",
    scope: "/dashboard",
    color: "border-l-sky-500",
  },
];

export const LAYOUT_NESTING_VISUAL = [
  { label: "RootLayout", desc: "Navbar + Footer", color: "border-(--accent)" },
  { label: "DashboardLayout", desc: "Sidebar", color: "border-violet-500" },
  { label: "Page", desc: "실제 내용", color: "border-sky-500" },
];

export const DYNAMIC_ROUTE_STRUCTURE = [
  { file: "app/products/", type: "folder", indent: 0 },
  { file: "page.tsx", type: "file", indent: 1, desc: "/products → 목록 페이지", color: "text-(--accent)" },
  { file: "[id]/", type: "folder", indent: 1, highlight: true },
  { file: "page.tsx", type: "file", indent: 2, desc: "/products/1, /products/2 ... → 상세 페이지", color: "text-violet-400" },
];

/* ── Section 3: 리스트 → 상세 패턴 ── */

export const LIST_DETAIL_CONCEPT = {
  title: "리스트 → 상세 패턴",
  desc: "웹 서비스의 대부분은 이 패턴입니다. 목록 페이지에서 아이템을 보여주고, 클릭하면 상세 페이지로 이동합니다. 게시판, 상품 목록, 유저 목록 등 모두 이 구조입니다.",
};

export const LIST_DETAIL_EXAMPLES = [
  { service: "쇼핑몰", list: "/products", detail: "/products/[id]", listLabel: "상품 목록", detailLabel: "상품 상세" },
  { service: "블로그", list: "/posts", detail: "/posts/[id]", listLabel: "글 목록", detailLabel: "글 상세" },
  { service: "유튜브", list: "/", detail: "/watch?v=[id]", listLabel: "영상 목록", detailLabel: "영상 재생" },
  { service: "인스타그램", list: "/explore", detail: "/p/[id]", listLabel: "탐색 피드", detailLabel: "게시물 상세" },
];

export const LIST_PAGE_CODE = `// app/products/page.tsx — 목록 페이지
import Link from "next/link";

const products = [
  { id: 1, name: "MacBook Pro", price: 2500000 },
  { id: 2, name: "iPad Air", price: 900000 },
  { id: 3, name: "AirPods Pro", price: 350000 },
];

export default function ProductsPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-8">
        상품 목록
      </h1>
      <div className="space-y-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={\`/products/\${product.id}\`}
            className="block border rounded-lg p-6
              hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">
              {product.name}
            </h2>
            <p className="text-gray-500">
              {product.price.toLocaleString()}원
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}`;

export const DETAIL_PAGE_CODE = `// app/products/[id]/page.tsx — 상세 페이지
import Link from "next/link";

const products = [
  { id: 1, name: "MacBook Pro", price: 2500000,
    desc: "Apple M4 칩 탑재 노트북" },
  { id: 2, name: "iPad Air", price: 900000,
    desc: "가볍고 강력한 태블릿" },
  { id: 3, name: "AirPods Pro", price: 350000,
    desc: "노이즈 캔슬링 이어폰" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return <div>상품을 찾을 수 없습니다</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <Link href="/products"
        className="text-gray-500 hover:text-black">
        ← 목록으로
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">
        {product.name}
      </h1>
      <p className="text-2xl text-blue-600 mb-4">
        {product.price.toLocaleString()}원
      </p>
      <p className="text-gray-600">{product.desc}</p>
    </div>
  );
}`;

export const LIST_DETAIL_PATTERN_STEPS = [
  { num: 1, title: "데이터 준비", desc: "배열(Array)로 데이터를 준비합니다", code: "const items = [{ id: 1, name: '...' }, ...]" },
  { num: 2, title: "map()으로 목록 렌더링", desc: "배열을 순회하며 각 아이템을 UI로 변환합니다", code: "{items.map((item) => <Card key={item.id} />)}" },
  { num: 3, title: "Link로 상세 연결", desc: "각 아이템을 클릭하면 상세 페이지로 이동합니다", code: '<Link href={`/items/${item.id}`}>' },
  { num: 4, title: "params로 id 추출", desc: "URL의 동적 부분([id])에서 값을 가져옵니다", code: "const { id } = await params;" },
  { num: 5, title: "데이터 찾기", desc: "id에 해당하는 데이터를 찾아 화면에 표시합니다", code: "const item = items.find(i => i.id === Number(id));" },
];

/* ── Section 4: 데이터 Fetching 패턴 ── */

export const FETCHING_CONCEPT = {
  title: "데이터 Fetching 패턴",
  desc: "실제 서비스는 하드코딩된 데이터가 아니라 서버(API)에서 데이터를 가져옵니다. Next.js의 Server Component에서는 async/await로 간단하게 데이터를 불러올 수 있습니다.",
};

export const SERVER_FETCH_CODE = `// app/users/page.tsx — Server Component에서 fetch
// "use client" 없음 → 서버에서 실행

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersPage() {
  // 서버에서 API 호출 (브라우저가 아님!)
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  // 응답 실패 시 에러를 던지면 error.tsx가 자동 표시
  if (!res.ok) {
    throw new Error("데이터를 불러오지 못했습니다");
  }

  const users: User[] = await res.json();

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-8">
        사용자 목록
      </h1>
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id}
            className="border rounded-lg p-4">
            <h2 className="font-semibold">
              {user.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}`;

export const LOADING_CODE = `// app/users/loading.tsx
// 데이터 로딩 중 자동으로 표시되는 UI

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
}`;

export const ERROR_CODE = `// app/users/error.tsx
"use client";  // error.tsx는 반드시 Client Component

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6
      text-center">
      <h2 className="text-2xl font-bold mb-4">
        문제가 발생했습니다
      </h2>
      <p className="text-gray-500 mb-6">
        {error.message}
      </p>
      <button
        onClick={reset}
        className="bg-blue-500 text-white px-6 py-2
          rounded-lg hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}`;

export const FETCHING_FILE_STRUCTURE = [
  { file: "app/users/page.tsx", role: "데이터를 불러와서 화면을 보여줌", icon: "page" },
  { file: "app/users/loading.tsx", role: "로딩 중일 때 자동으로 표시", icon: "loading" },
  { file: "app/users/error.tsx", role: "에러 발생 시 자동으로 표시", icon: "error" },
];

export const FETCH_FLOW = [
  { step: "1", label: "요청", desc: "페이지 접속 시 서버에서 fetch 실행" },
  { step: "2", label: "로딩", desc: "loading.tsx가 자동으로 표시됨" },
  { step: "3a", label: "성공", desc: "데이터를 받아 page.tsx 렌더링" },
  { step: "3b", label: "실패", desc: "error.tsx가 자동으로 표시됨" },
];

/* ── Section 5: 폼 & 이벤트 패턴 ── */

export const FORM_CONCEPT = {
  title: "폼 & 이벤트 패턴",
  desc: "로그인, 회원가입, 글쓰기, 검색 등 사용자 입력이 필요한 모든 곳에서 사용하는 패턴입니다. useState로 입력값을 관리하고, 이벤트 핸들러로 동작을 처리합니다.",
};

export const EVENT_TYPES = [
  { event: "onClick", desc: "클릭했을 때", example: '<button onClick={handleClick}>클릭</button>', useCase: "버튼, 카드 클릭" },
  { event: "onChange", desc: "값이 변경될 때", example: '<input onChange={handleChange} />', useCase: "텍스트 입력, 체크박스" },
  { event: "onSubmit", desc: "폼 제출할 때", example: '<form onSubmit={handleSubmit}>', useCase: "로그인, 검색, 글쓰기" },
];

export const FORM_BASIC_CODE = `"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // 페이지 새로고침 방지
    console.log("로그인 시도:", email, password);
  };

  return (
    <form onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">로그인</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="w-full border rounded-lg px-4 py-2"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="w-full border rounded-lg px-4 py-2"
      />

      <button type="submit"
        className="w-full bg-blue-500 text-white
          py-2 rounded-lg hover:bg-blue-600">
        로그인
      </button>
    </form>
  );
}`;

export const FORM_PATTERN_STEPS = [
  { num: "1", title: '"use client" 선언', desc: "폼은 브라우저 이벤트를 사용하므로 반드시 Client Component", code: '"use client";' },
  { num: "2", title: "useState로 입력값 관리", desc: "각 input마다 state를 하나씩 만듦", code: 'const [email, setEmail] = useState("");' },
  { num: "3", title: "onChange로 입력값 추적", desc: "input에 타이핑할 때마다 state를 업데이트", code: "onChange={(e) => setEmail(e.target.value)}" },
  { num: "4", title: "onSubmit으로 제출 처리", desc: "폼 전송 시 e.preventDefault() 후 로직 실행", code: '<form onSubmit={handleSubmit}>' },
];

export const SEARCH_CODE = `"use client";

import { useState } from "react";

const allItems = [
  "React", "Next.js", "TypeScript",
  "Tailwind CSS", "Node.js", "PostgreSQL",
];

export default function SearchBox() {
  const [query, setQuery] = useState("");

  // 입력값으로 필터링
  const filtered = allItems.filter((item) =>
    item.toLowerCase().includes(
      query.toLowerCase()
    )
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full border rounded-lg
          px-4 py-2 mb-4"
      />
      <ul className="space-y-2">
        {filtered.map((item) => (
          <li key={item}
            className="border rounded-lg px-4 py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}`;

/* ── Section 6: 조건부 렌더링 패턴 ── */

export const CONDITIONAL_CONCEPT = {
  title: "조건부 렌더링 패턴",
  desc: "화면에 항상 같은 내용이 보이는 것이 아니라, 상황에 따라 다른 UI를 보여줘야 합니다. 로딩 중일 때, 에러가 났을 때, 데이터가 비어있을 때, 로그인 상태에 따라 — 각각 다른 화면을 렌더링합니다.",
};

export const CONDITIONAL_FOUR_STATES = [
  { state: "로딩 중", desc: "데이터를 가져오는 중", ui: "스피너 또는 스켈레톤 UI", color: "border-t-sky-500" },
  { state: "에러", desc: "데이터를 가져오는 데 실패", ui: "에러 메시지 + 재시도 버튼", color: "border-t-red-500" },
  { state: "빈 데이터", desc: "데이터는 성공적으로 왔지만 0건", ui: '"결과가 없습니다" 메시지', color: "border-t-yellow-500" },
  { state: "정상", desc: "데이터가 정상적으로 존재", ui: "실제 콘텐츠 렌더링", color: "border-t-(--accent)" },
];

export const CONDITIONAL_BASIC_CODE = `// 1) 삼항 연산자 — 둘 중 하나를 보여줄 때
{isLoggedIn ? (
  <p>환영합니다, {userName}님!</p>
) : (
  <p>로그인이 필요합니다</p>
)}

// 2) && 연산자 — 조건이 참일 때만 보여줄 때
{isAdmin && (
  <button>관리자 패널</button>
)}

// 3) early return — 컴포넌트 전체를 분기할 때
if (isLoading) return <Loading />;
if (error) return <Error />;
if (data.length === 0) return <Empty />;
return <DataList data={data} />;`;

export const CONDITIONAL_FULL_PATTERN_CODE = `"use client";

import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  // 1) 로딩 중
  if (isLoading) {
    return <div className="animate-pulse">
      로딩 중...
    </div>;
  }

  // 2) 에러
  if (error) {
    return <div className="text-red-500">
      에러: {error}
    </div>;
  }

  // 3) 빈 데이터
  if (posts.length === 0) {
    return <div className="text-gray-500">
      게시글이 없습니다
    </div>;
  }

  // 4) 정상 렌더링
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`;

export const AI_PROMPT_TIPS = [
  {
    pattern: "Server vs Client",
    bad: "페이지 만들어줘",
    good: "Server Component로 게시글 목록 페이지 만들어줘. 데이터는 서버에서 fetch해",
    why: "AI가 불필요하게 \"use client\"를 붙이는 것을 방지",
  },
  {
    pattern: "레이아웃",
    bad: "헤더 추가해줘",
    good: "app/layout.tsx에 공통 Navbar 컴포넌트를 추가해줘",
    why: "layout에 넣어야 모든 페이지에 적용됨을 명시",
  },
  {
    pattern: "리스트 → 상세",
    bad: "상품 페이지 만들어줘",
    good: "/products 목록 페이지와 /products/[id] 상세 페이지를 만들어줘. Link로 연결해",
    why: "목록-상세 구조와 동적 라우트를 명확히 지정",
  },
  {
    pattern: "데이터 Fetching",
    bad: "API에서 데이터 가져와줘",
    good: "Server Component에서 fetch로 데이터를 가져오고, loading.tsx와 error.tsx도 만들어줘",
    why: "로딩/에러 처리까지 포함하도록 요청",
  },
  {
    pattern: "폼",
    bad: "로그인 만들어줘",
    good: "Client Component로 로그인 폼 만들어줘. email, password를 useState로 관리하고 onSubmit 처리해",
    why: "상태 관리 방식과 이벤트 처리를 구체적으로 지정",
  },
  {
    pattern: "조건부 렌더링",
    bad: "데이터 보여줘",
    good: "로딩 중/에러/빈 데이터/정상 4가지 상태를 구분해서 렌더링해줘",
    why: "모든 상태를 고려한 완성도 높은 코드 요청",
  },
];

export const COMMON_MISTAKES = [
  {
    mistake: '"use client" 빠뜨림',
    symptom: "useState, onClick 등 사용 시 에러 발생",
    fix: '파일 맨 위에 "use client" 추가',
  },
  {
    mistake: "key prop 누락",
    symptom: "map()으로 리스트 렌더링 시 콘솔 경고",
    fix: "map() 안의 최상위 요소에 key={고유값} 추가",
  },
  {
    mistake: "Client Component에 async 사용",
    symptom: '"use client" 파일에서 async function 에러',
    fix: "데이터 fetch는 Server Component에서 하거나 useEffect 사용",
  },
  {
    mistake: "e.preventDefault() 누락",
    symptom: "폼 제출 시 페이지가 새로고침됨",
    fix: "onSubmit 핸들러 첫 줄에 e.preventDefault() 추가",
  },
  {
    mistake: "import 경로 오타",
    symptom: "Module not found 에러",
    fix: "@/ 경로와 파일명 대소문자 확인",
  },
];

/* ── Summary ── */

export const WEEK3_SUMMARY = [
  "Server Component(기본) vs Client Component(\"use client\") 구분",
  "layout.tsx로 공통 UI를 감싸는 레이아웃 패턴",
  "목록 페이지 → 상세 페이지 (리스트-디테일 패턴)",
  "Server Component에서 async/await로 데이터 가져오기",
  "useState + onChange + onSubmit으로 폼 처리하기",
  "로딩/에러/빈 데이터/정상 — 4가지 상태 분기 패턴",
];
