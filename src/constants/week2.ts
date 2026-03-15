/* ── Week 2 콘텐츠 데이터 ── */

export const WEEK2_TAGS = ["Node.js", "npm", "TypeScript", "React", "Next.js", "Routing"];

export const WEEK2_TOC = [
  { num: "01", title: "Node.js와 npm", href: "#npm" },
  { num: "02", title: "TypeScript 기초", href: "#typescript" },
  { num: "03", title: "React 기초", href: "#react" },
  { num: "04", title: "Tailwind CSS", href: "#tailwind" },
  { num: "05", title: "Next.js 프로젝트 생성", href: "#create" },
  { num: "06", title: "페이지와 라우팅", href: "#routing" },
];

/* ── Section 1: Node.js & npm ── */

export const NODEJS_CONCEPT = {
  title: "Node.js",
  desc: "JavaScript를 웹 브라우저 밖에서도 실행할 수 있게 해주는 실행 환경(Runtime)입니다. 원래 JavaScript는 브라우저 안에서만 동작했지만, Node.js 덕분에 컴퓨터에서도 직접 실행할 수 있게 되었습니다.",
};

export const NODEJS_WHY = [
  {
    label: "브라우저 밖에서 JS 실행",
    desc: "터미널(명령어 창)에서 JavaScript 파일을 직접 실행할 수 있습니다. 서버도 만들 수 있습니다.",
    color: "border-t-(--accent)",
  },
  {
    label: "개발 도구의 기반",
    desc: "React, Next.js, Tailwind CSS 등 거의 모든 프론트엔드 도구가 Node.js 위에서 동작합니다.",
    color: "border-t-violet-500",
  },
  {
    label: "npm 포함",
    desc: "Node.js를 설치하면 npm(패키지 매니저)이 자동으로 함께 설치됩니다.",
    color: "border-t-sky-500",
  },
];

export const NODEJS_FLOW = `1. Node.js 설치 (1주차에 완료!)
      ↓
2. npm 사용 가능 (자동 포함)
      ↓
3. npm으로 React, Next.js 등 설치
      ↓
4. 개발 서버 실행 (npm run dev)
      ↓
5. 브라우저에서 결과 확인`;

export const NODEJS_CHECK_COMMANDS = [
  { cmd: "$ node -v", desc: "Node.js 버전 확인", result: "v22.x.x" },
  { cmd: "$ npm -v", desc: "npm 버전 확인", result: "10.x.x" },
];

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

export const REACT_WHY_PROBLEM = `<!-- 전통적인 방식: HTML + JavaScript -->
<p id="count">클릭 횟수: 0</p>
<button onclick="increase()">+1</button>

<script>
  let count = 0;
  function increase() {
    count++;
    // 직접 DOM을 찾아서 수정해야 함
    document.getElementById("count")
      .textContent = "클릭 횟수: " + count;
  }
</script>`;

export const REACT_WHY_SOLUTION = `"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* count가 바뀌면 React가 알아서 화면을 다시 그림 */}
      <p>클릭 횟수: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`;

export const REACT_WHY_POINTS = [
  {
    label: "자동 화면 업데이트",
    desc: "데이터(상태)가 바뀌면 React가 알아서 화면을 다시 그려줍니다. DOM을 직접 건드릴 필요가 없습니다.",
    color: "border-t-(--accent)",
  },
  {
    label: "컴포넌트 재사용",
    desc: "한 번 만든 버튼, 카드 같은 UI 조각을 여러 곳에서 반복 사용할 수 있습니다.",
    color: "border-t-violet-500",
  },
  {
    label: "거대한 생태계",
    desc: "수십만 개의 라이브러리, 활발한 커뮤니티, 풍부한 학습 자료가 있습니다.",
    color: "border-t-sky-500",
  },
];

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

export const COMPONENT_STRUCTURE = `// 컴포넌트의 기본 구조
function 컴포넌트이름() {    // 1. 함수로 선언
  // 이 안에서 데이터 처리, 상태 관리 등

  return (                   // 2. JSX를 반환
    <div>
      <h1>화면에 보여줄 내용</h1>
    </div>
  );
}

// 컴포넌트 이름은 반드시 대문자로 시작!
// Button ⭕  button ❌`;

export const COMPONENT_COMPOSITION = `// 작은 컴포넌트를 조합해서 페이지를 만든다
function Navbar() {
  return <nav>네비게이션 바</nav>;
}

function Card() {
  return <div>카드 내용</div>;
}

function Footer() {
  return <footer>푸터</footer>;
}

// 페이지 = 컴포넌트의 조합
export default function Page() {
  return (
    <div>
      <Navbar />         {/* 네비게이션 */}
      <Card />           {/* 카드 1 */}
      <Card />           {/* 카드 2 (재사용!) */}
      <Footer />         {/* 푸터 */}
    </div>
  );
}`;

