import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const HOVER_SELECTORS = 'a, button, [role="button"], input, textarea, select, label, [data-hover]';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const visibleRef = useRef(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const ringX = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.3 });
  const ringY = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.3 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Event delegation — one pair of listeners instead of one per element + MutationObserver
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(HOVER_SELECTORS)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(HOVER_SELECTORS)) setHovering(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot — instant tracking */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-primary"
        style={{ x: rawX, y: rawY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: clicking ? 4 : hovering ? 0 : 6, height: clicking ? 4 : hovering ? 0 : 6 }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring — spring-lagged following */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid rgba(34,197,94,0.55)',
        }}
        animate={{
          width:   clicking ? 16 : hovering ? 40 : 28,
          height:  clicking ? 16 : hovering ? 40 : 28,
          opacity: clicking ? 1  : 0.7,
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
}
