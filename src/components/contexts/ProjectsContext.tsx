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