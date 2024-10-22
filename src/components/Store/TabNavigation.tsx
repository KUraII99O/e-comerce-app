import React from 'react';
import { useParams } from 'react-router-dom';

const TabNavigation: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>(); // Dynamically getting storeId from the URL

  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <a href="#" className="text-blue-500 border-b-2 border-blue-500 px-3 py-2">Home</a>
      <a href="#" className="text-gray-500 hover:text-blue-500 px-3 py-2">About the Store</a>
      <a href="/contactstore" className="text-gray-500 hover:text-blue-500 px-3 py-2">Send Message</a>
      <a href={`/stores/${storeId}/add-product`} className="text-gray-500 hover:text-blue-500 px-3 py-2">Add Product</a>
    </div>
  );
};

export default TabNavigation;
