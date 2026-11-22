"use client";

import React, { useState } from "react";
import styled from "styled-components";

interface ImagePlaceholderProps {
  slotId: string;
  caption: string;
  suggestedPath?: string;
  aspectRatio?: string;
  className?: string;
  badge?: string;
}

const Frame = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${(props) => props.$aspectRatio};
  background: linear-gradient(145deg, #18191c 0%, #0d0e11 100%);
  border: 1px dashed rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.3);

  &:hover {
    border-color: rgba(56, 142, 233, 0.6);
    background: linear-gradient(145deg, #1c1d22 0%, #101216 100%);
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.7), 0 6px 20px rgba(56, 142, 233, 0.15);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #388ee9;
  background: rgba(56, 142, 233, 0.12);
  border: 1px solid rgba(56, 142, 233, 0.3);
  padding: 3px 8px;
  border-radius: 20px;
`;

const IconContainer = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: #888e9b;
  transition: transform 0.2s ease, color 0.2s ease;

  ${Frame}:hover & {
    transform: scale(1.08);
    color: #388ee9;
    border-color: rgba(56, 142, 233, 0.4);
    background: rgba(56, 142, 233, 0.1);
  }
`;

const CaptionText = styled.p`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #c9ccd6;
  text-align: center;
  line-height: 1.4;
  max-width: 90%;
`;

const SlotHint = styled.span`
  margin-top: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  letter-spacing: 0.04em;
  color: #636b7b;
  text-align: center;
  display: block;

  ${Frame}:hover & {
    color: #8da2c0;
  }
`;

const RealImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

export default function ImagePlaceholder({
  slotId,
  caption,
  suggestedPath,
  aspectRatio = "16 / 9",
  className,
  badge = "Photo Slot",
}: ImagePlaceholderProps) {
  const [imgError, setImgError] = useState(false);
  const hasImage = suggestedPath && !imgError;

  return (
    <Frame $aspectRatio={aspectRatio} className={className} id={`slot-${slotId}`}>
      {hasImage ? (
        <RealImage
          src={suggestedPath}
          alt={caption}
          onError={() => setImgError(true)}
        />
      ) : (
        <>
          {badge && <Badge>{badge}</Badge>}
          <IconContainer>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </IconContainer>
          <CaptionText>{caption}</CaptionText>
          <SlotHint>
            Place file in <code>{suggestedPath || `/public/images/${slotId}.jpg`}</code>
          </SlotHint>
        </>
      )}
    </Frame>
  );
}
