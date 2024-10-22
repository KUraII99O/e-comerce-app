import React from 'react';

const Media: React.FC = () => {
  return (
    <div className="border p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Media</h2>
      <div className="flex justify-center border-dashed border-2 p-4">
        <span className="text-gray-500">Drag and drop your file here or browse files</span>
      </div>
      <div className="mt-4">
        <button className="text-sm text-blue-500">Add media from URL</button>
      </div>
    </div>
  );
};

export default Media;
