import React from 'react';

const Pricing: React.FC = () => {
  return (
    <div className="border p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Pricing</h2>
      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input type="number" className="input" placeholder="0.00" />
      </div>
      <div className="mt-4">
        <button className="text-sm text-blue-500">Set "Compare to" price</button>
        <button className="text-sm text-blue-500 ml-4">Bulk discount pricing</button>
      </div>
      <div className="mt-4 flex items-center">
        <label className="block mb-1 font-medium">Availability</label>
        <input type="checkbox" className="ml-2" />
      </div>
    </div>
  );
};

export default Pricing;
