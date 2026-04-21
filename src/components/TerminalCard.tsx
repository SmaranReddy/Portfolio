import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TerminalCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  contentClassName?: string;
  noHover?: boolean;
}

export function TerminalCard({
  children,
  title = 'bash',
  className,
  contentClassName,
  noHover = false,
}: TerminalCardProps) {
  return (
    <motion.div
      whileHover={
        noHover
          ? undefined
          : {
              scale: 1.015,
              boxShadow: '0 0 32px rgba(34, 197, 94, 0.1), 0 0 64px rgba(34, 197, 94, 0.04)',
            }
      }
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'border border-primary/20 bg-secondary/50 rounded-sm overflow-hidden flex flex-col shadow-2xl',
        className
      )}
    >
      {/* Terminal title bar */}
      <div className="bg-secondary px-4 py-2.5 flex items-center justify-between border-b border-primary/10">
        <div className="flex gap-1.5">
          {(['bg-red-500/50 hover:bg-red-500/80', 'bg-yellow-500/50 hover:bg-yellow-500/80', 'bg-green-500/50 hover:bg-green-500/80'] as const).map((colors, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.4 }}
              transition={{ duration: 0.15 }}
              className={cn('w-2.5 h-2.5 rounded-full cursor-default transition-colors', colors)}
            />
          ))}
        </div>

        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest select-none">
          {title}
        </div>

        <div className="w-10" />
      </div>

      {/* Content */}
      <div className={cn('p-8 flex-1 font-mono text-sm leading-relaxed', contentClassName)}>
        {children}
      </div>
    </motion.div>
  );
}
