import React from 'react';
import { motion } from 'framer-motion';
import { BuildingIcon } from 'lucide-react';

export function Logo() {
  return <motion.div className="flex items-center" whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }}>
      <div className="relative">
        <BuildingIcon size={28} className="text-indigo-400" />
        {/* Animated particles */}
        {[...Array(3)].map((_, i) => <motion.div key={i} className="absolute w-1.5 h-1.5 bg-indigo-400/50 rounded-full" initial={{
        scale: 0,
        x: 0,
        y: 0
      }} animate={{
        scale: [0, 1, 0],
        x: [0, (i + 1) * 10, (i + 1) * 15],
        y: [0, -(i + 1) * 10, -(i + 1) * 15]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        delay: i * 0.2,
        ease: 'easeInOut'
      }} />)}
        {/* Pulsing dot */}
        <motion.div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full" animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.8, 1]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }} />
      </div>
      <span className="ml-2 text-xl font-bold text-white">
        DeFi<span className="text-indigo-400">Estates</span>
      </span>
    </motion.div>;
}