
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';
import { WorkspaceType } from '@/types/ai';

interface ChatInterfaceProps {
  workspace: WorkspaceType;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ workspace }) => {
  const { chatHistory, sendMessage } = useAI();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsTyping(true);
    await sendMessage(message);
    setMessage('');
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="space-y-3">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.type === 'assistant' && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-2 rounded-lg text-xs ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}
              >
                {msg.content}
              </div>
              
              {msg.type === 'user' && (
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="border-t p-2">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Задайте вопрос о ${workspace === 'individuals' ? 'физических' : 'юридических'} лицах...`}
            className="text-xs"
            disabled={isTyping}
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!message.trim() || isTyping}
            className="px-2"
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
