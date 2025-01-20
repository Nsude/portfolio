import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Plus } from 'lucide-react';

interface Props {
  duration: number,
  handleComplete: () => void,
  isLoading: boolean,
  isPaused: boolean
}

const CircularLoader = ({ 
  duration = 3000, 
  handleComplete, 
  isLoading, 
  isPaused = false 
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

      if (!isReversing.current) {
        gsap.set(loaderElement, {
          strokeDasharray: '283',
          strokeDashoffset: '283',
        });
      }
      
      loaderAnimationRef.current = gsap.to(loaderElement, {
        strokeDashoffset: isReversing.current ? '283' : '0',
        duration: duration / 1000,
        ease: 'linear',
        onComplete: () => {
          if (!isPaused) {
            if (isReversing.current) {
              isReversing.current = false;
              if (handleComplete) {
                handleComplete();
              }
              gsap.set(loaderElement, {
                strokeDasharray: '283',
                strokeDashoffset: '283',
              });
              loaderAnimationRef.current = gsap.to(loaderElement, {
                strokeDashoffset: '0',
                duration: duration / 1000,
                ease: 'linear',
              });
            } else {
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
                    gsap.set(loaderElement, {
                      strokeDasharray: '283',
                      strokeDashoffset: '283',
                    });
                    loaderAnimationRef.current = gsap.to(loaderElement, {
                      strokeDashoffset: '0',
                      duration: duration / 1000,
                      ease: 'linear',
                    });
                  }
                }
              });
            }
          }
        }
      });
    }

    return () => {
      if (loaderAnimationRef.current) {
        loaderAnimationRef.current.kill();
      }
    };
  }, [isLoading, isPaused, duration, handleComplete]);

  return (
    <div className="absolute z-[2] left-[50%] top-0 translate-x-[-50%] w-[50px] h-full flex justify-center items-center">
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background path circle */}
        <circle
          className="stroke-black/20 fill-none"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="3"
        />
        {/* Animated loader circle */}
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