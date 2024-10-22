import React from 'react';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button className="bg-red-500 text-white py-2 px-4 rounded">Delete</button>
      <div>
        <button className="text-gray-600 py-2 px-4">Discard</button>
        <button className="bg-blue-500 text-white py-2 px-4 ml-4 rounded">Save</button>
      </div>
    </div>
  );
};

export default ActionButtons;
