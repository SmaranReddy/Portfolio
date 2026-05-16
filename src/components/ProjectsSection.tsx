import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

// ── Project data ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id:             'recomx',
    code:           'PRJ-001',
    status:         'ACTIVE',
    statusColor:    'text-green-400',
    highlight:      'RecSys',
    highlightStyle: 'text-green-400 bg-green-500/10 border-green-500/20',
    title:          'RecomX — AI-Powered Recommendation Engine',
    tagline:        'Personalized recommendations at sub-100ms latency',
    impact:         'AWS Personalize-powered recommendation engine with Lambda-based inference, delivering personalized recommendations with sub-100ms latency using HRNN and content filtering algorithms.',
    keyPoints: [
      'Serverless inference pipeline using AWS Lambda for cost-efficient personalization',
      'HRNN and content filtering models delivering sub-100ms response times',
      'Built with React and Chakra UI for an interactive recommendation interface',
    ],
    stack:       ['AWS Personalize', 'Lambda', 'React', 'Chakra UI'],
    github:      'https://github.com/SmaranReddy',
    demo:        null,
    border:      'border-green-500/20',
    glow:        'rgba(34,197,94,0.1)',
    glowHover:   'rgba(34,197,94,0.16)',
    accentLine:  'from-green-500/40 via-green-500/20 to-transparent',
    featured:    true,
  },
  {
    id:             'finshield',
    code:           'PRJ-002',
    status:         'STABLE',
    statusColor:    'text-cyan-400',
    highlight:      'AML Platform',
    highlightStyle: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    title:          'FinShield — Enterprise AML Detection Platform',
    tagline:        '9 LLM agents orchestrating AML screening workflows',
    impact:         'Enterprise-grade Anti-Money Laundering detection platform using LangGraph orchestration across 9 LLM agents and 12 workflow nodes for comprehensive AML screening and risk scoring.',
    keyPoints: [
      'LangGraph-based orchestration with 9 specialized LLM agents across 12 workflow nodes',
      'Comprehensive AML screening pipeline with configurable risk scoring engine',
      'FastAPI async stack with Docker containerization, rate limiting, and Pytest async test suites',
    ],
    stack:       ['LangGraph', 'FastAPI', 'Docker', 'Pytest'],
    github:      'https://github.com/SmaranReddy',
    demo:        null,
    border:      'border-cyan-500/20',
    glow:        'rgba(6,182,212,0.08)',
    glowHover:   'rgba(6,182,212,0.14)',
    accentLine:  'from-cyan-500/40 via-cyan-500/20 to-transparent',
    featured:    false,
  },
  {
    id:             'scholarmind',
    code:           'PRJ-003',
    status:         'RESEARCH',
    statusColor:    'text-purple-400',
    highlight:      'Adaptive RAG',
    highlightStyle: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    title:          'ScholarMind — Adaptive RAG Research Engine',
    tagline:        'Multi-query generation with dynamic confidence scoring and self-critique',
    impact:         'Adaptive RAG pipeline featuring multi-query generation, reranking, dynamic confidence scoring, and a self-critique loop for continuous grounding improvements.',
    keyPoints: [
      'Adaptive RAG pipeline with multi-query generation and reranking capabilities',
      'Cache hierarchy with SHA-256 invalidation for efficient retrieval',
      'Self-critique loop that iteratively improves grounding and reduces hallucination',
    ],
    stack:       ['LangChain', 'FAISS', 'Python', 'FastAPI'],
    github:      'https://github.com/SmaranReddy',
    demo:        null,
    border:      'border-purple-500/20',
    glow:        'rgba(139,92,246,0.08)',
    glowHover:   'rgba(139,92,246,0.14)',
    accentLine:  'from-purple-500/40 via-purple-500/20 to-transparent',
    featured:    false,
  },
] as const;

type Project = typeof PROJECTS[number];

// ── Shared tag component ──────────────────────────────────────────────────────
function StackTag({ label }: { label: string }) {
  return (
    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md border border-primary/15 bg-primary/5 text-primary/70">
      {label}
    </span>
  );
}

// ── Featured card (PRJ-001 — full width) ──────────────────────────────────────
function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
      className={`relative border ${project.border} bg-[#070707] rounded-2xl overflow-hidden transition-transform duration-200`}
      style={{ boxShadow: `0 0 30px ${project.glow}` }}
    >
      {/* Left accent line */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${project.accentLine}`} />

      <div className="p-8 md:p-10 md:grid md:grid-cols-[1fr_auto] md:gap-10 md:items-start pl-10 md:pl-12">

        {/* Left column */}
        <div className="space-y-5">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono text-muted-foreground">{project.code}</span>
            <span className="text-primary/20 font-mono">·</span>
            <span className={`text-[10px] font-bold font-mono ${project.statusColor}`}>{project.status}</span>
            <span className={`ml-auto md:ml-0 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${project.highlightStyle}`}>
              {project.highlight}
            </span>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {project.title}
            </h3>
            <p className="text-sm font-mono text-muted-foreground italic">
              "{project.tagline}"
            </p>
          </div>

          {/* Impact */}
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {project.impact}
          </p>

          {/* Key points */}
          <ul className="space-y-2">
            {project.keyPoints.map((pt, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                <span className="text-primary/40 font-mono shrink-0 mt-0.5">→</span>
                <span className="leading-snug">{pt}</span>
              </li>
            ))}
          </ul>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.stack.map(t => <StackTag key={t} label={t} />)}
          </div>
        </div>

        {/* Right column — CTAs */}
        <div className="flex md:flex-col gap-3 mt-7 md:mt-0 md:min-w-[140px]">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-mono rounded-lg border border-primary/25 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all"
          >
            <Github size={14} /> GitHub
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-mono rounded-lg bg-primary/12 border border-primary/35 text-primary hover:bg-primary/20 hover:border-primary/60 transition-all"
            >
              <ExternalLink size={14} /> Live Demo
            </motion.a>
          )}
        </div>

      </div>
    </motion.div>
  );
}

// ── Regular card ──────────────────────────────────────────────────────────────
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

      <div className="flex flex-col md:flex-row flex-1 gap-6 p-6">

        {/* Left — title / tagline / impact / key points */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-muted-foreground">{project.code}</span>
            <span className="text-primary/20">·</span>
            <span className={`font-bold ${project.statusColor}`}>{project.status}</span>
            <span className={`ml-auto text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${project.highlightStyle}`}>
              {project.highlight}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight">{project.title}</h3>
            <p className="text-xs font-mono text-muted-foreground italic mt-1">"{project.tagline}"</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{project.impact}</p>

          <ul className="space-y-1.5">
            {project.keyPoints.map((pt, i) => (
              <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-primary/40 font-mono shrink-0 mt-0.5">→</span>
                <span className="leading-snug">{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — stack + CTAs */}
        <div className="flex flex-col gap-4 md:w-44 shrink-0 justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(t => <StackTag key={t} label={t} />)}
          </div>

          <div className="flex md:flex-col gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
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
  const [featured, ...rest] = PROJECTS;

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
            Recommendation engines, AML platforms, and adaptive RAG systems.
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
