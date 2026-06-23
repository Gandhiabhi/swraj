import Layout from "@/components/site/Layout";
import { SectionHeader, FadeIn } from "@/components/site/Section";
import { CheckCircle2 } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

/* ── Animated counter ───────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (isInView) mv.set(to);
  }, [isInView, mv, to]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ── Image reveal wrapper ───────────────────────────────── */
const imageVariants = {
  hidden: { opacity: 0, scale: 1.06, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const checkVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.10, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function About() {
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });

  const trustRef = useRef(null);
  const trustInView = useInView(trustRef, { once: true, margin: "-80px" });

  return (
    <Layout
      title="About · Swaraj Hardware"
      description="Swaraj Hardware — serving Ahmedabad with premium hardware since 1999. Our story, mission and values."
    >
      {/* ── OUR STORY ──────────────────────────────────────── */}
      <section className="container-px section" ref={storyRef}>
        <SectionHeader
          eyebrow="Our Story"
          title="A Heritage of Excellence Since 1999"
          subtitle="From a 500 sq. ft. initiative to a 5000 sq. ft. Wide Display Gallery"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Decorative floating ring */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 size-32 rounded-full opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #2D96A8, transparent 70%)" }}
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-6 -right-6 size-24 rounded-full opacity-15 pointer-events-none"
              style={{ background: "radial-gradient(circle, #6FB9C6, transparent 70%)" }}
            />

            <div className="rounded-3xl overflow-hidden shadow-elegant relative z-10">
              <img
                src="/banner_image/banner1.webp"
                alt="Swaraj Hardware Showroom"
                loading="lazy"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle teal overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#083D52]/40 via-transparent to-transparent" />
            </div>

            {/* Stats pill overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 z-20 flex gap-4 justify-around rounded-2xl px-6 py-4"
              style={{
                background: "rgba(8,61,82,0.82)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(111,185,198,0.25)",
              }}
            >
              {[
                { to: 25, suffix: "+", label: "Years" },
                { to: 5000, suffix: " sq ft", label: "Facility" },
                { to: 15000, suffix: "+", label: "Customers" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-xl font-display font-bold"
                    style={{
                      background: "linear-gradient(135deg,#6FB9C6,#2D96A8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Text side */}
          <div className="space-y-5">
            {[
              <>Our journey began in <span className="text-primary font-semibold">1999</span> with a humble setup of just 500 sq. ft., driven by a simple yet powerful vision — to build a business based on quality, trust, and long-term relationships. What started as a small initiative gradually transformed into a growing enterprise through determination and a strong commitment towards customer satisfaction.</>,
              <>As the years passed, we consistently upgraded our infrastructure and expanded our capabilities to meet changing market demands. Every milestone we achieved became a reflection of our passion for excellence and our commitment to delivering the best possible solutions to our customers.</>,
              <>Today, operating in a well-established <span className="font-semibold text-[#083D52]">5000 sq. ft. facility</span>, our growth journey represents years of experience, customer confidence, and continuous improvement. We take pride in serving our clients with enhanced efficiency and the same values that have guided us since day one.</>,
            ].map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={textVariants}
                initial="hidden"
                animate={storyInView ? "visible" : "hidden"}
                className="text-foreground/80 text-sm leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION ────────────────────────────────── */}
      <section className="container-px pb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {[
            {
              title: "Our Identity",
              text: "At our showroom, our identy is to provide high-quality products with trust, honesty, and excellent service in reasonable price.We believe every customer deserves the best experience, premium quality, and complete satisfaction. Our vision is to build long-term relationships by delivering innovative solutions and reliable support. We are committed to growing with our customers and becoming a trusted name in the industry. Your trust and happiness inspire us to improve and serve better every day.",
              delay: 0,
              accent: "#2D96A8",
            },
            {
              title: "Our Vision",
              text: "To earn every customer’s trust through quality, honesty, and lasting relationships.    We believe true success comes from happy customers and consistent quality.",
              delay: 0.12,
              accent: "#083D52",
            },
          ].map((b) => (
            <FadeIn key={b.title} delay={b.delay}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(45,150,168,0.18)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-3xl p-10 h-full border border-primary/10 cursor-default"
              >
                {/* Animated accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: b.delay + 0.3 }}
                  className="h-1 rounded-full mb-5"
                  style={{ background: `linear-gradient(90deg, ${b.accent}, transparent)` }}
                />
                <h3 className="font-display text-2xl gold-text mb-4">{b.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.text}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── WHY CUSTOMERS TRUST US ──────────────────────────── */}
      <section className="container-px section" ref={trustRef}>
        <SectionHeader
          eyebrow="Why Customers Trust Us"
          title="Premium Quality with Reasonable Price"
        />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={trustInView ? "visible" : "hidden"}
            className="relative order-last lg:order-first max-w-md lg:max-w-lg mx-auto lg:mx-0 w-full"
          >
            <motion.div
              animate={{ rotate: [0, 3, 0, -3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 size-40 rounded-full opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #2D96A8, transparent 70%)" }}
            />
            <div className="rounded-3xl overflow-hidden shadow-elegant relative z-10 group">
              <img
                src="/banner_image/banner2.webp"
                alt="Premium kitchen hardware installation"
                loading="lazy"
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#083D52]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Checklist side */}
          <div>
            <ul className="space-y-4">
              {[
                "Authorised dealers of top hardware brands",
                "Elegent display solutions for every space",
                "Best market prices — transparent billing",
                "Fast delivery across Ahmedabad",
                "Commitment of best after  sale support",
              ].map((l, i) => (
                <motion.li
                  key={l}
                  custom={i}
                  variants={checkVariants}
                  initial="hidden"
                  animate={trustInView ? "visible" : "hidden"}
                  className="flex gap-3 items-start text-foreground/85 group"
                >
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
                  </motion.span>
                  <span className="text-sm leading-relaxed group-hover:text-foreground transition-colors">
                    {l}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
