import { Fragment, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Header from '../Header';
import Ccarousel from '../Carousel';
import Foter from '../Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 p-4">
        <Ccarousel />
        {children}
      </main>
      <Foter /> {/* Include the footer here */}
    </div>
  );
};

export default Layout;
