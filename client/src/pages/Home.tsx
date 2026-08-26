/**
 * Chrome Editorial Portfolio: original dark editorial layout with sculptural glass, silver typography, cobalt energy, and atmospheric ASCII.
 */
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Code2, ExternalLink, Github, GitFork, Linkedin, Mail, Menu, MoveUpRight, Phone, Sparkles, Star, Terminal, X, Zap } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const heroChrome = "/manus-storage/aditya-chrome-hero-sculpture_1a87a3c3.png";
const orbitChrome = "/manus-storage/aditya-chrome-orbit-object_21036265.png";
const asciiSignal = "/manus-storage/aditya-chrome-ascii-signal_e0aa6653.png";

const projects = [
  { number: "01", name: "ALTER", label: "AI CODE DEBUGGING", copy: "A deployed AI debugging platform that helps developers understand code errors and take the next step.", tags: ["Python", "Gemini API", "REST"], link: "mailto:waghaditya312@gmail.com?subject=ALTER%20Demo%20Request", cta: "Request demo" },
  { number: "02", name: "DRAGX", label: "DEVELOPER CLI", copy: "An npm command-line tool that makes project setup and common Git work faster.", tags: ["Node.js", "npm", "Git"], link: "https://www.npmjs.com/package/dragx-cli", cta: "View package" },
  { number: "03", name: "PEERLOCK", label: "PRIVATE WORKSPACE", copy: "A local-first team workspace with live documents and chat, built without a central application server.", tags: ["TypeScript", "Yjs", "WebRTC"], link: "https://github.com/DragAditya/PeerLock-Workspace", cta: "Open GitHub" },
];

const repos = [
  { display: "ALTER", name: "ProjectDebugger", language: "TypeScript", stars: 2, forks: 3, link: "https://github.com/DragAditya/ProjectDebugger", homepage: "", description: "AI code debugger with Gemini API, Clerk authentication, OAuth, and a modern developer-first interface." },
  { display: "AutoCommitter", name: "GithubAutomation", language: "Python", stars: 2, forks: 1, link: "https://github.com/DragAditya/GithubAutomation", homepage: "", description: "A lightweight automation project that uses scheduled workflows to maintain consistent GitHub contributions." },
  { display: "EchoBot", name: "EchoBot", language: "Python", stars: 2, forks: 0, link: "https://github.com/DragAditya/EchoBot", homepage: "", description: "A minimal Telegram bot built with clean asyncio architecture and python-telegram-bot." },
  { display: "CodeScan", name: "CodeScan", language: "JavaScript", stars: 2, forks: 0, link: "https://github.com/DragAditya/CodeScan", homepage: "https://dragaditya.github.io/CodeScan_Advance/", description: "An AI web tool for analyzing code, explaining issues, and scanning projects for actionable fixes." },
  { display: "DragX-CLI", name: "DragX-CLI", language: "JavaScript", stars: 2, forks: 0, link: "https://github.com/DragAditya/DragX-CLI", homepage: "", description: "A Node.js command-line tool for fast interactive commands, useful utilities, and developer productivity." },
  { display: "PeerLock", name: "PeerLock-Workspace", language: "TypeScript", stars: 1, forks: 0, link: "https://github.com/DragAditya/PeerLock-Workspace", homepage: "https://peerlock.onrender.com", description: "A local-first collaborative editor with Yjs, IndexedDB, encrypted WebRTC synchronization, and guest rooms." },
];

function relativePosition(index: number, active: number, total: number) { let value = index - active; if (value > total / 2) value -= total; if (value < -total / 2) value += total; return value; }

function ChromeCursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 190, damping: 20, mass: .18 }); const springY = useSpring(y, { stiffness: 190, damping: 20, mass: .18 });
  const [active, setActive] = useState(false);
  useEffect(() => { if (reduce) return; const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setActive(true); }; const leave = () => setActive(false); window.addEventListener("pointermove", move); document.documentElement.addEventListener("mouseleave", leave); return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("mouseleave", leave); }; }, [reduce, x, y]);
  if (reduce) return null;
  return <><motion.i className={`chrome-cursor-ring ${active ? "is-visible" : ""}`} style={{ x: springX, y: springY }} /><motion.i className={`chrome-cursor-dot ${active ? "is-visible" : ""}`} style={{ x, y }} /></>;
}

