import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Layout from "@/components/site/Layout";
import { FadeIn } from "@/components/site/Section";

export default function ThankYou() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout
      title="Thank You · Swaraj Hardware"
      description="Thank you for contacting Swaraj Hardware. We have received your query."
    >
      <section className="container-px min-h-[75vh] flex items-center justify-center py-20 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full opacity-10 blur-[100px] pointer-events-none bg-primary" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-80 rounded-full opacity-10 blur-[90px] pointer-events-none bg-amber-500" />

        <FadeIn className="w-full max-w-xl">
          <div className="glass rounded-3xl p-10 md:p-12 text-center border border-primary/10 shadow-elegant relative z-10">
            {/* Animated Checkmark Icon */}
            <div className="mx-auto size-20 rounded-full gold-bg grid place-items-center shadow-gold mb-8 relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                className="size-10 rounded-full bg-primary-foreground grid place-items-center"
              >
                <Check className="size-6 text-primary" strokeWidth={3} />
              </motion.div>
              
              {/* Outer pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-amber-400 pointer-events-none"
              />
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-black text-[#083D52] mb-4 tracking-tight">
              Thank You!
            </h1>
            
            <p className="text-foreground/80 font-medium text-base md:text-lg mb-8 leading-relaxed">
              Your inquiry has been successfully received. We have saved your details, and a representative from Swaraj Hardware will connect with you shortly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl gold-bg text-primary-foreground font-semibold shadow-gold hover:shadow-glow transition-all"
              >
                Return to Home
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl glass text-foreground/80 hover:text-primary font-semibold border border-primary/20 hover:border-primary transition-all"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
}
