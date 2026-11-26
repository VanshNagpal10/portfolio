"use client";

import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { NavBar } from "@/components/ui/tubelight-navbar";
import ProjectTheaterStage from "@/components/projects/ProjectTheaterStage";
import { PROJECTS, ProjectCategory, ProjectItem } from "@/data/projects";
import { playClickTick, playConfirmChime } from "@/utils/audio";
import { ExternalLink, GitBranch, ArrowUpRight, Folder } from "lucide-react";

const FrostedFolderLookbook = dynamic(
  () => import("@/components/ui/frosted-folder-lookbook"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 540,
          display: "grid",
          placeItems: "center",
          background: "#08090c",
          color: "#7a7f8a",
          fontFamily: "ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        MOUNTING FROSTED FOLIO ARCHIVE...
      </div>
    ),
  }
);

const CATEGORIES: ProjectCategory[] = [
  "All",
  "iOS & 3D",
  "Full-Stack",
  "AI & Agents",
  "Web3",
];

/* ------------------------------------------------------------------ */
/*  Editorial Hardware Manual Page Styles                             */
/* ------------------------------------------------------------------ */

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #08090c;
  background-image:
    radial-gradient(circle at 82% 12%, rgba(56, 142, 233, 0.08) 0%, transparent 55%),
    radial-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 100% 100%, 32px 32px;
  color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  padding-bottom: 120px;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 108px 36px 64px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 84px 20px 48px;
  }
`;

const PageHeader = styled.header`
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const CatalogTag = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #7a7f8a;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
  }
`;

const MainTitle = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(40px, 5.8vw, 68px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 16px;
  color: #ffffff;
`;

const HeaderFooterRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #94a3b8;
  max-width: 660px;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const FilterTab = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  background: ${({ $active }) =>
    $active ? "rgba(56, 142, 233, 0.14)" : "transparent"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(56, 142, 233, 0.55)" : "rgba(255, 255, 255, 0.1)"};
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? "#ffffff" : "#7a7f8a")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #388ee9;
    color: #ffffff;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 1: Frosted Folder Hero Stage                              */
/* ------------------------------------------------------------------ */

const FolioSection = styled.section`
  padding: 28px 0 36px;
`;

const FolioControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const FolioLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a7f8a;

  span.active-name {
    color: #ffffff;
  }

  span.blue {
    color: #388ee9;
  }
`;

const FolioSelectorRail = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const FolioChip = styled.button<{ $active: boolean }>`
  padding: 5px 11px;
  background: ${({ $active }) => ($active ? "#388ee9" : "transparent")};
  border: 1px solid
    ${({ $active }) =>
      $active ? "#388ee9" : "rgba(255, 255, 255, 0.1)"};
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? "#ffffff" : "#94a3b8")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #388ee9;
    color: #ffffff;
  }
`;

const FolioStageFrame = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const FolioMetaFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 16px;
  flex-wrap: wrap;
`;

const FolioHintText = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #7a7f8a;
  letter-spacing: 0.05em;
`;

const FolioLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #388ee9;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 3: Complete Shipped Index Ledger                          */
/* ------------------------------------------------------------------ */

const LedgerSection = styled.section`
  padding-top: 64px;
`;

const LedgerHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const LedgerKicker = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a7f8a;
  margin-bottom: 6px;
`;

const LedgerTitle = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
  color: #ffffff;
`;

const IndexTable = styled.div`
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;

const IndexHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 48px 1.8fr 1.6fr 1.4fr 76px 140px;
  align-items: center;
  padding: 12px 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #64748b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 960px) {
    grid-template-columns: 44px 1.8fr 1.2fr 120px;
    .col-stack,
    .col-year {
      display: none;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 36px 1fr 110px;
    .col-rec {
      display: none;
    }
  }
