
import React from 'react';
import DialogsContainer from '@/components/ContactCenter/DialogsContainer';

const LegalEntitiesDialogsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Диалоги с клиентами ЮЛ</h1>
      </div>
      
      <DialogsContainer />
    </div>
  );
};

export default LegalEntitiesDialogsPage;
