
import { useState, useCallback, useMemo } from 'react';

export interface FormField<T = any> {
  value: T;
  error?: string;
  touched: boolean;
}

export interface FormState<T extends Record<string, any>> {
  fields: { [K in keyof T]: FormField<T[K]> };
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

export interface FormValidators<T> {
  [K: string]: (value: any, formData: T) => string | undefined;
}

export const useFormState = <T extends Record<string, any>>(
  initialValues: T,
  validators: FormValidators<T> = {}
) => {
  const [formState, setFormState] = useState<FormState<T>>(() => ({
    fields: Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = {
        value: initialValues[key],
        touched: false
      };
      return acc;
    }, {} as FormState<T>['fields']),
    isValid: true,
    isDirty: false,
    isSubmitting: false
  }));

  const validateField = useCallback((key: keyof T, value: any, allValues: T) => {
    const validator = validators[key as string];
    return validator ? validator(value, allValues) : undefined;
  }, [validators]);

  const updateField = useCallback((key: keyof T, value: T[keyof T]) => {
    setFormState(prev => {
      const newFields = { ...prev.fields };
      const error = validateField(key, value, 
        Object.keys(newFields).reduce((acc, k) => {
          acc[k as keyof T] = k === key ? value : newFields[k as keyof T].value;
          return acc;
        }, {} as T)
      );

      newFields[key] = {
        value,
        error,
        touched: true
      };

      const isValid = Object.values(newFields).every(field => !field.error);
      const isDirty = Object.keys(newFields).some(k => 
        newFields[k as keyof T].value !== initialValues[k as keyof T]
      );

      return {
        ...prev,
        fields: newFields,
        isValid,
        isDirty
      };
    });
  }, [validateField, initialValues]);

  const touchField = useCallback((key: keyof T) => {
    setFormState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [key]: {
          ...prev.fields[key],
          touched: true
        }
      }
    }));
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState(prev => ({ ...prev, isSubmitting }));
  }, []);

  const reset = useCallback(() => {
    setFormState({
      fields: Object.keys(initialValues).reduce((acc, key) => {
        acc[key as keyof T] = {
          value: initialValues[key],
          touched: false
        };
        return acc;
      }, {} as FormState<T>['fields']),
      isValid: true,
      isDirty: false,
      isSubmitting: false
    });
  }, [initialValues]);

  const getValues = useCallback(() => {
    return Object.keys(formState.fields).reduce((acc, key) => {
      acc[key as keyof T] = formState.fields[key as keyof T].value;
      return acc;
    }, {} as T);
  }, [formState.fields]);

  const actions = useMemo(() => ({
    updateField,
    touchField,
    setSubmitting,
    reset,
    getValues
  }), [updateField, touchField, setSubmitting, reset, getValues]);

  return [formState, actions] as const;
};
