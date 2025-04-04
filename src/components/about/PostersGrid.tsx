import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { addElem } from "../utils/utilityFunctions";
import { useDevice } from "../hooks/useDevice";

const posters = [
  "/assets/images/posters/poster-image.webp",
  "/assets/images/posters/blank.png",
  "/assets/images/posters/poster-image-2.webp",
  "/assets/images/posters/poster-image-34.webp",
  "/assets/images/posters/blank.png",
  "/assets/images/posters/poster-image-15.webp", // row 1
  "/assets/images/posters/blank.png",
  "/assets/images/posters/poster-image-12.webp", // row 1
  "/assets/images/posters/blank.png",
  "/assets/images/posters/poster-image-13.webp",
  "/assets/images/posters/blank.png",
  "/assets/images/posters/poster-image-3.webp",
  "/assets/images/posters/poster-image-9.webp",
  "/assets/images/posters/blank.png",
  "/assets/images/posters/poster-image-11.webp",
  "/assets/images/posters/poster-image-33.webp", // row 2
  "/assets/images/posters/poster-image-6.webp",
  "/assets/images/posters/poster-image-1.webp",
  "/assets/images/posters/blank.png",
  "/assets/images/posters/poster-image-4.webp",
  "/assets/images/posters/poster-image-19.webp",
  "/assets/images/posters/poster-image-30.webp",
  "/assets/images/posters/blank.png",
  "/assets/images/posters/poster-image-25.webp" // row 3
]

const PostersGrid = () => {
  const imagesRef = useRef([]);
  const containerRef = useRef(null);
  const gridCon = useRef(null);
  const device = useDevice();

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (device.width < 768) return;

    gsap.killTweensOf(imagesRef.current);
    ScrollTrigger.killAll();

    const tl = gsap.timeline({
      defaults: {
        ease: 'sine'
      }, 
      scrollTrigger: {
        trigger: containerRef.current,
        start:'top top',
        end: "+=200%",
        pin: true,
        pinReparent: true,
        pinSpacing: true,
        scrub: 1,
      }
    })
    .from(imagesRef.current, {
      stagger: .07,
      y: gsap.utils.random(window.innerHeight, (window.innerHeight * 2.8))
    })

    return () =>  {
      tl.kill();
    }
    
  }, [device])

  return (
    <div ref={containerRef} className="px-2.5 md:px-0 md:bg-myblack min-h-[108dvh] lg:h-[100vh] w-full pb-[150px] md:pb-0 lg:flex lg:items-center overflow-hidden">
      <div ref={gridCon} className="grid grid-cols-2 grid-rows-3 sm:grid-rows-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-[5px] h-full lg:h-fit w-full">
        {
          posters.map((image, i) => (
            <div ref={(el) => addElem(el, imagesRef.current)} key={i} 
            className={`w-full h-fit
            ${( device.width < 768 && i > 5 )? 'hidden' : 'inline-block'}
            ${(device.width < 1024 && i > 11) ? 'hidden' : 'inline-block'}
            ${(device.width < 1536 && i > 17) ? 'hidden' : 'inline-block'}
            `}>
              <img className="w-full h-full overflow-hidden object-cover" src={image} alt="poster image" />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PostersGrid;