"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type PortfolioPage = "home" | "projects" | "experience" | "honors" | "about" | "contact";

type Project = {
  name: string; disc: string; stack: string[]; summary: string; impact: string;
  github?: string; live?: string; hue: string;
};

const nav = [
  { key: "projects", label: "Projects", sub: "6 interactive discs" },
  { key: "experience", label: "Experience", sub: "work, education & certificates" },
  { key: "honors", label: "Honors & wins", sub: "Apple SSC, Scholar & 9 wins" },
  { key: "about", label: "About & leadership", sub: "stack, design & campus roles" },
  { key: "contact", label: "Contact & résumé", sub: "links, email & PDF" },
] as const;

const projects: Project[] = [
  { name: "Ping", disc: "DISC 01", hue: "violet", stack: ["Swift", "SwiftUI", "SceneKit", "AVFoundation"], summary: "A narrative-driven iPad game where a data packet races through the internet, making TCP, DNS and latency tangible through play.", impact: "Apple Swift Student Challenge 2026 winner. Custom SceneKit physics and 3D environment; no third-party libraries.", github: "https://github.com/VanshNagpal10/Ping" },
  { name: "KWIK", disc: "DISC 02", hue: "blue", stack: ["Next.js", "Node.js", "Python", "REST APIs"], summary: "An AI emergency-response concept for India’s 112 helpline with multilingual triage, emotion signals and a dispatcher dashboard.", impact: "Built to reduce response time and dispatcher workload through clear, real-time context.", github: "https://github.com/VanshNagpal10/112-Emergency", live: "https://112-emergency.vercel.app/" },
  { name: "RIMO", disc: "DISC 03", hue: "amber", stack: ["Next.js 14", "TypeScript", "MongoDB", "JWT"], summary: "A full-stack rental-management platform for high-inventory operations and customer rentals.", impact: "Secure authentication, validation, inventory workflows and deliberately balanced SSR/CSR rendering.", github: "https://github.com/VanshNagpal10/rimo-rental-management-system", live: "https://rentrimo.vercel.app/" },
  { name: "CodeGenie", disc: "DISC 04", hue: "pink", stack: ["Next.js", "OpenAI API", "Firebase", "Tailwind"], summary: "An AI DSA mentor that reads code submissions, finds reasoning gaps and produces a focused learning roadmap.", impact: "Winner of The AI Hiring Show by Rabbitt Learning.", live: "https://codegenieai.vercel.app/" },
  { name: "BrickByte", disc: "DISC 05", hue: "lime", stack: ["React", "Solidity", "Ethereum", "Web3.js"], summary: "A micro-investment prototype that makes fractional real-estate ownership legible through ERC-20 tokens.", impact: "Smart contracts deployed to Ethereum Sepolia; recognized at multiple hackathons.", live: "https://brickbyte.vercel.app/" },
  { name: "IntelliDocs", disc: "DISC 06", hue: "orange", stack: ["Next.js", "OpenAI API", "Tesseract OCR"], summary: "A document intelligence system for text extraction, semantic questions and structured insight from PDFs and handwritten notes.", impact: "Combines OCR and natural-language queries in a practical research workflow." },
];

const honors = [
  ["01", "NinjaHacks", "Winner · $500 Grand Prize", "Nov 2025"],
  ["02", "The AI Hiring Show", "Winner · direct SDE offer", "Jul 2025"],
  ["03", "Bay2BayHacks 2025", "1st Runner-Up · Global 2nd", "Aug 2025"],
  ["04", "Hackaccino 3.0", "1st Runner-Up · 250+ teams", "Apr 2025"],
  ["05", "Geek Verse", "1st Runner-Up", "May 2025"],
  ["06", "Vihaan 8.0", "2nd Runner-Up · Top 3 / 400+", "Apr 2025"],
  ["07", "Agent’s Fest 2025", "3rd Position", "Mar 2025"],
  ["08", "HackNomics", "3rd Position", "2025"],
  ["09", "RIDE Hack ’25", "Incubation & Funding Award", "Nov 2025"],
];

const pageTitles: Record<PortfolioPage, string> = {
  home: "iPad Classic", projects: "Projects — CD Deck", experience: "Experience", honors: "Hall of Records", about: "About", contact: "Contact & Résumé",
};

function hrefFor(page: PortfolioPage) { return page === "home" ? "/" : `/${page}`; }

