import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import { BulletList, MetricStrip, StackTag, type Metric } from './WorkShared';

// ── Project data ──────────────────────────────────────────────────────────────
type Project = {
  id: string;
  code: string;
  period: string;
  highlight: string;
  highlightStyle: string;
  name: string;
  subtitle: string;
  keyPoints: string[];
  metrics: Metric[];
  stack: string[];
  github: string;
  demo: string | null;
  border: string;
  glow: string;
  accentLine: string;
};

// Reverse chronological order.
const PROJECTS: Project[] = [
  {
    id:             'orchestrix',
    code:           'PRJ-002',
    period:         'April 2026 – May 2026',
    highlight:      'Distributed Systems',
    highlightStyle: 'text-green-400 bg-green-500/10 border-green-500/20',
    name:           'Orchestrix',
    subtitle:       'Distributed AI Workload Orchestration Platform',
    keyPoints: [
      'Built a distributed task orchestration platform using FastAPI, Redis, and Python workers, supporting **1–4 concurrent workers** with **atomic task claiming** and **lease-based crash recovery**.',
      'Implemented fault-tolerant processing with **3 retries, exponential backoff, jitter**, scheduled retries, and **DLQ replay**, validated through **185 automated tests** with real Redis and PostgreSQL.',
      'Benchmarked 100-task workloads, scaling throughput from **30.9 to 130.7 tasks/sec (~4.2x)** across 1–4 workers while achieving **656 ms P95 latency** at 4 workers.',
    ],
    metrics: [
      { value: '30.9 → 130.7', label: 'tasks/sec, 1 → 4 workers (~4.2x) · 100-task benchmark' },
      { value: '656 ms',       label: 'P95 latency at 4 workers' },
      { value: '185',          label: 'automated tests with real Redis & PostgreSQL' },
    ],
    stack:       ['Python', 'FastAPI', 'Redis'],
    // Repository name is spelled "Ochestrix" on GitHub (link taken from resume).
    github:      'https://github.com/SmaranReddy/Ochestrix',
    demo:        null,
    border:      'border-green-500/20',
    glow:        'rgba(34,197,94,0.1)',
    accentLine:  'from-green-500/40 via-green-500/20 to-transparent',
  },
  {
    id:             'scholarmind',
    code:           'PRJ-001',
    period:         'August 2025 – October 2025',
    highlight:      'Caching & Search',
    highlightStyle: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    name:           'ScholarMind',
    subtitle:       'High-Performance Search & Caching Backend',
    keyPoints: [
      'Engineered a **three-level caching architecture**, reducing P50 latency from **26.4 seconds to under 5 ms** for **70% of requests**.',
      'Implemented **retry, backoff, and fallback** mechanisms to improve resilience during retrieval failures.',
      'Built an automated benchmarking pipeline across **30 test cases**, improving response quality from **7.4 to 8.33/10 (+12.6%)**.',
    ],
    metrics: [
      { value: '26.4 s → <5 ms', label: 'P50 latency for 70% of requests' },
      { value: '7.4 → 8.33',     label: 'response quality /10 (+12.6%) · 30 test cases' },
    ],
    // Stack verified against the repository README.
    stack:       ['Python', 'FastAPI', 'Pinecone'],
    github:      'https://github.com/SmaranReddy/Scholar_mind',
    demo:        null,
    border:      'border-purple-500/20',
    glow:        'rgba(139,92,246,0.08)',
    accentLine:  'from-purple-500/40 via-purple-500/20 to-transparent',
  },
];

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
      className={`relative flex border ${project.border} bg-[#070707] rounded-2xl overflow-hidden transition-transform duration-200`}
      style={{ boxShadow: `0 0 20px ${project.glow}` }}
    >
      {/* Left accent line */}
      <div className={`w-[3px] shrink-0 bg-gradient-to-b ${project.accentLine}`} />

      <div className="flex flex-col lg:flex-row flex-1 gap-6 p-5 sm:p-7 min-w-0">

        {/* Left — title / metrics / key points */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[10px] font-mono">
            <span className="text-muted-foreground">{project.code}</span>
            <span className="text-primary/20">·</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar size={10} className="text-accent" />
              {project.period}
            </span>
            <span className={`sm:ml-auto text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${project.highlightStyle}`}>
              {project.highlight}
            </span>
          </div>

          <div>
            <h3 className="text-[22px] md:text-[26px] font-bold text-foreground leading-tight">{project.name}</h3>
            <p className="text-[14px] font-mono text-primary mt-1">{project.subtitle}</p>
          </div>

          <MetricStrip metrics={project.metrics} />

          <BulletList items={project.keyPoints} />
        </div>

        {/* Right — stack + CTAs */}
        <div className="flex flex-col gap-4 lg:w-44 shrink-0 justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(t => <StackTag key={t} label={t} />)}
          </div>

          <div className="flex lg:flex-col gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg border border-primary/25 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all"
            >
              <Github size={12} /> GitHub
            </motion.a>
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/18 transition-all"
              >
                <ExternalLink size={12} /> Demo
              </motion.a>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  return (
    <section className="py-20 px-6 relative">
      {/* Subtle background contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/60 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="space-y-2"
        >
          <div className="section-label">Mission Log</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Selected Work</h2>
          <p className="text-muted-foreground font-mono text-sm">
            Distributed task orchestration and high-performance caching backends.
          </p>
        </motion.div>

        {/* All projects — stacked horizontal cards */}
        <div className="flex flex-col gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
