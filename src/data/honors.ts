export interface SpotlightHonor {
  id: string;
  title: string;
  badge: string;
  issuer: string;
  year: string;
  highlight: string;
  description: string;
  projectOrBasis: string;
  imagePlaceholder: {
    slotId: string;
    caption: string;
    suggestedImage: string;
  };
}

export interface HackathonTrack {
  trackNo: string;
  eventName: string;
  organizer: string;
  project: string;
  award: string;
  awardTier: "Winner" | "Runner-Up" | "Special";
  date: string;
  prizeOrPerk?: string;
  description?: string;
  imagePlaceholder?: {
    slotId: string;
    caption: string;
    suggestedImage: string;
  };
}

export const SPOTLIGHT_HONORS: SpotlightHonor[] = [
  {
    id: "apple-ssc-2026",
    title: "Apple Swift Student Challenge 2026 Winner",
    badge: "GLOBAL HONOREE",
    issuer: "Apple Inc., Cupertino",
    year: "2026",
    highlight: "Awarded globally for engineering 'Ping' — a 3D native SceneKit networking game",
    description:
      "Selected as a Global Winner in Apple's premier student competition. Engineered 'Ping' entirely in Swift and SwiftUI, leveraging SceneKit for custom real-time 3D physics to educate players on packet routing, latency, and OSI network architecture without third-party dependencies.",
    projectOrBasis: "Ping (Swift, SwiftUI, SceneKit)",
    imagePlaceholder: {
      slotId: "apple-ssc-cert",
      caption: "Apple SSC 2026 Winner Certificate & Celebration",
      suggestedImage: "/images/honors/apple-ssc-cert.jpg",
    },
  },
  {
    id: "reliance-scholar",
    title: "Reliance Foundation Undergraduate Scholar",
    badge: "TOP 5% SCHOLAR",
    issuer: "Reliance Foundation",
    year: "2023 – 2027",
    highlight: "Selected in top 5% of first-year engineering students across India (up to ₹2,00,000 scholarship)",
    description:
      "Awarded one of India's most prestigious merit scholarships following a competitive nationwide screening process assessing academic excellence, leadership caliber, and technological innovation.",
    projectOrBasis: "Academic Excellence & Leadership Merit",
    imagePlaceholder: {
      slotId: "reliance-scholar-badge",
      caption: "Reliance Foundation Scholar Induction & Certificate",
      suggestedImage: "/images/honors/reliance-scholar.jpg",
    },
  },
  {
    id: "hackathons-collective",
    title: "9× Hackathon Winner & National Finalist",
    badge: "9 PODIUM WINS",
    issuer: "DTU, Bennett, USAR, RabbittAI, Amity & Global Hackathons",
    year: "2024 – 2026",
    highlight: "9 Wins, 14+ National Hackathons, $500+ prizes, direct SDE offer & seed incubation",
    description:
      "A proven track record of rapid ideation, full-stack prototyping, and winning pitches under high-pressure 24–48 hour sprints. Specialized in AI agentic pipelines, Web3 micro-investments, and emergency triage systems.",
    projectOrBasis: "KWIK, BrickByte, CodeGenie, SWYF, LaunchPad",
    imagePlaceholder: {
      slotId: "hackathon-trophies",
      caption: "Hackathon Trophies, Certificates & Stage Presentations",
      suggestedImage: "/images/honors/hackathon-wins.jpg",
    },
  },
];

