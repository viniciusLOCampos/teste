import React from 'react';
import TextInput from './TextInput';
import GenerateButton from './GenerateButton';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  onGenerate,
  required = false
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <div className="w-full">
        <TextInput
          id={id}
          label={label}
          value={value}
          onChange={onChange}
          required={required}
          type="text"
        />
      </div>
      <div className="flex-shrink-0 self-end mb-4">
        <GenerateButton onClick={onGenerate} />
      </div>
    </div>
  );
};

export default PasswordInput; 