import React from "react";

interface TextInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const TextArea: React.FC<TextInputProps> = ({ name, value, onChange, placeholder, className }) => {
  const defaultClass = " h-8 bg-white border border-gray-300 block text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  flex-1 p-2.5 ";
  const combinedClass = `${defaultClass} ${className || ''}`;

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={combinedClass}
    />
  );
};

export default TextArea;