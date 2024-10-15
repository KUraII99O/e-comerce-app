import React from 'react';

const TabNavigation: React.FC = () => {
  return (
    <div className="  flex items-center space-x-4 p-4 border-b">
      <a href="#" className="text-blue-500 border-b-2 border-blue-500 px-3 py-2">Home</a>
      <a href="#" className="text-gray-500 hover:text-blue-500 px-3 py-2">About the Store</a>
      <a href="/contactstore" className="text-gray-500 hover:text-blue-500 px-3 py-2">Send Message</a>
      <a href="/addproduct" className="text-gray-500 hover:text-blue-500 px-3 py-2">Add Product</a>
    </div>
  );
};

export default TabNavigation;
