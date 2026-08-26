/**
 * Electric Atelier: luxury typography, animated ASCII, glassmorphism, pixel art, and 21st-inspired motion patterns.
 */
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Code2, ExternalLink, Github, GitFork, Linkedin, Mail, Menu, MousePointer2, Play, Sparkles, Star, X, Zap } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const heroVisual = "/manus-storage/aditya-mega-hero-terminal_4914f78f.png";
const pixelRepoVisual = "/manus-storage/aditya-mega-pixel-repo_d595a987.png";
const asciiVisual = "/manus-storage/aditya-mega-ascii-texture_d4bf529f.png";
const alterVisual = "/manus-storage/aditya-maximal-alter_fe0ef7b2.png";
const dragxVisual = "/manus-storage/aditya-maximal-dragx_0a2b2617.png";
const peerlockVisual = "/manus-storage/aditya-maximal-peerlock_13153ea4.png";

const githubProjects = [
  { display: "ALTER", name: "ProjectDebugger", language: "TypeScript", stars: 2, forks: 3, link: "https://github.com/DragAditya/ProjectDebugger", homepage: "", color: "rose", description: "AI code debugger with Gemini API, Clerk authentication, OAuth, and a modern developer-first interface." },
  { display: "AutoCommitter", name: "GithubAutomation", language: "Python", stars: 2, forks: 1, link: "https://github.com/DragAditya/GithubAutomation", homepage: "", color: "acid", description: "A lightweight automation project that uses scheduled workflows to maintain consistent GitHub contributions." },
  { display: "EchoBot", name: "EchoBot", language: "Python", stars: 2, forks: 0, link: "https://github.com/DragAditya/EchoBot", homepage: "", color: "gold", description: "A minimal Telegram bot built with clean asyncio architecture and python-telegram-bot." },
  { display: "CodeScan", name: "CodeScan", language: "JavaScript", stars: 2, forks: 0, link: "https://github.com/DragAditya/CodeScan", homepage: "https://dragaditya.github.io/CodeScan_Advance/", color: "blue", description: "An AI web tool for analyzing code, explaining issues, and scanning projects for actionable fixes." },
  { display: "DragX-CLI", name: "DragX-CLI", language: "JavaScript", stars: 2, forks: 0, link: "https://github.com/DragAditya/DragX-CLI", homepage: "", color: "violet", description: "A Node.js command-line tool for fast interactive commands, useful utilities, and developer productivity." },
  { display: "PeerLock", name: "PeerLock-Workspace", language: "TypeScript", stars: 1, forks: 0, link: "https://github.com/DragAditya/PeerLock-Workspace", homepage: "https://peerlock.onrender.com", color: "cyan", description: "A local-first collaborative editor with Yjs, IndexedDB, encrypted WebRTC synchronization, and guest rooms." },
];

const asciiFrames = [
  "AW:// 010101  [BUILD]  ∿∿∿  DATA\\FLOW  <OPEN>",
  "AW:// 011001  [BUILD]  ≋≋≋  DATA\\FLOW  <OPEN>",
  "AW:// 010111  [BUILD]  ~~~  DATA\\FLOW  <OPEN>",
  "AW:// 011101  [BUILD]  ≈≈≈  DATA\\FLOW  <OPEN>",
];

function relativePosition(index: number, activeIndex: number, total: number) {
  let value = index - activeIndex;
  if (value > total / 2) value -= total;
  if (value < -total / 2) value += total;
  return value;
}

function SmartCursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 190, damping: 19, mass: .18 });
  const ringY = useSpring(y, { stiffness: 190, damping: 19, mass: .18 });
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const move = (event: PointerEvent) => { x.set(event.clientX); y.set(event.clientY); setVisible(true); };
    const over = (event: PointerEvent) => { const element = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor-label]"); setLabel(element?.dataset.cursorLabel ?? ""); };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move); window.addEventListener("pointerover", over); document.documentElement.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); document.documentElement.removeEventListener("mouseleave", leave); };
  }, [reduce, x, y]);
  if (reduce) return null;
  return <><motion.div className={`smart-cursor-ring ${visible ? "is-visible" : ""} ${label ? "has-label" : ""}`} style={{ x: ringX, y: ringY }} aria-hidden="true"><span>{label}</span></motion.div><motion.i className={`smart-cursor-dot ${visible ? "is-visible" : ""}`} style={{ x, y }} aria-hidden="true" /></>;
}

