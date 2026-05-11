"use client";

import { useState, useRef, useCallback } from "react";
import { PLAYERS, POS_COLORS } from "@/data/players";
import { Player, FilterMode } from "@/types";
import Shirt from "./Shirt";
import Box from "./Box";

interface FootballScreenProps {
  onBack: () => void;
}

export default function FootballScreen({ onBack }: FootballScreenProps) {
  const [player, setPlayer] = useState<Player | null>(null);
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

    let pool = PLAYERS.filter((p) =>
      mode === "active" ? p.active === true : mode === "retired" ? p.active === false : true
    );
    if (!pool.length) pool = PLAYERS;

    let available = pool.filter((p) => !usedRef.current.has(p.nameOriginal));
    if (!available.length) {
      usedRef.current.clear();
      available = pool;
    }

    const chosen = available[Math.floor(Math.random() * available.length)];
    usedRef.current.add(chosen.nameOriginal);

    let i = 0;
    const names = pool.map((p) => p.name);
    spinRef.current = setInterval(() => {
      setSpinName(names[i++ % names.length]);
    }, 80);

    setTimeout(() => {
      if (spinRef.current) clearInterval(spinRef.current);
      setPlayer(chosen);
      setSpinning(false);
      setCount((c) => c + 1);
      setTimeout(() => setRevealed(true), 60);
    }, 1200);
  }, [spinning, mode]);

  const pc = player ? POS_COLORS[player.position] || "#22c55e" : "#22c55e";

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
          border: `1.5px solid ${a ? "#4ade80" : "#1c2535"}`,
          background: a ? "#0a2016" : "#0b0e16",
          color: a ? "#4ade80" : "#4a5568",
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
        background: "radial-gradient(ellipse at 50% 0%,#041a0e,#050809 55%)",
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
            ⚽ لاعبون
          </h2>
          <p style={{ fontSize: 11, color: "#2d3d4a", margin: 0 }}>
            {PLAYERS.length} لاعب أسطوري
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
        <Tab val="active" label="حالي" icon="🟢" />
        <Tab val="retired" label="معتزل" icon="🏅" />
      </div>

      {/* card */}
      <div
        style={{
          width: "min(430px,93vw)",
          marginBottom: 18,
          background: "linear-gradient(145deg,#0e1721,#18212e,#0e1721)",
          border: `1px solid ${player ? pc + "55" : "#1c2535"}`,
          borderRadius: 20,
          padding: 22,
          minHeight: 280,
          boxShadow: player
            ? `0 0 40px ${pc}18,0 20px 55px rgba(0,0,0,0.7)`
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
            <div style={{ fontSize: 48, animation: "spin 0.35s linear infinite" }}>
              ⚽
            </div>
            <div
              style={{
                color: "#4ade80",
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

        {!spinning && !player && (
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
            <div style={{ fontSize: 52 }}>🌍</div>
            <div style={{ color: "#9ca3af", fontSize: 14 }}>
              اضغط الزرار وشوف مين هيجيلك
            </div>
          </div>
        )}

        {!spinning && player && (
          <div
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(10px)",
              transition: "all 0.4s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 13,
                marginBottom: 16,
              }}
            >
              <Shirt color={pc} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "clamp(17px,3.8vw,24px)",
                    fontWeight: "bold",
                    color: "#fff",
                    lineHeight: 1.15,
                    marginBottom: 2,
                  }}
                >
                  {player.name}
                </div>
                {player.nameOriginal !== player.name && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "#374151",
                      fontStyle: "italic",
                      marginBottom: 4,
                    }}
                  >
                    {player.nameOriginal}
                  </div>
                )}
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>
                  {player.country}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span
                    style={{
                      background: pc + "22",
                      border: `1px solid ${pc}55`,
                      color: pc,
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {player.position}
                  </span>
                  <span
                    style={{
                      background: player.active ? "#22c55e1a" : "#6b72801a",
                      border: `1px solid ${
                        player.active ? "#22c55e55" : "#6b728055"
                      }`,
                      color: player.active ? "#4ade80" : "#9ca3af",
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {player.active ? "🟢 نشط" : "🏅 معتزل"}
                  </span>
                  {player.rating && (
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
                      ★ {player.rating}/10
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 7,
                marginBottom: 9,
              }}
            >
              <Box label="الحقبة" value={player.era} />
              <Box label="الأهداف" value={player.goals} />
              <Box label="أبرز الأندية" value={player.clubs} />
              <Box
                label="الألقاب"
                value={player.trophies}
                accent="#eab308"
              />
            </div>

            <div
              style={{
                background: pc + "0c",
                border: `1px solid ${pc}20`,
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
                🎨 أسلوب اللعب
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#c0cad6",
                  lineHeight: 1.6,
                }}
              >
                {player.style}
              </div>
            </div>

            <div
              style={{
                background: "#07090d",
                border: "1px solid #1c2535",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: "#4ade80",
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
                {player.fact}
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
            : "linear-gradient(135deg,#16a34a,#15803d)",
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
            : "0 0 24px #16a34a44,0 8px 20px rgba(0,0,0,0.4)",
        }}
      >
        {spinning ? "⚽  جاري الاختيار..." : "🎲  اختار لاعب"}
      </button>

      {count > 0 && !spinning && (
        <div style={{ marginTop: 10, fontSize: 11, color: "#1e2d38" }}>
          تم الاختيار {count}
          {count === 1 ? " مرة" : " مرات"}
        </div>
      )}
    </div>
  );
}
