import gsap from "gsap"
import useCustomEffect from './hooks/useCustomEffect'
import { useGlobalContext } from './contexts/globalContext'
import { changeBGTheme } from "./utils";

const BlurBlops = () => {
  const {loaded, bgTheme} = useGlobalContext();

  // change blop theme 
  useCustomEffect(() => {
    if(!loaded) return;
    changeBGTheme(".blops .blop", bgTheme);
  }, [bgTheme, loaded])

  // animate blops
  useCustomEffect(() => {
    if (!loaded) return;
    gsap.to(".blops", {
      opacity: 1,
      delay: .3
    })

    const tl = gsap.timeline({defaults: {
      duration: gsap.utils.random(4, 8), 
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      opacity: 1,
      delay: gsap.utils.random(0, 2),
    }});

    tl.fromTo(".blops .blop",
      {
        scaleX: 1,
        scaleY: 1,
        x: gsap.utils.random(0, window.innerWidth),
        y: gsap.utils.random(0, window.innerHeight),
      }, {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut"
      }
    );
    
    tl.to(".blops .blop", {
      left: gsap.utils.random(0, 10),
      scaleX: () => gsap.utils.random(1, 1.5), // Stretch slightly in X direction
      scaleY: () => gsap.utils.random(1, 3), // Compress slightly in Y direction
      x: () => gsap.utils.random(0, window.innerWidth),
      y: () => gsap.utils.random(0, window.innerHeight),
      skewX: () => gsap.utils.random(-10, 20), // Apply slight skew for flow effect
      skewY: () => gsap.utils.random(-10, 20),
    })
    .to(".blops .blop", {
      opacity: gsap.utils.random(0.7, 1), 
      duration: 2,
      ease: "power1.inOut"
    });

    randomiseMove(tl);
    randomiseMove(tl);
    randomiseMove(tl);
    randomiseMove(tl);
    randomiseMove(tl)
   

  }, [loaded])

  const randomiseMove = (tl: GSAPTimeline) => {
    return tl.to(".blops .blop", {
      left: gsap.utils.random(0, 10),
      scaleX: () => gsap.utils.random(1, 3), // Stretch slightly in X direction
      scaleY: () => gsap.utils.random(0.8, 2), // Compress slightly in Y direction
      x: () => gsap.utils.random(0, window.innerWidth),
      y: () => gsap.utils.random(0, window.innerHeight),
      skewX: () => gsap.utils.random(-10, 20), // Apply slight skew for flow effect
      skewY: () => gsap.utils.random(-10, 20),
    })
    .to(".blops .blop", {
      opacity: 0, 
      duration: 2,
      ease: "power1.inOut"
    });
  }

  return (
    <div className="blur-blops-container">
      <div className="blops">
        <div className="blop"></div>
        <div className="blop"></div>
        <div className="blop"></div>
        {/* <div className="blop"></div>
        <div className="blop"></div> */}
        {/* <div className="blop"></div> */}
      </div>
    </div>
  )
}

export default BlurBlops;