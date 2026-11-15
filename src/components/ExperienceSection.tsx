import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { BulletList, MetricStrip, StackTag, type Metric } from './WorkShared';

type Experience = {
  code: string;
  company: string;
  role: string;
  focus: string;
  location: string;
  period: string;
  highlights: string[];
  metrics: Metric[];
  stack: string[];
};

// Reverse chronological order.
const EXPERIENCES: Experience[] = [
  {
    code:     'EXP-02',
    company:  'Haett',
    role:     'Software Engineering Intern',
    focus:    'Full-Stack · Mobile',
    location: 'Remote',
    period:   'June 2026 – August 2026',
    highlights: [
      'Worked as a Full-Stack Software Engineer, contributing to **Flutter, backend, Android, and iOS** development for a **production meal subscription platform** serving real users.',
      'Designed and developed scalable backend services and REST APIs using **Next.js, Prisma, PostgreSQL, and AWS**, powering authentication, subscriptions, payments, meal scheduling, and order management.',
      'Built and shipped cross-platform mobile features, integrated third-party services including Razorpay, Google Sign-In, Apple HealthKit, Firebase Cloud Messaging, and Google Maps, and supported **App Store and Google Play Store releases**.',
      'Debugged complex production issues across Flutter, native Android, iOS, backend APIs, databases, and cloud services while collaborating in an Agile development environment using Git, code reviews, testing, and CI/CD.',
    ],
    metrics: [],
    stack: ['Flutter', 'Next.js', 'Prisma', 'PostgreSQL', 'AWS', 'Android', 'iOS'],
  },
  {
    code:     'EXP-01',
    company:  'Vokr',
    role:     'Software Engineering Intern',
    focus:    'Backend · Payments · Cloud',
    location: 'Remote',
    period:   'March 2026 – May 2026',
    highlights: [
      'Engineered PostgreSQL inventory reservations using **ordered row locks, atomic transactions, and 15-minute holds**. Across **18 local k6 load-test runs** with up to **50 concurrent buyers**, recorded **zero oversells, deadlocks, or leaked reservations**, with **311–344 ms P95 latency**.',
      'Implemented **idempotent Razorpay payment workflows** with constant-time HMAC verification, event-ID deduplication, amount validation, and row-locked state transitions. Added reconciliation and idempotent refunds for late captures after reservation expiry.',
      'Owned **GCP Cloud Run** delivery with approval-gated, image-digest-pinned deployments and fail-closed migration gates. Implemented nonce-based CSP, Cloudflare WAF rules, **15 alert policies**, and **650+ automated test cases**.',
    ],
    metrics: [
      { value: '0',          label: 'oversells, deadlocks, or leaked reservations · 18 local k6 runs, ≤50 concurrent buyers' },
      { value: '311–344 ms', label: 'P95 latency across local k6 load tests' },
      { value: '650+',       label: 'automated test cases' },
      { value: '15',         label: 'alert policies' },
    ],
    stack: ['PostgreSQL', 'Razorpay', 'GCP Cloud Run', 'Cloudflare WAF', 'k6'],
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
              key={exp.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 4 }}
              className="relative border border-primary/10 bg-[#070707] rounded-xl overflow-hidden transition-all duration-200"
            >
              {/* Left accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" />

              <div className="p-5 sm:p-7 space-y-5">
                {/* Header row */}
                <div className="flex items-start gap-4">
                  <div className="hidden sm:block p-2.5 rounded-lg border border-primary/20 bg-primary/5 text-primary shrink-0">
                    <Briefcase size={16} />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono">
                      <span className="text-muted-foreground">{exp.code}</span>
                      <span className="text-primary/20">·</span>
                      <span className="font-bold text-primary/80 uppercase tracking-wider">{exp.focus}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-x-6 gap-y-1">
                      <h3 className="text-[22px] md:text-[26px] font-bold text-foreground leading-tight">
                        {exp.company}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-muted-foreground md:shrink-0">
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
                    <p className="text-[14px] font-mono text-primary">{exp.role}</p>
                  </div>
                </div>

                {/* Key metrics */}
                <MetricStrip metrics={exp.metrics} />

                {/* Highlights */}
                <BulletList items={exp.highlights} />

                {/* Stack */}
                {exp.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {exp.stack.map(t => <StackTag key={t} label={t} />)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
