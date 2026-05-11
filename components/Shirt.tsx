"use client";

interface ShirtProps {
  color: string;
}

export default function Shirt({ color }: ShirtProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={60}
      height={60}
      style={{ flexShrink: 0, filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.5))" }}
    >
      <defs>
        <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color + "aa"} />
        </linearGradient>
      </defs>
      <path
        d="M20 15 L5 35 L20 42 L20 88 L80 88 L80 42 L95 35 L80 15 C75 20 60 24 50 24 C40 24 25 20 20 15Z"
        fill="url(#sg)"
      />
      <path
        d="M20 15 L5 35 L20 42 L20 88 L80 88 L80 42 L95 35 L80 15 C75 20 60 24 50 24 C40 24 25 20 20 15Z"
        fill="none"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
