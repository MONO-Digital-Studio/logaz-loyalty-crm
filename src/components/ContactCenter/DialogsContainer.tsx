
import React, { useState } from 'react';
import DialogsList from './DialogsList';
import DialogDetails from './DialogDetails';
import { Dialog } from '@/types/contactCenter';

// Mock data for demonstration
const mockDialogs: Dialog[] = [
  {
    id: '1',
    clientName: 'ООО "Логистика Плюс"',
    clientId: 'LE001',
    channel: 'web',
    status: 'active',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
    assignedTo: 'Анна Петрова',
    messages: [
      {
        id: '1',
        sender: 'client',
        text: 'Добрый день! У нас проблемы с топливными картами.',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        sender: 'agent',
        text: 'Здравствуйте! Расскажите подробнее о проблеме.',
        time: new Date(Date.now() - 15 * 60 * 1000)
      }
    ]
  },
  {
    id: '2',
    clientName: 'ЗАО "Транспорт Сервис"',
    clientId: 'LE002',
    channel: 'telegram',
    status: 'pending',
    startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
    assignedTo: null,
    messages: [
      {
        id: '3',
        sender: 'client',
        text: 'Не могу получить отчет по расходам',
        time: new Date(Date.now() - 4 * 60 * 60 * 1000)
      }
    ]
  }
];

const DialogsContainer: React.FC = () => {
  const [selectedDialogId, setSelectedDialogId] = useState<string | undefined>();

  const handleSelectDialog = (dialog: Dialog) => {
    setSelectedDialogId(dialog.id);
  };

  const selectedDialog = mockDialogs.find(d => d.id === selectedDialogId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
      <div className="bg-card rounded-lg border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Активные диалоги</h2>
        </div>
        <div className="overflow-y-auto max-h-[500px]">
          <DialogsList 
            dialogs={mockDialogs}
            selectedId={selectedDialogId}
            onSelectDialog={handleSelectDialog}
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            {selectedDialog ? `Диалог с ${selectedDialog.clientName}` : 'Выберите диалог'}
          </h2>
        </div>
        <div className="h-[500px]">
          {selectedDialog ? (
            <DialogDetails dialog={selectedDialog} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Выберите диалог для просмотра деталей
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogsContainer;
