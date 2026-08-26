/**
 * Maximalist Pinterest developer portfolio: colourful collage layers, clear copy, and playful motion.
 */
import { ArrowDownRight, ArrowUpRight, Award, BriefcaseBusiness, Check, Code2, ExternalLink, Github, GraduationCap, Heart, Linkedin, Mail, MapPin, Menu, Phone, Sparkles, Star, Terminal, WandSparkles, X, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="scrapbook-site">
    <header className="scrapbook-header">
      <a href="#home" className="scrapbook-brand"><img src={markImage} alt="AW logo" /><span>ADITYA<br />WAGH</span><small>DEV PORTFOLIO<br />2026</small></a>
      <nav className="scrapbook-nav"><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#story">My story</a><a href="#contact">Contact</a></nav>
      <a href="mailto:waghaditya312@gmail.com" className="header-sticker">Let&apos;s work <ArrowUpRight size={14} /></a>
      <button onClick={() => setMenuOpen(!menuOpen)} className="scrapbook-menu" aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {menuOpen && <nav className="scrapbook-mobile-nav"><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a><a href="#story" onClick={() => setMenuOpen(false)}>My story</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>}

    <main id="home">
      <section className="scrapbook-hero">
        <motion.div className="hero-squiggle squiggle-one" animate={{ rotate: [0, 5, 0], y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity }}><Sparkles /></motion.div>
        <motion.div className="hero-squiggle squiggle-two" animate={{ rotate: [0, -6, 0], y: [0, 7, 0] }} transition={{ duration: 6, repeat: Infinity }}><Star /></motion.div>
        <div className="hero-copy-max"><p className="tiny-note"><i /> OPEN TO SOFTWARE DEVELOPER ROLES</p><h1>HEY! I&apos;M<br /><span>ADITYA.</span><br />I BUILD<br /><em>USEFUL</em><br />SOFTWARE.</h1><p className="hero-copy-text">I&apos;m an MCA student and software developer from Jalgaon, India. I build AI tools, developer tools, and private team products.</p><div className="hero-buttons"><a href="#projects">CHECK MY WORK <ArrowDownRight size={18} /></a><a href="mailto:waghaditya312@gmail.com">SAY HELLO <ArrowUpRight size={17} /></a></div></div>
        <div className="hero-collage"><div className="hero-tape tape-top" /><motion.img src={heroImage} alt="Colourful developer collage" className="hero-art" initial={{ rotate: 4, y: 16, opacity: 0 }} animate={{ rotate: 2, y: 0, opacity: 1 }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }} /><div className="collage-label label-top">★ BUILDING SINCE<br />DAY ONE</div><div className="collage-label label-bottom">AI + CODE +<br />GOOD IDEAS</div><div className="hero-pin"><Zap size={19} /></div></div>
        <div className="hero-bottom-row"><span>SCROLL FOR PROJECTS</span><div className="scroll-arrow">↓</div><span>JALGAON / INDIA <MapPin size={13} /></span></div>
      </section>

      <div className="moving-tape"><div>{["AI TOOLS", "DEVELOPER TOOLS", "PRIVATE WORKSPACES", "GOOD IDEAS", "LET&apos;S BUILD", "AI TOOLS", "DEVELOPER TOOLS", "PRIVATE WORKSPACES", "GOOD IDEAS", "LET&apos;S BUILD"].map((item, i) => <span key={i}><b>✦</b>{item}</span>)}</div></div>

      <section id="projects" className="scrapbook-section projects-max"><div className="section-intro"><p className="mini-tag pink-tag">01 / SELECTED PROJECTS</p><h2>Projects I&apos;ve<br /><span>built.</span></h2><p>Real tools for developers and teams. Each card explains the problem and the stack.</p></div><div className="project-collage-grid">{projects.map((project, i) => <motion.article key={project.name} className={`max-project-card ${project.color}`} whileHover={{ y: -9, rotate: i === 1 ? -1.5 : 1.5 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}><div className="card-paper-tape" /><div className="max-card-top"><span>{project.label}</span><b>0{i + 1}</b></div><img src={project.image} alt={`${project.name} project artwork`} /><div className="max-project-copy"><h3>{project.name}</h3><p>{project.copy}</p><div className="tag-row">{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</div><a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.cta} {project.link.startsWith("http") ? <ExternalLink size={14} /> : <ArrowUpRight size={14} />}</a></div></motion.article>)}</div><div className="projects-doodle"><span>build,<br />learn,<br />repeat!</span><WandSparkles size={28} /></div></section>

      <section id="skills" className="scrapbook-section skills-max"><div className="skills-title"><p className="mini-tag blue-tag">02 / MY TOOLBOX</p><h2>I know my<br /><span>way around.</span></h2><div className="smiley-sticker">:)</div></div><div className="skill-stickers">{skills.map(([label, text, color], index) => <motion.article key={label} className={`skill-sticker ${color}`} initial={{ opacity: 0, y: 18, rotate: index % 2 ? 4 : -4 }} whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2 }} viewport={{ once: true, amount: .3 }}><span>{label}</span><p>{text}</p><b>{index === 0 ? "⌘" : index === 1 ? "↗" : index === 2 ? "✦" : "♥"}</b></motion.article>)}</div></section>

      <section id="story" className="scrapbook-section story-max"><div className="story-side"><p className="mini-tag lime-tag">03 / A LITTLE ABOUT ME</p><h2>Learning.<br />Building.<br /><span>Doing.</span></h2><p>I learn best by building real things. I like working on software that saves time, solves small frustrations, or makes teamwork easier.</p><div className="mini-photo-note"><img src={markImage} alt="AW mark" /><span>Always<br />curious.</span></div></div><div className="story-timeline"><article className="timeline-note note-blue"><span>2025 — 2027</span><GraduationCap size={24} /><h3>Master of Computer Applications</h3><p>RCPET&apos;s IMRD, Shirpur</p><b>CGPA 9.23</b></article><article className="timeline-note note-yellow"><span>2022 — 2025</span><GraduationCap size={24} /><h3>Bachelor of Computer Applications</h3><p>Pratap College, Jalgaon</p><b>CGPA 8.93</b></article><article className="timeline-note note-pink"><span>2022 — 2025</span><BriefcaseBusiness size={24} /><h3>Business Operations Associate</h3><p>Padmavati Jewellers, Maharashtra</p><b>SERVICE + INVENTORY</b></article><div className="timeline-scribble">↘ keep<br />going</div></div></section>

      <section className="scrapbook-section awards-max"><div className="award-header"><p className="mini-tag yellow-tag">04 / RESULTS + RECOGNITION</p><h2>Awards &<br /><span>learning.</span></h2></div><div className="award-polaroids"><motion.article whileHover={{ rotate: -3, y: -7 }}><div className="award-icon"><Award size={31} /></div><h3>Rank-II Winner</h3><p>Code Carnival 1.0 Hackathon</p><span>2025–26</span></motion.article><motion.article whileHover={{ rotate: 3, y: -7 }}><div className="award-icon"><Award size={31} /></div><h3>CSI Winner</h3><p>Project Competition for DaemonDoc</p><span>2025–26</span></motion.article><motion.article whileHover={{ rotate: -2, y: -7 }}><div className="award-icon"><Heart size={31} /></div><h3>Certificates</h3><p>AWS, Tata Cybersecurity, and BCG X Generative AI</p><span>KEEP LEARNING</span></motion.article></div></section>

      <section id="contact" className="contact-max"><motion.div className="contact-burst" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>LET&apos;S MAKE · SOMETHING · GOOD · LET&apos;S MAKE · SOMETHING · GOOD ·</motion.div><div className="contact-left"><p>05 / SAY HELLO</p><h2>Got an idea?<br /><span>Let&apos;s talk.</span></h2><p>I&apos;m always happy to talk about work, software, or a new idea.</p><a href="mailto:waghaditya312@gmail.com">waghaditya312@gmail.com <ArrowUpRight size={20} /></a></div><div className="contact-sticker-stack"><div className="contact-note"><img src={markImage} alt="AW logo" /><span>THANKS<br />FOR STOPPING<br />BY :)</span></div><div className="contact-links"><a href="https://www.linkedin.com/in/dragaditya" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href="https://github.com/DragAditya" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="tel:+918329177017"><Phone size={16} /> +91 8329177017</a></div></div></section>
    </main>
    <footer className="scrapbook-footer"><span>MADE WITH CODE + COFFEE + MANY STICKY NOTES</span><span>© 2026 ADITYA WAGH</span><a href="#home">TOP ↑</a></footer>
  </div>;
}
