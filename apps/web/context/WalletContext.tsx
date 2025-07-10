import React, { useState, createContext, useContext } from 'react';
type WalletContextType = {
  isConnected: boolean;
  address: string | null;
  isAdmin: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
};
const WalletContext = createContext<WalletContextType | undefined>(undefined);
export function WalletProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const connectWallet = () => {
    // Mock wallet connection
    setIsConnected(true);
    setAddress('0x1234...5678');
    // Check if admin (would be verified through proper authentication)
    setIsAdmin(Math.random() > 0.8); // 20% chance of being admin for demo
  };
  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setIsAdmin(false);
  };
  return <WalletContext.Provider value={{
    isConnected,
    address,
    isAdmin,
    connectWallet,
    disconnectWallet
  }}>
      {children}
    </WalletContext.Provider>;
}
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};