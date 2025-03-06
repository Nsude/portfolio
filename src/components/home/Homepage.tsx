import { useRef } from "react";
import { useCarouselContext } from "../contexts/CarouselContext";
import useCustomEffect from "../hooks/useCustomEffect";
import Carousel from "./Carousel";
import FeaturedCardTwo from "./FeaturedCardTwo";
import { addElem } from "../utils/utilityFunctions";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";

const Homepage = () => {
  const { selected } = useCarouselContext();
  const fadeInElems = useRef<HTMLElement[]>([]);
  const navigate = useNavigate();
  const lenis = useLenis();

  useCustomEffect(() => {
    if (!fadeInElems.current) return;

    gsap.fromTo(
      fadeInElems.current,
      {
        clipPath: "polygon(-20% -20%, 100% -20%, 100% -20%, -20% -20%)", 
        y: 60 
      },
      {
        clipPath: "polygon(-60% -60%, 160% -10%, 160% 160%, -60% 160%)",
        duration: .8,
        y: 0,
        ease: "expo.inOut",
        stagger: .05,
        delay: .1
      }
    );
    
  }, [selected])

  // ===== NAVIGATE TO PAGE =====
  const handleClick = () => {
    navigate(selected?.link || '/');
    // window.location.reload();
    lenis?.resize();
  }

  return (
    <div 
      onClick={handleClick} 
      className="relative cursor-pointer h-[100dvh] lg:h-[100vh] hide-scroll w-full px-5 grid grid-rows-10 justify-center lg:grid-cols-8 lg:px-[20px]">    
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative z-[3] row-start-3 row-span-5 flex justify-center lg:inline-block lg:col-start-2 lg:col-span-2">
        <Carousel />
      </div>

      {/* Second Featured Card */}
      <div onClick={(e) => e.stopPropagation()} 
        className='hidden relative z-[4] row-start-2 row-span-2 justify-center col-start-4 col-span-2 lg:flex'>
        <FeaturedCardTwo />
      </div>

      <div ref={(el) => addElem(el, fadeInElems.current)} 
        className="hidden w-fit relative z-[4] row-start-6 col-start-4 lg:inline-block">
        <h2 className="text-[160px] font-serif lowercase leading-[0.5] text-nowrap -tracking-[0.06ch]">{ selected?.title || "The Title" }</h2>
      </div>
      
      <div className="hidden relative z-[2] text-base max-w-[450px] mt-5 row-start-7 col-start-6 col-span-2 lg:inline-block">
        <p ref={(el) => addElem(el, fadeInElems.current)} className="text-[10px] uppercase opacity-50 mb-[5px]">intro</p>
        <h4 ref={(el) => addElem(el, fadeInElems.current)} className="w-full text-[16px] leading-[1.1]"> {selected?.description} </h4>
      </div>

      <div className="row-start-10 w-full lg:absolute z-[2] lg:bottom-5 lg:left-0 lg:px-5">
        <img className="w-full mix-blend-difference" src="assets/images/name-text.png" alt="name" />
      </div>
    </div>
  )
}

export default Homepage;