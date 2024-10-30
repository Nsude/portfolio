import gsap from "gsap";

// switch bg theme
const updateClassList = (className: string, target: NodeListOf<Element>) => {
  const bgClasses = ["blue-bg", "pink-bg", "ivory-bg", "cyan-bg", "dark-bg"]; 
  // remove previous bg classes
  target.forEach((elem) => {
    bgClasses.forEach((clas$) => {
      elem.classList.remove(clas$);
    })
  })

  // add new class
  target.forEach((elem) => {
    elem.classList.add(className);
  })
}

// handle change bg
export const changeBGTheme = (className: string, bgTheme: string) => {
  const theme = bgTheme.toLowerCase();
  const target = document.querySelectorAll(`${className}`);
  if (!target) return;
  if (theme === "blue") {
    updateClassList("blue-bg", target);
  } else if (theme === "pink") {
    updateClassList("pink-bg", target);
  } else if (theme === "ivory") {
    updateClassList("ivory-bg", target);
  } else if (theme === "cyan") {
    updateClassList("cyan-bg", target);
  } else if (theme === "dark") {
    updateClassList("dark-bg", target);
  }
}
/* =============== Switch Bg End ======================= */

// scale nav menu top and bottom svgs
export const scaleMenuSvg = (target: SVGSVGElement | null, scaleUp?: boolean) => {
  if (!SVGAElement) return;
  if (!scaleUp) {
    gsap.set(target, {
      scaleX: 0.7,
      transformOrigin: "left",
    })
    
  } else {
    gsap.to(target, {
      scaleX: 1,
      transformOrigin: "left"
    })
  }
}