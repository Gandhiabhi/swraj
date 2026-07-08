import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/site/Layout";
import { SectionHeader } from "@/components/site/Section";
import { productGroups, productFilters } from "@/data/site";
import { X, ChevronLeft, ChevronRight, Phone } from "lucide-react";

type Group = typeof productGroups[number];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const filter = categoryParam;

  const setFilter = (newFilter: string) => {
    if (newFilter === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: newFilter });
    }
  };

  const [active, setActive] = useState<Group | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [modalReady, setModalReady] = useState(false);

  // Lead capture states
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", mobile: "", city: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Check if lead was captured before
  useEffect(() => {
    const saved = localStorage.getItem("swaraj_lead_captured");
    if (saved === "true") {
      setIsLeadCaptured(true);
    }
  }, []);

  // Auto-open a specific product gallery when ?product=Name is in the URL
  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      const match = productGroups.find(
        (g) => g.name.toLowerCase() === productParam.toLowerCase()
      );
      if (match) {
        setActive(match);
        setLightboxIdx(null);
        setModalReady(false);
        // Remove the product param from URL (keep category if present)
        const next: Record<string, string> = {};
        if (categoryParam !== "all") next.category = categoryParam;
        setSearchParams(next, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list =
    filter === "all"
      ? productGroups
      : productGroups.filter((p) => p.category === filter);

  const openGroup = (g: Group) => {
    setActive(g);
    setLightboxIdx(null);
    setModalReady(false);
  };

  const closeGroup = () => {
    setActive(null);
    setLightboxIdx(null);
    setModalReady(false);
  };

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const prevImg = () => {
    if (!active || lightboxIdx === null) return;
    const totalCount = isLeadCaptured ? active.images.length : Math.min(active.images.length, 3);
    setLightboxIdx((lightboxIdx - 1 + totalCount) % totalCount);
  };
  const nextImg = () => {
    if (!active || lightboxIdx === null) return;
    const totalCount = isLeadCaptured ? active.images.length : Math.min(active.images.length, 3);
    setLightboxIdx((lightboxIdx + 1) % totalCount);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple 10-digit mobile check
    if (!/^\d{10}$/.test(formData.mobile)) {
      setSubmitError("Please enter a valid 10-digit mobile number");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const payload = {
      name: formData.name,
      mobile: formData.mobile,
      city: formData.city,
      product: active?.name || "General Inquiry",
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    // 🔴 PLACE YOUR GOOGLE SCRIPT WEBHOOK URL HERE
    const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyNSODdgRVVunc3wQcFk6NCTgOSCK5PShfQA6Di75Nlq3QGXLENngybxk11LkcMGw0/exec";

    try {
      if (WEBHOOK_URL && WEBHOOK_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL") {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
        });
      }

      // Success flow
      localStorage.setItem("swaraj_lead_captured", "true");
    setIsLeadCaptured(true);
    setShowLeadForm(false);
  } catch (err) {
    console.error("Submission error, unlocking gallery for user experience:", err);
    // Fail-safe: Unlock even if submit fails so client doesn't get blocked
    localStorage.setItem("swaraj_lead_captured", "true");
    setIsLeadCaptured(true);
    setShowLeadForm(false);
  } finally {
    setSubmitting(false);
  }
};

return (
  <Layout
    title="Products · Swaraj Hardware"
    description="Browse premium locks, handles, bathroom fittings, kitchen & wardrobe accessories, laminates and more."
  >
    <section className="container-px section">
      <SectionHeader
        eyebrow="Products"
        title="Curated For Every Space"
        subtitle="Filter by category to discover what fits your project."
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {productFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${filter === f.key
              ? "gold-bg text-primary-foreground shadow-gold"
              : "glass text-foreground/80 hover:text-primary"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Product Group Grid — one card per product type */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((g) => (
            <motion.button
              key={g.name}
              layout
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openGroup(g)}
              className="group glass rounded-2xl overflow-hidden hover:shadow-gold transition-all hover:-translate-y-1 duration-500 text-left"
            >
              {/* Cover image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={g.img}
                  alt={g.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Photo count badge */}
                <div
                  className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
                  style={{ background: "rgba(8,61,82,0.75)", backdropFilter: "blur(6px)" }}
                >
                  {g.images.length} photos
                </div>
              </div>
              <div className="p-4">
                <div className="font-medium">{g.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Tap to view all</div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>

    {/* ── Product Gallery Modal ── */}
    <AnimatePresence>
      {active && (
        <motion.div
          key="gallery-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
          onClick={closeGroup}
        >
          <motion.div
            key="gallery-panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setModalReady(true)}
            className="relative w-full max-w-4xl glass rounded-3xl border border-border/60 p-6"
            style={{ boxShadow: "0 30px 80px rgba(8,61,82,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl">{active.name}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {isLeadCaptured
                    ? `${active.images.length} images — tap any to enlarge`
                    : `3 of ${active.images.length} images shown — unlock the rest below`
                  }
                </p>
              </div>
              <button
                onClick={closeGroup}
                className="size-10 rounded-full glass flex items-center justify-center hover:bg-destructive/10 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {modalReady ? (
                <>
                  {(isLeadCaptured ? active.images : active.images.slice(0, 3)).map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => openLightbox(idx)}
                      className="group aspect-square rounded-xl overflow-hidden hover:ring-2 hover:ring-primary transition-all"
                    >
                      <img
                        src={src}
                        alt={`${active.name} ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </button>
                  ))}

                  {/* View More Lock Button Card */}
                  {!isLeadCaptured && active.images.length > 3 && (
                    <button
                      onClick={() => setShowLeadForm(true)}
                      className="group aspect-square rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/45 flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:scale-[1.03]"
                    >
                      <div className="size-11 rounded-full bg-primary/15 flex items-center justify-center mb-2 text-primary group-hover:scale-110 transition-transform">
                        {/* Lock icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      </div>
                      <span className="text-xs font-semibold text-primary">View {active.images.length - 3} More Photos</span>
                      <span className="text-[9px] text-muted-foreground mt-1">Click to unlock free gallery</span>
                    </button>
                  )}
                </>
              ) : (
                Array.from({ length: Math.min(active.images.length, 8) }).map((_, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl bg-card/45 animate-pulse border border-border/10"
                  />
                ))
              )}
            </div>

            {/* Enquire CTA */}
            <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center gap-4">
              <p className="text-sm text-muted-foreground flex-1">
                Genuine products from authorised brands. Available in multiple finishes and sizes.
              </p>
              <a
                href="tel:+918780237347"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gold-bg text-primary-foreground font-semibold shadow-gold"
              >
                <Phone className="size-4" /> Enquire Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* ── Fullscreen Lightbox ── */}
    <AnimatePresence>
      {active && lightboxIdx !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[2000] bg-black/92 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white z-10"
            onClick={closeLightbox}
          >
            <X className="size-5" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 sm:left-6 size-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white z-10"
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={lightboxIdx}
              src={active.images[lightboxIdx]}
              alt={`${active.name} ${lightboxIdx + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </AnimatePresence>

          {/* Next */}
          <button
            className="absolute right-3 sm:right-6 size-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white z-10"
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIdx + 1} / {isLeadCaptured ? active.images.length : Math.min(active.images.length, 3)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* ── Lead Capture Form Modal ── */}
    <AnimatePresence>
      {showLeadForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowLeadForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md bg-white border border-[#2D96A8]/20 rounded-3xl p-6 shadow-elegant text-[#083D52]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/55">
              <div>
                <h3 className="font-display text-xl font-bold text-[#083D52]">Unlock Full Gallery</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Please provide details to view all products</p>
              </div>
              <button
                onClick={() => setShowLeadForm(false)}
                className="size-8 rounded-full bg-muted/65 flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Product Name Display */}
              <div className="bg-[#2D96A8]/10 border border-[#2D96A8]/20 rounded-xl px-4 py-2 text-xs font-semibold text-[#2D96A8]">
                Product: {active?.name || "Premium Catalog"}
              </div>

              <div>
                <label htmlFor="lead-name" className="block text-xs font-semibold mb-1 text-[#083D52]/80">Full Name</label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-border/70 rounded-xl text-sm focus:outline-none focus:border-[#2D96A8] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="lead-mobile" className="block text-xs font-semibold mb-1 text-[#083D52]/80">Mobile Number</label>
                <input
                  id="lead-mobile"
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 border border-border/70 rounded-xl text-sm focus:outline-none focus:border-[#2D96A8] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="lead-city" className="block text-xs font-semibold mb-1 text-[#083D52]/80">City</label>
                <input
                  id="lead-city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter your city (e.g. Ahmedabad)"
                  className="w-full px-4 py-3 border border-border/70 rounded-xl text-sm focus:outline-none focus:border-[#2D96A8] transition-colors"
                />
              </div>

              {submitError && (
                <p className="text-xs font-semibold text-destructive">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #2D96A8 0%, #083D52 100%)",
                  boxShadow: "0 4px 16px rgba(45,150,168,0.25)"
                }}
              >
                {submitting ? (
                  <>
                    <div className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Unlocking...
                  </>
                ) : (
                  "Submit & Unlock Gallery"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </Layout>
);
}
