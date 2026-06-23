import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dismiss = () => setVisible(false);

  useEffect(() => {
    // Safety fallback — hide after 4s in case video stalls / browser blocks autoplay
    const t = setTimeout(dismiss, 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <video
            ref={videoRef}
            src="/aaaaaaaaa.mov"
            autoPlay
            muted
            playsInline
            onEnded={dismiss}
            onError={dismiss}
            className="w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
