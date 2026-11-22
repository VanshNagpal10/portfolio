"use client";

import React, { useState } from "react";
import styled from "styled-components";
import OSStatusBar from "@/components/os/OSStatusBar";
import ShuffleDock from "@/components/os/ShuffleDock";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import {
  SPOTLIGHT_HONORS,
  HACKATHON_TRACKS,
  NOTABLE_PARTICIPATIONS,
  HackathonTrack,
} from "@/data/honors";
import { playClickTick, playConfirmChime } from "@/utils/audio";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at 50% 0%, #14161c 0%, #090a0d 100%);
  color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  padding-bottom: 120px;
  position: relative;
`;

const ContentContainer = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 24px;

  @media (max-width: 768px) {
    padding: 24px 16px;
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

const SpotlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const SpotlightCard = styled.div`
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(56, 142, 233, 0.4);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 142, 233, 0.12);
  }
`;

const SpotlightTop = styled.div`
  margin-bottom: 20px;
`;

const BadgeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const HonorBadge = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #388ee9;
  background: rgba(56, 142, 233, 0.12);
  border: 1px solid rgba(56, 142, 233, 0.3);
  padding: 3px 8px;
  border-radius: 12px;
`;

const HonorYear = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  color: #8892a4;
`;

const HonorTitle = styled.h2`
  font-size: 19px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px;
  line-height: 1.35;
`;

const HonorIssuer = styled.div`
  font-size: 13px;
  color: #9aa1b2;
  margin-bottom: 12px;
`;

const HonorDescription = styled.p`
  font-size: 13.5px;
  color: #c4c8d4;
  line-height: 1.55;
  margin: 0 0 16px;
`;

const ProjectBasisTag = styled.div`
  font-size: 12px;
  color: #9aa1b2;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 6px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
`;

const TableSection = styled.section`
  margin-top: 48px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`;

const SectionHeading = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  padding: 3px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: ${(props) =>
    props.$active
      ? "linear-gradient(180deg, #388ee9 0%, #1754be 100%)"
      : "transparent"};
  color: ${(props) => (props.$active ? "#ffffff" : "#9aa1b2")};
  border: none;
  padding: 5px 12px;
  border-radius: 7px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: #ffffff;
  }
`;

const TableWrapper = styled.div`
  background: rgba(20, 22, 28, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
`;

const TableHead = styled.thead`
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  th {
    padding: 12px 16px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #8892a4;
  }
`;

const TableRow = styled.tr<{ $selected: boolean }>`
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  background: ${(props) =>
    props.$selected
      ? "linear-gradient(180deg, #388ee9 0%, #1754be 100%) !important"
      : "transparent"};
  color: ${(props) => (props.$selected ? "#ffffff" : "inherit")};
  transition: background 0.1s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.035);
  }

  td {
    padding: 14px 16px;
    vertical-align: middle;
  }

  @media (max-width: 640px) {
    td:nth-child(3),
    td:nth-child(4) {
      display: none;
    }
  }
`;

const TrackNumberCell = styled.td`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  width: 44px;
  color: #8892a4;
`;

const EventName = styled.span`
  font-weight: 600;
  color: #ffffff;
  display: block;
`;

const AwardPill = styled.span<{ $tier: string; $selected: boolean }>`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${(props) =>
    props.$selected
      ? "rgba(255, 255, 255, 0.25)"
      : props.$tier === "Winner"
      ? "rgba(34, 197, 94, 0.15)"
      : "rgba(56, 142, 233, 0.15)"};
  color: ${(props) =>
    props.$selected
      ? "#ffffff"
      : props.$tier === "Winner"
      ? "#4ade80"
      : "#60a5fa"};
  border: 1px solid
    ${(props) =>
      props.$selected
        ? "rgba(255, 255, 255, 0.3)"
        : props.$tier === "Winner"
        ? "rgba(34, 197, 94, 0.3)"
        : "rgba(56, 142, 233, 0.3)"};
`;

const DetailDrawer = styled.div`
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(56, 142, 233, 0.3);
  border-radius: 12px;
  padding: 20px;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AdditionalSection = styled.section`
  margin-top: 48px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 24px;
`;

const AdditionalTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ParticipationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
`;

const ParticipationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12.5px;
  color: #c4c8d4;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 10px 14px;
  border-radius: 8px;

  &::before {
    content: "•";
    color: #388ee9;
    font-size: 18px;
    line-height: 0;
  }
