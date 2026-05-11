"use client";

import { useState, useRef, useCallback } from "react";
import { ACTORS } from "@/data/actors";
import { Actor, FilterMode } from "@/types";
import Clapper from "./Clapper";

interface ActorsScreenProps {
  onBack: () => void;
}

export default function ActorsScreen({ onBack }: ActorsScreenProps) {
  const [actor, setActor] = useState<Actor | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinName, setSpinName] = useState("");
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<FilterMode>("any");
  const spinRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const usedRef = useRef<Set<string>>(new Set());

  const pick = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setRevealed(false);

    let pool = ACTORS.filter((a) =>
      mode === "active"
        ? a.status === "نشط"
        : mode === "retired"
        ? a.status === "راحل"
        : true
    );
    if (!pool.length) pool = ACTORS;

    let available = pool.filter((a) => !usedRef.current.has(a.name));
    if (!available.length) {
      usedRef.current.clear();
      available = pool;
    }

    const chosen = available[Math.floor(Math.random() * available.length)];
    usedRef.current.add(chosen.name);

    let i = 0;
    const names = pool.map((a) => a.name);
    spinRef.current = setInterval(() => {
      setSpinName(names[i++ % names.length]);
    }, 80);

    setTimeout(() => {
      if (spinRef.current) clearInterval(spinRef.current);
      setActor(chosen);
      setSpinning(false);
      setCount((c) => c + 1);
      setTimeout(() => setRevealed(true), 60);
    }, 1200);
  }, [spinning, mode]);

  const ac = "#a78bfa";

  const Tab = ({
    val,
    label,
    icon,
  }: {
    val: FilterMode;
    label: string;
    icon: string;
  }) => {
    const a = mode === val;
    return (
      <button
        onClick={() => setMode(val)}
        style={{
          flex: 1,
          padding: "10px 6px",
          borderRadius: 10,
          border: `1.5px solid ${a ? ac : "#1c2535"}`,
          background: a ? "#0e0a1a" : "#0b0e16",
          color: a ? ac : "#4a5568",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "Georgia,serif",
          cursor: "pointer",
          transition: "all 0.18s",
        }}
      >
        {icon} {label}
      </button>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% -10%,#0e0a1a,#050809 55%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia,serif",
        padding: "20px 16px",
        direction: "rtl",
      }}
    >
      {/* back + header */}
      <div
        style={{
          width: "min(430px,93vw)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "#0b0e16",
            border: "1px solid #1c2535",
            borderRadius: 10,
            color: "#6b7280",
            padding: "8px 14px",
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "Georgia,serif",
          }}
        >
          ← رجوع
        </button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(18px,4vw,28px)",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            🎬 ممثلون
          </h2>
          <p style={{ fontSize: 11, color: "#2d2d4a", margin: 0 }}>
            {ACTORS.length} ممثل مصري
          </p>
        </div>
      </div>

      {/* tabs */}
      <div
        style={{
          width: "min(430px,93vw)",
          display: "flex",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <Tab val="any" label="الكل" icon="🌍" />
        <Tab val="active" label="نشط" icon="🟢" />
        <Tab val="retired" label="راحل" icon="🕊️" />
      </div>

      {/* card */}
      <div
        style={{
          width: "min(430px,93vw)",
          marginBottom: 18,
          background: "linear-gradient(145deg,#0f0c1e,#1a1230,#0f0c1e)",
          border: `1px solid ${actor ? ac + "55" : "#1c2535"}`,
          borderRadius: 20,
          padding: 22,
          minHeight: 280,
          boxShadow: actor
            ? `0 0 40px ${ac}18,0 20px 55px rgba(0,0,0,0.7)`
            : "0 16px 50px rgba(0,0,0,0.5)",
          transition: "border-color 0.4s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {spinning && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              padding: "28px 0",
            }}
          >
            <div
              style={{ fontSize: 48, animation: "spin 0.35s linear infinite" }}
            >
              🎬
            </div>
            <div
              style={{
                color: ac,
                fontSize: 17,
                fontWeight: "bold",
                minHeight: 26,
                textAlign: "center",
              }}
            >
              {spinName}
            </div>
          </div>
        )}

        {!spinning && !actor && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              opacity: 0.2,
              padding: "28px 0",
            }}
          >
            <div style={{ fontSize: 52 }}>🎭</div>
            <div style={{ color: "#9ca3af", fontSize: 14 }}>
              اضغط الزرار وشوف مين هيجيلك
            </div>
          </div>
        )}

        {!spinning && actor && (
          <div
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(10px)",
              transition: "all 0.4s ease",
            }}
          >
            {/* top row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 13,
                marginBottom: 16,
              }}
            >
              <Clapper color={ac} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "clamp(17px,3.8vw,24px)",
                    fontWeight: "bold",
                    color: "#fff",
                    lineHeight: 1.15,
                    marginBottom: 4,
                  }}
                >
                  {actor.name}
                </div>
                <div
                  style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}
                >
                  📅 {actor.birth}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span
                    style={{
                      background: ac + "22",
                      border: `1px solid ${ac}55`,
                      color: ac,
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {actor.knownFor.slice(0, 20)}...
                  </span>
                  <span
                    style={{
                      background:
                        actor.status === "نشط"
                          ? "#22c55e1a"
                          : "#6b72801a",
                      border: `1px solid ${
                        actor.status === "نشط"
                          ? "#22c55e55"
                          : "#6b728055"
                      }`,
                      color:
                        actor.status === "نشط" ? "#4ade80" : "#9ca3af",
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {actor.status === "نشط" ? "🟢 نشط" : "🕊️ راحل"}
                  </span>
                  <span
                    style={{
                      background: "#eab3081a",
                      border: "1px solid #eab30855",
                      color: "#eab308",
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    ★ {actor.rating}/10
                  </span>
                </div>
              </div>
            </div>

            {/* known for */}
            <div
              style={{
                background: ac + "0c",
                border: `1px solid ${ac}20`,
                borderRadius: 10,
                padding: "8px 12px",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: "#4a5568",
                  letterSpacing: "1.4px",
                  marginBottom: 3,
                }}
              >
                🎭 مشهور بـ
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#c0cad6",
                  lineHeight: 1.5,
                }}
              >
                {actor.knownFor}
              </div>
            </div>

            {/* movies */}
            <div
              style={{
                background: "#07090d",
                border: "1px solid #1c2535",
                borderRadius: 10,
                padding: "9px 12px",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: "#f97316",
                  letterSpacing: "2px",
                  marginBottom: 4,
                }}
              >
                🎥 أبرز الأفلام
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#c0cad6",
                  lineHeight: 1.65,
                }}
              >
                {actor.movies}
              </div>
            </div>

            {/* tv */}
            <div
              style={{
                background: "#07090d",
                border: "1px solid #1c2535",
                borderRadius: 10,
                padding: "9px 12px",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: "#38bdf8",
                  letterSpacing: "2px",
                  marginBottom: 4,
                }}
              >
                📺 أبرز المسلسلات
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#c0cad6",
                  lineHeight: 1.65,
                }}
              >
                {actor.tvShows}
              </div>
            </div>

            {/* fact */}
            <div
              style={{
                background: "#07090d",
                border: "1px solid #1c2535",
                borderRadius: 10,
                padding: "9px 12px",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: ac,
                  letterSpacing: "2px",
                  marginBottom: 4,
                }}
              >
                ⭐ حقيقة مشهورة
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#c0cad6",
                  lineHeight: 1.65,
                }}
              >
                {actor.fact}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* button */}
      <button
        onClick={pick}
        disabled={spinning}
        style={{
          background: spinning
            ? "#1c2535"
            : "linear-gradient(135deg,#7c3aed,#6d28d9)",
          border: "none",
          borderRadius: 50,
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
          fontFamily: "Georgia,serif",
          padding: "16px 48px",
          cursor: spinning ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          boxShadow: spinning
            ? "none"
            : "0 0 24px #7c3aed44,0 8px 20px rgba(0,0,0,0.4)",
        }}
      >
        {spinning ? "🎬  جاري الاختيار..." : "🎲  اختار ممثل"}
      </button>

      {count > 0 && !spinning && (
        <div style={{ marginTop: 10, fontSize: 11, color: "#1e1e38" }}>
          تم الاختيار {count}
          {count === 1 ? " مرة" : " مرات"}
        </div>
      )}
    </div>
  );
}
