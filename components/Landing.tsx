"use client";

import { PLAYERS } from "@/data/players";
import { ACTORS } from "@/data/actors";
import { ScreenMode } from "@/types";

interface LandingProps {
  onSelect: (screen: ScreenMode) => void;
}

export default function Landing({ onSelect }: LandingProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 0%,#0a0e1a,#050809 60%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        direction: "rtl",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 48,
          animation: "fadeUp 0.6s ease both",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 6,
            color: "#6366f1",
            opacity: 0.8,
            marginBottom: 10,
          }}
        >
          RANDOM ORACLE ✦
        </div>
        <h1
          style={{
            fontSize: "clamp(28px,6vw,48px)",
            color: "#fff",
            margin: "0 0 8px",
            fontWeight: "bold",
            letterSpacing: -1,
          }}
        >
          اختار الفئة
        </h1>
        <p style={{ fontSize: 13, color: "#3d4a56", margin: 0 }}>
          اختار فئة وهنديلك شخصية عشوائية
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          width: "min(460px,95vw)",
        }}
      >
        {/* Football card */}
        <button
          onClick={() => onSelect("football")}
          style={{
            flex: 1,
            minWidth: 160,
            padding: "28px 20px",
            borderRadius: 18,
            border: "1.5px solid #22c55e33",
            background: "linear-gradient(145deg,#0a1a0e,#0e2018)",
            cursor: "pointer",
            transition: "all 0.25s",
            boxShadow: "0 0 30px #22c55e10",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            animation: "fadeUp 0.6s ease 0.1s both",
          }}
        >
          <div style={{ fontSize: 52 }}>⚽</div>
          <div
            style={{
              color: "#4ade80",
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Georgia,serif",
            }}
          >
            لاعبون
          </div>
          <div style={{ color: "#2d3d2d", fontSize: 11 }}>
            {PLAYERS.length} لاعب أسطوري
          </div>
          <div
            style={{
              marginTop: 4,
              background: "#22c55e22",
              border: "1px solid #22c55e44",
              color: "#4ade80",
              borderRadius: 20,
              padding: "4px 14px",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            كرة القدم العالمية
          </div>
        </button>

        {/* Actors card */}
        <button
          onClick={() => onSelect("actors")}
          style={{
            flex: 1,
            minWidth: 160,
            padding: "28px 20px",
            borderRadius: 18,
            border: "1.5px solid #a78bfa33",
            background: "linear-gradient(145deg,#0e0a1a,#16102a)",
            cursor: "pointer",
            transition: "all 0.25s",
            boxShadow: "0 0 30px #7c3aed10",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            animation: "fadeUp 0.6s ease 0.2s both",
          }}
        >
          <div style={{ fontSize: 52 }}>🎬</div>
          <div
            style={{
              color: "#c4b5fd",
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Georgia,serif",
            }}
          >
            ممثلون
          </div>
          <div style={{ color: "#2d2d4a", fontSize: 11 }}>
            {ACTORS.length} ممثل مصري
          </div>
          <div
            style={{
              marginTop: 4,
              background: "#7c3aed22",
              border: "1px solid #7c3aed44",
              color: "#c4b5fd",
              borderRadius: 20,
              padding: "4px 14px",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            الفن المصري
          </div>
        </button>
      </div>
    </div>
  );
}
