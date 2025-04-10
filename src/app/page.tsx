import dynamic from 'next/dynamic';

// Use dynamic import for client component
const HomeClient = dynamic(() => import('./page.client'), { ssr: true });

export default function Home() {
  return <HomeClient />;
}