function StatusBar({ page, midnight, setMidnight, sfx, setSfx }: { page: PortfolioPage; midnight: boolean; setMidnight: (v: boolean) => void; sfx: boolean; setSfx: (v: boolean) => void }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: false }).format(new Date()));
    update(); const id = window.setInterval(update, 15000); return () => window.clearInterval(id);
  }, []);
  return <header className="status-bar">
    <Link href="/" className="brand"><span className="play-icon">▶</span> VANSH NAGPAL</Link>
    <span className="available"><i /> OPEN TO SDE / iOS</span>
    <strong className="route-title">{pageTitles[page]}</strong>
    <div className="status-actions">
      <span className="time">DEL {time}</span>
      <button aria-pressed={sfx} onClick={() => setSfx(!sfx)} title="Toggle sound effects">SFX {sfx ? "ON" : "OFF"}</button>
      <button aria-pressed={midnight} onClick={() => setMidnight(!midnight)} title="Toggle display">{midnight ? "MIDNIGHT" : "LCD"}</button>
      <a className="resume" href="/Vansh-SDE.pdf" download>RÉSUMÉ ↓</a>
      <span className="battery" aria-label="Battery full"><b /></span>
    </div>
  </header>;
}

function ShuffleDock({ page }: { page: PortfolioPage }) {
  const current = nav.findIndex((x) => x.key === page);
  const previous = nav[(current + nav.length - 1) % nav.length];
  const next = nav[(current + 1) % nav.length];
  return <nav className="shuffle-dock" aria-label="Portfolio navigation">
    <Link href="/" aria-label="Return to menu">MENU</Link><span />
    <Link href={`/${previous.key}`} aria-label={`Previous: ${previous.label}`}>‹</Link>
    <strong>{nav[current]?.label ?? "Menu"}</strong>
    <Link href={`/${next.key}`} aria-label={`Next: ${next.label}`}>›</Link><span />
    <span aria-hidden>SFX</span>
  </nav>;
}

function Home() {
  const [selected, setSelected] = useState(0);
  const item = nav[selected];
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") setSelected((n) => (n + 1) % nav.length);
      if (e.key === "ArrowUp") setSelected((n) => (n + nav.length - 1) % nav.length);
      if (e.key === "Enter") window.location.assign(`/${nav[selected].key}`);
    };
    window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler);
  }, [selected]);
  return <main className="home-stage">
    <section className="ipod-shell home-shell" aria-label="iPad Classic launcher">
      <div className="lcd home-lcd">
        <div className="menu-pane">
          <div className="screen-heading"><span>Vansh Nagpal</span><small>FULL-STACK, iOS & DESIGN ENGINEER</small></div>
          <div className="menu-list" role="menu">
            {nav.map((entry, index) => <Link role="menuitem" href={`/${entry.key}`} className={index === selected ? "menu-row selected" : "menu-row"} onMouseEnter={() => setSelected(index)} key={entry.key}>
              <span><b>{entry.label}</b><small>{entry.sub}</small></span><em>›</em>
            </Link>)}
          </div>
          <a href="/Vansh-SDE.pdf" download className="quick-resume">⌄ Quick résumé PDF</a>
        </div>
        <div className="preview-pane">
          <Preview panel={item.key} />
        </div>
      </div>
      <ClickWheel selected={selected} setSelected={setSelected} enter={() => window.location.assign(`/${item.key}`)} />
      <p className="model-mark">MODEL VN-2026 · DELHI EDITION</p>
    </section>
    <p className="hint">DRAG THE WHEEL · USE ARROW KEYS · OR SELECT A ROW</p>
  </main>;
}

function Preview({ panel }: { panel: string }) {
  const copy: Record<string, [string, string, string]> = {
    projects: ["06 / SHIPPED BUILDS", "Projects, engineered like albums.", "Load the CD deck →"],
    experience: ["WORK / STUDY", "Two internships. One focused engineering practice.", "KhwaaishAI · DDITLAB · VIPS-TC"],
    honors: ["HALL OF RECORDS", "Apple SSC ’26 · Reliance Scholar · 9× winner", "Tap into the ledger →"],
    about: ["SYSTEM PROFILE", "Systems-minded engineering with a visual-design instinct.", "SwiftUI · Next.js · TypeScript"],
    contact: ["LET’S BUILD", "Available for software engineering and iOS roles.", "Delhi · India"],
  };
  const [eyebrow, title, detail] = copy[panel];
  return <div className={`preview-card preview-${panel}`}>
    <div className="preview-noise" /><p>{eyebrow}</p><h1>{title}</h1><div className="preview-object"><span>{panel === "projects" ? "CD" : panel === "honors" ? "✦" : "VN"}</span></div><small>{detail}</small>
  </div>;
}

