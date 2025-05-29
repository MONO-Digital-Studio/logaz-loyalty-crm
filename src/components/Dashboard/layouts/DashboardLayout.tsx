
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  header,
  sidebar,
  className
}) => {
  return (
    <div className={cn("min-h-screen bg-gray-50 w-full", className)}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {header && (
          <div className="mb-6">
            {header}
          </div>
        )}
        
        <div className="flex gap-6">
          {sidebar && (
            <aside className="w-64 flex-shrink-0">
              {sidebar}
            </aside>
          )}
          
          <main className="flex-1 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
