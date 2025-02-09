import { posters } from "../contexts/ProjectsContext"

const JunklabMobile = () => {
  return (
    <div className="text-white w-full h-fit px-5 pt-[150px]">
      <div className="flex items-center mb-[100px] sm:mb-[200px] sm:px-20">
        <h2 className="text-[25px] sm:text-[35px] leading-[1.1] text-justify">
          Welcome to the Junk lab, a curated collection of layouts from my 365 days of typography journey.
          Before you dive in, don’t forget your shades—this mind-altering journey is not for the faint of heart. May the design forces be with you.
        </h2>
      </div>

      {/* ===== POSTERS ===== */}
      <div className="flex flex-wrap justify-center gap-10 sm:gap-[60px]">
        {posters.map((poster, i) => {
          return (
            <div key={i} className={`w-[22%]`}>
              <img 
                className="w-full h-full object-cover"
                src={poster} 
                alt={`poster-image-${i}`} 
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default JunklabMobile