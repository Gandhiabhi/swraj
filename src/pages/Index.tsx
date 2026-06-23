import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Sparkles, ShieldCheck, BadgeIndianRupee, Award, Layers, AlertCircle } from "lucide-react";
import Layout from "@/components/site/Layout";
import { SectionHeader, FadeIn } from "@/components/site/Section";
import { brands, categories, productGroups, testimonials } from "@/data/site";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
const slides = [
  {
    title: "Quality You Deserve. Price You'll Love",
    description: " Hardware, Plywood, Laminate, Veneer, Louvers, Charcoal, Kitchen Fittings, Bathroom Accessories, Home Lockers, Fancy Hardware, Digital Locks, Wardrobe Modular Fittings Available with Honest Price. Top Brands Everything Your Home needs, Under One Roof.",
    image: "/banner_image/banner1.webp",
    mobileImage: "/mobile-banner/mo_banner1.webp",
    tagline: "તમારી દરેક હાર્ડવેર જરૂરિયાત માટે એક જ સ્થળ",
    location: "સ્વરાજ હાર્ડવેર – સિલ્વર સ્ટાર કોમ્પ્લેક્સ, ચાંદલોડિયાનું વિશ્વાસપાત્ર હાર્ડવેર સ્ટોર.",
    notice: "અમારી બીજી કોઈ શાખા નથી.",
  },
  {
    title: "No Compromise on Quality. Pocket Friendly Price",
    description: "250+ Premium Brands, Transparent Pricing, and 25+ Years of Trust. Hardware that lasts — without breaking your budget.",
    image: "/banner_image/banner2.webp",
    mobileImage: "/mobile-banner/mo_banner2.webp",
    tagline: "Your one-stop destination for all your hardware needs",
    location: "Swaraj Hardware at Silver Star Complex, Chandlodiya",
    notice: "We do not have any other Branches.",
  },
  {
    title: "Premium Hardware. No Surprise on Price",
    description: "Sourced from the India's best brands and priced for every budget. Ahmedabad's most trusted Hardware store since 1999.",
    image: "/banner_image/banner3.webp",
    mobileImage: "/mobile-banner/mo_banner3.webp",
    tagline: "તમારી દરેક હાર્ડવેર જરૂરિયાત માટે એક જ સ્થળ",
    location: "સ્વરાજ હાર્ડવેર – સિલ્વર સ્ટાર કોમ્પ્લેક્સ, ચાંદલોડિયાનું વિશ્વાસપાત્ર હાર્ડવેર સ્ટોર.",
    notice: "અમારી બીજી કોઈ શાખા નથી.",
  },
];

