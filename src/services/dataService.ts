
import { mockCorporateAnalysis } from '@/data/corporate/activityAnalysis';
import { mockSuspiciousTransactions } from '@/data/corporate/fraudDetection';
import { mockCorporateInsights } from '@/data/corporate/insights';
import { mockCorporateAIMetrics } from '@/data/corporate/metrics';
import { mockFleetEfficiency, mockCostOptimization } from '@/data/corporate/optimization';
import { mockLegalEntitiesChatHistory } from '@/data/corporate/chat';

// Симуляция задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class DataService {
  private static instance: DataService;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 минут

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private isValidCache(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getCorporateAnalysis() {
    const cacheKey = 'corporateAnalysis';
    
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    await delay(300); // Симуляция загрузки
    const data = mockCorporateAnalysis;
    this.setCache(cacheKey, data);
    return data;
  }

  async getSuspiciousTransactions() {
    const cacheKey = 'suspiciousTransactions';
    
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    await delay(250);
    const data = mockSuspiciousTransactions;
    this.setCache(cacheKey, data);
    return data;
  }

  async getCorporateInsights() {
    const cacheKey = 'corporateInsights';
    
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    await delay(200);
    const data = mockCorporateInsights;
    this.setCache(cacheKey, data);
    return data;
  }

  async getCorporateMetrics() {
    const cacheKey = 'corporateMetrics';
    
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    await delay(150);
    const data = mockCorporateAIMetrics;
    this.setCache(cacheKey, data);
    return data;
  }

  async getFleetEfficiency() {
    const cacheKey = 'fleetEfficiency';
    
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    await delay(200);
    const data = mockFleetEfficiency;
    this.setCache(cacheKey, data);
    return data;
  }

  async getCostOptimization() {
    const cacheKey = 'costOptimization';
    
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    await delay(200);
    const data = mockCostOptimization;
    this.setCache(cacheKey, data);
    return data;
  }

  async getChatHistory() {
    const cacheKey = 'chatHistory';
    
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    await delay(100);
    const data = mockLegalEntitiesChatHistory;
    this.setCache(cacheKey, data);
    return data;
  }

  clearCache(): void {
    this.cache.clear();
  }

  invalidateCache(key: string): void {
    this.cache.delete(key);
  }
}

export const dataService = DataService.getInstance();
