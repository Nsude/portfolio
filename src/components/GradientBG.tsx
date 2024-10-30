import { useRef } from 'react'
import { useGlobalContext } from './contexts/globalContext'
import useCustomEffect from './hooks/useCustomEffect'
import BlurBlops from './BlurBlops';
import { changeBGTheme } from './utils';

const GradientBG = () => {
  const {loaded, bgTheme} = useGlobalContext();
  const blurOverlayRef = useRef<HTMLDivElement>(null);

   // change background theme 
   useCustomEffect(() => {
    if (!loaded) return;
    changeBGTheme(".background-container .blur-overlay", bgTheme);
  }, [bgTheme, loaded])

  useCustomEffect(() => {
    if (!loaded) return;
    const overlay = blurOverlayRef.current as HTMLDivElement;
    overlay.classList.add("make-blur");
  }, [loaded])

  return (
    <div className="background-container">
      <div ref={blurOverlayRef} className="blur-overlay"></div>
      <div className="blops">
        <BlurBlops />
      </div>
    </div>
  )
}

export default GradientBG;