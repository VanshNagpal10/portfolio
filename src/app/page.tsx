"use client";

import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import OSStatusBar from "@/components/os/OSStatusBar";
import HomeHero from "@/components/home/HomeHero";
import InteractiveArrow from "@/components/home/InteractiveArrow";
import { playClickTick } from "@/utils/audio";

const Ipod = dynamic(() => import("@/components/Ipod/Ipod"), { ssr: false });

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #08090c;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const MainStage = styled.main`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #08090c;
  background-image: 
    radial-gradient(circle at 50% 45%, rgba(56, 142, 233, 0.08) 0%, transparent 60%),
    radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 100% 100%, 30px 30px;
  padding: 20px 48px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px 20px 60px;
    align-items: flex-start;
  }
`;

const StageContainer = styled.div<{ $layout: "ipod-left" | "ipod-right" }>`
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: grid;
  grid-template-columns: ${({ $layout }) =>
    $layout === "ipod-left" ? "0.84fr 1.16fr" : "1.16fr 0.84fr"};
  align-items: center;
  gap: 48px;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const IpodColumn = styled.div<{ $highlight?: boolean; $isLeft?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  transform: scale(0.94);
  transform-origin: center center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;

  ${({ $isLeft }) =>
    $isLeft &&
    `
    order: 1;
    @media (max-width: 1024px) {
      order: 2;
    }
  `}

  ${({ $highlight }) =>
    $highlight &&
    `
    filter: drop-shadow(0 0 35px rgba(56, 142, 233, 0.7));
    transform: scale(0.98);
  `}
`;

const HeroColumn = styled.div<{ $isRight?: boolean }>`
  position: relative;
  width: 100%;

  ${({ $isRight }) =>
    $isRight &&
    `
    order: 2;
    @media (max-width: 1024px) {
      order: 1;
    }
  `}
`;

const IpodHelperText = styled.div`
  margin-top: 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: #64748b;
  text-transform: uppercase;
  user-select: none;
  text-align: center;
`;

const LayoutTogglePill = styled.button`
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 4px 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: #8892a4;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(56, 142, 233, 0.45);
    color: #ffffff;
  }
`;

export default function Home() {
  // Default to ipod-left as requested ("keep it on the left side of the page")
  const [layoutMode, setLayoutMode] = useState<"ipod-left" | "ipod-right">("ipod-left");
  const [highlightIpod, setHighlightIpod] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_ipod_layout") as "ipod-left" | "ipod-right";
      if (saved === "ipod-left" || saved === "ipod-right") {
        setLayoutMode(saved);
      }
    }
  }, []);

  const toggleLayout = () => {
    playClickTick();
    const next = layoutMode === "ipod-left" ? "ipod-right" : "ipod-left";
    setLayoutMode(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_ipod_layout", next);
    }
  };

  const handleTriggerIpod = () => {
    setHighlightIpod(true);
    setTimeout(() => setHighlightIpod(false), 1200);
  };

  return (
    <PageWrapper>
      {/* 21st.dev / shadcn style Top OS Status Bar */}
      <OSStatusBar title="00 · HOME — IPOD CLASSIC OS" />

      {/* Main Widescreen Studio Stage */}
      <MainStage>
        <StageContainer $layout={layoutMode}>
          {/* Hand-drawn chalk arrow pointing toward the iPod with interactive note */}
          <InteractiveArrow
            orientation={layoutMode === "ipod-left" ? "to-left" : "to-right"}
            onTriggerIpod={handleTriggerIpod}
          />

          {/* Physical iPod Classic Studio */}
          <IpodColumn
            $isLeft={layoutMode === "ipod-left"}
            $highlight={highlightIpod}
          >
            <Suspense fallback={null}>
              <Ipod />
            </Suspense>
            <IpodHelperText>
              SCROLL WHEEL · DRAG · ↑↓ · ENTER TO OPEN
            </IpodHelperText>
            <LayoutTogglePill
              onClick={toggleLayout}
              title="Click to toggle iPod position between left and right"
            >
              <span>⇄</span>
              <span>
                {layoutMode === "ipod-left" ? "MOVE IPOD TO RIGHT" : "MOVE IPOD TO LEFT"}
              </span>
            </LayoutTogglePill>
          </IpodColumn>

          {/* Creator & Developer Narrative */}
          <HeroColumn $isRight={layoutMode === "ipod-left"}>
            <HomeHero />
          </HeroColumn>
        </StageContainer>
      </MainStage>
    </PageWrapper>
  );
}
