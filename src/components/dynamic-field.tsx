import React from "react";
import { Field } from "../types"; 
import TextInput from "./form/input";
import TextArea from "./form/text-area";

interface DynamicFormFieldProps {
  field: Field;
  onChange: (newValue: string) => void; 
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ field, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  switch (field.fieldType) {
    case "Text Input":
      return (
        <TextInput
          name='input'
          className="w-full"
          value={field.value}
          onChange={handleInputChange}
        />
      );
    case "Text Area":
      return (
        <TextArea
          name='text-area'
          value={field.value}
          className="w-full"
          onChange={handleInputChange}
        />
      );
    case "Dropdown":
      return (
        <select
        className="p-2 border border-gray-300 rounded mr-2 w-full"
        value={field.value} onChange={handleInputChange}>
          {field.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "Checkbox":
      return (
        <input
          type="checkbox"
          checked={field.value === 'true'} 
          onChange={(e) => onChange(e.target.checked.toString())}
        />
      );
    case "Radio Button":
      return (
        <div className="flex flex-wrap gap-2">
          {field.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                value={option.value}
                checked={field.value === option.value}
                onChange={handleInputChange}
                className="mx-1"
              />
              {option.label}
            </label>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default DynamicFormField;
