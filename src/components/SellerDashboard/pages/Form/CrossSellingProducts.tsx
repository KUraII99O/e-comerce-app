import React from 'react';

const CrossSellingProducts: React.FC = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md mt-4 dark:border-gray-700">
      <h2 className="font-semibold mb-2 text-black dark:text-white">Cross-selling products</h2>
      <input
        type="text"
        placeholder="Search products"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
      <p className="text-gray-500 text-sm dark:text-gray-400">
        * Price field: Enter the amount you want to reduce from the original price.
        Example: If the original price is $100, enter 20 to reduce the price to $80.
      </p>
      <p className="text-gray-500 text-sm dark:text-gray-400">
        * Type field: Choose the discount type: Fixed (reduce a specific amount)
        or Percent (reduce by a percentage).
      </p>
    </div>
  );
};

export default CrossSellingProducts;
