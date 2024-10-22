import React from 'react';

const Attributes: React.FC = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">Attributes</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Add new attributes
        </button>
      </div>
      <p className="text-gray-500">
        Adding new attributes helps the product to have many options, such as size or color.
      </p>
    </div>
  );
};

export default Attributes;
