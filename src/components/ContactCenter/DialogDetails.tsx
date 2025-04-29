
import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Dialog } from '@/types/contactCenter';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, User, Phone, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';

interface DialogDetailsProps {
  dialog: Dialog;
}

const DialogDetails: React.FC<DialogDetailsProps> = ({ dialog }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dialog.messages]);

  const handleSend = () => {
    if (message.trim()) {
      // В реальном приложении здесь будет отправка сообщения на сервер
      console.log('Отправка сообщения:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getChannelName = (channel: string) => {
    switch (channel) {
      case 'web':
        return 'Веб-чат';
      case 'telegram':
        return 'Telegram';
      case 'whatsapp':
        return 'WhatsApp';
      default:
        return channel;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-3 border-b">
        <div className="flex justify-between">
          <div>
            <CardTitle className="flex items-center">
              {dialog.clientName}
              <Badge className="ml-2 bg-logaz-blue">{getChannelName(dialog.channel)}</Badge>
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              ID: {dialog.clientId}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <User className="mr-2 h-4 w-4" />
              Профиль
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="mr-2 h-4 w-4" />
              Позвонить
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className="flex flex-col bg-muted/30 p-3 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Начало: {format(dialog.startTime, 'dd MMM yyyy, HH:mm', { locale: ru })}</span>
        </div>
        {dialog.assignedTo && (
          <div className="mt-1">
            <span className="text-muted-foreground">Оператор: </span>
            <span>{dialog.assignedTo}</span>
          </div>
        )}
      </div>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {dialog.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'client'
                  ? 'bg-muted text-foreground'
                  : 'bg-logaz-blue text-white'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm">
                  {msg.sender === 'client' ? dialog.clientName : dialog.assignedTo}
                </span>
                <span className="text-xs opacity-70">
                  {format(msg.time, 'HH:mm')}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>

      <Separator />

      <CardFooter className="p-4">
        {dialog.status !== 'closed' ? (
          <div className="flex w-full gap-2">
            <Input
              placeholder="Написать сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="w-full text-center text-muted-foreground">
            Диалог завершен
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default DialogDetails;
