import { useCarouselContext } from "../contexts/CarouselContext";
import VideoReveal from "./VideoReveal";

const FeaturedCardOne = () => {
  const { selected } = useCarouselContext();

  return (
    <div className="relative bg-white w-[200px] aspect-myRatio">
      {/* ===== LAYOUT SIDE TEXTS ===== */}
      <div className="absolute left-0 right-0 h-full w-full z-[4] text-[8px] grid grid-cols-6 grid-rows-10 uppercase p-2 leading-[1]">
        <p className="row-start-1 col-start-6 -mt-2.5 flex items-end -rotate-90">001</p>
        <p className="row-start-4 col-start-6 -mt-2.5 flex items-end -rotate-90">Menace</p>
        <p className="row-start-11 col-start-1">Icre8</p>
        <p className="row-start-10 row-span-2 col-start-3 flex flex-col justify-end">Meshach<br />Nsude</p>
        <p className="row-start-11 col-start-6 flex justify-end">@M-N</p>
      </div>

      <div className="hidden lg:block w-full h-full">
        <VideoReveal selected={selected} />
      </div>
      
    </div>
  )
}

export default FeaturedCardOne;