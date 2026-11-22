"use client";

import React, { useState } from "react";
import styled from "styled-components";
import OSStatusBar from "@/components/os/OSStatusBar";
import ShuffleDock from "@/components/os/ShuffleDock";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { WORK_EXPERIENCE, EDUCATION, CERTIFICATIONS } from "@/data/experience";
import { playClickTick } from "@/utils/audio";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at 50% 0%, #15171d 0%, #0a0b0e 100%);
  color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  padding-bottom: 120px;
  position: relative;
  overflow-x: hidden;
`;

const ContentContainer = styled.main`
  max-width: 1040px;
  margin: 0 auto;
  padding: 40px 24px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const LinerNotesHeader = styled.header`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 28px;
  margin-bottom: 36px;
`;

const CatalogTag = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
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
  background: linear-gradient(180deg, #ffffff 0%, #b8bcc8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeaderSubtitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: #9aa1b2;
  line-height: 1.5;
  max-width: 680px;
`;

const ScrubberBar = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 36px;
  overflow-x: auto;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
  }
`;

const ScrubberPill = styled.button<{ $active: boolean }>`
  background: ${(props) =>
    props.$active
      ? "linear-gradient(180deg, #388ee9 0%, #1754be 100%)"
      : "rgba(255, 255, 255, 0.05)"};
  color: ${(props) => (props.$active ? "#ffffff" : "#9aa1b2")};
  border: 1px solid
    ${(props) =>
      props.$active ? "rgba(56, 142, 233, 0.5)" : "rgba(255, 255, 255, 0.08)"};
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover {
    color: #ffffff;
    background: ${(props) =>
      props.$active
        ? "linear-gradient(180deg, #388ee9 0%, #1754be 100%)"
        : "rgba(255, 255, 255, 0.1)"};
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 40px 0 20px;
  color: #e5e7eb;
  display: flex;
  align-items: center;
  gap: 12px;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const TimelineCard = styled.article`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
  position: relative;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  &:hover {
    border-color: rgba(56, 142, 233, 0.35);
    background: rgba(255, 255, 255, 0.045);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
  flex-wrap: wrap;
`;

const RoleTitle = styled.h3`
  font-size: 19px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px;
`;

const CompanyName = styled.div`
  font-size: 14.5px;
  color: #388ee9;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimePill = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  color: #949cae;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4px 10px;
  border-radius: 6px;
`;

const MetricBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 16px;
`;

const BulletList = styled.ul`
  margin: 0 0 20px;
  padding-left: 20px;
  color: #c4c8d4;
  font-size: 14px;
  line-height: 1.6;

  li {
    margin-bottom: 8px;
  }
`;

const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
`;

const SkillTag = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #9aa1b2;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 3px 8px;
  border-radius: 4px;
`;

const MediaGrid = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

const CertCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 18px;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(56, 142, 233, 0.3);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const CertTitle = styled.h4`
  margin: 0 0 6px;
  font-size: 14.5px;
  font-weight: 600;
  color: #ffffff;
`;

const CertIssuer = styled.p`
  margin: 0 0 8px;
  font-size: 12.5px;
  color: #9aa1b2;
`;

const CertDate = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #388ee9;
`;

export default function ExperiencePage() {
  const [selectedYear, setSelectedYear] = useState<number | "ALL">("ALL");

  const filteredWork =
    selectedYear === "ALL"
      ? WORK_EXPERIENCE
      : WORK_EXPERIENCE.filter((item) => item.year === selectedYear);

  const filteredEdu =
    selectedYear === "ALL"
      ? EDUCATION
      : EDUCATION.filter((item) => item.year === selectedYear);

  const handleYearSelect = (year: number | "ALL") => {
    playClickTick();
    setSelectedYear(year);
  };

  return (
    <PageWrapper>
      <OSStatusBar title="03 · Experience & Education" />

      <ContentContainer>
        <LinerNotesHeader>
          <CatalogTag>CATALOG VN-EXP-03 · LINER NOTES</CatalogTag>
          <MainHeading>Experience & Education</MainHeading>
          <HeaderSubtitle>
            Engineering scalable production features, high-performance web interfaces, and building with clean system fundamentals.
          </HeaderSubtitle>
        </LinerNotesHeader>

        {/* Interactive Scrubber / Filter */}
        <ScrubberBar aria-label="Timeline Year Scrubber">
          <ScrubberPill
            $active={selectedYear === "ALL"}
            onClick={() => handleYearSelect("ALL")}
          >
            All Tracks (2021 – 2026)
          </ScrubberPill>
          <ScrubberPill
            $active={selectedYear === 2026}
            onClick={() => handleYearSelect(2026)}
          >
            2026 · KhwaaishAI
          </ScrubberPill>
          <ScrubberPill
            $active={selectedYear === 2025}
            onClick={() => handleYearSelect(2025)}
          >
            2025 · DDITLAB
          </ScrubberPill>
          <ScrubberPill
            $active={selectedYear === 2023}
            onClick={() => handleYearSelect(2023)}
          >
            2023 · VIPS-TC (B.Tech)
          </ScrubberPill>
          <ScrubberPill
            $active={selectedYear === 2021}
            onClick={() => handleYearSelect(2021)}
          >
            2021 · High School
          </ScrubberPill>
        </ScrubberBar>

        {/* Section A: Professional Experience */}
        {filteredWork.length > 0 && (
          <section>
            <SectionTitle>Professional Experience</SectionTitle>
            {filteredWork.map((exp) => (
              <TimelineCard key={exp.id}>
                <CardTop>
                  <div>
                    <RoleTitle>{exp.role}</RoleTitle>
                    <CompanyName>
                      <span>{exp.company}</span>
                      <span>·</span>
                      <span style={{ color: "#9aa1b2", fontWeight: 400, fontSize: "13px" }}>
                        {exp.location}
                      </span>
                    </CompanyName>
                  </div>
                  <TimePill>{exp.period}</TimePill>
                </CardTop>

                {exp.metrics && <MetricBadge>⚡ {exp.metrics}</MetricBadge>}

                <BulletList>
                  {exp.description.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </BulletList>

                <SkillsRow>
                  {exp.skills.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </SkillsRow>

                {exp.imagePlaceholder && (
                  <MediaGrid>
                    <ImagePlaceholder
                      slotId={exp.imagePlaceholder.slotId}
                      caption={exp.imagePlaceholder.caption}
                      suggestedPath={exp.imagePlaceholder.suggestedImage}
                      aspectRatio="16 / 9"
                      badge="Work Preview"
                    />
                  </MediaGrid>
                )}
              </TimelineCard>
            ))}
          </section>
        )}

        {/* Section B: Education */}
        {filteredEdu.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            {filteredEdu.map((edu) => (
              <TimelineCard key={edu.id}>
                <CardTop>
                  <div>
                    <RoleTitle>{edu.role}</RoleTitle>
                    <CompanyName>
                      <span>{edu.company}</span>
                    </CompanyName>
                  </div>
                  <TimePill>{edu.period}</TimePill>
                </CardTop>

                {edu.metrics && <MetricBadge>🎓 {edu.metrics}</MetricBadge>}

                <BulletList>
                  {edu.description.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </BulletList>

                <SkillsRow>
                  {edu.skills.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </SkillsRow>

                {edu.imagePlaceholder && (
                  <MediaGrid>
                    <ImagePlaceholder
                      slotId={edu.imagePlaceholder.slotId}
                      caption={edu.imagePlaceholder.caption}
                      suggestedPath={edu.imagePlaceholder.suggestedImage}
                      aspectRatio="21 / 9"
                      badge="Campus & Hackathons"
                    />
                  </MediaGrid>
                )}
              </TimelineCard>
            ))}
          </section>
        )}

        {/* Section C: Certifications & Workshops */}
        <section>
          <SectionTitle>Technical Certifications & Training</SectionTitle>
          <CertGrid>
            {CERTIFICATIONS.map((cert) => (
              <CertCard key={cert.id}>
                <CertTitle>{cert.title}</CertTitle>
                <CertIssuer>{cert.issuer}</CertIssuer>
                <CertDate>{cert.date}</CertDate>
                <SkillsRow style={{ marginTop: "10px" }}>
                  {cert.skills.map((s) => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </SkillsRow>
              </CertCard>
            ))}
          </CertGrid>
        </section>
      </ContentContainer>

      <ShuffleDock currentPath="/experience" />
    </PageWrapper>
  );
}
