export type ProjectCategory = "All" | "iOS & 3D" | "Full-Stack" | "AI & Agents" | "Web3";

export interface ProjectSlide {
  id: string;
  code: string;
  title: string;
  detail: string;
  duration: string;
  summary: string;
  telemetryLabel: string;
  telemetryValue: string;
  diagramType:
    | "architecture"
    | "interface"
    | "metrics"
    | "runtime";
  /** Portrait 3:4 print URI for FrostedFolderLookbook */
  sheetImage: string;
  /** Optional local video/image path inside /public when added */
  mediaPath?: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  wordmark: string;
  subtitle: string;
  tagline: string;
  category: Exclude<ProjectCategory, "All">;
  year: string;
  status: string;
  recognition: string;
  accentHex: string;
  description: string;
  highlights: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  demoLabel?: string;
  slides: ProjectSlide[];
}

/* ------------------------------------------------------------------ */
/*  Bespoke Portrait 3:4 Blueprint Art Generator for Frosted Folder    */
/* ------------------------------------------------------------------ */

function makeBlueprintSheet(opts: {
  index: string;
  projectTitle: string;
  slideCode: string;
  headline: string;
  subline: string;
  accent: string;
  motif: "mesh" | "wave" | "grid" | "nodes";
  statA: string;
  statB: string;
}): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  let motifSvg = "";
  if (opts.motif === "mesh") {
    motifSvg = `
      <g stroke="${opts.accent}" stroke-opacity="0.55" fill="none" stroke-width="1.2">
        <polygon points="250,150 370,220 370,350 250,420 130,350 130,220" />
        <polygon points="250,185 340,238 340,332 250,385 160,332 160,238" stroke-opacity="0.35" />
        <line x1="250" y1="150" x2="250" y2="420" stroke-dasharray="4 4" />
        <line x1="130" y1="220" x2="370" y2="350" stroke-opacity="0.35" />
        <line x1="370" y1="220" x2="130" y2="350" stroke-opacity="0.35" />
        <circle cx="250" cy="285" r="24" fill="${opts.accent}" fill-opacity="0.14" />
        <circle cx="250" cy="285" r="5" fill="#ffffff" />
        <circle cx="130" cy="220" r="4" fill="${opts.accent}" />
        <circle cx="370" cy="220" r="4" fill="${opts.accent}" />
        <circle cx="250" cy="420" r="4" fill="${opts.accent}" />
      </g>
    `;
  } else if (opts.motif === "wave") {
    motifSvg = `
      <g fill="none">
        <path d="M56 285 Q 105 215, 155 285 T 255 285 T 355 285 T 445 285" stroke="${opts.accent}" stroke-width="2.2" />
        <path d="M56 285 Q 105 245, 155 285 T 255 285 T 355 285 T 445 285" stroke="#ffffff" stroke-opacity="0.45" stroke-width="1.2" />
        <path d="M56 305 Q 105 360, 155 305 T 255 305 T 355 305 T 445 305" stroke="${opts.accent}" stroke-opacity="0.35" stroke-width="1" stroke-dasharray="3 5" />
        <line x1="56" y1="285" x2="445" y2="285" stroke="rgba(255,255,255,0.16)" stroke-width="1" />
        <circle cx="155" cy="285" r="6" fill="${opts.accent}" />
        <circle cx="255" cy="285" r="6" fill="#ffffff" />
        <circle cx="355" cy="285" r="6" fill="${opts.accent}" />
      </g>
    `;
  } else if (opts.motif === "grid") {
    motifSvg = `
      <g>
        <rect x="85" y="175" width="330" height="210" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" />
        <line x1="85" y1="215" x2="415" y2="215" stroke="rgba(255,255,255,0.14)" />
        <rect x="108" y="238" width="120" height="58" fill="${opts.accent}" fill-opacity="0.16" stroke="${opts.accent}" stroke-opacity="0.5" />
        <rect x="246" y="238" width="146" height="58" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
        <rect x="108" y="310" width="284" height="54" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.12)" />
        <circle cx="105" cy="195" r="4" fill="${opts.accent}" />
        <circle cx="120" cy="195" r="4" fill="rgba(255,255,255,0.3)" />
        <circle cx="135" cy="195" r="4" fill="rgba(255,255,255,0.3)" />
      </g>
    `;
  } else {
    motifSvg = `
      <g stroke-width="1.4">
        <line x1="130" y1="210" x2="250" y2="285" stroke="${opts.accent}" stroke-opacity="0.65" />
        <line x1="370" y1="210" x2="250" y2="285" stroke="${opts.accent}" stroke-opacity="0.65" />
        <line x1="250" y1="285" x2="155" y2="380" stroke="rgba(255,255,255,0.35)" />
        <line x1="250" y1="285" x2="345" y2="380" stroke="rgba(255,255,255,0.35)" />
        <rect x="92" y="185" width="76" height="44" rx="4" fill="#10141c" stroke="${opts.accent}" />
        <rect x="332" y="185" width="76" height="44" rx="4" fill="#10141c" stroke="rgba(255,255,255,0.35)" />
        <rect x="206" y="262" width="88" height="46" rx="4" fill="${opts.accent}" fill-opacity="0.2" stroke="${opts.accent}" />
        <rect x="115" y="362" width="80" height="40" rx="4" fill="#10141c" stroke="rgba(255,255,255,0.28)" />
        <rect x="305" y="362" width="80" height="40" rx="4" fill="#10141c" stroke="rgba(255,255,255,0.28)" />
      </g>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 680" width="500" height="680">
    <defs>
      <radialGradient id="g" cx="50%" cy="42%" r="58%">
        <stop offset="0%" stop-color="${opts.accent}" stop-opacity="0.22" />
        <stop offset="100%" stop-color="#090b0f" stop-opacity="0" />
      </radialGradient>
      <pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.9" fill="rgba(255,255,255,0.12)" />
      </pattern>
    </defs>
    <rect width="500" height="680" fill="#090b10" />
    <rect width="500" height="680" fill="url(#d)" />
    <rect width="500" height="680" fill="url(#g)" />
    <rect x="24" y="24" width="452" height="632" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
    <line x1="24" y1="88" x2="476" y2="88" stroke="rgba(255,255,255,0.1)" />
    <line x1="24" y1="538" x2="476" y2="538" stroke="rgba(255,255,255,0.1)" />
    <text x="44" y="62" fill="#7a8494" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" letter-spacing="2">${esc(opts.index)} // ${esc(opts.projectTitle.toUpperCase())}</text>
    <text x="456" y="62" text-anchor="end" fill="${opts.accent}" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" letter-spacing="2">${esc(opts.slideCode.toUpperCase())}</text>
    ${motifSvg}
    <text x="44" y="486" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="28" font-weight="700" letter-spacing="-0.8">${esc(opts.headline)}</text>
    <text x="44" y="516" fill="#94a3b8" font-family="ui-monospace, Menlo, monospace" font-size="13" letter-spacing="0.4">${esc(opts.subline)}</text>
    <text x="44" y="580" fill="#64748b" font-family="ui-monospace, Menlo, monospace" font-size="11" letter-spacing="1.5">SPEC 01</text>
    <text x="44" y="608" fill="#e2e8f0" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700">${esc(opts.statA)}</text>
    <text x="270" y="580" fill="#64748b" font-family="ui-monospace, Menlo, monospace" font-size="11" letter-spacing="1.5">SPEC 02</text>
    <text x="270" y="608" fill="${opts.accent}" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700">${esc(opts.statB)}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* ------------------------------------------------------------------ */
/*  Shipped Projects Dataset                                          */
/* ------------------------------------------------------------------ */

export const PROJECTS: ProjectItem[] = [
  {
    id: "ping",
    index: "01",
    title: "Ping",
    wordmark: "Ping",
    subtitle: "3D Educational Networking iOS Game",
    tagline: "Apple Swift Student Challenge 2026 Global Winner",
    category: "iOS & 3D",
    year: "2026",
    status: "Apple SSC Winner",
    recognition: "Apple Swift Student Challenge 2026 Winner",
    accentHex: "#388ee9",
    description:
      "An interactive iPadOS & iOS playground teaching computer networking, packet routing, latency, and OSI architecture through tactile 3D gameplay. Engineered purely with native Apple frameworks and zero external libraries.",
    highlights: [
      "Wrote a custom 3D physics & packet trajectory engine inside SceneKit without third-party dependencies, keeping runtime footprint under 18 MB.",
      "Simulated dynamic TCP/UDP handshakes, congestion bottlenecks, and router hop diagnostics through interactive tactile levels.",
      "Built synthesized procedural sound cues via AVFoundation paired with 60 FPS SwiftUI HUD telemetry overlays.",
    ],
    stack: ["Swift", "SwiftUI", "SceneKit", "AVFoundation", "iPadOS"],
    metrics: [
      { label: "RECOGNITION", value: "Apple Global Winner" },
      { label: "DEPENDENCIES", value: "0 Third-Party" },
      { label: "FRAME RATE", value: "60 FPS Native" },
    ],
    githubUrl: "https://github.com/VanshNagpal10/Ping",
    slides: [
      {
        id: "ping-1",
        code: "Slide 01",
        title: "Packet Mesh",
        detail: "SceneKit 3D",
        duration: "00:38",
        summary: "Interactive 3D routing board where physical impulses visualize packet travel across OSI layers.",
        telemetryLabel: "ENGINE",
        telemetryValue: "SceneKit 3D",
        diagramType: "architecture",
        sheetImage: makeBlueprintSheet({
          index: "01",
          projectTitle: "Ping",
          slideCode: "Sheet 01",
          headline: "3D Packet Mesh",
          subline: "CUSTOM SCENEKIT PHYSICS ENGINE",
          accent: "#388ee9",
          motif: "mesh",
          statA: "60 FPS NATIVE",
          statB: "0 DEPENDENCIES",
        }),
      },
      {
        id: "ping-2",
        code: "Slide 02",
        title: "Tactile HUD",
        detail: "SwiftUI Stage",
        duration: "00:52",
        summary: "Minimalist telemetry HUD displaying RTT, jitter, and packet loss in real time during levels.",
        telemetryLabel: "INTERFACE",
        telemetryValue: "SwiftUI HUD",
        diagramType: "interface",
        sheetImage: makeBlueprintSheet({
          index: "01",
          projectTitle: "Ping",
          slideCode: "Sheet 02",
          headline: "Tactile iPad HUD",
          subline: "REAL-TIME RTT & HOP DIAGNOSTICS",
          accent: "#388ee9",
          motif: "grid",
          statA: "SWIFTUI + UIKIT",
          statB: "APPLE SSC '26",
        }),
      },
      {
        id: "ping-3",
        code: "Slide 03",
        title: "Handshake Sim",
        detail: "TCP / UDP",
        duration: "00:44",
        summary: "Interactive congestion & handshake challenges demonstrating reliable vs. low-latency transmission.",
        telemetryLabel: "SIMULATION",
        telemetryValue: "TCP / UDP",
        diagramType: "runtime",
        sheetImage: makeBlueprintSheet({
          index: "01",
          projectTitle: "Ping",
          slideCode: "Sheet 03",
          headline: "Handshake Sim",
          subline: "PACKET LOSS & CONGESTION MODES",
          accent: "#388ee9",
          motif: "nodes",
          statA: "7 OSI LAYERS",
          statB: "AVFOUNDATION SFX",
        }),
      },
      {
        id: "ping-4",
        code: "Slide 04",
        title: "SSC '26 Honor",
        detail: "Apple Global",
        duration: "00:30",
        summary: "Lightweight native bundle built to run offline under Apple's 3-minute playground evaluation limit.",
        telemetryLabel: "FOOTPRINT",
        telemetryValue: "< 18 MB Bundle",
        diagramType: "metrics",
        sheetImage: makeBlueprintSheet({
          index: "01",
          projectTitle: "Ping",
          slideCode: "Sheet 04",
          headline: "Global Honor",
          subline: "CUPERTINO SSC '26 RECOGNITION",
          accent: "#388ee9",
          motif: "wave",
          statA: "< 18 MB BUNDLE",
          statB: "GLOBAL WINNER",
        }),
      },
    ],
  },
  {
    id: "kwik",
    index: "02",
    title: "KWIK",
    wordmark: "KWIK",
    subtitle: "AI 112 Emergency Triage System",
    tagline: "30% Faster Response · Bay2BayHacks 1st Runner-Up",
    category: "AI & Agents",
    year: "2025",
    status: "Live Production",
    recognition: "Bay2BayHacks Global 2nd & HackNomics 3rd",
    accentHex: "#388ee9",
    description:
      "An AI emergency dispatcher assistant built for India's 112 emergency helpline. Performs real-time multilingual caller triage, extracts distress telemetry and emotion, and surfaces live prioritization on a dispatcher console.",
    highlights: [
      "Engineered streaming voice/text triage pipelines capable of multilingual parsing across regional Indian callers.",
      "Designed live caller emotion and severity scoring to reduce dispatcher cognitive load by 40%.",
      "Cut simulated emergency unit dispatch latency by 30% across validated iterative user tests.",
    ],
    stack: ["Next.js", "Node.js", "Python", "REST APIs", "WebSockets"],
    metrics: [
      { label: "RESPONSE TIME", value: "-30% Faster" },
      { label: "WORKLOAD DROP", value: "-40% Triage" },
      { label: "HONORS", value: "2× Podiums" },
    ],
    githubUrl: "https://github.com/VanshNagpal10",
    liveUrl: "https://112-emergency.vercel.app",
    demoLabel: "112-emergency.vercel.app",
    slides: [
      {
        id: "kwik-1",
        code: "Slide 01",
        title: "112 Voice Triage",
        detail: "Multilingual Audio",
        duration: "00:45",
        summary: "Real-time speech-to-intent stream extracting incident type, geo coordinates, and urgency cues.",
        telemetryLabel: "INGESTION",
        telemetryValue: "Multilingual AI",
        diagramType: "runtime",
        sheetImage: makeBlueprintSheet({
          index: "02",
          projectTitle: "KWIK",
          slideCode: "Sheet 01",
          headline: "112 Audio Stream",
          subline: "MULTILINGUAL DISTRESS PARSER",
          accent: "#388ee9",
          motif: "wave",
          statA: "INDIA 112 HELPLINE",
          statB: "-30% LATENCY",
        }),
      },
      {
        id: "kwik-2",
        code: "Slide 02",
        title: "Dispatcher Console",
        detail: "Live Severity Queue",
        duration: "00:58",
        summary: "Zero-clutter command screen ranking active calls by acoustic stress level and medical priority.",
        telemetryLabel: "CONSOLE",
        telemetryValue: "Live Queue",
        diagramType: "interface",
        sheetImage: makeBlueprintSheet({
          index: "02",
          projectTitle: "KWIK",
          slideCode: "Sheet 02",
          headline: "Dispatch Console",
          subline: "PRIORITY QUEUE & UNIT ROUTING",
          accent: "#388ee9",
          motif: "grid",
          statA: "-40% WORKLOAD",
          statB: "LIVE TELEMETRY",
        }),
      },
      {
        id: "kwik-3",
        code: "Slide 03",
        title: "Emotion Telemetry",
        detail: "Acoustic Sentiment",
        duration: "00:36",
        summary: "Detects caller panic spikes and extracts structured symptom vectors for ambulance pre-briefing.",
        telemetryLabel: "SCORING",
        telemetryValue: "Distress Index",
        diagramType: "architecture",
        sheetImage: makeBlueprintSheet({
          index: "02",
          projectTitle: "KWIK",
          slideCode: "Sheet 03",
          headline: "Emotion Scoring",
          subline: "ACOUSTIC PANIC & SYMPTOM MAP",
          accent: "#388ee9",
          motif: "nodes",
          statA: "PYTHON + NEXT.JS",
          statB: "BAY2BAY 2ND",
        }),
      },
      {
        id: "kwik-4",
        code: "Slide 04",
        title: "Field Validation",
        detail: "2× Podium Record",
        duration: "00:32",
        summary: "Awarded Global 2nd at Bay2BayHacks 2025 and 3rd at HackNomics National.",
        telemetryLabel: "DEPLOYMENT",
        telemetryValue: "Vercel Live",
        diagramType: "metrics",
        sheetImage: makeBlueprintSheet({
          index: "02",
          projectTitle: "KWIK",
          slideCode: "Sheet 04",
          headline: "Podium Dispatch",
          subline: "BAY2BAYHACKS & HACKNOMICS",
          accent: "#388ee9",
          motif: "mesh",
          statA: "2X HACKATHON WIN",
          statB: "VERCEL LIVE",
        }),
      },
    ],
  },
  {
    id: "rimo",
    index: "03",
    title: "RIMO",
    wordmark: "RIMO",
    subtitle: "Full-Stack Rental Management Platform",
    tagline: "Next.js 14 · TypeScript · MongoDB · JWT",
    category: "Full-Stack",
    year: "2025",
    status: "Live Production",
    recognition: "Shipped Production SaaS Architecture",
    accentHex: "#388ee9",
    description:
      "End-to-end equipment and property rental management platform engineered with hybrid SSR/CSR rendering, stateless JWT authentication, server-side schema validation, and real-time MongoDB inventory tracking.",
    highlights: [
      "Architected hybrid Next.js 14 App Router SSR + CSR data pipelines for rapid TTFB and smooth dashboard mutations.",
      "Implemented strict server-side payload validation, JWT session rotation, and role-based tenant/owner isolation.",
      "Engineered real-time inventory availability locking inside MongoDB to prevent double-booking race conditions.",
    ],
    stack: ["Next.js 14", "TypeScript", "MongoDB", "JWT Auth", "Tailwind CSS"],
    metrics: [
      { label: "RENDERING", value: "SSR + CSR Hybrid" },
      { label: "AUTH", value: "JWT + Validation" },
      { label: "DATABASE", value: "MongoDB Live" },
    ],
    githubUrl: "https://github.com/VanshNagpal10",
    liveUrl: "https://rentrimo.vercel.app",
    demoLabel: "rentrimo.vercel.app",
    slides: [
      {
        id: "rimo-1",
        code: "Slide 01",
        title: "Inventory Matrix",
        detail: "MongoDB Real-Time",
        duration: "00:42",
        summary: "Atomic booking state management ensuring real-time availability across concurrent users.",
        telemetryLabel: "PERSISTENCE",
        telemetryValue: "MongoDB Atomic",
        diagramType: "architecture",
        sheetImage: makeBlueprintSheet({
          index: "03",
          projectTitle: "RIMO",
          slideCode: "Sheet 01",
          headline: "Inventory Matrix",
          subline: "ATOMIC MONGODB AVAILABILITY",
          accent: "#388ee9",
          motif: "grid",
          statA: "NEXT.JS 14",
          statB: "ZERO COLLISIONS",
        }),
      },
      {
        id: "rimo-2",
        code: "Slide 02",
        title: "JWT Guard Layer",
        detail: "Server Validation",
        duration: "00:35",
        summary: "Stateless token verification and server-side input sanitization protecting booking endpoints.",
        telemetryLabel: "SECURITY",
        telemetryValue: "JWT Stateless",
        diagramType: "runtime",
        sheetImage: makeBlueprintSheet({
          index: "03",
          projectTitle: "RIMO",
          slideCode: "Sheet 02",
          headline: "JWT Auth Layer",
          subline: "SERVER-SIDE SCHEMA VALIDATION",
          accent: "#388ee9",
          motif: "nodes",
          statA: "STRICT TYPES",
          statB: "ROLE ISOLATED",
        }),
      },
      {
        id: "rimo-3",
        code: "Slide 03",
        title: "Catalog Explorer",
        detail: "Hybrid SSR Pages",
        duration: "00:49",
        summary: "Fast server-rendered rental listings with instant client-side availability and pricing filters.",
        telemetryLabel: "FRONTEND",
        telemetryValue: "Hybrid SSR",
        diagramType: "interface",
        sheetImage: makeBlueprintSheet({
          index: "03",
          projectTitle: "RIMO",
          slideCode: "Sheet 03",
          headline: "Catalog Explorer",
          subline: "HYBRID SSR & CLIENT FILTERING",
          accent: "#388ee9",
          motif: "mesh",
          statA: "TYPESCRIPT",
          statB: "CROSS-BROWSER",
        }),
      },
      {
        id: "rimo-4",
        code: "Slide 04",
        title: "Owner Telemetry",
        detail: "Live Production",
        duration: "00:31",
        summary: "Fleet utilization metrics, active lease timers, and instant status toggling deployed on Vercel.",
        telemetryLabel: "LIVE URL",
        telemetryValue: "rentrimo.vercel.app",
        diagramType: "metrics",
        sheetImage: makeBlueprintSheet({
          index: "03",
          projectTitle: "RIMO",
          slideCode: "Sheet 04",
          headline: "Lease Telemetry",
          subline: "LIVE DEPLOYMENT ON VERCEL",
          accent: "#388ee9",
          motif: "wave",
          statA: "PRODUCTION",
          statB: "RENTRIMO.APP",
        }),
      },
    ],
  },
  {
    id: "brickbyte",
    index: "04",
    title: "BrickByte",
    wordmark: "Brick",
    subtitle: "Fractional Real Estate Micro-Investment Protocol",
    tagline: "3× Hackathon Podium Winner · 900+ Competing Teams",
    category: "Web3",
    year: "2025",
    status: "3× Podium Winner",
    recognition: "Hackaccino 3.0 · Geek Verse · Vihaan 8.0 IEEE DTU",
    accentHex: "#388ee9",
    description:
      "A decentralized Web3 micro-investment platform tokenizing real estate properties into fractional ERC-20 shares with verifiable Sepolia testnet execution and transparent yield distribution.",
    highlights: [
      "Wrote audited ERC-20 fractional property smart contracts enabling micro-allocations with deterministic payout splits.",
      "Built live Sepolia testnet transaction tracking and wallet portfolio analytics inside a responsive Next.js console.",
      "Claimed podium finishes across 3 major national hackathons (IEEE DTU Vihaan 8.0, Hackaccino 3.0, Geek Verse USAR).",
    ],
    stack: ["Solidity", "ERC-20", "Next.js", "Ethers.js", "Sepolia"],
    metrics: [
      { label: "PODIUMS", value: "3× National Wins" },
      { label: "FIELD SIZE", value: "900+ Teams" },
      { label: "PROTOCOL", value: "ERC-20 Sepolia" },
    ],
    githubUrl: "https://github.com/VanshNagpal10",
    slides: [
      {
        id: "brick-1",
        code: "Slide 01",
        title: "ERC-20 Vault",
        detail: "Fractional Contracts",
        duration: "00:46",
        summary: "Smart contract factory minting divisible property share tokens with immutable cap enforcement.",
        telemetryLabel: "CONTRACT",
        telemetryValue: "Solidity ERC-20",
        diagramType: "architecture",
        sheetImage: makeBlueprintSheet({
          index: "04",
          projectTitle: "BrickByte",
          slideCode: "Sheet 01",
          headline: "ERC-20 Property",
          subline: "FRACTIONAL TOKENIZATION VAULT",
          accent: "#388ee9",
          motif: "mesh",
          statA: "SOLIDITY",
          statB: "SEPOLIA TESTNET",
        }),
      },
      {
        id: "brick-2",
        code: "Slide 02",
        title: "Yield Settlement",
        detail: "On-Chain Ledger",
        duration: "00:40",
        summary: "Automated pro-rata rent dividend distribution verified on Ethereum Sepolia.",
        telemetryLabel: "LEDGER",
        telemetryValue: "On-Chain Split",
        diagramType: "runtime",
        sheetImage: makeBlueprintSheet({
          index: "04",
          projectTitle: "BrickByte",
          slideCode: "Sheet 02",
          headline: "Yield Settlement",
          subline: "PRO-RATA DIVIDEND DISPATCH",
          accent: "#388ee9",
          motif: "nodes",
          statA: "ETHERS.JS",
          statB: "TRUSTLESS",
        }),
      },
      {
        id: "brick-3",
        code: "Slide 03",
        title: "Portfolio Console",
        detail: "Wallet Analytics",
        duration: "00:51",
        summary: "Live fractional cap-table viewer and instant buy/redeem share execution interface.",
        telemetryLabel: "DASHBOARD",
        telemetryValue: "Next.js Web3",
        diagramType: "interface",
        sheetImage: makeBlueprintSheet({
          index: "04",
          projectTitle: "BrickByte",
          slideCode: "Sheet 03",
          headline: "Cap Table UI",
          subline: "WALLET HOLDINGS & LIQUIDITY",
          accent: "#388ee9",
          motif: "grid",
          statA: "LIVE GAS EST.",
          statB: "INSTANT MINT",
        }),
      },
      {
        id: "brick-4",
        code: "Slide 04",
        title: "Triple Podium",
        detail: "DTU · CSI · USAR",
        duration: "00:34",
        summary: "1st Runner-Up at Hackaccino 3.0 & Geek Verse; 2nd Runner-Up among 400+ teams at Vihaan 8.0.",
        telemetryLabel: "RECORD",
        telemetryValue: "3× National",
        diagramType: "metrics",
        sheetImage: makeBlueprintSheet({
          index: "04",
          projectTitle: "BrickByte",
          slideCode: "Sheet 04",
          headline: "Triple Podium",
          subline: "VIHAAN 8.0 · HACKACCINO · USAR",
          accent: "#388ee9",
          motif: "wave",
          statA: "900+ TEAMS",
          statB: "3X TROPHIES",
        }),
      },
    ],
  },
  {
    id: "codegenie",
    index: "05",
    title: "CodeGenie",
    wordmark: "Genie",
    subtitle: "AI Algorithmic Bottleneck & DSA Mentor",
    tagline: "Winner + Direct SDE Offer · The AI Hiring Show",
    category: "AI & Agents",
    year: "2025",
    status: "Grand Winner",
    recognition: "Winner (Direct SDE Offer) @ RabbittAI",
    accentHex: "#388ee9",
    description:
      "An AI-powered Data Structures & Algorithms mentor that analyzes submitted code paths, pinpoints asymptotic complexity bottlenecks, and synthesizes personalized adaptive practice roadmaps.",
    highlights: [
      "Built static & LLM-assisted complexity diagnostics spotting O(n²) loops and redundant recursion states.",
      "Generated progressive mastery roadmaps tailored to individual interview gaps and topic weak spots.",
      "Won 1st Place and a direct Software Development Engineer placement offer at RabbittAI's Hiring Show.",
    ],
    stack: ["Python", "OpenAI API", "Next.js", "TypeScript", "AST Analysis"],
    metrics: [
      { label: "AWARD", value: "1st Place Winner" },
      { label: "OUTCOME", value: "Direct SDE Offer" },
      { label: "HOST", value: "RabbittAI" },
    ],
    githubUrl: "https://github.com/VanshNagpal10",
    slides: [
      {
        id: "genie-1",
        code: "Slide 01",
        title: "AST Bottlenecks",
        detail: "Complexity Profiler",
        duration: "00:44",
        summary: "Inspects submitted functions to isolate high-complexity loops and memory leaks.",
        telemetryLabel: "PROFILER",
        telemetryValue: "O(n) Diagnostics",
        diagramType: "architecture",
        sheetImage: makeBlueprintSheet({
          index: "05",
          projectTitle: "CodeGenie",
          slideCode: "Sheet 01",
          headline: "AST Diagnostics",
          subline: "ASYMPTOTIC BOTTLENECK TRACE",
          accent: "#388ee9",
          motif: "nodes",
          statA: "PYTHON + AST",
          statB: "O(N) HINTS",
        }),
      },
      {
        id: "genie-2",
        code: "Slide 02",
        title: "Adaptive Roadmap",
        detail: "Topic Sequencing",
        duration: "00:39",
        summary: "Dynamic skill graph calibrating problem difficulty across graphs, DP, and trees.",
        telemetryLabel: "CURRICULUM",
        telemetryValue: "Adaptive Graph",
        diagramType: "interface",
        sheetImage: makeBlueprintSheet({
          index: "05",
          projectTitle: "CodeGenie",
          slideCode: "Sheet 02",
          headline: "Skill Roadmap",
          subline: "PERSONALIZED DSA PROGRESSION",
          accent: "#388ee9",
          motif: "grid",
          statA: "OPENAI API",
          statB: "ADAPTIVE PATHS",
        }),
      },
      {
        id: "genie-3",
        code: "Slide 03",
        title: "Hint Synthesis",
        detail: "Socratic Prompts",
        duration: "00:35",
        summary: "Progressive non-spoiler guidance helping engineers derive optimal state transitions.",
        telemetryLabel: "MENTOR",
        telemetryValue: "Socratic AI",
        diagramType: "runtime",
        sheetImage: makeBlueprintSheet({
          index: "05",
          projectTitle: "CodeGenie",
          slideCode: "Sheet 03",
          headline: "Socratic Mentor",
          subline: "GUIDED STATE TRANSITION HINTS",
          accent: "#388ee9",
          motif: "wave",
          statA: "ZERO SPOILERS",
          statB: "LIVE SANDBOX",
        }),
      },
      {
        id: "genie-4",
        code: "Slide 04",
        title: "SDE Hiring Win",
        detail: "RabbittAI Selection",
        duration: "00:29",
        summary: "Top-ranked build awarded 1st Place and direct Software Engineer offer.",
        telemetryLabel: "RESULT",
        telemetryValue: "Direct SDE Offer",
        diagramType: "metrics",
        sheetImage: makeBlueprintSheet({
          index: "05",
          projectTitle: "CodeGenie",
          slideCode: "Sheet 04",
          headline: "Direct SDE Offer",
          subline: "THE AI HIRING SHOW WINNER",
          accent: "#388ee9",
          motif: "mesh",
          statA: "1ST PLACE",
          statB: "RABBITTAI",
        }),
      },
    ],
  },
  {
    id: "swyf",
    index: "06",
    title: "SWYF",
    wordmark: "SWYF",
    subtitle: "Agentic Workflow Automation Pipeline",
    tagline: "Grand Prize Winner ($500) · NinjaHacks Global",
    category: "AI & Agents",
    year: "2025",
    status: "Grand Prize",
    recognition: "Grand Prize Winner @ NinjaHacks Global",
    accentHex: "#388ee9",
    description:
      "Multi-agent orchestration runtime combining CrewAI task delegation with typed webhook triggers to automate research, synthesis, and execution pipelines end-to-end.",
    highlights: [
      "Designed composable multi-agent DAG workflows with deterministic handoffs and retry guardrails.",
      "Integrated structured JSON tool calling and real-time step streaming into a minimalist operator console.",
      "Awarded the $500 Grand Prize over global competitors at NinjaHacks.",
    ],
    stack: ["CrewAI", "Python", "Next.js", "TypeScript", "Node.js"],
    metrics: [
      { label: "AWARD", value: "Grand Prize" },
      { label: "PRIZE", value: "$500 Cash" },
      { label: "ENGINE", value: "Multi-Agent DAG" },
    ],
    githubUrl: "https://github.com/VanshNagpal10",
    slides: [
      {
        id: "swyf-1",
        code: "Slide 01",
        title: "Agent DAG Mesh",
        detail: "CrewAI Orchestrator",
        duration: "00:43",
        summary: "Role-specialized autonomous workers coordinating parallel research and tool execution.",
        telemetryLabel: "PIPELINE",
        telemetryValue: "CrewAI DAG",
        diagramType: "architecture",
        sheetImage: makeBlueprintSheet({
          index: "06",
          projectTitle: "SWYF",
          slideCode: "Sheet 01",
          headline: "Multi-Agent DAG",
          subline: "DETERMINISTIC TASK HANDOFFS",
          accent: "#388ee9",
          motif: "nodes",
          statA: "CREWAI + PYTHON",
          statB: "NINJAHACKS WIN",
        }),
      },
      {
        id: "swyf-2",
        code: "Slide 02",
        title: "Operator Stream",
        detail: "Live Run Inspector",
        duration: "00:38",
        summary: "Clean step-by-step trace console monitoring token throughput, retries, and outputs.",
        telemetryLabel: "TRACE",
        telemetryValue: "Live Events",
        diagramType: "interface",
        sheetImage: makeBlueprintSheet({
          index: "06",
          projectTitle: "SWYF",
          slideCode: "Sheet 02",
          headline: "Run Inspector",
          subline: "REAL-TIME TOOL CALL TELEMETRY",
          accent: "#388ee9",
          motif: "grid",
          statA: "TYPESCRIPT UI",
          statB: "STRUCTURED JSON",
        }),
      },
      {
        id: "swyf-3",
        code: "Slide 03",
        title: "Schema Guardrails",
        detail: "Validated Payloads",
        duration: "00:33",
        summary: "Strict schema validation between autonomous stages preventing silent hallucination drift.",
        telemetryLabel: "RELIABILITY",
        telemetryValue: "Typed Handoffs",
        diagramType: "runtime",
        sheetImage: makeBlueprintSheet({
          index: "06",
          projectTitle: "SWYF",
          slideCode: "Sheet 03",
          headline: "Typed Guardrails",
          subline: "ZERO-DRIFT PAYLOAD CHECKS",
          accent: "#388ee9",
          motif: "mesh",
          statA: "RETRY SAFE",
          statB: "DETERMINISTIC",
        }),
      },
      {
        id: "swyf-4",
        code: "Slide 04",
        title: "NinjaHacks Prize",
        detail: "Global 1st Place",
        duration: "00:28",
        summary: "Selected by international judges for production reliability and engineering execution.",
        telemetryLabel: "HONOR",
        telemetryValue: "$500 Grand Prize",
        diagramType: "metrics",
        sheetImage: makeBlueprintSheet({
          index: "06",
          projectTitle: "SWYF",
          slideCode: "Sheet 04",
          headline: "Grand Prize Win",
          subline: "NINJAHACKS GLOBAL CHAMPION",
          accent: "#388ee9",
          motif: "wave",
          statA: "$500 AWARD",
          statB: "GLOBAL 1ST",
        }),
      },
    ],
  },
  {
    id: "ipod-os",
    index: "07",
    title: "VN-2026 OS",
    wordmark: "iPod",
    subtitle: "Tactile iPod Classic 7th Gen Web OS",
    tagline: "Next.js 16 · React 19 · Web Audio · Hardware Manual",
    category: "Full-Stack",
    year: "2026",
    status: "You Are Here",
    recognition: "Bespoke Interactive Hardware Portfolio",
    accentHex: "#388ee9",
    description:
      "A faithful hardware-emulated web OS inspired by the 7th Gen iPod Classic, combining circular angular drag physics, procedural click-wheel foley audio, and Dieter Rams-inspired interior manuals.",
    highlights: [
      "Engineered sub-degree angular velocity click-wheel tracking with inertia scrolling and keyboard navigation.",
      "Built Web Audio click ticks, confirmation chimes, and live Lo-Fi deck playback without bulky audio libraries.",
      "Designed every interior route with distinct structural layouts on a 95% monochrome #08090C hardware grid.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Styled-Components", "Framer Motion"],
    metrics: [
      { label: "ARCHITECTURE", value: "Next.js 16 App" },
      { label: "PHYSICS", value: "Angular Drag Wheel" },
      { label: "FOLEY", value: "Web Audio API" },
    ],
    githubUrl: "https://github.com/VanshNagpal10",
    liveUrl: "/",
    demoLabel: "Active Session",
    slides: [
      {
        id: "ipod-1",
        code: "Slide 01",
        title: "Click Wheel Physics",
        detail: "Angular Drag Math",
        duration: "00:41",
        summary: "Tracks pointer delta angles relative to wheel center for tactile iPod menu scrubbing.",
        telemetryLabel: "INPUT",
        telemetryValue: "Polar Drag",
        diagramType: "architecture",
        sheetImage: makeBlueprintSheet({
          index: "07",
          projectTitle: "VN-2026 OS",
          slideCode: "Sheet 01",
          headline: "Click Wheel Math",
          subline: "POLAR ANGLE VELOCITY TRACKER",
          accent: "#388ee9",
          motif: "mesh",
          statA: "REACT 19",
          statB: "WEB AUDIO TICK",
        }),
      },
      {
        id: "ipod-2",
        code: "Slide 02",
        title: "Split Screen OS",
        detail: "View Stack Engine",
        duration: "00:36",
        summary: "Authentic Apple split-screen preview panel synced with live route transitions.",
        telemetryLabel: "OS CORE",
        telemetryValue: "View Stack",
        diagramType: "interface",
        sheetImage: makeBlueprintSheet({
          index: "07",
          projectTitle: "VN-2026 OS",
          slideCode: "Sheet 02",
          headline: "Split Screen OS",
          subline: "AUTHENTIC HARDWARE LAUNCHER",
          accent: "#388ee9",
          motif: "grid",
          statA: "NEXT.JS 16",
          statB: "0.08 HAIRLINES",
        }),
      },
      {
        id: "ipod-3",
        code: "Slide 03",
        title: "Lo-Fi Audio Deck",
        detail: "Foley + Equalizer",
        duration: "00:47",
        summary: "Synchronized EQ spectrum bars and synthesized tactile mechanical audio feedback.",
        telemetryLabel: "SOUND",
        telemetryValue: "Howler + Synth",
        diagramType: "runtime",
        sheetImage: makeBlueprintSheet({
          index: "07",
          projectTitle: "VN-2026 OS",
          slideCode: "Sheet 03",
          headline: "Lo-Fi Audio Deck",
          subline: "HARDWARE FOLEY & PLAYBACK",
          accent: "#388ee9",
          motif: "wave",
          statA: "LIVE EQ BARS",
          statB: "ZERO LAG SFX",
        }),
      },
      {
        id: "ipod-4",
        code: "Slide 04",
        title: "Hardware Manual",
        detail: "Rams Minimalism",
        duration: "00:34",
        summary: "95% monochrome #08090C architectural grid pairing oversized SF Pro type with monospace tags.",
        telemetryLabel: "SYSTEM",
        telemetryValue: "Model VN-2026",
        diagramType: "metrics",
        sheetImage: makeBlueprintSheet({
          index: "07",
          projectTitle: "VN-2026 OS",
          slideCode: "Sheet 04",
          headline: "Hardware Manual",
          subline: "MONOCHROME SPEC SHEET SYSTEM",
          accent: "#388ee9",
          motif: "nodes",
          statA: "6 SHIPPED ROUTES",
          statB: "MODEL VN-2026",
        }),
      },
    ],
  },
];
