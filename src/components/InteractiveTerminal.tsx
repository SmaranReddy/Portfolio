import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Github, Linkedin, Mail, Send, ExternalLink } from 'lucide-react';

// ── Streaming text ────────────────────────────────────────────────────────────
function StreamingText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); onDone?.(); }
    }, 16);
    return () => clearInterval(id);
  }, [text, onDone]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[6px] h-[1em] ml-0.5 bg-primary/70 align-middle animate-pulse" />
      )}
    </span>
  );
}

// ── Processing dots ───────────────────────────────────────────────────────────
function ProcessingDots() {
  return (
    <span className="inline-flex gap-1 ml-1 align-middle">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
          className="inline-block w-1 h-1 rounded-full bg-primary"
        />
      ))}
    </span>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
type HistoryEntry =
  | { type: 'input';      text: string }
  | { type: 'output';     text: string }
  | { type: 'jsx';        node: React.ReactNode }
  | { type: 'processing' };

// ── Commands ──────────────────────────────────────────────────────────────────
function buildCommands(
  clearHistory: () => void
): Record<string, () => { text?: string; node?: React.ReactNode }> {
  return {
    help: () => ({
      node: (
        <div className="space-y-2.5">
          <div className="text-accent font-bold text-[11px] uppercase tracking-widest mb-1">
            Available Commands
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
            {['about', 'projects', 'skills', 'contact', 'status', 'github', 'joke', 'clear'].map(cmd => (
              <span key={cmd} className="text-primary/80 font-mono text-xs">
                <span className="text-primary/40 mr-1">›</span>{cmd}
              </span>
            ))}
          </div>
        </div>
      ),
    }),
    about: () => ({
      text: 'AI Backend Engineer @ IIIT Raichur. Pre-final year B.Tech CS with a Minor in ML from IIIT Hyderabad. Building RAG systems that actually work in production.',
    }),
    projects: () => ({
      text: '↑ Scroll up to Projects section. RAG Engine (PRJ-001) is the flagship — adaptive retrieval with sub-second latency.',
    }),
    skills: () => ({
      text: 'Top stack: RAG systems · FastAPI · LangChain · PyTorch · FAISS · Docker. Currently deep-diving into LLM serving architecture.',
    }),
    contact: () => ({
      text: 'smaranreddy007@gmail.com  ·  linkedin.com/in/SmaranReddy321  ·  github.com/SmaranReddy',
    }),
    clear: () => { clearHistory(); return {}; },
    joke: () => {
      const jokes = [
        'Why did the RAG system cross the road? It retrieved context from both sides first.',
        "How many AI engineers does it take to change a lightbulb? One — but they'll hallucinate the wattage.",
        "My vector embeddings are 99% accurate. The 1% just decided to live a different life.",
        "I don't have bugs. I have non-deterministic behavior with undefined expected outputs.",
      ];
      return { text: jokes[Math.floor(Math.random() * jokes.length)] };
    },
    status: () => ({
      node: (
        <div className="space-y-1.5">
          <div className="text-accent font-bold text-[11px] uppercase tracking-widest mb-2">
            System Status
          </div>
          {[
            { k: 'Available for',   v: 'AI Eng Internships (2026)' },
            { k: 'Response time',   v: '< 24h'                     },
            { k: 'Collaboration',   v: 'OPEN'                      },
            { k: 'Caffeine level',  v: '87%'                       },
            { k: 'Motivation',      v: '100%'                      },
          ].map(({ k, v }) => (
            <div key={k} className="flex gap-3 text-xs font-mono">
              <span className="text-muted-foreground w-36 shrink-0">{k}</span>
              <span className="text-primary">{v}</span>
            </div>
          ))}
        </div>
      ),
    }),
    github: () => ({ text: '→ github.com/SmaranReddy' }),
  };
}

