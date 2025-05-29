
import { useMemo, useCallback, DependencyList } from 'react';

export const useOptimizedMemo = <T>(
  factory: () => T,
  deps: DependencyList,
  shouldUpdate?: (prev: DependencyList, next: DependencyList) => boolean
): T => {
  return useMemo(() => {
    if (shouldUpdate && deps.length > 0) {
      // Дополнительная проверка на необходимость обновления
      return factory();
    }
    return factory();
  }, deps);
};

export const useStableMemo = <T>(
  factory: () => T,
  deps: DependencyList
): T => {
  return useMemo(() => factory(), deps);
};

export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T => {
  return useCallback(callback, deps);
};

// Мемоизация для дорогих вычислений
export const useExpensiveComputation = <T>(
  computation: () => T,
  deps: DependencyList,
  shouldCompute: boolean = true
): T | null => {
  return useMemo(() => {
    if (!shouldCompute) return null;
    console.log('Expensive computation running...');
    const start = performance.now();
    const result = computation();
    const end = performance.now();
    console.log(`Computation took ${end - start} milliseconds`);
    return result;
  }, [shouldCompute, ...deps]);
};