`;

export default function HonorsPage() {
  const [filterTier, setFilterTier] = useState<"ALL" | "Winner" | "Runner-Up" | "Special">("ALL");
  const [selectedTrack, setSelectedTrack] = useState<HackathonTrack | null>(HACKATHON_TRACKS[0]);

  const filteredTracks =
    filterTier === "ALL"
      ? HACKATHON_TRACKS
      : HACKATHON_TRACKS.filter((t) => t.awardTier === filterTier);

  const handleTrackClick = (track: HackathonTrack) => {
    playClickTick();
    if (selectedTrack?.trackNo === track.trackNo) {
      // Toggle off or keep selected
      setSelectedTrack(track);
    } else {
      setSelectedTrack(track);
    }
  };

  const handleTabChange = (tier: "ALL" | "Winner" | "Runner-Up" | "Special") => {
    playConfirmChime();
    setFilterTier(tier);
  };

  return (
    <PageWrapper>
      <OSStatusBar title="04 · Honors & Achievements" />

      <ContentContainer>
        <HeaderArea>
          <Tagline>CATALOG VN-HON-04 · THE HALL OF RECORDS</Tagline>
          <MainHeading>Honors & Achievements</MainHeading>
          <Subtitle>
            Global recognition from Apple, national merit scholarships, and 9 podium finishes across high-stakes hackathons.
          </Subtitle>
        </HeaderArea>

        {/* Top Spotlight Cards */}
        <SpotlightGrid>
          {SPOTLIGHT_HONORS.map((honor) => (
            <SpotlightCard key={honor.id}>
              <SpotlightTop>
                <BadgeRow>
                  <HonorBadge>{honor.badge}</HonorBadge>
                  <HonorYear>{honor.year}</HonorYear>
                </BadgeRow>
                <HonorTitle>{honor.title}</HonorTitle>
                <HonorIssuer>{honor.issuer}</HonorIssuer>
                <HonorDescription>{honor.description}</HonorDescription>
                <ProjectBasisTag>Project: {honor.projectOrBasis}</ProjectBasisTag>
              </SpotlightTop>

              <ImagePlaceholder
                slotId={honor.imagePlaceholder.slotId}
                caption={honor.imagePlaceholder.caption}
                suggestedPath={honor.imagePlaceholder.suggestedImage}
                aspectRatio="16 / 10"
                badge="Honor Certificate"
              />
            </SpotlightCard>
          ))}
        </SpotlightGrid>

        {/* iTunes Tracklist Table: 9x Hackathons */}
        <TableSection>
          <SectionHeader>
            <div>
              <SectionHeading>9× Hackathon Winning Ledger</SectionHeading>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#8892a4" }}>
                Select any track below to inspect technical details and award verification.
              </p>
            </div>
            <FilterTabs>
              <TabButton
                $active={filterTier === "ALL"}
                onClick={() => handleTabChange("ALL")}
              >
                All (9)
              </TabButton>
              <TabButton
                $active={filterTier === "Winner"}
                onClick={() => handleTabChange("Winner")}
              >
                1st Place
              </TabButton>
              <TabButton
                $active={filterTier === "Runner-Up"}
                onClick={() => handleTabChange("Runner-Up")}
              >
                Runner-Up
              </TabButton>
              <TabButton
                $active={filterTier === "Special"}
                onClick={() => handleTabChange("Special")}
              >
                Special
              </TabButton>
            </FilterTabs>
          </SectionHeader>

          <TableWrapper>
            <Table>
              <TableHead>
                <tr>
                  <th>#</th>
                  <th>Event & Organizer</th>
                  <th>Project</th>
                  <th>Award / Prize</th>
                  <th>Date</th>
                </tr>
              </TableHead>
              <tbody>
                {filteredTracks.map((track) => {
                  const isSelected = selectedTrack?.trackNo === track.trackNo;
                  return (
                    <TableRow
                      key={track.trackNo}
                      $selected={isSelected}
                      onClick={() => handleTrackClick(track)}
                    >
                      <TrackNumberCell>{track.trackNo}</TrackNumberCell>
                      <td>
                        <EventName>{track.eventName}</EventName>
                        <span style={{ fontSize: "11.5px", opacity: 0.75 }}>
                          {track.organizer}
                        </span>
                      </td>
                      <td>
                        <code style={{ fontSize: "12px" }}>{track.project}</code>
                      </td>
                      <td>
                        <AwardPill $tier={track.awardTier} $selected={isSelected}>
                          {track.award}
                        </AwardPill>
                        {track.prizeOrPerk && (
                          <div
                            style={{
                              fontSize: "11px",
                              marginTop: "3px",
                              opacity: 0.8,
                            }}
                          >
                            {track.prizeOrPerk}
                          </div>
                        )}
                      </td>
                      <td style={{ fontFamily: "ui-monospace, monospace", fontSize: "11.5px" }}>
                        {track.date}
                      </td>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </TableWrapper>

          {/* Selected Track Detail Drawer */}
          {selectedTrack && (
            <DetailDrawer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: "17px", color: "#ffffff" }}>
                    Track {selectedTrack.trackNo}: {selectedTrack.eventName} — {selectedTrack.award}
                  </h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "#9aa1b2" }}>
                    Organized by {selectedTrack.organizer} · Built: <strong>{selectedTrack.project}</strong>
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <AwardPill $tier={selectedTrack.awardTier} $selected={false}>
                    {selectedTrack.prizeOrPerk || selectedTrack.award}
                  </AwardPill>
                </div>
              </div>

              {selectedTrack.description && (
                <p style={{ fontSize: "13.5px", color: "#c4c8d4", lineHeight: "1.5", margin: "0 0 16px" }}>
                  {selectedTrack.description}
                </p>
              )}

              {selectedTrack.imagePlaceholder && (
                <ImagePlaceholder
                  slotId={selectedTrack.imagePlaceholder.slotId}
                  caption={selectedTrack.imagePlaceholder.caption}
                  suggestedPath={selectedTrack.imagePlaceholder.suggestedImage}
                  aspectRatio="21 / 9"
                  badge="Award Verification Photo"
                />
              )}
            </DetailDrawer>
          )}
        </TableSection>

        {/* 14+ Participations & Finalist Drawer */}
        <AdditionalSection>
          <AdditionalTitle>
            <span>Additional National Finalist & 14+ Hackathon Involvements</span>
          </AdditionalTitle>
          <ParticipationsGrid>
            {NOTABLE_PARTICIPATIONS.map((event, idx) => (
              <ParticipationItem key={idx}>{event}</ParticipationItem>
            ))}
          </ParticipationsGrid>
        </AdditionalSection>
      </ContentContainer>

      <ShuffleDock currentPath="/honors" />
    </PageWrapper>
  );
}