export default function Home() {
  const [menu, setMenu] = useState(false); const [activeRepo, setActiveRepo] = useState(0);
  const heroRef = useRef<HTMLElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll(); const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 25, mass: .26 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "22%"]); const heroScale = useTransform(heroProgress, [0, 1], [1, 1.28]); const copyY = useTransform(heroProgress, [0, 1], ["0%", "-17%"]);
  const pointerX = useMotionValue(0); const pointerY = useMotionValue(0); const rotateX = useSpring(pointerY, { stiffness: 150, damping: 18, mass: .26 }); const rotateY = useSpring(pointerX, { stiffness: 150, damping: 18, mass: .26 });
  const current = repos[activeRepo]; const step = (direction: number) => setActiveRepo((activeRepo + direction + repos.length) % repos.length);

  return <div className="chrome-site">
    <ChromeCursor /><motion.div className="chrome-scroll-line" style={{ scaleX: progress }} />
    <header className="chrome-header"><a href="#top" className="chrome-brand"><span>AW</span><b>ADITYA WAGH<small>SOFTWARE / SYSTEMS / 2026</small></b></a><nav><a href="#work">Work</a><a href="#github">GitHub</a><a href="#systems">Systems</a><a href="#contact">Contact</a></nav><a className="chrome-header-cta" href="mailto:waghaditya312@gmail.com">Start a project <ArrowUpRight size={14} /></a><button onClick={() => setMenu(!menu)} aria-label="Open menu">{menu ? <X /> : <Menu />}</button></header>
    {menu && <nav className="chrome-mobile-nav"><a href="#work" onClick={() => setMenu(false)}>Work</a><a href="#github" onClick={() => setMenu(false)}>GitHub</a><a href="#systems" onClick={() => setMenu(false)}>Systems</a><a href="#contact" onClick={() => setMenu(false)}>Contact</a></nav>}
    <aside className="chrome-index"><span>INDEX</span><a href="#work"><i />01</a><a href="#github"><i />02</a><a href="#systems"><i />03</a><a href="#contact"><i />04</a></aside>

    <main id="top">
      <section ref={heroRef} className="chrome-hero"><div className="chrome-hero-grid" /><motion.div className="chrome-hero-copy" style={{ y: reduce ? 0 : copyY }}><p><i /> AVAILABLE FOR SOFTWARE ROLES</p><h1>SOFTWARE<br /><span>WITH</span><br />A <em>SIGNAL.</em></h1><div><p>I&apos;m Aditya Wagh. I build AI tools, developer tools, and private collaboration systems that make work clearer.</p><a href="#work">Enter the work <ArrowDownRight size={17} /></a></div></motion.div><motion.div className="chrome-hero-art" onPointerMove={(e) => { if (reduce) return; const r = e.currentTarget.getBoundingClientRect(); pointerX.set(((e.clientX - r.left) / r.width - .5) * 15); pointerY.set(-((e.clientY - r.top) / r.height - .5) * 15); }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} style={{ y: reduce ? 0 : heroY, scale: reduce ? 1 : heroScale, rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY }}><div className="chrome-art-orbit orbit-one" /><div className="chrome-art-orbit orbit-two" /><div className="chrome-art-frame"><img src={heroChrome} alt="Abstract chrome software sculpture" /><div className="chrome-art-glare" /><span>AW / SIGNAL OBJECT</span><b>01</b></div><div className="chrome-art-label"><Sparkles size={15} /> 3D / INTERACTIVE</div></motion.div><div className="chrome-hero-foot"><span>SCROLL TO NAVIGATE</span><i /><span>JALGAON, INDIA</span></div></section>

      <section className="chrome-manifesto"><img src={asciiSignal} alt="Atmospheric ASCII signal texture" /><div><p>00 / EDITORIAL SIGNAL</p><h2>CODE IS A<br /><span>PHYSICAL FEELING.</span></h2><p>Chrome light, quiet data, and clear actions. I treat a product interface as a space people can move through—not a screen they have to fight.</p></div></section>

      <section id="work" className="chrome-work"><div className="chrome-section-head"><p>01 / SELECTED WORK</p><h2>Product<br /><span>objects.</span></h2><small>THREE SYSTEMS / THREE CLEAR JOBS</small></div><div className="chrome-project-grid">{projects.map((project, index) => <motion.article key={project.name} className={`chrome-project project-${index + 1}`} whileHover={reduce ? undefined : { y: -10, rotateX: index === 1 ? -2 : 2, rotateY: index === 1 ? -2 : 2 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}><div className="project-chrome-visual"><span className="project-orb" /><span className="project-plane" /><b>{project.number}</b></div><div className="chrome-project-copy"><p>{project.label}</p><h3>{project.name}</h3><span>{project.copy}</span><div>{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</div><a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.cta} <ArrowUpRight size={15} /></a></div></motion.article>)}</div></section>

      <section id="github" className="chrome-repositories"><div className="repositories-top"><div><p>02 / PINNED GITHUB</p><h2>THE <span>ARCHIVE.</span></h2></div><p>Six pinned repositories from <a href="https://github.com/DragAditya" target="_blank" rel="noreferrer">@DragAditya <Github size={14} /></a>. Choose a system to inspect.</p></div><div className="chrome-coverflow">{repos.map((repo, index) => { const pos = relativePosition(index, activeRepo, repos.length); const selected = activeRepo === index; return <motion.button key={repo.name} type="button" onClick={() => setActiveRepo(index)} className={`chrome-repo-card ${selected ? "is-active" : ""}`} style={{ zIndex: 15 - Math.abs(pos) }} animate={{ x: pos * 270, y: selected ? 0 : 28 + Math.abs(pos) * 12, scale: selected ? 1 : Math.abs(pos) === 1 ? .78 : .6, rotateY: pos * -18, rotateZ: pos * 2, opacity: Math.abs(pos) > 2 ? 0 : selected ? 1 : .52 }} transition={{ type: "spring", stiffness: 240, damping: 25, mass: .65 }}><span><i /> {repo.language}<b>{String(index + 1).padStart(2, "0")}</b></span><strong>{repo.display}</strong><small>{repo.name}</small><div><Star size={13} fill="currentColor" /> {repo.stars} <GitFork size={13} /> {repo.forks}</div></motion.button>; })}</div><div className="chrome-repo-reader"><div><button onClick={() => step(-1)} aria-label="Previous repository"><ChevronLeft /></button><b>{String(activeRepo + 1).padStart(2, "0")} / {String(repos.length).padStart(2, "0")}</b><button onClick={() => step(1)} aria-label="Next repository"><ChevronRight /></button></div><article><p>PINNED REPOSITORY / {current.language}</p><h3>{current.display}</h3><span>{current.description}</span></article><aside><a href={current.link} target="_blank" rel="noreferrer">GitHub <Github size={15} /></a>{current.homepage && <a href={current.homepage} target="_blank" rel="noreferrer">Live site <ExternalLink size={15} /></a>}</aside></div></section>

      <section id="systems" className="chrome-systems"><img src={orbitChrome} alt="Chrome orbital sculpture" /><div className="systems-copy"><p>03 / THE TOOLBOX</p><h2>TOOLS THAT<br /><span>DO THE WORK.</span></h2></div><div className="systems-list"><article><span>01</span><h3>Languages</h3><p>Python, Java, C++, JavaScript, TypeScript, SQL</p></article><article><span>02</span><h3>Platforms</h3><p>Google Gemini API, AWS, WebRTC, Yjs, IndexedDB</p></article><article><span>03</span><h3>Workflow</h3><p>Git, GitHub, Linux, VS Code, Termux, npm</p></article></div></section>

      <section className="chrome-log"><div><p>04 / DEVELOPMENT LOG</p><h2>LEARNING.<br /><span>BUILDING.</span><br />MOVING.</h2></div><div className="chrome-log-lines"><article><span>2025—2027</span><h3>Master of Computer Applications</h3><p>RCPET&apos;s IMRD, Shirpur · Current CGPA 9.23</p></article><article><span>2022—2025</span><h3>Bachelor of Computer Applications</h3><p>Pratap College, Jalgaon · CGPA 8.93</p></article><article><span>2025—2026</span><h3>Recognition</h3><p>Rank-II Code Carnival · CSI Project Winner · AWS, Tata, and BCG X credentials</p></article></div></section>

      <section id="contact" className="chrome-contact"><div className="contact-scan" /><div><p>05 / OPEN CHANNEL</p><h2>MAKE THE<br /><span>NEXT MOVE.</span></h2><a href="mailto:waghaditya312@gmail.com">waghaditya312@gmail.com <ArrowUpRight size={22} /></a></div><aside><span><MoveUpRight size={19} /> AVAILABLE FOR GOOD SYSTEMS</span><a href="https://www.linkedin.com/in/dragaditya" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a><a href="https://github.com/DragAditya" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><a href="tel:+918329177017"><Phone size={15} /> +91 8329177017</a></aside></section>
    </main>
    <footer className="chrome-footer"><span>ADITYA WAGH / CHROME EDITORIAL</span><span>SOFTWARE · SYSTEMS · SIGNAL</span><a href="#top">TOP ↑</a></footer>
  </div>;
}
