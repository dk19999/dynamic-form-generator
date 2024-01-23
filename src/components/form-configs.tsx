import Dropdown from "./form/dropdown";
import useFormConfigs from "../hooks/useFormConfigs";
import Button from "./button";
import { useState } from "react";
import { Field } from "../types";
import TextInput from "./form/input";
import toast from "react-hot-toast";

function FormConfigs({
  setFields,
  fields,
}: {
  setFields: (fields: Field[]) => void;
  fields: Field[];
}) {
  const { setConfig, currentConfig, saveAsConfig, configs, labels } =
    useFormConfigs();

  const [errorMessage, setErrorMessage] = useState("");
  const [showConfigLabel, setShowConfigLabel] = useState(false);
  const [configLabel, setConfigLabel] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const current = configs.find((item) => {
      return item.id === e.target.value;
    });
    if (current) setConfig(current.id);
    setErrorMessage("");
  };

  const loadConfig = () => {
    if (!currentConfig) {
      return setErrorMessage("Please select a config first");
    }
    setFields(currentConfig?.fields);
  };

  const handleSaveConfig = () => {
    if (!configLabel) {
      return setErrorMessage("Please enter a label");
    } else {
      setErrorMessage("");
    }
    if (fields) {
      saveAsConfig(fields, configLabel);
      setShowConfigLabel(false);
      toast('Config saved successfully')
    }
  };

  return (
    <>
      <div className="flex gap-1">
        <Dropdown
          className="flex-1"
          onChange={onChange}
          options={labels}
          placeholder="Select a config"
          value={currentConfig?.label ?? ""}
        />
        <Button buttonType="primary" onClick={loadConfig}>
          Load Selected Config
        </Button>
        <div>
          {!showConfigLabel ? (
            <Button
              onClick={() => setShowConfigLabel(true)}
              buttonType="secondary"
            >
              Save current fields as a config
            </Button>
          ) : null}
        </div>
      </div>
      {showConfigLabel ? (
        <div className="flex ">
          <TextInput
            placeholder="Enter config label"
            className="h-10 mr-4"
            name="config-label"
            value={configLabel}
            onChange={(e) => setConfigLabel(e.target.value)}
          />
          <Button buttonType="primary" onClick={handleSaveConfig}>
            Confirm Save
          </Button>
        </div>
      ) : null}
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
}

export default FormConfigs;