import React from 'react';

const RelatedProducts: React.FC = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md mt-4">
      <h2 className="font-semibold mb-2">Related products</h2>
      <input
        type="text"
        placeholder="Search products"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default RelatedProducts;
