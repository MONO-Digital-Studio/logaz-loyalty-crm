
import React from 'react';
import DialogsContainer from '@/components/ContactCenter/DialogsContainer';

const LegalEntitiesDialogsPage: React.FC = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6 min-h-full">
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl lg:text-3xl font-syncopate font-bold">Диалоги с клиентами ЮЛ</h1>
      </div>
      
      <DialogsContainer />
    </div>
  );
};

export default LegalEntitiesDialogsPage;
