
import React from 'react';
import DialogsList from '@/components/ContactCenter/DialogsList';

const LegalEntitiesDialogsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Диалоги с клиентами ЮЛ</h1>
      </div>
      
      <DialogsList />
    </div>
  );
};

export default LegalEntitiesDialogsPage;
