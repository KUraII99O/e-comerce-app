import {useState } from 'react';
import Header from '../Header';
import Ccarousel from '../Carousel';
import Foter from '../Footer';
import CartDrawer from '../CartDrawer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)


  return (
    <div className="flex flex-col min-h-screen">
      <Header onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="flex-grow pt-16 p-4">
        <Ccarousel />
        {children}
      </main>
      <Foter /> {/* Include the footer here */}
    </div>
  );
};

export default Layout;
