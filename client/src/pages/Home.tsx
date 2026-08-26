/**
 * Peak interaction scrapbook: a maximalist portfolio with local adaptations of scroll expansion,
 * parallax, coverflow, custom cursor, and tactile project controls inspired by 21st.dev references.
 */
import { ArrowDownRight, ArrowUpRight, Award, BriefcaseBusiness, ChevronLeft, ChevronRight, Code2, ExternalLink, GitFork, Github, GraduationCap, Heart, Linkedin, Mail, MapPin, Menu, Phone, Sparkles, Star, Terminal, WandSparkles, X, Zap } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const heroImage = "/manus-storage/aditya-maximal-hero-collage_c38579be.png";
const markImage = "/manus-storage/aditya-maximal-aw-sticker_6f1e066f.png";

const projects = [
  { name: "ALTER", label: "AI DEBUGGING TOOL", copy: "A tool that helps developers find code problems and get AI-based help.", image: "/manus-storage/aditya-maximal-alter_fe0ef7b2.png", color: "pink", tags: ["Python", "Gemini API", "REST APIs"], link: "mailto:waghaditya312@gmail.com?subject=ALTER%20Demo%20Request", cta: "Ask for demo" },
  { name: "DRAGX", label: "DEVELOPER CLI", copy: "An npm tool that makes project setup and common Git tasks faster.", image: "/manus-storage/aditya-maximal-dragx_0a2b2617.png", color: "blue", tags: ["Node.js", "npm", "Git"], link: "https://www.npmjs.com/package/dragx-cli", cta: "See on npm" },
  { name: "PeerLock", label: "PRIVATE WORKSPACE", copy: "A private team workspace for live documents and chat without a central app server.", image: "/manus-storage/aditya-maximal-peerlock_13153ea4.png", color: "lime", tags: ["TypeScript", "Yjs", "WebRTC"], link: "https://github.com/DragAditya/PeerLock-Workspace", cta: "See on GitHub" },
];

const skills = [
  ["CODE", "Python · Java · C++ · JavaScript · TypeScript · SQL", "blue"],
  ["TOOLS", "Git · GitHub · Linux · VS Code · Termux · npm", "pink"],
  ["PLATFORMS", "Google Gemini API · Claude AI · AWS · WebRTC · Yjs", "yellow"],
  ["GOOD AT", "Building useful tools, solving problems, and learning quickly", "lime"],
];

const githubProjects = [
  { name: "ProjectDebugger", display: "ALTER", language: "TypeScript", stars: 2, forks: 3, link: "https://github.com/DragAditya/ProjectDebugger", homepage: "", description: "AI code debugger with Gemini API, Clerk authentication, OAuth, and a modern dark-mode interface.", color: "pink" },
  { name: "GithubAutomation", display: "AutoCommitter", language: "Python", stars: 2, forks: 1, link: "https://github.com/DragAditya/GithubAutomation", homepage: "", description: "A lightweight automation project that uses scheduled workflows to maintain consistent GitHub contributions.", color: "lime" },
  { name: "EchoBot", display: "EchoBot", language: "Python", stars: 2, forks: 0, link: "https://github.com/DragAditya/EchoBot", homepage: "", description: "A minimal Telegram bot built with clean asyncio architecture and python-telegram-bot.", color: "yellow" },
  { name: "CodeScan", display: "CodeScan", language: "JavaScript", stars: 2, forks: 0, link: "https://github.com/DragAditya/CodeScan", homepage: "https://dragaditya.github.io/CodeScan_Advance/", description: "An AI web tool for analyzing code, explaining issues, and scanning projects for actionable fixes.", color: "blue" },
  { name: "DragX-CLI", display: "DragX-CLI", language: "JavaScript", stars: 2, forks: 0, link: "https://github.com/DragAditya/DragX-CLI", homepage: "", description: "A Node.js command-line tool for fast interactive commands, useful utilities, and developer productivity.", color: "pink" },
  { name: "PeerLock-Workspace", display: "PeerLock", language: "TypeScript", stars: 1, forks: 0, link: "https://github.com/DragAditya/PeerLock-Workspace", homepage: "https://peerlock.onrender.com", description: "A local-first collaborative editor with Yjs, IndexedDB, encrypted WebRTC synchronization, and guest rooms.", color: "lime" },
];

