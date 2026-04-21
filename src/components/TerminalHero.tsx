import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Cpu } from 'lucide-react';

const STATEMENT =
  "$ Building and deploying systems that don't embarrass themselves in production.";

const SOCIALS = [
  { href: 'https://github.com/SmaranReddy',         Icon: Github,   label: 'GitHub'   },
  { href: 'https://linkedin.com/in/SmaranReddy321', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:smaranreddy007@gmail.com',        Icon: Mail,     label: 'Email'    },
];

const DIAGNOSTICS = [
  { label: 'Memory Leak',    value: 'NULL',      color: 'text-red-400'   },
  { label: 'Async Patterns', value: 'STABLE',    color: 'text-foreground' },
  { label: 'RAG Confidence', value: '98.2%',     color: 'text-primary'   },
  { label: 'Hallucination Rate', value: '0.01%',  color: 'text-primary'   },
];

function useTypewriterOnce(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active || done) return;
    if (displayed.length >= text.length) { setDone(true); return; }
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      28 + Math.random() * 18,
    );
    return () => clearTimeout(t);
  }, [displayed, text, active, done]);

  return { displayed, done };
}

function DiagnosticPanel() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 85) { clearInterval(interval); return 85; }
          return p + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="border border-primary/20 rounded-xl bg-black/40 p-8 flex flex-col gap-6 h-full">
      <p className="font-mono text-[11px] tracking-[0.25em] text-primary/50 uppercase">
        System Diagnostic
      </p>

      <div className="flex flex-col gap-4 flex-1">
        {DIAGNOSTICS.map(({ label, value, color }) => (
          <div key={label} className="flex items-center justify-between gap-6">
            <span className="font-mono text-sm text-muted-foreground whitespace-nowrap">{label}:</span>
            <span className={`font-mono text-sm font-semibold ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
        <p className="font-mono text-xs text-primary/50 text-right">
          Compiling... {progress}%
        </p>
      </div>
    </div>
  );
}

export function TerminalHero() {
  const [started, setStarted] = useState(false);
  const { displayed, done } = useTypewriterOnce(STATEMENT, started);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-16 relative overflow-hidden bg-background">

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/4 blur-[120px] rounded-full" />
      </div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-7xl border border-primary/20 rounded-xl overflow-hidden"
        style={{
          background: 'rgba(10, 10, 10, 0.95)',
          boxShadow: '0 0 0 1px rgba(34,197,94,0.06), 0 32px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 px-7 py-4 border-b border-primary/10 bg-[#0a0a0a]">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 text-center font-mono text-xs tracking-[0.28em] text-muted-foreground uppercase">
            whoami
          </span>
        </div>

        {/* Body: two columns */}
        <div className="flex flex-col md:flex-row gap-12 p-12 md:p-16">

          {/* Left column */}
          <div className="flex-1 flex flex-col gap-7">

            {/* Init line */}
            <p className="font-mono text-sm text-primary tracking-widest uppercase">
              &gt;_ Initializing session...
            </p>

            {/* Name */}
            <h1 className="text-7xl md:text-8xl font-bold text-primary leading-none tracking-tight"
              style={{ textShadow: '0 0 40px rgba(34,197,94,0.35)' }}>
              Smaran Reddy
            </h1>

            {/* Role line */}
            <div className="flex items-center gap-2 text-muted-foreground font-mono text-base">
              <Cpu size={14} className="text-muted-foreground/60" />
              <span>AI Backend Engineer</span>
              <span className="text-primary/40">|</span>
              <span className="text-primary/50">B.Tech CS @ IIIT Raichur</span>
            </div>

            {/* Typewriter statement */}
            <p className="font-mono text-lg md:text-xl text-primary leading-relaxed">
              {displayed}
              <motion.span
                animate={done ? { opacity: [1, 0, 1] } : { opacity: 1 }}
                transition={done ? { duration: 1.1, repeat: Infinity } : {}}
                className="inline-block w-[9px] h-[1em] ml-0.5 bg-primary align-middle"
              />
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIALS.map(({ href, Icon, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  whileHover={{ scale: 1.1, boxShadow: '0 0 14px rgba(34,197,94,0.3)' }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2.5 border border-primary/25 hover:border-primary/60 hover:bg-primary/10 rounded-lg transition-colors text-muted-foreground hover:text-primary"
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right column — diagnostic panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="md:w-96 shrink-0"
          >
            <DiagnosticPanel />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
