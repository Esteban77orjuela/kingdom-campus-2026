import { useState, useEffect, useCallback } from 'react';
import { cacheData, getCachedData } from '../services/storage';

interface LoadOptions<T> {
  storageKey: string;
  jsonData: T;
  onComplete?: (data: T) => void;
}

export function useDataLoader<T>({ storageKey, jsonData, onComplete }: LoadOptions<T>) {
  const [data, setData] = useState<T>(jsonData);
  const [isFromCache, setIsFromCache] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const cached = await getCachedData<T>(storageKey);
      if (cached) {
        setData(cached);
        setIsFromCache(true);
        onComplete?.(cached);
      } else {
        setData(jsonData);
        await cacheData(storageKey, jsonData);
        onComplete?.(jsonData);
      }
    } catch {
      setData(jsonData);
    } finally {
      setLoading(false);
    }
  }, [storageKey, jsonData, onComplete]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshFromJson = useCallback(async () => {
    setData(jsonData);
    setIsFromCache(false);
    await cacheData(storageKey, jsonData);
    onComplete?.(jsonData);
  }, [jsonData, storageKey, onComplete]);

  return { data, isFromCache, loading, refreshFromJson };
}
