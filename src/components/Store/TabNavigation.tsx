import React from 'react';

interface TabNavigationProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string; // Add activeTab to props
}

const TabNavigation: React.FC<TabNavigationProps> = ({ setActiveTab, activeTab }) => {
  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <button 
        className={`px-3 py-2 transition duration-300 ${activeTab === "products" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 hover:text-blue-500"}`}
        onClick={() => setActiveTab("products")}
      >
        Products
      </button>
      <button 
        className={`px-3 py-2 transition duration-300 ${activeTab === "about" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 hover:text-blue-500"}`}
        onClick={() => setActiveTab("about")}
      >
        About the Store
      </button>
      <button 
        className={`px-3 py-2 transition duration-300 ${activeTab === "contact" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 hover:text-blue-500"}`}
        onClick={() => setActiveTab("contact")}
      >
        Send Message
      </button>
    </div>
  );
};

export default TabNavigation;
