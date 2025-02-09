import { useRef } from "react";
import useCustomEffect from "../hooks/useCustomEffect";
import { PosterLayout } from "../models";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const ListPosterLayout = ({posters}: PosterLayout) => {
  const containerRef = useRef(null);
  const nameListRef = useRef(null); // container for overflow
  const namesRef = useRef(null); // div containing the names directly
  const nameDisplayCon = useRef(null);

  useCustomEffect(() => {
    if (!containerRef.current || !nameListRef.current) return;

    gsap.killTweensOf(containerRef.current);

    const animation = ScrollTrigger.create({
      trigger: containerRef.current,
      markers: {
        startColor: "green",
        endColor: "red"
      }, 
      start: "top-=400 top",
      end: "bottom top",
      pin: true,
      onEnter: () => {
        showDisplayCon();
      },
      onEnterBack: () => {
        showDisplayCon();
      },
      onLeave: () => {
        hideDisplayCon();
      },
      onLeaveBack: () => {
        hideDisplayCon();
      }
    })

    return () => animation.kill();
  })

  const showDisplayCon = () => {
    gsap.to(containerRef.current, {opacity: 1, duration: .4});
  }

  const hideDisplayCon = () => {
    gsap.to(containerRef.current, {opacity: 0, duration: .4});
  }

  return (
    <div ref={containerRef} className="h-screen w-full px-5 grid grid-cols-8 opacity-0">
      {/* Index */}
      <div></div>

      {/* Post preview  */}
      <div></div>

      {/* Name List and Display */}
      <div ref={nameDisplayCon} className="col-start-3 col-span-5">
        <div ref={nameListRef} className=" text-[25px] leading-[1] h-[75vh] overflow-hidden">
          <div ref={namesRef} className="flex flex-col gap-y-[10px]">
            {
              posters.map((poster) => (
                <button key={poster.name} className="text-left w-fit opacity-40 transition-opacity duration-[400ms] hover:opacity-100">
                  {poster.name}
                </button>
              ))
            }
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ListPosterLayout;