// ── Contact link card ─────────────────────────────────────────────────────────
function ContactLink({ icon, label, display, href }: {
  icon: React.ReactNode;
  label: string;
  display: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      whileHover={{ x: 6, borderColor: 'rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.04)' }}
      className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 bg-[#080808] transition-all duration-200 group"
    >
      <div className="p-2.5 rounded-lg border border-primary/20 bg-primary/5 text-primary shrink-0 group-hover:bg-primary/12 transition-colors">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">
          {label}
        </div>
        <div className="text-sm font-mono text-foreground group-hover:text-primary transition-colors truncate">
          {display}
        </div>
      </div>
      <ExternalLink size={12} className="ml-auto text-primary/30 group-hover:text-primary/70 transition-colors shrink-0" />
    </motion.a>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function InteractiveTerminal() {
  const [input,        setInput]        = useState('');
  const [history,      setHistory]      = useState<HistoryEntry[]>([
    { type: 'output', text: "System online. Type 'help' for available commands." },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const inputRef  = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const clearHistory = useCallback(() => setHistory([]), []);
  const commands = buildCommands(clearHistory);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd || isProcessing) return;

    setHistory(prev => [...prev, { type: 'input', text: input }, { type: 'processing' }]);
    setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setHistory(prev => {
        const clean = prev.filter(e => e.type !== 'processing');
        if (!commands[cmd]) {
          return [...clean, { type: 'output', text: `command not found: ${cmd}. try 'help'.` }];
        }
        const result = commands[cmd]();
        if (Object.keys(result).length === 0) return [];
        if (result.node) return [...clean, { type: 'jsx', node: result.node }];
        if (result.text) return [...clean, { type: 'output', text: result.text }];
        return clean;
      });
    }, 200 + Math.random() * 250);
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="space-y-2"
        >
          <div className="section-label">Terminal Access</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Get in Touch</h2>
          <p className="text-muted-foreground font-mono text-sm">
            Direct channels open. Interactive CLI also available below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — contact links */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="text-xs font-mono text-primary/50 uppercase tracking-widest mb-5">
              Direct Channels
            </div>

            {[
              { icon: <Mail size={15} />,     label: 'Email',    display: 'smaranreddy007@gmail.com',     href: 'mailto:smaranreddy007@gmail.com'          },
              { icon: <Linkedin size={15} />, label: 'LinkedIn', display: 'linkedin.com/in/SmaranReddy321', href: 'https://linkedin.com/in/SmaranReddy321' },
              { icon: <Github size={15} />,   label: 'GitHub',   display: 'github.com/SmaranReddy',        href: 'https://github.com/SmaranReddy'           },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <ContactLink {...item} />
              </motion.div>
            ))}

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="mt-2 p-5 rounded-xl border border-primary/10 bg-[#080808] font-mono text-xs space-y-3"
            >
              <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-wider text-[11px]">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                />
                Open to Opportunities
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                "Whether it's RAG pipelines, sub-second latency, or why my vector DB has an
                existential crisis — I'm always down to talk."
              </p>
            </motion.div>
          </motion.div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Terminal window */}
            <div className="rounded-xl border border-primary/15 bg-[#060606] overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.06)]">

              {/* Title bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/10 bg-[#050505]">
                <div className="flex gap-1.5">
                  {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.8 }} />
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 text-[10px] font-mono text-muted-foreground">
                  <Terminal size={10} className="text-primary/50" />
                  <span>guest@smaran-portfolio:~</span>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="text-[9px] font-mono text-green-400 font-bold"
                >
                  LIVE
                </motion.div>
              </div>

              {/* Output area */}
              <div
                ref={scrollRef}
                className="h-[340px] overflow-y-auto p-5 space-y-2.5 font-mono text-xs scrollbar-thin"
                onClick={() => inputRef.current?.focus()}
              >
                <AnimatePresence initial={false}>
                  {history.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6, y: 3 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex gap-2"
                    >
                      {entry.type === 'input' && (
                        <>
                          <span className="text-primary font-bold shrink-0 select-none">$</span>
                          <span className="text-foreground">{entry.text}</span>
                        </>
                      )}
                      {entry.type === 'output' && (
                        <span className="text-muted-foreground pl-0">
                          <StreamingText text={entry.text} />
                        </span>
                      )}
                      {entry.type === 'jsx' && (
                        <div className="text-muted-foreground w-full">{entry.node}</div>
                      )}
                      {entry.type === 'processing' && (
                        <span className="text-muted-foreground flex items-center gap-1">
                          processing<ProcessingDots />
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input row */}
              <form
                onSubmit={handleCommand}
                className="px-5 py-3.5 border-t border-primary/8 bg-[#050505] flex items-center gap-3"
              >
                <span className="text-primary font-bold font-mono text-xs shrink-0 select-none">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={isProcessing}
                  className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-xs disabled:opacity-40 placeholder:text-muted-foreground/40"
                  placeholder={isProcessing ? '' : "type 'help'..."}
                  autoFocus
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                  disabled={isProcessing || !input.trim()}
                  className="text-primary/40 hover:text-primary transition-colors disabled:opacity-20"
                >
                  <Send size={12} />
                </motion.button>
              </form>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-[10px] text-center mt-3 text-muted-foreground font-mono"
            >
              Try{' '}
              <span className="text-primary">'status'</span>
              {' '}·{' '}
              <span className="text-primary">'projects'</span>
              {' '}·{' '}
              <span className="text-primary">'joke'</span>
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
