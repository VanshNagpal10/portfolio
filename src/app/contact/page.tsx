"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { CONTACT_LINKS, RESUME_INFO, CHASSIS_ENGRAVINGS } from "@/data/contact";
import { playClickTick, playConfirmChime } from "@/utils/audio";
import { Copy, Check, ArrowUpRight, Download, Mail, Phone } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Hardware Backplate & Telemetry Manifest                           */
/* ------------------------------------------------------------------ */

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #08090c;
  background-image: 
    radial-gradient(circle at 50% 10%, rgba(56, 142, 233, 0.08) 0%, transparent 60%),
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
/*  Page Header — Extreme Typographic Scale Contrast                    */
/* ------------------------------------------------------------------ */

const HeaderArea = styled.header`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 40px;
  margin-bottom: 56px;
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
/*  Section 01: Primary Communication Band (One Focal Action)          */
/* ------------------------------------------------------------------ */

const PrimaryChannelBand = styled.section`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 56px;
  margin-bottom: 56px;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const PrimaryChannelLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelLabel = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a7f8a;
  margin-bottom: 10px;
`;

const EmailDisplay = styled.a`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: clamp(24px, 3.2vw, 36px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.15s ease;
  word-break: break-all;
  margin-bottom: 16px;
  display: inline-block;

  &:hover {
    color: #388ee9;
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

/** The ONE primary signature blue action CTA button */
const PrimaryBlueButton = styled.button<{ $copied?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${(props) => (props.$copied ? "#10b981" : "#388ee9")};
  color: #ffffff;
  border: 1px solid ${(props) => (props.$copied ? "#34d399" : "#60a5fa")};
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${(props) => (props.$copied ? "#059669" : "#2563eb")};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SecondaryGhostButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: transparent;
  color: #9aa1b0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.03);
  }
`;

const PrimaryChannelRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 32px;
  border-left: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 900px) {
    padding-left: 0;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 24px;
  }
`;

const TelemetryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TelemetryLabel = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7a7f8a;
`;

const TelemetryValue = styled.span`
  font-size: 14.5px;
  font-weight: 500;
  color: #e2e4e9;
`;

/* ------------------------------------------------------------------ */
/*  Section 02: Communications & Social Ledger (iTunes Index Style)    */
/* ------------------------------------------------------------------ */

const LedgerBand = styled.section`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 56px;
  margin-bottom: 56px;
`;

const SectionHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
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

const SectionMeta = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
`;

const LedgerTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const LedgerRow = styled.a`
  display: grid;
  grid-template-columns: 80px 220px 1fr 180px 32px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  align-items: center;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);

    span.action-text {
      color: #388ee9;
    }

    svg.action-arrow {
      color: #388ee9;
      transform: translate(2px, -2px);
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 48px 1fr 32px;
    gap: 8px;
    padding: 16px 0;
  }
`;

const RowIndex = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #7a7f8a;
`;

const RowChannel = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

const RowValue = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12.5px;
  color: #9aa1b0;

  @media (max-width: 900px) {
    display: none;
  }
`;

const RowAction = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #7a7f8a;
  text-align: right;
  transition: color 0.15s ease;

  @media (max-width: 900px) {
    display: none;
  }
`;

const RowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #7a7f8a;

  svg {
    transition: transform 0.15s ease, color 0.15s ease;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 03: Laser-Etched Hardware Engravings                       */
/* ------------------------------------------------------------------ */

const EngravingsSection = styled.footer`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #555b6a;
  line-height: 1.8;

  p {
    margin: 2px 0;
  }

  span.serial-highlight {
    color: #7a7f8a;
    font-weight: 600;
  }
`;

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vanshnagpal21@gmail.com");
    playConfirmChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <PageWrapper>
      <NavBar />

      <ContentContainer>
        {/* Header */}
        <HeaderArea>
          <MonospaceKicker>
            <span>05 // HARDWARE BACKPLATE</span>
            <span className="serial">· CHASSIS TELEMETRY</span>
            <span className="serial">· DELHI, IN</span>
          </MonospaceKicker>
          <MainHeading>Initiate Connection.</MainHeading>
          <Subtitle>
            Direct communication channels for engineering opportunities, iOS collaborations, and full-stack software development.
          </Subtitle>
        </HeaderArea>

        {/* Section 01: Primary Communication Band */}
        <PrimaryChannelBand>
          <PrimaryChannelLeft>
            <ChannelLabel>DIRECT PRIMARY COMMUNICATOR</ChannelLabel>
            <EmailDisplay
              href="mailto:vanshnagpal21@gmail.com"
              onClick={() => playClickTick()}
              title="Click to compose email"
            >
              vanshnagpal21@gmail.com
            </EmailDisplay>

            <ActionRow>
              <PrimaryBlueButton
                $copied={copied}
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied to Clipboard" : "Copy Email"}</span>
              </PrimaryBlueButton>

              <SecondaryGhostButton
                href="mailto:vanshnagpal21@gmail.com"
                onClick={() => playClickTick()}
              >
                <Mail size={13} />
                <span>Open Mail Client ↗</span>
              </SecondaryGhostButton>

              <SecondaryGhostButton
                href={RESUME_INFO.downloadUrl}
                download={RESUME_INFO.filename}
                onClick={() => playClickTick()}
              >
                <Download size={13} />
                <span>Resume PDF (128 KB)</span>
              </SecondaryGhostButton>
            </ActionRow>
          </PrimaryChannelLeft>

          <PrimaryChannelRight>
            <TelemetryItem>
              <TelemetryLabel>LOCATION &amp; TIMEZONE</TelemetryLabel>
              <TelemetryValue>Delhi, India (IST / UTC+5:30)</TelemetryValue>
            </TelemetryItem>

            <TelemetryItem>
              <TelemetryLabel>DIRECT PHONE / WHATSAPP</TelemetryLabel>
              <TelemetryValue>
                <a
                  href="tel:+919540599296"
                  style={{ color: "#ffffff", textDecoration: "none" }}
                  onClick={() => playClickTick()}
                >
                  +91 9540599296
                </a>
              </TelemetryValue>
            </TelemetryItem>

            <TelemetryItem>
              <TelemetryLabel>CURRENT STATUS</TelemetryLabel>
              <TelemetryValue style={{ color: "#34d399", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                Open to Full-Time &amp; High-Impact Roles
              </TelemetryValue>
            </TelemetryItem>
          </PrimaryChannelRight>
        </PrimaryChannelBand>

        {/* Section 02: Communications & Social Ledger */}
        <LedgerBand>
          <SectionHeaderRow>
            <SectionIndex>COMMUNICATIONS LEDGER &amp; VERIFIED HANDLES</SectionIndex>
            <SectionMeta>5 ACTIVE ENDPOINTS</SectionMeta>
          </SectionHeaderRow>

          <LedgerTable>
            <LedgerRow
              href="https://github.com/VanshNagpal10"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickTick()}
            >
              <RowIndex>01 //</RowIndex>
              <RowChannel>GitHub</RowChannel>
              <RowValue>github.com/VanshNagpal10</RowValue>
              <RowAction className="action-text">Inspect Repositories</RowAction>
              <RowIcon>
                <ArrowUpRight size={16} className="action-arrow" />
              </RowIcon>
            </LedgerRow>

            <LedgerRow
              href="https://www.linkedin.com/in/vanshnagpal27/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickTick()}
            >
              <RowIndex>02 //</RowIndex>
              <RowChannel>LinkedIn</RowChannel>
              <RowValue>linkedin.com/in/vanshnagpal27</RowValue>
              <RowAction className="action-text">Connect Network</RowAction>
              <RowIcon>
                <ArrowUpRight size={16} className="action-arrow" />
              </RowIcon>
            </LedgerRow>

            <LedgerRow
              href="https://x.com/VanshNagpal_27"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickTick()}
            >
              <RowIndex>03 //</RowIndex>
              <RowChannel>X (Twitter)</RowChannel>
              <RowValue>x.com/VanshNagpal_27</RowValue>
              <RowAction className="action-text">Follow Updates</RowAction>
              <RowIcon>
                <ArrowUpRight size={16} className="action-arrow" />
              </RowIcon>
            </LedgerRow>

            <LedgerRow
              href="https://leetcode.com/u/Vansh_Nagpal"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickTick()}
            >
              <RowIndex>04 //</RowIndex>
              <RowChannel>LeetCode</RowChannel>
              <RowValue>leetcode.com/u/Vansh_Nagpal</RowValue>
              <RowAction className="action-text">View Algorithms</RowAction>
              <RowIcon>
                <ArrowUpRight size={16} className="action-arrow" />
              </RowIcon>
            </LedgerRow>

            <LedgerRow
              href={RESUME_INFO.downloadUrl}
              download={RESUME_INFO.filename}
              onClick={() => playClickTick()}
            >
              <RowIndex>05 //</RowIndex>
              <RowChannel>Curriculum Vitae</RowChannel>
              <RowValue>{RESUME_INFO.filename} · {RESUME_INFO.filesize}</RowValue>
              <RowAction className="action-text">Download Document</RowAction>
              <RowIcon>
                <ArrowUpRight size={16} className="action-arrow" />
              </RowIcon>
            </LedgerRow>
          </LedgerTable>
        </LedgerBand>

        {/* Section 03: Laser-Etched Hardware Engravings */}
        <EngravingsSection>
          <p>{CHASSIS_ENGRAVINGS.line1}</p>
          <p>{CHASSIS_ENGRAVINGS.line2}</p>
          <p>{CHASSIS_ENGRAVINGS.line3}</p>
          <p>
            <span className="serial-highlight">{CHASSIS_ENGRAVINGS.serial}</span>
          </p>
        </EngravingsSection>
      </ContentContainer>
    </PageWrapper>
  );
}
