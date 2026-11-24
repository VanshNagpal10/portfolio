"use client";

import React from "react";
import styled from "styled-components";
import {
  dispatchMenuClickEvent,
  dispatchCenterClickEvent,
  dispatchPlayPauseClickEvent,
  dispatchForwardScrollEvent,
  dispatchBackwardScrollEvent,
  dispatchKeyboardEvent,
} from "@/utils/events";
import { playClickTick, playConfirmChime } from "@/utils/audio";
import { useAudio } from "@/context/AudioContext";

const HudWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  user-select: none;
`;

const KeycapRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const TactileButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 5px 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.12s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(56, 142, 233, 0.5);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(56, 142, 233, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    background: rgba(56, 142, 233, 0.15);
  }

  span.symbol {
    font-size: 11px;
    color: #388ee9;
  }
`;

const GuideText = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: #64748b;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;

  span.separator {
    color: rgba(255, 255, 255, 0.15);
  }
`;

export default function TactileControlHUD() {
  const { togglePlay } = useAudio();

  const handleMenu = () => {
    playClickTick();
    dispatchMenuClickEvent();
  };

  const handleSelect = () => {
    playConfirmChime();
    dispatchCenterClickEvent();
  };

  const handlePlayPause = () => {
    playClickTick();
    dispatchPlayPauseClickEvent();
    togglePlay();
  };

  const handleScrollUp = () => {
    playClickTick();
    dispatchBackwardScrollEvent();
    dispatchKeyboardEvent("ArrowUp");
  };

  const handleScrollDown = () => {
    playClickTick();
    dispatchForwardScrollEvent();
    dispatchKeyboardEvent("ArrowDown");
  };

  return (
    <HudWrapper>
      {/* Interactive hardware button strip */}
      <KeycapRow>
        <TactileButton onClick={handleMenu} title="Click to go back to Menu (or press Esc)">
          <span className="symbol">◀</span>
          <span>MENU</span>
        </TactileButton>

        <TactileButton onClick={handleScrollUp} title="Scroll up in iPod list (or press ↑)">
          <span className="symbol">▲</span>
          <span>PREV</span>
        </TactileButton>

        <TactileButton onClick={handleSelect} title="Press Center Button / Select (or press Enter)">
          <span className="symbol">●</span>
          <span>SELECT</span>
        </TactileButton>

        <TactileButton onClick={handleScrollDown} title="Scroll down in iPod list (or press ↓)">
          <span className="symbol">▼</span>
          <span>NEXT</span>
        </TactileButton>

        <TactileButton onClick={handlePlayPause} title="Toggle Lo-Fi Soundtrack (or press Space)">
          <span className="symbol">▶‖</span>
          <span>PLAY</span>
        </TactileButton>
      </KeycapRow>

      {/* Tactile interaction legend */}
      <GuideText>
        <span>CLICK WHEEL ROTATE</span>
        <span className="separator">·</span>
        <span>DRAG</span>
        <span className="separator">·</span>
        <span>↑↓ ARROWS</span>
        <span className="separator">·</span>
        <span>↵ ENTER</span>
      </GuideText>
    </HudWrapper>
  );
}
