
export interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  error?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps extends FormFieldProps {
  options: SelectOption[];
  multiple?: boolean;
}

export interface FormInputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export interface FormTextareaProps extends FormFieldProps {
  rows?: number;
  maxLength?: number;
}

export interface FormValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  validation?: FormValidationRule;
  options?: SelectOption[];
  placeholder?: string;
}

export interface FormConfig {
  fields: FormField[];
  submitLabel?: string;
  cancelLabel?: string;
}
