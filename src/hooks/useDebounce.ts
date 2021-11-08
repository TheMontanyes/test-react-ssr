import { useCallback, useRef } from 'react';

const useDebounce = (
  callback: (...args: any[]) => any,
  delay: number,
): ((...args: any[]) => void) => {
  const timer = useRef<number>(0);

  return useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};

export { useDebounce };
