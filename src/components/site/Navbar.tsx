import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const isHomePage = loc.pathname === "/";
  const useDarkNavbar = scrolled || !isHomePage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container-px">
        <div className={cn(
          "flex items-center justify-between rounded-2xl px-5 lg:px-7 py-3 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl border border-[#2D96A8]/20 shadow-[0_8px_32px_rgba(8,61,82,0.12)]"
            : "bg-transparent"
        )}>
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-20 sm:h-24 w-auto overflow-hidden rounded-xl shadow-[0_4px_16px_rgba(45,150,168,0.25)] bg-white flex items-center transition-all duration-500">
              <img
                src="/pdf_page-0001.jpg"
                alt="Swaraj Hardware Logo"
                className="h-20 sm:h-24 w-auto object-contain transition-all duration-500"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => cn(
                  "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300",
                  // When scrolled OR on non-home pages → use dark colors
                  // When on Home page AND not scrolled → use white
                  useDarkNavbar
                    ? isActive
                      ? "text-[#2D96A8] bg-[#2D96A8]/10"
                      : "text-[#083D52] hover:text-[#2D96A8] hover:bg-[#2D96A8]/10"
                    : isActive
                      ? "text-[#6FB9C6] bg-white/15"
                      : "text-white/90 hover:text-white hover:bg-white/15"
                )}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918780237347"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #2D96A8 0%, #083D52 100%)",
                boxShadow: "0 4px 16px rgba(45,150,168,0.40)"
              }}
            >
              <Phone className="size-4" /> Call Now
            </a>
          </div>

          {/* MOBILE HAMBURGER — white on hero, dark when scrolled */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              useDarkNavbar ? "text-[#083D52]" : "text-white"
            )}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU — always light card */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 rounded-2xl p-4 border border-[#2D96A8]/20"
              style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)" }}
            >
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) => cn(
                      "px-4 py-3 rounded-lg text-sm font-medium",
                      isActive
                        ? "text-[#2D96A8] bg-[#2D96A8]/10"
                        : "text-[#083D52]/85 hover:bg-[#F2F2F2]"
                    )}
                  >
                    {l.label}
                  </NavLink>
                ))}
                <a
                  href="tel:+918780237347"
                  className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, #2D96A8 0%, #083D52 100%)" }}
                >
                  <Phone className="size-4" /> +91 87802 37347
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
