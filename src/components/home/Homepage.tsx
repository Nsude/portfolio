import Name from "../../assets/icons/Name";
import { useCarouselContext } from "../contexts/CarouselContext";
import { useDevice } from "../hooks/useDevice";
import Carousel from "./Carousel";
import VideoReveal from "./VideoReveal";

const Homepage = () => {
  const { selected } = useCarouselContext();
  const device = useDevice();

  return (
    <div className="relative h-[100dvh] lg:h-[100vh] w-full px-5 grid grid-rows-10 justify-center overflow-hidden lg:grid-cols-8 lg:px-[20px]">
      {/* ===== VIDEO BG ===== */}
      <div className='absolute left-0 top-0 w-full h-full'>
        <div className='w-full h-full hidden lg:block'>  
          <VideoReveal selected={selected} delay={.2} />
        </div>
      </div>
      
      <div className="relative z-[3] row-start-3 row-span-5 flex justify-center lg:inline-block lg:col-start-2 lg:col-span-2">
        <Carousel />
      </div>

      <div className="hidden relative z-[4] row-start-6 col-start-4 text-white mix-blend-difference lg:inline-block">
        <h2 className="text-[180px] font-serif lowercase leading-[0.5] text-nowrap -tracking-[0.06ch]">{ selected?.title || "The Title" }</h2>
      </div>
      
      <div className="hidden relative z-[2] uppercase text-base text-white mix-blend-difference max-w-[350px] mt-5 row-start-7 col-start-6 col-span-2 lg:inline-block">
        <p className="text-[10px] opacity-50 mb-[5px]">intro</p>
        <h4 className="text-ellipsis w-full"> {selected?.description} </h4>
      </div>

      <div className="row-start-10 w-full lg:absolute z-[2] lg:bottom-5 lg:left-0 lg:px-5">
        <img className="w-full mix-blend-difference" src="assets/images/name-text.png" alt="name" />
        {/* {
          device.width < 640 ? (
            <img className="w-full mix-blend-difference" src="assets/images/name-text.png" alt="name" />
          ) : (
            <Name />
          )
        } */}
      </div>
    </div>
  )
}

export default Homepage;