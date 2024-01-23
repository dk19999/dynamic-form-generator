export interface Option {
  id:string;
  label: string;
  value: string;
}

export interface Field {
  id: string;
  label: string;
  fieldType: string;
  options: Option[];
  value: string;
  validation: {
    required: boolean;
    errorMessage: string;
  };
}

export interface Config {
 id:string;
 fields:Field[];
 label:string; 
}