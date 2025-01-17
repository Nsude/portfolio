import { useEffect, useRef } from 'react'

const useCustomEffect = (callback: () => void, dependencies?: any[]) => {
  const runRef = useRef(false);
  useEffect(() => {
    if (runRef.current) {
      callback();
    }

    if (runRef.current) return;
    return () => { runRef.current = true };

  }, dependencies || []);
}

export default useCustomEffect;
