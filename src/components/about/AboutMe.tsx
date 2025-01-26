import { TriangleAlert } from "lucide-react";
import PostersGrid from "./PostersGrid";

const AboutMe = () => {
  return (
    <div className="leading-[1] h-full w-full">
      {/* ===== INTRO SCREEN ===== */}
      <div className="px-5 relative h-[100dvh] lg:[100vh] w-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-y-5" >
          <div className="flex items-center">
            <p className="font-serif text-base">003 &mdash; </p>
            <p>&nbsp; ABOUT ME</p>
          </div>

          <h3 className="w-[90%] text-[25px] text-center sm:w-[55%] md:w-[65%] md:text-[40px] lg:w-[38%]">
            The software engineer who <span className="font-serif text-[35px] leading-[0.7] md:text-[55px]">designs</span>, or is it the designer who <span className="font-serif text-[35px] leading-[0.7] md:text-[55px]">codes</span>, now I'm not sure.
          </h3>
        </div>

        <p className="absolute left-5 bottom-5 text-base opacity-50 lg:hidden">SCROLL</p>
      </div>

      {/* ===== WARNING OVERLAY ===== */}
      <div className="px-5 h-[100dvh] md:[60vh] flex flex-col justify-center">
        <button className="flex items-center w-fit text-base gap-x-[5px] px-[25px] py-[10px] bg-red-300 text-red-600 rounded-3xl" >
          <TriangleAlert size={16} />
          <p>WARNING</p>
        </button>

        <p className="w-[90%] text-left text-5 mt-5 leading-[1.2] sm:w-[45%] xl:w-[26%] lg:text-[25px]">
          The visuals you’re about to see might just steal your heart. If you’re taken, grab some shades before scrolling any further. If not—sit back, relax, and enjoy the show.
        </p>
      </div>

      {/* ===== FEATURED POSTERS ===== */}
      <PostersGrid />

      {/* =====  ===== */}
    </div>
  )
}

export default AboutMe;