function ClickWheel({ selected, setSelected, enter }: { selected: number; setSelected: (v: number | ((n: number) => number)) => void; enter: () => void }) {
  return <div className="wheel" aria-label="Navigation click wheel">
    <button className="wheel-menu" onClick={() => setSelected(0)}>MENU</button>
    <button className="wheel-prev" onClick={() => setSelected((n) => (n + nav.length - 1) % nav.length)} aria-label="Previous item">⏮</button>
    <button className="wheel-next" onClick={() => setSelected((n) => (n + 1) % nav.length)} aria-label="Next item">⏭</button>
    <button className="wheel-play" onClick={enter} aria-label="Open selected item">▶❚❚</button>
    <button className="wheel-center" onClick={enter} aria-label={`Open ${nav[selected].label}`}><i /></button>
  </div>;
}

function Projects() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  return <PageFrame page="projects"><section className="cd-console">
    <div className="project-monitor"><div className={`monitor-placeholder ${project.hue}`}><div className="scanline" /><span>{project.name.slice(0, 2).toUpperCase()}</span><small>DEMO REEL · COMING SOON</small></div><div className="transport"><span>◀◀</span><span>▶</span><span>▶▶</span><i /><b>00:00 / 00:34</b></div></div>
    <div className="liner-notes"><p>{project.disc} OF 06 · {project.stack.slice(0, 2).join(" / ").toUpperCase()}</p><h1>{project.name}</h1><div className="project-rule" /><h2>{project.summary}</h2><p className="impact">{project.impact}</p><div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links">{project.github && <a href={project.github} target="_blank">GitHub ↗</a>}{project.live && <a href={project.live} target="_blank">Live demo ↗</a>}</div></div>
  </section><section className="turntable" aria-label="Project disc selector"><p>ROTATE THE COLLECTION <span>SCROLL / SELECT A DISC</span></p><div className="disc-row">{projects.map((p, index) => <button className={`disc ${p.hue} ${index === active ? "active" : ""}`} key={p.name} onClick={() => setActive(index)} aria-current={index === active}><span className="disc-shine" /><b>{p.disc}</b><em>{p.name}</em><i /></button>)}</div></section></PageFrame>;
}

function Experience() { return <PageFrame page="experience"><article className="liner-page"><PageIntro number="01" eyebrow="LINER NOTES" title="Experience, practice & momentum." intro="A record of building for real users, learning in public, and showing up for the communities around technology." />
  <section className="timeline"><Timeline date="JUN — SEP 2026" role="Software Developer Intern" org="KhwaaishAI" bullets={["Built Login, Signup and OTP flows with responsive desktop and mobile layouts.", "Developed the internal Admin Dashboard frontend and integrated REST API workflows.", "Refined product exploration, sharing, navigation and cart breakdown experiences."]} /><Timeline date="JUN — AUG 2025" role="Web Developer Intern" org="Digital Dreams Innovation Trust / DDITLAB" bullets={["Built responsive, cross-browser React + TypeScript components for production use.", "Integrated REST APIs and reduced page load time by 40% through component-level optimization.", "Worked with backend and design teams through Git-based shipping workflows."]} /></section>
  <section className="education-grid"><div><p className="section-label">EDUCATION</p><h2>Vivekananda Institute of Professional Studies — Technical Campus</h2><p>B.Tech, Computer Science & Engineering · 2023–2027</p><strong>CGPA 9.04 / 10</strong></div><div><p className="section-label">CERTIFICATIONS</p><p>Agentic AI from Scratch — CrewAI & AutoGen</p><p>Postman API Fundamentals Student Expert</p><p>Video Editing Workshop — E-Cell VSE&T</p></div></section>
</article></PageFrame>; }

function Timeline({ date, role, org, bullets }: { date: string; role: string; org: string; bullets: string[] }) { return <div className="timeline-item"><div className="timeline-date">{date}</div><div><h2>{role}</h2><h3>{org}</h3><ul>{bullets.map((x) => <li key={x}>{x}</li>)}</ul></div></div>; }

