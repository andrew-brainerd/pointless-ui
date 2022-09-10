import { useEffect, useRef } from 'react';

const useInterval = (intervalFunction: () => void, delay: number) => {
  const intervalFunctionRef = useRef<() => void>();

  useEffect(() => {
    intervalFunctionRef.current = intervalFunction;
  }, [intervalFunction]);

  const tick = () => intervalFunctionRef.current?.();

  useEffect(() => {
    if (delay !== null) {
      const timer = setInterval(tick, delay);
      return () => clearInterval(timer);
    }
  }, [delay]);
};

export default useInterval;
