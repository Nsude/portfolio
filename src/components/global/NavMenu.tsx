import { useRef } from "react";
import { useNavContext } from "../contexts/NavContext";
import useCustomEffect from "../hooks/useCustomEffect";
import gsap from 'gsap';
import SocialLink from "./SocialLink";
import slideup from "../utils/SlideUp";

const NavMenu = () => {
  const {open, pages, socialLinks} = useNavContext();
  const container = useRef(null);
  const innerCon = useRef(null);
  const fadeInElems = useRef<HTMLElement[]>([]);
  const duration = .8;
  const ease = "expo.inOut";

  useCustomEffect(() => {
    
    if (open) {
      gsap.set(container.current, {opacity: 1, pointerEvents: 'all'});
      gsap.set(innerCon.current, { yPercent: 0}); //reset inner con

      gsap.to(container.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration,
        ease
      });

      slideup(fadeInElems.current, duration, .05);
      
    } else {
      gsap.to(container.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration,
        ease
      });

      // move innercon on close
      gsap.to(innerCon.current, {
        yPercent: -10,
        delay: .1,
        duration: 1
      })
    }

  }, [open])

  const addElem = (el: HTMLElement | null) => {
    if (el && !fadeInElems.current.includes(el)) {
      fadeInElems.current.push(el);
    }
  };  

  return (
    <div ref={container} 
      className="text-base w-full h-[100vh] pointer-events-none text-myblack p-[20px] bg-myGray-100 fixed opacity-0 z-10">
      <div ref={innerCon} className="grid grid-rows-8 h-[100%] w-full ">
        <div ref={(el) => addElem(el)} className="row-start-2">
          <p>@{new Date().getFullYear()}</p>
        </div>

        {/* ===== pAGE LINKS ===== */}
        <div className="row-start-5">
          {
            pages.map((page, i) => (
              <button ref={(el) => addElem(el)} key={i} className="mb-[5px] last:mb-[0] block">
                <h2 className="text-[40px] opacity-50 leading-[1.1] tracking-tight" >{page.name}</h2>
              </button>
            ))
          }
        </div>

        {/* ===== SOCIAL LINKS ===== */}
        <div className="row-start-9 flex gap-[20px]">
          {
            socialLinks.map((link, i) => (
              <div ref={(el) => addElem(el)} key={i}>
                <SocialLink title={link} trigger={open} iconSize={13} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default NavMenu;