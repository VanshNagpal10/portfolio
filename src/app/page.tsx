"use client";

import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import OSStatusBar from "@/components/os/OSStatusBar";
import HomeHero from "@/components/home/HomeHero";
import InteractiveArrow from "@/components/home/InteractiveArrow";
import TactileControlHUD from "@/components/home/TactileControlHUD";
import { NavBar } from "@/components/ui/tubelight-navbar";
import CommandMenu from "@/components/ui/CommandMenu";
import {
  Home as HomeIcon,
  Disc,
  Briefcase,
  Award,
  User,
  Mail,
  FileText,
} from "lucide-react";

const Ipod = dynamic(() => import("@/components/Ipod/Ipod"), { ssr: false });

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #08090c;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 84px;
`;

const MainStage = styled.main`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #08090c;
  background-image: 
    radial-gradient(circle at 75% 40%, rgba(56, 142, 233, 0.09) 0%, transparent 60%),
    radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 100% 100%, 32px 32px;
  padding: 24px 48px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px 20px 96px;
    align-items: flex-start;
  }
`;

const StageContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const HeroColumn = styled.div`
  position: relative;
  width: 100%;
`;

const IpodColumn = styled.div<{ $highlight?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  transform: scale(0.94);
  transform-origin: center center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;

  ${({ $highlight }) =>
    $highlight &&
    `
    filter: drop-shadow(0 0 40px rgba(56, 142, 233, 0.75));
    transform: scale(0.98);
  `}
`;

const NAV_ITEMS = [
  { name: "Home", url: "/", icon: HomeIcon },
  { name: "Projects", url: "/projects", icon: Disc },
  { name: "Experience", url: "/experience", icon: Briefcase },
  { name: "Honors", url: "/honors", icon: Award },
  { name: "About", url: "/about", icon: User },
  { name: "Contact", url: "/contact", icon: Mail },
  { name: "Resume", url: "/Vansh-SDE.pdf", icon: FileText },
];

export default function Home() {
  const [highlightIpod, setHighlightIpod] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  // Global ⌘K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
        <StageContainer>
          {/* Hand-drawn chalk arrow pointing toward the iPod with interactive note */}
          <InteractiveArrow onTriggerIpod={handleTriggerIpod} />

          {/* Left Column: Creator & Developer Narrative */}
          <HeroColumn>
            <HomeHero onOpenCommandMenu={() => setCommandMenuOpen(true)} />
          </HeroColumn>

          {/* Right Column: Physical iPod Classic Studio Only */}
          <IpodColumn $highlight={highlightIpod}>
            <Suspense fallback={null}>
              <Ipod />
            </Suspense>
            {/* Tactile hardware button strip under the iPod */}
            <TactileControlHUD />
          </IpodColumn>
        </StageContainer>
      </MainStage>

      {/* Tubelight Lamp Navbar from 21st.dev / shadcn */}
      <NavBar items={NAV_ITEMS} />

      {/* shadcn / cmdk Style Quick Jump Command Menu */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </PageWrapper>
  );
}
