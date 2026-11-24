"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { NavBar } from "@/components/ui/tubelight-navbar";
import ShuffleDock from "@/components/os/ShuffleDock";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import {
  BIO_PARAGRAPHS,
  SKILL_CATEGORIES,
  LEADERSHIP_ROLES,
  VOLUNTEERING_ACTIVITIES,
  SkillItem,
} from "@/data/about";
import { playClickTick, playConfirmChime } from "@/utils/audio";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at 50% 0%, #15171e 0%, #08090c 100%);
  color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  padding-bottom: 120px;
  position: relative;
`;

const ContentContainer = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 84px 24px 40px;

  @media (max-width: 768px) {
    padding: 72px 16px 24px;
  }
`;

const HeaderArea = styled.header`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 28px;
  margin-bottom: 36px;
`;

const Tagline = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: #388ee9;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #388ee9;
    border-radius: 50%;
  }
`;

const MainHeading = styled.h1`
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
  background: linear-gradient(180deg, #ffffff 0%, #c4c8d8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: #9aa1b2;
  line-height: 1.5;
  max-width: 720px;
`;

const HeroGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  margin-bottom: 48px;
  align-items: start;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const NarrativeCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 32px;
  line-height: 1.7;
  font-size: 15px;
  color: #c9ccd6;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);

  p {
    margin: 0 0 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 640px) {
    padding: 20px;
    font-size: 14px;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const StatItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 10px;
`;

const StatNumber = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #388ee9;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
`;

const StatLabel = styled.div`
  font-size: 11.5px;
  color: #8892a4;
  margin-top: 2px;
`;

const SpecSheetSection = styled.section`
  margin-top: 48px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
`;

const EQVisualizerContainer = styled.div`
  background: #0d0f14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 24px 20px;
  margin-bottom: 32px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.8);
`;

const EQHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const EQTitle = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #388ee9;
  font-family: ui-monospace, monospace;
`;

const EQBandsGrid = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  height: 140px;
  padding: 0 10px;
  overflow-x: auto;
`;

const EQBandColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 38px;
  height: 100%;
  justify-content: flex-end;
  cursor: pointer;

  &:hover .eq-bar-fill {
    background: linear-gradient(180deg, #60a5fa 0%, #388ee9 100%);
    box-shadow: 0 0 10px rgba(56, 142, 233, 0.5);
  }
`;

const EQBarTrack = styled.div`
  width: 14px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  display: flex;
  align-items: flex-end;
  padding: 2px;
  box-sizing: border-box;
`;

const EQBarFill = styled.div<{ $level: number }>`
  width: 100%;
  height: ${(props) => props.$level}%;
  background: linear-gradient(180deg, #388ee9 0%, #1754be 100%);
  border-radius: 2px;
  transition: height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

const EQFreqLabel = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9.5px;
  color: #636b7b;
  margin-top: 8px;
  white-space: nowrap;
`;

const EQSkillName = styled.span`
  font-size: 10.5px;
  font-weight: 600;
  color: #c9ccd6;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50px;
  text-align: center;
`;

const SpecCategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const SpecCategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 20px;
`;

const CategoryHeader = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 10px;
`;

const SkillRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);

  &:last-child {
    border-bottom: none;
  }
`;

const SkillName = styled.span`
  color: #d1d5db;
  font-weight: 500;
`;

const SkillLevelBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MiniBar = styled.div`
  width: 60px;
  height: 5px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
`;

const MiniFill = styled.div<{ $pct: number }>`
  width: ${(props) => props.$pct}%;
  height: 100%;
  background: #388ee9;
`;

const LeadershipSection = styled.section`
  margin-top: 48px;
`;

const LeadershipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`;

const LeadershipCard = styled.article`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(56, 142, 233, 0.35);
    background: rgba(255, 255, 255, 0.045);
  }
`;

const RoleHeader = styled.div`
  margin-bottom: 16px;
`;

const RoleName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px;
`;

const OrgName = styled.div`
  font-size: 13.5px;
  color: #388ee9;
  font-weight: 600;
  margin-bottom: 6px;
