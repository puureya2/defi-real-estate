// pageComponents/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  GithubIcon,
  LinkedinIcon,
  CodeIcon,
  LayersIcon,
  ShieldIcon,
  CpuIcon,
  BlocksIcon,
  RefreshCwIcon
} from 'lucide-react';
import { Button } from '../components/ui/Button';


export function About() {
  return (
    <div className="bg-gray-900 min-h-screen w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Revolutionizing Real Estate Investment
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                DeFi Estates bridges the gap between traditional real estate and
                blockchain technology, making property investment accessible,
                transparent, and efficient.
              </p>
            </div>
            {/* Business Model Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[{
                icon: <LayersIcon className="text-indigo-400" size={32} />,
                title: 'Property Tokenization',
                description: 'Real estate assets are divided into digital tokens, each representing partial ownership of the property.'
              }, {
                icon: <ShieldIcon className="text-indigo-400" size={32} />,
                title: 'Smart Contracts',
                description: 'Ownership rights and transactions are secured through blockchain-based smart contracts.'
              }, {
                icon: <BlocksIcon className="text-indigo-400" size={32} />,
                title: 'Fractional Ownership',
                description: 'Invest in high-value properties with as little as one token, enabling portfolio diversification.'
              }, {
                icon: <RefreshCwIcon className="text-indigo-400" size={32} />,
                title: 'Automated Returns',
                description: 'Rental income and property appreciation are automatically distributed to token holders.'
              }].map((item, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: index * 0.1
              }} viewport={{
                once: true
              }} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <div className="bg-gray-700/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>)}
              </div>
            </div>
            {/* Technical Stack Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Technical Overview
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.5
              }} viewport={{
                once: true
              }} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                  <div className="flex items-center mb-4">
                    <CodeIcon size={24} className="text-indigo-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">
                      Frontend Stack
                    </h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li>• React with TypeScript for type-safe development</li>
                    <li>• Tailwind CSS for responsive design</li>
                    <li>• Framer Motion for smooth animations</li>
                    <li>• React Router for client-side routing</li>
                    <li>• Modern ES6+ JavaScript features</li>
                  </ul>
                </motion.div>
                <motion.div initial={{
                opacity: 0,
                x: 20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.5
              }} viewport={{
                once: true
              }} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                  <div className="flex items-center mb-4">
                    <CpuIcon size={24} className="text-indigo-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">
                      Blockchain Integration
                    </h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Ethereum-based smart contracts</li>
                    <li>• Web3.js for blockchain interaction</li>
                    <li>• MetaMask and WalletConnect integration</li>
                    <li>• ERC-20 token standard for property tokens</li>
                    <li>• Decentralized storage for property documents</li>
                  </ul>
                </motion.div>
              </div>
            </div>
            {/* Developer Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-8">
                About the Developer
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-gray-300 mb-6">
                  Hi! I'm a full-stack developer passionate about blockchain
                  technology and its potential to revolutionize traditional
                  industries. DeFi Estates is my vision of making real estate
                  investment more accessible through decentralized finance.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => window.open('https://github.com/yourusername', '_blank')} icon={<GithubIcon size={18} />}>
                    GitHub
                  </Button>
                  <Button variant="outline" onClick={() => window.open('https://linkedin.com/in/yourusername', '_blank')} icon={<LinkedinIcon size={18} />}>
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
  );
}