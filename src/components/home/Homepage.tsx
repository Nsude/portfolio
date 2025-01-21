import { useCarouselContext } from "../contexts/CarouselContext";
import Carousel from "./Carousel";
import VideoReveal from "./VideoReveal";

const Homepage = () => {
  const { selected } = useCarouselContext();

  return (
    <div className="relative h-[100dvh] lg:h-[100vh] w-full px-5 grid grid-rows-10 justify-center overflow-hidden">
      {/* ===== VIDEO BG ===== */}
      <div className='absolute left-0 top-0 w-full h-full'>
        <div className='w-full h-full hidden lg:block'>  
          <VideoReveal selected={selected} delay={.2} />
        </div>
      </div>
      
      <div className="relative z-[2] row-start-3 row-span-5 flex justify-center">
        <Carousel />
      </div>
      
      <div className="hidden uppercase text-base w-[90%]">
        <p className="text-[10px] opacity-50 mb-2">intro</p>
        <h4 className="text-ellipsis w-full"> {selected?.description} </h4>
      </div>

      <div className=" row-start-10 w-full">
        <img className="w-full " src="assets/images/name-text.png" alt="name" />
      </div>
    </div>
  )
}

export default Homepage;