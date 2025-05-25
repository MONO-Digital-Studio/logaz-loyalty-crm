
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from '@/contexts/WorkspaceContext';

const Index = () => {
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    // Перенаправляем на соответствующий дашборд в зависимости от рабочего пространства
    if (currentWorkspace === 'legal-entities') {
      navigate('/legal-entities');
    } else {
      navigate('/dashboard');
    }
  }, [currentWorkspace, navigate]);

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
