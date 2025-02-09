import { useRef } from 'react';
import { posters } from '../contexts/ProjectsContext';
import useCustomEffect from '../hooks/useCustomEffect';
import { PosterLayout } from '../models';
import gsap from 'gsap';

const GridPosterLayout = ({index}: PosterLayout) => {
  if (index !== "0") return null;
  const postersRef = useRef<(HTMLDivElement | null)[]>([]);

  // fade in animation on load
  useCustomEffect(() => {
    if (postersRef.current.length === 0) return;
    gsap.from(postersRef.current, {
      y: 40,
      opacity: 0, 
      stagger: 0.02,
      ease: "power2.out"
    })
  }, [index])

  const ease = "expo.inOut";
  const duration = .6;
  const handleMouseEnter = (e: React.MouseEvent) => {
    const target = e.currentTarget.firstElementChild;
    gsap.to(target, {
      scale: 0.7, 
      ease,
      duration
    })
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    const target = e.currentTarget.firstElementChild;
    gsap.to(target, {
      scale: 1, 
      ease,
      duration
    })
  }

  return (
    <div className='px-5 flex flex-wrap gap-5 justify-center w-full min-h-screen h-full'>
      {
        posters.map((poster, i) => (
          <div 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            key={i} 
            ref={(el) => postersRef.current[i] = el}
            className='w-[15%] overflow-visible cursor-crosshair'>
            <img 
              src={poster} 
              alt={`poster image ${i}`} />
          </div>
        ))
      }
      {/* <div className='fixed bg-white left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-[520px] aspect-[4/5]'>
        <div className='h-[85%] w-full'>
          <img className='' src={selectedPoster} />
        </div>
      </div> */}
    </div>
  )
}

export default GridPosterLayout;