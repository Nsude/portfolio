import { useRef } from "react";
import { useNavContext } from "../contexts/NavContext";
import useCustomEffect from "../hooks/useCustomEffect";
import gsap from 'gsap';
import SlideUp from "../animation-helpers/SlideUp";
import SocialLink from "./SocialLink";

const NavMenu = () => {
  const {open, pages, socialLinks} = useNavContext();
  const container = useRef(null);
  const innerCon = useRef(null);
  const duration = .8;
  const ease = "expo.inOut";

  useCustomEffect(() => {
    
    if (open) {
      gsap.set(container.current, {opacity: 1, pointerEvents: 'all'});

      gsap.to(container.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration,
        ease
      });

      gsap.set(innerCon.current, { yPercent: 0});
      
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

  return (
    <div ref={container} 
      className="text-base w-full h-[100vh] pointer-events-none text-myblack p-[20px] bg-myGray-100 fixed opacity-0 z-10">
      <div ref={innerCon} className="grid grid-rows-8 h-[100%] w-full ">
        <div className="row-start-2">
          <SlideUp trigger={open} delay={duration - 0.3}>
            <p>@{new Date().getFullYear()}</p>
          </SlideUp>
        </div>

        {/* ===== pAGE LINKS ===== */}
        <div className="row-start-5">
          {
            pages.map((page, i) => (
              <button key={i} className="mb-[5px] last:mb-[0] block">
                <SlideUp trigger={open} delay={duration - 0.3}>
                  <h2 className="text-[40px] opacity-50 leading-[1.1] tracking-tight" >{page.name}</h2>
                </SlideUp>
              </button>
            ))
          }
        </div>

        {/* ===== SOCIAL LINKS ===== */}
        <div className="row-start-9 flex gap-[20px]">
          {
            socialLinks.map((link, i) => (
              <SocialLink key={i} title={link} trigger={open} iconSize={13} delay={.6} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default NavMenu;