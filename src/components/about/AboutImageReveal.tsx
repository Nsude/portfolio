import { useRef, useState } from "react";
import useCustomEffect from "../hooks/useCustomEffect";
import gsap from "gsap";

interface Props {
  image: string
}

const AboutImageReveal = ({image}: Props) => {
  const [prevImage, setPrevImage] = useState('');
  const newImageRef = useRef(null);

  useCustomEffect(() => {
    if (!newImageRef.current) return null;

    gsap.killTweensOf(newImageRef.current);

    const tl = gsap.timeline({
      onComplete: () => {
        setPrevImage(image);
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
  }, [image])

  return (
    <div className="relative w-full h-full">
      <img 
        className="absolute left-0 top-0 w-full h-full object-cover"
        src={prevImage || 'assets/images/default.png'} 
        alt="previous selected title image"/>

      <img 
        ref={newImageRef}
        className="absolute left-0 top-0 w-full h-full object-cover"
        src={image || 'assets/images/default.png'} 
        alt="selected title image"/>
    </div>
  )
}

export default AboutImageReveal;