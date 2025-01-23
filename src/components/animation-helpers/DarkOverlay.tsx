import React, { useRef } from 'react'
import useCustomEffect from '../hooks/useCustomEffect'
import gsap from 'gsap';

interface Props {
  trigger: boolean
}

const DarkOverlay:React.FC<Props> = ({trigger}) => {
  const container = useRef(null);

  useCustomEffect(() => {
    const duration = 0.5;

    if (trigger) {
      gsap.set(container.current, {display: 'block'});
      gsap.to(container.current, {
        opacity: 0.6,
        duration
      })
    } else {
      gsap.to(container.current, {
        opacity: 0,
        display: "none",
        duration,
        delay: duration
      })
    }

  }, [trigger])

  return (
    <div ref={container} className='fixed w-full h-[100vh] hidden opacity-0 bg-black z-[5]' />
  )
}

export default DarkOverlay;