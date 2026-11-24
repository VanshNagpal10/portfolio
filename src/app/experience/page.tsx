"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { NavBar } from "@/components/ui/tubelight-navbar";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { playClickTick, playConfirmChime } from "@/utils/audio";

/* ------------------------------------------------------------------ */
/*  Timeline Data with Inline Impact Highlights                        */
/* ------------------------------------------------------------------ */

interface TimelineEntry {
  id: string;
  index: string;
  shortName: string;
  year: string;
  category: string;
  role: string;
  company: string;
  period: string;
  location: string;
  metricBadge: string;
  highlights: string[];
  skills: string[];
  imagePlaceholder?: {
    slotId: string;
    caption: string;
    suggestedImage: string;
  };
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: "khwaaish-ai",
    index: "01",
    shortName: "KhwaaishAI",
    year: "2026",
    category: "ENGINEERING INTERNSHIP // FULL-STACK & AUTH",
    role: "Software Developer Intern",
    company: "KhwaaishAI",
    period: "Jun 2026 – Sep 2026",
    location: "Remote / Delhi, India",
    metricBadge: "Production Auth & Admin Suite",
    highlights: [
      "Architected and deployed responsive Login, Signup, and OTP-based authentication flows from scratch with strict client/server validation and zero-friction UX across desktop and mobile devices.",
      "Engineered the internal Admin Dashboard frontend end-to-end, integrating 10+ administrative REST API endpoints for customer management, operational telemetry, and inventory tracking.",
      "Developed high-conversion user journeys including navigation sidebars, dynamic catalog exploration, referral sharing loops, and precise cart billing breakdown components.",
    ],
    skills: ["React.js", "Next.js", "TypeScript", "REST APIs", "Tailwind CSS", "JWT Auth", "State Management"],
    imagePlaceholder: {
      slotId: "khwaaish-preview",
      caption: "KhwaaishAI Production Dashboard & User Auth Flow",
      suggestedImage: "/images/experience/khwaaish-dashboard.jpg",
    },
  },
  {
    id: "digital-dreams",
    index: "02",
    shortName: "DDITLAB",
    year: "2025",
    category: "ENGINEERING INTERNSHIP // FRONTEND PERFORMANCE",
    role: "Web Developer Intern",
    company: "Digital Dreams Innovation Trust (DDITLAB)",
    period: "Jun 2025 – Aug 2025",
    location: "Delhi, India",
    metricBadge: "40% Faster Page Load",
    highlights: [
      "Engineered high-performance, modular React.js & TypeScript UI component library across core application portals with rigorous cross-browser testing and accessibility audits.",
      "Optimized client-side rendering pathways and lazy-loaded assets, cutting critical page load latency by 40% and elevating Core Web Vitals score to green.",
      "Integrated complex RESTful API payloads with type-safe state interfaces, improving client-server synchronization stability and eliminating runtime deserialization issues.",
    ],
    skills: ["React.js", "TypeScript", "REST APIs", "Web Performance", "Git", "CSS Modules"],
    imagePlaceholder: {
      slotId: "ddit-preview",
      caption: "DDITLAB Web Portal Interface & Analytics",
      suggestedImage: "/images/experience/ddit-portal.jpg",
    },
  },
  {
    id: "vips-tc",
    index: "03",
    shortName: "VIPS-TC",
    year: "2023–27",
    category: "UNDERGRADUATE DEGREE // COMPUTER SCIENCE",
    role: "B.Tech in Computer Science & Engineering",
    company: "Vivekananda Institute of Professional Studies - TC (VIPS-TC), Delhi",
    period: "2023 – 2027 (Expected)",
    location: "Delhi, India",
    metricBadge: "CGPA: 9.04 / 10 · Reliance Scholar",
    highlights: [
      "Maintained a stellar 9.04 / 10 CGPA across 6 semesters; awarded the prestigious Reliance Foundation Undergraduate Scholarship (conferred to top 5% merit scholars across India).",
      "Elected Vice President of Aarvak Technical Society, organizing 4 flagship college hackathons and technical bootcamps mentoring over 1,200+ student developers.",
      "Led design & engineering initiatives as Head of Design at Srijan SDG Club and served as Technical Core member at Career Development Centre (CDC).",
    ],
    skills: ["Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks", "OOP (C++/Java)"],
    imagePlaceholder: {
      slotId: "vips-campus",
      caption: "VIPS-TC Campus & Aarvak Tech Society Hackathons",
      suggestedImage: "/images/experience/vips-campus.jpg",
    },
  },
  {
    id: "ryan-school",
    index: "04",
    shortName: "Ryan Int'l",
    year: "2023",
    category: "SECONDARY & SENIOR SECONDARY // STEM",
    role: "High School & Senior Secondary Education",
    company: "Ryan International School",
    period: "2009 – 2023",
    location: "Delhi, India",
    metricBadge: "Class XII: 93.6% | Class X: 92.4%",
    highlights: [
      "Graduated CBSE Class XII Board Examination (2023) with 93.6% aggregate in Physics, Chemistry, Mathematics, and Computer Science.",
      "Graduated CBSE Class X Board Examination (2021) with 92.4% distinction across all core academic disciplines.",
      "Represented school in inter-state algorithmic exhibitions, competitive programming contests, and public speaking debate circuits.",
    ],
    skills: ["Mathematics", "Physics", "Computer Science", "Analytical Thinking", "Technical Writing"],
  },
];

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
}

