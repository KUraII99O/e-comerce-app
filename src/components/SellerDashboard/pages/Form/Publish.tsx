import React from 'react';

interface PublishProps {
  onSave: () => void;
  onSaveAndExit: () => void;
}

const Publish: React.FC<PublishProps> = ({ onSave, onSaveAndExit }) => {
  return (
    <div className="flex space-x-2">
      {/* Save Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600 transition"
        onClick={onSave}
      >
        <span role="img" aria-label="save-icon">💾</span> {/* Placeholder icon */}
        <span>Save</span>
      </button>

      {/* Save & Exit Button */}
      <button
        className="border border-gray-400 text-gray-700 px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-100 transition"
        onClick={onSaveAndExit}
      >
        <span role="img" aria-label="exit-icon">🏠</span> {/* Placeholder icon */}
        <span>Save & Exit</span>
      </button>
    </div>
  );
};

export default Publish;
