
import { useState, useCallback } from 'react';
import { ChatMessage, BaseAIMetrics, BaseAIState } from '@/types/ai';

export const useBaseAI = (initialMetrics: BaseAIMetrics): BaseAIState => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [metrics, setMetrics] = useState<BaseAIMetrics>(initialMetrics);

  const toggleAI = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  const openPanel = useCallback(() => {
    setIsPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const updateMetrics = useCallback((newMetrics: Partial<BaseAIMetrics>) => {
    setMetrics(prev => ({ ...prev, ...newMetrics, lastUpdate: new Date() }));
  }, []);

  return {
    isEnabled,
    isPanelOpen,
    messages,
    metrics,
    toggleAI,
    openPanel,
    closePanel,
    addMessage,
    clearMessages,
    updateMetrics,
  };
};
