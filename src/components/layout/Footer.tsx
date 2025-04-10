import dynamic from 'next/dynamic';

// Use dynamic import for client component
const FooterClient = dynamic(() => import('./Footer.client'), { ssr: false });

const Footer = () => {
  return <FooterClient />;
};

export default Footer;
