"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { NavBar } from "@/components/ui/tubelight-navbar";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import {
  BIO_PARAGRAPHS,
  SKILL_CATEGORIES,
  LEADERSHIP_ROLES,
  VOLUNTEERING_ACTIVITIES,
  SkillItem,
} from "@/data/about";
import { playClickTick, playConfirmChime } from "@/utils/audio";
import { ChevronDown, ChevronUp, Cpu, Layers, Sparkles, Terminal } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Editorial Hardware Manual Styles (Dieter Rams / Teenage Eng.)      */
/* ------------------------------------------------------------------ */

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #08090c;
  background-image: 
    radial-gradient(circle at 85% 15%, rgba(56, 142, 233, 0.07) 0%, transparent 60%),
    radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 100% 100%, 32px 32px;
  color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  padding-bottom: 120px;
  position: relative;
  overflow-x: hidden;
`;

const ContentContainer = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 36px 64px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 80px 20px 48px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Page Header — Extreme Typographic Contrast                         */
/* ------------------------------------------------------------------ */

const HeaderArea = styled.header`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 40px;
  margin-bottom: 64px;
`;

const MonospaceKicker = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #7a7f8a;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  span.serial {
    color: rgba(255, 255, 255, 0.35);
  }
`;

const MainHeading = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(40px, 5.8vw, 68px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 16px;
  color: #ffffff;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 17px;
  line-height: 1.6;
  color: #8f96a3;
  max-width: 740px;
  font-weight: 400;
`;

/* ------------------------------------------------------------------ */
/*  Section 01: Core Architecture & Operating Philosophy (Split View)   */
/* ------------------------------------------------------------------ */

const SectionBand = styled.section`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 64px;
  margin-bottom: 64px;
`;

const SectionMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const SectionIndex = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a7f8a;
`;

const SectionStatus = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
`;

const PhilosophyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 56px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const StatementText = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.25;
  color: #f5f5f7;
  margin: 0;

  span.highlight {
    color: #ffffff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }
`;

const NarrativeColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    margin: 0;
    font-size: 15.5px;
    line-height: 1.75;
    color: #9aa1b0;
    font-weight: 400;

    strong {
      color: #f1f5f9;
      font-weight: 600;
    }
  }
`;

const HardwareTelemetryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const TelemetryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TelemetryValue = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

const TelemetryLabel = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7a7f8a;
`;

/* ------------------------------------------------------------------ */
/*  Section 02: Technical Parameter Spec Matrix (Hardware Spec Sheet)  */
/* ------------------------------------------------------------------ */

const SpecSheetTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SpecRow = styled.div<{ $isActive?: boolean }>`
  display: grid;
  grid-template-columns: 240px 1fr 140px;
  padding: 22px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  align-items: center;
  transition: all 0.15s ease;
  position: relative;

  ${({ $isActive }) =>
    $isActive &&
    `
    background: rgba(56, 142, 233, 0.03);
    border-bottom-color: rgba(56, 142, 233, 0.3);
  `}

  &:hover {
    background: rgba(255, 255, 255, 0.015);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 18px 0;
  }
`;

const SpecSubsystem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8f96a3;

  span.dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SpecTagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const SpecTag = styled.span`
  font-size: 13.5px;
  color: #e2e4e9;
  font-weight: 500;
  letter-spacing: -0.01em;

  &::after {
    content: "·";
    margin-left: 8px;
    color: rgba(255, 255, 255, 0.2);
  }

  &:last-child::after {
    display: none;
  }
`;

const SpecTelemetryMetric = styled.div`
  text-align: right;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #7a7f8a;

  @media (max-width: 900px) {
    text-align: left;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 03: Leadership & Society Initiatives (Architectural Ledger)*/
/* ------------------------------------------------------------------ */

const LeadershipLedger = styled.div`
  display: flex;
  flex-direction: column;
`;

const LedgerItem = styled.article`
  padding: 36px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 48px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 28px 0;
  }
`;

const LedgerLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LedgerIndex = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a7f8a;
`;

const LedgerRole = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0;
`;

const LedgerOrg = styled.span`
  font-size: 13.5px;
  color: #8f96a3;
  line-height: 1.4;
`;

const LedgerPeriod = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4px;
`;

const LedgerMetricBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f1f5f9;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 4px 10px;
  border-radius: 4px;
  margin-top: 8px;
  width: fit-content;