`;

const RolePeriod = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #8892a4;
`;

const RoleMetric = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: #4ade80;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
`;

const BulletList = styled.ul`
  margin: 0 0 20px;
  padding-left: 18px;
  font-size: 13.5px;
  color: #c4c8d4;
  line-height: 1.6;

  li {
    margin-bottom: 8px;
  }
`;

const VolunteeringBox = styled.div`
  margin-top: 48px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 24px;
`;

const VolunteeringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const VolunteeringCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 10px;
`;

export default function AboutPage() {
  const [activeBand, setActiveBand] = useState<string>("Swift");

  // Representative top skills for the EQ Visualizer
  const eqBands: SkillItem[] = [
    { name: "Swift", level: 94, category: "Languages", frequencyBand: "32 Hz" },
    { name: "SwiftUI", level: 93, category: "Apple", frequencyBand: "64 Hz" },
    { name: "TypeScript", level: 92, category: "Languages", frequencyBand: "125 Hz" },
    { name: "React", level: 95, category: "Frontend", frequencyBand: "250 Hz" },
    { name: "Next.js", level: 92, category: "Frontend", frequencyBand: "500 Hz" },
    { name: "Python", level: 90, category: "Languages", frequencyBand: "1 kHz" },
    { name: "Node.js", level: 90, category: "Backend", frequencyBand: "2 kHz" },
    { name: "SceneKit", level: 88, category: "Apple", frequencyBand: "4 kHz" },
    { name: "REST APIs", level: 94, category: "Backend", frequencyBand: "8 kHz" },
    { name: "AI Agents", level: 86, category: "AI", frequencyBand: "16 kHz" },
  ];

  const handleBandClick = (band: SkillItem) => {
    playClickTick();
    setActiveBand(band.name);
  };

  return (
    <PageWrapper>
      <NavBar />

      <ContentContainer>
        <HeaderArea>
          <Tagline>CATALOG VN-ABT-05 · HARDWARE SPEC SHEET</Tagline>
          <MainHeading>About & Technical Architecture</MainHeading>
          <Subtitle>
            A systems-minded engineer blending Apple-grade tactile craftsmanship with full-stack and iOS engineering.
          </Subtitle>
        </HeaderArea>

        {/* Narrative & Photo Hero */}
        <HeroGrid>
          <NarrativeCard>
            <h2 style={{ fontSize: "20px", margin: "0 0 16px", color: "#ffffff", fontWeight: 700 }}>
              The Philosophy
            </h2>
            {BIO_PARAGRAPHS.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            <StatGrid>
              <StatItem>
                <StatNumber>9.04</StatNumber>
                <StatLabel>VIPS-TC CGPA (/10)</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>9× Wins</StatNumber>
                <StatLabel>Hackathon Podiums</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>Apple SSC</StatNumber>
                <StatLabel>2026 Global Winner</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>200+</StatNumber>
                <StatLabel>Developers Mentored</StatLabel>
              </StatItem>
            </StatGrid>
          </NarrativeCard>

          {/* Profile Photo Placeholder */}
          <div>
            <ImagePlaceholder
              slotId="vansh-portrait"
              caption="Vansh Nagpal — Portrait & Workstation"
              suggestedPath="/images/about/vansh-portrait.jpg"
              aspectRatio="3 / 4"
              badge="Author Portrait"
            />
          </div>
        </HeroGrid>

        {/* Technical Skills Spec Sheet + Interactive EQ Visualizer */}
        <SpecSheetSection>
          <SectionHeader>
            <div>
              <SectionTitle>Technical Architecture & Stack</SectionTitle>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#8892a4" }}>
                Interactive 10-band equalizer representing core technical proficiencies. Click any band to inspect.
              </p>
            </div>
          </SectionHeader>

          {/* Interactive EQ Visualizer */}
          <EQVisualizerContainer>
            <EQHeader>
              <EQTitle>GRAPHIC EQUALIZER · 10-BAND DSP PROFILE</EQTitle>
              <span style={{ fontSize: "12px", color: "#8892a4", fontFamily: "ui-monospace, monospace" }}>
                Active: <strong style={{ color: "#388ee9" }}>{activeBand}</strong>
              </span>
            </EQHeader>
            <EQBandsGrid>
              {eqBands.map((band) => (
                <EQBandColumn
                  key={band.name}
                  onClick={() => handleBandClick(band)}
                  title={`${band.name}: ${band.level}% proficiency (${band.frequencyBand})`}
                >
                  <EQBarTrack>
                    <EQBarFill className="eq-bar-fill" $level={band.level} />
                  </EQBarTrack>
                  <EQFreqLabel>{band.frequencyBand}</EQFreqLabel>
                  <EQSkillName>{band.name}</EQSkillName>
                </EQBandColumn>
              ))}
            </EQBandsGrid>
          </EQVisualizerContainer>

          {/* Detailed Spec Sheet Categories */}
          <SpecCategoriesGrid>
            {SKILL_CATEGORIES.map((cat) => (
              <SpecCategoryCard key={cat.category}>
                <CategoryHeader>{cat.category}</CategoryHeader>
                {cat.skills.map((skill) => (
                  <SkillRow key={skill.name}>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevelBar>
                      <MiniBar>
                        <MiniFill $pct={skill.level} />
                      </MiniBar>
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "ui-monospace, monospace",
                          color: "#8892a4",
                          width: "28px",
                          textAlign: "right",
                        }}
                      >
                        {skill.level}%
                      </span>
                    </SkillLevelBar>
                  </SkillRow>
                ))}
              </SpecCategoryCard>
            ))}
          </SpecCategoriesGrid>
        </SpecSheetSection>

        {/* Leadership & Campus Roles */}
        <LeadershipSection>
          <SectionHeader>
            <div>
              <SectionTitle>Leadership & Society Initiatives</SectionTitle>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#8892a4" }}>
                Driving design teams, organizing engineering hackathons, and fostering student talent.
              </p>
            </div>
          </SectionHeader>

          <LeadershipGrid>
            {LEADERSHIP_ROLES.map((role) => (
              <LeadershipCard key={role.id}>
                <div>
                  <RoleHeader>
                    <RoleName>{role.role}</RoleName>
                    <OrgName>
                      <span>{role.organization}</span>
                    </OrgName>
                    <div>
                      <RolePeriod>{role.period}</RolePeriod>
                      {role.metrics && <RoleMetric>{role.metrics}</RoleMetric>}
                    </div>
                  </RoleHeader>

                  <BulletList>
                    {role.description.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </BulletList>
                </div>

                {role.imagePlaceholder && (
                  <ImagePlaceholder
                    slotId={role.imagePlaceholder.slotId}
                    caption={role.imagePlaceholder.caption}
                    suggestedPath={role.imagePlaceholder.suggestedImage}
                    aspectRatio="16 / 9"
                    badge="Leadership In Action"
                  />
                )}
              </LeadershipCard>
            ))}
          </LeadershipGrid>
        </LeadershipSection>

        {/* Volunteering & Community Drives */}
        <VolunteeringBox>
          <h3 style={{ fontSize: "16px", margin: "0 0 6px", color: "#ffffff", fontWeight: 700 }}>
            Community Drives & Social Impact
          </h3>
          <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#8892a4" }}>
            Active participation in public service, health drives, and ecological conservation programs.
          </p>
          <VolunteeringGrid>
            {VOLUNTEERING_ACTIVITIES.map((vol, idx) => (
              <VolunteeringCard key={idx}>
                <h4 style={{ margin: "0 0 4px", fontSize: "14px", color: "#ffffff" }}>
                  {vol.title}
                </h4>
                <div style={{ fontSize: "12px", color: "#388ee9", marginBottom: "6px" }}>
                  {vol.role} · {vol.date}
                </div>
                <p style={{ margin: 0, fontSize: "12.5px", color: "#c4c8d4", lineHeight: 1.5 }}>
                  {vol.impact}
                </p>
              </VolunteeringCard>
            ))}
          </VolunteeringGrid>
        </VolunteeringBox>
      </ContentContainer>

      <ShuffleDock currentPath="/about" />
    </PageWrapper>
  );
}
