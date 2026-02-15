import { useState, useEffect, useCallback } from 'react';

/**
 * Persists state to window.localStorage and syncs across tabs.
 * @param {string} key - Storage key
 * @param {any} initialValue - Fallback when no stored value exists
 * @returns {[any, (value: any) => void]} [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: Error reading "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = typeof value === 'function' ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`useLocalStorage: Error writing "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Sync when another tab changes the value
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === key && e.newValue != null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (err) {
          console.warn(`useLocalStorage: Error syncing "${key}":`, err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [storedValue, setValue];
}
