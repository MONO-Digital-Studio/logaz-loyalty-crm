
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Brain } from 'lucide-react';
import { useIndividualsAI } from '@/contexts/IndividualsAIContext';

const ChatInterface: React.FC = () => {
  const { chatHistory, sendMessage } = useIndividualsAI();
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

  const quickQuestions = [
    'Покажи клиентов с риском оттока',
    'Какие баллы истекают?',
    'Анализ VIP-клиентов',
    'Эффективность акций'
  ];

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
                <div className="w-6 h-6 bg-logaz-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[85%] p-2 rounded-lg text-xs leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-logaz-orange text-white'
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
              <div className="w-6 h-6 bg-logaz-orange rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-3 h-3 text-white" />
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
      
      {/* Быстрые вопросы */}
      {chatHistory.length <= 1 && (
        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Быстрые вопросы:</div>
          <div className="grid grid-cols-2 gap-1">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-6 text-xs p-1 text-left justify-start"
                onClick={() => setMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Задайте вопрос о клиентах..."
            className="text-xs"
            disabled={isTyping}
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!message.trim() || isTyping}
            className="px-2 bg-logaz-orange hover:bg-logaz-orange/90"
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
