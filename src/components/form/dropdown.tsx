import React from "react";

interface Props {
  options: { id: string; label: string; value?: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  placeholder?: string;
}

function Dropdown({ options, value='', onChange, className, placeholder }: Props) {
  const defaultClass = "p-2 border border-gray-300 rounded";
  const combinedClass = `${defaultClass} ${className || ""}`;

  return (
    <select className={combinedClass} value={value} onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map(({ id, label, value }) => (
        <option key={id} value={value ?? label}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
