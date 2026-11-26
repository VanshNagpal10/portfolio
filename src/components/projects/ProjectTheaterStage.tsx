"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ExternalLink,
  GitBranch,
  FolderOpen,
  Layers,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react";
import { ProjectItem, ProjectSlide } from "@/data/projects";
import { playClickTick, playConfirmChime } from "@/utils/audio";

interface ProjectTheaterStageProps {
  projects: ProjectItem[];
  activeProject: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
  onScrollToFolder: () => void;
}

const scanSweep = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(220%); }
`;

/* ------------------------------------------------------------------ */
/*  YouTube-Inspired Widescreen Theater + Queue Layout                */
/* ------------------------------------------------------------------ */

const TheaterGrid = styled.section`
  display: grid;
  grid-template-columns: 1.75fr 1fr;
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const TheaterPrimary = styled.div`
  padding: 32px 36px 40px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;

  @media (max-width: 1080px) {
    padding: 28px 0 32px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

const ScreenFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #050608;
  background-image:
    radial-gradient(circle at 50% 42%, rgba(56, 142, 233, 0.12) 0%, transparent 62%),
    radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 100% 100%, 24px 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ScreenTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(8, 9, 12, 0.72);
  backdrop-filter: blur(8px);
  z-index: 2;
`;

const ChannelStamp = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;

  span.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #388ee9;
    box-shadow: 0 0 8px rgba(56, 142, 233, 0.8);
  }
`;

const TelemetryBadge = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 3px 9px;

  span.muted {
    color: #7a7f8a;
    margin-right: 6px;
  }
`;

const StageCanvas = styled.div`
  flex: 1;
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 28px;
  padding: 24px 28px;
  min-height: 0;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
  }
`;

const StageCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2;
`;

const SlideKicker = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #388ee9;
`;

