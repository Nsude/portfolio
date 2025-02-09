import { Poster } from "./contexts/ProjectsContext";

export interface Icon {
  size?: number;
  trigger?: boolean
}

export interface PosterLayout {
  posters: Poster[]
}