import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

export function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Navbar />
      <motion.main className="flex-grow" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} transition={{
      duration: 0.3
    }}>
        {children}
      </motion.main>
      <Footer />
    </div>;
}