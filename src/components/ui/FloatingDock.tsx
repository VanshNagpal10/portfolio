"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { playClickTick } from "@/utils/audio";
import { useAudio } from "@/context/AudioContext";

interface FloatingDockProps {
  onOpenCommandMenu: () => void;
}

const DockContainer = styled.nav`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(18, 20, 26, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  user-select: none;
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @media (max-width: 640px) {
    bottom: 16px;
    padding: 5px 8px;
    gap: 4px;
  }
`;

const DockItem = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 11px;
  border-radius: 16px;
  color: #94a3b8;
  text-decoration: none;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  span.label {
    @media (max-width: 768px) {
      display: none;
    }
  }

  span.icon {
    font-size: 14px;
  }
`;

const DockButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 11px;
  border-radius: 16px;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  span.label {
    @media (max-width: 768px) {
      display: none;
    }
  }

  span.icon {
    font-size: 13px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 18px;
  background: rgba(255, 255, 255, 0.12);
  margin: 0 2px;
`;

const CommandBadge = styled.kbd`
  padding: 1px 5px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  font-family: ui-monospace, monospace;
  font-size: 10px;
  color: #60a5fa;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default function FloatingDock({ onOpenCommandMenu }: FloatingDockProps) {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <DockContainer>
      <DockItem href="/projects" onClick={() => playClickTick()} title="01 / Projects">
        <span className="icon">💿</span>
        <span className="label">Projects</span>
      </DockItem>

      <DockItem href="/experience" onClick={() => playClickTick()} title="02 / Experience">
        <span className="icon">💼</span>
        <span className="label">Experience</span>
      </DockItem>

      <DockItem href="/honors" onClick={() => playClickTick()} title="03 / Honors">
        <span className="icon">🏆</span>
        <span className="label">Honors</span>
      </DockItem>

      <DockItem href="/about" onClick={() => playClickTick()} title="04 / About">
        <span className="icon">👤</span>
        <span className="label">About</span>
      </DockItem>

      <DockItem href="/contact" onClick={() => playClickTick()} title="05 / Contact">
        <span className="icon">✉</span>
        <span className="label">Contact</span>
      </DockItem>

      <Divider />

      <DockButton
        onClick={() => {
          playClickTick();
          onOpenCommandMenu();
        }}
        title="Open Command Palette (⌘K)"
      >
        <span className="icon">⌘</span>
        <span className="label">Quick Jump</span>
        <CommandBadge>⌘K</CommandBadge>
      </DockButton>

      <DockButton
        onClick={() => {
          playClickTick();
          togglePlay();
        }}
        title={isPlaying ? "Pause Lo-Fi Music" : "Play Lo-Fi Music"}
        style={{ color: isPlaying ? "#4ade80" : "#94a3b8" }}
      >
        <span className="icon">{isPlaying ? "♪" : "❚❚"}</span>
        <span className="label">{isPlaying ? "Sound: On" : "Sound: Off"}</span>
      </DockButton>
    </DockContainer>
  );
}