function CursorEffect() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 180, damping: 20, mass: .18 });
  const ringY = useSpring(pointerY, { stiffness: 180, damping: 20, mass: .18 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const move = (event: PointerEvent) => { pointerX.set(event.clientX); pointerY.set(event.clientY); setActive(true); };
    const leave = () => setActive(false);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("mouseleave", leave); };
  }, [pointerX, pointerY, reducedMotion]);

  if (reducedMotion) return null;
  return <><motion.span className={`cursor-orbit ${active ? "is-visible" : ""}`} style={{ x: ringX, y: ringY }} aria-hidden="true" /><motion.span className={`cursor-core ${active ? "is-visible" : ""}`} style={{ x: pointerX, y: pointerY }} aria-hidden="true" /></>;
}

function relativePosition(index: number, activeIndex: number, total: number) {
  let position = index - activeIndex;
  if (position > total / 2) position -= total;
  if (position < -total / 2) position += total;
  return position;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRepo, setActiveRepo] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: .25 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroArtworkY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroArtworkScale = useTransform(heroProgress, [0, 1], [1, 1.2]);
  const heroCopyY = useTransform(heroProgress, [0, 1], ["0%", "-13%"]);
  const heroCopyOpacity = useTransform(heroProgress, [0, .78], [1, .1]);
  const currentRepo = githubProjects[activeRepo];
  const goRepo = (direction: number) => setActiveRepo((activeRepo + direction + githubProjects.length) % githubProjects.length);

  return <div className="scrapbook-site has-custom-cursor">
    <CursorEffect />
    <motion.div className="site-scroll-progress" style={{ scaleX: pageProgress }} aria-hidden="true" />
    <header className="scrapbook-header">
      <a href="#home" className="scrapbook-brand" data-cursor><img src={markImage} alt="AW logo" /><span>ADITYA<br />WAGH</span><small>DEV PORTFOLIO<br />2026</small></a>
      <nav className="scrapbook-nav"><a href="#projects" data-cursor>Projects</a><a href="#github" data-cursor>GitHub</a><a href="#skills" data-cursor>Skills</a><a href="#story" data-cursor>My story</a><a href="#contact" data-cursor>Contact</a></nav>
      <a href="mailto:waghaditya312@gmail.com" className="header-sticker" data-cursor>Let&apos;s work <ArrowUpRight size={14} /></a>
      <button onClick={() => setMenuOpen(!menuOpen)} className="scrapbook-menu" aria-label="Open menu" data-cursor>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {menuOpen && <nav className="scrapbook-mobile-nav"><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#github" onClick={() => setMenuOpen(false)}>GitHub</a><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a><a href="#story" onClick={() => setMenuOpen(false)}>My story</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>}

    <main id="home">
      <section ref={heroRef} className="scrapbook-hero hero-expansion">
        <motion.div className="hero-squiggle squiggle-one" animate={reducedMotion ? undefined : { rotate: [0, 5, 0], y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity }}><Sparkles /></motion.div>
        <motion.div className="hero-squiggle squiggle-two" animate={reducedMotion ? undefined : { rotate: [0, -6, 0], y: [0, 7, 0] }} transition={{ duration: 6, repeat: Infinity }}><Star /></motion.div>
        <motion.div className="hero-copy-max" style={{ y: reducedMotion ? 0 : heroCopyY, opacity: reducedMotion ? 1 : heroCopyOpacity }}><p className="tiny-note"><i /> OPEN TO SOFTWARE DEVELOPER ROLES</p><h1>HEY! I&apos;M<br /><span>ADITYA.</span><br />I BUILD<br /><em>USEFUL</em><br />SOFTWARE.</h1><p className="hero-copy-text">I&apos;m an MCA student and software developer from Jalgaon, India. I build AI tools, developer tools, and private team products.</p><div className="hero-buttons"><a href="#projects" data-cursor>CHECK MY WORK <ArrowDownRight size={18} /></a><a href="mailto:waghaditya312@gmail.com" data-cursor>SAY HELLO <ArrowUpRight size={17} /></a></div></motion.div>
        <motion.div className="hero-media-motion" style={{ y: reducedMotion ? 0 : heroArtworkY, scale: reducedMotion ? 1 : heroArtworkScale }}><div className="hero-collage" data-cursor><div className="hero-tape tape-top" /><motion.img src={heroImage} alt="Colourful developer collage" className="hero-art" initial={{ rotate: 4, y: 16, opacity: 0 }} animate={{ rotate: 2, y: 0, opacity: 1 }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }} /><div className="collage-label label-top">★ BUILDING SINCE<br />DAY ONE</div><div className="collage-label label-bottom">AI + CODE +<br />GOOD IDEAS</div><div className="hero-pin"><Zap size={19} /></div></div></motion.div>
        <div className="hero-bottom-row"><span>SCROLL TO EXPAND THE IDEA</span><div className="scroll-arrow">↓</div><span>JALGAON / INDIA <MapPin size={13} /></span></div>
      </section>

      <div className="moving-tape"><div>{["AI TOOLS", "DEVELOPER TOOLS", "PRIVATE WORKSPACES", "GOOD IDEAS", "LET&apos;S BUILD", "AI TOOLS", "DEVELOPER TOOLS", "PRIVATE WORKSPACES", "GOOD IDEAS", "LET&apos;S BUILD"].map((item, i) => <span key={i}><b>✦</b>{item}</span>)}</div></div>

      <section id="projects" className="scrapbook-section projects-max"><div className="section-intro"><p className="mini-tag pink-tag">01 / SELECTED PROJECTS</p><h2>Projects I&apos;ve<br /><span>built.</span></h2><p>Real tools for developers and teams. Each card explains the problem and the stack.</p></div><div className="project-collage-grid">{projects.map((project, i) => <motion.article key={project.name} className={`max-project-card ${project.color}`} data-cursor whileHover={reducedMotion ? undefined : { y: -13, rotate: i === 1 ? -2.5 : 2.5, scale: 1.018 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}><div className="card-paper-tape" /><div className="max-card-top"><span>{project.label}</span><b>0{i + 1}</b></div><div className="project-image-wrap"><img src={project.image} alt={`${project.name} project artwork`} /><span>HOVER TO EXPLORE</span></div><div className="max-project-copy"><h3>{project.name}</h3><p>{project.copy}</p><div className="tag-row">{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</div><a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-cursor>{project.cta} {project.link.startsWith("http") ? <ExternalLink size={14} /> : <ArrowUpRight size={14} />}</a></div></motion.article>)}</div><div className="projects-doodle"><span>build,<br />learn,<br />repeat!</span><WandSparkles size={28} /></div></section>

      <section id="github" className="github-showcase"><div className="github-heading"><div><p className="mini-tag blue-tag">02 / GITHUB PINS</p><h2>More things<br />I&apos;ve <span>made.</span></h2></div><p>Six pinned repositories from <a href="https://github.com/DragAditya" target="_blank" rel="noreferrer" data-cursor>@DragAditya <Github size={14} /></a>. Pick a card to bring it forward.</p></div><div className="coverflow-stage" aria-label="Pinned GitHub repositories">{githubProjects.map((repo, index) => { const position = relativePosition(index, activeRepo, githubProjects.length); const isActive = index === activeRepo; return <motion.button key={repo.name} type="button" className={`coverflow-card ${repo.color} ${isActive ? "is-active" : ""}`} onClick={() => setActiveRepo(index)} aria-pressed={isActive} data-cursor style={{ zIndex: 20 - Math.abs(position) }} animate={{ x: position * 255, scale: isActive ? 1 : Math.abs(position) === 1 ? .79 : .62, y: isActive ? 0 : 30 + Math.abs(position) * 10, rotateY: position * -17, rotateZ: position * 2.5, opacity: Math.abs(position) > 2 ? 0 : isActive ? 1 : .68 }} transition={{ type: "spring", stiffness: 260, damping: 27, mass: .55 }}><span className="repo-card-top"><i />{repo.language}<b>{String(index + 1).padStart(2, "0")}</b></span><strong>{repo.display}</strong><span>{repo.name}</span><div className="repo-card-footer"><Star size={13} /> {repo.stars}<GitFork size={13} /> {repo.forks}</div></motion.button>; })}</div><div className="coverflow-detail"><div className="coverflow-controls"><button type="button" onClick={() => goRepo(-1)} aria-label="Previous GitHub project" data-cursor><ChevronLeft size={18} /></button><span>{String(activeRepo + 1).padStart(2, "0")} / {String(githubProjects.length).padStart(2, "0")}</span><button type="button" onClick={() => goRepo(1)} aria-label="Next GitHub project" data-cursor><ChevronRight size={18} /></button></div><div className="repo-detail-copy"><p>PINNED REPOSITORY / {currentRepo.language}</p><h3>{currentRepo.display}</h3><span>{currentRepo.description}</span></div><div className="repo-detail-actions"><a href={currentRepo.link} target="_blank" rel="noreferrer" data-cursor>Open GitHub <Github size={15} /></a>{currentRepo.homepage && <a href={currentRepo.homepage} target="_blank" rel="noreferrer" data-cursor>Live site <ExternalLink size={15} /></a>}</div></div></section>

      <section id="skills" className="scrapbook-section skills-max"><div className="skills-title"><p className="mini-tag blue-tag">03 / MY TOOLBOX</p><h2>I know my<br /><span>way around.</span></h2><div className="smiley-sticker">:)</div></div><div className="skill-stickers">{skills.map(([label, text, color], index) => <motion.article key={label} className={`skill-sticker ${color}`} data-cursor initial={{ opacity: 0, y: 18, rotate: index % 2 ? 4 : -4 }} whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2 }} whileHover={reducedMotion ? undefined : { y: -10, rotate: 0 }} viewport={{ once: true, amount: .3 }}><span>{label}</span><p>{text}</p><b>{index === 0 ? "⌘" : index === 1 ? "↗" : index === 2 ? "✦" : "♥"}</b></motion.article>)}</div></section>

      <section id="story" className="scrapbook-section story-max"><div className="story-side"><p className="mini-tag lime-tag">04 / A LITTLE ABOUT ME</p><h2>Learning.<br />Building.<br /><span>Doing.</span></h2><p>I learn best by building real things. I like working on software that saves time, solves small frustrations, or makes teamwork easier.</p><div className="mini-photo-note"><img src={markImage} alt="AW mark" /><span>Always<br />curious.</span></div></div><div className="story-timeline"><article className="timeline-note note-blue" data-cursor><span>2025 — 2027</span><GraduationCap size={24} /><h3>Master of Computer Applications</h3><p>RCPET&apos;s IMRD, Shirpur</p><b>CGPA 9.23</b></article><article className="timeline-note note-yellow" data-cursor><span>2022 — 2025</span><GraduationCap size={24} /><h3>Bachelor of Computer Applications</h3><p>Pratap College, Jalgaon</p><b>CGPA 8.93</b></article><article className="timeline-note note-pink" data-cursor><span>2022 — 2025</span><BriefcaseBusiness size={24} /><h3>Business Operations Associate</h3><p>Padmavati Jewellers, Maharashtra</p><b>SERVICE + INVENTORY</b></article><div className="timeline-scribble">↘ keep<br />going</div></div></section>

      <section className="scrapbook-section awards-max"><div className="award-header"><p className="mini-tag yellow-tag">05 / RESULTS + RECOGNITION</p><h2>Awards &<br /><span>learning.</span></h2></div><div className="award-polaroids"><motion.article data-cursor whileHover={reducedMotion ? undefined : { rotate: -3, y: -10, scale: 1.025 }}><div className="award-icon"><Award size={31} /></div><h3>Rank-II Winner</h3><p>Code Carnival 1.0 Hackathon</p><span>2025–26</span></motion.article><motion.article data-cursor whileHover={reducedMotion ? undefined : { rotate: 3, y: -10, scale: 1.025 }}><div className="award-icon"><Award size={31} /></div><h3>CSI Winner</h3><p>Project Competition for DaemonDoc</p><span>2025–26</span></motion.article><motion.article data-cursor whileHover={reducedMotion ? undefined : { rotate: -2, y: -10, scale: 1.025 }}><div className="award-icon"><Heart size={31} /></div><h3>Certificates</h3><p>AWS, Tata Cybersecurity, and BCG X Generative AI</p><span>KEEP LEARNING</span></motion.article></div></section>

      <section id="contact" className="contact-max"><motion.div className="contact-burst" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>LET&apos;S MAKE · SOMETHING · GOOD · LET&apos;S MAKE · SOMETHING · GOOD ·</motion.div><div className="contact-left"><p>06 / SAY HELLO</p><h2>Got an idea?<br /><span>Let&apos;s talk.</span></h2><p>I&apos;m always happy to talk about work, software, or a new idea.</p><a href="mailto:waghaditya312@gmail.com" data-cursor>waghaditya312@gmail.com <ArrowUpRight size={20} /></a></div><div className="contact-sticker-stack"><div className="contact-note" data-cursor><img src={markImage} alt="AW logo" /><span>THANKS<br />FOR STOPPING<br />BY :)</span></div><div className="contact-links"><a href="https://www.linkedin.com/in/dragaditya" target="_blank" rel="noreferrer" data-cursor><Linkedin size={16} /> LinkedIn</a><a href="https://github.com/DragAditya" target="_blank" rel="noreferrer" data-cursor><Github size={16} /> GitHub</a><a href="tel:+918329177017" data-cursor><Phone size={16} /> +91 8329177017</a></div></div></section>
    </main>
    <footer className="scrapbook-footer"><span>MADE WITH CODE + COFFEE + MANY STICKY NOTES</span><span>© 2026 ADITYA WAGH</span><a href="#home" data-cursor>TOP ↑</a></footer>
  </div>;
}
