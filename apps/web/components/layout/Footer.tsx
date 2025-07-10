import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';

export function Footer() {
  return <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              DeFi Estates
            </h3>
            <p className="text-gray-400">
              A decentralized real estate platform where you can invest in
              tokenized properties using blockchain technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <motion.a href="#" whileHover={{
              y: -3
            }} className="text-gray-400 hover:text-indigo-400 transition-colors">
                <GithubIcon size={24} />
              </motion.a>
              <motion.a href="#" whileHover={{
              y: -3
            }} className="text-gray-400 hover:text-indigo-400 transition-colors">
                <TwitterIcon size={24} />
              </motion.a>
              <motion.a href="#" whileHover={{
              y: -3
            }} className="text-gray-400 hover:text-indigo-400 transition-colors">
                <LinkedinIcon size={24} />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} DeFi Estates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}