import { createContext, ReactNode, useContext, useState } from "react";

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


const preloaderContext = createContext<Props | null>(null);

export const usePreloaderContext = () => {
  const context = useContext(preloaderContext);
  if (!context) throw new Error("Preloader Context is Undefined");

  return context;
}

const PreloaderContextProvider = ({children}: {children: ReactNode}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <preloaderContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </preloaderContext.Provider>
  )
}

export default PreloaderContextProvider;