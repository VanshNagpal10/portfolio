"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { NavBar } from "@/components/ui/tubelight-navbar";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import {
  HACKATHON_TRACKS,
  NOTABLE_PARTICIPATIONS,
  HackathonTrack,
} from "@/data/honors";
import { playClickTick, playConfirmChime } from "@/utils/audio";
import {
  Trophy,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Styled Components                                                 */
/* ------------------------------------------------------------------ */

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #08090c;
  background-image: 
    radial-gradient(circle at 80% 15%, rgba(56, 142, 233, 0.08) 0%, transparent 55%),
    radial-gradient(circle at 20% 60%, rgba(245, 158, 11, 0.04) 0%, transparent 50%),
    radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 32px 32px;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  padding-bottom: 120px;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 36px 64px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 80px 20px 48px;
  }
`;

/* Page Header */
const PageHeader = styled.header`
  margin-bottom: 48px;
`;

const CatalogTag = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f59e0b;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #f59e0b;
    border-radius: 50%;
    box-shadow: 0 0 8px #f59e0b;
  }
`;

const MainTitle = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(32px, 4vw, 46px);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 12px;
  color: #ffffff;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #94a3b8;
  max-width: 720px;
`;

/* ------------------------------------------------------------------ */
/*  1. Hero Band: Apple Swift Student Challenge 2026 (Full-Width)      */
/* ------------------------------------------------------------------ */

const HeroBandWrapper = styled.section`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 56px 0;
  margin-bottom: 0;
  display: grid;
  grid-template-columns: 1.35fr 0.85fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 40px 0;
  }
`;

const HeroBandLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroKicker = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #388ee9;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  span.apple-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #388ee9;
    box-shadow: 0 0 8px #388ee9;
  }
`;

