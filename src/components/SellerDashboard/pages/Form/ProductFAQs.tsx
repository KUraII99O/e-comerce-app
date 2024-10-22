import React from 'react';

const ProductFAQs: React.FC = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md mt-4">
      <h2 className="font-semibold mb-2">Product FAQs</h2>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md mb-2">
        Add new
      </button>
      <p className="text-gray-500">
        or <a href="#" className="text-blue-600">Select from existing FAQs</a>
      </p>
    </div>
  );
};

export default ProductFAQs;
