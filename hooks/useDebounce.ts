import { useState, useRef, useEffect } from 'react';

export const useDebounce = (initialValue: string, delay = 500) => {
  const [value, setValue] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  const setDebouncedValue = (newValue: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (newValue.trim() === '') {
      return setValue(newValue);
    }
    
    timeoutRef.current = setTimeout(() => {
      setValue(newValue.trim());
    }, delay);
  }

  return [value, setDebouncedValue] as const;
}