import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./button";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface OptionEditorProps {
  options: Option[];
  onOptionsChange: (options: Option[]) => void;
}

const OptionEditor = ({ options, onOptionsChange }: OptionEditorProps) => {
  const handleOptionChange = (
    optionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId
        ? { ...option, [e.target.name]: e.target.value }
        : option
    );
    onOptionsChange(updatedOptions);
  };

  const addOption = () => {
    const newOption = { id: uuidv4(), label: "", value: "" };
    onOptionsChange([...options, newOption]);
  };

  const removeOption = (optionId: string) => {
    onOptionsChange(options.filter((option) => option.id !== optionId));
  };

  return (
    <>
      {options.map((option) => (
        <div key={option.id}>
          <input
            type="text"
            name="label"
            placeholder="Label"
            value={option.label}
            onChange={(e) => handleOptionChange(option.id, e)}
          />
          <input
            type="text"
            name="value"
            placeholder="Value"
            value={option.value}
            onChange={(e) => handleOptionChange(option.id, e)}
          />
          <Button buttonType="secondary"  onClick={() => removeOption(option.id)}>
            Remove
          </Button>
        </div>
      ))}
      <Button buttonType="primary" 
       onClick={addOption}>
        Add Option
      </Button>
    </>
  );
};

export default OptionEditor;