`;

const LedgerRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BulletLedger = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    position: relative;
    padding-left: 20px;
    font-size: 14.5px;
    line-height: 1.65;
    color: #9aa1b0;

    &::before {
      content: "—";
      position: absolute;
      left: 0;
      color: rgba(255, 255, 255, 0.25);
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 04: Community Initiatives & Fieldwork (3-Column Matrix)   */
/* ------------------------------------------------------------------ */

const FieldworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding-top: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FieldworkItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;

const FieldworkTitle = styled.h4`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const FieldworkMeta = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #7a7f8a;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const FieldworkImpact = styled.p`
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: #8f96a3;
`;

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const [activeSubsystem, setActiveSubsystem] = useState<string | null>(null);

  const handleRowClick = (subsystem: string) => {
    playClickTick();
    setActiveSubsystem((prev) => (prev === subsystem ? null : subsystem));
  };

  return (
    <PageWrapper>
      <NavBar />

      <ContentContainer>
        {/* Page Header */}
        <HeaderArea>
          <MonospaceKicker>
            <span>04 // HARDWARE SPEC SHEET</span>
            <span className="serial">· TEARDOWN REVISION 2026.04</span>
            <span className="serial">· DELHI, IN</span>
          </MonospaceKicker>
          <MainHeading>About &amp; Systems Architecture.</MainHeading>
          <Subtitle>
            A breakdown of engineering philosophy, technical stack parameters, and leadership telemetry.
          </Subtitle>
        </HeaderArea>

        {/* Section 01: Core Architecture & Operating Philosophy */}
        <SectionBand>
          <SectionMetaRow>
            <SectionIndex>01 // OPERATING PHILOSOPHY</SectionIndex>
            <SectionStatus>STATUS: ACTIVE · VN-SILICON</SectionStatus>
          </SectionMetaRow>

          <PhilosophyGrid>
            <StatementText>
              Software should feel like precision hardware—<span className="highlight">tactile, uncompromised, and built to last.</span>
            </StatementText>

            <NarrativeColumn>
              <p>
                I am a <strong>Full-Stack, iOS, and Design Engineer</strong> pursuing Computer Science &amp; Engineering at VIPS-TC, Delhi. I specialize in building high-fidelity native iOS worlds and performant web applications that unite systems-level rigor with Apple-grade tactile interaction.
              </p>
              <p>
                From winning the <strong>Apple Swift Student Challenge 2026</strong> with an interactive 3D networking physics game, to engineering production auth and administrative platforms at <strong>KhwaaishAI</strong> and boosting web telemetry by <strong>40% at DDITLAB</strong>, I focus on software where latency, architecture, and aesthetics cannot be compromised.
              </p>
              <p>
                Beyond code, I direct visual identity and developer initiatives—mentoring hundreds of junior engineers as <strong>Vice President of Aarvak Technical Society</strong> and establishing design review frameworks as <strong>Head of Design at Srijan SDG Club</strong>.
              </p>
            </NarrativeColumn>
          </PhilosophyGrid>

          <HardwareTelemetryRow>
            <TelemetryItem>
              <TelemetryValue>SSC &apos;26</TelemetryValue>
              <TelemetryLabel>Apple Global Winner</TelemetryLabel>
            </TelemetryItem>
            <TelemetryItem>
              <TelemetryValue>9.04 / 10</TelemetryValue>
              <TelemetryLabel>B.Tech CGPA · Reliance Scholar</TelemetryLabel>
            </TelemetryItem>
            <TelemetryItem>
              <TelemetryValue>9×</TelemetryValue>
              <TelemetryLabel>Hackathon Podiums &amp; Grants</TelemetryLabel>
            </TelemetryItem>
          </HardwareTelemetryRow>
        </SectionBand>

        {/* Section 02: Technical Parameter Spec Matrix (Spec Table) */}
        <SectionBand>
          <SectionMetaRow>
            <SectionIndex>02 // TECHNICAL PARAMETER SPEC SHEET</SectionIndex>
            <SectionStatus>ALL SUBSYSTEMS NOMINAL</SectionStatus>
          </SectionMetaRow>

          <SpecSheetTable>
            <SpecRow
              $isActive={activeSubsystem === "apple"}
              onClick={() => handleRowClick("apple")}
            >
              <SpecSubsystem>
                <span className="dot" />
                <span>NATIVE APPLE &amp; 3D</span>
              </SpecSubsystem>
              <SpecTagsList>
                <SpecTag>Swift</SpecTag>
                <SpecTag>SwiftUI</SpecTag>
                <SpecTag>UIKit</SpecTag>
                <SpecTag>SceneKit 3D</SpecTag>
                <SpecTag>CoreAnimation</SpecTag>
                <SpecTag>Metal Ready</SpecTag>
              </SpecTagsList>
              <SpecTelemetryMetric>94% PROFICIENCY</SpecTelemetryMetric>
            </SpecRow>

            <SpecRow
              $isActive={activeSubsystem === "frontend"}
              onClick={() => handleRowClick("frontend")}
            >
              <SpecSubsystem>
                <span className="dot" />
                <span>WEB &amp; CLIENT SYSTEMS</span>
              </SpecSubsystem>
              <SpecTagsList>
                <SpecTag>TypeScript</SpecTag>
                <SpecTag>React 19</SpecTag>
                <SpecTag>Next.js 16 (App Router)</SpecTag>
                <SpecTag>Tailwind CSS v4</SpecTag>
                <SpecTag>Styled-Components</SpecTag>
                <SpecTag>Framer Motion</SpecTag>
              </SpecTagsList>
              <SpecTelemetryMetric>95% PROFICIENCY</SpecTelemetryMetric>
            </SpecRow>

            <SpecRow
              $isActive={activeSubsystem === "backend"}
              onClick={() => handleRowClick("backend")}
            >
              <SpecSubsystem>
                <span className="dot" />
                <span>BACKEND &amp; TELEMETRY</span>
              </SpecSubsystem>
              <SpecTagsList>
                <SpecTag>Node.js</SpecTag>
                <SpecTag>Express</SpecTag>
                <SpecTag>RESTful API Architecture</SpecTag>
                <SpecTag>JWT &amp; OTP Auth</SpecTag>
                <SpecTag>Microservices</SpecTag>
              </SpecTagsList>
              <SpecTelemetryMetric>92% PROFICIENCY</SpecTelemetryMetric>
            </SpecRow>

            <SpecRow
              $isActive={activeSubsystem === "database"}
              onClick={() => handleRowClick("database")}
            >
              <SpecSubsystem>
                <span className="dot" />
                <span>DATA &amp; PERSISTENCE</span>
              </SpecSubsystem>
              <SpecTagsList>
                <SpecTag>MongoDB</SpecTag>
                <SpecTag>Mongoose</SpecTag>
                <SpecTag>MySQL</SpecTag>
                <SpecTag>Relational Schema Design</SpecTag>
                <SpecTag>Indexing &amp; Cache</SpecTag>
              </SpecTagsList>
              <SpecTelemetryMetric>89% PROFICIENCY</SpecTelemetryMetric>
            </SpecRow>

            <SpecRow
              $isActive={activeSubsystem === "ai"}
              onClick={() => handleRowClick("ai")}
            >
              <SpecSubsystem>
                <span className="dot" />
                <span>AI RUNTIME &amp; AGENTS</span>
              </SpecSubsystem>
              <SpecTagsList>
                <SpecTag>CrewAI</SpecTag>
                <SpecTag>AutoGen</SpecTag>
                <SpecTag>OpenAI API</SpecTag>
                <SpecTag>Prompt Engineering</SpecTag>
                <SpecTag>Agentic Tool Calling</SpecTag>
              </SpecTagsList>
              <SpecTelemetryMetric>88% PROFICIENCY</SpecTelemetryMetric>
            </SpecRow>

            <SpecRow
              $isActive={activeSubsystem === "tools"}
              onClick={() => handleRowClick("tools")}
            >
              <SpecSubsystem>
                <span className="dot" />
                <span>TOOLCHAIN &amp; CLOUD</span>
              </SpecSubsystem>
              <SpecTagsList>
                <SpecTag>Git &amp; GitHub Actions</SpecTag>
                <SpecTag>Postman CLI</SpecTag>
                <SpecTag>Vercel Edge</SpecTag>
                <SpecTag>AWS (S3 / Lambda)</SpecTag>
                <SpecTag>Xcode Instruments</SpecTag>
              </SpecTagsList>
              <SpecTelemetryMetric>94% PROFICIENCY</SpecTelemetryMetric>
            </SpecRow>
          </SpecSheetTable>
        </SectionBand>

        {/* Section 03: Leadership & Society Initiatives (Architectural Ledger) */}
        <SectionBand>
          <SectionMetaRow>
            <SectionIndex>03 // LEADERSHIP &amp; ORGANIZATIONAL STEWARDSHIP</SectionIndex>
            <SectionStatus>3 REGISTERED APPOINTMENTS</SectionStatus>
          </SectionMetaRow>

          <LeadershipLedger>
            {LEADERSHIP_ROLES.map((role, idx) => (
              <LedgerItem key={role.id}>
                <LedgerLeft>
                  <LedgerIndex>0{idx + 1} // APPOINTMENT</LedgerIndex>
                  <LedgerRole>{role.role}</LedgerRole>
                  <LedgerOrg>{role.organization}</LedgerOrg>
                  <LedgerPeriod>{role.period}</LedgerPeriod>
                  {role.metrics && <LedgerMetricBadge>{role.metrics}</LedgerMetricBadge>}
                </LedgerLeft>

                <LedgerRight>
                  <BulletLedger>
                    {role.description.map((bullet, bulletIdx) => (
                      <li key={bulletIdx}>{bullet}</li>
                    ))}
                  </BulletLedger>
                </LedgerRight>
              </LedgerItem>
            ))}
          </LeadershipLedger>
        </SectionBand>

        {/* Section 04: Community Initiatives & Fieldwork */}
        <section>
          <SectionMetaRow>
            <SectionIndex>04 // PUBLIC SERVICE &amp; COMMUNITY INITIATIVES</SectionIndex>
            <SectionStatus>FIELDWORK TELEMETRY</SectionStatus>
          </SectionMetaRow>

          <FieldworkGrid>
            {VOLUNTEERING_ACTIVITIES.map((vol, idx) => (
              <FieldworkItem key={idx}>
                <FieldworkTitle>{vol.title}</FieldworkTitle>
                <FieldworkMeta>
                  {vol.role} · {vol.date}
                </FieldworkMeta>
                <FieldworkImpact>{vol.impact}</FieldworkImpact>
              </FieldworkItem>
            ))}
          </FieldworkGrid>
        </section>
      </ContentContainer>
    </PageWrapper>
  );
}
