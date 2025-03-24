import { useRef } from 'react';
import useCustomEffect from '../hooks/useCustomEffect';
import { PosterLayout } from '../models';
import gsap from 'gsap';
import LazyLoadImage from '../utils/LazyLoadImage';

const GridPosterLayout = ({posters}: PosterLayout) => {
  const postersRef = useRef<(HTMLDivElement | null)[]>([]);

  // fade in animation on load
  useCustomEffect(() => {
    if (!postersRef.current || postersRef.current.length === 0) return;
    gsap.from(postersRef.current, {
      y: 80,
      opacity: 0, 
      stagger: 0.01,
      ease: "power2.out"
    })
  })

  const ease = "expo.inOut";
  const duration = .6;
  const handleMouseEnter = (e: React.MouseEvent) => {
    const target = e.currentTarget.firstElementChild;
    gsap.to(target, {
      scale: 0.75, 
      opacity: 0.2,
      ease,
      duration
    })

    if (!target) return;
    showDetails(getDetails(target));
  }

  // get current poster details elems
  const getDetails = (target: Element) => {
    const children = target.nextElementSibling?.children;
    return children;
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    const target = e.currentTarget.firstElementChild;
    gsap.to(target, {
      scale: 1, 
      opacity: 1,
      ease,
      duration
    })

    if (!target) return;
    hideDetails(getDetails(target));
  }

  // animate poster details in
  const showDetails = (target: HTMLCollection | undefined) => {
    if (!target) return;
    gsap.fromTo(target, {
      y: 40,
      opacity: 0
    }, {
      y: 0, 
      opacity: 1,
      stagger: .02,
      duration: 0.6,
      ease
    })
  }

  // animate poster details out
  const hideDetails = (target: HTMLCollection | undefined) => {
    if (!target) return;
    gsap.to(target, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease
    })
  }
  
  return (
    <div className='px-5 flex flex-wrap gap-5 justify-center w-full min-h-screen h-full'>
      {
        posters.map((poster, i) => (
          <div 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            key={poster.name} 
            ref={(el) => postersRef.current[i] = el}
            className='w-[15%] relative'>
            <LazyLoadImage src={poster.path} />

             {/* Poster Details */}
            <div className='absolute leading-[1] flex flex-col items-center capitalize top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] gap-y-0.5 text-nowrap'>
              <h3 
                className='2xl:text-[25px] text-[20px] opacity-0'>
                  {poster.name}
              </h3>
              <div className='opacity-0'>
                <p
                  className='2xl:text-[25px] text-[20px] opacity-50'>
                    {poster.index}
                </p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default GridPosterLayout;