import dynamic from 'next/dynamic';

const HomeClient = dynamic(() => import('../page.client'), { ssr: true });

export default function Home() {
  return <HomeClient />;
}
