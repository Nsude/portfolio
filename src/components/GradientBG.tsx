import { useRef } from 'react'
import { useGlobalContext } from './contexts/globalContext'
import useCustomEffect from './hooks/useCustomEffect'
import BlurBlops from './BlurBlops';
import { changeBGTheme } from './utils';
import gsap from "gsap"
import Logo from '../assets/icons/Logo';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GradientBG = () => {
  const {loaded, setLoaded, bgTheme, killAnim} = useGlobalContext();
  const blurOverlayRef = useRef<HTMLDivElement>(null);

   // change background theme 
   useCustomEffect(() => {
    if (!loaded) return;
    changeBGTheme(".background-container .blur-overlay", bgTheme);
  }, [bgTheme, loaded])

  useCustomEffect(() => {
    if (!loaded) return;
    const overlay = blurOverlayRef.current as HTMLDivElement;
    overlay.classList.add("make-blur");
  }, [loaded])

  useCustomEffect(() => {
    if (!killAnim) return;
    gsap.to(".overlay", {
      top: "50%", 
      duration: 1,
      stagger: .2,
    })
    gsap.to(".overlay", {
      delay: 1.4,
      scale: 1.3,
      duration: .4
    })
    gsap.to(".overlay", {
      delay: 2,
      scale: 4,
      duration: .8
    })
    .then(() => {
      setLoaded(true);
      const tl = gsap.timeline();

      tl.to(".overlay", {
        opacity: 0, 
        scale: 0,
        duration: .4
      })

      tl.set(".overlay", {
        display: "none"
      })
    })
  }, [killAnim])

  return (
    <div className="background-container">
      <div ref={blurOverlayRef} className="blur-overlay">
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay flex jc-c">
          <Logo size={50} />
        </div>
      </div>
      <div className="blops">
        <BlurBlops />
      </div>
    </div>
  )
}

export default GradientBG;