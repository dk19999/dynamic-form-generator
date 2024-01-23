import { useEffect, useState } from "react";
import { Config, Field } from "../types";
import { v4 as uuidv4 } from "uuid";

export default function useFormConfigs() {
 const [configs, setConfigs] = useState<Config[]>(() => {
    // Load configs from localStorage or set to an empty array if not available
    const savedConfigs = localStorage.getItem("formConfigs");
    return savedConfigs ? JSON.parse(savedConfigs) : [];
  });
  const [currentConfig, setCurrentConfig] = useState<Config>();

  useEffect(() => {
    // Save configs to localStorage whenever they change
    localStorage.setItem("formConfigs", JSON.stringify(configs));
  }, [configs]);

  const labels = configs.map((item) => ({
    id: item.id,
    label: item.label,
    value: item.id,
  }));

  const setConfig = (id: string) => {
    const newConfig = configs.find((item) => item.id === id);
    setCurrentConfig(newConfig);
  };

  const saveAsConfig = (fields: Field[], label: string) => {
    const config: Config = { fields, id: uuidv4(), label };
    setConfigs((state) => [config, ...state]);
  };

  return { currentConfig, setConfig, saveAsConfig, configs, labels };
}
