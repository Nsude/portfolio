import { Outlet, useLocation } from 'react-router-dom';
import Footer from './global/Footer';
import { useEffect, useRef, useState } from 'react';
import useCustomEffect from './hooks/useCustomEffect';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from 'lenis/react';
import { useDevice } from './hooks/useDevice';
import ProjectContextProvider from './contexts/ProjectsContext';
import StatusBar from './global/StatusBar';
import Preloader from './global/Preloader';
import { usePreloaderContext } from './contexts/PreloaderContext';

// Register once globally
gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const routesToHideFooter = "/";
  const location = useLocation();
  const [hideFooter, setHideFooter] = useState(false);
  const footerRef = useRef(null);
  const lenisRef = useRef<any>(null);
  const device = useDevice();
  const lenis = useLenis();
  const {isLoading } = usePreloaderContext();

  // ===== INIT LENIS SMOOTH SCROLL =====
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update);

    ScrollTrigger.refresh();
  
    return () => {
      gsap.ticker.remove(update);
     
    }
  }, [])

  // ==== RESET ANIMATIONS ON RESIZE ====
  useCustomEffect(() => {
    lenis?.resize();
    ScrollTrigger.refresh();

  }, [device.width])

  // ===== SCROLL TO TOP ON PAGE NAVIGATE =====
  useEffect(() => {
    lenis?.scrollTo(0, {duration: 1, offset: 0})
  }, [location])

  useCustomEffect(() => {
    setHideFooter(routesToHideFooter.endsWith(location.pathname));
  }, [location])

  const [darkBg, setDarkBg] = useState(false);
  useEffect(() => {
    lenis?.resize();
    if (!location.pathname.toLowerCase().includes('junk-lab')) return setDarkBg(false);
    setDarkBg(true);
  }, [location, device])
  
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, 
        smoothWheel: true,
        autoRaf: false
      }} 
      ref={lenisRef}
    >
      <ProjectContextProvider>
        <StatusBar />
        {
          isLoading ? 
          (
            <Preloader />
          )
          : (
            <div className={`${darkBg ? 'bg-myblack' : 'bg-myGray-100'} hide-scroll`}>
              <Outlet />
              <div
                ref={footerRef}
                className={`w-full h-fit relative z-[5]`}
              >
                {!hideFooter && <Footer />}
              </div>
            </div>
          )
        }
      </ProjectContextProvider>
    </ReactLenis>
  );
}

export default Layout;