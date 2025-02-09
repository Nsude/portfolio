import { PosterLayout } from "../models";


const ListPosterLayout = ({index}: PosterLayout) => {
  if (index != "2") return null;

  return (
    <div>
      List WOrkd
    </div>
  )
}

export default ListPosterLayout;