import { Link } from "react-router-dom";
import {
  Home,
  Info,
  Wrench,
  Package,
  Phone,
  Map,
  ArrowUpRight,
  LayoutGrid,
  Boxes,
} from "lucide-react";
import Layout from "@/components/site/Layout";
import { SectionHeader, FadeIn } from "@/components/site/Section";
import { categories, productGroups } from "@/data/site";

const mainPages = [
  { to: "/", label: "Home", desc: "Premium hardware store in Ahmedabad.", icon: Home },
  { to: "/about", label: "About Us", desc: "Our story, trust and 25+ years of service.", icon: Info },
  { to: "/services", label: "Services", desc: "What we offer for homes & interiors.", icon: Wrench },
  { to: "/products", label: "Products", desc: "Explore our full catalogue.", icon: Package },
  { to: "/contact", label: "Contact", desc: "Visit, call or message us.", icon: Phone },
];

export default function Sitemap() {
  return (
    <Layout
      title="Sitemap · Swaraj Hardware"
      description="Complete sitemap of Swaraj Hardware — browse all pages, product categories and product collections in one place."
    >
      {/* Header band */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #083D52 0%, #0A4A60 100%)" }}
      >
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-[#2D96A8]/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-[#6FB9C6]/15 blur-3xl" />
        <div className="relative container-px pt-16 pb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#6FB9C6]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#6FB9C6]">Sitemap</span>
            <span className="h-px w-10 bg-[#6FB9C6]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-white leading-tight">
            Everything On This Website
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto text-base md:text-lg">
            A quick map of all our pages, product categories and collections — find what you need in one glance.
          </p>
        </div>
      </section>

      {/* Main pages */}
      <section className="section container-px">
        <SectionHeader eyebrow="Pages" title="Main Pages" center={false} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mainPages.map((p, i) => (
            <FadeIn key={p.to} delay={i * 0.05}>
              <Link
                to={p.to}
                className="group glass rounded-2xl p-6 flex items-start gap-4 h-full hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="size-12 rounded-xl gold-bg grid place-items-center shrink-0 shadow-gold">
                  <p.icon className="size-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-lg text-[#083D52]">{p.label}</h3>
                    <ArrowUpRight className="size-4 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Product categories */}
      <section className="section container-px pt-0">
        <SectionHeader
          eyebrow="Categories"
          title="Product Categories"
          subtitle="Browse products grouped by category."
          center={false}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <FadeIn key={c.slug} delay={i * 0.04}>
              <Link
                to={`/products?category=${c.slug}`}
                className="group glass rounded-2xl p-5 flex items-center gap-4 h-full hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="size-14 rounded-xl overflow-hidden shrink-0 shadow-elegant">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#083D52] truncate">{c.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{c.desc}</p>
                </div>
                <LayoutGrid className="size-4 text-primary/60 shrink-0 group-hover:text-primary transition-colors" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Product collections */}
      <section className="section container-px pt-0">
        <SectionHeader
          eyebrow="Collections"
          title="Product Collections"
          subtitle="Every product gallery available on our website."
          center={false}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productGroups.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.03}>
              <Link
                to={`/products?product=${encodeURIComponent(p.name)}`}
                className="group flex items-center gap-3 rounded-xl px-4 py-3 bg-card border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Boxes className="size-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-[#083D52] flex-1">{p.name}</span>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="container-px pb-24">
        <FadeIn>
          <div className="rounded-3xl glass p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl gold-bg grid place-items-center shrink-0 shadow-gold">
                <Map className="size-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl text-[#083D52]">Can't find what you need?</h3>
                <p className="text-sm text-muted-foreground mt-1">Reach out and we'll help you right away.</p>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl gold-bg text-primary-foreground font-semibold shadow-gold hover:shadow-glow transition-shadow shrink-0"
            >
              <Phone className="size-4" /> Contact Us
            </Link>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
}
