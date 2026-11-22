"use client";

import React, { useState } from "react";
import styled from "styled-components";
import OSStatusBar from "@/components/os/OSStatusBar";
import ShuffleDock from "@/components/os/ShuffleDock";
import { CONTACT_LINKS, RESUME_INFO, CHASSIS_ENGRAVINGS } from "@/data/contact";
import { playClickTick, playConfirmChime } from "@/utils/audio";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at 50% 0%, #17181f 0%, #08090c 100%);
  color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  padding-bottom: 120px;
  position: relative;
  overflow-x: hidden;
`;

const ContentContainer = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

/**
 * Stainless Steel Backplate Container.
 * Pointer-reactive specular highlight reflects light based on cursor position ($x, $y).
 */
const Backplate = styled.div<{ $x: number; $y: number }>`
  position: relative;
  background: radial-gradient(
      circle 450px at ${(props) => props.$x}% ${(props) => props.$y}%,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(255, 255, 255, 0.04) 40%,
      transparent 80%
    ),
    linear-gradient(135deg, #1b1c22 0%, #101115 50%, #16171d 100%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 28px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.35),
    inset 0 0 40px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  transition: border-color 0.25s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.28);
  }

  @media (max-width: 640px) {
    padding: 28px 20px;
    border-radius: 20px;
  }
`;

const EngravedAppleMonogram = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const MonogramBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #ffffff;
`;

const EngravedHeader = styled.div`
  text-align: center;
  margin-bottom: 36px;
`;

const HeroName = styled.h1`
  font-size: clamp(26px, 4.5vw, 38px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const LaserTagline = styled.p`
  margin: 0 auto;
  font-size: 14.5px;
  color: #a1a7b8;
  max-width: 560px;
  line-height: 1.5;
`;

const PrimaryCtaBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 28px;
  margin-bottom: 32px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const EmailDisplay = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: clamp(16px, 3vw, 22px);
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.02em;
  margin-bottom: 14px;
  text-align: center;
  word-break: break-all;
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: ${(props) =>
    props.$copied
      ? "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)"
      : "linear-gradient(180deg, #388ee9 0%, #1754be 100%)"};
  color: #ffffff;
  border: 1px solid ${(props) => (props.$copied ? "#4ade80" : "rgba(255, 255, 255, 0.2)")};
  border-radius: 24px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 36px;
`;

const TileLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px 20px;
  text-decoration: none;
  color: #e2e4e9;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.065);
    border-color: rgba(56, 142, 233, 0.4);
    transform: translateY(-2px);
    color: #ffffff;
  }
`;

const TileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const TileLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #8892a4;
`;

const TileValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const TileArrow = styled.span`
  font-size: 16px;
  color: #388ee9;
`;

const ResumeBanner = styled.div`
  background: linear-gradient(135deg, rgba(56, 142, 233, 0.12) 0%, rgba(23, 84, 190, 0.05) 100%);
  border: 1px solid rgba(56, 142, 233, 0.28);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 40px;
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(180deg, #388ee9 0%, #1754be 100%);
  color: #ffffff;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(23, 84, 190, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

const EngravedFooter = styled.footer`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: #6d7588;
  line-height: 1.6;

  p {
    margin: 4px 0;
  }
`;

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vanshnagpal21@gmail.com");
    playConfirmChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <PageWrapper>
      <OSStatusBar title="06 · Contact & Backplate" />

      <ContentContainer>
        <Backplate
          $x={mousePos.x}
          $y={mousePos.y}
          onMouseMove={handleMouseMove}
          aria-label="Stainless Steel iPod Backplate"
        >
          <EngravedAppleMonogram>
            <MonogramBadge>VN</MonogramBadge>
          </EngravedAppleMonogram>

          <EngravedHeader>
            <HeroName>Let&apos;s Build Something Iconic.</HeroName>
            <LaserTagline>
              Available for full-time Software Engineering, iOS Developer roles, and high-impact engineering internships.
            </LaserTagline>
          </EngravedHeader>

          {/* 1-Click Copy Email Primary Box */}
          <PrimaryCtaBox>
            <span style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#8892a4", textTransform: "uppercase", marginBottom: "8px" }}>
              DIRECT INBOX
            </span>
            <EmailDisplay>vanshnagpal21@gmail.com</EmailDisplay>
            <CopyButton $copied={copied} onClick={handleCopyEmail}>
              {copied ? (
                <>
                  <span>✓</span>
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>1-Click Copy Email</span>
                </>
              )}
            </CopyButton>
          </PrimaryCtaBox>

          {/* Contact Direct Tiles */}
          <TilesGrid>
            {CONTACT_LINKS.map((link) => (
              <TileLink
                key={link.id}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => playClickTick()}
              >
                <TileContent>
                  <TileLabel>{link.name}</TileLabel>
                  <TileValue>{link.label}</TileValue>
                </TileContent>
                <TileArrow>↗</TileArrow>
              </TileLink>
            ))}
          </TilesGrid>

          {/* Resume PDF Download Banner */}
          <ResumeBanner>
            <div>
              <div style={{ fontSize: "12px", color: "#388ee9", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>
                OFFICIAL RESUME
              </div>
              <h3 style={{ margin: "0 0 4px", fontSize: "18px", color: "#ffffff", fontWeight: 700 }}>
                {RESUME_INFO.filename}
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#9aa1b2" }}>
                {RESUME_INFO.headline} · {RESUME_INFO.filesize} · Updated {RESUME_INFO.lastUpdated}
              </p>
            </div>
            <ResumeButton
              href={RESUME_INFO.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playConfirmChime()}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download PDF</span>
            </ResumeButton>
          </ResumeBanner>

          {/* Micro-Engraved Chassis Footer */}
          <EngravedFooter>
            <p>{CHASSIS_ENGRAVINGS.line1}</p>
            <p>{CHASSIS_ENGRAVINGS.line2}</p>
            <p>{CHASSIS_ENGRAVINGS.line3}</p>
            <p style={{ opacity: 0.65, marginTop: "8px" }}>{CHASSIS_ENGRAVINGS.serial}</p>
          </EngravedFooter>
        </Backplate>
      </ContentContainer>

      <ShuffleDock currentPath="/contact" />
    </PageWrapper>
  );
}
