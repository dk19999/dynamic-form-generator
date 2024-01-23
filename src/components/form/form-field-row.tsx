import { Field } from "../../types";
import Button from "../button";
import DynamicFormField from "../dynamic-field";

interface FormFieldRowProps {
  field: Field;
  onRemove: () => void;
  onClickEdit: () => void;
  onChange: (fieldId: string, newValue: string) => void;
}

export default function FormFieldRow({
  field,
  onRemove,
  onClickEdit,
  onChange,
}: FormFieldRowProps) {
  return (
    <div className="">
      <div>
      <label>{field.label}</label>
      <DynamicFormField
        field={field}
        onChange={(newValue) => onChange(field.id, newValue)}
      />
      </div>
      <div className="mt-2">
      <Button buttonType="secondary" onClick={onRemove} className="m-1">
        Remove
      </Button>
      <Button buttonType="primary" onClick={onClickEdit} className="m-1">
        Edit
      </Button>
      </div>
    </div>
  );
}
