
export interface FormValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FormField<T = any> {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  validation?: FormValidationRule;
  options?: Array<{ value: T; label: string }>;
  disabled?: boolean;
  defaultValue?: T;
}

export interface FormState<T extends Record<string, any>> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}

export interface FormConfig<T extends Record<string, any>> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, FormValidationRule>>;
  onSubmit: (values: T) => Promise<void> | void;
}

// Базовые пропсы для всех компонентов формы
interface BaseFormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

// Типы для специфичных компонентов форм
export interface FormInputProps extends BaseFormFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
}

export interface FormTextareaProps extends BaseFormFieldProps {
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export interface FormSelectProps extends BaseFormFieldProps {
  placeholder?: string;
  disabled?: boolean;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
}
