import React, { createContext, ReactNode, useContext, useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pages: Page[];
  socialLinks: SocialLink[];
}

interface SocialLink {
  name: string;
  link: string
}

export interface Page {
  index: string;
  name: string;
  video: string;
  title: string;
  image: string;
  description: string;
  cheekyLine: string;
  tags: string[];
  poster: string;
  link: string
}

const NavContext = createContext<Props | null>(null);

export const useNavContext = () => {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error("Nav context is undefined");
  }

  return context;
}

const pages: Page[] = [
  {
    name: 'Index',
    index: '001',
    image: '/assets/images/index-image.webp',
    video: '/assets/videos/index.mp4',
    title: 'the projects',
    description: 'Here’s where the magic happens. From e-commerce brilliance to immersive digital experiences.',
    cheekyLine: "There's no place like home",
    tags: ['Designer', 'Developer'],
    poster: '',
    link: '/',
  },
  {
    name: 'Projects',
    index: '002',
    image: '/assets/images/projects-image.webp',
    video: '/assets/videos/projects.mp4',
    title: 'the projects',
    description: 'Here’s where the magic happens. From e-commerce brilliance to immersive digital experiences.',
    cheekyLine: 'Where ideas go to get built (and occasionally break)',
    tags: ['Code Conjurer', 'Creator'],
    poster: '/assets/images/posters/poster-image-10.webp',
    link: '/projects'
  },
  {
    name: 'About me',
    index: '003',
    image: '/assets/images/headshot.webp',
    video: '/assets/videos/about-poster.mp4',
    title: 'About lil ol me',
    description: `This isn’t just a portfolio—it’s a statement. Scroll, click, explore. 

    You’re about to step into my world of creativity, innovation, and unapologetic Digital brilliance.`,
    cheekyLine: 'All the gossip about your favorite dev.',
    tags: ['Designer', 'Developer'],
    poster: '/assets/images/posters/poster-image-26.webp',
    link: '/about'
  },
  {
    name: 'User interfaces',
    index: '004',
    image: '/assets/images/interfaces-image.webp',
    video: '/assets/videos/interfaces.mp4',
    title: 'The interfaces',
    description: `This is where ideas meet design. A showcase of interfaces that blur the line between functional and beautiful. 
    
    Every layout tells a story—some bold, some subtle, all uniquely mine.`,
    cheekyLine: 'Interfaces so smooth, they practically flirt.',
    tags: ['Clicksmith', 'Pixel Pusher'],
    poster: '/assets/images/posters/poster-image-27.webp',
    link: '/projects/ui-layouts'
  },
  {
    name: 'Junk lab',
    index: '005',
    image: '/assets/images/junklab-image.webp',
    video: '/assets/videos/junk-lab.mp4',
    title: 'The junk lab',
    description: `Step into the chaos. This isn’t design—it’s anarchy on a canvas. A no-rules, all-guts curation of my wildest poster layouts. 

    Bold, brash, and unhinged. Enter if you dare, and don’t say I didn’t warn you.`,
    cheekyLine: 'Creative menace—step into the mind of lil ol me.',
    tags: ['Type Geek', 'Tinker'],
    poster: '/assets/images/posters/poster-image-11.webp',
    link: '/junk-lab'
  },

];

const socialLinks = [
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/nsude-meshach/'
  },
  {
    name: 'Twitter',
    link: 'https://x.com/meshach_nsude'
  },
  {
    name: 'Email',
    link: 'mailto:meshachnsd@gmail.com'
  }];

const NavContextProvider:React.FC<{children: ReactNode}> = ({children}) => {
  const [open, setOpen] = useState(false);

  return (
    <NavContext.Provider value={{
      open, 
      setOpen,
      pages,
      socialLinks
      }}>
      {children}
    </NavContext.Provider>
  )
}

export default NavContextProvider;