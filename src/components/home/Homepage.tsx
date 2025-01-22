import { useCarouselContext } from "../contexts/CarouselContext";
import Carousel from "./Carousel";

const Homepage = () => {
  const { selected } = useCarouselContext();

  return (
    <div className="relative h-[100dvh] lg:h-[100vh] w-full px-5 grid grid-rows-10 justify-center overflow-hidden lg:grid-cols-8 lg:px-[20px]">    
      <div className="relative z-[3] row-start-3 row-span-5 flex justify-center lg:inline-block lg:col-start-2 lg:col-span-2">
        <Carousel />
      </div>

      <div className="hidden relative z-[4] row-start-6 col-start-4 lg:inline-block">
        <h2 className="text-[160px] font-serif lowercase leading-[0.5] text-nowrap -tracking-[0.06ch]">{ selected?.title || "The Title" }</h2>
      </div>
      
      <div className="hidden relative z-[2] uppercase text-base max-w-[450px] mt-5 row-start-7 col-start-6 col-span-2 lg:inline-block">
        <p className="text-[10px] opacity-50 mb-[5px]">intro</p>
        <h4 className="w-full"> {selected?.description} </h4>
      </div>

      <div className="row-start-10 w-full lg:absolute z-[2] lg:bottom-5 lg:left-0 lg:px-5">
        <img className="w-full mix-blend-difference" src="assets/images/name-text.png" alt="name" />
      </div>
    </div>
  )
}

export default Homepage;