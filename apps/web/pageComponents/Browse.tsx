// pageComponents/Browse.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterIcon, SlidersIcon, SearchIcon } from 'lucide-react';
import { PropertyCard } from '../components/ui/PropertyCard';
import { properties } from '../utils/mockData';
import { Button } from '../components/ui/Button';

export function Browse() {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    minPrice: '',
    maxPrice: '',
    location: 'all'
  });

  // ✅ Fix undefined issue here
  const locations = Array.from(
    new Set(
      properties
        .map((p) => p?.location?.split(',')[0]?.trim())
        .filter((l): l is string => !!l)
    )
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    let result = [...properties];

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.status !== 'all') {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }
    if (filters.location !== 'all') {
      result = result.filter((p) => p.location.includes(filters.location));
    }

    setFilteredProperties(result);
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
      minPrice: '',
      maxPrice: '',
      location: 'all'
    });
    setSearchQuery('');
    setFilteredProperties(properties);
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Browse Properties</h1>
              <p className="text-gray-400">
                Explore our curated selection of tokenized real estate investments
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                icon={<FilterIcon size={16} />}
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by property name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <SearchIcon size={20} className="text-gray-400" />
                </div>
              </div>
              <Button type="submit" className="rounded-l-none">
                Search
              </Button>
            </form>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <SlidersIcon size={20} className="mr-2" />
                  Filter Properties
                </h3>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Available">Available</option>
                    <option value="Sold Out">Sold Out</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Min Price (USD)
                  </label>
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Max Price (USD)
                  </label>
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={applyFilters}>Apply Filters</Button>
              </div>
            </motion.div>
          )}

          {/* Property List */}
          {filteredProperties.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-12 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search criteria</p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
