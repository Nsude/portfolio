import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { usePreloaderContext } from "../contexts/PreloaderContext";


const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const counterRef = useRef(null);
  const {isLoading, setIsLoading} = usePreloaderContext();

  // Handle on complete
  useEffect(() => {
    // only start animation when the UI is ready
    Promise.all([
      document.fonts.ready, 
      new Promise((res) => window.addEventListener("load", res))
    ]).then(() => {
      setTimeout(() => {
        setStartAnimation(true);
      }, 500);
    });

    return () => {
      window.removeEventListener("load", () => {})
    };

  }, [])

  useEffect(() => {
    if (!startAnimation) return;
    let currentValue = 0;

    const animateOut = () => {
      if (!counterRef.current) return;
      const duration = 1;

      gsap.to(counterRef.current, {
        left: 10,
        opacity: 0, 
        duration, 
        ease: "power2.out", 
        onComplete: () => {
          setIsLoading(false);
        }
      })

    }

    const updateProgress = () => {
      if (currentValue > 100) return;

      currentValue += Math.floor(Math.random() * 10) + 1;

      if (currentValue > 100) currentValue = 100;

      const delay = Math.floor(Math.random() * 200) + 50;
      setTimeout(updateProgress, delay);
      
      setProgress(currentValue);
      if (currentValue === 100) animateOut();
    }

    updateProgress();

  }, [startAnimation])

  if (!isLoading) return null;

  return (
    <div className="fixed left-0 top-0 z-20 w-full h-full bg-myblack" >
      <div ref={counterRef} className="absolute right-[30px] bottom-[30px]">
        <h2 className="text-myGray-100 lg:text-[25vw] text-[40vw] leading-[0.8] -tracking-[0.1ch]">{progress}</h2>
      </div>
    </div>
  )
}

export default Preloader;