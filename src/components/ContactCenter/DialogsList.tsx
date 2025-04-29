
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Dialog } from '@/types/contactCenter';
import { Badge } from '@/components/ui/badge';

interface DialogsListProps {
  dialogs: Dialog[];
  selectedId: string | undefined;
  onSelectDialog: (dialog: Dialog) => void;
}

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'web':
      return '🌐';
    case 'telegram':
      return '✈️';
    case 'whatsapp':
      return '📱';
    default:
      return '💬';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="default" className="bg-green-600">Активный</Badge>;
    case 'pending':
      return <Badge variant="outline" className="border-amber-500 text-amber-500">Ожидает</Badge>;
    case 'closed':
      return <Badge variant="secondary">Закрыт</Badge>;
    default:
      return null;
  }
};

const DialogsList: React.FC<DialogsListProps> = ({ dialogs, selectedId, onSelectDialog }) => {
  return (
    <ul className="divide-y">
      {dialogs.length > 0 ? (
        dialogs.map((dialog) => (
          <li 
            key={dialog.id} 
            className={`p-4 hover:bg-muted cursor-pointer transition-colors ${
              dialog.id === selectedId ? 'bg-muted' : ''
            }`}
            onClick={() => onSelectDialog(dialog)}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium">
                {getChannelIcon(dialog.channel)} {dialog.clientName}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(dialog.lastActivity, { addSuffix: true, locale: ru })}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mb-2">
              ID: {dialog.clientId} • {dialog.messages.length} сообщ.
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm truncate max-w-[200px]">
                {dialog.messages[dialog.messages.length - 1]?.text || 'Нет сообщений'}
              </div>
              <div>{getStatusBadge(dialog.status)}</div>
            </div>
          </li>
        ))
      ) : (
        <li className="p-6 text-center text-muted-foreground">
          Диалоги не найдены
        </li>
      )}
    </ul>
  );
};

export default DialogsList;
