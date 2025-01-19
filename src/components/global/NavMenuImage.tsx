import React, { useRef } from 'react'
import { useNavContext } from '../contexts/NavContext';
import useCustomEffect from '../hooks/useCustomEffect';
import gsap from 'gsap';
import slideup from '../utils/slideUp';

interface Props {
  index: string;
  cheekyLine: string;
  image: string;
}

const NavMenuImage:React.FC<Props> = ({index, cheekyLine, image}) => {
  const { open } = useNavContext();
  const imageRef = useRef(null);

  useCustomEffect(() => {
    if (!imageRef.current) return;
    const duration = .8;
    const ease = "expo.inOut";
    const delay = 0;

    gsap.killTweensOf(imageRef.current);

    if (open) {
      gsap.fromTo(imageRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
      }, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
        duration,
        ease,
        delay
      })
      gsap.to(imageRef.current, {scale: 1.3, duration, ease, delay})
    } else {
      gsap.to(imageRef.current, {scale: 1, duration, ease})
    }

  }, [open])

  return (
    <button className='p-1 h-[70vh] w-full max-w-[550px] bg-white'>
      <div className='overflow-hidden w-full bg-myGray-100 h-[88%] rounded-lg'>
        <img ref={imageRef} className='h-full w-full object-cover object-center' 
        src={image || "/assets/images/index-image.webp"} alt='selected page image' />
      </div>
      <div className='flex gap-x-2.5 uppercase p-5 px-[14px]'>
        <p className='font-serif italic'>{index || "007"}</p>
        <p className='w-[60%] xl:w-[30%] text-wrap text-left'>{cheekyLine || "There is no place like home"}</p>
      </div>
    </button>
  )
}

export default NavMenuImage;