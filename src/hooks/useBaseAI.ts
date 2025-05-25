
import { useState, useCallback } from 'react';
import { ChatMessage, AIMetrics } from '@/types/ai';

export interface BaseAIState {
  isEnabled: boolean;
  isPanelOpen: boolean;
  messages: ChatMessage[];
  metrics: AIMetrics;
}

export const useBaseAI = (initialMetrics: AIMetrics) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [metrics, setMetrics] = useState<AIMetrics>(initialMetrics);

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

  const updateMetrics = useCallback((newMetrics: Partial<AIMetrics>) => {
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
