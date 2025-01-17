import React, { createContext, PropsWithChildren, useContext, useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pages: Page[];
  socialLinks: string[];
}

interface Page {
  name: string;
  video: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
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
    name: 'Projects',
    image: '',
    video: '',
    title: 'the projects',
    description: 'Here’s where the magic happens. From e-commerce brilliance to immersive digital experiences.',
    tags: ['Designer', 'Developer']
  },
  {
    name: 'About me',
    image: '',
    video: '',
    title: 'About lil ol me',
    description: `This isn’t just a portfolio—it’s a statement. Scroll, click, explore. 

    You’re about to step into my world of creativity, innovation, and unapologetic Digital brilliance.`,
    tags: ['Designer', 'Developer']
  },
  {
    name: 'User interfaces',
    image: '',
    video: '',
    title: 'The interfaces',
    description: `This is where ideas meet design. A showcase of interfaces that blur the line between functional and beautiful. 
    
    Every layout tells a story—some bold, some subtle, all uniquely mine.`,
    tags: ['Designer', 'Developer']
  },
  {
    name: 'Junk lab',
    image: '',
    video: '',
    title: 'The junk lab',
    description: `Step into the chaos. This isn’t design—it’s anarchy on a canvas. A no-rules, all-guts curation of my wildest poster layouts. 

    Bold, brash, and unhinged. Enter if you dare, and don’t say I didn’t warn you.`,
    tags: ['Designer', 'Developer']
  },

];

const socialLinks = ['LinkedIn', 'Twitter', 'Email'];

const NavContextProvider:React.FC<PropsWithChildren> = ({children}) => {
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