const features = [
  { icon: Award, title: "25+ Years Experience", desc: "Trusted by Ahmedabad since 1999." },
  { icon: ShieldCheck, title: "Trusted Brands", desc: "Genuine Europa, Godrej, Hettich, Yale & more." },
  { icon: BadgeIndianRupee, title: "Best market Prices", desc: "Best market prices, transparent billing." },
  { icon: Layers, title: "Wide Range", desc: "Thousands of SKUs under one roof." }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        setPrevSlide(prev);
        return (prev + 1) % slides.length;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (i: number) => {
    setPrevSlide(currentSlide);
    setCurrentSlide(i);
  };


  return (
    <Layout
      title="Swaraj Hardware · Premium Hardware Store in Ahmedabad"
      description="Premium hardware & interior solutions in Chandlodiya, Ahmedabad. Door fittings, kitchen accessories, bathroom fittings, laminates from Europa, Godrej, Hettich & Yale."
    >
      {/* HERO */}
      <section className="relative -mt-24 min-h-[100svh] flex items-start">
        {/* Background image layer: all slides pre-rendered, GPU-composited crossfade via CSS opacity */}
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((slide, i) => {
            const isActive = i === currentSlide;
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange: "opacity",
                  zIndex: isActive ? 2 : (i === prevSlide ? 1 : 0),
                }}
              >
                {/* Ken Burns scale: CSS transition on active slide for GPU-composited smoothness */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transform: isActive ? "scale(1)" : "scale(1.08)",
                    transition: isActive ? "transform 7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
                    willChange: "transform",
                  }}
                >
                  {/* Mobile image */}
                  <img
                    src={slide.mobileImage}
                    alt="Premium hardware showroom"
                    className="absolute inset-0 w-full h-full object-cover md:hidden"
                    fetchPriority={i === 0 ? "high" : "low"}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  {/* Desktop image */}
                  <img
                    src={slide.image}
                    alt="Premium hardware showroom"
                    className="absolute inset-0 w-full h-full object-cover hidden md:block"
                    fetchPriority={i === 0 ? "high" : "low"}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            );
          })}
          {/* Layered overlay: strong at top (for navbar clearance) + mid (heading) + bottom gradient */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,30,45,0.60) 0%, rgba(8,40,58,0.45) 25%, rgba(10,46,62,0.40) 55%, rgba(8,61,82,0.65) 100%)",
            }}
          />
        </div>

        {/* Content: pt-32 on mobile and md:pt-40 on desktop keeps text close to logo/navbar but safely below it */}
        <div className="relative container-px w-full pt-32 sm:pt-36 md:pt-40 pb-24 z-20">
          {/* Stable height wrapper so both exiting and entering text stacks without collapsing layout */}
          <div className="relative max-w-3xl" style={{ minHeight: "520px" }}>
            <AnimatePresence>
              <motion.div
                key={currentSlide}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
                className="absolute inset-0"
              >
                {/* We wrap the three tags in a flex-col container so they stack in three separate rows */}
                <div className="flex flex-col items-start gap-4 mb-8">
                  {/* Tagline */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.50, ease: [0.22, 1, 0.36, 1] } },
                      exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } },
                    }}
                    className="text-lg sm:text-xl md:text-2xl font-display font-medium text-white/95 tracking-wide drop-shadow-md"
                  >
                    {slides[currentSlide].tagline}
                  </motion.div>

                  {/* Badge */}
                  <motion.a
                    href="https://maps.google.com/?q=G-8%2C9%2C10+Silver+Star+Complex%2C+Chandlodiya%2C+Ahmedabad%2C+Gujarat"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.50, ease: [0.22, 1, 0.36, 1] } },
                      exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } },
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-[rgba(45,150,168,0.35)] transition-all duration-300 group/badge"
                    style={{ background: "rgba(45,150,168,0.25)", border: "1px solid rgba(111,185,198,0.40)", backdropFilter: "blur(12px)" }}
                  >
                    <Sparkles className="size-3.5" style={{ color: "#6FB9C6" }} />
                    <span className="text-xs uppercase tracking-[0.2em] text-white/90">{slides[currentSlide].location}</span>
                    <MapPin className="size-3.5 text-white/80 group-hover/badge:text-[#6FB9C6] transition-colors ml-0.5" />
                  </motion.a>

                  {/* No-branch notice */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                      exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: "easeIn" } },
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(217, 119, 6, 0.30), rgba(245, 158, 11, 0.20))",
                      border: "2px solid #F59E0B",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 0 16px rgba(245, 158, 11, 0.4)",
                    }}
                  >
                    <AlertCircle className="size-4 flex-shrink-0" style={{ color: "#FCD34D" }} />
                    <span
                      className="text-xs sm:text-sm tracking-wider font-extrabold"
                      style={{ color: "#FFFFFF", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                    >
                      {slides[currentSlide].notice}
                    </span>
                  </motion.div>
                </div>

                {/* Main Heading */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.22, 1, 0.36, 1] } },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.20, ease: "easeIn" } },
                  }}
                  className="text-3xl sm:text-5xl md:text-6xl font-display font-semibold leading-[1.1] text-white"
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.70), 0 1px 4px rgba(0,0,0,0.50)" }}
                >
                  {slides[currentSlide].title.split('. ').map((part, i, arr) => (
                    <span key={i}>
                      {part}{i < arr.length - 1 ? '.' : ''}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                    exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } },
                  }}
                  className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 1px 8px rgba(0,0,0,0.60)" }}
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.50, ease: [0.22, 1, 0.36, 1] } },
                    exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: "easeIn" } },
                  }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <Link
                    to="/products"
                    className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg,#2D96A8 0%,#083D52 100%)", color: "#fff", boxShadow: "0 8px 32px rgba(45,150,168,0.40)" }}
                  >
                    Explore Products <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-medium transition-colors"
                    style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", backdropFilter: "blur(12px)" }}
                  >
                    <Phone className="size-4" /> Contact Us
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                    exit: { opacity: 0, transition: { duration: 0.20 } },
                  }}
                  className="mt-14 grid grid-cols-3 gap-6 max-w-lg"
                >
                  {[["25+", "Years"], ["75K+", "Satisfied Customers"], ["250+", "Brands"]].map(([n, l]) => (
                    <div key={l}>
                      <div
                        className="text-2xl md:text-3xl font-display font-semibold"
                        style={{ background: "linear-gradient(135deg,#6FB9C6 0%,#2D96A8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                      >{n}</div>
                      <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.60)" }}>{l}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideChange(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 bg-[#6FB9C6]" : "w-2 bg-white/30 hover:bg-white/50"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 border-y border-border/60 bg-card/30 overflow-hidden">
        <div className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10">Authorised dealers of</div>
        <div className="relative">
          <div className="flex w-max marquee gap-20 px-8 items-center">
            {[...brands, ...brands].map((b, i) => (
              <div key={i} className="flex items-center justify-center h-12 w-36 hover:scale-110 transition-all duration-500">
                <img src={b.logo} alt={b.name} className="max-h-full max-w-full object-contain drop-shadow-sm" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section container-px">
        <SectionHeader eyebrow="Categories" title="Everything You Need Under One Roof" subtitle="Curated collections from the India's most Trusted Hardware Brands." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <FadeIn key={c.slug} delay={i * 0.06}>
              <Link to={`/products?category=${c.slug}`} className="group relative block rounded-3xl overflow-hidden shadow-elegant aspect-[4/5]">
                <img src={c.img} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Dark navy gradient overlay — always readable regardless of image */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,61,82,0.92) 0%, rgba(8,61,82,0.50) 50%, rgba(8,61,82,0.10) 100%)" }} />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="font-display text-2xl text-white">{c.name}</h3>
                  <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.75)" }}>{c.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#6FB9C6" }}>
                    Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="section container-px">
        <SectionHeader eyebrow="Why Choose Us" title="Built On Trust, Crafted For Quality" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.05}>
              <div className="glass rounded-2xl p-6 h-full hover:border-primary/40 transition-colors">
                <div className="size-12 rounded-xl gold-bg grid place-items-center mb-4 shadow-gold">
                  <f.icon className="size-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section container-px">
        <SectionHeader eyebrow="Featured" title="Best-Selling Premium Products" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productGroups.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.04}>
              <Link
                to={`/products?product=${encodeURIComponent(p.name)}`}
                className="group glass rounded-2xl overflow-hidden hover:shadow-gold transition-all hover:-translate-y-1 duration-500 block"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">View all photos →</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="section container-px">
        <SectionHeader eyebrow="Testimonials" title="Loved By Our Customers" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <div className="glass rounded-2xl p-7 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, k) => <span key={k} className="text-primary">★</span>)}
                </div>
                <p className="text-foreground/85 leading-relaxed">"{t.text}"</p>
                <div className="mt-5 pt-5 border-t border-border/60">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="container-px pb-24">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl glass p-10 md:p-16 text-center shadow-elegant">
            <div className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-display font-semibold">Visit Our Store Today</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">G-8,9,10 Silver Star Complex, Chandlodiya, Ahmedabad — open Mon–Sat, 10:00 AM to 7:00 PM (Sunday Closed).</p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <a href="https://maps.google.com/?q=Silver+Star+Complex+Chandlodiya+Ahmedabad" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl gold-bg text-primary-foreground font-semibold shadow-gold">
                  <MapPin className="size-4" /> Get Directions
                </a>
                <a href="tel:+918780237347" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass font-medium">
                  <Phone className="size-4" /> +91 87802 37347
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
}
