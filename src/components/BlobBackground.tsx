"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Blob {
  id: number;
  color: string;
  size: number;
  top: string;
  left: string;
}

const COLORS: [number, number, number][] = [
  [99,  102, 241],  // indigo
  [139, 92,  246],  // violet
  [168, 85,  247],  // purple
  [59,  130, 246],  // blue
  [6,   182, 212],  // cyan
  [20,  184, 166],  // teal
  [16,  185, 129],  // emerald
  [52,  211, 153],  // green
];

function rnd(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function generateBlobs(): Blob[] {
  const count = 9 + Math.floor(Math.random() * 4); // 9–12개
  const used = new Set<number>();
  return Array.from({ length: count }, (_, i) => {
    // 같은 색 연속 방지
    let colorIdx: number;
    do { colorIdx = Math.floor(Math.random() * COLORS.length); } while (used.has(colorIdx));
    used.add(colorIdx);
    if (used.size >= COLORS.length) used.clear();

    const [r, g, b] = COLORS[colorIdx];
    const opacity = rnd(0.13, 0.28).toFixed(2);
    const size = Math.round(rnd(300, 700));
    const top  = Math.round(rnd(-60, 130));  // -60vh ~ 130vh (화면 밖 포함)
    const left = Math.round(rnd(-40, 120));  // -40vw ~ 120vw (화면 밖 포함)
    return { id: i, color: `rgba(${r},${g},${b},${opacity})`, size, top: `${top}vh`, left: `${left}vw` };
  });
}

// 모듈 레벨: SPA 탐색 간 유지, 새로고침마다 초기화
let cachedBlobs: Blob[] | null = null;

export default function BlobBackground() {
  const [blobs, setBlobs] = useState<Blob[]>(cachedBlobs ?? []);
  const pathname = usePathname();

  useEffect(() => {
    // 메인 페이지에 올 때마다 새로 생성
    if (pathname === "/") {
      const next = generateBlobs();
      cachedBlobs = next;
      setBlobs(next);
    } else if (cachedBlobs === null) {
      // 주차 페이지로 직접 진입 시 초기 생성
      const next = generateBlobs();
      cachedBlobs = next;
      setBlobs(next);
    }
    // week 페이지로 이동 시엔 기존 캐시 유지 → 아무것도 안 함
  }, [pathname]);

  return (
    <div
      id="bg-blobs"
      style={{
        position: "fixed", top: 0, left: "-100vw",
        width: "300vw", height: "100vh",
        display: "flex", pointerEvents: "none", zIndex: 0,
        transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {[0, 1, 2].map((panel) => (
        <div key={panel} style={{ position: "relative", width: "100vw", height: "100vh", flexShrink: 0 }}>
          {blobs.map((blob) => (
            <div
              key={blob.id}
              style={{
                position: "absolute",
                width: blob.size,
                height: blob.size,
                top: blob.top,
                left: blob.left,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