const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-crewai",
    title: "Agentic AI from Scratch with CrewAI & AutoGen",
    issuer: "Rabbitt Learning",
    date: "May 2025",
    skills: ["Agentic AI", "CrewAI", "AutoGen", "Multi-Agent Systems", "Python"],
  },
  {
    id: "cert-postman",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "April 2024",
    skills: ["API Testing", "REST Architecture", "Automated Collections", "JSON Schema"],
  },
  {
    id: "cert-ganga",
    title: "Capacity Building Programme (Ganga Samvad)",
    issuer: "Indian Institute of Public Administration (IIPA)",
    date: "2024",
    skills: ["Public Administration", "Community Outreach", "Sustainable Development"],
  },
  {
    id: "cert-video",
    title: "Video Editing & Visual Storytelling Workshop",
    issuer: "Entrepreneurship Cell, VSE&T",
    date: "February 2025",
    skills: ["Visual Direction", "Premiere Pro", "Motion Design"],
  },
];

/* ------------------------------------------------------------------ */
/*  Styled Components — Classic Apple Master-Detail Layout             */
/* ------------------------------------------------------------------ */

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #08090c;
  background-image: 
    radial-gradient(circle at 15% 20%, rgba(56, 142, 233, 0.08) 0%, transparent 55%),
    radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 100% 100%, 32px 32px;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  padding-bottom: 120px;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 36px 40px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 80px 20px 40px;
  }
`;

/* Editorial Page Intro Header */
const PageHeader = styled.header`
  margin-bottom: 56px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const CatalogTag = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #60a5fa;
  margin-bottom: 12px;
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
    box-shadow: 0 0 8px #388ee9;
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
  max-width: 680px;
`;

/* Master-Detail Split Grid (30% Left Sticky Rail / 70% Right Editorial Canvas) */
const SplitViewGrid = styled.div`
  display: grid;
  grid-template-columns: 310px 1fr;
  gap: 64px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

