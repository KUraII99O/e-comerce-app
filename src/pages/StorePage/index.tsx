import React from 'react';
import StoreHeader from '../../components/Store/StoreHeader';
import TabNavigation from '../../components/Store/TabNavigation';
import ProductSearchAndCategories from '../../components/Store/ProductSearchAndCategories';
import NavBar from '../../components/Stores/Header';
import StoreProductSection from '../../components/Store/Products';

const StorePage: React.FC = () => {
  return (
    <div className="w-full">
      <NavBar />
      <StoreHeader /> {/* Full-width header */}
      
      {/* Content area */}
      <div className="container mx-auto">
        {/* Tabs */}
        <TabNavigation />

        <div className="flex flex-col md:flex-row mt-4">
          {/* Left Column - Navigation Menu (Categories and Search) */}
          <div className="w-full md:w-1/4 p-4">
            <ProductSearchAndCategories />
          </div>

          {/* Right Column - Product Section */}
          <div className="w-full md:w-3/4 p-4">
            <StoreProductSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
