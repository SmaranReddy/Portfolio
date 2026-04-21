import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Layers, BookOpen, ChevronDown } from 'lucide-react';

const SKILL_GROUPS = [
  {
    id:    'ai',
    label: 'AI / ML',
    Icon:  Brain,
    color: 'rgba(34,197,94,0.1)',
    border: 'rgba(34,197,94,0.25)',
    skills: [
      'RAG Systems', 'LangChain', 'LangGraph', 'PyTorch',
      'Transformers', 'Vector Databases', 'Multi-Agent Systems', 'FAISS',
    ],
  },
  {
    id:    'backend',
    label: 'Backend',
    Icon:  Database,
    color: 'rgba(6,182,212,0.1)',
    border: 'rgba(6,182,212,0.25)',
    skills: [
      'Python', 'FastAPI', 'Node.js', 'REST APIs',
      'SQL', 'Next.js', 'Async Patterns', 'ONNX',
    ],
  },
  {
    id:    'systems',
    label: 'Systems & Infra',
    Icon:  Layers,
    color: 'rgba(234,179,8,0.1)',
    border: 'rgba(234,179,8,0.25)',
    skills: [
      'Docker', 'AWS (EC2, S3)', 'GitHub Actions', 'Linux',
      'C++', 'Prometheus', 'CI/CD', 'Git',
    ],
  },
];

const STUDYING = [
  'LLM serving architecture',
  'Batching & quantization',
  'Speculative decoding',
  'Vector database internals',
  'Retrieval eval (NDCG, MRR)',
  'RAG failure taxonomies',
  'Throughput vs latency trade-offs',
  'FastAPI async patterns',
];

function SkillGroupCard({ group, index }: { group: typeof SKILL_GROUPS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ boxShadow: `0 0 28px ${group.color}` }}
      className="border border-primary/10 bg-[#070707] rounded-xl p-6 space-y-5 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg" style={{ background: group.color }}>
          <group.Icon size={15} className="text-primary" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Module
          </div>
          <h3 className="font-bold text-sm text-foreground">{group.label}</h3>
        </div>
        <span className="ml-auto text-[10px] font-mono text-muted-foreground">
          {group.skills.length} skills
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <motion.span
            key={skill}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.15 }}
            className="text-xs font-mono px-2.5 py-1 rounded-md border border-primary/15 bg-primary/5 text-primary/80 transition-colors hover:border-primary/35 hover:text-primary cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [showStudying, setShowStudying] = useState(false);

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
          <div className="section-label">Neural Map</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Technical Skills
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Active skill domains across AI engineering, backend, and infrastructure.
          </p>
        </motion.div>

        {/* Skill group cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((g, i) => (
            <SkillGroupCard key={g.id} group={g} index={i} />
          ))}
        </div>

        {/* Currently Studying */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-primary/10 bg-[#070707] rounded-xl overflow-hidden"
        >
          {/* Toggle */}
          <motion.button
            onClick={() => setShowStudying(v => !v)}
            className="w-full flex items-center justify-between px-7 py-5 text-left"
            whileHover={{ backgroundColor: 'rgba(34,197,94,0.03)' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ background: 'rgba(34,197,94,0.1)' }}>
                <BookOpen size={15} className="text-primary" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Active Research
                </div>
                <h3 className="font-bold text-sm text-foreground">Currently Studying</h3>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showStudying ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-primary/50"
            >
              <ChevronDown size={16} />
            </motion.div>
          </motion.button>

          {/* Expandable */}
          <motion.div
            initial={false}
            animate={{ height: showStudying ? 'auto' : 0, opacity: showStudying ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 border-t border-primary/8">
              <div className="flex flex-wrap gap-2 mt-5">
                {STUDYING.map((item, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    className="text-xs font-mono px-3 py-1.5 rounded-md border border-primary/15 bg-primary/4 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
