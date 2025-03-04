import { Poster } from "./contexts/ProjectsContext";

export interface Icon {
  size?: number;
  trigger?: boolean;
  colour?: string;
}

export interface PosterLayout {
  posters: Poster[]
}