const HeroTitle = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(28px, 3.4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.12;
  margin: 0 0 16px;
  background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroDescription = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  font-size: 15.5px;
  line-height: 1.65;
  color: #cbd5e1;
  margin: 0 0 24px;
  max-width: 640px;

  strong {
    color: #ffffff;
    font-weight: 700;
  }
`;

const HeroSpecTags = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const SpecPill = styled.span`
  padding: 4px 11px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #94a3b8;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  gap: 5px;

  span.icon {
    color: #388ee9;
  }
`;

/* Apple Showcase Badge (Right Column) */
const HeroShowcaseBadge = styled.div`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -40px;
    right: -40px;
    width: 140px;
    height: 140px;
    background: radial-gradient(circle, rgba(56, 142, 233, 0.25) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const AppleEmblemIcon = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: linear-gradient(145deg, #242630 0%, #15161d 100%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
`;

const ShowcaseTitle = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ffffff;
  margin-bottom: 4px;
`;

const ShowcaseSub = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: #388ee9;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const ShowcaseVerifiedPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #4ade80;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-family: ui-monospace, monospace;
`;

/* ------------------------------------------------------------------ */
/*  2. Secondary Band: Reliance Foundation Scholar (Compact Row)       */
/* ------------------------------------------------------------------ */

const SecondaryBand = styled.section`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 0;
  display: grid;
  grid-template-columns: 140px 1fr auto;
  align-items: center;
  gap: 32px;
  margin-bottom: 64px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const SecondaryLeft = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #64748b;
  text-transform: uppercase;
`;

const SecondaryCenter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  span.title {
    font-size: 15.5px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  span.desc {
    font-size: 13.5px;
    color: #94a3b8;
    line-height: 1.5;
  }
`;

const SecondaryRight = styled.div`
  display: flex;
  align-items: center;
`;

const MeritBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 13px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.32);
  border-radius: 20px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #4ade80;
  text-transform: uppercase;
  white-space: nowrap;
`;

/* ------------------------------------------------------------------ */
/*  3. The 9× Hackathon Winning Ledger (iTunes / Editorial Table)      */
/* ------------------------------------------------------------------ */

const LedgerSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;
`;

const LedgerHeaderArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const LedgerKicker = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #388ee9;
  margin-bottom: 6px;
`;

const LedgerTitle = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0;
`;

const LedgerSubtitle = styled.p`
  margin: 6px 0 0;
  font-size: 14px;
  color: #94a3b8;
`;

const LedgerCountBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-family: ui-monospace, monospace;
  font-size: 12px;
  font-weight: 600;
  color: #cbd5e1;
`;

/* Table Framework */
const TableWrapper = styled.div`
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
`;

const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 50px 2.2fr 1.4fr 2fr 90px 40px;
  align-items: center;
  padding: 12px 16px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #64748b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 900px) {
    grid-template-columns: 40px 2fr 1.5fr 1fr 40px;
    div.col-project {
      display: none;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 36px 1fr 1fr 32px;
    div.col-year, div.col-project {
      display: none;
    }
  }
`;

const TableRow = styled.div<{ $isExpanded: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: 50px 2.2fr 1.4fr 2fr 90px 40px;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  user-select: none;
  background: ${({ $isExpanded }) =>
    $isExpanded
      ? "linear-gradient(90deg, rgba(56, 142, 233, 0.12) 0%, rgba(56, 142, 233, 0.02) 100%)"
      : "transparent"};
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: linear-gradient(90deg, rgba(56, 142, 233, 0.14) 0%, rgba(56, 142, 233, 0.03) 100%);
  }

  @media (max-width: 900px) {
    grid-template-columns: 40px 2fr 1.5fr 1fr 40px;
    div.col-project {
      display: none;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 36px 1fr 1fr 32px;
    div.col-year, div.col-project {
      display: none;
    }
  }
`;

const ColIndex = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
`;

const ColEvent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 12px;

  span.event-name {
    font-size: 14.5px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  span.organizer {
    font-size: 11.5px;
    color: #64748b;
  }
`;

const ColProject = styled.div`
  display: flex;
  align-items: center;

  span.project-tag {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    color: #cbd5e1;
  }
`;

const ColPlacement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span.award {
    font-size: 13px;
    font-weight: 600;
    color: #388ee9;
  }

  span.prize {
    font-family: ui-monospace, monospace;
    font-size: 10.5px;
    color: #94a3b8;
  }
`;

const ColYear = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  color: #64748b;
`;

const ColAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #64748b;
`;

/* Inline Detail Drawer (Slide Open on Row Click) */
const DetailDrawer = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "grid" : "none")};
  grid-template-columns: 1fr 340px;
  gap: 32px;
  padding: 24px 20px 28px 50px;
  background: rgba(13, 15, 20, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  animation: drawerSlide 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes drawerSlide {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 20px 16px;
  }
`;

const DrawerLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DrawerTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DrawerDesc = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #cbd5e1;
  margin: 0;
`;

const DrawerMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const MetaChip = styled.span`
  font-family: ui-monospace, monospace;
  font-size: 11px;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3px 8px;
  border-radius: 4px;
`;

const DrawerRight = styled.div`
  display: flex;
  flex-direction: column;
`;

/* Stage Proof Card inside Drawer (replaces dashed certificate placeholder) */
const StageProofCard = styled.div`
  background: linear-gradient(145deg, #181a22 0%, #0f1015 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.4);
`;

const StageProofHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ui-monospace, monospace;
  font-size: 10px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const StageProofTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
  line-height: 1.4;
`;

const StageVerifiedTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: ui-monospace, monospace;
  font-size: 10.5px;
  font-weight: 700;
  color: #4ade80;
  text-transform: uppercase;
`;

/* ------------------------------------------------------------------ */
/*  4. Notable Participations Honor Roll                              */
/* ------------------------------------------------------------------ */

const NotableSection = styled.section`
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
`;

const NotableHeading = styled.h3`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #64748b;
  margin: 0 0 16px;
`;

const NotableChipsGrid = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const NotableChip = styled.span`
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  font-size: 12.5px;
  color: #94a3b8;
  letter-spacing: 0.01em;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(56, 142, 233, 0.35);
    color: #ffffff;
    transform: translateY(-1px);
  }
`;

export default function HonorsPage() {
  const [expandedTrack, setExpandedTrack] = useState<string | null>("01");

  const toggleRow = (trackNo: string) => {
    playClickTick();
    setExpandedTrack((prev) => (prev === trackNo ? null : trackNo));
  };

  return (
    <PageWrapper>
      {/* Unified Tubelight Navbar */}
      <NavBar />

      <MainContent>
        {/* Page Header */}
        <PageHeader>
          <CatalogTag>CATALOG VN-HON-04 // ASYMMETRIC SPOTLIGHT &amp; LEDGER</CatalogTag>
          <MainTitle>Honors &amp; Distinctions</MainTitle>
          <Subtitle>
            Global recognition from Apple Inc., nationwide merit scholarships, and 9 podium finishes across competitive 24–48hr national hackathons.
          </Subtitle>
        </PageHeader>

        {/* 1. Full-Width Architectural Hero Band: Apple Swift Student Challenge 2026 */}
        <HeroBandWrapper>
          <HeroBandLeft>
            <HeroKicker>
              <span className="apple-dot" />
              <span>GLOBAL WINNER // APPLE INC. CUPERTINO · 2026</span>
            </HeroKicker>

            <HeroTitle>Apple Swift Student Challenge 2026 Winner</HeroTitle>

            <HeroDescription>
              Selected globally by Apple for engineering <strong>Ping</strong> — an interactive 3D native networking playground built in Swift, SwiftUI, and SceneKit. Designed without external dependencies to simulate real-time packet routing, latency, and OSI network architecture through tactile game physics.
            </HeroDescription>

            <HeroSpecTags>
              <SpecPill>
                <span className="icon"></span>
                <span>Native Swift &amp; SwiftUI</span>
              </SpecPill>
              <SpecPill>
                <span className="icon">✦</span>
                <span>3D SceneKit Engine</span>
              </SpecPill>
              <SpecPill>
                <span className="icon">●</span>
                <span>Zero Third-Party Dependencies</span>
              </SpecPill>
              <SpecPill>
                <span className="icon">◆</span>
                <span>Cupertino Global Recognition</span>
              </SpecPill>
            </HeroSpecTags>
          </HeroBandLeft>

          <HeroShowcaseBadge>
            <AppleEmblemIcon></AppleEmblemIcon>
            <ShowcaseTitle>Swift Student Challenge</ShowcaseTitle>
            <ShowcaseSub>2026 Global Winner</ShowcaseSub>
            <ShowcaseVerifiedPill>
              <CheckCircle2 size={13} />
              <span>Verified Honoree</span>
            </ShowcaseVerifiedPill>
          </HeroShowcaseBadge>
        </HeroBandWrapper>

        {/* 2. Secondary Band: Reliance Foundation Scholar (Compact Single Row) */}
        <SecondaryBand>
          <SecondaryLeft>2023 – 2027</SecondaryLeft>
          <SecondaryCenter>
            <span className="title">Reliance Foundation Undergraduate Scholar</span>
            <span className="desc">
              Awarded prestigious nationwide merit scholarship (up to ₹2,00,000) honoring top academic excellence, technological leadership, and STEM innovation.
            </span>
          </SecondaryCenter>
          <SecondaryRight>
            <MeritBadge>
              <Sparkles size={12} />
              <span>Top 5% National Merit</span>
            </MeritBadge>
          </SecondaryRight>
        </SecondaryBand>

        {/* 3. The 9× Hackathon Winning Ledger (Full-Width Interactive Table) */}
        <LedgerSection>
          <LedgerHeaderArea>
            <div>
              <LedgerKicker>COMPETITIVE SPRINT RECORD // 9 PODIUM FINISHES</LedgerKicker>
              <LedgerTitle>The Winning Ledger</LedgerTitle>
              <LedgerSubtitle>
                A complete chronological record of rapid ideation, system architecture, and winning pitches. Click any row to reveal proof &amp; technical specs.
              </LedgerSubtitle>
            </div>
            <LedgerCountBadge>
              <Trophy size={14} color="#f59e0b" />
              <span>9 Wins / 14+ Sprints</span>
            </LedgerCountBadge>
          </LedgerHeaderArea>

          <TableWrapper>
            {/* Table Header */}
            <TableHeaderRow>
              <div>#</div>
              <div>EVENT</div>
              <div className="col-project">PROJECT</div>
              <div>PLACEMENT &amp; PERK</div>
              <div className="col-year">YEAR</div>
              <div style={{ textAlign: "right" }}>INFO</div>
            </TableHeaderRow>

            {/* Table Rows & Expandable Detail Drawers */}
            {HACKATHON_TRACKS.map((track) => {
              const isExpanded = expandedTrack === track.trackNo;
              return (
                <React.Fragment key={track.trackNo}>
                  <TableRow
                    $isExpanded={isExpanded}
                    onClick={() => toggleRow(track.trackNo)}
                    title={`Click to view ${track.eventName} details`}
                  >
                    <ColIndex>{track.trackNo}</ColIndex>

                    <ColEvent>
                      <span className="event-name">{track.eventName}</span>
                      <span className="organizer">{track.organizer}</span>
                    </ColEvent>

                    <ColProject className="col-project">
                      <span className="project-tag">{track.project}</span>
                    </ColProject>

                    <ColPlacement>
                      <span className="award">{track.award}</span>
                      {track.prizeOrPerk && (
                        <span className="prize">{track.prizeOrPerk}</span>
                      )}
                    </ColPlacement>

                    <ColYear className="col-year">{track.date}</ColYear>

                    <ColAction>
                      {isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </ColAction>
                  </TableRow>

                  {/* Inline Detail Drawer */}
                  <DetailDrawer $isOpen={isExpanded}>
                    <DrawerLeft>
                      <DrawerTitle>
                        <Trophy size={16} color="#f59e0b" />
                        <span>
                          {track.eventName} — {track.project}
                        </span>
                      </DrawerTitle>

                      <DrawerDesc>
                        {track.description ||
                          `Engineered full-stack architecture for ${track.project} under high-pressure competitive hackathon conditions, presenting to industry judges.`}
                      </DrawerDesc>

                      <DrawerMetaRow>
                        <MetaChip>Organizer: {track.organizer}</MetaChip>
                        <MetaChip>Category: {track.awardTier}</MetaChip>
                        {track.prizeOrPerk && (
                          <MetaChip>Reward: {track.prizeOrPerk}</MetaChip>
                        )}
                        <MetaChip>Timeline: {track.date}</MetaChip>
                      </DrawerMetaRow>
                    </DrawerLeft>

                    <DrawerRight>
                      <StageProofCard>
                        <StageProofHeader>
                          <span>VERIFIED PODIUM RECORD</span>
                          <span>CATALOG #{track.trackNo}</span>
                        </StageProofHeader>

                        <StageProofTitle>
                          {track.award} @ {track.eventName}
                        </StageProofTitle>

                        <StageVerifiedTag>
                          <ShieldCheck size={14} />
                          <span>Official Competition Proof</span>
                        </StageVerifiedTag>
                      </StageProofCard>
                    </DrawerRight>
                  </DetailDrawer>
                </React.Fragment>
              );
            })}
          </TableWrapper>
        </LedgerSection>

        {/* 4. Notable Participations Honor Roll */}
        <NotableSection>
          <NotableHeading>Notable Finalist &amp; Hackathon Participations</NotableHeading>
          <NotableChipsGrid>
            {NOTABLE_PARTICIPATIONS.map((event, idx) => (
              <NotableChip key={idx}>{event}</NotableChip>
            ))}
          </NotableChipsGrid>
        </NotableSection>
      </MainContent>
    </PageWrapper>
  );
}