function AnimatedAscii() {
  const [frame, setFrame] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => { if (reduce) return; const timer = window.setInterval(() => setFrame((value) => (value + 1) % asciiFrames.length), 760); return () => window.clearInterval(timer); }, [reduce]);
  return <div className="ascii-terminal" aria-label="Animated code art"><div className="ascii-terminal-bar"><span>LIVE_SYSTEM.TXT</span><i /><i /><i /></div><pre>{asciiFrames[frame]}{"\n"}{"████╗  █     █╗  █████╗  █████╗"}{"\n"}{"█╔══█╗ █ █   █ █ █╔═══█╗ █╔═══█╗"}{"\n"}{"██████╗ █  █ █  █ ██████  ██████"}{"\n"}{"█╔═══█╗ █   ██  █ █╔═══█╗ █╔═══█╗"}{"\n"}{"█║   █║ █    █  █ █║   █║ █║   █║"}{"\n"}{"╚╝   ╚╝ ╚    ╚  ╚ ╚╝   ╚╝ ╚╝   ╚╝"}</pre><div className="ascii-terminal-foot"><span>STATUS: MAKING USEFUL THINGS</span><b>● ONLINE</b></div></div>;
}

function GlassProject({ name, type, description, image, span, href, label }: { name: string; type: string; description: string; image: string; span: string; href: string; label: string }) {
  return <motion.article className={`atelier-project ${span}`} data-cursor-label="OPEN" whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 270, damping: 23 }}><div className="atelier-project-media"><img src={image} alt={`${name} artwork`} /><div className="media-grid" /><span>{type}</span><div className="project-evidence"><b>STATUS</b><i>●</i><span>BUILT / VERIFIED</span><strong>01.26</strong></div></div><div className="atelier-project-copy"><p>SELECTED BUILD</p><h3>{name}</h3><span>{description}</span><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{label} <ArrowUpRight size={15} /></a></div></motion.article>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRepo, setActiveRepo] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const heroTiltX = useSpring(pointerY, { stiffness: 160, damping: 18, mass: .28 });
  const heroTiltY = useSpring(pointerX, { stiffness: 160, damping: 18, mass: .28 });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 27, mass: .28 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  const visualScale = useTransform(heroProgress, [0, .72, 1], [0.86, 1.06, 1.3]);
  const visualY = useTransform(heroProgress, [0, 1], ["5%", "-12%"]);
  const copyY = useTransform(heroProgress, [0, 1], ["0%", "-18%"]);
  const copyOpacity = useTransform(heroProgress, [0, .82], [1, 0]);
  const textureY = useTransform(heroProgress, [0, 1], ["-6%", "14%"]);
  const current = githubProjects[activeRepo];
  const step = (value: number) => setActiveRepo((activeRepo + value + githubProjects.length) % githubProjects.length);

  return <div className="atelier-site">
    <SmartCursor />
    <motion.div className="atelier-progress" style={{ scaleX: progress }} aria-hidden="true" />
    <header className="atelier-header"><a href="#top" className="atelier-brand" data-cursor-label="HOME"><span className="brand-orb">AW</span><span>ADITYA WAGH<small>INTERACTIVE PORTFOLIO / 2026</small></span></a><nav className="atelier-nav"><a href="#work" data-cursor-label="WORK">Work</a><a href="#github" data-cursor-label="CODE">GitHub</a><a href="#systems" data-cursor-label="STACK">Systems</a><a href="#contact" data-cursor-label="HELLO">Contact</a></nav><a href="mailto:waghaditya312@gmail.com" data-cursor-label="EMAIL" className="atelier-cta">Start a conversation <ArrowUpRight size={15} /></a><button className="atelier-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button></header>
    {menuOpen && <nav className="atelier-mobile"><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#github" onClick={() => setMenuOpen(false)}>GitHub</a><a href="#systems" onClick={() => setMenuOpen(false)}>Systems</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>}
    <aside className="atelier-index-rail" aria-label="Portfolio index"><span>SCENES</span><a href="#top" data-cursor-label="INTRO"><i />00</a><a href="#work" data-cursor-label="WORK"><i />01</a><a href="#github" data-cursor-label="GITHUB"><i />02</a><a href="#systems" data-cursor-label="SYSTEMS"><i />03</a><a href="#contact" data-cursor-label="CONTACT"><i />05</a></aside>

    <main id="top">
      <section ref={heroRef} className="atelier-hero"><div className="hero-sticky-stage"><motion.img className="hero-ascii-texture" src={asciiVisual} alt="" style={{ y: reduce ? 0 : textureY }} /><motion.div className="hero-copy" style={{ y: reduce ? 0 : copyY, opacity: reduce ? 1 : copyOpacity }}><p><i /> NEW SYSTEMS, BETTER FLOW</p><h1>I MAKE<br /><span>CODE</span> FEEL<br /><em>ALIVE.</em></h1><div className="hero-copy-foot"><p>Software developer building AI tools, developer tools, and private collaboration systems from Jalgaon, India.</p><a href="#work" data-cursor-label="EXPLORE">Explore the work <ArrowDownRight size={17} /></a></div></motion.div><motion.div className="hero-stage" onPointerMove={(event) => { if (reduce) return; const bounds = event.currentTarget.getBoundingClientRect(); pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 7); pointerY.set(-((event.clientY - bounds.top) / bounds.height - .5) * 7); }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} style={{ y: reduce ? 0 : visualY, scale: reduce ? 1 : visualScale, rotateX: reduce ? 0 : heroTiltX, rotateY: reduce ? 0 : heroTiltY }} data-cursor-label="TILT"><div className="hero-stage-glass"><img src={heroVisual} alt="Abstract 3D terminal with glass interface layers" /><div className="hero-stage-reflection" /><div className="hero-stage-status"><span><i /> ENGINE / ACTIVE</span><b>01—AW</b></div><button type="button" className="stage-play" aria-label="Explore visual detail"><Play size={17} fill="currentColor" /></button></div><div className="hero-float-card card-one"><Sparkles size={16} /> <span>AI-NATIVE<br />BUILDER</span></div><div className="hero-float-card card-two"><MousePointer2 size={16} /> <span>MOVE<br />THROUGH</span></div></motion.div><div className="hero-scroll-note"><span>SCROLL / EXPAND / EXPLORE</span><b>↓</b><span>PORTFOLIO 01</span></div></div></section>

      <section className="ascii-section"><div className="ascii-wrap"><AnimatedAscii /></div><div className="ascii-side"><p>THE SIGNAL</p><h2>TECHNICAL.<br /><span>TACTILE.</span><br />HUMAN.</h2><p>Big ideas deserve interfaces that feel alive. I use motion, code, and product thinking to make the next action clearer.</p></div></section>

      <section id="work" className="atelier-work"><div className="section-kicker"><span>01</span><i /> SELECTED WORK <i /></div><div className="work-heading"><h2>Builds with<br />a little <em>spark.</em></h2><p>Every project starts with a real problem and ends with a simpler workflow.</p></div><div className="atelier-grid"><GlassProject name="ALTER" type="AI CODE DEBUGGING" description="A deployed AI debugging platform that helps developers find errors and understand the next fix." image={alterVisual} span="wide" href="mailto:waghaditya312@gmail.com?subject=ALTER%20Demo%20Request" label="Request a demo" /><GlassProject name="DRAGX" type="DEVELOPER CLI" description="An npm command-line tool for fast project setup and common Git tasks." image={dragxVisual} span="tall" href="https://www.npmjs.com/package/dragx-cli" label="View on npm" /><GlassProject name="PEERLOCK" type="PRIVATE WORKSPACE" description="A local-first real-time workspace with Yjs CRDTs and WebRTC collaboration." image={peerlockVisual} span="standard" href="https://github.com/DragAditya/PeerLock-Workspace" label="Open GitHub" /></div></section>

      <section id="github" className="repo-gallery"><div className="repo-gallery-top"><div><p className="glass-tag">02 / PINNED ON GITHUB</p><h2>Source code<br />in <em>motion.</em></h2></div><p>Use the carousel to browse six verified pinned repositories from <a href="https://github.com/DragAditya" target="_blank" rel="noreferrer" data-cursor-label="PROFILE">@DragAditya <Github size={14} /></a>.</p></div><div className="repo-coverflow" aria-label="Pinned GitHub repositories">{githubProjects.map((repo, index) => { const pos = relativePosition(index, activeRepo, githubProjects.length); const chosen = index === activeRepo; return <motion.button key={repo.name} type="button" data-cursor-label="SELECT" className={`repo-glass-card ${repo.color} ${chosen ? "is-active" : ""}`} aria-pressed={chosen} onClick={() => setActiveRepo(index)} style={{ zIndex: 20 - Math.abs(pos) }} animate={{ x: pos * 288, y: chosen ? 0 : 30 + Math.abs(pos) * 14, rotateY: pos * -18, rotateZ: pos * 2.4, scale: chosen ? 1 : Math.abs(pos) === 1 ? .76 : .58, opacity: Math.abs(pos) > 2 ? 0 : chosen ? 1 : .58 }} transition={{ type: "spring", stiffness: 250, damping: 27, mass: .65 }}><div className="repo-pixel-surface"><img src={pixelRepoVisual} alt="" /><div className="pixel-scan" /></div><div className="repo-glass-meta"><span><i /> {repo.language}</span><b>{String(index + 1).padStart(2, "0")}</b></div><strong>{repo.display}</strong><small>{repo.name}</small><div><Star size={13} fill="currentColor" />{repo.stars}<GitFork size={13} />{repo.forks}</div></motion.button>; })}</div><div className="repo-reader"><div className="reader-controls"><button type="button" data-cursor-label="PREV" onClick={() => step(-1)} aria-label="Previous repository"><ChevronLeft /></button><span>{String(activeRepo + 1).padStart(2, "0")} / {String(githubProjects.length).padStart(2, "0")}</span><button type="button" data-cursor-label="NEXT" onClick={() => step(1)} aria-label="Next repository"><ChevronRight /></button></div><div className="reader-copy"><p>PINNED / {current.language}</p><h3>{current.display}</h3><span>{current.description}</span></div><div className="reader-links"><a href={current.link} target="_blank" rel="noreferrer" data-cursor-label="CODE">GitHub <Github size={15} /></a>{current.homepage && <a href={current.homepage} target="_blank" rel="noreferrer" data-cursor-label="LIVE">Live site <ExternalLink size={15} /></a>}</div></div></section>

      <section id="systems" className="systems-section"><div className="system-orb orb-a" /><div className="system-orb orb-b" /><p className="glass-tag">03 / THE TOOLBOX</p><h2>GOOD TOOLS.<br /><span>GOOD TASTE.</span></h2><div className="system-cards"><article data-cursor-label="CODE"><span>LANGUAGES</span><h3>Python<br />TypeScript<br />JavaScript<br />Java · C++ · SQL</h3><b>01</b></article><article data-cursor-label="TOOLS"><span>PLATFORMS</span><h3>Gemini API<br />AWS · WebRTC<br />Yjs · IndexedDB</h3><b>02</b></article><article data-cursor-label="FLOW"><span>WORKFLOW</span><h3>Git · Linux<br />npm · VS Code<br />Clear systems</h3><b>03</b></article></div><div className="system-marquee"><span>AI TOOLS / PRIVATE COLLABORATION / DEVELOPER EXPERIENCE / AUTOMATION /</span><span>AI TOOLS / PRIVATE COLLABORATION / DEVELOPER EXPERIENCE / AUTOMATION /</span></div></section>

      <section className="signal-log"><div className="signal-log-title"><p>04 / SIGNAL LOG</p><h2>Learning by<br /><em>shipping.</em></h2></div><div className="signal-log-list"><article data-cursor-label="MCA"><span>2025 — 2027</span><strong>Master of Computer Applications</strong><p>RCPET&apos;s IMRD, Shirpur · CGPA 9.23</p></article><article data-cursor-label="BCA"><span>2022 — 2025</span><strong>Bachelor of Computer Applications</strong><p>Pratap College, Jalgaon · CGPA 8.93</p></article><article data-cursor-label="AWARD"><span>2025 — 2026</span><strong>Recognition and progress</strong><p>Rank-II Code Carnival · CSI Project Winner · AWS, Tata, and BCG X credentials</p></article></div></section>

      <section id="contact" className="atelier-contact"><img src={asciiVisual} alt="" /><div className="contact-grid-lines" /><div className="contact-copy"><p>05 / OPEN CHANNEL</p><h2>LET&apos;S MAKE<br />THE NEXT THING<br /><em>MATTER.</em></h2><a href="mailto:waghaditya312@gmail.com" data-cursor-label="EMAIL">waghaditya312@gmail.com <ArrowUpRight size={22} /></a></div><div className="contact-stack"><div className="contact-glass"><Zap size={21} /><span>AVAILABLE FOR<br />GOOD PROBLEMS</span><b>AW<br />26</b></div><div><a href="https://www.linkedin.com/in/dragaditya" target="_blank" rel="noreferrer" data-cursor-label="LINKEDIN"><Linkedin size={16} /> LinkedIn</a><a href="https://github.com/DragAditya" target="_blank" rel="noreferrer" data-cursor-label="GITHUB"><Github size={16} /> GitHub</a><a href="tel:+918329177017" data-cursor-label="CALL"><Mail size={16} /> +91 8329177017</a></div></div></section>
    </main>
    <footer className="atelier-footer"><span>ADITYA WAGH / ELECTRIC ATELIER</span><span>BUILT WITH CODE, ENERGY, AND CARE</span><a href="#top" data-cursor-label="TOP">BACK TO TOP ↑</a></footer>
  </div>;
}