const SlideTitle = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(22px, 2.6vw, 34px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.08;
  margin: 0;
  color: #ffffff;
`;

const SlideSummary = styled.p`
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: #b4bcc9;
  max-width: 440px;

  @media (max-width: 680px) {
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const DiagramStage = styled.div`
  position: relative;
  height: 100%;
  max-height: 240px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(11, 13, 18, 0.86);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: hidden;

  @media (max-width: 680px) {
    display: none;
  }
`;

const SweepLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 35%;
  background: linear-gradient(90deg, transparent, rgba(56, 142, 233, 0.08), transparent);
  animation: ${scanSweep} 4.2s linear infinite;
  pointer-events: none;
`;

/* Bottom YouTube-Style Scrubber + Transport Bar */
const TransportBar = styled.div`
  background: rgba(8, 9, 12, 0.92);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px 18px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 3;
`;

const ChapterProgressTrack = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  width: 100%;
`;

const ChapterSegment = styled.button<{ $active: boolean; $passed: boolean }>`
  height: 3px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${({ $active, $passed }) =>
    $active
      ? "#388ee9"
      : $passed
      ? "rgba(56, 142, 233, 0.45)"
      : "rgba(255, 255, 255, 0.14)"};
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: #388ee9;
    transform: scaleY(1.6);
  }
`;

const TransportControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const IconControlBtn = styled.button<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 28px;
  background: ${({ $primary }) =>
    $primary ? "rgba(56, 142, 233, 0.15)" : "transparent"};
  border: 1px solid
    ${({ $primary }) =>
      $primary ? "rgba(56, 142, 233, 0.45)" : "rgba(255, 255, 255, 0.1)"};
  color: ${({ $primary }) => ($primary ? "#ffffff" : "#94a3b8")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #388ee9;
    color: #ffffff;
    background: rgba(56, 142, 233, 0.2);
  }
`;

const TimeReadout = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #94a3b8;
  letter-spacing: 0.06em;
  margin-left: 8px;

  strong {
    color: #ffffff;
    font-weight: 700;
  }
`;

/* Watch Metadata Strip Beneath Video Viewport */
const WatchHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
`;

const WatchTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const WatchTitle = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(24px, 2.8vw, 32px);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
  color: #ffffff;
`;

const WatchMetaLine = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7a7f8a;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  span.highlight {
    color: #388ee9;
  }
`;

const ActionLinksRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionLink = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid
    ${({ $primary }) =>
      $primary ? "rgba(56, 142, 233, 0.65)" : "rgba(255, 255, 255, 0.14)"};
  background: ${({ $primary }) =>
    $primary ? "rgba(56, 142, 233, 0.14)" : "transparent"};
  color: ${({ $primary }) => ($primary ? "#ffffff" : "#cbd5e1")};
  transition: all 0.15s ease;

  &:hover {
    border-color: #388ee9;
    background: rgba(56, 142, 233, 0.22);
    color: #ffffff;
  }
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #388ee9;
    color: #ffffff;
  }
`;

/* Hairline Metrics Strip */
const MetricsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCell = styled.div`
  padding: 16px 18px 16px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:not(:first-child) {
    padding-left: 18px;
  }

  &:last-child {
    border-right: none;
  }

  @media (max-width: 600px) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 12px 0 !important;
  }

  span.label {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: #7a7f8a;
    text-transform: uppercase;
  }

  span.val {
    font-size: 15px;
    font-weight: 600;
    color: #f5f5f7;
    letter-spacing: -0.01em;
  }
`;

const DescriptionBlock = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProjectNarrative = styled.p`
  margin: 0;
  font-size: 14.5px;
  line-height: 1.65;
  color: #cbd5e1;
`;

const HighlightsList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    font-size: 13.5px;
    line-height: 1.55;
    color: #94a3b8;
  }
`;

const StackRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const StackTag = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #cbd5e1;
  padding: 3px 9px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
`;

/* ------------------------------------------------------------------ */
/*  Right Playlist Sidebar (Chapters + Up Next Queue)                 */
/* ------------------------------------------------------------------ */

const QueueSidebar = styled.aside`
  padding: 28px 0 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 1080px) {
    padding: 28px 0 12px;
  }
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a7f8a;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const ChapterRow = styled.button<{ $active: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 76px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 10px 10px;
  background: ${({ $active }) =>
    $active ? "rgba(56, 142, 233, 0.1)" : "transparent"};
  border: none;
  border-left: 2px solid
    ${({ $active }) => ($active ? "#388ee9" : "transparent")};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(56, 142, 233, 0.08);
  }
`;

const MiniThumb = styled.div`
  width: 76px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #0a0c10;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.88;
  }
`;

const ChapterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  span.title {
    font-size: 13px;
    font-weight: 600;
    color: #f5f5f7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span.sub {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 10.5px;
    color: #7a7f8a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ChapterDuration = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  color: #64748b;
`;

const QueueProjectRow = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 10px;
  border-left: 2px solid
    ${({ $active }) => ($active ? "#388ee9" : "transparent")};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: ${({ $active }) =>
    $active ? "rgba(56, 142, 233, 0.08)" : "transparent"};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

const QueueLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const QueueNum = styled.span<{ $active: boolean }>`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#388ee9" : "#64748b")};
`;

const QueueMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  span.name {
    font-size: 13.5px;
    font-weight: 600;
    color: #ffffff;
  }

  span.cat {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 10px;
    color: #7a7f8a;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

const QueueActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    color: #7a7f8a;
    display: inline-flex;
    align-items: center;
    padding: 4px;
    transition: color 0.15s ease;

    &:hover {
      color: #388ee9;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Schematic Preview Renderer inside 16:9 Screen                     */
/* ------------------------------------------------------------------ */

function SlideSchematicView({ slide }: { slide: ProjectSlide }) {
  const icon =
    slide.diagramType === "architecture" ? (
      <Layers size={18} color="#388ee9" />
    ) : slide.diagramType === "interface" ? (
      <Terminal size={18} color="#388ee9" />
    ) : slide.diagramType === "runtime" ? (
      <Activity size={18} color="#388ee9" />
    ) : (
      <Cpu size={18} color="#388ee9" />
    );

  return (
    <DiagramStage>
      <SweepLine />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingBottom: 8,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#94a3b8",
            }}
          >
            {icon}
            {slide.diagramType}
          </span>
          <span
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              color: "#388ee9",
            }}
          >
            {slide.duration}
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={slide.sheetImage}
            alt={slide.title}
            style={{
              height: "100%",
              maxHeight: 150,
              width: "auto",
              objectFit: "contain",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            color: "#7a7f8a",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 8,
          }}
        >
          <span>{slide.detail}</span>
          <span style={{ color: "#e2e8f0" }}>{slide.telemetryValue}</span>
        </div>
      </div>
    </DiagramStage>
  );
}

export default function ProjectTheaterStage({
  projects,
  activeProject,
  onSelectProject,
  onScrollToFolder,
}: ProjectTheaterStageProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setSlideIndex(0);
  }, [activeProject.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % activeProject.slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, activeProject.slides.length]);

  const activeSlide = activeProject.slides[slideIndex] || activeProject.slides[0];

  const handleSlideJump = (idx: number) => {
    playClickTick();
    setSlideIndex(idx);
  };

  const handlePrev = () => {
    playClickTick();
    setSlideIndex(
      (prev) => (prev - 1 + activeProject.slides.length) % activeProject.slides.length
    );
  };

  const handleNext = () => {
    playClickTick();
    setSlideIndex((prev) => (prev + 1) % activeProject.slides.length);
  };

  return (
    <TheaterGrid>
      {/* Left: Widescreen 16:9 Theater Player + Watch Metadata */}
      <TheaterPrimary>
        <ScreenFrame>
          <ScreenTopBar>
            <ChannelStamp>
              <span className="dot" />
              <span>
                CH-{activeProject.index} // {activeProject.title.toUpperCase()} REEL
              </span>
            </ChannelStamp>
            <TelemetryBadge>
              <span className="muted">{activeSlide.telemetryLabel}</span>
              {activeSlide.telemetryValue}
            </TelemetryBadge>
          </ScreenTopBar>

          <StageCanvas>
            <StageCopy>
              <SlideKicker>
                {activeSlide.code} OF 0{activeProject.slides.length} ·{" "}
                {activeSlide.detail.toUpperCase()}
              </SlideKicker>
              <SlideTitle>{activeSlide.title}</SlideTitle>
              <SlideSummary>{activeSlide.summary}</SlideSummary>
            </StageCopy>

            <SlideSchematicView slide={activeSlide} />
          </StageCanvas>

          <TransportBar>
            <ChapterProgressTrack aria-label="Slide chapter progress">
              {activeProject.slides.map((sl, idx) => (
                <ChapterSegment
                  key={sl.id}
                  type="button"
                  $active={idx === slideIndex}
                  $passed={idx < slideIndex}
                  onClick={() => handleSlideJump(idx)}
                  title={`Jump to ${sl.code}: ${sl.title}`}
                />
              ))}
            </ChapterProgressTrack>

            <TransportControls>
              <ControlGroup>
                <IconControlBtn
                  type="button"
                  $primary
                  onClick={() => {
                    playClickTick();
                    setIsPlaying((p) => !p);
                  }}
                  aria-label={isPlaying ? "Pause reel" : "Autoplay reel"}
                  title={isPlaying ? "Pause Auto-Reel" : "Play Auto-Reel"}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                </IconControlBtn>
                <IconControlBtn
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                >
                  <SkipBack size={13} />
                </IconControlBtn>
                <IconControlBtn
                  type="button"
                  onClick={handleNext}
                  aria-label="Next slide"
                >
                  <SkipForward size={13} />
                </IconControlBtn>
                <TimeReadout>
                  <strong>0{slideIndex + 1}</strong> / 0{activeProject.slides.length} ·{" "}
                  {activeSlide.title} ({activeSlide.duration})
                </TimeReadout>
              </ControlGroup>

              <TimeReadout>{isPlaying ? "AUTO-REEL ON" : "MANUAL SCRUB"}</TimeReadout>
            </TransportControls>
          </TransportBar>
        </ScreenFrame>

        {/* Watch Metadata Header */}
        <WatchHeader>
          <WatchTitleBlock>
            <WatchTitle>
              {activeProject.title} — {activeProject.subtitle}
            </WatchTitle>
            <WatchMetaLine>
              <span className="highlight">{activeProject.recognition}</span>
              <span>//</span>
              <span>{activeProject.category}</span>
              <span>//</span>
              <span>{activeProject.year}</span>
            </WatchMetaLine>
          </WatchTitleBlock>

          <ActionLinksRow>
            {activeProject.liveUrl && (
              <ActionLink
                $primary
                href={activeProject.liveUrl}
                target={activeProject.liveUrl.startsWith("/") ? undefined : "_blank"}
                rel={
                  activeProject.liveUrl.startsWith("/")
                    ? undefined
                    : "noopener noreferrer"
                }
                onClick={() => playConfirmChime()}
              >
                <span>{activeProject.demoLabel || "Live Deployment"}</span>
                <ExternalLink size={12} />
              </ActionLink>
            )}
            <ActionLink
              $primary={!activeProject.liveUrl}
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playConfirmChime()}
            >
              <GitBranch size={12} />
              <span>GitHub Source</span>
              <ExternalLink size={11} />
            </ActionLink>
            <ActionButton
              type="button"
              onClick={() => {
                playClickTick();
                onScrollToFolder();
              }}
            >
              <FolderOpen size={12} />
              <span>Folio View ↑</span>
            </ActionButton>
          </ActionLinksRow>
        </WatchHeader>

        {/* Metrics Strip */}
        <MetricsStrip>
          {activeProject.metrics.map((metric) => (
            <MetricCell key={metric.label}>
              <span className="label">{metric.label}</span>
              <span className="val">{metric.value}</span>
            </MetricCell>
          ))}
        </MetricsStrip>

        {/* Engineering Overview */}
        <DescriptionBlock>
          <ProjectNarrative>{activeProject.description}</ProjectNarrative>
          <HighlightsList>
            {activeProject.highlights.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </HighlightsList>
          <StackRow>
            {activeProject.stack.map((tech) => (
              <StackTag key={tech}>{tech}</StackTag>
            ))}
          </StackRow>
        </DescriptionBlock>
      </TheaterPrimary>

      {/* Right: Chapters + Full Queue */}
      <QueueSidebar>
        <SidebarSection>
          <SidebarHeading>
            <span>REEL CHAPTERS ({activeProject.title})</span>
            <span>0{activeProject.slides.length} SLIDES</span>
          </SidebarHeading>
          {activeProject.slides.map((sl, idx) => (
            <ChapterRow
              key={sl.id}
              type="button"
              $active={idx === slideIndex}
              onClick={() => handleSlideJump(idx)}
            >
              <MiniThumb>
                <img src={sl.sheetImage} alt={sl.title} />
              </MiniThumb>
              <ChapterInfo>
                <span className="title">{sl.title}</span>
                <span className="sub">
                  {sl.code} · {sl.detail}
                </span>
              </ChapterInfo>
              <ChapterDuration>{sl.duration}</ChapterDuration>
            </ChapterRow>
          ))}
        </SidebarSection>

        <SidebarSection>
          <SidebarHeading>
            <span>BUILD QUEUE (MOUNT TO STAGE)</span>
            <span>0{projects.length} ITEMS</span>
          </SidebarHeading>
          {projects.map((proj) => {
            const isSelected = proj.id === activeProject.id;
            return (
              <QueueProjectRow
                key={proj.id}
                $active={isSelected}
                onClick={() => {
                  playClickTick();
                  onSelectProject(proj);
                }}
              >
                <QueueLeft>
                  <QueueNum $active={isSelected}>{proj.index}</QueueNum>
                  <QueueMeta>
                    <span className="name">{proj.title}</span>
                    <span className="cat">
                      {proj.category} · {proj.year}
                    </span>
                  </QueueMeta>
                </QueueLeft>
                <QueueActions onClick={(e) => e.stopPropagation()}>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${proj.title} GitHub`}
                  >
                    <GitBranch size={14} />
                  </a>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target={proj.liveUrl.startsWith("/") ? undefined : "_blank"}
                      rel={
                        proj.liveUrl.startsWith("/")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      title={`${proj.title} Live URL`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </QueueActions>
              </QueueProjectRow>
            );
          })}
        </SidebarSection>
      </QueueSidebar>
    </TheaterGrid>
  );
}
