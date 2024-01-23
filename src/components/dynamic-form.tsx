import { useState } from "react";
import NewFieldModal from "./modals/new-field-modal";
import useDynamicForm from "../hooks/useDynamicForm";
import { Field } from "../types";
import { v4 as uuidv4 } from "uuid";
import FieldSelector from "./form/field-selector";
import FormFieldRow from "./form/form-field-row";
import FormConfigs from "./form-configs";

function DynamicForm() {
  const { fields, addField, removeField, updateField, setFields } =
    useDynamicForm();
  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<Field | null>(null);

  const handleSaveField = (field: Field) => {
    const fieldIndex = fields.findIndex((f) => f.id === field.id);

    if (fieldIndex !== -1) {
      // It's an existing field, update it
      updateField(field.id, field);
    } else {
      // It's a new field, add it
      addField(field);
    }
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentField(null);
    setIsEditing(false);
  };

  const handleFieldChange = (fieldId: string, newValue: string) => {
    const fieldToUpdate = fields.find((f) => f.id === fieldId);

    if (fieldToUpdate) {
      updateField(fieldId, { ...fieldToUpdate, value: newValue });
    }
  };

  const handleFieldCreation = (fieldType: string) => {
    setCurrentField(createNewField(fieldType));
    setModalOpen(true);
  };

  const createNewField = (fieldType: string): Field => {
    const options = [];
    if (fieldType === "Dropdown") {
      options.push({ label: "", value: "", id: uuidv4() });
    }

    return {
      id: uuidv4(),
      label: "",
      fieldType,
      options,
      value: "",
      validation: { required: false, errorMessage: "" },
    };
  };

  const handleEditField = (field: Field) => {
    setCurrentField(field);
    setModalOpen(true);
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {" "}
      <FormConfigs fields={fields} setFields={setFields} />
      <FieldSelector onFieldCreate={handleFieldCreation} />
      {fields?.map((field) => (
        <FormFieldRow
          key={field.id}
          field={field}
          onRemove={() => removeField(field.id)}
          onClickEdit={() => handleEditField(field)}
          onChange={handleFieldChange}
        />
      ))}
      {currentField && (
        <NewFieldModal
          isEditing={isEditing}
          isOpen={isModalOpen}
          onClose={closeModal}
          field={currentField}
          onSave={handleSaveField}
        />
      )}
    </div>
  );
}

export default DynamicForm;