`;

const IndexRow = styled.div<{ $active: boolean }>`
  display: grid;
  grid-template-columns: 48px 1.8fr 1.6fr 1.4fr 76px 140px;
  align-items: center;
  padding: 18px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(90deg, rgba(56, 142, 233, 0.12) 0%, rgba(56, 142, 233, 0.02) 100%)"
      : "transparent"};
  transition: background 0.15s ease;

  &:hover {
    background: rgba(56, 142, 233, 0.08);
  }

  @media (max-width: 960px) {
    grid-template-columns: 44px 1.8fr 1.2fr 120px;
    .col-stack,
    .col-year {
      display: none;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 36px 1fr 110px;
    .col-rec {
      display: none;
    }
  }
`;

const IndexNum = styled.span<{ $active: boolean }>`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#388ee9" : "#64748b")};
`;

const IndexName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 14px;

  span.title {
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  span.sub {
    font-size: 12px;
    color: #7a7f8a;
  }
`;

const IndexStack = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #94a3b8;
  padding-right: 12px;
`;

const IndexRecognition = styled.div`
  font-size: 12.5px;
  color: #cbd5e1;
  padding-right: 12px;
`;

const IndexYear = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  color: #7a7f8a;
`;

const IndexLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #388ee9;
    }
  }
`;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);
  const [folderOpen, setFolderOpen] = useState(false);

  const folioRef = useRef<HTMLElement | null>(null);
  const theaterRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const activeProject: ProjectItem = useMemo(() => {
    return (
      filteredProjects.find((p) => p.id === activeProjectId) ||
      filteredProjects[0] ||
      PROJECTS[0]
    );
  }, [filteredProjects, activeProjectId]);

  const folderSheets = useMemo(
    () =>
      activeProject.slides.slice(0, 4).map((sl, idx) => ({
        image: sl.sheetImage,
        alt: `${activeProject.title} — ${sl.title}`,
        code: `0${idx + 1}`,
        title: sl.title,
        detail: sl.detail,
      })),
    [activeProject]
  );

  const handleSelectProject = (project: ProjectItem, scrollTarget?: "folder" | "theater") => {
    setActiveProjectId(project.id);
    if (scrollTarget === "folder" && folioRef.current) {
      folioRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (scrollTarget === "theater" && theaterRef.current) {
      theaterRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageWrapper>
      <NavBar />

      <MainContent>
        {/* Editorial Hardware Manual Page Header */}
        <PageHeader>
          <CatalogTag>CATALOG VN-PRJ-02 // FROSTED FOLIO &amp; SHIPPED DISCS</CatalogTag>
          <MainTitle>Shipped Builds</MainTitle>
          <HeaderFooterRow>
            <Subtitle>
              Production engineering, Apple Swift Student Challenge winning 3D gameplay, and national hackathon builds — documented inside an interactive studio folio and widescreen reel.
            </Subtitle>

            <FilterBar aria-label="Filter projects by domain">
              {CATEGORIES.map((cat) => (
                <FilterTab
                  key={cat}
                  type="button"
                  $active={selectedCategory === cat}
                  onClick={() => {
                    playClickTick();
                    setSelectedCategory(cat);
                  }}
                >
                  {cat === "All" ? `All (${PROJECTS.length})` : cat}
                </FilterTab>
              ))}
            </FilterBar>
          </HeaderFooterRow>
        </PageHeader>

        {/* Section 1: Interactive Frosted Folder Lookbook Stage */}
        <FolioSection ref={folioRef}>
          <FolioControlBar>
            <FolioLabel>
              <Folder size={13} color="#388ee9" />
              <span>MOUNTED FOLIO:</span>
              <span className="active-name">
                {activeProject.index} // {activeProject.title.toUpperCase()}
              </span>
              <span className="blue">({activeProject.year})</span>
            </FolioLabel>

            <FolioSelectorRail aria-label="Select project mounted in frosted folder">
              {filteredProjects.map((proj) => (
                <FolioChip
                  key={proj.id}
                  type="button"
                  $active={proj.id === activeProject.id}
                  onClick={() => {
                    playClickTick();
                    setActiveProjectId(proj.id);
                  }}
                >
                  {proj.index} {proj.title}
                </FolioChip>
              ))}
            </FolioSelectorRail>
          </FolioControlBar>

          <FolioStageFrame>
            <FrostedFolderLookbook
              key={activeProject.id}
              title={`File ${activeProject.index}`}
              subtitle={activeProject.title}
              line={`${activeProject.category} · ${activeProject.year}`}
              footer={activeProject.status}
              wordmark={activeProject.wordmark}
              sheets={folderSheets}
              openLabel={`Open ${activeProject.title} sheets`}
              closeLabel={`Close ${activeProject.title} folio`}
              tint="#388ee9"
              paper="#f2f5f8"
              background="#08090c"
              defaultOpen={folderOpen}
              onOpenChange={(nextOpen) => {
                playClickTick();
                setFolderOpen(nextOpen);
              }}
              height="clamp(480px, 64vh, 600px)"
            />
          </FolioStageFrame>

          <FolioMetaFooter>
            <FolioHintText>
              CLICK THE TRANSLUCENT COVER OR BINDER CLIP TO FAN OUT 4 ARCHITECTURAL SHEETS
            </FolioHintText>
            <FolioLinks>
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playConfirmChime()}
              >
                <GitBranch size={12} />
                <span>GitHub Repo</span>
                <ArrowUpRight size={12} />
              </a>
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target={activeProject.liveUrl.startsWith("/") ? undefined : "_blank"}
                  rel={
                    activeProject.liveUrl.startsWith("/")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  onClick={() => playConfirmChime()}
                >
                  <ExternalLink size={12} />
                  <span>{activeProject.demoLabel || "Live URL"}</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </FolioLinks>
          </FolioMetaFooter>
        </FolioSection>

        {/* Section 2: YouTube-Style Widescreen Theater Deck + Chapter Queue */}
        <div ref={theaterRef}>
          <ProjectTheaterStage
            projects={filteredProjects}
            activeProject={activeProject}
            onSelectProject={(proj) => handleSelectProject(proj)}
            onScrollToFolder={() => {
              if (folioRef.current) {
                folioRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          />
        </div>

        {/* Section 3: Complete Shipped Index Ledger */}
        <LedgerSection>
          <LedgerHeader>
            <div>
              <LedgerKicker>SPECIFICATION DIRECTORY // 0{filteredProjects.length} BUILDS</LedgerKicker>
              <LedgerTitle>Complete Shipped Index</LedgerTitle>
            </div>
          </LedgerHeader>

          <IndexTable>
            <IndexHeaderRow>
              <div>#</div>
              <div>BUILD</div>
              <div className="col-stack">STACK</div>
              <div className="col-rec">RECOGNITION</div>
              <div className="col-year">YEAR</div>
              <div style={{ textAlign: "right" }}>LINKS</div>
            </IndexHeaderRow>

            {filteredProjects.map((proj) => {
              const isSelected = proj.id === activeProject.id;
              return (
                <IndexRow
                  key={proj.id}
                  $active={isSelected}
                  onClick={() => {
                    playClickTick();
                    handleSelectProject(proj, "theater");
                  }}
                >
                  <IndexNum $active={isSelected}>{proj.index}</IndexNum>
                  <IndexName>
                    <span className="title">{proj.title}</span>
                    <span className="sub">{proj.subtitle}</span>
                  </IndexName>
                  <IndexStack className="col-stack">
                    {proj.stack.slice(0, 3).join(" · ")}
                  </IndexStack>
                  <IndexRecognition className="col-rec">
                    {proj.recognition}
                  </IndexRecognition>
                  <IndexYear className="col-year">{proj.year}</IndexYear>
                  <IndexLinks onClick={(e) => e.stopPropagation()}>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playConfirmChime()}
                    >
                      <span>Code</span>
                      <ArrowUpRight size={11} />
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
                        onClick={() => playConfirmChime()}
                      >
                        <span>Live</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </IndexLinks>
                </IndexRow>
              );
            })}
          </IndexTable>
        </LedgerSection>
      </MainContent>
    </PageWrapper>
  );
}
