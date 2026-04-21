import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Cpu, Rocket, Calendar } from 'lucide-react';

const STATS = [
  { label: 'AI Systems Shipped',      value: '3+',   icon: Rocket,   note: "production-grade RAG pipelines."      },
  { label: 'Internship Availability', value: '2026', icon: Calendar, note: "open for AI Engineering roles."        },
  { label: 'Primary Focus',           value: 'RAG',  icon: Cpu,      note: "retrieval-augmented generation."       },
];

export function AboutSection() {
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
          <div className="section-label">System Identity</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">About</h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
          >
            {/* Operator badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
              Operator: AI Backend Engineer
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Pre-final year B.Tech CS at{' '}
                <span className="text-primary font-mono">IIIT Raichur</span> with a minor in
                Machine Learning from{' '}
                <span className="text-primary font-mono">IIIT Hyderabad</span>.
              </p>
              <p>
                Focused on building RAG systems that have the confidence to say{' '}
                <span className="italic text-accent font-mono">
                  "let me look that up properly"
                </span>{' '}
                instead of hallucinating. I care about systems that actually work in production —
                not just in the demo.
              </p>
            </div>

            {/* Education */}
            <div className="flex flex-col gap-3">
              {[
                {
                  degree: 'B.Tech Computer Science',
                  institution: 'IIIT Raichur',
                  period: '2023 – 2027',
                },
                {
                  degree: 'Minor · Modern Machine Learning',
                  institution: 'IIIT Hyderabad',
                  period: '2025 – 2026',
                },
              ].map(({ degree, institution, period }) => (
                <div key={institution} className="flex items-start gap-3 p-3.5 rounded-lg border border-primary/10 bg-[#080808]">
                  <GraduationCap size={14} className="text-accent shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-foreground font-medium">{degree}</div>
                    <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
                      {institution} <span className="text-primary/40 mx-1">·</span> {period}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground pl-1">
                <MapPin size={13} className="text-accent shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { label: '→  View Projects', href: '#projects' },
                { label: '→  See Skills',    href: '#skills'   },
                { label: '→  Get in Touch',  href: '#contact'  },
              ].map(l => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  whileHover={{ x: 3 }}
                  className="text-xs font-mono text-primary/70 hover:text-primary transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                whileHover={{ x: 6, borderColor: 'rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.03)' }}
                className="flex items-center gap-5 p-5 rounded-xl border border-primary/10 bg-[#080808] transition-all duration-200 cursor-default"
              >
                {/* Value badge */}
                <div className="shrink-0 w-14 h-14 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{s.value}</span>
                </div>

                <div className="min-w-0">
                  <div className="text-xs font-bold text-foreground mb-0.5 leading-snug">
                    {s.label}
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground italic truncate">
                    "{s.note}"
                  </div>
                </div>
              </motion.div>
            ))}

            {/* System uptime card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="p-5 rounded-xl border border-primary/10 bg-[#080808] font-mono text-xs space-y-3"
            >
              <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-wider">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                />
                System Status
              </div>
              {[
                { k: 'Available for',  v: 'AI Eng Internships' },
                { k: 'Collaboration',  v: 'OPEN'               },
                { k: 'Start date',     v: 'Summer 2026'        },
              ].map(({ k, v }) => (
                <div key={k} className="flex justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-primary">{v}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
