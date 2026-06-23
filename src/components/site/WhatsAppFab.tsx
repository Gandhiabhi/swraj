import { motion } from "framer-motion";

export default function WhatsAppFab() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      href="https://wa.me/917600002910?text=Hello%20Swaraj%20Hardware%2C%20I%20have%20an%20enquiry."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-40 bottom-6 right-6 flex items-center gap-2.5 pl-3 pr-5 py-3 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_32px_rgba(37,211,102,0.65)] hover:scale-105 transition-all duration-300"
      style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
    >
      {/* Official WhatsApp icon */}
      <svg viewBox="0 0 32 32" className="size-6 fill-white shrink-0">
        <path d="M16 2.8C8.72 2.8 2.8 8.72 2.8 16c0 2.34.63 4.62 1.83 6.62L2.5 29.2l6.77-1.77A13.17 13.17 0 0 0 16 29.2c7.28 0 13.2-5.92 13.2-13.2S23.28 2.8 16 2.8zm0 24.18a11 11 0 0 1-5.61-1.54l-.4-.24-4.02 1.05 1.07-3.91-.26-.41A10.97 10.97 0 0 1 5 16c0-6.07 4.93-11 11-11s11 4.93 11 11-4.93 11-11 11zm6.03-8.22c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.39.24-.72.08-.33-.17-1.38-.51-2.63-1.63-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.51.14-.67.15-.14.33-.38.5-.57.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.74-1.78-1.01-2.44-.27-.64-.55-.55-.74-.56l-.63-.01c-.22 0-.58.08-.88.41-.3.33-1.16 1.14-1.16 2.78s1.19 3.23 1.36 3.45c.17.22 2.35 3.59 5.7 5.03.8.34 1.42.55 1.91.7.8.26 1.53.22 2.1.13.64-.1 1.95-.8 2.22-1.56.28-.77.28-1.43.19-1.56-.08-.14-.3-.22-.63-.39z"/>
      </svg>
      <span className="text-white font-bold text-sm tracking-wide">WhatsApp</span>
    </motion.a>
  );
}
