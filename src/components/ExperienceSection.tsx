import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'Coordinator & Lead Mentor',
    organization: 'DeepLabs (AI/ML Club)',
    location: 'IIIT Raichur',
    period: 'Dec 2024 – Dec 2025',
    highlights: [
      'Conducted workshops on Agentic AI and RAG systems',
      'Mentored hackathon teams in AI/ML project development',
      'Led MLOps and system design mentoring sessions for junior members',
      'Organized coding competitions and technical sessions',
      'Increased club engagement and problem-solving proficiency among members',
    ],
  },
];

export function ExperienceSection() {
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
          <div className="section-label">Work Log</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Experience</h2>
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 4 }}
              className="border border-primary/10 bg-[#070707] rounded-xl p-7 space-y-5 transition-all duration-200"
            >
              {/* Header row */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg border border-primary/20 bg-primary/5 text-primary shrink-0">
                  <Briefcase size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-base font-bold text-foreground">{exp.role}</h3>
                    <span className="text-[11px] font-mono text-primary/40">·</span>
                    <span className="text-sm font-mono text-primary">{exp.organization}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-accent" />
                      {exp.period}
                    </span>
                    <span className="text-primary/20">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-accent" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 pl-1">
                {exp.highlights.map((point, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="text-primary/40 font-mono shrink-0 mt-0.5">→</span>
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
