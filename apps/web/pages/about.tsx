// pages/about.tsx
import React from 'react';
import { About } from '../pageComponents/About'; // moved About to pageComponents
import { Layout } from '../components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <About />
    </Layout>
  );
}
