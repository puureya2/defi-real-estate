// pages/about.tsx
import React from 'react';
import { Home } from '../pageComponents/Home'; // moved Home to pageComponents
import { Layout } from '../components/layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
