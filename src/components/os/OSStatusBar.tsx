"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { playClickTick, toggleAudioMute, isMuted } from "@/utils/audio";

interface OSStatusBarProps {
  title?: string;
  subtitle?: string;
}

const Bar = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 42px;
  background: rgba(13, 14, 18, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  color: #e2e4e9;
  user-select: none;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const PlayIcon = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #388ee9;
`;

const AvailabilityPill = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 12px;
  font-size: 10.5px;
  font-weight: 600;
  color: #4ade80;
  letter-spacing: 0.03em;

  @media (max-width: 640px) {
    display: none;
  }
`;

const PulsingDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #22c55e;
  box-shadow: 0 0 6px #22c55e;
  animation: pulse 2s infinite ease-in-out;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(0.85);
    }
  }
`;

const CenterSection = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9aa1b2;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
`;

const Clock = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11.5px;
  color: #a3a9b8;
  letter-spacing: 0.04em;

  @media (max-width: 480px) {
    display: none;
  }
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 11px;
  background: linear-gradient(180deg, #388ee9 0%, #1754be 100%);
  color: #ffffff;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: transform 0.1s ease, filter 0.15s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-0.5px);
  }

  &:active {
    transform: translateY(0.5px);
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #8b92a4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s ease, background 0.15s ease;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
  }
`;

export default function OSStatusBar({ title }: OSStatusBarProps) {
  const [time, setTime] = useState("");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isMuted());
    const updateTime = () => {
      const now = new Date();
      // Format Delhi IST time
      const istString = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(`${istString} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const isNowMuted = toggleAudioMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      playClickTick();
    }
  };

  return (
    <Bar>
      <LeftSection>
        <LogoLink href="/" onClick={() => playClickTick()}>
          <PlayIcon />
          <span>VANSH NAGPAL</span>
        </LogoLink>
        <AvailabilityPill>
          <PulsingDot />
          <span>OPEN TO ROLES</span>
        </AvailabilityPill>
      </LeftSection>

      {title && <CenterSection>{title}</CenterSection>}

      <RightSection>
        {time && <Clock>{time}</Clock>}
        <ResumeButton
          href="/Vansh-SDE.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playClickTick()}
        >
          <span>Resume.pdf</span>
          <span>↗</span>
        </ResumeButton>
        <IconButton
          title={muted ? "Unmute Audio SFX" : "Mute Audio SFX"}
          onClick={handleAudioToggle}
        >
          {muted ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </IconButton>
      </RightSection>
    </Bar>
  );
}
