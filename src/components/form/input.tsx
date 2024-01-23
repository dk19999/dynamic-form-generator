import React from "react";

interface TextInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({ name, value, onChange, placeholder, className }) => {
  const defaultClass = "w-full h-8 block bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  flex-1 p-2.5 ";
  const combinedClass = `${defaultClass} ${className || ''}`;

  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={combinedClass}
    />
  );
};

export default TextInput;