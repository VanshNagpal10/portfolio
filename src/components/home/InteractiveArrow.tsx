"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { playClickTick } from "@/utils/audio";

interface InteractiveArrowProps {
  onTriggerIpod?: () => void;
}

const floatAnim = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(-0.5deg);
  }
  50% {
    transform: translateY(-8px) rotate(1deg);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.45));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.9));
  }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.85); }
  50% { opacity: 1; transform: scale(1.15); }
`;

const ArrowContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 48%;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  user-select: none;
  cursor: pointer;
  animation: ${floatAnim} 4s ease-in-out infinite;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease;

  &:hover {
    animation: ${pulseGlow} 1.5s infinite ease-in-out;
    transform: translateY(-4px) scale(1.04);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const ChalkText = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Caveat", "Comic Sans MS", "SF Pro Text",
    cursive, sans-serif;
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.6), 0 2px 6px rgba(0, 0, 0, 0.9);
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.07);
  border: 1px dashed rgba(255, 255, 255, 0.45);
  border-radius: 20px;
  padding: 6px 14px;
  backdrop-filter: blur(10px);
  margin-bottom: 2px;
  margin-left: 20px;
  transform: rotate(-3deg);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);

  span.accent-ipod {
    color: #60a5fa;
    font-weight: 700;
  }

  span.handwritten-arrow {
    display: inline-block;
    margin-left: 6px;
    color: #60a5fa;
    font-size: 16px;
    transition: transform 0.2s ease;
  }

  ${ArrowContainer}:hover & {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.85);
    color: #ffffff;
    box-shadow: 0 6px 24px rgba(56, 142, 233, 0.3);

    span.handwritten-arrow {
      transform: translate(3px, -2px);
    }
  }
`;

const SvgArrow = styled.svg`
  width: 260px;
  height: 140px;
  overflow: visible;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7));

  @media (max-width: 1200px) {
    width: 220px;
    height: 120px;
  }
`;

const Sparkle = styled.span<{ $top: string; $left: string; $delay: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 8px #ffffff;
  pointer-events: none;
  animation: ${twinkle} 2.5s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay};
`;

export default function InteractiveArrow({ onTriggerIpod }: InteractiveArrowProps) {
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
    <ArrowContainer
      onClick={handleClick}
      title="To know more about me, you can use my iPod! Click to focus."
      style={{
        transform: clicked ? "translateY(-6px) scale(1.08)" : undefined,
      }}
    >
      {/* Decorative chalk stars */}
      <Sparkle $top="-10px" $left="10px" $delay="0s">✦</Sparkle>
      <Sparkle $top="30px" $left="250px" $delay="1.2s">✦</Sparkle>

      {/* Handwritten interactive message */}
      <ChalkText>
        To know more about me, you can use my <span className="accent-ipod">iPod</span>
        <span className="handwritten-arrow">↗</span>
      </ChalkText>

      {/* Chalk Looping Arrow SVG Path – exactly matching user drawing */}
      <SvgArrow
        viewBox="0 0 280 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft atmospheric white glow outline */}
        <path
          d="M 18 135 C 50 112, 85 24, 135 18 C 175 14, 200 32, 190 70 C 180 108, 148 112, 138 90 C 128 65, 158 38, 205 30 C 235 25, 260 30, 275 34"
          stroke="rgba(255, 255, 255, 0.28)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Primary Hand-Drawn Chalk Path */}
        <path
          d="M 18 135 C 50 112, 85 24, 135 18 C 175 14, 200 32, 190 70 C 180 108, 148 112, 138 90 C 128 65, 158 38, 205 30 C 235 25, 260 30, 275 34"
          stroke="#FFFFFF"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Chalk Arrowhead pointing toward the top-left of the iPod */}
        <path
          d="M 256 22 L 277 34 L 258 46"
          stroke="#FFFFFF"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SvgArrow>
    </ArrowContainer>
  );
}
