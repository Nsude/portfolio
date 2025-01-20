import { useRef, useState } from 'react'
import { useNavContext } from '../contexts/NavContext'
import useCustomEffect from '../hooks/useCustomEffect';
import gsap from 'gsap';
import NavigationButton from './NavigationButton';
import { useCarouselContext } from '../contexts/CarouselContext';

const CarouselSelector = () => {
  const { pages } = useNavContext();
  const { setSelected } = useCarouselContext();
  const [isAnimating, setIsAnimating] = useState(false);  // Add this to track animation state

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
  const animationRef = useRef<any>(); // Add this to track timeouts

  // Clear any existing timeouts when component unmounts or when starting new animation
  useCustomEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // update selected slide 
  useCustomEffect(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    animationRef.current = setTimeout(() => {
      const normalizedIndex = ((selectedSlideIndex % totalSlides) + totalSlides) % totalSlides;
      setSelected(slides[normalizedIndex]);
    }, slideDuration / 2);
  }, [currentIndex]);

  // ===== MOVE CAROUSEL =====
  useCustomEffect(() => {
    if (isAnimating) return; // Prevent multiple animations

    const track = trackRef.current;
    gsap.killTweensOf(track);

    setIsAnimating(true);
    const newPosition = -(currentIndex * (itemWidth + itemGap));
    
    gsap.to(track, {
      x: newPosition,
      duration: slideDuration / 1000,
      ease: 'expo.inOut',
      onComplete: () => {
        // Handle infinite scroll for both directions
        if (currentIndex >= totalSlides) {
          gsap.set(track, { x: 0 });
          setCurrentIndex(0);
        } else if (currentIndex < 0) {
          const lastPosition = -((totalSlides - 1) * (itemWidth + itemGap));
          gsap.set(track, { x: lastPosition });
          setCurrentIndex(totalSlides - 1);
        }
        setIsAnimating(false);
      }
    });
  }, [currentIndex, totalSlides, itemWidth, itemGap]);

  const handleNext = () => {
    if (isAnimating) return; // Prevent clicks during animation
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (isAnimating) return; // Prevent clicks during animation
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className='h-[50px] w-full overflow-hidden'>
      <div className='relative w-full h-full flex gap-x-5 items-center justify-center'>
        <div className='absolute left-[50%] top-0 translate-x-[-50%] w-[50px] h-full border-2 border-myblack' />

        <div className=''>
          <NavigationButton 
            handleClick={handlePrev} 
            prev={true} 
            disabled={isAnimating}
          />
        </div>
        
        <div style={{ width: `${containerWidth}px` }} className='h-full overflow-hidden'>
          <div ref={trackRef} className='flex gap-x-5 h-full w-fit items-center justify-center'>
            {[...slides, ...slides].map((slide, i) => (
              <div key={i} className='min-w-[30px] w-[30px] aspect-square rounded-lg overflow-hidden'>
                <img className='w-full h-full' src={slide.image} alt={`${slide.name}`} />
              </div>
            ))}
          </div>
        </div>

        <div className=''>
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