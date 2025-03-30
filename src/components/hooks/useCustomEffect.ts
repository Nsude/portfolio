import { useEffect, useRef } from 'react'

const useCustomEffect = (callback: () => void, dependencies?: any[]) => {
  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      callback();
    } else {
      hasMounted.current = true;
    }

  }, dependencies || []);
}

export default useCustomEffect;