function Honors() { return <PageFrame page="honors"><article className="liner-page honors-page"><PageIntro number="02" eyebrow="HALL OF RECORDS" title="Built under pressure. Recognized on the record." intro="A collection of competition work, scholarship, and the kind of disciplined shipping that makes a short build window count." />
  <section className="spotlights"><div><span></span><p>APPLE SWIFT STUDENT CHALLENGE</p><h2>2026 Winner</h2><small>For Ping, a native 3D iPad learning experience.</small></div><div><span>RF</span><p>RELIANCE FOUNDATION</p><h2>Undergraduate Scholar</h2><small>Selected among the top 5% of first-year students nationally.</small></div><div><span>09</span><p>HACKATHON TRACK</p><h2>9× Winner</h2><small>National and global stages, one practical build at a time.</small></div></section>
  <section className="ledger"><div className="ledger-header"><span>TRACK</span><span>EVENT</span><span>RESULT</span><span>DATE</span></div>{honors.map(([no, event, result, date]) => <div className="ledger-row" key={no}><b>{no}</b><strong>{event}</strong><span>{result}</span><time>{date}</time></div>)}</section>
  <p className="fine-print">+ National finalist and participant in 14+ additional hackathons, including HackArena, Agentic AI Day, IndiaAI Impact Gen-AI Hackathon, HackCBS, InnovateNSUT and more.</p>
</article></PageFrame>; }

function About() { return <PageFrame page="about"><article className="liner-page about-page"><PageIntro number="03" eyebrow="SYSTEM PROFILE" title="Engineer the system. Obsess over the feel." intro="I’m Vansh — a systems-minded full-stack and iOS engineer with a visual design instinct. I enjoy the space where an idea becomes a useful, tactile product." />
  <section className="specs"><Spec label="LANGUAGES" value="Python · JavaScript · TypeScript · C/C++ · Java · Swift" /><Spec label="FRONTEND & APPLE" value="React · Next.js · Tailwind · SwiftUI · SceneKit · UIKit" /><Spec label="BACKEND & DATA" value="Node.js · Express · REST APIs · JWT · MongoDB · MySQL" /><Spec label="AI & TOOLS" value="OpenAI API · NumPy · Pandas · Matplotlib · Git · Vercel · AWS" /></section>
  <section className="leadership"><p className="section-label">LEADERSHIP & COMMUNITY</p><div><h2>Head of Design <span>— Srijan, SDG Club</span></h2><p>Lead a 10+ person design team for visual identity and outreach; campaigns increased engagement by 40%.</p></div><div><h2>Vice President <span>— Aarvak Technical Society</span></h2><p>Organize technical initiatives, events and mentorship for a growing campus developer community.</p></div><div><h2>Technical Core Member <span>— Career Development Centre</span></h2><p>Curate technical content and support placement-oriented workshops and outreach.</p></div></section>
</article></PageFrame>; }

function Spec({ label, value }: { label: string; value: string }) { return <div className="spec"><span>{label}</span><strong>{value}</strong></div>; }

function Contact() { const [copied, setCopied] = useState(false); const email = "vanshnagpal21@gmail.com"; const copy = async () => { await navigator.clipboard?.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }; return <PageFrame page="contact"><section className="backplate"><div className="engraving"><p>VANSH NAGPAL</p><h1>Designed & engineered in Delhi.</h1><small>AVAILABLE FOR SOFTWARE ENGINEERING & iOS ROLES</small></div><div className="contact-actions"><button onClick={copy}>{copied ? "✓ COPIED TO CLIPBOARD" : "COPY EMAIL"}</button><a href="mailto:vanshnagpal21@gmail.com">EMAIL ↗</a><a href="https://github.com/VanshNagpal10" target="_blank">GITHUB ↗</a><a href="https://www.linkedin.com/in/vanshnagpal27/" target="_blank">LINKEDIN ↗</a><a href="https://x.com/VanshNagpal_27" target="_blank">X / TWITTER ↗</a><a href="/Vansh-SDE.pdf" download>DOWNLOAD RÉSUMÉ ↓</a></div><div className="contact-meta"><span>DELHI · INDIA</span><span>+91 9540599296</span><span>MODEL VN-2026</span></div></section></PageFrame>; }

function PageIntro({ number, eyebrow, title, intro }: { number: string; eyebrow: string; title: string; intro: string }) { return <header className="page-intro"><span className="page-number">{number}</span><p>{eyebrow}</p><h1>{title}</h1><h2>{intro}</h2></header>; }

function PageFrame({ page, children }: { page: PortfolioPage; children: React.ReactNode }) { return <main className="interior"><div className="interior-screen">{children}</div><ShuffleDock page={page} /></main>; }

export default function Portfolio({ page }: { page: PortfolioPage }) {
  const [midnight, setMidnight] = useState(false); const [sfx, setSfx] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = midnight ? "midnight" : "classic"; }, [midnight]);
  const content = useMemo(() => ({ home: <Home />, projects: <Projects />, experience: <Experience />, honors: <Honors />, about: <About />, contact: <Contact /> })[page], [page]);
  return <div className="portfolio"><StatusBar page={page} midnight={midnight} setMidnight={setMidnight} sfx={sfx} setSfx={setSfx} />{content}</div>;
}
