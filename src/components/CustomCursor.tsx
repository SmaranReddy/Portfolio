import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const ringX = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.3 });
  const ringY = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.3 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onHoverIn  = () => setHovering(true);
    const onHoverOut = () => setHovering(false);

    const attachHover = () => {
      document.querySelectorAll<HTMLElement>('a, button, [role="button"], input, textarea, select, label, [data-hover]')
        .forEach(el => {
          el.addEventListener('mouseenter', onHoverIn);
          el.addEventListener('mouseleave', onHoverOut);
        });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    attachHover();
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot — instant */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-primary"
        style={{ x: rawX, y: rawY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: clicking ? 4 : hovering ? 0 : 6, height: clicking ? 4 : hovering ? 0 : 6 }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid rgba(34,197,94,0.55)',
          boxShadow: '0 0 10px rgba(34,197,94,0.25)',
        }}
        animate={{
          width:   clicking ? 16 : hovering ? 40 : 28,
          height:  clicking ? 16 : hovering ? 40 : 28,
          opacity: clicking ? 1  : 0.7,
        }}
        transition={{ duration: 0.18 }}
      />

      {/* Glow trail — very faint, large */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 80,
          height: 80,
          background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
        }}
      />
    </>
  );
}