/* Left Sticky Rail (30%) */
const StickyRail = styled.aside`
  position: sticky;
  top: 96px;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    position: sticky;
    top: 72px;
    z-index: 40;
    background: rgba(8, 9, 12, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 12px 0;
    margin: 0 -20px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

const RailHeader = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #64748b;
  padding-left: 12px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const RailNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: row;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 4px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const RailItem = styled.button<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 14px;
  background: ${({ $isActive }) =>
    $isActive
      ? "linear-gradient(90deg, rgba(56, 142, 233, 0.18) 0%, rgba(56, 142, 233, 0.03) 100%)"
      : "transparent"};
  border: none;
  border-left: 3px solid
    ${({ $isActive }) => ($isActive ? "#388ee9" : "transparent")};
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  text-align: left;
  user-select: none;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  ${({ $isActive }) =>
    $isActive &&
    `
    box-shadow: inset 0 0 16px rgba(56, 142, 233, 0.1);
  `}

  &:hover {
    background: ${({ $isActive }) =>
      $isActive
        ? "linear-gradient(90deg, rgba(56, 142, 233, 0.22) 0%, rgba(56, 142, 233, 0.06) 100%)"
        : "rgba(255, 255, 255, 0.04)"};
  }

  @media (max-width: 1024px) {
    border-left: none;
    border: 1px solid
      ${({ $isActive }) =>
        $isActive ? "rgba(56, 142, 233, 0.4)" : "rgba(255, 255, 255, 0.08)"};
    border-radius: 20px;
    padding: 6px 14px;
    white-space: nowrap;
    background: ${({ $isActive }) =>
      $isActive ? "rgba(56, 142, 233, 0.18)" : "rgba(255, 255, 255, 0.04)"};
  }
`;

const RailLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RailNumber = styled.span<{ $isActive: boolean }>`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  color: ${({ $isActive }) => ($isActive ? "#60a5fa" : "#64748b")};
  letter-spacing: 0.06em;
`;

const RailTitle = styled.span<{ $isActive: boolean }>`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  font-size: 13.5px;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#94a3b8")};
  letter-spacing: -0.01em;
`;

const RailYear = styled.span<{ $isActive: boolean }>`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  color: ${({ $isActive }) => ($isActive ? "#93c5fd" : "#64748b")};
  margin-left: 6px;
`;

const IpodChevron = styled.span<{ $isActive: boolean }>`
  font-size: 14px;
  color: #388ee9;
  font-weight: 700;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transform: ${({ $isActive }) => ($isActive ? "translateX(0)" : "translateX(-4px)")};
  transition: all 0.15s ease;

  @media (max-width: 1024px) {
    display: none;
  }
`;

/* Rail Summary Card */
const RailSummaryCard = styled.div`
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11.5px;

  span.label {
    color: #64748b;
    font-family: ui-monospace, monospace;
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  span.val {
    color: #cbd5e1;
    font-weight: 600;
  }
`;

const ResumeDownloadLink = styled.a`
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(56, 142, 233, 0.1);
  border: 1px solid rgba(56, 142, 233, 0.28);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #93c5fd;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(56, 142, 233, 0.2);
    border-color: rgba(56, 142, 233, 0.6);
    color: #ffffff;
  }
`;

/* Right Editorial Canvas (70%) */
const EditorialCanvas = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/* Individual Editorial Section — ZERO CARD BORDERS */
const EditorialEntry = styled.article`
  position: relative;
  padding: 56px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const WatermarkNumber = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 96px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.03);
  line-height: 1;
  user-select: none;
  pointer-events: none;

  @media (max-width: 640px) {
    font-size: 64px;
    top: 24px;
  }
`;

const EntryCategory = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #388ee9;
  margin-bottom: 8px;
`;

const EntryRole = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0 0 8px;
`;

const MetaLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 18px;
  flex-wrap: wrap;

  span.company {
    color: #e2e8f0;
    font-weight: 600;
  }

  span.bullet {
    color: #475569;
  }
`;

const MetricCallout = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  background: rgba(56, 142, 233, 0.09);
  border: 1px solid rgba(56, 142, 233, 0.25);
  border-radius: 20px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 24px;

  span.bolt {
    color: #388ee9;
  }
`;

