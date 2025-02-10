import { useRef, useState } from "react";
import useCustomEffect from "../hooks/useCustomEffect";
import { PosterLayout } from "../models";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const ListPosterLayout = ({posters}: PosterLayout) => {
  const containerRef = useRef(null);
  const nameListRef = useRef(null); // container for overflow
  const nameDisplayCon = useRef(null);
  const selectorRef = useRef(null);
  const pointerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useCustomEffect(() => {
    if (!containerRef.current || !nameListRef.current) return;
    const names = nameListRef.current as HTMLDivElement;
    const container = containerRef.current as HTMLDivElement;

    gsap.killTweensOf(containerRef.current);

    const maxScroll = names.scrollHeight - names.offsetHeight + window.innerHeight / 4;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "max",
        scrub: true,
        // markers: { startColor: "green", endColor: "red" },
        pin: true,
        onEnter: showDisplayCon,
        onEnterBack: showDisplayCon,
        onLeave: hideDisplayCon,
        onLeaveBack: hideDisplayCon
      }
    });

    // scroll animation for name list
    tl.fromTo(names, { y: 0 }, { y: -maxScroll, ease: "none" });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  })

  const showDisplayCon = () => {
    gsap.to(containerRef.current, {opacity: 1, pointerEvents: "all", duration: 1});
  }

  const hideDisplayCon = () => {
    gsap.to(containerRef.current, {opacity: 0, pointerEvents: "none", duration: 1});
  }

  const handleItemClick = (e: React.MouseEvent, i: number) => {
    if (!pointerRef.current) return;
    setSelectedIndex(i);
    const pointer = pointerRef.current as HTMLDivElement;
    const target = e.currentTarget as HTMLButtonElement;
    const duration = 0.6;
    const ease = "expo.inOut";
    
    gsap.to(pointer, {
      y: target.offsetTop,
      ease,
      duration
    })
  }

  return (
    <div ref={containerRef} className="h-screen w-full px-5 grid grid-cols-8 opacity-0">
      {/* Index */}
      <div></div>

      {/* Post preview  */}
      <div></div>

      {/* ===== SELECTOR ===== */}
      <div ref={selectorRef} className="fixed border-2 border-red-500 w-full h-[30px] left-0 top-[50%] -translate-y-[50%]" />
      {/* Name List and Display */}
      <div ref={nameDisplayCon} className="col-start-3 col-span-5">
        <div ref={nameListRef} className="relative text-[25px] flex flex-col gap-y-2.5 leading-[1] h-[75vh] mt-[50vh] w-fit overflow-visible">

         {/* Triangle Pointer */}
         <div 
          ref={pointerRef}
          className="absolute -right-[60px] w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-myGray-100 -rotate-90"/>
          {
            posters.map((poster, i) => (
              <button 
                key={poster.name} 
                onClick={(e) => handleItemClick(e, i)}
                className={`text-left w-fit transition-opacity duration-[600ms] hover:opacity-100 ${selectedIndex === i ? 'opacity-100' : 'opacity-40'}`}>
                {poster.name}
              </button>
            ))
          }
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ListPosterLayout;