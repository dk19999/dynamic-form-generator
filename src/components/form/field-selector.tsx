import { useState } from "react";
import Button from "../button";
import Dropdown from "./dropdown";

interface FieldSelectorProps {
  onFieldCreate: (fieldType: string) => void;
}

export default function FieldSelector({ onFieldCreate }: FieldSelectorProps) {
  const [selectedFieldType, setSelectedFieldType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fieldTypes = [{
    id:'1',
    label:'Text Input'
  },
  {
    id:'2',
    label:'Text Area'
  },{
    id:'3',
    label:'Dropdown'
  },
  {
    id:'4',
    label:'Checkbox'
  },
  {
    id:'5',
    label:'Radio Button'
  },
  ];

  const handleCreateClick = () => {
    if (selectedFieldType) {
      onFieldCreate(selectedFieldType);
      setSelectedFieldType("");
    } else {
      if (!selectedFieldType) {
        setErrorMessage("Please select a field type first");
        return;
      }
      setErrorMessage("");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFieldType(e.target.value);
    setErrorMessage("");
  };

  return (
    <>
      <Dropdown
        onChange={onChange}
        options={fieldTypes}
        placeholder="Select field type to add"
        value={selectedFieldType}
      />
      <Button buttonType="primary" onClick={handleCreateClick}>
        Create Field
      </Button>
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
}
