import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, WalletIcon } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

type WalletConnectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function WalletConnectModal({
  isOpen,
  onClose
}: WalletConnectModalProps) {
  const {
    connectWallet
  } = useWallet();
  const handleConnect = () => {
    connectWallet();
    onClose();
  };
  return <AnimatePresence>
      {isOpen && <>
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-gray-800/90 backdrop-blur rounded-xl border border-gray-700 shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Connect Wallet
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <XIcon size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={handleConnect} className="bg-gray-700 hover:bg-gray-600 w-full p-4 rounded-lg flex items-center justify-between transition-colors">
                  <div className="flex items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-8 h-8 mr-3" />
                    <div>
                      <span className="text-white font-medium block">
                        MetaMask
                      </span>
                      <span className="text-gray-400 text-sm">Popular</span>
                    </div>
                  </div>
                  <span className="text-indigo-400">Connect →</span>
                </motion.button>
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={handleConnect} className="bg-gray-700 hover:bg-gray-600 w-full p-4 rounded-lg flex items-center justify-between transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 bg-blue-500 rounded-lg flex items-center justify-center">
                      <WalletIcon size={20} className="text-white" />
                    </div>
                    <div>
                      <span className="text-white font-medium block">
                        WalletConnect
                      </span>
                      <span className="text-gray-400 text-sm">Universal</span>
                    </div>
                  </div>
                  <span className="text-indigo-400">Connect →</span>
                </motion.button>
              </div>
              <p className="mt-6 text-sm text-gray-400 text-center">
                By connecting your wallet, you agree to our Terms of Service and
                Privacy Policy
              </p>
            </motion.div>
          </div>
        </>}
    </AnimatePresence>;
}