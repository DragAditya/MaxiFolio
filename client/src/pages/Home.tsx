/**
 * Peak interaction scrapbook: a maximalist portfolio with local adaptations of scroll expansion,
 * parallax, coverflow, custom cursor, and tactile project controls inspired by 21st.dev references.
 */
import { ArrowDownRight, ArrowUpRight, Award, BriefcaseBusiness, ChevronLeft, ChevronRight, Code2, ExternalLink, GitFork, Github, GraduationCap, Heart, Linkedin, Mail, MapPin, Menu, Phone, Sparkles, Star, Terminal, WandSparkles, X, Zap } from "lucide-react";
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
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

const skillOrbit = ["PY", "JS", "TS", "AI", "GIT", "AWS", "RTC", "YJS"];

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
  const trailOneX = useSpring(pointerX, { stiffness: 96, damping: 22, mass: .48 });
  const trailOneY = useSpring(pointerY, { stiffness: 96, damping: 22, mass: .48 });
  const trailTwoX = useSpring(pointerX, { stiffness: 58, damping: 23, mass: .72 });
  const trailTwoY = useSpring(pointerY, { stiffness: 58, damping: 23, mass: .72 });
  const [active, setActive] = useState(false);
  const [projectMode, setProjectMode] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setActive(true);
      setProjectMode(event.target instanceof Element && Boolean(event.target.closest("[data-cursor-project]")));
    };
    const leave = () => { setActive(false); setProjectMode(false); };
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("mouseleave", leave); };
  }, [pointerX, pointerY, reducedMotion]);

  if (reducedMotion) return null;
  return <>
    <motion.span className={`cursor-trail cursor-trail-one ${active ? "is-visible" : ""}`} style={{ x: trailOneX, y: trailOneY }} aria-hidden="true" />
    <motion.span className={`cursor-trail cursor-trail-two ${active ? "is-visible" : ""}`} style={{ x: trailTwoX, y: trailTwoY }} aria-hidden="true" />
    <motion.span className={`cursor-orbit ${active ? "is-visible" : ""} ${projectMode ? "is-project" : ""}`} style={{ x: ringX, y: ringY }} aria-hidden="true"><span>OPEN ↗</span></motion.span>
    <motion.span className={`cursor-core ${active ? "is-visible" : ""} ${projectMode ? "is-project" : ""}`} style={{ x: pointerX, y: pointerY }} aria-hidden="true" />
  </>;
}

function relativePosition(index: number, activeIndex: number, total: number) {
  let position = index - activeIndex;
  if (position > total / 2) position -= total;
  if (position < -total / 2) position += total;
  return position;
}

