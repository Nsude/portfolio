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
  const currentImageRef = useRef(null);
  const newImageRef = useRef(null);
  const [key, setKey] = useState(0);

  // ===== REVEAL SELECTED IMAGE OVER PREV IMAGE =====
  useCustomEffect(() => {
    const duration = 1;
    const ease = "power2.out";

    if (!newImageRef.current || !currentImageRef.current || !page?.image) return;

    gsap.killTweensOf([newImageRef.current, currentImageRef.current]);

    gsap.set(newImageRef.current, {
      opacity: 1,
      scale: 3.5,
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setPrevImage(!featured ? page.image : page.poster);
        setKey(prev => prev + 1);
      }
    });

    tl.to(newImageRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
      duration,
      ease,
      delay
    }).to(newImageRef.current, {
      scale: 1,
      duration,
      ease,
    }, "<");

  }, [page, delay])

  // ===== ANIMATE IMAGE ON MENU OPEN AND CLOSE =====
  useCustomEffect(() => {
    if (!currentImageRef.current) return;
    const duration = 1.5;
    const ease = "power2.out";
    const menuDelay = .2;

    const elements = [currentImageRef.current];
    if (newImageRef.current) {
      elements.push(newImageRef.current);
    }

    gsap.killTweensOf(elements);

    if (open) {
      gsap.to(elements, {scale: 1.3, duration, ease, delay: menuDelay})
    } else {
      gsap.to(elements, {scale: 1, duration, ease})
    }
  }, [open])

  return (
    <div className={`relative overflow-hidden w-full bg-myGray-100 ${!fullHeight ? 'h-[88%]' : 'h-full'} rounded-lg`}>
      <img
        ref={currentImageRef}
        className="absolute top-0 left-0 h-full w-full object-cover"
        src={prevImage}
        alt="Default image"
      />
      {page?.image && (
        <img
          key={key}
          ref={newImageRef}
          className="absolute top-0 left-0 h-full w-full object-cover opacity-0"
          src={!featured ? page?.image : page.poster}
          alt="New hovered image"
        />
      )}
    </div>
  )
}

export default ImageReveal;