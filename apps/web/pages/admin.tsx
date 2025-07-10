// pages/about.tsx
import React from 'react';
import { Admin } from '../pageComponents/Admin'; // moved Admin to pageComponents
import { Layout } from '../components/layout/Layout';

export default function AdminPage() {
  return (
    <Layout>
      <Admin />
    </Layout>
  );
}
