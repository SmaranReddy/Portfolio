import React, { useState, useEffect } from 'react';
import { TerminalHero }          from './components/TerminalHero';
import { AboutSection }          from './components/AboutSection';
import { ExperienceSection }     from './components/ExperienceSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ProjectsSection }       from './components/ProjectsSection';
import { SkillsSection }         from './components/SkillsSection';
import { InteractiveTerminal }   from './components/InteractiveTerminal';
import { CustomCursor }          from './components/CustomCursor';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Terminal, ExternalLink, Menu, X } from 'lucide-react';

// ── Fixed background layers ──────────────────────────────────────────────
function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary grid */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_40%,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      {/* Floating orbs — CSS keyframes (off JS thread, GPU-composited) */}
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[350px] rounded-full bg-primary/5 blur-[90px] animate-orb-a" />
      <div className="absolute bottom-[20%] right-[8%] w-[450px] h-[350px] rounded-full bg-accent/4 blur-[90px] animate-orb-b" style={{ animationDelay: '5s' }} />
      <div className="absolute top-[60%] left-[45%] w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px] animate-orb-c" style={{ animationDelay: '10s' }} />

      {/* CRT overlay */}
      <div className="absolute inset-0 crt-overlay opacity-[0.025]" />

      {/* Scanline sweep — CSS keyframes */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scanline-sweep" />
    </div>
  );
}

// ── Section divider ──────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 max-w-6xl mx-auto px-6 py-2 opacity-30">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <span className="text-[10px] font-mono text-primary tracking-[0.3em] uppercase">{label}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────
function App() {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id || 'hero'); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'About',    href: '#about'         },
    { label: 'Experience', href: '#experience'  },
    { label: 'Projects', href: '#projects'      },
    { label: 'Skills',   href: '#skills'        },
    { label: 'Contact',  href: '#contact'       },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-foreground relative">
      <CustomCursor />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-primary/60 via-accent to-primary/60 z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* ── Floating pill navbar ─────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto"
      >
        {/* Desktop pill */}
        <div className={`hidden md:flex items-center gap-1 px-4 py-2.5 rounded-full transition-all duration-500 ${
          isScrolled
            ? 'glass border-glow shadow-[0_8px_32px_rgba(34,197,94,0.08)]'
            : 'bg-background/60 backdrop-blur-md border border-primary/15'
        }`}>
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 text-primary font-bold text-sm mr-4 group">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 7 }}
            >
              <Terminal size={16} className="text-primary" />
            </motion.div>
            <span className="text-glow-sm">smaran.dev</span>
          </a>

          {/* Links */}
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`relative px-3 py-1.5 text-xs font-mono rounded-full transition-all duration-200 group ${
                activeSection === link.href.slice(1)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/8'
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                  transition={{ type: 'spring', duration: 0.4 }}
                />
              )}
            </a>
          ))}

          {/* Resume */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://drive.google.com/file/d/1OPi3Z3s3j7o5rdLnXCMCRU_SNuIOwTeG/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/70 transition-all"
          >
            Resume <ExternalLink size={10} />
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3 px-4 py-2.5 rounded-full glass border-glow">
          <a href="#hero" className="flex items-center gap-2 text-primary font-bold text-sm">
            <Terminal size={16} />
            <span>smaran.dev</span>
          </a>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-2 text-primary p-1"
          >
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><X    size={18} /></motion.div>
                : <motion.div key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1,  y: 0  }}
            exit={{    opacity: 0,  y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[280px] glass border-glow rounded-2xl py-4 px-3 flex flex-col gap-1"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1,  x: 0  }}
                transition={{ delay: i * 0.06 }}
                className="px-4 py-2.5 text-sm font-mono text-muted-foreground hover:text-primary hover:bg-primary/8 rounded-xl transition-colors"
              >
                <span className="text-primary/50 text-xs mr-2">0{i + 1}.</span>
                {link.label}
              </motion.a>
            ))}
            <div className="border-t border-primary/10 mt-1 pt-2 px-2">
              <a
                href="https://drive.google.com/file/d/1OPi3Z3s3j7o5rdLnXCMCRU_SNuIOwTeG/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-mono text-primary hover:bg-primary/10 rounded-xl transition-colors"
              >
                Resume <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scene background (fixed) ──────────────────────────────────────── */}
      <SceneBackground />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        <div id="hero">
          <TerminalHero />
        </div>

        <SectionDivider label="sys.identity" />
        <div id="about">
          <AboutSection />
        </div>

        <SectionDivider label="work.log" />
        <div id="experience">
          <ExperienceSection />
        </div>

        <SectionDivider label="mission.log" />
        <div id="projects">
          <ProjectsSection />
        </div>

        <SectionDivider label="neural.map" />
        <div id="skills">
          <SkillsSection />
        </div>

        <SectionDivider label="credentials" />
        <div id="certifications">
          <CertificationsSection />
        </div>

        <SectionDivider label="terminal.access" />
        <div id="contact">
          <InteractiveTerminal />
        </div>
      </motion.main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-primary/8 bg-[#030303] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-500"
            />
            <span>All systems operational · build_v2.0.4</span>
          </div>

          <div>
            © {new Date().getFullYear()} Smaran Reddy ·{' '}
            <span className="text-primary">React + Vite + TypeScript</span>
          </div>

          <div className="flex gap-5">
            {[
              { label: 'Portfolio', href: 'https://smaranreddy.vercel.app' },
              { label: 'GitHub',    href: 'https://github.com/SmaranReddy' },
              { label: 'LinkedIn',  href: 'https://linkedin.com/in/SmaranReddy321' },
              { label: 'Email',     href: 'mailto:smaranreddy007@gmail.com' },
            ].map(l => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -2, color: 'hsl(142 71% 50%)' }}
                className="hover:text-primary transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
