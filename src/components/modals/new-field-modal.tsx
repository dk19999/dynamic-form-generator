import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Field, Option } from "../../types";
import { v4 as uuidv4 } from "uuid";
import TextInput from "../form/input";
import { IoCloseOutline } from "react-icons/io5";
import Button from "../button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  field: Field;
  onSave: (field: Field) => void;
  isEditing: boolean;
}

export default function MyModal({
  isOpen,
  field,
  onClose,
  onSave,
  isEditing,
}: Props) {
  console.log("🚀 ~ MyModal ~ field:", field);
  const [localField, setLocalField] = useState(field);
  const [errors, setErrors] = useState({ label: "" });

  useEffect(() => {
    setLocalField(field);
  }, [field]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalField((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddOption = () => {
    const newOption: Option = { id: uuidv4(), label: "", value: "" };
    setLocalField((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
  };

  const handleRemoveOption = (optionId: string) => {
    const newOptions = localField.options.filter(
      (option) => option.id !== optionId
    );
    setLocalField((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSave = () => {
    if (!localField.label.trim()) {
      setErrors((prev) => ({ ...prev, label: "Label is required." }));
      return;
    }
    let error = "";
    if (localField.fieldType === "Dropdown") {
      if (!localField.options.length) {
        error = "Please add atleast one dropdown option";
        setErrors((prev) => ({
          ...prev,
          label: error,
        }));
      }
      localField.options.forEach((item) => {
        if (!item.value || !item.label) {
          error = "Please enter all option values and labels";
          return setErrors((prev) => ({
            ...prev,
            label: error,
          }));
        }
      });
    }
    if (error) {
      setErrors((prev) => ({ ...prev, label: error }));
      return;
    }
    onSave(localField);
    onClose();
  };

  const handleOptionChange = (
    optionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOptions = localField.options.map((option) =>
      option.id === optionId
        ? { ...option, [e.target.name]: e.target.value }
        : option
    );
    setLocalField((prev) => ({ ...prev, options: newOptions }));
  };

  if (!isOpen) return null;

  return (
    <>
      <Dialog
        as="div"
        open={true}
        className="relative z-10"
        onClose={() => null}
      >
        <div className="fixed inset-0 bg-black/25" aria-hidden="true"></div>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {isEditing ? "Edit field" : "Add a new Field"}
                <IoCloseOutline
                  onClick={onClose}
                  className="absolute top-4 right-3 cursor-pointer"
                />
              </Dialog.Title>
              <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                <label>
                  Label:
                  <TextInput
                    name="label"
                    value={localField.label || ""}
                    onChange={handleChange}
                  />
                </label>
                {errors.label && (
                  <p className="error text-red-700">{errors.label}</p>
                )}
                {localField.fieldType === "Dropdown" && (
                  <div className="mt-4">
                    <p>Dropdown Options:</p>
                    {localField.options.map((option) => (
                      <div key={option.id} className="m-1">
                        <div className="flex gap-1 flex-wrap items-baseline">
                          <TextInput
                            name="label"
                            placeholder="Option Label"
                            value={option.label}
                            className="inline"
                            onChange={(e) => handleOptionChange(option.id, e)}
                          />
                          <TextInput
                            name="value"
                            placeholder="Option Value"
                            value={option.value}
                            className="inline"
                            onChange={(e) => handleOptionChange(option.id, e)}
                          />
                          <IoCloseOutline
                            onClick={() => handleRemoveOption(option.id)}
                            className="text-lg font-bold cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      className="mt-4"
                      buttonType="primary"
                      onClick={handleAddOption}
                    >
                      Add another Option
                    </Button>
                  </div>
                )}
              </form>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
