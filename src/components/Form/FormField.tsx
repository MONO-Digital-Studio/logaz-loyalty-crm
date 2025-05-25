
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormInputProps, FormTextareaProps, FormSelectProps } from '@/types/forms';
import { cn } from '@/lib/utils';

interface BaseFormFieldProps {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

const FormFieldWrapper: React.FC<BaseFormFieldProps> = ({ 
  children, 
  label, 
  required, 
  error, 
  helperText 
}) => (
  <div className="space-y-2">
    <Label className={cn(error && "text-destructive")}>
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
    {children}
    {error && (
      <p className="text-sm text-destructive">{error}</p>
    )}
    {helperText && !error && (
      <p className="text-sm text-muted-foreground">{helperText}</p>
    )}
  </div>
);

export const FormInput: React.FC<FormInputProps & {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}> = ({ 
  label, 
  required, 
  error, 
  helperText, 
  value, 
  onChange, 
  onBlur,
  ...inputProps 
}) => (
  <FormFieldWrapper label={label} required={required} error={error} helperText={helperText}>
    <Input
      {...inputProps}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={cn(error && "border-destructive")}
    />
  </FormFieldWrapper>
);

export const FormTextarea: React.FC<FormTextareaProps & {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}> = ({ 
  label, 
  required, 
  error, 
  helperText, 
  value, 
  onChange, 
  onBlur,
  rows = 3,
  ...textareaProps 
}) => (
  <FormFieldWrapper label={label} required={required} error={error} helperText={helperText}>
    <Textarea
      {...textareaProps}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      rows={rows}
      className={cn(error && "border-destructive")}
    />
  </FormFieldWrapper>
);

export const FormSelect: React.FC<FormSelectProps & {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}> = ({ 
  label, 
  required, 
  error, 
  helperText, 
  value, 
  onChange, 
  onBlur,
  options,
  placeholder,
  ...selectProps 
}) => (
  <FormFieldWrapper label={label} required={required} error={error} helperText={helperText}>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn(error && "border-destructive")} onBlur={onBlur}>
        <SelectValue placeholder={placeholder || `Выберите ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </FormFieldWrapper>
);
