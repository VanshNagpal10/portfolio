"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import OSStatusBar from "@/components/os/OSStatusBar";
import HomeHero from "@/components/home/HomeHero";

const Ipod = dynamic(() => import("@/components/Ipod/Ipod"), { ssr: false });
const EarphonesOverlay = dynamic(
  () => import("@/components/earphones/EarphonesOverlay"),
  { ssr: false }
);

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
    radial-gradient(circle at 75% 45%, rgba(56, 142, 233, 0.08) 0%, transparent 55%),
    radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 100% 100%, 30px 30px;
  padding: 20px 48px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px 20px 60px;
    align-items: flex-start;
  }
`;

const StageContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.18fr 0.82fr;
  align-items: center;
  gap: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const IpodColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const IpodHelperText = styled.div`
  margin-top: 18px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10.5px;
  letter-spacing: 0.1em;
  color: #64748b;
  text-transform: uppercase;
  user-select: none;
  text-align: center;
`;

export default function Home() {
  return (
    <PageWrapper>
      {/* 21st.dev / shadcn style Top OS Status Bar */}
      <OSStatusBar title="00 · HOME — IPOD CLASSIC OS" />

      {/* Main Widescreen Studio Stage */}
      <MainStage>
        <StageContainer>
          {/* Left Column: Creator & Developer Narrative */}
          <HomeHero />

          {/* Right Column: Physical iPod Classic Studio */}
          <IpodColumn>
            <Suspense fallback={null}>
              <Ipod />
            </Suspense>
            <IpodHelperText>
              SCROLL WHEEL · DRAG · ↑↓ · ENTER TO OPEN
            </IpodHelperText>
          </IpodColumn>
        </StageContainer>
      </MainStage>

      {/* 3D Apple EarPods Cable & Headphone Jack Physics Overlay */}
      <Suspense fallback={null}>
        <EarphonesOverlay />
      </Suspense>
    </PageWrapper>
  );
}
