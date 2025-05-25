
import { useState, useCallback, useMemo } from 'react';

export interface StateConfig<T> {
  initialValue: T;
  validator?: (value: T) => boolean;
  onChange?: (value: T) => void;
}

export const useOptimizedState = <T>(config: StateConfig<T>) => {
  const [state, setState] = useState<T>(config.initialValue);
  const [isValid, setIsValid] = useState(true);

  const updateState = useCallback((newValue: T | ((prev: T) => T)) => {
    const actualValue = typeof newValue === 'function' 
      ? (newValue as (prev: T) => T)(state) 
      : newValue;

    if (config.validator) {
      const valid = config.validator(actualValue);
      setIsValid(valid);
      if (!valid) return;
    }

    setState(actualValue);
    config.onChange?.(actualValue);
  }, [state, config]);

  const reset = useCallback(() => {
    setState(config.initialValue);
    setIsValid(true);
  }, [config.initialValue]);

  return useMemo(() => ({
    value: state,
    setValue: updateState,
    reset,
    isValid
  }), [state, updateState, reset, isValid]);
};
