'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { PropertyDetail } from '../../pageComponents/PropertyDetail';
import { properties } from '../../utils/mockData';

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="bg-gray-900 min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Property not found
          </h2>
          <button
            onClick={() => router.push('/browse')}
            className="text-indigo-400 hover:underline"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return <PropertyDetail property={property} />;
}
