import { useCarouselContext } from "../contexts/CarouselContext";
import ImageReveal from "./ImageReveal";

const FeaturedCardTwo = () => {
  const { selected } = useCarouselContext();
  return (
    <div className="text-[8px] w-[180px] aspect-myRatio bg-white p-1 flex flex-col justify-between uppercase leading-[1]">
      <div className="relative w-full h-[70%] overflow-hidden">
        <div className="absolute z-[2] left-0 top-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
        <ImageReveal page={selected} featured={true} fullHeight={true} delay={.2} />
      </div>
      <div className="flex justify-between w-full items-end p-1">
        <p>@The <br />Junk lab </p>
        <p className="text-[16px]">Featured</p>
      </div>
    </div>
  )
}

export default FeaturedCardTwo;