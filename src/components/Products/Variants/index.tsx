import React from 'react';

const Variants: React.FC = () => {
  return (
    <div className="border p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Variants</h2>
      <div>
        <label className="block mb-1 font-medium">Options</label>
        <div className="grid grid-cols-2 gap-4">
          <select className="input">
            <option>Size</option>
            <option>Color</option>
          </select>
          <input type="text" className="input" placeholder="Enter tags" />
        </div>
      </div>
      <div className="mt-4">
        <button className="text-sm text-blue-500">Add another option</button>
      </div>
    </div>
  );
};

export default Variants;
