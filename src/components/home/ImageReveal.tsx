import { useRef, useState } from 'react'
import useCustomEffect from '../hooks/useCustomEffect';
import gsap from 'gsap';
import { Page, useNavContext } from '../contexts/NavContext';

interface Props {
  page: Page | null;
  delay?: number;
  fullHeight?: boolean,
  featured?: boolean
}

const ImageReveal = ({page, delay, fullHeight, featured}: Props) => {
  const { open } = useNavContext();
  const [prevImage, setPrevImage] = useState( !featured ? 'assets/images/index-image.webp' : 'assets/images/posters/poster-image-21.webp');
  const newImageRef = useRef(null);

  useCustomEffect(() => {
    if (!newImageRef.current) return null;

    gsap.killTweensOf(newImageRef.current);

    const tl = gsap.timeline({
      onComplete: () => {
        setPrevImage(page?.image || '');
      }
    });

    tl.fromTo(newImageRef.current, {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
      scale: 2
    }, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      scale: 1,
      duration: .8,
      ease: 'power2.out'
    })
  }, [page, delay])

  // ===== ANIMATE IMAGE ON MENU OPEN AND CLOSE =====
  useCustomEffect(() => {
    if (!newImageRef.current) return;
    const duration = 1.5;
    const ease = "power2.out";
    const menuDelay = .2;

    const elements = [newImageRef.current];
    if (newImageRef.current) {
      elements.push(newImageRef.current);
    }

    gsap.killTweensOf(elements);

    if (open) {
      gsap.fromTo(elements, {scale: 1.3}, {scale: 1, duration, ease, delay: menuDelay})
    } else {
      gsap.fromTo(elements, {scale: 1}, {scale: 1.3, duration, ease})
    }
  }, [open])

  return (
    <div className={`relative overflow-hidden w-full bg-myGray-100 ${!fullHeight ? 'h-[88%]' : 'h-full'} rounded-lg`}>
      <img 
        className="absolute left-0 top-0 w-full h-full object-cover"
        src={prevImage || '/assets/images/index-image.webp'} 
        alt="previous selected title image"/>

      <img 
        ref={newImageRef}
        className="absolute left-0 top-0 w-full h-full object-cover"
        src={page?.image || '/assets/images/index-image.webp'} 
        alt="selected title image"/>
    </div>
  )
}

export default ImageReveal;