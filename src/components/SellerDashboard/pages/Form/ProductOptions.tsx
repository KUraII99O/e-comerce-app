import React from 'react';

const ProductOptions: React.FC = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md mt-4 dark:border-gray-700">
      <h2 className="font-semibold mb-2 text-black dark:text-white">Product options</h2>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Add new option
        </button>
        <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <option>Select Global Option</option>
          {/* Add options here */}
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Add Global Option
        </button>
      </div>
    </div>
  );
};

export default ProductOptions;
