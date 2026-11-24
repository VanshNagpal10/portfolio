"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useAudio } from "@/context/AudioContext";
import { playClickTick, playConfirmChime } from "@/utils/audio";

/* ------------------------------------------------------------------ */
/*  Animations                                                        */
/* ------------------------------------------------------------------ */

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
`;

const eqBounce1 = keyframes`
  0%, 100% { height: 4px; }
  50% { height: 14px; }
`;
const eqBounce2 = keyframes`
  0%, 100% { height: 14px; }
  50% { height: 6px; }
`;
const eqBounce3 = keyframes`
  0%, 100% { height: 8px; }
  50% { height: 16px; }
`;
const eqBounce4 = keyframes`
  0%, 100% { height: 12px; }
  50% { height: 4px; }
`;

/* ------------------------------------------------------------------ */
/*  Styled Components                                                 */
/* ------------------------------------------------------------------ */

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 620px;
  padding: 40px 0;
  user-select: none;
  z-index: 10;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 24px 0 32px;
  }
`;

const MetaHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #717888;
  margin-bottom: 24px;

  span.accent {
    color: #388ee9;
  }

  @media (max-width: 640px) {
    font-size: 10px;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const MainTitle = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;
  font-size: clamp(34px, 4.2vw, 54px);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.03em;
  margin: 0 0 20px;
  color: #ffffff;

  span.name {
    display: block;
    color: #ffffff;
    margin-bottom: 4px;
  }

  span.tagline {
    display: block;
    background: linear-gradient(180deg, #d1d5db 0%, #64748b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
  }
`;

const NarrativeText = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  font-size: 15px;
  line-height: 1.65;
  color: #949ba8;
  margin: 0 0 32px;
  max-width: 540px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Interactive iPod Guide / Route Selector Pill                      */
/* ------------------------------------------------------------------ */

const SelectorCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 36px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.06);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(56, 142, 233, 0.4);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(56, 142, 233, 0.15);
  }

  @media (max-width: 640px) {
    padding: 10px 12px;
  }
`;

const SelectorLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;

  span.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #388ee9;
    box-shadow: 0 0 8px #388ee9;
  }
`;

const SelectorCenter = styled(Link)`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #f1f5f9;
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: #388ee9;
  }
`;

const Keycap = styled.kbd`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  font-size: 11px;
  font-family: ui-monospace, monospace;
  color: #94a3b8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

/* ------------------------------------------------------------------ */
/*  Stat Grid                                                         */
/* ------------------------------------------------------------------ */

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 640px) {
    gap: 12px;
  }
`;

const StatItem = styled.div<{ $hasBorder?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ $hasBorder }) =>
    $hasBorder &&
    `
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 15%;
      height: 70%;
      width: 1px;
      background: rgba(255, 255, 255, 0.08);
    }
  `}
`;

const StatVal = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(24px, 2.5vw, 32px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 4px;
`;

const StatSub = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
`;

/* ------------------------------------------------------------------ */
/*  Audio Deck Status Bar                                             */
/* ------------------------------------------------------------------ */

const AudioDeckBar = styled.div<{ $isPlugged: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $isPlugged }) => ($isPlugged ? "#4ade80" : "#717888")};
  margin-bottom: 36px;
  transition: color 0.3s ease;
`;

const EqBars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2.5px;
  height: 16px;
  width: 16px;

  span {
    width: 2.5px;
    background: currentColor;
    border-radius: 1px;
  }

  span:nth-child(1) { height: 6px; }
  span:nth-child(2) { height: 12px; }
  span:nth-child(3) { height: 8px; }
  span:nth-child(4) { height: 14px; }

  &.playing {
    span:nth-child(1) { animation: ${eqBounce1} 0.7s infinite ease-in-out; }
    span:nth-child(2) { animation: ${eqBounce2} 0.9s infinite ease-in-out; }
    span:nth-child(3) { animation: ${eqBounce3} 0.6s infinite ease-in-out; }
    span:nth-child(4) { animation: ${eqBounce4} 0.8s infinite ease-in-out; }
  }
`;

/* ------------------------------------------------------------------ */
/*  Footer Links                                                      */
/* ------------------------------------------------------------------ */

const FooterRow = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12.5px;
  font-weight: 500;
  color: #8892a4;
`;

const LinksGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;

  a,
  button {
    color: #8892a4;
    text-decoration: none;
    transition: color 0.15s ease;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;

    &:hover {
      color: #ffffff;
    }
  }
`;

