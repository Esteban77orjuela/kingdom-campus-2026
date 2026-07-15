import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function cacheData<T>(key: string, data: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Silently fail - data will load from JSON files
  }
}

export async function getLastUpdateTime(key: string): Promise<Date | null> {
  try {
    const timestamp = await AsyncStorage.getItem(`${key}_updated_at`);
    return timestamp ? new Date(timestamp) : null;
  } catch {
    return null;
  }
}

export async function setLastUpdateTime(key: string): Promise<void> {
  try {
    await AsyncStorage.setItem(`${key}_updated_at`, new Date().toISOString());
  } catch {
    // Silently fail
  }
}

export async function clearAllCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((k) => k.startsWith('@kingdom_campus/'));
    for (const key of cacheKeys) {
      await AsyncStorage.removeItem(key);
    }
  } catch {
    // Silently fail
  }
}
