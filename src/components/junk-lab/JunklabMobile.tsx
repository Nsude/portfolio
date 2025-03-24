import { posters } from "../contexts/ProjectsContext"
import LazyLoadImage from "../utils/LazyLoadImage";

const JunklabMobile = () => {
  return (
    <div className="text-white w-full h-fit px-5 pt-[150px]">
      <div className="flex items-center mb-[100px] sm:mb-[200px] sm:px-20">
        <h2 className="font-appleG text-[25px] sm:text-[35px] leading-[1] text-justify">
        Welcome to the Junk lab, a <span className="font-serif">curated collection</span> of layouts from my 365 days of <span className="font-serif">typography</span> journey.
        Before you dive in, don’t forget your shades—this mind-altering journey is not for the faint of heart. May the <span className="font-serif">design forces</span> be with you.
        </h2>
      </div>

      {/* ===== POSTERS ===== */}
      <div className="flex flex-wrap justify-center gap-10 sm:gap-[60px]">
        {posters.map((poster, i) => {
          return (
            <div key={i} className={`w-[22%]`}>
              <LazyLoadImage src={poster.path} />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default JunklabMobile