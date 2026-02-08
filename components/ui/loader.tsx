"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-6xl"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🐾
          </motion.div>
          <motion.div
            className="absolute bottom-0 w-full h-2 bg-black/10 rounded-full blur-sm"
            animate={{
              scaleX: [0.8, 1.2, 0.8],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text animate-pulse">
          Loading PetLy...
        </p>
      </div>
    </div>
  );
}
