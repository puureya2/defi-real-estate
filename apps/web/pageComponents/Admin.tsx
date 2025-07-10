import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { PlusIcon, EditIcon, TrashIcon, ShieldIcon, BuildingIcon, CoinsIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useWallet } from '../context/WalletContext';
import { properties } from '../utils/mockData';

export function Admin() {
  const {
    isConnected,
    isAdmin
  } = useWallet();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('properties');
  const tabs = [{
    id: 'properties',
    label: 'Properties',
    icon: <BuildingIcon size={16} />
  }, {
    id: 'contracts',
    label: 'Contracts',
    icon: <CoinsIcon size={16} />
  }];
  // Mock contract deployments
  const contractDeployments = [{
    id: 1,
    name: 'Luxury Downtown Apartment',
    address: '0x1234...5678',
    date: '2023-06-10',
    status: 'Active'
  }, {
    id: 2,
    name: 'Beachfront Villa',
    address: '0xabcd...efgh',
    date: '2023-05-15',
    status: 'Active'
  }, {
    id: 3,
    name: 'Modern Office Building',
    address: '0x7890...1234',
    date: '2023-04-22',
    status: 'Active'
  }, {
    id: 4,
    name: 'Urban Retail Space',
    address: '0xefgh...ijkl',
    date: '2023-03-05',
    status: 'Active'
  }, {
    id: 5,
    name: 'Historic Brownstone',
    address: '0x2468...1357',
    date: '2023-02-18',
    status: 'Active'
  }];
  if (!isConnected || !isAdmin) {
    return <div className="bg-gray-900 min-h-screen w-full flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-gray-800 rounded-xl border border-gray-700">
          <ShieldIcon size={48} className="mx-auto text-indigo-400 mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Admin Access Required
          </h2>
          <p className="text-gray-300 mb-6">
            You need admin privileges to access this dashboard.
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
                Admin Dashboard
              </h1>
              <p className="text-gray-400">
                Manage properties, contracts, and platform settings
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button icon={<PlusIcon size={16} />}>Add New Property</Button>
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
                <span>Total Properties</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {properties.length}
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
                <span>Active Contracts</span>
              </div>
              <div className="text-3xl font-bold text-indigo-400">
                {contractDeployments.length}
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
                <span>Total Sales</span>
              </div>
              <div className="text-3xl font-bold text-green-400">5.67 ETH</div>
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
              {activeTab === 'properties' && <div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Manage Properties
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {properties.map(property => <motion.tr key={property.id} initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      duration: 0.3
                    }}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                                  <img src={property.imageUrl} alt={property.title} className="h-full w-full object-cover" />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-white">
                                    {property.title}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                              {property.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge color={property.status === 'Available' ? 'green' : property.status === 'Sold Out' ? 'red' : 'yellow'}>
                                {property.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-indigo-400">
                              {property.tokenPrice} ETH
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm" icon={<EditIcon size={14} />}>
                                  Edit
                                </Button>
                                <Button variant="danger" size="sm" icon={<TrashIcon size={14} />}>
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </motion.tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>}
              {activeTab === 'contracts' && <div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Contract Deployments
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Contract Address
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Deployment Date
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 bg-gray-700 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {contractDeployments.map(contract => <motion.tr key={contract.id} initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      duration: 0.3
                    }}>
                            <td className="px-6 py-4 whitespace-nowrap text-white">
                              {contract.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-indigo-400 font-mono">
                                {contract.address}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                              {contract.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge color="green">{contract.status}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Button variant="outline" size="sm">
                                View on Etherscan
                              </Button>
                            </td>
                          </motion.tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>}
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
}