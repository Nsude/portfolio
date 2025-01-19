import { useRef, useState } from "react";
import { Page, useNavContext } from "../contexts/NavContext";
import useCustomEffect from "../hooks/useCustomEffect";
import gsap from 'gsap';
import SocialLink from "./SocialLink";
import slideup from "../utils/slideUp";
import BracesHeaderText from "./BracesHeaderText";
import NavMenuImage from "./NavMenuImage";

const NavMenu = () => {
  const {open, pages, socialLinks} = useNavContext();
  const container = useRef(null);
  const innerCon = useRef(null);
  const fadeInElems = useRef<HTMLElement[]>([]);
  const duration = .8;
  const ease = "expo.inOut";

  const [seletedPage, setSelectedpage] = useState<Page | null>(null);

  useCustomEffect(() => {
    // Kill any active animations on container and innerCon to prevent conflicts
    gsap.killTweensOf([container.current, innerCon.current]);

    if (open) {
      gsap.set(container.current, {opacity: 1, pointerEvents: 'all'});
      gsap.set(innerCon.current, { yPercent: 0}); //reset inner con

      gsap.to(container.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration,
        ease
      });

      slideup(fadeInElems.current, duration, .02);
      
    } else {
      gsap.to(container.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration,
        ease
      });

      // move innercon on close
      gsap.to(innerCon.current, {
        yPercent: -6,
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
      className="text-base w-full h-[100dvh] lg:h-[100vh] pointer-events-none text-myblack bg-myGray-100 fixed opacity-0 z-10">
      <div ref={innerCon} className="grid grid-rows-9 lg:grid-cols-8 p-[20px] h-[100%] w-full">
        <div ref={(el) => addElem(el)} className="row-start-2 lg:hidden">
          <p>@{new Date().getFullYear()}</p>
        </div>

        {/* ===== PAGE LINKS ===== */}
        <div className="row-start-5 lg:row-start-4 lg:col-start-2 lg:col-span-3">
          {
            pages.map((page, i) => (
              <button 
                ref={(el) => addElem(el)} 
                key={i} 
                onMouseEnter={() => setSelectedpage(page)}
                className="mb-[5px] text-left last:mb-[0] block">
                <BracesHeaderText text={page.name} />
              </button>
            ))
          }
        </div>

        {/* ===== SOCIAL LINKS ===== */}
        <p ref={(el) => addElem(el)} className="hidden lg:inline-block uppercase lg:row-start-10 lg:col-span-1">Reach Out</p>
        <div className="row-start-10 flex gap-[20px] lg:col-start-2 lg:col-span-3">
          {
            socialLinks.map((link, i) => (
              <button ref={(el) => addElem(el)} key={i}>
                <SocialLink title={link} trigger={open} iconSize={13} />
              </button>
            ))
          }
        </div>

        {/* ===== IMAGE CONTAINER ===== */}
        <div className="hidden lg:block lg:col-start-6 lg:col-span-3 lg:row-start-2">
          <NavMenuImage page={seletedPage} />
        </div>

        <div ref={(el) => addElem(el)} className="hidden lg:inline-block lg:row-start-10 lg:col-start-9">
          <p>@{new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}

export default NavMenu;