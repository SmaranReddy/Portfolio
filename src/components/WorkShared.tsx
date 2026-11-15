import React from 'react';

// Shared presentation helpers for the Experience and Projects sections.

export type Metric = {
  value: string;
  label: string;
};

// ── Stack tag ────────────────────────────────────────────────────────────────
export function StackTag({ label }: { label: string }) {
  return (
    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md border border-primary/15 bg-primary/5 text-primary/70 whitespace-nowrap">
      {label}
    </span>
  );
}

// ── Inline emphasis ──────────────────────────────────────────────────────────
// Text wrapped in **double asterisks** is rendered with emphasis, so key
// figures stand out inside a bullet without altering its wording.
export function Emphasized({ text }: { text: string }) {
  const parts = text.split('**');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">{part}</strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

// ── Bullet list ──────────────────────────────────────────────────────────────
export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((point, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
          <span className="text-primary/40 font-mono shrink-0 mt-0.5">→</span>
          <span className="leading-relaxed min-w-0">
            <Emphasized text={point} />
          </span>
        </li>
      ))}
    </ul>
  );
}

// ── Metric strip ─────────────────────────────────────────────────────────────
export function MetricStrip({ metrics }: { metrics: readonly Metric[] }) {
  if (metrics.length === 0) return null;
  return (
    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
      {metrics.map(m => (
        <div
          key={m.label}
          className="rounded-lg border border-primary/15 bg-primary/[0.04] px-3.5 py-2.5 min-w-0"
        >
          <div className="text-[18px] md:text-[20px] font-bold font-mono text-primary leading-tight break-words">
            {m.value}
          </div>
          <div className="text-[11px] font-mono text-muted-foreground leading-snug mt-1">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}