export const JSX_EXAMPLE = `// JSX — JavaScript 안에 HTML처럼 작성
export default function Hello() {
  return (
    <div className="p-4">
      <h1>안녕하세요!</h1>
      <p>React 컴포넌트입니다.</p>
    </div>
  );
}`;

export const JSX_RULES = [
  {
    rule: "하나의 부모 요소로 감싸기",
    bad: `return (
  <h1>제목</h1>
  <p>내용</p>
);`,
    good: `return (
  <div>
    <h1>제목</h1>
    <p>내용</p>
  </div>
);`,
    desc: "여러 요소를 반환할 때는 반드시 하나의 부모 태그로 감싸야 합니다.",
  },
  {
    rule: "class → className",
    bad: `<div class="box">`,
    good: `<div className="box">`,
    desc: "HTML의 class는 JS 예약어라서 className을 씁니다.",
  },
  {
    rule: "JS 표현식은 { }로",
    bad: `<p>이름: name</p>`,
    good: `<p>이름: {name}</p>`,
    desc: "변수, 계산식, 함수 호출을 넣을 때 중괄호로 감쌉니다.",
  },
  {
    rule: "self-closing 태그",
    bad: `<img src="a.png">
<br>`,
    good: `<img src="a.png" />
<br />`,
    desc: "닫는 태그가 없는 요소는 반드시 />로 닫아야 합니다.",
  },
];

export const JSX_EXPRESSION_EXAMPLES = `const name = "Alice";
const age = 25;
const items = ["React", "Next.js", "Tailwind"];

return (
  <div>
    {/* 변수 출력 */}
    <p>이름: {name}</p>

    {/* 계산식 */}
    <p>내년 나이: {age + 1}</p>

    {/* 조건부 렌더링 */}
    <p>{age >= 20 ? "성인" : "미성년자"}</p>

    {/* 배열 반복 */}
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);`;

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

export const PROPS_STEP_BY_STEP = {
  step1: `// 문제: 같은 구조를 반복해서 작성
<div className="border rounded p-4">
  <h2>React</h2>
  <p>UI 라이브러리</p>
</div>
<div className="border rounded p-4">
  <h2>Next.js</h2>
  <p>React 프레임워크</p>
</div>
<div className="border rounded p-4">
  <h2>Tailwind</h2>
  <p>CSS 프레임워크</p>
</div>`,
  step2: `// 해결: 컴포넌트로 만들고 Props로 데이터 전달
interface CardProps {
  title: string;   // 필수 props
  desc: string;    // 필수 props
}

function Card({ title, desc }: CardProps) {
  return (
    <div className="border rounded p-4">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}`,
  step3: `// 결과: 데이터만 바꿔서 재사용!
<Card title="React" desc="UI 라이브러리" />
<Card title="Next.js" desc="React 프레임워크" />
<Card title="Tailwind" desc="CSS 프레임워크" />

{/* 3줄로 끝! 구조 변경도 Card 하나만 수정하면 됨 */}`,
};

export const PROPS_ANALOGY = [
  {
    label: "함수의 매개변수",
    desc: "Props는 함수에 값을 전달하는 것과 같습니다. 컴포넌트(함수)에 데이터(매개변수)를 넣어줍니다.",
    color: "border-t-(--accent)",
  },
  {
    label: "읽기 전용",
    desc: "Props는 부모가 주는 것이므로 자식이 변경할 수 없습니다. 변경이 필요하면 State를 씁니다.",
    color: "border-t-violet-500",
  },
  {
    label: "위에서 아래로",
    desc: "데이터는 항상 부모 → 자식 방향으로만 흐릅니다. 이것을 '단방향 데이터 흐름'이라고 합니다.",
    color: "border-t-sky-500",
  },
];

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

export const STATE_SYNTAX = `const [값, 값을바꾸는함수] = useState(초기값);

// 예시:
const [count, setCount] = useState(0);
//      ↑        ↑                   ↑
//    현재 값  업데이트 함수      초기값(0)`;

export const STATE_EXAMPLES = [
  { name: "숫자", code: `const [count, setCount] = useState(0);`, update: `setCount(count + 1);  // 0 → 1 → 2 ...` },
  { name: "문자열", code: `const [name, setName] = useState("");`, update: `setName("Alice");     // "" → "Alice"` },
  { name: "불리언 (토글)", code: `const [open, setOpen] = useState(false);`, update: `setOpen(!open);       // false ↔ true` },
  { name: "배열", code: `const [items, setItems] = useState<string[]>([]);`, update: `setItems([...items, "새 항목"]);` },
];

export const STATE_TOGGLE_EXAMPLE = `"use client";
import { useState } from "react";

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <p>상태: {isOn ? "켜짐" : "꺼짐"}</p>
      <button onClick={() => setIsOn(!isOn)}>
        {isOn ? "끄기" : "켜기"}
      </button>
    </div>
  );
}

// 버튼을 누를 때마다:
// false → true → false → true ...
// "꺼짐" → "켜짐" → "꺼짐" → "켜짐" ...`;

