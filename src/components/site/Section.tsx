import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={center ? "text-center max-w-2xl mx-auto mb-14" : "max-w-2xl mb-14"}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''} mb-4`}>
          <span className="hairline" />
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">{eyebrow}</span>
          <span className="hairline" />
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-display font-semibold leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-base md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
