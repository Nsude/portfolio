import gsap from 'gsap';
import useCustomEffect from '../../components/hooks/useCustomEffect';
import { useRef, useState } from 'react';

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const topBar = useRef(null);
  const middleBar = useRef(null);
  const lastBar = useRef(null);

  useCustomEffect(() => {
    const duration = .2;
    const transformOrigin = "center";
    const ease = "power2.inOut";

    if (open) {
      const openTl = gsap.timeline();
      // animate to center
      openTl.to(topBar.current, {
        top: '50%',
        duration,
        ease
      });

      openTl.to(lastBar.current, {
        bottom: '50%',
        duration,
        ease
      }, "<");

      openTl.to(middleBar.current, {opacity: 0, duration});

      // make X 
      openTl.to(topBar.current, {
        rotate: 45,
        transformOrigin,
        duration,
        ease
      }, "<");

      openTl.to(lastBar.current, {
        rotate: -45,
        transformOrigin,
        duration,
        ease
      }, "<");

    } else {
      const closeTl = gsap.timeline();
      // revert rotate
      closeTl.to(topBar.current, {
        rotate: 0,
        transformOrigin,
        duration,
        ease
      });

      closeTl.to(lastBar.current, {
        rotate: 0,
        transformOrigin,
        duration,
        ease
      }, "<");

      // revert position
      closeTl.to(topBar.current, {
        top: 0,
        duration,
        ease
      });

      closeTl.to(lastBar.current, {
        bottom: 0,
        duration,
        ease
      }, "<");

      closeTl.to(middleBar.current, {opacity: 1, duration}, "<");

    }

  }, [open])

  return (
    <button 
      onClick={() => setOpen(prev => !prev)} 
      className="group relative w-10 h-[12px] flex flex-col justify-between items-center">
      <span ref={topBar} className="h-[1px] w-full bg-white absolute top-0" />
      <span ref={middleBar} className="h-[1px] w-[80%] bg-white absolute top-[50%]" />
      <span ref={lastBar} className="h-[1px] w-full bg-white absolute bottom-0" />
    </button>
  )
}

export default Hamburger;