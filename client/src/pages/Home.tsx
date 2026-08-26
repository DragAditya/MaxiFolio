/**
 * Chromatic Index: a ground-up portfolio system with Swiss editorial structure,
 * index-board layouts, and locally adapted 21st.dev interaction patterns.
 */
import { ArrowDownRight, ArrowUpRight, Award, BriefcaseBusiness, Code2, Download, ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Menu, Network, Package, Sparkles, X, Zap } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { BlurWords, ExpandRow, IndexDock, MagneticAnchor, NumberTicker, SegmentedIndex, SignalMarquee, TiltSurface } from "@/components/index-primitives";

const nav = [["Work", "#work"], ["Index", "#index"], ["Toolbox", "#toolbox"], ["Contact", "#contact"]] as const;

const projects = [
  { id: "01", name: "ALTER", kind: "AI debugging platform", tone: "persimmon", line: "Find the break. Keep the flow.", copy: "A deployed debugging platform that combines automated code analysis, error detection, and real-time AI assistance for multi-language development.", tags: ["Python", "Gemini API", "REST", "Auth"], fact: "AI-enabled analysis", icon: <Sparkles size={18} /> },
  { id: "02", name: "DRAGX", kind: "Developer CLI", tone: "blue", line: "Routine is a scriptable problem.", copy: "An npm-published command-line tool that streamlines Git workflows, project initialization, and developer environment setup.", tags: ["Node", "npm", "Git", "Automation"], fact: "15% workflow lift", icon: <Package size={18} />, link: "https://www.npmjs.com/package/dragx-cli" },
  { id: "03", name: "PeerLock", kind: "P2P workspace", tone: "ink", line: "Collaboration without the surveillance layer.", copy: "A live collaborative workspace for up to ten people. Yjs CRDTs and WebRTC synchronize documents and chat while content stays off an application server.", tags: ["TypeScript", "Yjs", "WebRTC", "IndexedDB"], fact: "Local-first by design", icon: <Network size={18} />, link: "https://github.com/DragAditya/PeerLock-Workspace" },
];

const modes: Record<string, { code: string; title: string; description: string; chips: string[] }> = {
  BUILD: { code: "SYSTEM / 01", title: "Build what removes friction.", description: "I create AI-assisted applications, developer tooling, and dependable product surfaces with a focus on the next useful action.", chips: ["Python", "Java", "TypeScript", "SQL", "REST APIs"] },
  SCALE: { code: "SYSTEM / 02", title: "Scale the part that works.", description: "From cloud patterns to real-time synchronization, I use the right infrastructure to make prototypes survive real usage.", chips: ["AWS", "Gemini API", "WebRTC", "Yjs CRDTs", "Auth"] },
  OPERATE: { code: "SYSTEM / 03", title: "Operate with context.", description: "Software is not an isolated artifact. I bring developer discipline and experience with service, inventory, and business operations into the same frame.", chips: ["Git", "Linux", "npm", "Operations", "Process"] },
};

function Stamp({ children }: { children: React.ReactNode }) { return <span className="index-stamp">{children}</span>; }

export default function Home() {
  const [active, setActive] = useState("work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("01");
  const [mode, setMode] = useState("BUILD");
  const [openLog, setOpenLog] = useState("mca");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: .3 });

  useEffect(() => {
    const ids = nav.map((item) => item[1].slice(1));
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => { const entry = entries.find((current) => current.isIntersecting); if (entry) setActive(entry.target.id); }, { rootMargin: "-45% 0px -45% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const current = projects.find((project) => project.id === selectedProject) ?? projects[0];
  const activeMode = modes[mode];

  return <div className="chromatic-index">
    <motion.div className="index-progress" style={{ scaleX: progress }} aria-hidden="true" />
    <a className="index-skip" href="#work">Skip to work</a>
    <header className="index-header">
      <a href="#top" className="index-brand" aria-label="Aditya Wagh — home"><span className="index-monogram"><i />A<span>W</span></span><span className="index-name">ADITYA<br />WAGH</span><span className="index-edition">INDEX / 2026</span></a>
      <nav className="index-nav" aria-label="Primary navigation">{nav.map(([label, href], index) => <a key={label} href={href} className={active === href.slice(1) ? "is-active" : ""}><small>0{index + 1}</small>{label}</a>)}</nav>
      <MagneticAnchor href="mailto:waghaditya312@gmail.com" className="index-header-action">Start a useful conversation <ArrowUpRight size={15} /></MagneticAnchor>
      <button className="index-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav className="index-mobile-menu" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>{nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowDownRight size={17} /></a>)}</motion.nav>}</AnimatePresence>
    <aside className="index-rail" aria-label="Narrative index"><span className="index-rail-caption">SCENE / 05</span><span className="index-rail-rule" />{nav.map(([label, href], index) => <a key={label} href={href} className={active === href.slice(1) ? "is-active" : ""}><i><b /></i><small>0{index + 1}</small><strong>{label}</strong></a>)}</aside>

    <main id="top">
      <section className="index-hero">
        <div className="index-hero-orbit orbit-a" /><div className="index-hero-orbit orbit-b" />
        <div className="index-hero-meta"><Stamp>AVAILABLE FOR IMPACTFUL WORK</Stamp><span>JALGAON, INDIA <MapPin size={13} /></span></div>
        <div className="index-hero-copy"><p className="index-eyebrow"><b />MCA STUDENT · SOFTWARE BUILDER · OPERATOR</p><h1><BlurWords text="Useful software" delay={.05} /><br /><span className="index-persimmon"><BlurWords text="moves the work" delay={.23} /></span><br /><BlurWords text="forward." delay={.39} /></h1><p className="index-hero-intro">I&apos;m Aditya Wagh. I create practical AI systems, workflow tools, and privacy-first collaborative products that help teams get unstuck.</p><div className="index-hero-actions"><MagneticAnchor href="#work" className="index-primary">Open selected work <ArrowDownRight size={18} /></MagneticAnchor><a href="#index" className="index-quiet-link">Read the index <span>↘</span></a></div></div>
        <aside className="index-signal-machine" aria-label="Portfolio focus board"><div className="machine-top"><span>STATUS</span><b>ACTIVE</b></div><div className="machine-core"><span className="machine-dot" /><span className="machine-cross c1" /><span className="machine-cross c2" /><strong>AW</strong><small>MAKE<br />CLEAR</small></div><div className="machine-bottom"><span>FOCUS</span><b>AI / TOOLS / P2P</b></div></aside>
        <div className="index-hero-footer"><span>SCROLL TO NAVIGATE</span><i /><span>NO. 001 — PERSONAL OPERATING SYSTEM</span></div>
      </section>

      <SignalMarquee items={["AI-POWERED TOOLS", "DEVELOPER EXPERIENCE", "REAL-TIME SYSTEMS", "PRIVACY-FIRST COLLABORATION", "MAKE THE NEXT STEP CLEAR"]} />

      <section id="work" className="index-section index-work"><div className="index-section-top"><p className="index-eyebrow"><b />01 / SELECTED WORK</p><p>Three systems built around the moments where a workflow needs a better answer.</p></div><div className="index-work-heading"><h2>Open the proof,<br />not the pitch.</h2><span className="index-count">03 <small>SYSTEMS</small></span></div>
        <div className="index-project-grid">{projects.map((project) => <TiltSurface key={project.id} className={`index-project-card ${project.tone} ${selectedProject === project.id ? "is-selected" : ""}`} onClick={() => setSelectedProject(project.id)}><div className="project-card-top"><span>{project.id}</span><span>{project.kind}</span></div><div className="project-card-art"><span className="project-shape a" /><span className="project-shape b" /><span className="project-shape c" /><i>{project.icon}</i></div><div className="project-card-bottom"><h3>{project.name}</h3><p>{project.line}</p><button aria-label={`Open ${project.name} proof`}>VIEW <ArrowUpRight size={15} /></button></div></TiltSurface>)}</div>
        <AnimatePresence mode="wait"><motion.article key={current.id} className="index-project-proof" initial={{ opacity: 0, y: 14, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0, y: -10, clipPath: "inset(100% 0 0 0)" }} transition={{ duration: .45, ease: [0.16, 1, .3, 1] }}><div className="proof-index"><span>EXPANDED ENTRY</span><b>{current.id}</b></div><div><p className="index-eyebrow"><b />{current.kind}</p><h3>{current.name}</h3><p>{current.copy}</p></div><div className="proof-side"><div className="proof-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><strong>{current.fact}</strong>{current.link ? <a href={current.link} target="_blank" rel="noreferrer">Open source <ExternalLink size={14} /></a> : <a href="mailto:waghaditya312@gmail.com">Request walkthrough <ArrowUpRight size={14} /></a>}</div></motion.article></AnimatePresence>
      </section>

      <section id="index" className="index-section index-profile"><div className="index-profile-quote"><p className="index-eyebrow"><b />02 / PERSONAL INDEX</p><h2>Build systems<br />that make <span>space</span><br />to think.</h2><p>My approach is direct: understand the obstruction, build the clearest interaction, and keep enough context in the system for people to move with confidence.</p><MagneticAnchor href="mailto:waghaditya312@gmail.com" className="index-outline-action">Work with me <ArrowUpRight size={16} /></MagneticAnchor></div><div className="index-proof-board"><div className="proof-board-header"><span>LIVE INDEX</span><span>UPDATED / 2026</span></div><div className="proof-board-grid"><div className="proof-stat"><b><NumberTicker value={3} /></b><span>production-grade<br />systems featured</span></div><div className="proof-stat blue"><b><NumberTicker value={3} /></b><span>competition & research<br />recognitions</span></div><div className="proof-stat dark"><b><NumberTicker value={9} suffix=".23" /></b><span>MCA<br />CGPA</span></div><div className="proof-stat orange"><b><NumberTicker value={1} /></b><span>npm CLI<br />published</span></div></div><div className="proof-board-note"><Zap size={15} /> FOCUSED ON SOFTWARE THAT EARNS ITS PLACE IN A REAL WORKFLOW.</div></div></section>

      <section id="toolbox" className="index-section index-toolbox"><div className="index-section-top"><p className="index-eyebrow"><b />03 / TOOLBOX</p><p>Methods, platforms, and patterns used in service of an understandable product.</p></div><div className="index-toolbox-layout"><div><h2>A practical<br />technical range.</h2><SegmentedIndex items={Object.keys(modes)} active={mode} onChange={setMode} /></div><motion.article className="index-mode-panel" key={mode} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .35, ease: [0.16, 1, .3, 1] }}><span>{activeMode.code}</span><h3>{activeMode.title}</h3><p>{activeMode.description}</p><div>{activeMode.chips.map((chip) => <i key={chip}>{chip}</i>)}</div></motion.article></div></section>

      <section className="index-section index-log"><div className="index-log-aside"><p className="index-eyebrow"><b />04 / LEARNING LOG</p><h2>Proof<br />of motion.</h2><p>Education, recognition, and operational experience kept in the same working record.</p></div><div className="index-log-rows"><ExpandRow title="Master of Computer Applications" eyebrow="2025—2027 / RCPET'S IMRD, SHIRPUR" open={openLog === "mca"} onToggle={() => setOpenLog(openLog === "mca" ? "" : "mca")}><div className="log-content"><GraduationCap size={22} /><p>Current postgraduate study with a <strong>9.23 CGPA</strong>, focused on applied software development and AI systems.</p><span>NOW IN PROGRESS</span></div></ExpandRow><ExpandRow title="BCA & practical operations" eyebrow="2022—2025 / JALGAON, MAHARASHTRA" open={openLog === "bca"} onToggle={() => setOpenLog(openLog === "bca" ? "" : "bca")}><div className="log-content"><BriefcaseBusiness size={22} /><p>Completed BCA with an <strong>8.93 CGPA</strong> while building firsthand experience in service, inventory, and business operations at Padmavati Jewellers.</p><span>FOUNDATION</span></div></ExpandRow><ExpandRow title="Recognition & credentials" eyebrow="2025—2026 / COMPETITIONS + CERTIFICATIONS" open={openLog === "recognition"} onToggle={() => setOpenLog(openLog === "recognition" ? "" : "recognition")}><div className="log-content"><Award size={22} /><p>Rank-II, Code Carnival 1.0; CSI Project Competition winner for DaemonDoc; Avishkar 2025 research presenter; AWS Solutions Architecture and virtual job simulations from Tata and BCG X.</p><span>DOCUMENTED</span></div></ExpandRow></div></section>

      <section id="contact" className="index-contact"><div className="contact-sticker">AW<br />/ 26</div><p className="index-eyebrow"><b />05 / OPEN CHANNEL</p><h2>Make the next<br />workflow <span>lighter.</span></h2><p>Interested in practical software, developer tools, AI-enabled systems, or a team that values clear thinking? Let&apos;s talk.</p><MagneticAnchor href="mailto:waghaditya312@gmail.com" className="index-contact-email">waghaditya312@gmail.com <ArrowUpRight size={22} /></MagneticAnchor><div className="index-contact-links"><a href="https://www.linkedin.com/in/dragaditya" target="_blank" rel="noreferrer"><Linkedin size={15} />LinkedIn</a><a href="https://github.com/DragAditya" target="_blank" rel="noreferrer"><Github size={15} />GitHub</a><a href="tel:+918329177017"><Mail size={15} />+91 8329177017</a></div></section>
    </main>
    <IndexDock active={active} items={[{ label: "Work", href: "#work", icon: <Code2 size={15} /> }, { label: "Index", href: "#index", icon: <Sparkles size={15} /> }, { label: "Tools", href: "#toolbox", icon: <Zap size={15} /> }, { label: "Contact", href: "#contact", icon: <Mail size={15} /> }]} />
    <footer className="index-footer"><span>© 2026 ADITYA WAGH</span><span>CHROMATIC INDEX / NO. 001</span><a href="#top">TOP <ArrowUpRight size={13} /></a></footer>
  </div>;
}
