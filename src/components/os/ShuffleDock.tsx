"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAdjacentRoutes } from "@/data/routes";
import { playClickTick } from "@/utils/audio";

interface ShuffleDockProps {
  currentPath: string;
}

const DockContainer = styled.nav`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  background: rgba(18, 19, 24, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 36px;
  padding: 6px 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  gap: 6px;

  @media (max-width: 600px) {
    bottom: 16px;
    padding: 5px 8px;
    width: calc(100% - 32px);
    max-width: 440px;
    justify-content: space-between;
  }
`;

const NavButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 7px 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #d1d5db;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-decoration: none;
  transition: all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    background: rgba(56, 142, 233, 0.25);
  }

  @media (max-width: 600px) {
    padding: 6px 10px;
    font-size: 11px;
  }
`;

const MenuButton = styled(NavButton)`
  background: linear-gradient(180deg, #2c2d33 0%, #1f2024 100%);
  border-color: rgba(255, 255, 255, 0.16);
  color: #f3f4f6;
  font-weight: 700;
  letter-spacing: 0.05em;

  &:hover {
    background: linear-gradient(180deg, #383a42 0%, #26272c 100%);
    border-color: rgba(56, 142, 233, 0.5);
    color: #388ee9;
  }
`;

const CurrentPill = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #9ca3af;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 480px) {
    display: none;
  }
`;

const TrackNumber = styled.span`
  color: #388ee9;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 2px;

  @media (max-width: 480px) {
    display: none;
  }
`;

export default function ShuffleDock({ currentPath }: ShuffleDockProps) {
  const router = useRouter();
  const nav = getAdjacentRoutes(currentPath);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "Escape" || e.key.toLowerCase() === "m") {
        playClickTick();
        router.push("/");
      } else if (e.key === "ArrowLeft" && e.altKey) {
        playClickTick();
        router.push(nav.prev.path);
      } else if (e.key === "ArrowRight" && e.altKey) {
        playClickTick();
        router.push(nav.next.path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nav, router]);

  return (
    <DockContainer aria-label="iPod Navigation Dock">
      <MenuButton href="/" onClick={() => playClickTick()} title="Return to iPod Launcher (Esc or M)">
        <span>MENU</span>
      </MenuButton>

      <NavButton
        href={nav.prev.path}
        onClick={() => playClickTick()}
        title={`Previous: ${nav.prev.title} (Alt + Left)`}
      >
        <span>⏮</span>
        <span>Prev</span>
      </NavButton>

      <Divider />

      <CurrentPill>
        <TrackNumber>{String(nav.index).padStart(2, "0")}/{String(nav.total).padStart(2, "0")}</TrackNumber>
        <span>{nav.current.shortLabel}</span>
      </CurrentPill>

      <Divider />

      <NavButton
        href={nav.next.path}
        onClick={() => playClickTick()}
        title={`Next: ${nav.next.title} (Alt + Right)`}
      >
        <span>Next</span>
        <span>⏭</span>
      </NavButton>
    </DockContainer>
  );
}
