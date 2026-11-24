"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

export enum SplitScreenPreview {
  Projects = "projects",
  Experience = "experience",
  Honors = "honors",
  About = "about",
  Contact = "contact",
}

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  text-align: center;
  user-select: none;
  background: linear-gradient(180deg, #f8f9fa 0%, #eaecef 100%);
`;

const cdRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

/* ------------------------------------------------------------------ */
/*  Projects CD Sleeve Preview (Mockup Match)                         */
/* ------------------------------------------------------------------ */

const SleeveWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  margin: 6px auto 10px;
  perspective: 600px;
`;

const CDSleeve = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 96px;
  height: 96px;
  background: linear-gradient(135deg, #1c1d22 0%, #0d0e12 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.4);
  transform: rotate(-6deg);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  box-sizing: border-box;
`;

const SleeveLabel = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 8px;
  color: #8892a4;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const SleeveFoot = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 7.5px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const CompactDisc = styled.div`
  position: absolute;
  top: 6px;
  right: -2px;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: radial-gradient(
      circle at 50% 50%,
      transparent 12%,
      #111 13%,
      #222 17%,
      transparent 18%
    ),
    conic-gradient(
      from 0deg,
      #d0d5dd,
      #b8bcc8,
      #f2f4f8,
      #9aa1b2,
      #e4e7ec,
      #b8bcc8,
      #d0d5dd
    );
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 1;
  animation: ${cdRotate} 16s linear infinite;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #eaecef;
    border: 1px solid #9aa1b2;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #f8f9fa;
    border: 1px solid #666;
  }
`;

const TrackCaption = styled.p`
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9.5px;
  font-weight: 600;
  color: #4b5563;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const ProjectsPreview = () => (
  <PreviewContainer>
    <SleeveWrapper>
      <CDSleeve>
        <SleeveLabel>VN // REC</SleeveLabel>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "16px" }}>💿</span>
        </div>
        <SleeveFoot>SELECTED BUILDS</SleeveFoot>
      </CDSleeve>
      <CompactDisc />
    </SleeveWrapper>
    <TrackCaption>&lt; 6 INTERACTIVE CDS &gt;</TrackCaption>
  </PreviewContainer>
);

/* ------------------------------------------------------------------ */
/*  Experience Preview                                                */
/* ------------------------------------------------------------------ */

const CardMini = styled.div`
  width: 104px;
  height: 84px;
  background: linear-gradient(135deg, #1e222b 0%, #111318 100%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 12px;
`;

const ExperiencePreview = () => (
  <PreviewContainer>
    <CardMini>
      <span style={{ fontSize: "20px", marginBottom: "4px" }}>💼</span>
      <span style={{ fontSize: "9px", fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>
        KhwaaishAI
      </span>
      <span style={{ fontSize: "7.5px", color: "#388ee9", fontFamily: "ui-monospace, monospace" }}>
        & DDITLAB (SDE)
      </span>
    </CardMini>
    <TrackCaption>&lt; CAREER & EDUCATION &gt;</TrackCaption>
  </PreviewContainer>
);

/* ------------------------------------------------------------------ */
/*  Honors Preview                                                    */
/* ------------------------------------------------------------------ */

const HonorsPreview = () => (
  <PreviewContainer>
    <CardMini style={{ background: "linear-gradient(135deg, #1f251e 0%, #0d130d 100%)" }}>
      <span style={{ fontSize: "20px", marginBottom: "4px" }}>🏆</span>
      <span style={{ fontSize: "9px", fontWeight: 700, color: "#4ade80", textTransform: "uppercase" }}>
        Apple SSC &apos;26
      </span>
      <span style={{ fontSize: "7.5px", color: "#9ca3af", fontFamily: "ui-monospace, monospace" }}>
        9× Hackathon Podium
      </span>
    </CardMini>
    <TrackCaption>&lt; HALL OF RECORDS &gt;</TrackCaption>
  </PreviewContainer>
);

/* ------------------------------------------------------------------ */
/*  About Preview                                                     */
/* ------------------------------------------------------------------ */

const AboutPreview = () => (
  <PreviewContainer>
    <CardMini style={{ background: "linear-gradient(135deg, #25201d 0%, #14100e 100%)" }}>
      <span style={{ fontSize: "20px", marginBottom: "4px" }}>⚡</span>
      <span style={{ fontSize: "9px", fontWeight: 700, color: "#fb923c", textTransform: "uppercase" }}>
        Hardware Specs
      </span>
      <span style={{ fontSize: "7.5px", color: "#9ca3af", fontFamily: "ui-monospace, monospace" }}>
        Full-Stack · iOS · Design
      </span>
    </CardMini>
    <TrackCaption>&lt; TECH SPEC SHEET &gt;</TrackCaption>
  </PreviewContainer>
);

/* ------------------------------------------------------------------ */
/*  Contact Preview                                                   */
/* ------------------------------------------------------------------ */

const ContactPreview = () => (
  <PreviewContainer>
    <CardMini style={{ background: "linear-gradient(135deg, #2a2c35 0%, #15171e 100%)" }}>
      <span style={{ fontSize: "20px", marginBottom: "4px" }}>✉️</span>
      <span style={{ fontSize: "9px", fontWeight: 700, color: "#60a5fa", textTransform: "uppercase" }}>
        Direct Inbox
      </span>
      <span style={{ fontSize: "7.5px", color: "#9ca3af", fontFamily: "ui-monospace, monospace" }}>
        vanshnagpal21@gmail.com
      </span>
    </CardMini>
    <TrackCaption>&lt; STAINLESS BACKPLATE &gt;</TrackCaption>
  </PreviewContainer>
);

export const Previews: Record<SplitScreenPreview, React.FC> = {
  [SplitScreenPreview.Projects]: ProjectsPreview,
  [SplitScreenPreview.Experience]: ExperiencePreview,
  [SplitScreenPreview.Honors]: HonorsPreview,
  [SplitScreenPreview.About]: AboutPreview,
  [SplitScreenPreview.Contact]: ContactPreview,
};
