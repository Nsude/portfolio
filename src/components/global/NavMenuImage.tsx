import React, { useRef, useState } from 'react'
import { Page, useNavContext } from '../contexts/NavContext';
import useCustomEffect from '../hooks/useCustomEffect';
import gsap from 'gsap';

interface Props {
  page: Page | null;
}

const NavMenuImage:React.FC<Props> = ({page}) => {
  const { open } = useNavContext();
  const [prevImage, setPrevImage] = useState('assets/images/index-image.webp');
  const imageRef = useRef(null);
  const newImage = useRef(null);

  // ===== REVEAL SELECTED IMAGE OVER PREV IMAGE =====
  useCustomEffect(() => {
    const duration = 1;
    const ease = "power2.out";
    const delay = 0;

    gsap.killTweensOf(newImage.current);

    if (!newImage.current || !imageRef.current || !page?.image) return;
    
    gsap.set(newImage.current, {opacity: 1});
    gsap.fromTo(newImage.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
    }, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
      duration,
      ease,
      delay
    }).then(() => {
      setPrevImage(page.image);
    })

    gsap.fromTo(imageRef.current, {scale: 1.3}, {scale: 1, duration});

  }, [page])

  // ===== ANIMATE IMAGE ON MENU OPEN AND CLOSE =====
  useCustomEffect(() => {
    if (!imageRef.current) return;
    const duration = 1.5;
    const ease = "power2.out";
    const delay = .2;

    gsap.killTweensOf(imageRef.current);

    if (open) {
      gsap.to([imageRef.current, newImage.current], {scale: 1.3, duration, ease, delay})
    } else {
      gsap.to([imageRef.current, newImage.current], {scale: 1, duration, ease})
    }

  }, [open])

  return (
    <button className='p-1 h-[70vh] flex flex-col w-full max-w-[550px] bg-white'>
      <div className='relative overflow-hidden w-full bg-myGray-100 h-[88%] rounded-lg'>
      <img
        ref={imageRef}
        className="absolute scale-[1.3] top-0 left-0 h-full w-full object-cover"
        src={prevImage || "assets/images/index-image.webp"}
        alt="Default image"
      />
      {/* New Image */}
      <img
        ref={newImage}
        className="absolute top-0 left-0 h-full w-full object-cover opacity-0"
        src={page?.image}
        alt="New hovered image"
      />
      </div>
      <div className='flex gap-x-2.5 uppercase p-5 px-[14px] w-full'>
        <p className='font-serif italic'>{page?.index || "007"}</p>
        <p className='w-[60%] xl:w-[45%] text-wrap text-left'>{page?.cheekyLine || "There is no place like home"}</p>
      </div>
    </button>
  )
}

export default NavMenuImage;