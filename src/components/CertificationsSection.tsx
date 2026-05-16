import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';

const ITEMS = [
  {
    title: 'Advanced Learning Algorithms',
    issuer: 'DeepLearning.AI, Stanford University',
    type: 'certification',
  },
  {
    title: 'First Prize — Hackfiniti 2026',
    issuer: '',
    type: 'achievement',
  },
  {
    title: 'Second Prize — CONVERGENCE 2K25 National Hackathon',
    issuer: '',
    type: 'achievement',
  },
  {
    title: 'Flipkart Grid 7.0 — Shortlisted',
    issuer: '',
    type: 'achievement',
  },
];

export function CertificationsSection() {
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
          <div className="section-label">Credentials</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Certifications & Achievements</h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 4, borderColor: 'rgba(34,197,94,0.3)' }}
              className="flex items-center gap-4 p-5 rounded-xl border border-primary/10 bg-[#080808] transition-all duration-200"
            >
              <div className="p-2.5 rounded-lg border border-primary/20 bg-primary/5 text-primary shrink-0">
                {item.type === 'certification' ? <Award size={16} /> : <Trophy size={16} />}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground">{item.title}</div>
                {item.issuer && (
                  <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{item.issuer}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