const HighlightsList = styled.ul`
  margin: 0 0 24px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HighlightBullet = styled.li`
  font-size: 15px;
  line-height: 1.65;
  color: #cbd5e1;

  strong {
    color: #ffffff;
    font-weight: 700;
  }
`;

const TechRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const TechPill = styled.span`
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #94a3b8;
  letter-spacing: 0.02em;
`;

const MediaSlotWrapper = styled.div`
  margin-top: 24px;
  max-width: 560px;
`;

/* Certifications Section */
const CertificationsSection = styled.article`
  padding: 56px 0 0;
  position: relative;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CertCard = styled.div`
  padding: 18px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(56, 142, 233, 0.3);
    transform: translateY(-2px);
  }
`;

const CertTitle = styled.div`
  font-size: 14.5px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
`;

const CertIssuer = styled.div`
  font-size: 12px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* Helper to render bold inline impact numbers */
function renderFormattedHighlight(text: string) {
  // Regex to match metrics like "40% faster", "10+ administrative", "9.04 / 10 CGPA", "1,200+ student developers", "top 5%", "93.6%", "92.4%"
  const parts = text.split(
    /(\b\d+(?:\.\d+)?%|\b\d+(?:\.\d+)?\s*\/\s*10|\b\d+\+\b|\b\d+,\d+\+\b|\btop 5%\b)/gi
  );

  return parts.map((part, index) => {
    if (
      /(\b\d+(?:\.\d+)?%|\b\d+(?:\.\d+)?\s*\/\s*10|\b\d+\+\b|\b\d+,\d+\+\b|\btop 5%\b)/gi.test(
        part
      )
    ) {
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
}

export default function ExperiencePage() {
  const [activeId, setActiveId] = useState<string>("khwaaish-ai");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll spy to track active section in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    const elements = Object.values(sectionRefs.current);
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleRailClick = (id: string) => {
    playClickTick();
    setActiveId(id);
    const target = sectionRefs.current[id];
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <PageWrapper>
      {/* Unified Tubelight Navbar */}
      <NavBar />

      <MainContent>
        {/* Page Title & Catalog Tag */}
        <PageHeader>
          <CatalogTag>CATALOG VN-EXP-03 · MASTER-DETAIL INDEX</CatalogTag>
          <MainTitle>Experience &amp; Education</MainTitle>
          <Subtitle>
            A chronological timeline of production engineering internships, systems architecture coursework, and leadership milestones.
          </Subtitle>
        </PageHeader>

        {/* Master-Detail Split Grid */}
        <SplitViewGrid>
          {/* Left Sticky Rail (30%) */}
          <StickyRail>
            <RailHeader>Timeline Index</RailHeader>

            <RailNav aria-label="Experience Timeline Index">
              {TIMELINE_ENTRIES.map((entry) => {
                const isActive = activeId === entry.id;
                return (
                  <RailItem
                    key={entry.id}
                    $isActive={isActive}
                    onClick={() => handleRailClick(entry.id)}
                    title={`Jump to ${entry.company}`}
                  >
                    <RailLeft>
                      <RailNumber $isActive={isActive}>{entry.index}</RailNumber>
                      <RailTitle $isActive={isActive}>{entry.shortName}</RailTitle>
                      <RailYear $isActive={isActive}>· {entry.year}</RailYear>
                    </RailLeft>
                    <IpodChevron $isActive={isActive}>›</IpodChevron>
                  </RailItem>
                );
              })}

              {/* Certifications Rail Item */}
              <RailItem
                $isActive={activeId === "certifications"}
                onClick={() => handleRailClick("certifications")}
                title="Jump to Certifications"
              >
                <RailLeft>
                  <RailNumber $isActive={activeId === "certifications"}>05</RailNumber>
                  <RailTitle $isActive={activeId === "certifications"}>Certifications</RailTitle>
                  <RailYear $isActive={activeId === "certifications"}>· 2024–25</RailYear>
                </RailLeft>
                <IpodChevron $isActive={activeId === "certifications"}>›</IpodChevron>
              </RailItem>
            </RailNav>

            {/* Sticky Summary Card */}
            <RailSummaryCard>
              <SummaryRow>
                <span className="label">Production</span>
                <span className="val">2+ Years Active</span>
              </SummaryRow>
              <SummaryRow>
                <span className="label">Cumulative GPA</span>
                <span className="val">9.04 / 10 CSE</span>
              </SummaryRow>
              <SummaryRow>
                <span className="label">National Merit</span>
                <span className="val">Reliance Scholar</span>
              </SummaryRow>
              <ResumeDownloadLink
                href="/Vansh-SDE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playConfirmChime()}
              >
                <span>View Full Resume (PDF)</span>
                <span>↗</span>
              </ResumeDownloadLink>
            </RailSummaryCard>
          </StickyRail>

          {/* Right Editorial Canvas (70%) */}
          <EditorialCanvas>
            {TIMELINE_ENTRIES.map((entry) => (
              <EditorialEntry
                key={entry.id}
                id={entry.id}
                ref={(el) => {
                  sectionRefs.current[entry.id] = el;
                }}
              >
                <WatermarkNumber>{entry.index}</WatermarkNumber>
                <EntryCategory>{entry.category}</EntryCategory>
                <EntryRole>{entry.role}</EntryRole>

                <MetaLine>
                  <span className="company">{entry.company}</span>
                  <span className="bullet">·</span>
                  <span>{entry.period}</span>
                  <span className="bullet">·</span>
                  <span>{entry.location}</span>
                </MetaLine>

                <MetricCallout>
                  <span className="bolt">⚡</span>
                  <span>Impact Highlight: {entry.metricBadge}</span>
                </MetricCallout>

                <HighlightsList>
                  {entry.highlights.map((bullet, idx) => (
                    <HighlightBullet key={idx}>
                      {renderFormattedHighlight(bullet)}
                    </HighlightBullet>
                  ))}
                </HighlightsList>

                {/* Tech Stack Chips */}
                <TechRow>
                  {entry.skills.map((skill) => (
                    <TechPill key={skill}>{skill}</TechPill>
                  ))}
                </TechRow>

                {/* Optional Media Slot */}
                {entry.imagePlaceholder && (
                  <MediaSlotWrapper>
                    <ImagePlaceholder
                      slotId={entry.imagePlaceholder.slotId}
                      caption={entry.imagePlaceholder.caption}
                      suggestedPath={entry.imagePlaceholder.suggestedImage}
                      badge="VERIFIED EXPERIENCE PROOF"
                      aspectRatio="16/9"
                    />
                  </MediaSlotWrapper>
                )}
              </EditorialEntry>
            ))}

            {/* Certifications Section */}
            <CertificationsSection
              id="certifications"
              ref={(el) => {
                sectionRefs.current["certifications"] = el;
              }}
            >
              <WatermarkNumber>05</WatermarkNumber>
              <EntryCategory>PROFESSIONAL LICENSES &amp; ACCREDITATIONS</EntryCategory>
              <EntryRole>Certifications &amp; Applied Training</EntryRole>
              <MetaLine>
                <span className="company">Industry Credentials &amp; Specialized Bootcamps</span>
                <span className="bullet">·</span>
                <span>2024 – 2025</span>
              </MetaLine>

              <CertGrid>
                {CERTIFICATIONS.map((cert) => (
                  <CertCard key={cert.id}>
                    <CertTitle>{cert.title}</CertTitle>
                    <CertIssuer>
                      <span>{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </CertIssuer>
                    <TechRow>
                      {cert.skills.map((s) => (
                        <TechPill key={s}>{s}</TechPill>
                      ))}
                    </TechRow>
                  </CertCard>
                ))}
              </CertGrid>
            </CertificationsSection>
          </EditorialCanvas>
        </SplitViewGrid>
      </MainContent>
    </PageWrapper>
  );
}
