export interface SkillItem {
  name: string;
  level: number; // 1-100 for EQ meter
  category: string;
  frequencyBand: string; // e.g. "32Hz", "64Hz", "125Hz", etc. for audio EQ metaphor
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: SkillItem[];
}

export interface LeadershipRole {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string[];
  metrics?: string;
  imagePlaceholder?: {
    slotId: string;
    caption: string;
    suggestedImage: string;
  };
}

export const BIO_PARAGRAPHS = [
  "I am a Full-Stack, iOS, and Design Engineer currently pursuing Computer Science & Engineering at VIPS-TC, Delhi (CGPA 9.04/10). I build software that bridges rigorous systems engineering with tactile, nostalgic, and human-centered design.",
  "From winning the Apple Swift Student Challenge 2026 with an interactive 3D networking physics game, to building real-time triage dashboards for emergency responders, I gravitate towards problems where performance, architecture, and aesthetics cannot be compromised.",
  "When I'm not writing Swift or TypeScript, I lead visual and technical initiatives across campus—directing design teams at Srijan SDG Club, organizing hackathons as Vice President of Aarvak Technical Society, and mentoring upcoming developers.",
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    icon: "code",
    skills: [
      { name: "Swift", level: 94, category: "Languages", frequencyBand: "32 Hz" },
      { name: "TypeScript", level: 92, category: "Languages", frequencyBand: "64 Hz" },
      { name: "Python", level: 90, category: "Languages", frequencyBand: "125 Hz" },
      { name: "JavaScript (ES6+)", level: 95, category: "Languages", frequencyBand: "250 Hz" },
      { name: "C / C++", level: 85, category: "Languages", frequencyBand: "500 Hz" },
      { name: "Java", level: 82, category: "Languages", frequencyBand: "1 kHz" },
    ],
  },
  {
    category: "Apple Platforms & Frontend",
    icon: "layout",
    skills: [
      { name: "SwiftUI & UIKit", level: 93, category: "Frontend", frequencyBand: "2 kHz" },
      { name: "SceneKit 3D", level: 88, category: "Frontend", frequencyBand: "4 kHz" },
      { name: "React.js", level: 95, category: "Frontend", frequencyBand: "8 kHz" },
      { name: "Next.js (App Router)", level: 92, category: "Frontend", frequencyBand: "16 kHz" },
      { name: "Tailwind CSS & Styled-Components", level: 94, category: "Frontend", frequencyBand: "32 Hz" },
      { name: "Responsive & Accessible UI", level: 96, category: "Frontend", frequencyBand: "64 Hz" },
    ],
  },
  {
    category: "Backend & Systems",
    icon: "server",
    skills: [
      { name: "Node.js & Express", level: 90, category: "Backend", frequencyBand: "125 Hz" },
      { name: "RESTful API Architecture", level: 94, category: "Backend", frequencyBand: "250 Hz" },
      { name: "JWT & OAuth Systems", level: 88, category: "Backend", frequencyBand: "500 Hz" },
      { name: "MongoDB & Mongoose", level: 89, category: "Backend", frequencyBand: "1 kHz" },
      { name: "MySQL & Relational Design", level: 84, category: "Backend", frequencyBand: "2 kHz" },
    ],
  },
  {
    category: "AI, Agents & Cloud",
    icon: "cpu",
    skills: [
      { name: "Agentic AI (CrewAI & AutoGen)", level: 86, category: "AI", frequencyBand: "4 kHz" },
      { name: "OpenAI API & Prompt Engineering", level: 92, category: "AI", frequencyBand: "8 kHz" },
      { name: "Git & GitHub CI/CD", level: 94, category: "Tools", frequencyBand: "16 kHz" },
      { name: "Postman API Testing", level: 90, category: "Tools", frequencyBand: "32 Hz" },
      { name: "Vercel & AWS Deployment", level: 86, category: "Tools", frequencyBand: "64 Hz" },
    ],
  },
];

export const LEADERSHIP_ROLES: LeadershipRole[] = [
  {
    id: "head-of-design-srijan",
    role: "Head of Design",
    organization: "Srijan, The SDG Club of VSE&T (VIPS-TC)",
    period: "Feb 2024 – Present",
    metrics: "+40% Student Engagement",
    description: [
      "Direct an 10+ member multi-disciplinary design and media team responsible for visual identity, digital assets, and high-visibility marketing campaigns.",
      "Spearheaded creative campaigns for major institutional events, resulting in a 40% surge in student event registrations and social media impressions.",
      "Established brand guidelines and design review standard operating procedures for all club publications.",
    ],
    imagePlaceholder: {
      slotId: "srijan-team",
      caption: "Srijan SDG Club Design Team & Campaign Showcase",
      suggestedImage: "/images/about/srijan-team.jpg",
    },
  },
  {
    id: "vp-aarvak",
    role: "Vice President",
    organization: "Aarvak Technical Society",
    period: "Aug 2024 – Present",
    metrics: "200+ Developers Mentored",
    description: [
      "Steer operational strategy, hackathon organization, and speaker initiatives for one of the most active engineering student bodies on campus.",
      "Curate hands-on development workshops, code reviews, and problem-solving bootcamps for 200+ junior engineers.",
      "Coordinate sponsor relations, judging panels, and logistics for collegiate-level hackathons.",
    ],
    imagePlaceholder: {
      slotId: "aarvak-hackathon",
      caption: "Aarvak Technical Society Hackathons & Keynotes",
      suggestedImage: "/images/about/aarvak-team.jpg",
    },
  },
  {
    id: "tech-core-cdc",
    role: "Technical Core Member",
    organization: "Career Development Centre (CDC), VIPS-TC",
    period: "Jan 2025 – Present",
    metrics: "Placement Prep Modules",
    description: [
      "Curate targeted technical modules covering Data Structures, Algorithms, and System Design for placement-eligible engineering cohorts.",
      "Facilitate mock technical interviews and competitive programming coding rounds.",
    ],
    imagePlaceholder: {
      slotId: "cdc-workshop",
      caption: "CDC Placement Workshop & Training Sessions",
      suggestedImage: "/images/about/cdc-sessions.jpg",
    },
  },
];

export const VOLUNTEERING_ACTIVITIES = [
  {
    title: "Campus Blood Donation Drive",
    role: "Organizing Team Lead",
    date: "February 2025",
    impact: "Mobilized 150+ student and faculty blood donors across campus in partnership with local hospitals.",
  },
  {
    title: "ICASW International Conference",
    role: "Organizing Team Member",
    date: "March 2025",
    impact: "Facilitated track presentations, researcher logistics, and delegate coordination for global scholars.",
  },
  {
    title: "Ganga Samvad Ecological Awareness Drive",
    role: "Participant & Volunteer",
    date: "2024",
    impact: "Engaged in community river conservation dialogue under the Indian Institute of Public Administration.",
  },
  {
    title: "Annual Campus Plantation Initiative",
    role: "Volunteer",
    date: "2024",
    impact: "Planted 100+ native saplings to promote green campus infrastructure.",
  },
];
