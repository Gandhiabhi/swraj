import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

// Show loader only once per browser session
const hasSeenLoader = sessionStorage.getItem("loader_seen");

export default function Layout({ children, title, description }: { children: ReactNode; title?: string; description?: string; }) {
  const loc = useLocation();
  const [showLoader, setShowLoader] = useState(!hasSeenLoader);

  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement('meta'); m.setAttribute('name','description'); document.head.appendChild(m); }
      m.setAttribute('content', description);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [title, description, loc.pathname]);

  useEffect(() => {
    if (showLoader) {
      // Mark session immediately — Loader self-dismisses via video events
      sessionStorage.setItem("loader_seen", "1");
      // Safety net: hide loader after 4.5s even if Loader component fails to unmount
      const t = setTimeout(() => setShowLoader(false), 4500);
      return () => clearTimeout(t);
    }
  }, [showLoader]);

  return (
    <div className="min-h-screen flex flex-col">
      {showLoader && <Loader />}
      <Navbar />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

