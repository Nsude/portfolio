import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ProjectGrid {
  image1: string;
  image2: string;
  logoBlack: string;
  logoWhite: string;
  desktopVideo1: string;
  desktopVideo2: string;
  desktopVideo3?: string;
  desktopVideo4?: string;
  desktopVideo5?: string;
  image3: string;
  mobileVideo: string;
  image4: string;
  image5: string;
}

export interface Project {
  title: string;
  index: string;
  thumbnail: string;
  category: string;
  media: ProjectGrid;
  services: string[];
  overview: string,
  sectors: string[],
  timeline: string,
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
    category: 'e-commerce',
    media: {
      image1: '/assets/images/harlow/harlow-img-1.webp',
      image2: '/assets/images/harlow/harlow-img-2.webp',
      logoBlack: '/assets/images/harlow/harlow-logo-black.png',
      logoWhite: '/assets/images/harlow/harlow-logo-white.png',
      desktopVideo1: '/assets/images/harlow/videos/Landing-Page.mp4',
      desktopVideo2: '/assets/images/harlow/videos/Search.mp4',
      desktopVideo3: '/assets/images/harlow/videos/Grid-Sort.mp4',
      desktopVideo4: '/assets/images/harlow/videos/Login.mp4',
      desktopVideo5: '/assets/images/harlow/videos/Desktop-Menu.mp4',
      image3: '/assets/images/harlow/harlow-card.webp', 
      mobileVideo: '',
      image4: '/assets/images/harlow/harlow-men.webp',
      image5: '/assets/images/harlow/harlow-kids.webp'
    },
    services: ["Design", "Development", "Content"],
    overview: `Harlow is a sleek and modern fashion e-commerce platform designed to showcase a seamless online shopping experience. Featuring an exclusive collection from top brands like Nike, Adidas, Puma, and Harlow, the platform blends intuitive UX with bold aesthetics to create a high-end retail feel.
    Harlow focuses on smooth navigation, dynamic product displays, and an immersive shopping experience.`,
    sectors: ["Fashion", "Lifestyle"],
    timeline: 'Dec, 2024'
  },
  {
    title: 'Polygene',
    index: '002',
    thumbnail: '/assets/images/polygene.webp',
    category: 'Gradient Exp. 1',
    media: ['/assets/images/polygene.webp', '/assets/images/polygene.webp', '/assets/images/polygene.webp'],
    services: ["Design", "Development", "Content"],
    overview: ``,
    sectors: [],
    timeline: ''
  },
  {
    title: 'UI layouts',
    index: '003',
    category: 'UI Explorations',
    thumbnail: '/assets/images/uiLayouts.webp',
    media: ['/assets/images/uiLayouts.webp', '/assets/images/uiLayouts.webp', '/assets/images/uiLayouts.webp'],
    services: ["Design", "Development"],
    overview: ``,
    sectors: [],
    timeline: ''
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

export interface Poster {
  name: string;
  path: string;
  index: string
}

export const posters: Poster[] = [
  {
    name: "Focus Absolute",
    path: "/assets/images/posters/poster-image.webp",
    index: "PN 035.365"
  },
  {
    name: "Helvetica GT",
    path: "/assets/images/posters/poster-image-1.webp",
    index: "PN 035.365"
  },
  {
    name: "Aeonik",
    path: "/assets/images/posters/poster-image-2.webp",
    index: "PN 312.365"
  },
  {
    name: "Drew",
    path: "/assets/images/posters/poster-image-3.webp",
    index: "PN 188.365"
  },
  {
    name: "Excess PT",
    path: "/assets/images/posters/poster-image-4.webp",
    index: "PN 324.365"
  },
  {
    name: "I Just Love Black",
    path: "/assets/images/posters/poster-image-5.webp",
    index: "PN 291.365"
  },
  {
    name: "Let Me Breathe",
    path: "/assets/images/posters/poster-image-6.webp",
    index: "PN 202.365"
  },
  {
    name: "Impossible until",
    path: "/assets/images/posters/poster-image-7.webp",
    index: "PN 352.365"
  },
  {
    name: "The old the now",
    path: "/assets/images/posters/poster-image-8.webp",
    index: "PN 344.365"
  },
  {
    name: "just do it",
    path: "/assets/images/posters/poster-image-9.webp",
    index: "PN 303.365"
  },
  {
    name: "cre8 peace",
    path: "/assets/images/posters/poster-image-10.webp",
    index: "PN 347.365"
  },
  {
    name: "Helvetica Regular",
    path: "/assets/images/posters/poster-image-11.webp",
    index: "PN 257.365"
  },
  {
    name: "Helvetica GT-Combine",
    path: "/assets/images/posters/poster-image-12.webp",
    index: "PN 195.365"
  },
  {
    name: "chaos",
    path: "/assets/images/posters/poster-image-13.webp",
    index: "PN 321.365"
  },
  {
    name: "ThreeSixFive",
    path: "/assets/images/posters/poster-image-14.webp",
    index: "PN 062.365"
  },
  {
    name: "Everything's just great",
    path: "/assets/images/posters/poster-image-15.webp",
    index: "PN 068.365"
  },
  {
    name: "Louis Vuitton",
    path: "/assets/images/posters/poster-image-16.webp",
    index: "PN 320.365"
  },
  {
    name: "Upside",
    path: "/assets/images/posters/poster-image-17.webp",
    index: "PN 090.365"
  },
  {
    name: "Lonely",
    path: "/assets/images/posters/poster-image-18.webp",
    index: "PN 096.365"
  },
  {
    name: "Influence IN",
    path: "/assets/images/posters/poster-image-19.webp",
    index: "PN 124.365"
  },
  {
    name: "our reality",
    path: "/assets/images/posters/poster-image-20.webp",
    index: "PN 181.365"
  },
  {
    name: "Anxiety",
    path: "/assets/images/posters/poster-image-21.webp",
    index: "PN 108.365"
  },
  {
    name: "type is not dead",
    path: "/assets/images/posters/poster-image-22.webp",
    index: "PN 103.365"
  },
  {
    name: "coal city",
    path: "/assets/images/posters/poster-image-23.webp",
    index: "PN 191.365"
  },
  {
    name: "Infected",
    path: "/assets/images/posters/poster-image-24.webp",
    index: "ID Poster Summit"
  },
  {
    name: "Long haul",
    path: "/assets/images/posters/poster-image-25.webp",
    index: "PN 032.365"
  },
  {
    name: "Surreal",
    path: "/assets/images/posters/poster-image-26.webp",
    index: "PN 204.365"
  },
  {
    name: "Nike Collage",
    path: "/assets/images/posters/poster-image-27.webp",
    index: "Signature Piece"
  },
  {
    name: "My Mind",
    path: "/assets/images/posters/poster-image-28.webp",
    index: "PN 195.365"
  },
  {
    name: "Vogue",
    path: "/assets/images/posters/poster-image-29.webp",
    index: "PN 200.365"
  },
  {
    name: "save you tears",
    path: "/assets/images/posters/poster-image-30.webp",
    index: "PN 340.365"
  },
  {
    name: "infinite ways",
    path: "/assets/images/posters/poster-image-31.webp",
    index: "PN 304.365"
  },
  {
    name: "EA Creativity",
    path: "/assets/images/posters/poster-image-32.webp",
    index: "PN 102.365"
  },
  {
    name: "Liquid Water",
    path: "/assets/images/posters/poster-image-33.webp",
    index: "PN 349.365"
  },
  {
    name: "Shred",
    path: "/assets/images/posters/poster-image-34.webp",
    index: "PN 047.365"
  },
  {
    name: "Time did tell",
    path: "/assets/images/posters/poster-image-35.webp",
    index: "PN 332.365"
  },
  
];