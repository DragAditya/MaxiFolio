/**
 * Quiet Precision — fluid edition: Apple-like product storytelling with scene locking,
 * a cobalt orbital index, and 21st-inspired motion primitives tailored to Aditya Wagh’s CV.
 */
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  Cloud,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Network,
  PackageCheck,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BlurInWords, MagneticLink, SpotlightCard } from "@/components/motion-primitives";

const navItems = [
  ["01", "Work", "#work"],
  ["02", "Profile", "#profile"],
  ["03", "Capabilities", "#capabilities"],
  ["04", "Contact", "#contact"],
];

const technicalSkills = ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"];
const toolSkills = ["Git", "GitHub", "Linux", "VS Code", "Termux", "npm"];
const platformSkills = ["Google Gemini API", "Claude AI", "AWS", "WebRTC", "Yjs CRDTs", "IndexedDB"];

function SectionEyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-eyebrow">
      <span className="signal-dot" aria-hidden="true" />
      <span>{index}</span>
      <span className="eyebrow-line" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function ArrowLink({ href, children, dark = false, external = false }: { href: string; children: React.ReactNode; dark?: boolean; external?: boolean }) {
  return (
    <a className={`arrow-link ${dark ? "arrow-link-dark" : ""}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <span>{children}</span>
      <span className="arrow-link-icon">{external ? <ExternalLink size={14} strokeWidth={2.2} /> : <ArrowUpRight size={15} strokeWidth={2.2} />}</span>
    </a>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return <div className="stat-pill"><strong>{value}</strong><span>{label}</span></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const fluidProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.28 });
  const heroVisualY = useTransform(heroProgress, [0, 1], ["0%", "17%"]);
  const heroVisualScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroCopyOpacity = useTransform(heroProgress, [0, 0.78], [1, 0.12]);

  useEffect(() => {
    const sectionNodes = ["work", "profile", "capabilities", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-42% 0px -48% 0px" },
    );
    sectionNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-shell fluid-edition">
      <a href="#main" className="skip-link">Skip to content</a>
      <motion.div className="scroll-meter" style={{ scaleX: fluidProgress }} aria-hidden="true" />

      <header className="topbar">
        <a href="#home" className="brand-lockup" aria-label="Aditya Wagh home">
          <img src="/manus-storage/aditya-orbital-mark_388bdd85.png" alt="" className="brand-mark" />
          <span className="brand-wordmark">ADITYA<br />WAGH</span>
          <span className="brand-index">AW / 02</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([index, label, href]) => (
            <a key={label} className={activeSection === href.slice(1) ? "is-active" : ""} href={href}><small>{index}</small>{label}</a>
          ))}
        </nav>
        <MagneticLink href="mailto:waghaditya312@gmail.com" className="topbar-contact"><span>Let&apos;s talk</span><ArrowUpRight size={16} /></MagneticLink>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        {navItems.map(([index, label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}><small>{index}</small>{label}<ArrowDownRight size={18} /></a>)}
        <a className="mobile-menu-contact" href="mailto:waghaditya312@gmail.com" onClick={() => setMenuOpen(false)}>Start a conversation <ArrowUpRight size={17} /></a>
      </div>

      <aside className="index-rail" aria-label="Portfolio progress">
        <span className="index-rail-label">SCENE / 05</span><span className="index-rail-rule" aria-hidden="true" />
        <div className="index-rail-items">
          {navItems.map(([index, label, href]) => <a key={label} className={activeSection === href.slice(1) ? "is-active" : ""} href={href} aria-label={`Go to ${label}`}><span className="index-rail-orbit"><i /></span><small>{index}</small><b>{label}</b></a>)}
        </div>
      </aside>

      <main id="main">
        <section id="home" ref={heroRef} className="hero-section hero-locked-scene scene-lock">
          <div className="hero-grid-line hero-grid-left" aria-hidden="true" /><div className="hero-grid-line hero-grid-right" aria-hidden="true" />
          <motion.div className="hero-copy" style={{ opacity: heroCopyOpacity }}>
            <div className="hero-kicker"><span className="status-pulse" /> MCA STUDENT · SOFTWARE DEVELOPER · BUILDER</div>
            <h1 className="hero-title hero-title-fluid">
              <BlurInWords delay={0.12} words={["Software", "that", "keeps"]} />
              <span className="hero-title-line"><BlurInWords delay={0.31} words={[<em key="teams">teams</em>, "moving", "."]} /></span>
            </h1>
            <motion.p className="hero-intro" initial={{ opacity: 0, y: 13 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.55 }}>I&apos;m Aditya Wagh. I build production-grade AI tools, developer automation, and privacy-first collaborative systems designed for real use.</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 13 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78, duration: 0.55 }}>
              <MagneticLink href="#work" className="primary-action">Explore selected work <ArrowDownRight size={18} /></MagneticLink>
              <MagneticLink href="mailto:waghaditya312@gmail.com" className="secondary-action">Contact me <ArrowUpRight size={16} /></MagneticLink>
            </motion.div>
          </motion.div>
          <motion.div className="hero-visual" style={{ y: heroVisualY, scale: heroVisualScale }} aria-label="Abstract developer workbench artwork">
            <div className="hero-image-frame"><img src="/manus-storage/aditya-hero-orbital-workbench_a4e0b34c.png" alt="Abstract precision-engineering workbench with a cobalt orbital marker" /></div>
            <div className="hero-orbit-label"><span className="signal-dot" /> OBSERVE / BUILD / ITERATE</div>
            <motion.div className="hero-spec-card" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .72, type: "spring", stiffness: 180, damping: 18 }}><span className="spec-number">03</span><span>Production-grade<br />systems in motion.</span></motion.div>
            <div className="hero-cursor-prompt"><MousePointer2 size={14} /><span>SCROLL TO EXPLORE</span></div>
          </motion.div>
          <div className="hero-footnote"><span>BASED IN</span><strong>Jalgaon, India</strong><span className="footnote-rule" /><span>FOCUS</span><strong>AI · AUTOMATION · PRIVACY</strong></div>
        </section>

        <section id="work" className="work-section section-frame scene-lock">
          <div className="section-header"><SectionEyebrow index="01">Selected systems</SectionEyebrow><p className="section-aside">Three production builds that reduce friction across development, documentation, and collaboration.</p></div>
          <div className="work-intro-grid"><h2>When the system clears,<br />the work can <em>move.</em></h2><div className="work-intro-copy"><p>From debugging to peer-to-peer teamwork, every project begins with an obstructed workflow and ends with a simpler next action.</p><span className="location-label"><MapPin size={15} /> INDIA · 2025–PRESENT</span></div></div>

          <SpotlightCard className="project-card project-card-large">
            <div className="project-content"><div className="project-topline"><span>01 / AI-POWERED DEBUGGING</span><span>LIVE PLATFORM</span></div><h3>ALTER<span className="project-slash">/</span><em> AI Code<br />Debugging</em></h3><p>A deployed AI debugging platform that combines automated code analysis, error detection, and real-time assistance with secure authentication and multi-language support.</p><div className="project-tags"><span>Python</span><span>Gemini API</span><span>REST APIs</span><span>Auth</span></div><ArrowLink href="#contact" dark>Request a walkthrough</ArrowLink></div>
            <div className="project-art project-art-dark"><motion.img whileHover={{ scale: 1.055 }} transition={{ duration: .7, ease: [0.16, 1, .3, 1] }} src="/manus-storage/aditya-project-ai-debugging_069a37ab.png" alt="Abstract visualization of AI-assisted code debugging" /><div className="project-art-caption"><Sparkles size={15} /> AI-ENABLED ANALYSIS</div></div>
          </SpotlightCard>

          <SpotlightCard className="project-card project-card-light">
            <div className="project-art project-art-light"><motion.img whileHover={{ scale: 1.055 }} transition={{ duration: .7, ease: [0.16, 1, .3, 1] }} src="/manus-storage/aditya-project-cli-system_3fcf85de.png" alt="Abstract visualization of command-line workflow automation" /><div className="project-art-caption"><PackageCheck size={15} /> PUBLISHED ON NPM</div></div>
            <div className="project-content"><div className="project-topline"><span>02 / CLI AUTOMATION</span><span>DRAGX</span></div><h3>DRAGX<span className="project-slash">/</span><em> Developer<br />CLI Tool</em></h3><p>A published command-line tool designed to streamline Git workflows, project initialization, and developer environment setup through automation scripting.</p><div className="project-statement"><strong>15%</strong><span>Approximate workflow<br />efficiency improvement</span></div><ArrowLink href="https://www.npmjs.com/package/dragx-cli" external>View npm package</ArrowLink></div>
          </SpotlightCard>

          <SpotlightCard className="project-card project-card-peerlock">
            <div className="project-content"><div className="project-topline"><span>03 / PRIVACY-FIRST COLLABORATION</span><span>LIVE PLATFORM</span></div><h3>PeerLock<span className="project-slash">/</span><em> Workspace</em></h3><p>A live peer-to-peer collaborative editor for up to ten people, using Yjs CRDTs and WebRTC to synchronize documents and chat without storing content on an application server.</p><div className="project-tags"><span>TypeScript</span><span>Yjs CRDTs</span><span>WebRTC</span><span>IndexedDB</span></div><ArrowLink href="https://github.com/DragAditya/PeerLock-Workspace" dark external>Explore on GitHub</ArrowLink></div>
            <div className="peerlock-stage" aria-label="Abstract peer-to-peer network visualization"><div className="peerlock-grid" /><span className="peer-node node-one" /><span className="peer-node node-two" /><span className="peer-node node-three" /><span className="peer-node node-four" /><div className="peer-core"><Network size={27} /><span>LOCAL-FIRST<br />SYNC</span></div><div className="peerline line-one" /><div className="peerline line-two" /><div className="peerline line-three" /><div className="project-art-caption"><ShieldCheck size={15} /> CONTENT STAYS WITH THE TEAM</div></div>
          </SpotlightCard>
        </section>

        <section id="profile" className="profile-section section-frame scene-lock">
          <div className="profile-panel"><div className="profile-panel-top"><SectionEyebrow index="02">The profile</SectionEyebrow><span>ADITYA WAGH / 2026</span></div><div className="profile-statement"><span className="quote-mark">“</span><h2>Useful software is the kind that makes room for people to think.</h2></div><div className="profile-details"><p>I&apos;m pursuing a Master of Computer Applications and independently build software across AI-assisted development, cloud-oriented systems, and privacy-preserving collaboration.</p><a href="#capabilities" className="text-action">More on how I work <ArrowDownRight size={16} /></a></div><div className="profile-seal"><img src="/manus-storage/aditya-orbital-mark_388bdd85.png" alt="" /><span>AW<br />SYSTEMS</span></div></div>
          <div className="achievements-panel"><div className="achievements-title"><Award size={19} /><span>Recognition / <em>selected</em></span></div><div className="achievement-list"><article className="achievement-item"><span className="achievement-index">01</span><div><h3>Rank-II Winner</h3><p>Code Carnival 1.0 Hackathon</p></div><span className="achievement-year">2025–26</span></article><article className="achievement-item"><span className="achievement-index">02</span><div><h3>CSI Project Competition Winner</h3><p>DaemonDoc · AI-powered documentation tool</p></div><span className="achievement-year">2025–26</span></article><article className="achievement-item"><span className="achievement-index">03</span><div><h3>Research Presenter</h3><p>Avishkar 2025 · district-level convention</p></div><span className="achievement-year">2025</span></article></div></div>
        </section>

        <section id="capabilities" className="capability-section section-frame scene-lock">
          <div className="section-header capability-header"><SectionEyebrow index="03">Capabilities</SectionEyebrow><span className="capability-count">03 / 03</span></div>
          <div className="capability-heading-row"><h2>A wide enough lens<br />to see the <em>whole system.</em></h2><p>I pair strong technical foundations with operational awareness, then use modern tools only where they create a clearer result.</p></div>
          <div className="capability-grid"><SpotlightCard className="capability-card"><span className="capability-number">01</span><Code2 size={23} /><h3>Build</h3><p>Creating AI-powered applications, data-driven software, and automation tools with attention to quality and maintainability.</p><div className="skill-list">{technicalSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></SpotlightCard><SpotlightCard className="capability-card capability-card-focus"><span className="capability-number">02</span><Cloud size={23} /><h3>Scale</h3><p>Applying cloud, APIs, authentication, and real-time architecture patterns to turn working prototypes into reliable products.</p><div className="skill-list">{platformSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></SpotlightCard><SpotlightCard className="capability-card capability-card-soft"><span className="capability-number">03</span><Terminal size={23} /><h3>Operate</h3><p>Pairing developer fluency with practical working knowledge of day-to-day business systems, teams, and service.</p><div className="skill-list">{toolSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></SpotlightCard></div>
          <div className="certification-ribbon"><div className="certification-heading"><BadgeCheck size={18} /><span>Credentials / 2025</span></div><div className="certification-list"><span>AWS Solutions Architecture</span><span>Cybersecurity Analyst Job Simulation · Tata</span><span>Generative AI Job Simulation · BCG X</span></div></div>
        </section>

        <section className="timeline-section section-frame scene-lock"><div className="timeline-heading"><SectionEyebrow index="04">Trajectory</SectionEyebrow><h2>Learning the craft.<br /><em>Applying it early.</em></h2></div><div className="timeline-list"><article className="timeline-entry"><div className="timeline-date">2025 — 2027</div><div className="timeline-line"><span /></div><div className="timeline-content"><GraduationCap size={21} /><h3>Master of Computer Applications</h3><p>RCPET&apos;s IMRD, Shirpur</p><span className="timeline-detail">CGPA / 9.23</span></div></article><article className="timeline-entry"><div className="timeline-date">2022 — 2025</div><div className="timeline-line"><span /></div><div className="timeline-content"><GraduationCap size={21} /><h3>Bachelor of Computer Applications</h3><p>Pratap College – Autonomous, Jalgaon</p><span className="timeline-detail">CGPA / 8.93</span></div></article><article className="timeline-entry"><div className="timeline-date">2022 — 2025</div><div className="timeline-line"><span /></div><div className="timeline-content"><BriefcaseBusiness size={21} /><h3>Business Operations Associate</h3><p>Padmavati Jewellers, Maharashtra</p><span className="timeline-detail">SERVICE · INVENTORY · PROCESS</span></div></article></div></section>

        <section id="contact" className="contact-section scene-lock"><div className="contact-grid-line" aria-hidden="true" /><SectionEyebrow index="05">Open for the next system</SectionEyebrow><h2>Have something<br />worth <em>building?</em></h2><p>I&apos;m always interested in thoughtful conversations around software, AI-enabled tools, privacy-first systems, and opportunities to grow with a strong team.</p><MagneticLink href="mailto:waghaditya312@gmail.com" className="contact-email">waghaditya312@gmail.com <ArrowUpRight size={23} /></MagneticLink><div className="contact-meta"><a href="tel:+918329177017"><Phone size={14} /> +91 8329177017</a><a href="https://www.linkedin.com/in/dragaditya" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a><a href="https://github.com/DragAditya" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a></div><div className="contact-orbit"><img src="/manus-storage/aditya-orbital-mark_388bdd85.png" alt="" /></div></section>
      </main>
      <footer className="site-footer"><span className="footer-brand"><img src="/manus-storage/aditya-orbital-mark_388bdd85.png" alt="" />© 2026 ADITYA WAGH <b>AW / 02</b></span><span>DESIGNED FOR CLARITY <i /> BUILT WITH INTENT</span><a href="#home">BACK TO TOP <ArrowUpRight size={13} /></a></footer>
    </div>
  );
}
