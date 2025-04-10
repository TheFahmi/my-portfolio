import dynamic from 'next/dynamic';

// Use dynamic import for client component
const NavbarClient = dynamic(() => import('./Navbar.client'), { ssr: false });

const Navbar = () => {
  return <NavbarClient />;
};

export default Navbar;
