import { createContext, ReactNode, useContext, useState } from "react";
import { Page, pages } from "./NavContext";

interface Props {
  selected: Page,
  setSelected: React.Dispatch<React.SetStateAction<Page>>
}

const CarouselContext = createContext<Props | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  
  if (!context) throw new Error("Carousel context is undefined");

  return context;
}

const CarouselContextProvider:React.FC<{children: ReactNode}> = ({children}) => {
  const [selected, setSelected] = useState<Page>(pages[2]);

  return (
    <CarouselContext.Provider value={{
      selected,
      setSelected
    }}>
      {children}
    </CarouselContext.Provider>
  )
}

export default CarouselContextProvider;