import React from 'react';

const ProductInfo: React.FC = () => {
  return (
    <div className="border p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Product Information</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" className="input" placeholder="Tiro Track Jacket" />
        </div>
        <div>
          <label className="block mb-1 font-medium">SKU</label>
          <input type="text" className="input" placeholder="eg. 34821032" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-1 font-medium">Weight</label>
          <input type="text" className="input" placeholder="0.0" />
        </div>
      </div>
      <div className="mt-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea className="input" rows={4} placeholder="Type your description..."></textarea>
      </div>
    </div>
  );
};

export default ProductInfo;