function ScenePortal({ label, index, tone }: { label: string; index: string; tone: "pink-blue" | "blue-lime" | "lime-yellow" | "yellow-pink" }) {
  const portalRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: portalRef, offset: ["start end", "end start"] });
  const planeY = useTransform(scrollYProgress, [0, .5, 1], [52, 0, -52]);
  const planeRotateX = useTransform(scrollYProgress, [0, .5, 1], [-38, 0, 38]);
  const planeRotateZ = useTransform(scrollYProgress, [0, .5, 1], [-4, 0, 4]);
  const planeScale = useTransform(scrollYProgress, [0, .5, 1], [.82, 1, .9]);
  const labelX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return <div ref={portalRef} className={`scene-portal ${tone}`} aria-hidden="true"><motion.div className="portal-plane" style={{ y: reducedMotion ? 0 : planeY, rotateX: reducedMotion ? 0 : planeRotateX, rotateZ: reducedMotion ? 0 : planeRotateZ, scale: reducedMotion ? 1 : planeScale }}><span className="portal-card portal-card-one" /><span className="portal-card portal-card-two" /><span className="portal-card portal-card-three" /><motion.b style={{ x: reducedMotion ? 0 : labelX }}>{index} / {label}</motion.b><i>✦</i><em>SCROLL DEPTH</em></motion.div></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRepo, setActiveRepo] = useState(0);
  const [repoInteracting, setRepoInteracting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const repoStageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: .25 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroArtworkY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroArtworkScale = useTransform(heroProgress, [0, 1], [1.03, 1.36]);
  const heroCopyY = useTransform(heroProgress, [0, 1], ["0%", "-21%"]);
  const heroCopyOpacity = useTransform(heroProgress, [0, .78], [1, .1]);
  const heroPointerX = useMotionValue(0);
  const heroPointerY = useMotionValue(0);
  const heroRotateX = useSpring(heroPointerY, { stiffness: 170, damping: 18, mass: .24 });
  const heroRotateY = useSpring(heroPointerX, { stiffness: 170, damping: 18, mass: .24 });
  const carouselInView = useInView(repoStageRef, { amount: .3 });
  const currentRepo = githubProjects[activeRepo];
  const goRepo = (direction: number) => setActiveRepo((activeRepo + direction + githubProjects.length) % githubProjects.length);

  useEffect(() => {
    if (reducedMotion || !carouselInView || repoInteracting) return;
    const autoSwipe = window.setInterval(() => setActiveRepo((index) => (index + 1) % githubProjects.length), 3600);
    return () => window.clearInterval(autoSwipe);
  }, [carouselInView, reducedMotion, repoInteracting]);

  return <div className="scrapbook-site has-custom-cursor">
    <CursorEffect />
    <motion.div className="site-scroll-progress" style={{ scaleX: pageProgress }} aria-hidden="true" />
    <header className="scrapbook-header">
      <a href="#home" className="scrapbook-brand" data-cursor><img src={markImage} alt="AW logo" /><span>ADITYA<br />WAGH</span><small>DEV PORTFOLIO<br />2026</small></a>
      <nav className="scrapbook-nav"><a href="#projects" data-cursor>Projects</a><a href="#github" data-cursor>GitHub</a><a href="#skills" data-cursor>Skills</a><a href="#story" data-cursor>My story</a><a href="#contact" data-cursor>Contact</a></nav>
      <a href="mailto:waghaditya312@gmail.com" className="header-sticker glass-action" data-cursor>Let&apos;s work <ArrowUpRight size={14} /></a>
      <button onClick={() => setMenuOpen(!menuOpen)} className="scrapbook-menu" aria-label="Open menu" data-cursor>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {menuOpen && <nav className="scrapbook-mobile-nav"><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#github" onClick={() => setMenuOpen(false)}>GitHub</a><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a><a href="#story" onClick={() => setMenuOpen(false)}>My story</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>}

    <main id="home">
      <section ref={heroRef} className="scrapbook-hero hero-expansion">
        <motion.div className="hero-squiggle squiggle-one" animate={reducedMotion ? undefined : { rotate: [0, 5, 0], y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity }}><Sparkles /></motion.div>
        <motion.div className="hero-squiggle squiggle-two" animate={reducedMotion ? undefined : { rotate: [0, -6, 0], y: [0, 7, 0] }} transition={{ duration: 6, repeat: Infinity }}><Star /></motion.div>
        <motion.div className="hero-orbit-sticker hero-orbit-one" animate={reducedMotion ? undefined : { x: [0, 13, 0], y: [0, -17, 0], rotate: [0, 17, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true">✦</motion.div>
        <motion.div className="hero-orbit-sticker hero-orbit-two" animate={reducedMotion ? undefined : { x: [0, -12, 0], y: [0, 12, 0], rotate: [0, -25, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true">✳</motion.div>
        <motion.div className="hero-copy-max" style={{ y: reducedMotion ? 0 : heroCopyY, opacity: reducedMotion ? 1 : heroCopyOpacity }}><p className="tiny-note"><i /> OPEN TO SOFTWARE DEVELOPER ROLES</p><h1>HEY! I&apos;M<br /><span>ADITYA.</span><br />I BUILD<br /><em>USEFUL</em><br />SOFTWARE.</h1><p className="hero-copy-text">I&apos;m an MCA student and software developer from Jalgaon, India. I build AI tools, developer tools, and private team products.</p><div className="hero-buttons"><a href="#projects" className="glass-action" data-cursor>CHECK MY WORK <ArrowDownRight size={18} /></a><a href="mailto:waghaditya312@gmail.com" className="glass-action" data-cursor>SAY HELLO <ArrowUpRight size={17} /></a></div></motion.div>
        <motion.div className="hero-media-motion" onPointerMove={(event) => { if (reducedMotion) return; const bounds = event.currentTarget.getBoundingClientRect(); heroPointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 16); heroPointerY.set(-((event.clientY - bounds.top) / bounds.height - .5) * 16); }} onPointerLeave={() => { heroPointerX.set(0); heroPointerY.set(0); }} style={{ y: reducedMotion ? 0 : heroArtworkY, scale: reducedMotion ? 1 : heroArtworkScale, rotateX: reducedMotion ? 0 : heroRotateX, rotateY: reducedMotion ? 0 : heroRotateY }}><div className="hero-chrome-halo" /><div className="hero-collage" data-cursor><div className="hero-tape tape-top" /><motion.img src={heroImage} alt="Colourful developer collage" className="hero-art" initial={{ rotate: 4, y: 16, opacity: 0 }} animate={{ rotate: 2, y: 0, opacity: 1 }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }} /><div className="collage-label label-top">★ BUILDING SINCE<br />DAY ONE</div><div className="collage-label label-bottom">AI + CODE +<br />GOOD IDEAS</div><div className="hero-pin"><Zap size={19} /></div><div className="hero-tilt-chip">3D TILT / ON</div></div></motion.div>
        <div className="hero-bottom-row"><span>SCROLL TO EXPAND THE IDEA</span><div className="scroll-arrow">↓</div><span>JALGAON / INDIA <MapPin size={13} /></span></div>
      </section>

      <div className="moving-tape"><div>{["AI TOOLS", "DEVELOPER TOOLS", "PRIVATE WORKSPACES", "GOOD IDEAS", "LET&apos;S BUILD", "AI TOOLS", "DEVELOPER TOOLS", "PRIVATE WORKSPACES", "GOOD IDEAS", "LET&apos;S BUILD"].map((item, i) => <span key={i}><b>✦</b>{item}</span>)}</div></div>

      <ScenePortal index="01" label="BUILD SURFACE" tone="pink-blue" />
      <section id="projects" className="scrapbook-section projects-max"><motion.div className="project-float project-float-pink" animate={reducedMotion ? undefined : { y: [0, -18, 0], rotate: [0, 16, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true">✦</motion.div><motion.div className="project-float project-float-blue" animate={reducedMotion ? undefined : { y: [0, 15, 0], rotate: [0, -22, 0] }} transition={{ duration: 6.3, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true">✳</motion.div><div className="section-intro"><p className="mini-tag pink-tag">01 / SELECTED PROJECTS</p><h2>Projects I&apos;ve<br /><span>built.</span></h2><p>Real tools for developers and teams. Each card explains the problem and the stack.</p></div><div className="project-collage-grid">{projects.map((project, i) => <motion.article key={project.name} className={`max-project-card ${project.color}`} data-cursor whileHover={reducedMotion ? undefined : { y: -13, rotate: i === 1 ? -2.5 : 2.5, scale: 1.018 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}><div className="card-paper-tape" /><div className="max-card-top"><span>{project.label}</span><b>0{i + 1}</b></div><div className="project-image-wrap"><img src={project.image} alt={`${project.name} project artwork`} /><span>HOVER TO EXPLORE</span></div><div className="max-project-copy"><h3>{project.name}</h3><p>{project.copy}</p><div className="tag-row">{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</div><a className="glass-action project-glass-action" href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-cursor data-cursor-project>{project.cta} {project.link.startsWith("http") ? <ExternalLink size={14} /> : <ArrowUpRight size={14} />}</a></div></motion.article>)}</div><div className="projects-doodle"><span>build,<br />learn,<br />repeat!</span><WandSparkles size={28} /></div></section>

      <ScenePortal index="02" label="OPEN SOURCE" tone="blue-lime" />
      <section id="github" className="github-showcase"><motion.div className="repo-satellite repo-satellite-one" animate={reducedMotion ? undefined : { x: [0, 22, 0], y: [0, -16, 0], rotate: [0, 180, 360] }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} aria-hidden="true">✦</motion.div><motion.div className="repo-satellite repo-satellite-two" animate={reducedMotion ? undefined : { x: [0, -18, 0], y: [0, 18, 0], rotate: [0, -180, -360] }} transition={{ duration: 11, repeat: Infinity, ease: "linear" }} aria-hidden="true">✳</motion.div><div className="github-heading"><div><p className="mini-tag blue-tag">02 / GITHUB PINS</p><h2>More things<br />I&apos;ve <span>made.</span></h2></div><p>Six pinned repositories from <a href="https://github.com/DragAditya" target="_blank" rel="noreferrer" data-cursor>@DragAditya <Github size={14} /></a>. Swipe through the cards or choose one to bring it forward.</p></div><motion.div ref={repoStageRef} className="coverflow-stage" aria-label="Pinned GitHub repositories" onPointerEnter={() => setRepoInteracting(true)} onPointerLeave={() => setRepoInteracting(false)} onFocusCapture={() => setRepoInteracting(true)} onBlurCapture={() => setRepoInteracting(false)} onPanStart={() => setRepoInteracting(true)} onPanEnd={(_, info) => { setRepoInteracting(false); if (Math.abs(info.offset.x) > 45) goRepo(info.offset.x < 0 ? 1 : -1); }} style={{ touchAction: "pan-y" }}>{githubProjects.map((repo, index) => { const position = relativePosition(index, activeRepo, githubProjects.length); const isActive = index === activeRepo; return <motion.button key={repo.name} type="button" className={`coverflow-card ${repo.color} ${isActive ? "is-active" : ""}`} onClick={() => setActiveRepo(index)} aria-pressed={isActive} data-cursor style={{ zIndex: 20 - Math.abs(position) }} animate={{ x: position * 255, scale: isActive ? 1 : Math.abs(position) === 1 ? .79 : .62, y: isActive ? 0 : 30 + Math.abs(position) * 10, rotateY: position * -17, rotateZ: position * 2.5, opacity: Math.abs(position) > 2 ? 0 : isActive ? 1 : .68 }} transition={{ type: "spring", stiffness: 260, damping: 27, mass: .55 }}><span className="repo-card-top"><i />{repo.language}<b>{String(index + 1).padStart(2, "0")}</b></span><strong>{repo.display}</strong><span>{repo.name}</span><div className="repo-card-footer"><Star size={13} /> {repo.stars}<GitFork size={13} /> {repo.forks}</div></motion.button>; })}<motion.div key={activeRepo} className="coverflow-auto-progress" initial={{ scaleX: 0 }} animate={{ scaleX: reducedMotion || repoInteracting ? 0 : 1 }} transition={{ duration: 3.6, ease: "linear" }} aria-hidden="true" /></motion.div><div className="coverflow-detail"><div className="coverflow-controls"><button type="button" onClick={() => goRepo(-1)} aria-label="Previous GitHub project" data-cursor><ChevronLeft size={18} /></button><span>{String(activeRepo + 1).padStart(2, "0")} / {String(githubProjects.length).padStart(2, "0")}</span><button type="button" onClick={() => goRepo(1)} aria-label="Next GitHub project" data-cursor><ChevronRight size={18} /></button><em>{reducedMotion ? "MANUAL" : repoInteracting ? "PAUSED" : "AUTO SWIPE"}</em></div><div className="repo-detail-copy"><p>PINNED REPOSITORY / {currentRepo.language}</p><h3>{currentRepo.display}</h3><span>{currentRepo.description}</span></div><div className="repo-detail-actions"><a href={currentRepo.link} target="_blank" rel="noreferrer" data-cursor>Open GitHub <Github size={15} /></a>{currentRepo.homepage && <a href={currentRepo.homepage} target="_blank" rel="noreferrer" data-cursor>Live site <ExternalLink size={15} /></a>}</div></div></section>

      <ScenePortal index="03" label="TOOL SIGNAL" tone="lime-yellow" />
      <section id="skills" className="scrapbook-section skills-max skills-playground"><div className="skills-title"><p className="mini-tag blue-tag">03 / MY TOOLBOX</p><h2>I know my<br /><span>way around.</span></h2><p className="skills-intro">A small toolkit with a loud output: I like turning useful technologies into things people can actually use.</p><motion.div className="smiley-sticker" animate={reducedMotion ? undefined : { rotate: [11, -9, 11], y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>:)</motion.div><div className="skills-live-note"><i /> LIVE LEARNING MODE</div></div><div className="skills-playground-main"><motion.div className="skills-orbit-zone" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} aria-hidden="true"><div className="orbit-disk"><Code2 size={34} /><span>SKILL<br />GALAXY</span></div>{skillOrbit.map((skill, index) => <motion.span key={skill} className={`orbit-node orbit-node-${index + 1}`} animate={reducedMotion ? undefined : { rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>{skill}</motion.span>)}</motion.div><div className="skill-stickers">{skills.map(([label, text, color], index) => <motion.article key={label} className={`skill-sticker ${color}`} data-cursor initial={{ opacity: 0, y: 30, rotate: index % 2 ? 5 : -5 }} whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2 }} whileHover={reducedMotion ? undefined : { y: -14, rotate: 0, scale: 1.025 }} viewport={{ once: true, amount: .25 }}><span>{label}</span><p>{text}</p><b>{index === 0 ? "⌘" : index === 1 ? "↗" : index === 2 ? "✦" : "♥"}</b><i className="skill-card-corner">0{index + 1}</i></motion.article>)}</div><div className="skill-command-strip"><Terminal size={17} /><span>NOW EXPLORING / BUILDING WITH PEOPLE + TECH</span><b>∞ CURIOUS</b></div><div className="skill-mini-stack"><motion.span animate={reducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, 8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}>FAST<br />LEARNER</motion.span><motion.span animate={reducedMotion ? undefined : { y: [0, 8, 0], rotate: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}>SYSTEM<br />THINKER</motion.span></div></div><div className="skills-stack-rail" aria-hidden="true"><div>{["PYTHON", "TYPESCRIPT", "AI TOOLS", "GIT", "WEBRTC", "AWS", "JAVA", "YJS", "PYTHON", "TYPESCRIPT", "AI TOOLS", "GIT", "WEBRTC", "AWS", "JAVA", "YJS"].map((skill, index) => <span key={index}>✦ {skill}</span>)}</div></div></section>

      <section id="story" className="scrapbook-section story-max"><div className="story-side"><p className="mini-tag lime-tag">04 / A LITTLE ABOUT ME</p><h2>Learning.<br />Building.<br /><span>Doing.</span></h2><p>I learn best by building real things. I like working on software that saves time, solves small frustrations, or makes teamwork easier.</p><div className="mini-photo-note"><img src={markImage} alt="AW mark" /><span>Always<br />curious.</span></div></div><div className="story-timeline"><article className="timeline-note note-blue" data-cursor><span>2025 — 2027</span><GraduationCap size={24} /><h3>Master of Computer Applications</h3><p>RCPET&apos;s IMRD, Shirpur</p><b>CGPA 9.23</b></article><article className="timeline-note note-yellow" data-cursor><span>2022 — 2025</span><GraduationCap size={24} /><h3>Bachelor of Computer Applications</h3><p>Pratap College, Jalgaon</p><b>CGPA 8.93</b></article><article className="timeline-note note-pink" data-cursor><span>2022 — 2025</span><BriefcaseBusiness size={24} /><h3>Business Operations Associate</h3><p>Padmavati Jewellers, Maharashtra</p><b>SERVICE + INVENTORY</b></article><div className="timeline-scribble">↘ keep<br />going</div></div></section>

      <ScenePortal index="04" label="PERSONAL LOG" tone="yellow-pink" />
      <section className="scrapbook-section awards-max"><div className="award-header"><p className="mini-tag yellow-tag">05 / RESULTS + RECOGNITION</p><h2>Awards &<br /><span>learning.</span></h2></div><div className="award-polaroids"><motion.article data-cursor whileHover={reducedMotion ? undefined : { rotate: -3, y: -10, scale: 1.025 }}><div className="award-icon"><Award size={31} /></div><h3>Rank-II Winner</h3><p>Code Carnival 1.0 Hackathon</p><span>2025–26</span></motion.article><motion.article data-cursor whileHover={reducedMotion ? undefined : { rotate: 3, y: -10, scale: 1.025 }}><div className="award-icon"><Award size={31} /></div><h3>CSI Winner</h3><p>Project Competition for DaemonDoc</p><span>2025–26</span></motion.article><motion.article data-cursor whileHover={reducedMotion ? undefined : { rotate: -2, y: -10, scale: 1.025 }}><div className="award-icon"><Heart size={31} /></div><h3>Certificates</h3><p>AWS, Tata Cybersecurity, and BCG X Generative AI</p><span>KEEP LEARNING</span></motion.article></div></section>

      <section id="contact" className="contact-max contact-control-room"><motion.div className="contact-burst" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }}>LET&apos;S MAKE · SOMETHING · GOOD · LET&apos;S MAKE · SOMETHING · GOOD ·</motion.div><motion.div className="contact-orbit contact-orbit-one" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} aria-hidden="true" /><motion.div className="contact-orbit contact-orbit-two" animate={reducedMotion ? undefined : { rotate: -360 }} transition={{ duration: 29, repeat: Infinity, ease: "linear" }} aria-hidden="true" /><div className="contact-lead"><p className="contact-index"><span>06</span> / OPEN CHANNEL</p><h2>GOT A BRIEF?<br /><span>LET&apos;S BUILD.</span></h2><p>I&apos;m happy to talk about software, developer tools, or a new idea worth building.</p><a className="contact-email-action" href="mailto:waghaditya312@gmail.com" data-cursor data-cursor-project><Mail size={19} /><span><small>PRIMARY CHANNEL</small>waghaditya312@gmail.com</span><ArrowUpRight size={21} /></a><div className="contact-signal-row"><span><MapPin size={14} /> JALGAON / INDIA</span><span><i /> OPEN TO ROLES</span><span><Zap size={14} /> AI + DEV TOOLS</span></div></div><div className="contact-control-grid"><motion.article className="contact-identity-card" data-cursor whileHover={reducedMotion ? undefined : { y: -9, rotate: -1.5, scale: 1.015 }} transition={{ type: "spring", stiffness: 250, damping: 21 }}><div className="identity-card-top"><span>AW / BUILDER MODE</span><b>∞</b></div><div className="identity-mark"><img src={markImage} alt="AW logo" /><span>THANKS FOR<br />STOPPING BY.</span></div><p>Build useful things. Stay curious. Keep shipping.</p><i>FIELD NOTE / 2026</i></motion.article><div className="contact-route-grid"><a href="https://www.linkedin.com/in/dragaditya" target="_blank" rel="noreferrer" data-cursor><Linkedin size={18} /><span><small>PROFESSIONAL</small>LinkedIn</span><ArrowUpRight size={16} /></a><a href="https://github.com/DragAditya" target="_blank" rel="noreferrer" data-cursor><Github size={18} /><span><small>CODE ARCHIVE</small>GitHub</span><ArrowUpRight size={16} /></a><a href="tel:+918329177017" data-cursor><Phone size={18} /><span><small>DIRECT LINE</small>+91 8329177017</span><ArrowUpRight size={16} /></a><div className="contact-console"><Terminal size={17} /><span>STATUS / READY FOR THE NEXT BUILD</span><b>●</b></div></div></div></section>
    </main>
    <footer className="scrapbook-footer footer-grid"><span>MADE WITH CODE + COFFEE + MANY STICKY NOTES</span><span>© 2026 ADITYA WAGH</span><a href="#home" data-cursor>RETURN TO TOP <ArrowUpRight size={13} /></a></footer>
  </div>;
}
