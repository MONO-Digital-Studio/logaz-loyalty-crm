
import { useCallback } from 'react';
import { toast } from 'sonner';

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
}

export interface APIError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export function useErrorHandler() {
  const handleError = useCallback((
    error: Error | APIError | string,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logError = true,
      fallbackMessage = 'Произошла неожиданная ошибка'
    } = options;

    let errorMessage: string;
    let errorDetails: any = null;

    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message || fallbackMessage;
      errorDetails = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = error.message || fallbackMessage;
      errorDetails = error;
    } else {
      errorMessage = fallbackMessage;
      errorDetails = error;
    }

    if (logError) {
      console.error('Error handled:', errorMessage, errorDetails);
    }

    if (showToast) {
      toast.error(errorMessage);
    }

    return errorMessage;
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    options: ErrorHandlerOptions = {}
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error as Error, options);
      return null;
    }
  }, [handleError]);

  const createErrorHandler = useCallback((
    options: ErrorHandlerOptions = {}
  ) => {
    return (error: Error | APIError | string) => handleError(error, options);
  }, [handleError]);

  return {
    handleError,
    handleAsyncError,
    createErrorHandler,
  };
}
