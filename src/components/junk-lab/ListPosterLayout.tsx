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
  const pointerRef = useRef(null);
  const previewRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const addedScroll = 110;
  const timeLineRef = useRef<gsap.core.Timeline | null>(null);

  useCustomEffect(() => {
    if (!containerRef.current || !nameListRef.current || !previewRef.current) return;
    const names = nameListRef.current as HTMLDivElement;
    const container = containerRef.current as HTMLDivElement;
    const previews = previewRef.current as HTMLDivElement;

    const maxScroll = names.scrollHeight - names.offsetHeight + addedScroll;
    gsap.killTweensOf([container, names, previews]);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "max",
        scrub: true,
        pin: true,
        onEnter: showDisplayCon,
        onEnterBack: showDisplayCon,
        onLeave: hideDisplayCon,
        onLeaveBack: hideDisplayCon
      }
    });

    // scroll animation for name list
    tl.fromTo(names, { y: 0 }, { y: -maxScroll, ease: "none" });
    timeLineRef.current = tl;
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  })

  const showDisplayCon = () => {
    gsap.to(containerRef.current, {opacity: 1, pointerEvents: "all", duration: 1});
    // animate preview 
    gsap.fromTo(previewRef.current, 
      {yPercent: 30, opacity: 0}, {
        yPercent: 0, 
        opacity: 1, 
        duration: .6,
        ease: "power2.out"
      })
  }

  const hideDisplayCon = () => {
    gsap.to(containerRef.current, {opacity: 0, pointerEvents: "none", duration: 1});
    // animate preview 
    gsap.to(previewRef.current, 
      {yPercent: 30, opacity: 0, duration: 1, ease: "power2.out"})
  }

  // Name list item click handler
  const handleItemClick = (elem: HTMLElement, i: number) => {
    setSelectedIndex(i);
    movePointer(elem);
  }

  // preview list item click handler
  const handlePreviewClick = (elem: HTMLElement, i: number) => {
    setSelectedIndex(i)

    movePreviewImage(elem);
  }

  const movePreviewImage = (elem: HTMLElement) => {
    gsap.to(previewRef.current, {
      y: -elem.offsetTop,
      duration: .6, 
      ease: "expo.inOut"
    })
  }

  const movePointer = (elem: HTMLElement) => {
    if (!pointerRef.current || !nameListRef.current) return;
    const pointer = pointerRef.current as HTMLDivElement;
    const nameList = nameListRef.current as HTMLDivElement;
  
    // Compute max scroll distance
    const maxScroll = nameList.scrollHeight - nameList.offsetHeight + addedScroll;
  
    // Get the target position
    let targetY = elem.offsetTop;
  
    // Ensure it doesn't exceed maxScroll
    if (targetY > maxScroll) {
      // targetY = maxScroll;
    }
  
    gsap.to(pointer, {
      y: targetY,
      ease: "expo.inOut",
      duration: 0.6
    });
  
    // gsap.to(nameList, {
    //   y: -targetY,
    //   ease: "expo.inOut",
    //   duration: 0.6,
    //   onComplete: () => {
    //     if (!timeLineRef.current) return;
    //     const newProgress = maxScroll === 0 ? 0 : targetY / maxScroll;
    //     timeLineRef.current.progress(newProgress);
    //   }
    // });
  };  

  useCustomEffect(() => {
    if (!previewRef.current || !nameListRef.current) return;
    const names = nameListRef.current as HTMLDivElement;
    const previews = previewRef.current as HTMLDivElement;

    const nameList = Array.from(names.children);
    const previewImages = Array.from(previews.children);

    const matchedName = nameList.find((item) => JSON.parse(item.getAttribute("data-index") || "0") === selectedIndex);
    const matchedImage = previewImages.find((item) => JSON.parse(item.getAttribute("data-index") || "0") === selectedIndex);

    if (!matchedImage || !matchedName) return;

    movePointer(matchedName as HTMLElement);
    movePreviewImage(matchedImage as HTMLElement);

  }, [selectedIndex])
  

  return (
    <div ref={containerRef} className="h-screen w-full px-5 grid grid-cols-8 opacity-0">
      {/* Index */}
      <div></div>

      {/* Post preview  */}
      <div className="overflow-visible translate-y-[35vh]">
        <div ref={previewRef} className="flex flex-col gap-y-[20px] opacity-0 overflow-visible">
          {
            posters.map((poster, i) => (
              <div 
                key={poster.name} 
                onClick={(e) => handlePreviewClick(e.currentTarget, i)}
                data-index={i}
                className={`relative transition-all duration-[600ms] w-[150px] aspect-[3/2] overflow-hidden`}>
                {/* <div className={`absolute z-10 transition-all duration-[600ms] left-0 top-0 w-full h-full ${selectedIndex === i ? 'bg-gradient-to-t from-myblack to-transparent' : ''}`}></div> */}
                <img 
                  src={poster.path} 
                  className={`
                    object-cover w-full h-full transition-all duration-[600ms]
                    ${selectedIndex === i ? 'opacity-100' : 'opacity-30'}
                  `} 
                />
              </div>
            ))
          }
        </div>
      </div>

      {/* Name List and Display */}
      <div ref={nameDisplayCon} className="col-start-3 col-span-5">
        <div ref={nameListRef} className="relative text-[25px] flex flex-col gap-y-2.5 leading-[1] h-[75vh] mt-[35vh] w-fit overflow-visible">

         {/* Triangle Pointer */}
         <div 
          ref={pointerRef}
          className="absolute -right-[60px] w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-myGray-100 -rotate-90"/>
          {
            posters.map((poster, i) => (
              <button 
                key={poster.name} 
                onClick={(e) => handleItemClick(e.currentTarget, i)}
                data-index={i}
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