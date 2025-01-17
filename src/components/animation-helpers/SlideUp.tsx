import React, { ReactNode, useRef } from 'react'
import useCustomEffect from '../hooks/useCustomEffect';
import gsap from 'gsap';

interface Props {
  children: ReactNode,
  trigger: any;
  delay?: number
  duration?: number
}

const SlideUp:React.FC<Props> = ({children, delay = 0, duration, trigger}) => {
  const container = useRef(null);
  const child = useRef(null);

  useCustomEffect(() => {
    let animation: GSAPAnimation;
    if (trigger) {
      const tl = gsap.timeline();

      gsap.set(child.current, {opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"});

      animation = tl.from(child.current, {
        y: 20,
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration: duration || .3,
        ease: "power1.inOut",
        delay,
        stagger: 1
      })
    }

    return () => (
      animation.kill()
    )


  }, [trigger])

  return (
    <div ref={container} className='overflow-hidden'>
      <div ref={child} className='opacity-1 h-fit w-fit'>
        {children}
      </div>
    </div>
  )
}

export default SlideUp