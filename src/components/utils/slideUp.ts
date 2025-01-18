import gsap from "gsap";

const slideup = (elements: HTMLElement[], duration: number, stagger: number, delay?: number) => {
  if (!elements || elements.length === 0) throw new Error("slide up elements are undefined");

  gsap.fromTo(
    elements,
    {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", 
      y: 40
    },
    {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration,
      y: 0,
      ease: "expo.inOut",
      stagger: stagger,
      repeat: 0,
      delay
    }
  );    
  
}

export default slideup;