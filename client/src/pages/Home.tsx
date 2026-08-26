/**
 * Clean developer portfolio: clear English, fast scanning, modest motion, and project-first content.
 */
import { ArrowUpRight, Award, BriefcaseBusiness, Code2, ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Menu, Phone, Terminal, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    name: "ALTER",
    type: "AI Code Debugging Platform",
    description: "A deployed platform that helps developers find code errors, understand problems, and get AI-based debugging help.",
    stack: ["Python", "Google Gemini API", "REST APIs", "Authentication"],
    outcome: "AI-based code analysis and error help",
    icon: Code2,
    link: "mailto:waghaditya312@gmail.com?subject=ALTER%20Demo%20Request",
    action: "Request demo",
  },
  {
    name: "DRAGX",
    type: "Developer Command-Line Tool",
    description: "An npm-published CLI that helps developers set up projects and complete common Git tasks faster.",
    stack: ["Node.js", "npm", "Git", "Automation"],
    outcome: "Published npm package for common developer tasks",
    icon: Terminal,
    link: "https://www.npmjs.com/package/dragx-cli",
    action: "View on npm",
  },
  {
    name: "PeerLock",
    type: "Private Collaboration Workspace",
    description: "A peer-to-peer workspace where teams can edit documents and chat without storing their content on a central app server.",
    stack: ["TypeScript", "Yjs", "WebRTC", "IndexedDB"],
    outcome: "Local-first collaboration for up to 10 people",
    icon: Github,
    link: "https://github.com/DragAditya/PeerLock-Workspace",
    action: "View on GitHub",
  },
];

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-title"><p>{eyebrow}</p><h2>{title}</h2>{text && <span>{text}</span>}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return <div className="clean-site">
    <header className="clean-header">
      <a href="#home" className="clean-brand"><span className="brand-mark"><i />AW</span><span>ADITYA WAGH<small>AW / 01 · SOFTWARE DEVELOPER</small></span></a>
      <nav className="clean-nav" aria-label="Primary navigation"><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav>
      <a className="header-email" href="mailto:waghaditya312@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
      <button className="clean-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </header>
    {menuOpen && <nav className="clean-mobile-nav"><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>}
    <aside className="simple-index-rail" aria-label="Section navigation"><span>SECTION</span><a href="#projects"><i />01 Projects</a><a href="#skills"><i />02 Skills</a><a href="#experience"><i />03 Experience</a><a href="#contact"><i />04 Contact</a></aside>

    <main>
      <section id="home" className="simple-hero">
        <motion.div className="hero-content" initial="hidden" animate="visible" transition={{ staggerChildren: .1 }}>
          <motion.p variants={fadeUp} className="availability"><i /> Open to software developer opportunities</motion.p>
          <motion.h1 variants={fadeUp}>Hi, I&apos;m Aditya.<br /><span>I build useful software.</span></motion.h1>
          <motion.p variants={fadeUp} className="hero-text">I am an MCA student and software developer from Jalgaon, India. I build AI tools, developer tools, and private collaboration products.</motion.p>
          <motion.div variants={fadeUp} className="hero-actions"><a href="#projects" className="button-primary">See my projects <ArrowUpRight size={17} /></a><a href="mailto:waghaditya312@gmail.com" className="button-secondary">Email me</a></motion.div>
        </motion.div>
        <motion.aside className="hero-summary" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .25, duration: .5 }}><div className="summary-top"><span>QUICK SUMMARY</span><span>2026</span></div><div className="summary-main"><Code2 size={28} /><strong>3</strong><span>main projects<br />featured below</span></div><div className="summary-list"><div><b>Focus</b><span>AI · developer tools · privacy</span></div><div><b>Location</b><span>Jalgaon, India</span></div><div><b>Education</b><span>MCA · 9.23 CGPA</span></div></div></motion.aside>
      </section>

      <section id="projects" className="clean-section projects-section">
        <SectionTitle eyebrow="Selected projects" title="Projects I have built" text="Each project solves a real problem for developers or teams." />
        <div className="project-list">{projects.map((project, index) => { const Icon = project.icon; return <motion.article key={project.name} className="clean-project-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .08 }}><div className="project-number">0{index + 1}</div><div className="project-icon"><Icon size={24} /></div><div className="project-copy"><p>{project.type}</p><h3>{project.name}</h3><span>{project.description}</span><div className="stack-list">{project.stack.map((item) => <i key={item}>{item}</i>)}</div></div><div className="project-proof"><b>PROJECT PROOF</b><span>{project.outcome}</span></div><a className="project-link" href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.action} {project.link.startsWith("http") ? <ExternalLink size={15} /> : <ArrowUpRight size={15} />}</a></motion.article>; })}</div>
      </section>

      <section id="skills" className="clean-section skills-section">
        <SectionTitle eyebrow="Skills" title="My technical skills" text="A practical mix of programming, tools, and platforms." />
        <div className="skills-grid"><article><h3>Languages</h3><p>Python, Java, C++, JavaScript, TypeScript, SQL</p></article><article><h3>Tools</h3><p>Git, GitHub, Linux, VS Code, Termux, npm</p></article><article><h3>Platforms</h3><p>Google Gemini API, Claude AI, AWS, WebRTC, Yjs, IndexedDB</p></article></div>
      </section>

      <section id="experience" className="clean-section experience-section">
        <SectionTitle eyebrow="Experience and education" title="Learning by building" />
        <div className="timeline"><article><div className="timeline-date">2025 — 2027</div><div className="timeline-icon"><GraduationCap size={18} /></div><div><h3>Master of Computer Applications</h3><p>RCPET&apos;s IMRD, Shirpur</p><span>Current CGPA: 9.23</span></div></article><article><div className="timeline-date">2022 — 2025</div><div className="timeline-icon"><GraduationCap size={18} /></div><div><h3>Bachelor of Computer Applications</h3><p>Pratap College — Autonomous, Jalgaon</p><span>CGPA: 8.93</span></div></article><article><div className="timeline-date">2022 — 2025</div><div className="timeline-icon"><BriefcaseBusiness size={18} /></div><div><h3>Business Operations Associate</h3><p>Padmavati Jewellers, Maharashtra</p><span>Customer service, inventory, and day-to-day operations</span></div></article></div>
      </section>

      <section className="clean-section recognition-section"><SectionTitle eyebrow="Recognition" title="Awards and certifications" /><div className="recognition-grid"><article><Award size={20} /><h3>Code Carnival 1.0</h3><p>Rank-II Winner · 2025–26</p></article><article><Award size={20} /><h3>CSI Project Competition</h3><p>Winner for DaemonDoc · 2025–26</p></article><article><Award size={20} /><h3>Certifications</h3><p>AWS Solutions Architecture, Tata Cybersecurity, and BCG X Generative AI</p></article></div></section>

      <section id="contact" className="contact-section-clean"><div><p>CONTACT</p><h2>Let&apos;s build something useful.</h2><span>Have a project, role, or idea to discuss? Feel free to contact me.</span><a className="contact-email-clean" href="mailto:waghaditya312@gmail.com">waghaditya312@gmail.com <ArrowUpRight size={19} /></a></div><div className="contact-details"><a href="https://www.linkedin.com/in/dragaditya" target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a><a href="https://github.com/DragAditya" target="_blank" rel="noreferrer"><Github size={16} />GitHub</a><a href="tel:+918329177017"><Phone size={16} />+91 8329177017</a><span><MapPin size={16} />Jalgaon, India</span></div></section>
    </main>
    <footer className="clean-footer"><span>© 2026 Aditya Wagh</span><a href="#home">Back to top <ArrowUpRight size={13} /></a></footer>
  </div>;
}
