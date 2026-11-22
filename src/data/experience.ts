export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: "Work" | "Education" | "Certification";
  year: number;
  description: string[];
  skills: string[];
  metrics?: string;
  imagePlaceholder?: {
    slotId: string;
    caption: string;
    suggestedImage: string;
  };
}

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: "khwaaish-ai",
    role: "Software Developer Intern",
    company: "KhwaaishAI",
    period: "Jun 2026 – Sep 2026",
    location: "Remote / Delhi, India",
    type: "Work",
    year: 2026,
    metrics: "Production Auth & Admin Suite",
    description: [
      "Architected and deployed responsive Login, Signup, and OTP-based authentication flows from scratch with strict validation and seamless UX across desktop and mobile devices.",
      "Engineered the internal Admin Dashboard frontend end-to-end, integrating administrative REST API endpoints for customer management, operational telemetry, and inventory tracking.",
      "Developed and refined high-conversion user journeys including navigation sidebars, dynamic product catalog exploration, referral sharing flows, and precise cart billing breakdown components.",
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
    role: "Web Developer Intern",
    company: "Digital Dreams Innovation Trust (DDITLAB)",
    period: "Jun 2025 – Aug 2025",
    location: "Delhi, India",
    type: "Work",
    year: 2025,
    metrics: "40% Page Load Time Reduction",
    description: [
      "Engineered high-performance, modular React.js & TypeScript UI component library across core application portals with rigorous cross-browser testing.",
      "Optimized client-side rendering pathways and lazy-loaded assets, cutting critical page load latency by 40% and enhancing Core Web Vitals score.",
      "Integrated complex RESTful API payloads with type-safe state interfaces, improving client-server synchronization stability.",
    ],
    skills: ["React.js", "TypeScript", "REST APIs", "Web Performance", "Git", "CSS Modules"],
    imagePlaceholder: {
      slotId: "ddit-preview",
      caption: "DDITLAB Web Portal Interface & Analytics",
      suggestedImage: "/images/experience/ddit-portal.jpg",
    },
  },
];

export const EDUCATION: ExperienceItem[] = [
  {
    id: "vips-tc",
    role: "B.Tech in Computer Science & Engineering",
    company: "Vivekananda Institute of Professional Studies - TC (VIPS-TC), Delhi",
    period: "2023 – 2027 (Expected)",
    location: "Delhi, India",
    type: "Education",
    year: 2023,
    metrics: "CGPA: 9.04 / 10",
    description: [
      "Core Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Object-Oriented Programming (Java/C++), Software Engineering.",
      "Honors: Reliance Foundation Undergraduate Scholar (Top 5% across India).",
      "Campus Leadership: Vice President of Aarvak Technical Society, Head of Design at Srijan SDG Club, Technical Core at Career Development Centre (CDC).",
    ],
    skills: ["Data Structures", "Algorithms", "Computer Networks", "Database Systems", "Software Architecture"],
    imagePlaceholder: {
      slotId: "vips-campus",
      caption: "VIPS-TC Campus & Aarvak Tech Society Hackathons",
      suggestedImage: "/images/experience/vips-campus.jpg",
    },
  },
  {
    id: "ryan-school",
    role: "High School & Senior Secondary Education",
    company: "Ryan International School",
    period: "2009 – 2023",
    location: "Delhi, India",
    type: "Education",
    year: 2021,
    metrics: "Class XII: 93.6% | Class X: 92.4%",
    description: [
      "Class XII CBSE Board Examination (2023): Scored 93.6% with Physics, Chemistry, Mathematics, and Computer Science.",
      "Class X CBSE Board Examination (2021): Scored 92.4% with distinction across STEM subjects.",
      "Active participant in science exhibitions, coding challenges, and cultural debates.",
    ],
    skills: ["Mathematics", "Physics", "Computer Science", "Analytical Thinking"],
  },
];

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  credentialId?: string;
}

export const CERTIFICATIONS: CertificationItem[] = [
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
