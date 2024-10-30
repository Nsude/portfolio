import React, { useRef, useState } from "react";
import gsap from "gsap";
import useCustomEffect from "../../components/hooks/useCustomEffect";
import { useGlobalContext } from "../../components/contexts/globalContext";
import Logo from "../icons/Logo";

interface Props {
  size?: number,
}

export const polygonAnimDuration = .4;

const Polygon:React.FC<Props> = ({size}) => {
  const {killAnim, setKillAnim, setLoaded} = useGlobalContext(); 
  const [progress, setProgress] = useState("000");
  const pathRef = useRef<SVGPathElement | null>(null);
  const animationRef = useRef<GSAPTween>();

  useCustomEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength();
    const displacement = 300;

    gsap.set(path, {
      strokeDasharray: length - displacement,
      strokeDashoffset: length - displacement
    })

    animationRef.current = gsap.to(path, {
      strokeDashoffset: -displacement,
      duration: 3, 
      ease: "linear",
      repeat: -1,
    })
   
  })

  // Update polygon on load completed
  const logoRef = useRef<HTMLDivElement>(null);
  const secondPathRef = useRef<SVGPathElement | null>(null);
  useCustomEffect(() => {
    if (!killAnim || !pathRef.current) return;
    animationRef.current?.pause();
    const path = pathRef.current;
    const length = path.getTotalLength();
  
    gsap.to(path, {
      strokeOpacity: 1,
      strokeWidth: 1.4,
      strokeDasharray: length,
      strokeDashoffset: 0,
      duration: polygonAnimDuration
    })

    gsap.set(".polygon p", {
      opacity: 0, 
      delay: polygonAnimDuration
    }).then(() => {
      setLoaded(true)
    })

    // animate loader out
    gsap.to(".polygon-icon", {
      opacity: 0,
      yPercent: 60,
      scale: .1,
      duration: .3,
      delay: polygonAnimDuration - .1
    })

    // animate logo in
    gsap.to(logoRef.current, {
      top: 20,
      duration: .6,
    })

  }, [killAnim])

  // update progress
  useCustomEffect(() => {
    let count = 0;
    const countInterval = setInterval(() => {
      if (count > 99) return clearInterval(countInterval);
      count += 1;
    }, 10);

    const progressInterval = setInterval(() => {
      setProgress(count.toString().padStart(3, "0"));
      if (count > 99) {
        setKillAnim(true); 
        clearInterval(progressInterval);
      }
    }, 200)
  })

  return (
    <div className="polygon-icon-container">
      <div ref={logoRef} className="logo">
        <Logo />
      </div>
      <div className="polygon-icon">
        <p>{progress}</p>
        <svg style={{overflow: "visible"}} width={size ? (size - 18): 120} height={size || 138} viewBox="0 0 120 138" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M68.5493 2.89303L109.964 26.804C115.425 29.9568 118.789 35.7834 118.789 42.089V89.911C118.789 96.2166 115.425 102.043 109.964 105.196L68.5492 129.107C63.0885 132.26 56.3605 132.26 50.8997 129.107L9.48461 105.196C4.02381 102.043 0.659827 96.2166 0.659827 89.911V42.089C0.659827 35.7834 4.02382 29.9568 9.48461 26.804L50.8997 2.89303C56.3605 -0.259764 63.0885 -0.259762 68.5493 2.89303Z" 
          stroke="black" 
          strokeOpacity="0.6" 
          strokeWidth="1"
          ref={pathRef}/>

          <path d="M68.5493 2.89303L109.964 26.804C115.425 29.9568 118.789 35.7834 118.789 42.089V89.911C118.789 96.2166 115.425 102.043 109.964 105.196L68.5492 129.107C63.0885 132.26 56.3605 132.26 50.8997 129.107L9.48461 105.196C4.02381 102.043 0.659827 96.2166 0.659827 89.911V42.089C0.659827 35.7834 4.02382 29.9568 9.48461 26.804L50.8997 2.89303C56.3605 -0.259764 63.0885 -0.259762 68.5493 2.89303Z" 
          stroke="black" 
          strokeOpacity="0.4" 
          strokeWidth="0.700849"
          ref={secondPathRef}/>
        </svg>
      </div>
    </div>
  )
}

export default Polygon;