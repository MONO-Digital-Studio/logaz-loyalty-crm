
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MessageSquare } from 'lucide-react';
import DialogsList from '@/components/ContactCenter/DialogsList';
import DialogDetails from '@/components/ContactCenter/DialogDetails';
import { Dialog as DialogType } from '@/types/contactCenter';

// Временные моковые данные для диалогов
const mockDialogs: DialogType[] = [
  {
    id: '1',
    clientName: 'Анна Смирнова',
    clientId: '10021',
    channel: 'web',
    status: 'active',
    startTime: new Date(2025, 3, 25, 10, 15),
    lastActivity: new Date(2025, 3, 25, 10, 35),
    assignedTo: 'Оператор 1',
    messages: [
      { id: '1', sender: 'client', text: 'Здравствуйте! У меня вопрос по последнему заказу.', time: new Date(2025, 3, 25, 10, 15) },
      { id: '2', sender: 'agent', text: 'Добрый день! Готов помочь вам. Подскажите номер заказа, пожалуйста.', time: new Date(2025, 3, 25, 10, 17) },
      { id: '3', sender: 'client', text: 'Заказ №76543', time: new Date(2025, 3, 25, 10, 18) },
      { id: '4', sender: 'agent', text: 'Спасибо, проверяю информацию...', time: new Date(2025, 3, 25, 10, 20) },
    ]
  },
  {
    id: '2',
    clientName: 'Иван Петров',
    clientId: '10035',
    channel: 'telegram',
    status: 'pending',
    startTime: new Date(2025, 3, 25, 11, 30),
    lastActivity: new Date(2025, 3, 25, 11, 30),
    assignedTo: null,
    messages: [
      { id: '1', sender: 'client', text: 'Добрый день! Когда будет доставка моего заказа?', time: new Date(2025, 3, 25, 11, 30) },
    ]
  },
  {
    id: '3',
    clientName: 'Мария Иванова',
    clientId: '10089',
    channel: 'whatsapp',
    status: 'closed',
    startTime: new Date(2025, 3, 24, 15, 45),
    lastActivity: new Date(2025, 3, 24, 16, 20),
    assignedTo: 'Оператор 2',
    messages: [
      { id: '1', sender: 'client', text: 'Как мне вернуть товар?', time: new Date(2025, 3, 24, 15, 45) },
      { id: '2', sender: 'agent', text: 'Здравствуйте! Для возврата товара вам необходимо...', time: new Date(2025, 3, 24, 15, 50) },
      { id: '3', sender: 'client', text: 'Спасибо, всё понятно!', time: new Date(2025, 3, 24, 16, 10) },
      { id: '4', sender: 'agent', text: 'Рад был помочь! Если возникнут еще вопросы, обращайтесь.', time: new Date(2025, 3, 24, 16, 15) },
    ]
  }
];

const DialogsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [selectedDialog, setSelectedDialog] = useState<DialogType | null>(null);
  const [dialogs] = useState<DialogType[]>(mockDialogs);

  const filteredDialogs = dialogs.filter(dialog => {
    const matchesSearch = dialog.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dialog.clientId.includes(searchQuery) ||
                          (dialog.assignedTo && dialog.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || dialog.status === statusFilter;
    const matchesChannel = channelFilter === 'all' || dialog.channel === channelFilter;
    
    return matchesSearch && matchesStatus && matchesChannel;
  });

  const handleDialogSelect = (dialog: DialogType) => {
    setSelectedDialog(dialog);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4">
      {/* Левая панель с фильтрами и списком диалогов */}
      <div className="w-full lg:w-1/3 flex flex-col space-y-6">
        <Card>
          <CardContent className="pt-4 space-y-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск диалогов..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="pending">Ожидающие</SelectItem>
                  <SelectItem value="closed">Закрытые</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={channelFilter} onValueChange={setChannelFilter}>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Канал" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все каналы</SelectItem>
                  <SelectItem value="web">Веб-чат</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1 min-h-0">
          <CardHeader className="py-3">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Диалоги
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filteredDialogs.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            <DialogsList 
              dialogs={filteredDialogs}
              selectedId={selectedDialog?.id}
              onSelectDialog={handleDialogSelect}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Правая панель с деталями диалога */}
      <div className="w-full lg:w-2/3">
        {selectedDialog ? (
          <DialogDetails dialog={selectedDialog} />
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center p-6">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Выберите диалог</h3>
              <p className="text-muted-foreground">
                Выберите диалог из списка слева для просмотра деталей
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DialogsPage;