/* ── Section 4: Tailwind CSS ── */

export const CSS_WHAT_IS = {
  html: `<!-- HTML = 구조 (건물의 뼈대) -->
<button>클릭하세요</button>`,
  css: `/* CSS = 스타일 (건물의 인테리어) */
button {
  background-color: blue;   /* 배경색 */
  color: white;              /* 글자색 */
  padding: 8px 16px;         /* 안쪽 여백 */
  border-radius: 8px;        /* 모서리 둥글게 */
  font-size: 14px;           /* 글자 크기 */
}`,
};

export const CSS_PROBLEMS = [
  {
    problem: "파일이 분리됨",
    desc: "HTML 파일과 CSS 파일을 왔다 갔다 하면서 작업해야 합니다. 어떤 스타일이 어디에 적용되는지 추적하기 어렵습니다.",
    color: "border-t-red-400",
  },
  {
    problem: "이름 충돌",
    desc: "클래스 이름을 직접 지어야 합니다. 프로젝트가 커지면 .button, .btn, .primary-btn 같은 이름이 겹칠 수 있습니다.",
    color: "border-t-red-400",
  },
  {
    problem: "사용하지 않는 CSS",
    desc: "삭제한 HTML 요소의 CSS가 남아 파일이 점점 커집니다. 어떤 CSS가 아직 쓰이는지 확인하기 어렵습니다.",
    color: "border-t-red-400",
  },
];

export const TAILWIND_VS_CSS = {
  css: `/* 기존 방식: CSS 파일 따로 작성 */
.button {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
}`,
  tailwind: `{/* Tailwind: HTML 안에서 바로 스타일링 */}
<button className="bg-blue-500 text-white
  px-4 py-2 rounded-lg">
  버튼
</button>

{/* CSS 파일이 필요 없음! */}`,
};

export const TAILWIND_BENEFITS = [
  {
    label: "CSS 파일 불필요",
    desc: "HTML(JSX) 안에서 클래스만 적으면 끝. 파일을 왔다 갔다 할 필요 없습니다.",
    color: "border-t-(--accent)",
  },
  {
    label: "이름 고민 없음",
    desc: "미리 정해진 클래스(bg-blue-500, p-4 등)를 사용합니다. 이름 짓기 스트레스가 없습니다.",
    color: "border-t-violet-500",
  },
  {
    label: "일관된 디자인",
    desc: "정해진 색상, 간격 체계를 따르므로 디자인이 자연스럽게 통일됩니다.",
    color: "border-t-sky-500",
  },
];

export const TAILWIND_LAYOUT_FLEX = `{/* flex: 자식 요소를 가로로 나란히 배치 */}
<div className="flex gap-4">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>
{/* 결과: [A] [B] [C]  ← 가로로 나란히 */}

{/* flex-col: 세로로 배치 */}
<div className="flex flex-col gap-4">
  <div>A</div>
  <div>B</div>
</div>
{/* 결과: [A]
          [B]  ← 세로로 쌓임 */}`;

export const TAILWIND_LAYOUT_GRID = `{/* grid: 격자(표) 형태로 배치 */}
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
{/* 결과: [1] [2] [3]
          [4] [5] [6]  ← 3열 격자 */}`;

export const TAILWIND_FLEX_OPTIONS = [
  { cls: "flex", desc: "가로 배치 (기본)" },
  { cls: "flex-col", desc: "세로 배치" },
  { cls: "items-center", desc: "세로 가운데 정렬" },
  { cls: "justify-center", desc: "가로 가운데 정렬" },
  { cls: "justify-between", desc: "양 끝 정렬 (사이 균등)" },
  { cls: "gap-4", desc: "자식 간 간격 (16px)" },
];

export const TAILWIND_SPACING_DIAGRAM = [
  { cls: "p-4", meaning: "padding: 16px (사방)", direction: "안쪽 전체" },
  { cls: "px-4", meaning: "padding-left/right: 16px", direction: "안쪽 좌우" },
  { cls: "py-4", meaning: "padding-top/bottom: 16px", direction: "안쪽 상하" },
  { cls: "pt-4", meaning: "padding-top: 16px", direction: "안쪽 위" },
  { cls: "m-4", meaning: "margin: 16px (사방)", direction: "바깥 전체" },
  { cls: "mx-auto", meaning: "margin-left/right: auto", direction: "가로 가운데 정렬" },
  { cls: "mt-4", meaning: "margin-top: 16px", direction: "바깥 위" },
  { cls: "mb-4", meaning: "margin-bottom: 16px", direction: "바깥 아래" },
];

export const TAILWIND_SIZE_SCALE = [
  { num: "1", px: "4px" },
  { num: "2", px: "8px" },
  { num: "3", px: "12px" },
  { num: "4", px: "16px" },
  { num: "6", px: "24px" },
  { num: "8", px: "32px" },
  { num: "10", px: "40px" },
  { num: "12", px: "48px" },
  { num: "16", px: "64px" },
];

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
