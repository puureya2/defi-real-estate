import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  MapPinIcon,
  CoinsIcon,
  FileTextIcon,
  ClipboardCheckIcon,
  BarChart2Icon,
  CalendarIcon
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { TransactionModal } from '../components/modals/TransactionModal';
import { useWallet } from '../context/WalletContext';
import { Property } from '../utils/types';

type PropertyDetailProps = {
  property: Property;
};

export function PropertyDetail({ property }: PropertyDetailProps) {
  const router = useRouter();
  const { isConnected } = useWallet();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const progressPercentage = (property.tokensSold / property.totalTokens) * 100;

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Properties
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700"
              >
                <div className="relative">
                  <img src={property.imageUrl} alt={property.title} className="w-full h-96 object-cover" />
                  <div className="absolute top-4 right-4">
                    <Badge
                      color={
                        property.status === 'Available'
                          ? 'green'
                          : property.status === 'Sold Out'
                          ? 'red'
                          : 'yellow'
                      }
                    >
                      {property.status}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-white mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-400 mb-6">
                    <MapPinIcon size={18} className="mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">About this property</h2>
                    <p className="text-gray-300">{property.description}</p>
                  </div>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <ClipboardCheckIcon size={16} className="mr-2 text-indigo-400" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Documents</h2>
                    <div className="space-y-3">
                      {property.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          className="flex items-center bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors"
                        >
                          <FileTextIcon size={18} className="mr-2 text-indigo-400" />
                          <span className="text-gray-300">{doc.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 sticky top-24">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-gray-400">Price</div>
                      <div className="text-2xl font-bold text-white">${property.price.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Token Price</div>
                      <div className="text-2xl font-bold text-indigo-400 flex items-center">
                        <CoinsIcon size={18} className="mr-1" />
                        {property.tokenPrice} ETH
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Funding Progress</span>
                      <span className="text-white">
                        {property.tokensSold}/{property.totalTokens} tokens
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-gray-400">{progressPercentage.toFixed(1)}% Funded</span>
                      <span className="text-gray-400">Goal: {property.totalTokens} tokens</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center text-gray-400 text-sm mb-1">
                        <BarChart2Icon size={14} className="mr-1" />
                        Expected Return
                      </div>
                      <div className="text-lg font-semibold text-white">
                        {property.returnRate}% <span className="text-sm text-gray-400">/ year</span>
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center text-gray-400 text-sm mb-1">
                        <CalendarIcon size={14} className="mr-1" />
                        Min. Hold Period
                      </div>
                      <div className="text-lg font-semibold text-white">
                        6 <span className="text-sm text-gray-400">months</span>
                      </div>
                    </div>
                  </div>
                  {property.contractAddress && (
                    <div className="mb-6">
                      <div className="text-sm text-gray-400 mb-1">Smart Contract</div>
                      <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
                        <span className="text-indigo-400 font-mono text-sm truncate">{property.contractAddress}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(property.contractAddress || '')}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}
                  <Button
                    fullWidth
                    size="lg"
                    disabled={!isConnected || property.status !== 'Available'}
                    onClick={() => setIsTransactionModalOpen(true)}
                  >
                    {!isConnected
                      ? 'Connect Wallet to Buy'
                      : property.status !== 'Available'
                      ? property.status
                      : 'Buy Tokens'}
                  </Button>
                  {!isConnected && (
                    <p className="text-center text-sm text-gray-400 mt-4">
                      You need to connect your wallet to purchase property tokens
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        property={{
          id: property.id,
          title: property.title,
          price: property.price,
          tokenPrice: property.tokenPrice
        }}
      />
    </div>
  );
}
