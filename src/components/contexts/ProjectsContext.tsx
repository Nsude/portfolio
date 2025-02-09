import { createContext, PropsWithChildren, useContext, useState } from "react";

export interface Project {
  title: string;
  index: string;
  thumbnail: string;
  media: string[];
}

interface Props {
  projects: Project[];
  activeProject: Project | null,
  setActiveProject: React.Dispatch<React.SetStateAction<Project | null>>
}


const ProjectContext = createContext<Props | null>(null);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("Project context is undefined");
  return context;
}

const projects: Project[] = [
  {
    title: 'Harlow',
    index: '001',
    thumbnail: '/assets/images/harlow.webp',
    media: ['/assets/images/harlow.webp', '/assets/images/harlow.webp', '/assets/images/harlow.webp']
  },
  {
    title: 'Polygene',
    index: '002',
    thumbnail: '/assets/images/polygene.webp',
    media: ['/assets/images/polygene.webp', '/assets/images/polygene.webp', '/assets/images/polygene.webp']
  },
  {
    title: 'UI layouts',
    index: '003',
    thumbnail: '/assets/images/uiLayouts.webp',
    media: ['/assets/images/uiLayouts.webp', '/assets/images/uiLayouts.webp', '/assets/images/uiLayouts.webp']
  },
]

const ProjectContextProvider = ({children}: PropsWithChildren) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <ProjectContext.Provider value={{
      activeProject,
      setActiveProject,
      projects
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContextProvider;

export const posters = [
  "/assets/images/posters/poster-image.webp",
  "/assets/images/posters/poster-image-1.webp",
  "/assets/images/posters/poster-image-2.webp",
  "/assets/images/posters/poster-image-3.webp",
  "/assets/images/posters/poster-image-4.webp",
  "/assets/images/posters/poster-image-5.webp",
  "/assets/images/posters/poster-image-6.webp",
  "/assets/images/posters/poster-image-7.webp",
  "/assets/images/posters/poster-image-8.webp",
  "/assets/images/posters/poster-image-9.webp",
  "/assets/images/posters/poster-image-10.webp",
  "/assets/images/posters/poster-image-11.webp",
  "/assets/images/posters/poster-image-12.webp",
  "/assets/images/posters/poster-image-13.webp",
  "/assets/images/posters/poster-image-14.webp",
  "/assets/images/posters/poster-image-15.webp",
  "/assets/images/posters/poster-image-16.webp",
  "/assets/images/posters/poster-image-17.webp",
  "/assets/images/posters/poster-image-18.webp",
  "/assets/images/posters/poster-image-19.webp",
  "/assets/images/posters/poster-image-20.webp",
  "/assets/images/posters/poster-image-21.webp",
  "/assets/images/posters/poster-image-22.webp",
  "/assets/images/posters/poster-image-23.webp",
  "/assets/images/posters/poster-image-24.webp",
  "/assets/images/posters/poster-image-25.webp",
  "/assets/images/posters/poster-image-26.webp",
  "/assets/images/posters/poster-image-27.webp",
  "/assets/images/posters/poster-image-28.webp",
  "/assets/images/posters/poster-image-29.webp",
  "/assets/images/posters/poster-image-30.webp",
  "/assets/images/posters/poster-image-31.webp",
  "/assets/images/posters/poster-image-32.webp",
  "/assets/images/posters/poster-image-33.webp",
  "/assets/images/posters/poster-image-34.webp",
  "/assets/images/posters/poster-image-35.webp",
];