import { useState } from "react";
import { Field } from "../types";

function useDynamicForm() {
  const [fields, setFields] = useState<Field[]>([]);

  const removeField = (id: string) => {
    const newFields = fields.filter((item) => item.id !== id);
    setFields(newFields);
  };

  const addField = (item: Field) => {
    setFields((fields) => [...fields, item]);
  };

  const updateField = (fieldId: string, updatedData: Field) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === fieldId ? { ...field, ...updatedData } : field
      )
    );
  };

  return { fields, removeField, addField, updateField,setFields };
}

export default useDynamicForm;
