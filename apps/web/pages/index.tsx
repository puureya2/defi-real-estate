// web/pages/index.tsx
import { Layout } from '../components/layout/Layout';
import { Home } from '../pageComponents/Home';

export default function IndexPage() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
