"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { playClickTick, playConfirmChime } from "@/utils/audio";

interface InteractiveArrowProps {
  orientation?: "to-right" | "to-left";
  onTriggerIpod?: () => void;
}

const floatAnim = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(-1deg);
  }
  50% {
    transform: translateY(-6px) rotate(1deg);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.45));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.85));
  }
`;

const ArrowWrapper = styled.div<{ $orientation: "to-right" | "to-left" }>`
  position: absolute;
  z-index: 25;
  display: flex;
  flex-direction: column;
  align-items: ${({ $orientation }) =>
    $orientation === "to-right" ? "flex-start" : "flex-end"};
  user-select: none;
  cursor: pointer;
  animation: ${floatAnim} 4s ease-in-out infinite;
  transition: transform 0.25s ease, filter 0.25s ease;

  /* Placement between columns */
  ${({ $orientation }) =>
    $orientation === "to-right"
      ? `
    top: 50px;
    left: 48%;
    transform: translate(-10%, 0);
  `
      : `
    top: 50px;
    right: 48%;
    transform: translate(10%, 0);
  `}

  &:hover {
    animation: ${pulseGlow} 1.5s infinite ease-in-out;
    transform: ${({ $orientation }) =>
      $orientation === "to-right"
        ? "translate(-10%, -4px) scale(1.03)"
        : "translate(10%, -4px) scale(1.03)"};
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const ChalkText = styled.div<{ $orientation: "to-right" | "to-left" }>`
  font-family: -apple-system, BlinkMacSystemFont, "Caveat", "Comic Sans MS", "Segoe UI",
    cursive, sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.06);
  border: 1px dashed rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  padding: 6px 14px;
  backdrop-filter: blur(8px);
  margin-bottom: 2px;
  transform: ${({ $orientation }) =>
    $orientation === "to-right" ? "rotate(-3deg)" : "rotate(3deg)"};
  transition: all 0.2s ease;

  span.handwritten-arrow {
    display: inline-block;
    margin-left: 6px;
    color: #60a5fa;
    font-size: 16px;
    transition: transform 0.2s ease;
  }

  ${ArrowWrapper}:hover & {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.7);
    color: #ffffff;
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);

    span.handwritten-arrow {
      transform: ${({ $orientation }) =>
        $orientation === "to-right"
          ? "translate(3px, -2px)"
          : "translate(-3px, -2px)"};
    }
  }
`;

const SvgArrow = styled.svg`
  width: 240px;
  height: 140px;
  overflow: visible;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6));
`;

export default function InteractiveArrow({
  orientation = "to-right",
  onTriggerIpod,
}: InteractiveArrowProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    playClickTick();
    if (onTriggerIpod) {
      onTriggerIpod();
    }
    setTimeout(() => setClicked(false), 800);
  };

  return (
    <ArrowWrapper
      $orientation={orientation}
      onClick={handleClick}
      title="To know more about me, you can use my iPod! Click to focus."
      style={{
        transform: clicked
          ? `${
              orientation === "to-right"
                ? "translate(-10%, -6px) scale(1.08)"
                : "translate(10%, -6px) scale(1.08)"
            }`
          : undefined,
      }}
    >
      <ChalkText $orientation={orientation}>
        To know more about me, you can use my iPod
        <span className="handwritten-arrow">
          {orientation === "to-right" ? "↗" : "↖"}
        </span>
      </ChalkText>

      <SvgArrow
        viewBox="0 0 260 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {orientation === "to-right" ? (
          <>
            {/* Soft background glow trace */}
            <path
              d="M 15 125 C 45 105, 80 20, 125 15 C 165 10, 188 25, 180 62 C 170 98, 140 102, 132 82 C 122 58, 150 32, 195 25 C 220 22, 242 25, 256 28"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Primary Chalk Path matching user drawing */}
            <path
              d="M 15 125 C 45 105, 80 20, 125 15 C 165 10, 188 25, 180 62 C 170 98, 140 102, 132 82 C 122 58, 150 32, 195 25 C 220 22, 242 25, 256 28"
              stroke="#FFFFFF"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Arrowhead */}
            <path
              d="M 238 16 L 257 28 L 240 39"
              stroke="#FFFFFF"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            {/* Soft background glow trace for left pointing */}
            <path
              d="M 245 125 C 215 105, 180 20, 135 15 C 95 10, 72 25, 80 62 C 90 98, 120 102, 128 82 C 138 58, 110 32, 65 25 C 40 22, 18 25, 4 28"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Primary Chalk Path pointing left */}
            <path
              d="M 245 125 C 215 105, 180 20, 135 15 C 95 10, 72 25, 80 62 C 90 98, 120 102, 128 82 C 138 58, 110 32, 65 25 C 40 22, 18 25, 4 28"
              stroke="#FFFFFF"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Arrowhead pointing left */}
            <path
              d="M 22 16 L 3 28 L 20 39"
              stroke="#FFFFFF"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </SvgArrow>
    </ArrowWrapper>
  );
}
