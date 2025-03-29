import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ 
  onClick, 
  disabled = false 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-9 px-3 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 shadow-md text-sm"
    >
      Generate
    </button>
  );
};

export default GenerateButton; 