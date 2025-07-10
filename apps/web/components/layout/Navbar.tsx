import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  SearchIcon,
  LayoutDashboardIcon,
  MenuIcon,
  XIcon
} from 'lucide-react';

import { useWallet } from '../../context/WalletContext';
import { WalletConnectModal } from '../modals/WalletConnectModal';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isConnected, address, isAdmin, disconnectWallet } = useWallet();
  const { pathname } = useRouter();

  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon size={16} /> },
    { name: 'Browse', path: '/browse', icon: <SearchIcon size={16} /> }
  ];

  if (isConnected) {
    navLinks.push({
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboardIcon size={16} />
    });
  }

  if (isAdmin) {
    navLinks.push({
      name: 'Admin',
      path: '/admin',
      icon: <LayoutDashboardIcon size={16} />
    });
  }

  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Logo />
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`${
                        pathname === link.path
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
                    >
                      <span className="mr-1">{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {isConnected ? (
                  <div className="flex items-center">
                    <span className="bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-300 mr-3">
                      {address?.substring(0, 6)}...
                      {address?.substring(address.length - 4)}
                    </span>
                    <Button onClick={disconnectWallet} variant="secondary">
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsModalOpen(true)}>
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${
                    pathname === link.path
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } px-3 py-2 rounded-md text-base font-medium flex items-center`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name}
                </Link>
              ))}

              {isConnected ? (
                <div className="px-3 py-2">
                  <span className="block text-gray-300 text-sm mb-2">
                    {address?.substring(0, 6)}...
                    {address?.substring(address.length - 4)}
                  </span>
                  <Button onClick={disconnectWallet} variant="secondary" fullWidth>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2">
                  <Button
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    fullWidth
                  >
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
