/**
 * Quiet Precision design system: a warm editorial field, graphite typography,
 * Signal Cobalt focus markers, and Apple-inspired product-storytelling restraint.
 */
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  ["01", "Work", "#work"],
  ["02", "Profile", "#profile"],
  ["03", "Capabilities", "#capabilities"],
  ["04", "Contact", "#contact"],
];

const technicalSkills = ["Python", "Java", "C++", "JavaScript", "SQL", "Debugging"];
const toolSkills = ["GitHub", "Linux", "VS Code", "Termux", "Gemini", "Codex"];

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

function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <a className={`arrow-link ${dark ? "arrow-link-dark" : ""}`} href={href}>
      <span>{children}</span>
      <span className="arrow-link-icon"><ArrowUpRight size={15} strokeWidth={2.2} /></span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("work");

  useEffect(() => {
    const sectionNodes = ["work", "profile", "capabilities", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sectionNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-shell">
      <a href="#main" className="skip-link">Skip to content</a>

      <header className="topbar">
        <a href="#home" className="brand-lockup" aria-label="Aditya Wagh home">
          <img src="/manus-storage/aditya-orbital-mark_388bdd85.png" alt="" className="brand-mark" />
          <span className="brand-wordmark">ADITYA<br />WAGH</span>
          <span className="brand-index">AW / 01</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([index, label, href]) => (
            <a key={label} className={activeSection === href.slice(1) ? "is-active" : ""} href={href}>
              <small>{index}</small>{label}
            </a>
          ))}
        </nav>
        <a href="mailto:waghaditya312@gmail.com" className="topbar-contact">
          <span>Let&apos;s talk</span><ArrowUpRight size={16} />
        </a>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        {navItems.map(([index, label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}><small>{index}</small>{label}<ChevronRight size={18} /></a>
        ))}
        <a className="mobile-menu-contact" href="mailto:waghaditya312@gmail.com" onClick={() => setMenuOpen(false)}>Start a conversation <ArrowUpRight size={17} /></a>
      </div>

      <aside className="index-rail" aria-label="Portfolio progress">
        <span className="index-rail-label">INDEX / 05</span>
        <span className="index-rail-rule" aria-hidden="true" />
        <div className="index-rail-items">
          {navItems.map(([index, label, href]) => (
            <a key={label} className={activeSection === href.slice(1) ? "is-active" : ""} href={href} aria-label={`Go to ${label}`}>
              <span className="index-rail-orbit"><i /></span><small>{index}</small><b>{label}</b>
            </a>
          ))}
        </div>
      </aside>

      <main id="main">
        <section id="home" className="hero-section">
          <div className="hero-grid-line hero-grid-left" aria-hidden="true" />
          <div className="hero-grid-line hero-grid-right" aria-hidden="true" />
          <div className="hero-copy">
            <div className="hero-kicker reveal"><span className="status-pulse" />MCA STUDENT · DEVELOPER · BUILDER</div>
            <h1 className="hero-title reveal">Turning difficult<br /><em>workflows</em> into<br />clearer systems.</h1>
            <p className="hero-intro reveal">I&apos;m Aditya Wagh, a developer focused on AI-assisted tools, automation, and database-driven software that keeps people moving.</p>
            <div className="hero-actions reveal">
              <a href="#work" className="primary-action">Explore selected work <ArrowDownRight size={18} /></a>
              <a href="mailto:waghaditya312@gmail.com" className="secondary-action">Contact me <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="hero-visual reveal" aria-label="Abstract developer workbench artwork">
            <div className="hero-image-frame">
              <img src="/manus-storage/aditya-hero-orbital-workbench_a4e0b34c.png" alt="Abstract precision-engineering workbench with a cobalt orbital marker" />
            </div>
            <div className="hero-orbit-label"><span className="signal-dot" />OBSERVE / BUILD / ITERATE</div>
            <div className="hero-spec-card">
              <span className="spec-number">01</span>
              <span>Crafting practical<br />software systems.</span>
            </div>
          </div>
          <div className="hero-footnote"><span>BASED IN</span><strong>Jalgaon, India</strong><span className="footnote-rule" /><span>AVAILABLE FOR</span><strong>Opportunities &amp; collaborations</strong></div>
        </section>

        <section id="work" className="work-section section-frame">
          <div className="section-header">
            <SectionEyebrow index="01">Selected work</SectionEyebrow>
            <p className="section-aside">Two systems, each shaped around an unnecessary friction point.</p>
          </div>
          <div className="work-intro-grid">
            <h2>Built for the moment<br />when <em>complexity</em> gets in<br />the way.</h2>
            <div className="work-intro-copy">
              <p>My work sits at the intersection of artificial intelligence, developer experience, and practical automation. I like problems with a real person on the other side.</p>
              <span className="location-label"><MapPin size={15} /> INDIA · 2025–PRESENT</span>
            </div>
          </div>

          <article className="project-card project-card-large">
            <div className="project-content">
              <div className="project-topline"><span>01 / AI-ASSISTED DEVELOPMENT</span><span>2025</span></div>
              <h3>ALTER<span className="project-slash">/</span><em> AI Code<br />Debugging Platform</em></h3>
              <p>AI-powered debugging assistance that combines error analysis, authentication, and multi-language support into a more direct path from issue to insight.</p>
              <div className="project-tags"><span>Google Gemini API</span><span>Error detection</span><span>Multi-language</span></div>
              <ArrowLink href="https://github.com/dragaditya" dark>Explore on GitHub</ArrowLink>
            </div>
            <div className="project-art project-art-dark">
              <img src="/manus-storage/aditya-project-ai-debugging_069a37ab.png" alt="Abstract visualization of AI-assisted code debugging" />
              <div className="project-art-caption"><Sparkles size={15} /> AI-ENABLED ANALYSIS</div>
            </div>
          </article>

          <article className="project-card project-card-light">
            <div className="project-art project-art-light">
              <img src="/manus-storage/aditya-project-cli-system_3fcf85de.png" alt="Abstract visualization of command-line workflow automation" />
              <div className="project-art-caption"><Terminal size={15} /> DEVELOPER AUTOMATION</div>
            </div>
            <div className="project-content">
              <div className="project-topline"><span>02 / COMMAND-LINE TOOLING</span><span>2025</span></div>
              <h3>DRAGX<span className="project-slash">/</span><em> Developer<br />CLI Tool</em></h3>
              <p>A command-line tool built to keep Git workflows, project initialization, and developer setup from becoming repetitive work.</p>
              <div className="project-statement"><strong>15%</strong><span>Reported workflow<br />efficiency improvement</span></div>
              <ArrowLink href="https://github.com/dragaditya">Explore on GitHub</ArrowLink>
            </div>
          </article>
        </section>

        <section id="profile" className="profile-section section-frame">
          <div className="profile-panel">
            <div className="profile-panel-top"><SectionEyebrow index="02">The profile</SectionEyebrow><span>ADITYA WAGH / 2026</span></div>
            <div className="profile-statement"><span className="quote-mark">“</span><h2>The good kind of software gets out of the way.</h2></div>
            <div className="profile-details">
              <p>I&apos;m pursuing a Master of Computer Applications with a focus on building software that is useful beyond the demo. My foundation spans Python, Java, C++, cloud computing, automation, and AI-powered solutions.</p>
              <a href="#capabilities" className="text-action">More on how I work <ArrowDownRight size={16} /></a>
            </div>
            <div className="profile-seal">
              <img src="/manus-storage/aditya-orbital-mark_388bdd85.png" alt="" />
              <span>AW<br />SYSTEMS</span>
            </div>
          </div>

          <div className="achievements-panel">
            <div className="achievements-title"><Award size={19} /><span>Recognition / <em>selected</em></span></div>
            <div className="achievement-list">
              <article className="achievement-item"><span className="achievement-index">01</span><div><h3>Rank-II Winner</h3><p>Code Carnival 1.0 Hackathon</p></div><span className="achievement-year">2025–26</span></article>
              <article className="achievement-item"><span className="achievement-index">02</span><div><h3>CSI Project Competition Winner</h3><p>DaemonDoc · intelligent documentation &amp; productivity</p></div><span className="achievement-year">2025–26</span></article>
              <article className="achievement-item"><span className="achievement-index">03</span><div><h3>Research Presenter</h3><p>Avishkar 2025 · District-level research convention</p></div><span className="achievement-year">2025</span></article>
            </div>
          </div>
        </section>

        <section id="capabilities" className="capability-section section-frame">
          <div className="section-header capability-header">
            <SectionEyebrow index="03">Capabilities</SectionEyebrow>
            <span className="capability-count">02 / 03</span>
          </div>
          <div className="capability-heading-row"><h2>A wide enough lens<br />to see the <em>whole system.</em></h2><p>I pair technical problem-solving with operational awareness, giving ideas a better chance of working in the real world.</p></div>
          <div className="capability-grid">
            <article className="capability-card"><span className="capability-number">01</span><Code2 size={23} /><h3>Build</h3><p>Developing software, automation tools, and AI-powered solutions with durable technical fundamentals.</p><div className="skill-list">{technicalSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>
            <article className="capability-card capability-card-focus"><span className="capability-number">02</span><Terminal size={23} /><h3>Operate</h3><p>Understanding day-to-day systems: customer needs, inventory, suppliers, and the small decisions that keep a business moving.</p><div className="skill-list">{toolSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>
            <article className="capability-card capability-card-soft"><span className="capability-number">03</span><Sparkles size={23} /><h3>Collaborate</h3><p>Bringing curiosity, clear communication, and adaptive thinking to complex or unfamiliar problems.</p><div className="skill-list"><span>Problem solving</span><span>Teamwork</span><span>Leadership</span><span>Quick learning</span></div></article>
          </div>
        </section>

        <section className="timeline-section section-frame">
          <div className="timeline-heading"><SectionEyebrow index="04">Trajectory</SectionEyebrow><h2>Learning the craft.<br /><em>Applying it early.</em></h2></div>
          <div className="timeline-list">
            <article className="timeline-entry"><div className="timeline-date">2025 — 2027</div><div className="timeline-line"><span /></div><div className="timeline-content"><GraduationCap size={21} /><h3>Master of Computer Applications</h3><p>RCPET&apos;s IMRD, Shirpur</p><span className="timeline-detail">CGPA / 9.23</span></div></article>
            <article className="timeline-entry"><div className="timeline-date">2022 — 2025</div><div className="timeline-line"><span /></div><div className="timeline-content"><GraduationCap size={21} /><h3>Bachelor of Computer Applications</h3><p>Pratap College – Autonomous, Jalgaon</p><span className="timeline-detail">CGPA / 8.93</span></div></article>
            <article className="timeline-entry"><div className="timeline-date">2022 — ONGOING</div><div className="timeline-line"><span /></div><div className="timeline-content"><BriefcaseBusiness size={21} /><h3>Business Operations Associate</h3><p>Padmavati Jewellers, Maharashtra</p><span className="timeline-detail">SALES · INVENTORY · SERVICE</span></div></article>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-grid-line" aria-hidden="true" />
          <SectionEyebrow index="05">Open for the next problem</SectionEyebrow>
          <h2>Have something<br />worth <em>building?</em></h2>
          <p>I&apos;m always interested in thoughtful conversations around software, AI-enabled tools, and opportunities to grow with a strong team.</p>
          <a href="mailto:waghaditya312@gmail.com" className="contact-email">waghaditya312@gmail.com <ArrowUpRight size={23} /></a>
          <div className="contact-meta">
            <a href="tel:+918329177017"><Phone size={14} /> +91 8329177017</a>
            <a href="https://www.linkedin.com/in/dragaditya" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a>
            <a href="https://github.com/dragaditya" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
          </div>
          <div className="contact-orbit"><img src="/manus-storage/aditya-orbital-mark_388bdd85.png" alt="" /></div>
        </section>
      </main>

      <footer className="site-footer"><span className="footer-brand"><img src="/manus-storage/aditya-orbital-mark_388bdd85.png" alt="" />© 2026 ADITYA WAGH <b>AW / 01</b></span><span>DESIGNED FOR CLARITY <i /> BUILT WITH INTENT</span><a href="#home">BACK TO TOP <ArrowUpRight size={13} /></a></footer>
    </div>
  );
}
