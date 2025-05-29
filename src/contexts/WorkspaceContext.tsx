
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceType } from '@/types/legal-entities';

interface WorkspaceContextType {
  currentWorkspace: WorkspaceType;
  switchWorkspace: (workspace: WorkspaceType) => void;
  isLoading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

interface WorkspaceProviderProps {
  children: React.ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ children }) => {
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceType>('individuals');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log('WorkspaceProvider: Current workspace is', currentWorkspace);

  const switchWorkspace = (workspace: WorkspaceType) => {
    console.log('WorkspaceProvider: Switching from', currentWorkspace, 'to', workspace);
    
    if (workspace === currentWorkspace) return;
    
    setIsLoading(true);
    
    // Имитация загрузки данных
    setTimeout(() => {
      setCurrentWorkspace(workspace);
      setIsLoading(false);
      
      // Сохраняем выбор в localStorage
      localStorage.setItem('selected-workspace', workspace);
      console.log('WorkspaceProvider: Workspace switched to', workspace);
      
      // Автоматическое перенаправление на аналитику соответствующего пространства
      if (workspace === 'legal-entities') {
        navigate('/legal-entities');
      } else {
        navigate('/dashboard');
      }
    }, 300);
  };

  useEffect(() => {
    // Восстанавливаем выбранное рабочее пространство из localStorage
    const savedWorkspace = localStorage.getItem('selected-workspace') as WorkspaceType;
    console.log('WorkspaceProvider: Restored workspace from localStorage:', savedWorkspace);
    
    if (savedWorkspace) {
      setCurrentWorkspace(savedWorkspace);
    }
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        switchWorkspace,
        isLoading,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
