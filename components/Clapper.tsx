"use client";

interface ClapperProps {
  color?: string;
}

export default function Clapper({ color }: ClapperProps) {
  return (
    <div
      style={{
        width: 60,
        height: 60,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 44,
        filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.5))",
      }}
    >
      🎬
    </div>
  );
}
