import { useRef, useState } from 'react'
import { useNavContext } from '../contexts/NavContext'
import useCustomEffect from '../hooks/useCustomEffect';
import gsap from 'gsap';
import NavigationButton from './NavigationButton';
import { useCarouselContext } from '../contexts/CarouselContext';
import CircularLoader from './CircularLoader';

const CarouselSelector = () => {
  const { pages } = useNavContext();
  const { setSelected } = useCarouselContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const slides = pages.filter((page) => !(page.name.toLowerCase().includes('index')));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const itemWidth = 30;
  const itemGap = 20;
  const totalSlides = slides.length;

  const containerWidth = (itemsPerSlide * (itemWidth + itemGap)) - itemGap;
  const selectedSlideIndex = (currentIndex + Math.floor(itemsPerSlide / 2)) % totalSlides;
  const slideDuration = 600;
  const trackRef = useRef(null);

  // ===== SET SELECTED SLIDE =====
  useCustomEffect(() => {
    const normalizedIndex = ((selectedSlideIndex % totalSlides) + totalSlides) % totalSlides;
    setSelected(slides[normalizedIndex]);
  }, [currentIndex]);

  useCustomEffect(() => {
    if (isAnimating) return; // PREVENT ANIMATION CLASHES 

    const track = trackRef.current;
    gsap.killTweensOf(track);

    setIsAnimating(true);
    const newPosition = -(currentIndex * (itemWidth + itemGap));
    
    gsap.to(track, {
      x: newPosition,
      duration: slideDuration / 1000,
      ease: 'expo.inOut',
      onComplete: () => {
        if (currentIndex >= totalSlides) {
          // reset carousel if user is at the last slide in the first slides list
          gsap.set(track, { x: 0 });
          setCurrentIndex(0);
        } else if (currentIndex < 0) {
          const lastPosition = -((totalSlides - 1) * (itemWidth + itemGap));
          gsap.set(track, { x: lastPosition });
          setCurrentIndex(totalSlides - 1);
        }
        setIsAnimating(false);
        requestAnimationFrame(() => {
          setIsLoading(true);
        });
      }
    });
  }, [currentIndex, totalSlides, itemWidth, itemGap]);

  // ===== NAVIGATE TO NEXT =====
  const handleNext = () => {
    if (isAnimating) return;
    setIsLoading(false);
    setCurrentIndex(prev => prev + 1);
  };

  // ===== NAVIGATE TO PREV =====
  const handlePrev = () => {
    if (isAnimating) return;
    setIsLoading(false);
    setCurrentIndex(prev => prev - 1);
  };

  // ===== NAVIGATE CAROUSEL BY CLICKING ON ITEMS =====
  const handleClick = (e: React.MouseEvent) => {
    if (isAnimating) return;

    const target = e.currentTarget;
    const i = target.getAttribute('data-index');
    if (!i) return;
    
    setCurrentIndex((+i) - 1) // if i is zero we have to make the currentIndex i - 1 in order to move the track left
  }

  // ===== HANDLE SCROLL NAVIGATION =====
  const triggered = useRef(false);
  useCustomEffect(() => {
    let scrollTimeout: any;
    const scrollThreshold = 0; // Minimum scroll delta to trigger navigation

    const handleScroll = (e: WheelEvent) => {
      // Clear previous timeout to prevent multiple triggers
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        triggered.current = false;
      }

      // Debounce scroll to prevent rapid scrolling
      scrollTimeout = setTimeout(() => {
        // Only navigate if not currently animating
        if (isAnimating || triggered.current) return;

        if (e.deltaY > scrollThreshold) {
          triggered.current = true;
          handleNext();
        } else if (e.deltaY < -scrollThreshold) {
          triggered.current = true;
          handlePrev();
        }
      }, 100);
    }

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    }
  }, []);

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      className="h-[50px] w-full overflow-hidden">
      <div className="relative w-full h-full flex gap-x-5 items-center justify-center">
        <CircularLoader
          duration={5000}
          handleComplete={handleNext}
          isLoading={isLoading}
          isPaused={isAnimating}
          resetTrigger={currentIndex}
        />

        <div className="">
          <NavigationButton 
            handleClick={handlePrev} 
            prev={true} 
            disabled={isAnimating}
          />
        </div>
        
        <div style={{ width: `${containerWidth}px` }} className="h-full overflow-hidden">
          <div 
            ref={trackRef} className="flex gap-x-5 h-full w-fit items-center justify-center">
            {[...slides, ...slides].map((slide, i) => (
              <div 
                key={i} 
                data-index={i} 
                onClick={(e) => handleClick(e)}
                className="min-w-[30px] w-[30px] aspect-square rounded-lg overflow-hidden cursor-pointer">
                <img className="w-full h-full" src={slide.image} alt={`${slide.name}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <NavigationButton 
            handleClick={handleNext} 
            disabled={isAnimating}
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselSelector;