import { useState } from "react";
import { Config, Field } from "../types";
import { v4 as uuidv4 } from "uuid";

export default function useFormConfigs() {
  const [configs, setConfigs] = useState<Config[]>([]);
  console.log("🚀 ~ useFormConfigs ~ configs:", configs)
  const [currentConfig, setCurrentConfig] = useState<Config>();
  console.log("🚀 ~ useFormConfigs ~ currentConfig:", currentConfig)

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
    console.log("🚀 ~ saveAsConfig ~ config:", config)
    setConfigs((state) => [config, ...state]);
  };

  return { currentConfig, setConfig, saveAsConfig, configs, labels };
}
