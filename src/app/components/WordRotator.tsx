"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["dinheiro", "grana", "dindin", "pilas", "conto", "réis", "bufunfa", "pagode"];

export default function WordRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex overflow-hidden align-bottom h-[1.1em] relative min-w-[3ch]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={WORDS[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-accent inline-block"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
