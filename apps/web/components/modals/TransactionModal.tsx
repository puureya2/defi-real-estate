import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CheckCircleIcon, AlertCircleIcon, LoaderIcon } from 'lucide-react';
import { Button } from '../ui/Button';

type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: string;
    title: string;
    price: number;
    tokenPrice: number;
  };
};

export function TransactionModal({
  isOpen,
  onClose,
  property
}: TransactionModalProps) {
  const [status, setStatus] = useState<'initial' | 'processing' | 'success' | 'error'>('initial');
  const [tokenAmount, setTokenAmount] = useState(1);
  const handleTransaction = () => {
    setStatus('processing');
    // Simulate transaction processing
    setTimeout(() => {
      // 90% chance of success for demo purposes
      if (Math.random() > 0.1) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 2000);
  };
  const handleClose = () => {
    if (status === 'processing') return;
    setStatus('initial');
    setTokenAmount(1);
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
      }} onClick={handleClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
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
                  {status === 'initial' && 'Purchase Property Tokens'}
                  {status === 'processing' && 'Processing Transaction'}
                  {status === 'success' && 'Transaction Complete'}
                  {status === 'error' && 'Transaction Failed'}
                </h3>
                <button onClick={handleClose} className="text-gray-400 hover:text-white" disabled={status === 'processing'}>
                  <XIcon size={24} />
                </button>
              </div>
              {status === 'initial' && <>
                  <div className="mb-6">
                    <div className="text-gray-300 mb-4">
                      <p className="mb-1">Property: {property.title}</p>
                      <p className="mb-1">
                        Token Price: {property.tokenPrice} ETH
                      </p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Number of Tokens to Purchase
                      </label>
                      <div className="flex items-center">
                        <button onClick={() => setTokenAmount(Math.max(1, tokenAmount - 1))} className="bg-gray-700 text-white px-3 py-2 rounded-l-md hover:bg-gray-600">
                          -
                        </button>
                        <input type="number" value={tokenAmount} onChange={e => setTokenAmount(parseInt(e.target.value) || 1)} min="1" className="bg-gray-700 text-white text-center py-2 w-20 focus:outline-none" />
                        <button onClick={() => setTokenAmount(tokenAmount + 1)} className="bg-gray-700 text-white px-3 py-2 rounded-r-md hover:bg-gray-600">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="text-white">
                          {(property.tokenPrice * tokenAmount).toFixed(4)} ETH
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Gas Fee (est.)</span>
                        <span className="text-white">0.0012 ETH</span>
                      </div>
                      <div className="border-t border-gray-600 my-2 pt-2 flex justify-between font-semibold">
                        <span className="text-gray-300">Total</span>
                        <span className="text-indigo-400">
                          {(property.tokenPrice * tokenAmount + 0.0012).toFixed(4)}{' '}
                          ETH
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleTransaction} fullWidth>
                    Confirm Purchase
                  </Button>
                </>}
              {status === 'processing' && <div className="text-center py-8">
                  <motion.div animate={{
              rotate: 360
            }} transition={{
              repeat: Infinity,
              duration: 1,
              ease: 'linear'
            }} className="mx-auto mb-4">
                    <LoaderIcon size={48} className="text-indigo-400" />
                  </motion.div>
                  <p className="text-gray-300 mb-2">
                    Processing your transaction...
                  </p>
                  <p className="text-sm text-gray-400">
                    Please wait and do not close this window
                  </p>
                </div>}
              {status === 'success' && <div className="text-center py-6">
                  <motion.div initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: 'spring',
              stiffness: 200,
              damping: 10
            }} className="mx-auto mb-4 text-green-400">
                    <CheckCircleIcon size={48} />
                  </motion.div>
                  <h4 className="text-xl font-medium text-white mb-2">
                    Purchase Successful!
                  </h4>
                  <p className="text-gray-300 mb-6">
                    You have successfully purchased {tokenAmount} tokens of{' '}
                    {property.title}
                  </p>
                  <Button onClick={handleClose} fullWidth>
                    View My Portfolio
                  </Button>
                </div>}
              {status === 'error' && <div className="text-center py-6">
                  <motion.div initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: 'spring',
              stiffness: 200,
              damping: 10
            }} className="mx-auto mb-4 text-red-400">
                    <AlertCircleIcon size={48} />
                  </motion.div>
                  <h4 className="text-xl font-medium text-white mb-2">
                    Transaction Failed
                  </h4>
                  <p className="text-gray-300 mb-6">
                    There was an error processing your transaction. Please try
                    again.
                  </p>
                  <div className="flex space-x-3">
                    <Button onClick={handleClose} variant="secondary" fullWidth>
                      Cancel
                    </Button>
                    <Button onClick={handleTransaction} fullWidth>
                      Try Again
                    </Button>
                  </div>
                </div>}
            </motion.div>
          </div>
        </>}
    </AnimatePresence>;
}