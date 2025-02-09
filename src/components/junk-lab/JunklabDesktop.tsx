import { useState } from "react";
import PostersMenu from "./PostersMenu";
import GridPosterLayout from "./GridPosterLayout";
import ExplorePosterLayout from "./ExplorePosterLayout";
import ListPosterLayout from "./ListPosterLayout";

const JunklabDesktop = () => {
  const [menuIndex, setMenuIndex] = useState("");

  return (
    <div className="text-white">
      <div className="h-screen w-full grid grid-cols-8 items-center">
        <h2 className="text-[40px] tracking-[0.01ch] leading-[1] col-start-2 col-span-6">&nbsp;&nbsp;&nbsp;&nbsp; Welcome to the Junk lab, a curated collection of layouts from my 365 days of typography journey.
        Before you dive in, don’t forget your shades—this mind-altering journey is not for the faint of heart. May the design forces be with you.</h2>
      </div>

      <div className="w-full">
        <GridPosterLayout index={menuIndex} />
        <ExplorePosterLayout index={menuIndex} />
        <ListPosterLayout index={menuIndex} />
      </div>

      <PostersMenu setMenuIndex={setMenuIndex} />
    </div>
  )
}

export default JunklabDesktop;