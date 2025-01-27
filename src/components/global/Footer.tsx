import { Link } from "react-router-dom";
import { useNavContext } from "../contexts/NavContext";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { pages, socialLinks } = useNavContext();
  const footerRef = useRef(null);

  return (
    <div ref={footerRef} className="h-[100dvh] lg:h-[100vh] overflow-hidden grid grid-rows-7 grid-cols-5 bg-myblack px-5 pb-5 leading-[0.95] lg:grid-cols-8 text-white tracking-tight">
      <h3 className="text-[60px] row-start-2 row-span-2 col-span-5 md:col-span-2 md:text-[70px] lg:text-[100px] text-nowrap xl:text-[130px]">
        Let's Build <br /> Something <br /> <span className="font-serif text-[90px] md:text-[100px] lg:text-[115px] leading-[0.5] xl:text-[160px] tracking-tight">unreal</span>
      </h3>

      <div className="flex mt-[30px] md:mt-0 gap-x-[50px] row-start-4 row-span-2 col-start-1 col-span-5 md:row-start-2 md:col-start-4 md-gap-x[100px] lg:col-start-6 md:-ml-[26px]">
        <div>
          <h4 className="mb-5 uppercase">(Navigate)</h4>
          <div className="flex flex-col gap-y-[5px]">
            {
              pages.map((page, i) => (
                <Link className="text-5 opacity-40 hover:opacity-100 transition-opacity duration-[400ms] text-nowrap" key={i} to={page.link}>{page.name}</Link>
              ))
            }
          </div>
        </div>

        <div>
          <h4 className="mb-5 uppercase">(Reach out)</h4>
          <div className="flex flex-col gap-y-[5px]">
            {
              socialLinks.map((item, i) => (
                <Link className="text-5 opacity-40 hover:opacity-100 transition-opacity duration-[400ms] text-nowrap" target="_blank" key={i} to={item.link}>{item.name}</Link>
              ))
            }
          </div>
        </div>
      </div>

      {/* ===== LOGO IMAGE AND COPYRIGHTS ===== */}
      <div className="row-start-7 md:row-start-6 row-span-2 flex flex-col justify-between col-span-5 lg:col-span-8 lg:row-start-5 lg:row-span-3">
        <div className="w-full h-full">
          <img 
            src="assets/images/name-text-stroke.png" 
            className="w-full object-cover" 
            alt="logo image" />
        </div>

        <div className="w-full flex justify-between text-base">
          <p className="hidden lg:inline-block">@M-N</p>
          <p>All rights reserve &copy; <span className="hidden lg:inline-block">2025</span> </p>
          <button className="uppercase">Back to top</button>
        </div>
      </div>
    </div>
  )
}

export default Footer;