export const HACKATHON_TRACKS: HackathonTrack[] = [
  {
    trackNo: "01",
    eventName: "NinjaHacks",
    organizer: "NinjaHacks Global",
    project: "SWYF",
    award: "Winner (Grand Prize)",
    awardTier: "Winner",
    date: "Nov 2025",
    prizeOrPerk: "$500 Cash Prize",
    description: "Built high-performance workflow automation pipeline evaluated by global judges.",
    imagePlaceholder: {
      slotId: "hack-ninjahacks",
      caption: "NinjaHacks Grand Prize Certificate",
      suggestedImage: "/images/honors/ninjahacks.jpg",
    },
  },
  {
    trackNo: "02",
    eventName: "The AI Hiring Show",
    organizer: "Rabbitt Learning / RabbittAI",
    project: "CodeGenie",
    award: "Winner (Direct SDE Offer)",
    awardTier: "Winner",
    date: "Jul 2025",
    prizeOrPerk: "Direct SDE Placement Offer",
    description: "Engineered AI-driven DSA code mentor that detects logic bottlenecks and generates custom roadmaps.",
    imagePlaceholder: {
      slotId: "hack-codegenie",
      caption: "The AI Hiring Show Winner Felicitations",
      suggestedImage: "/images/honors/ai-hiring-show.jpg",
    },
  },
  {
    trackNo: "03",
    eventName: "Bay2BayHacks 2025",
    organizer: "Bay2BayHacks International",
    project: "KWIK",
    award: "1st Runner-Up (Global 2nd)",
    awardTier: "Runner-Up",
    date: "Aug 2025",
    prizeOrPerk: "International Honor & Hardware Grant",
    description: "Multilingual emergency response dispatcher for India's 112 emergency services, cutting response time by 30%.",
    imagePlaceholder: {
      slotId: "hack-bay2bay",
      caption: "Bay2BayHacks Podium Presentation",
      suggestedImage: "/images/honors/bay2bay.jpg",
    },
  },
  {
    trackNo: "04",
    eventName: "Hackaccino 3.0",
    organizer: "CSI, Bennett University",
    project: "BrickByte",
    award: "1st Runner-Up (250+ teams)",
    awardTier: "Runner-Up",
    date: "Apr 2025",
    prizeOrPerk: "Cash Award & CSI Recognition",
    description: "Decentralized fractional real estate micro-investment protocol with ERC-20 smart contracts.",
    imagePlaceholder: {
      slotId: "hack-hackaccino",
      caption: "Hackaccino 3.0 1st Runner-Up Stage Photo",
      suggestedImage: "/images/honors/hackaccino.jpg",
    },
  },
  {
    trackNo: "05",
    eventName: "Geek Verse",
    organizer: "USAR, GGSIPU",
    project: "BrickByte",
    award: "1st Runner-Up (2nd Place)",
    awardTier: "Runner-Up",
    date: "May 2025",
    prizeOrPerk: "Cash Prize & Tech Goodies",
    description: "Web3 asset tokenization engine with real-time Sepolia testnet execution.",
    imagePlaceholder: {
      slotId: "hack-geekverse",
      caption: "Geek Verse USAR Award Ceremony",
      suggestedImage: "/images/honors/geekverse.jpg",
    },
  },
  {
    trackNo: "06",
    eventName: "Vihaan 8.0",
    organizer: "IEEE DTU (Delhi Technological University)",
    project: "BrickByte",
    award: "2nd Runner-Up (Top 3 of 400+)",
    awardTier: "Runner-Up",
    date: "Apr 2025",
    prizeOrPerk: "IEEE DTU Trophy & Cash Prize",
    description: "Competed against 400+ national developer teams to claim podium position.",
    imagePlaceholder: {
      slotId: "hack-vihaan",
      caption: "Vihaan 8.0 IEEE DTU Trophy",
      suggestedImage: "/images/honors/vihaan8.jpg",
    },
  },
  {
    trackNo: "07",
    eventName: "Agent's Fest 2025",
    organizer: "Amity University",
    project: "LaunchPad",
    award: "3rd Position (Podium)",
    awardTier: "Special",
    date: "Mar 2025",
    prizeOrPerk: "Amity Innovation Memento",
    description: "Autonomous multi-agent product launcher integrating LLM-driven research and code scaffolding.",
    imagePlaceholder: {
      slotId: "hack-agentsfest",
      caption: "Agent's Fest 2025 Amity Certificate",
      suggestedImage: "/images/honors/agentsfest.jpg",
    },
  },
  {
    trackNo: "08",
    eventName: "HackNomics",
    organizer: "HackNomics National",
    project: "KWIK",
    award: "3rd Position",
    awardTier: "Special",
    date: "2025",
    prizeOrPerk: "National Certificate of Merit",
    description: "Emergency logistics dispatch simulation with real-time triage scoring.",
  },
  {
    trackNo: "09",
    eventName: "RIDE Hack'25",
    organizer: "JIIT, Noida",
    project: "Startup Concept",
    award: "Incubation & Seed Funding Award",
    awardTier: "Special",
    date: "Nov 2025",
    prizeOrPerk: "E-Cell Incubation Grant",
    description: "Selected for institutional incubation pipeline with pre-seed mentoring and cloud credits.",
  },
];

export const NOTABLE_PARTICIPATIONS = [
  "Top 5 Finalist @ HackArena 2025 (IIIT Delhi)",
  "Agentic AI Day by Google Cloud",
  "IndiaAI Impact Gen-AI Hackathon by IISc & IBM",
  "IIT Delhi E-Cell DebugOn",
  "HackCBS 8.0 (Asia's Largest Student Hackathon)",
  "InnovateNSUT '26 (NSUT Delhi)",
  "Brainwave DTU",
  "Open Gateway Hackathon by GSMA",
  "The UI Strikes Back by WeMakeDevs",
];