const ModelEtching = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #475569;
`;

/* ------------------------------------------------------------------ */
/*  Tracks rotation for guide pill                                    */
/* ------------------------------------------------------------------ */

const TRACK_LIST = [
  { id: "projects", label: "01 / PROJECTS — 6 INTERACTIVE CDS", href: "/projects" },
  { id: "experience", label: "02 / EXPERIENCE — KHWAISHAI & DDITLAB", href: "/experience" },
  { id: "honors", label: "03 / HONORS — APPLE SSC '26 & 9× WINS", href: "/honors" },
  { id: "about", label: "04 / ABOUT — STACK, DESIGN & LEADERSHIP", href: "/about" },
  { id: "contact", label: "05 / CONTACT — BACKPLATE & CONNECT", href: "/contact" },
];

export default function HomeHero() {
  const { isPlugged, isPlaying, currentTrack } = useAudio();
  const [copied, setCopied] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  // Cycle through tracks subtly every 4.5s or on arrow keys
  useEffect(() => {
    const timer = setInterval(() => {
      setTrackIndex((prev) => (prev + 1) % TRACK_LIST.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeTrack = TRACK_LIST[trackIndex];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vanshnagpal21@gmail.com");
    playConfirmChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <HeroWrapper>
      {/* Monospace Metadata Header */}
      <MetaHeader>
        <span>DELHI, IN · 28.61° N</span>
        <span className="accent">//</span>
        <span>FULL-STACK · iOS · DESIGN</span>
      </MetaHeader>

      {/* Main Heading Typography */}
      <MainTitle>
        <span className="name">Vansh Nagpal.</span>
        <span className="tagline">Engineering tactile software &amp; crisp interfaces.</span>
      </MainTitle>

      {/* Narrative Bio */}
      <NarrativeText>
        CS undergrad at VIPS-TC crafting native iOS worlds, full-stack products, and Apple-inspired interfaces. Apple Swift Student Challenge 2026 Winner, 9× Hackathon Winner, and previously engineering at KhwaaishAI &amp; DDITLAB.
      </NarrativeText>

      {/* Interactive Guide / Selector Bar */}
      <SelectorCard>
        <SelectorLeft>
          <span className="dot" />
          <span>USE THE IPOD TO EXPLORE &gt;</span>
        </SelectorLeft>
        <SelectorCenter
          href={activeTrack.href}
          onClick={() => playClickTick()}
          title={`Click to open ${activeTrack.label}`}
        >
          {activeTrack.label}
        </SelectorCenter>
        <Keycap title="Press Enter to launch">↵</Keycap>
      </SelectorCard>

      {/* Stat Grid */}
      <StatGrid>
        <StatItem $hasBorder>
          <StatVal>SSC &apos;26</StatVal>
          <StatSub>APPLE GLOBAL WINNER</StatSub>
        </StatItem>
        <StatItem $hasBorder>
          <StatVal>9×</StatVal>
          <StatSub>HACKATHON PODIUMS</StatSub>
        </StatItem>
        <StatItem>
          <StatVal>9.04</StatVal>
          <StatSub>B.TECH CSE CGPA</StatSub>
        </StatItem>
      </StatGrid>

      {/* Audio Deck Status */}
      <AudioDeckBar $isPlugged={isPlugged}>
        <EqBars className={isPlugged && isPlaying ? "playing" : ""}>
          <span />
          <span />
          <span />
          <span />
        </EqBars>
        {isPlugged ? (
          <span>
            AUDIO DECK: NOW PLAYING {currentTrack?.name || "LO-FI DRIFT"} (CLICK WHEEL TO PAUSE)
          </span>
        ) : (
          <span>AUDIO DECK: PLUG IN 3.5MM JACK FOR LO-FI</span>
        )}
      </AudioDeckBar>

      {/* Footer Links & Chassis Etching */}
      <FooterRow>
        <LinksGroup>
          <a
            href="https://github.com/VanshNagpal10"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickTick()}
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/vanshnagpal27"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickTick()}
          >
            LinkedIn ↗
          </a>
          <a
            href="https://x.com/VanshNagpal_27"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickTick()}
          >
            X ↗
          </a>
          <button
            onClick={handleCopyEmail}
            title="Click to copy email address"
          >
            {copied ? "✓ Copied!" : "vanshnagpal21@gmail.com"}
          </button>
        </LinksGroup>

        <ModelEtching>MODEL VN-2026</ModelEtching>
      </FooterRow>
    </HeroWrapper>
  );
}
