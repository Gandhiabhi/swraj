import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="border-t mt-10"
      style={{ borderColor: "rgba(45,150,168,0.20)", background: "#083D52" }}
    >
      <div className="container-px py-16 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-14 w-auto overflow-hidden rounded-xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex items-center">
              <img
                src="/favicon.jpg"
                alt="Swaraj Hardware Logo"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-white">Swaraj Hardware</div>
              <div className="text-xs uppercase tracking-[0.2em]" style={{ color: "#6FB9C6" }}>
                Premium Hardware · Since 1999
              </div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/90">
            One stop solution for premium Hardware and iterior needs near ahmedabad.plywood , laminate , door fittings,kitchen accessories,bathroom fittings,wardrobe fittings and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-base mb-4" style={{ color: "#6FB9C6" }}>Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-base mb-4" style={{ color: "#6FB9C6" }}>Visit Us</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-3">
              <MapPin className="size-4 mt-0.5 shrink-0 text-white/60" />
              G-8,9,10 Silver Star Complex, Chandlodiya, Ahmedabad
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 mt-0.5 shrink-0 text-white/60" />
              <div>
                <a href="tel:+918780237347" className="hover:text-white transition-colors block">+91 87802 37347 (Call)</a>
                <a href="https://wa.me/917600002910" target="_blank" rel="noreferrer" className="hover:text-white transition-colors block">+91 76000 02910 (WhatsApp)</a>
              </div>
            </li>
            <li className="flex gap-3">
              <Clock className="size-4 mt-0.5 shrink-0 text-white/60" />
              <div>
                <div>Mon–Sat · 10:00 AM – 7:00 PM</div>
                <div>Sunday: Closed</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-px py-6 border-t border-white/10 text-xs text-white/60 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          Designed &amp; Developed by:{" "}
          <a
            href="https://www.gandhimediasolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#6FB9C6] transition-colors font-medium"
          >
            GMS
          </a>
        </div>
        <div>
          © {new Date().getFullYear()} Swaraj Hardware. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
