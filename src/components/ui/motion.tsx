"use client";

import {
  motion,
  useReducedMotion,
  useInView,
  type Variants,
  type UseInViewOptions,
} from "framer-motion";
import { useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

/**
 * Viewport options tuned for scroll reveals:
 * - bottom margin only (not top) so above-the-fold content still triggers
 * - once: true so content stays visible after reveal and on scroll-back
 */
const VIEWPORT: UseInViewOptions = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -48px 0px",
};

type MotionTag = "div" | "section" | "li" | "span";

/**
 * Reveal-on-scroll wrapper.
 *
 * Uses `animate` + `useInView` (not `whileInView`) so reveals work reliably
 * on mount, on scroll, and after locale changes. A persistent ref remembers
 * whether the block has already been shown, so switching language never hides
 * content the user has already scrolled to.
 *
 * Pass `immediate` for above-the-fold blocks (hero, etc.).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: MotionTag;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const hasShown = useRef(immediate);
  const inView = useInView(ref as RefObject<Element>, VIEWPORT);

  if (inView) hasShown.current = true;

  const visible = reduce || immediate || hasShown.current;
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as RefObject<HTMLDivElement>}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/** Container that staggers the reveal of its StaggerItem children. */
export function Stagger({
  children,
  className,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const hasShown = useRef(immediate);
  const inView = useInView(ref, VIEWPORT);

  if (inView) hasShown.current = true;

  const visible = reduce || immediate || hasShown.current;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={reduce ? undefined : staggerParent}
      initial={reduce ? false : "hidden"}
      animate={visible ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={cn(className)} variants={reduce ? undefined : staggerChild}>
      {children}
    </motion.div>
  );
}
