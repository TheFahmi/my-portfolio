import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Use dynamic import for client component
const LayoutClient = dynamic(() => import('./Layout.client'), { ssr: false });

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <LayoutClient>{children}</LayoutClient>;
};

export default Layout;
