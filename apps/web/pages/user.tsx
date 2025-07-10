// pages/about.tsx
import React from 'react';
import { User } from '../pageComponents/User'; // moved User to pageComponents
import { Layout } from '../components/layout/Layout';

export default function UserPage() {
  return (
    <Layout>
      <User />
    </Layout>
  );
}
