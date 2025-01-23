import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Plus } from 'lucide-react';

interface Props {
  duration: number,
  handleComplete: () => void,
  isLoading: boolean,
  isPaused: boolean,
  resetTrigger?: any // Add a reset trigger
}

const CircularLoader = ({ 
  duration = 3000, 
  handleComplete, 
  isLoading, 
  isPaused = false,
  resetTrigger // New prop to force reset
}: Props) => {
  const loaderRef = useRef(null);
  const loaderAnimationRef = useRef<GSAPAnimation>();
  const isReversing = useRef(false);

  useEffect(() => {
    if (isLoading && !isPaused) {
      const loaderElement = loaderRef.current;
      
      if (loaderAnimationRef.current) {
        loaderAnimationRef.current.kill();
      }

      // Always reset to initial state when resetTrigger changes
      gsap.set(loaderElement, {
        strokeDasharray: '283',
        strokeDashoffset: '283',
      });
      
      loaderAnimationRef.current = gsap.to(loaderElement, {
        strokeDashoffset: '0',
        duration: duration / 1000,
        ease: 'linear',
        onComplete: () => {
          if (!isPaused) {
            isReversing.current = true;
            loaderAnimationRef.current = gsap.to(loaderElement, {
              strokeDashoffset: '283',
              duration: duration / 1000,
              ease: 'linear',
              onComplete: () => {
                if (!isPaused) {
                  isReversing.current = false;
                  if (handleComplete) {
                    handleComplete();
                  }
                }
              }
            });
          }
        }
      });
    }

    return () => {
      if (loaderAnimationRef.current) {
        loaderAnimationRef.current.kill();
      }
    };
  }, [isLoading, isPaused, duration, handleComplete, resetTrigger]); // Add resetTrigger to dependency array

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="absolute z-[2] left-[50%] top-0 translate-x-[-50%] w-[50px] h-full flex justify-center items-center">
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          className="stroke-black/20 fill-none"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="3"
        />
        <circle
          ref={loaderRef}
          className="stroke-white fill-none"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="6"
        />
      </svg>
      <div className="bg-gradient-to-t from-black to-transparent w-[30px] aspect-square rounded-3xl flex justify-center items-center">
        <Plus color="#fff" strokeWidth={1.5} size={20} />
      </div>
    </div>
  );
};

export default CircularLoader;