
import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Global Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // В production можно отправлять ошибки в сервис мониторинга
    if (process.env.NODE_ENV === 'production') {
      // Например, Sentry.captureException(error);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto p-6 text-center">
            <div className="mb-4">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-xl font-semibold mb-2">Что-то пошло не так</h1>
            <p className="text-muted-foreground mb-6">
              Произошла неожиданная ошибка. Попробуйте перезагрузить страницу.
            </p>
            <div className="space-y-3">
              <Button onClick={this.handleReset} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Попробовать снова
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()} 
                className="w-full"
              >
                Перезагрузить страницу
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Детали ошибки (dev mode)
                </summary>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
