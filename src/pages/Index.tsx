
import React, { useEffect } from 'react';
import { useWorkspaceNavigation } from '@/hooks/useWorkspaceNavigation';

const Index = () => {
  const { getWorkspaceDefaultRoute } = useWorkspaceNavigation();

  console.log('Index: Current workspace navigation');

  useEffect(() => {
    const defaultRoute = getWorkspaceDefaultRoute();
    console.log('Index: Redirecting to', defaultRoute);
    
    // Используем replace для замены текущей записи в истории
    window.location.replace(defaultRoute);
  }, [getWorkspaceDefaultRoute]);

  // Показываем загрузочный экран пока происходит перенаправление
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    </div>
  );
};

export default Index;
