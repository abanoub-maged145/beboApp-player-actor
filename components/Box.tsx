"use client";

interface BoxProps {
  label: string;
  value: string;
  accent?: string;
}

export default function Box({ label, value, accent }: BoxProps) {
  return (
    <div
      style={{
        background: accent
          ? `linear-gradient(135deg,${accent}12,#07090d)`
          : "#07090d",
        border: `1px solid ${accent ? accent + "33" : "#1c2535"}`,
        borderRadius: 10,
        padding: "10px 12px",
      }}
    >
      <div
        style={{
          fontSize: 9,
          color: "#4a5568",
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 12,
          color: accent || "#d1d8e0",
          fontWeight: 700,
          lineHeight: 1.4,
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
}
