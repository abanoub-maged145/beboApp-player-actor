"use client";

import { useState } from "react";
import { ScreenMode } from "@/types";
import Landing from "@/components/Landing";
import FootballScreen from "@/components/FootballScreen";
import ActorsScreen from "@/components/ActorsScreen";

export default function Home() {
  const [screen, setScreen] = useState<ScreenMode>("landing");

  if (screen === "football") {
    return <FootballScreen onBack={() => setScreen("landing")} />;
  }

  if (screen === "actors") {
    return <ActorsScreen onBack={() => setScreen("landing")} />;
  }

  return <Landing onSelect={setScreen} />;
}
