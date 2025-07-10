import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRightIcon, BuildingIcon, CoinsIcon, ShieldIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PropertyCard } from '../components/ui/PropertyCard';
import { properties } from '../utils/mockData';

export function Home() {
  // Only get the first 3 properties for featured section
  const featuredProperties = properties.slice(0, 3);
  const router = useRouter();
  return <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80" alt="Real Estate" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Invest in Real Estate with{' '}
              <span className="text-indigo-400">Blockchain</span> Technology
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Own fractions of premium properties with full transparency,
              liquidity, and security provided by blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => {}}>
                Explore Properties
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push('/about')}>
                How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Featured Properties */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">
              Featured Properties
            </h2>
            <Link href="/browse" className="text-indigo-400 hover:text-indigo-300 flex items-center">
              View All
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => <motion.div key={property.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: index * 0.1
          }}>
                <PropertyCard property={property} />
              </motion.div>)}
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              DeFi Estates makes real estate investment accessible, transparent,
              and liquid through blockchain technology.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.1
          }} viewport={{
            once: true
          }} className="bg-gray-700 p-8 rounded-xl">
              <div className="bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BuildingIcon size={32} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Property Tokenization
              </h3>
              <p className="text-gray-300">
                Premium properties are selected, verified, and tokenized into
                smart contracts, allowing fractional ownership.
              </p>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.2
          }} viewport={{
            once: true
          }} className="bg-gray-700 p-8 rounded-xl">
              <div className="bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <CoinsIcon size={32} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Investment & Returns
              </h3>
              <p className="text-gray-300">
                Buy property tokens using cryptocurrency and earn returns from
                rental income and property appreciation.
              </p>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.3
          }} viewport={{
            once: true
          }} className="bg-gray-700 p-8 rounded-xl">
              <div className="bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <ShieldIcon size={32} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Security & Transparency
              </h3>
              <p className="text-gray-300">
                All transactions and ownership records are secured on the
                blockchain, providing full transparency and security.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Investing?
              </h2>
              <p className="text-xl text-indigo-200">
                Join thousands of investors already building their real estate
                portfolio with DeFi Estates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => {}}>
                Connect Wallet
              </Button>
              <Button size="lg" variant="outline" onClick={() => {}}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
}