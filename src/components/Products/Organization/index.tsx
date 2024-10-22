import React from 'react';

const Organization: React.FC = () => {
  return (
    <div className="border p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Organization</h2>
      <div>
        <label className="block mb-1 font-medium">Vendor</label>
        <input type="text" className="input" placeholder="e.g., Nike" />
      </div>
      <div className="mt-4">
        <label className="block mb-1 font-medium">Category</label>
        <select className="input">
          <option>Clothing</option>
          <option>Footwear</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block mb-1 font-medium">Collections</label>
        <select className="input">
          <option>Winter</option>
          <option>Summer</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block mb-1 font-medium">Tags</label>
        <input type="text" className="input" placeholder="Enter tags here" />
      </div>
    </div>
  );
};

export default Organization;
