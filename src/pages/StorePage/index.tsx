import React, { useState } from "react";
import StoreHeader from "../../components/Store/StoreHeader";
import TabNavigation from "../../components/Store/TabNavigation";
import ProductSearchAndCategories from "../../components/Store/ProductSearchAndCategories";
import StoreProductSection from "../../components/Store/Products";
import AboutTheStore from "../../components/Store/AboutTheStore"; 
import ConractStore from "../../components/Store/ConractStore";
import Header from "../../components/Header";

const StorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("products"); // Default to products

  const renderActiveTab = () => {
    switch (activeTab) {
      case "about":
        return <AboutTheStore />;
      case "products":
        return <StoreProductSection />;
      case "contact":
        return <ConractStore/>; 
      default:
        return <StoreProductSection />;
    }
  };

  return (
    <div className="w-full">
      <Header onCartOpen={function (): void {
        throw new Error("Function not implemented.");
      }} />
      <StoreHeader />
      <div className="container mx-auto">
        <TabNavigation setActiveTab={setActiveTab} activeTab={activeTab} />{" "}
        <div className="flex flex-col md:flex-row mt-4">
          {/* Conditionally render the ProductSearchAndCategories component only for the products tab */}
          {activeTab === "products" && (
            <div className="w-full md:w-1/4 p-4">
              <ProductSearchAndCategories />
            </div>
          )}

          {/* Right Column - Render active tab component */}
          <div className={`w-full ${activeTab === "products" ? "md:w-3/4" : "md:w-full"} p-4`}>
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
