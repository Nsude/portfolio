import { useMemo, useState } from "react";
import PostersMenu from "./PostersMenu";
import GridPosterLayout from "./GridPosterLayout";
import ExplorePosterLayout from "./ExplorePosterLayout";
import ListPosterLayout from "./ListPosterLayout";
import { posters } from "../contexts/ProjectsContext";

const JunklabDesktop = () => {
  const [menuIndex, setMenuIndex] = useState("0");
  const posterList = useMemo(() => posters, [posters]);

  return (
    <div className="text-white">
      <div className="h-screen w-full mb-10 grid grid-cols-8 items-center">
        <h2 className="text-[40px] tracking-[0.01ch] leading-[1] col-start-2 col-span-6">
          &nbsp;&nbsp;&nbsp;&nbsp; Welcome to the Junk lab, a curated collection of layouts from my 365 days of typography journey.
          Before you dive in, don’t forget your shades—this mind-altering journey is not for the faint of heart. May the design forces be with you.
        </h2>
      </div>

      <div className="w-full">
        <div key={menuIndex}>
          {menuIndex === "0" && <GridPosterLayout posters={posterList} />}
          {menuIndex === "1" && <ExplorePosterLayout posters={posterList} />}
          {menuIndex === "2" && <ListPosterLayout posters={posterList} />}
        </div>
      </div>

      <PostersMenu setMenuIndex={setMenuIndex} />
    </div>
  );
};

export default JunklabDesktop;
