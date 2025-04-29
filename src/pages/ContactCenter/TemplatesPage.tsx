
import React from 'react';
import TemplatesList from '@/components/ContactCenter/TemplatesList';

const TemplatesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Шаблоны ответов</h1>
      </div>
      
      <TemplatesList />
    </div>
  );
};

export default TemplatesPage;
