import gsap from "gsap";

const slideup = (elements: HTMLElement[], duration: number, stagger: number, ease?: string, slideFast?: boolean, delay?: number) => {
  if (!elements || elements.length === 0) throw new Error("slide up elements are undefined");

  gsap.fromTo(
    elements,
    {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", 
      y: slideFast ? 60 : 40
    },
    {
      clipPath: "polygon(-20% -20%, 120% -10%, 120% 120%, -20% 110%)",
      duration,
      y: 0,
      ease: ease || "expo.inOut",
      stagger: stagger,
      repeat: 0,
      delay
    }
  );    
  
}

export default slideup;