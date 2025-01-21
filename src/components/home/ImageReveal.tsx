import { useRef, useState } from 'react'
import useCustomEffect from '../hooks/useCustomEffect';
import gsap from 'gsap';
import { Page, useNavContext } from '../contexts/NavContext';

interface Props {
  page: Page | null;
  delay?: number;
  carousel?: boolean
}

const ImageReveal = ({page, delay, carousel}: Props) => {

  const { open } = useNavContext();
  const [prevImage, setPrevImage] = useState('assets/images/index-image.webp');
  const imageRef = useRef(null);
  const newImage = useRef(null);

  // ===== REVEAL SELECTED IMAGE OVER PREV IMAGE =====
  useCustomEffect(() => {
    const duration = 1;
    const ease = "power2.out";

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

    gsap.fromTo(newImage.current, {scale: 2.5}, {scale: 1, duration});

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
    <div className={`relative overflow-hidden w-full bg-myGray-100 ${!carousel ? 'h-[88%]' : 'h-full'} rounded-lg`}>
      <img
        ref={imageRef}
        className="absolute top-0 left-0 h-full w-full object-cover"
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
  )
}

export default ImageReveal;