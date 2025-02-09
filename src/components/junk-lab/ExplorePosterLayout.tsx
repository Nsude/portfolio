import { PosterLayout } from "../models";


const ExplorePosterLayout = ({index}: PosterLayout) => {
  if (index !== "1") return null;
  
  return (
    <div>ExplorePosterLayout</div>
  )
}

export default ExplorePosterLayout;