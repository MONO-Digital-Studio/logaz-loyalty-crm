
import React from 'react';
import TemplatesList from '@/components/ContactCenter/TemplatesList';

const LegalEntitiesTemplatesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl lg:text-3xl font-syncopate font-bold">Шаблоны ответов для ЮЛ</h1>
      </div>
      
      <TemplatesList />
    </div>
  );
};

export default LegalEntitiesTemplatesPage;
