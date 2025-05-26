
import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
}

export const useErrorHandler = () => {
  const { toast } = useToast();
  const [error, setError] = useState<Error | null>(null);
  const [isError, setIsError] = useState(false);

  const handleError = useCallback((
    error: Error | unknown,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logError = true,
      fallbackMessage = 'Произошла ошибка. Попробуйте еще раз.'
    } = options;

    const errorObj = error instanceof Error ? error : new Error(String(error));
    
    setError(errorObj);
    setIsError(true);

    if (logError) {
      console.error('Error handled:', errorObj);
    }

    if (showToast) {
      toast({
        title: 'Ошибка',
        description: errorObj.message || fallbackMessage,
        variant: 'destructive',
      });
    }

    return errorObj;
  }, [toast]);

  const clearError = useCallback(() => {
    setError(null);
    setIsError(false);
  }, []);

  const wrapAsync = useCallback(<T extends any[], R>(
    asyncFn: (...args: T) => Promise<R>,
    options?: ErrorHandlerOptions
  ) => {
    return async (...args: T): Promise<R | null> => {
      try {
        clearError();
        return await asyncFn(...args);
      } catch (error) {
        handleError(error, options);
        return null;
      }
    };
  }, [handleError, clearError]);

  return {
    error,
    isError,
    handleError,
    clearError,
    wrapAsync
  };
};
