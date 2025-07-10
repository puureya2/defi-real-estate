import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { WalletIcon, CoinsIcon, HistoryIcon, BuildingIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useWallet } from '../context/WalletContext';
import { userPortfolio } from '../utils/mockData';

export function User() {
  const {
    isConnected,
    address,
    disconnectWallet
  } = useWallet();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('portfolio');
  const tabs = [{
    id: 'portfolio',
    label: 'My Portfolio',
    icon: <BuildingIcon size={16} />
  }, {
    id: 'transactions',
    label: 'Transactions',
    icon: <HistoryIcon size={16} />
  }, {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon size={16} />
  }];
  // Mock transactions
  const transactions = [{
    id: 1,
    type: 'purchase',
    property: 'Luxury Downtown Apartment',
    tokens: 2,
    value: 1.0,
    date: '2023-06-15'
  }, {
    id: 2,
    type: 'purchase',
    property: 'Beachfront Villa',
    tokens: 1,
    value: 1.2,
    date: '2023-05-22'
  }, {
    id: 3,
    type: 'dividend',
    property: 'Luxury Downtown Apartment',
    tokens: 0,
    value: 0.05,
    date: '2023-04-01'
  }, {
    id: 4,
    type: 'purchase',
    property: 'Urban Retail Space',
    tokens: 1,
    value: 0.67,
    date: '2023-03-10'
  }];
  if (!isConnected) {
    return <div className="bg-gray-900 min-h-screen w-full flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-gray-800 rounded-xl border border-gray-700">
          <WalletIcon size={48} className="mx-auto text-indigo-400 mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Wallet Not Connected
          </h2>
          <p className="text-gray-300 mb-6">
            Please connect your wallet to access your dashboard and portfolio.
          </p>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </div>;
  }
  return <div className="bg-gray-900 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                My Dashboard
              </h1>
              <div className="flex items-center text-gray-400">
                <span className="bg-gray-800 rounded-full px-3 py-1 text-sm border border-gray-700">
                  {address?.substring(0, 6)}...
                  {address?.substring(address.length - 4)}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" icon={<LogOutIcon size={16} />} onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.1
          }} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center text-gray-400 mb-2">
                <BuildingIcon size={16} className="mr-2" />
                <span>Properties Owned</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {userPortfolio.totalProperties}
              </div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.2
          }} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center text-gray-400 mb-2">
                <CoinsIcon size={16} className="mr-2" />
                <span>Total Invested</span>
              </div>
              <div className="text-3xl font-bold text-indigo-400">
                {userPortfolio.totalInvested} ETH
              </div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.3
          }} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center text-gray-400 mb-2">
                <HistoryIcon size={16} className="mr-2" />
                <span>Last Transaction</span>
              </div>
              <div className="text-xl font-semibold text-white">3 days ago</div>
            </motion.div>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="border-b border-gray-700">
              <nav className="flex">
                {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-4 flex items-center text-sm font-medium ${activeTab === tab.id ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}>
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>)}
              </nav>
            </div>
            <div className="p-6">
              {activeTab === 'portfolio' && <div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    My Properties
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Tokens Owned
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Value
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {userPortfolio.properties.map(property => <motion.tr key={property.propertyId} initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      duration: 0.3
                    }}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-white">
                                {property.propertyName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                              {property.tokensOwned}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-indigo-400">
                                {property.investmentValue} ETH
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Button variant="outline" size="sm" onClick={() => router.push(`/property/${property.propertyId}`)}>
                                View
                              </Button>
                            </td>
                          </motion.tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>}
              {activeTab === 'transactions' && <div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Transaction History
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {transactions.map(tx => <motion.tr key={tx.id} initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      duration: 0.3
                    }}>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                              {tx.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge color={tx.type === 'purchase' ? 'blue' : 'green'}>
                                {tx.type === 'purchase' ? 'Purchase' : 'Dividend'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-white">
                              {tx.property}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-indigo-400">
                              {tx.value} ETH{' '}
                              {tx.tokens > 0 && `(${tx.tokens} tokens)`}
                            </td>
                          </motion.tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>}
              {activeTab === 'settings' && <div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Account Settings
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Notification Preferences
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input id="email-notifications" type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded" />
                          <label htmlFor="email-notifications" className="ml-2 text-gray-300">
                            Email notifications for new properties
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input id="dividend-notifications" type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded" />
                          <label htmlFor="dividend-notifications" className="ml-2 text-gray-300">
                            Dividend payment notifications
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Connected Wallet
                      </h4>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-8 h-8 mr-3" />
                            <div>
                              <div className="text-white font-medium">
                                MetaMask
                              </div>
                              <div className="text-gray-400 text-sm">
                                {address}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={disconnectWallet}>
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button variant="secondary" fullWidth>
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
}