import { Outlet, useLocation } from 'react-router-dom';
import Footer from './global/Footer';
import { useEffect, useMemo, useRef, useState } from 'react';
import useCustomEffect from './hooks/useCustomEffect';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from 'lenis/react';
import { useDevice } from './hooks/useDevice';
import StatusBar from './global/StatusBar';
import Preloader from './global/Preloader';
import { usePreloaderContext } from './contexts/PreloaderContext';

// Register once globally
gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const location = useLocation();
  const hideFooter = useMemo(() => location.pathname === "/", [location.pathname]);
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

  useEffect(() => {
    if (hideFooter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

  }, [hideFooter])

  // ==== RESET ANIMATIONS ON RESIZE ====
  useCustomEffect(() => {
    lenis?.resize();
    ScrollTrigger.refresh();

  }, [device.width])

  // ===== SCROLL TO TOP ON PAGE NAVIGATE =====
  useEffect(() => {
    lenis?.scrollTo(0, {duration: 1, offset: 0})
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
      <StatusBar />
      {
        isLoading ? 
        (
          <Preloader />
        )
        : (
          <div className={`${darkBg ? 'bg-myblack' : 'bg-myGray-100'} hide-scroll`}>
            <Outlet />
            {
              !hideFooter &&
              <div
                ref={footerRef}
                className={`w-full h-fit relative z-[5]`}
              >
                <Footer />
              </div>
            }
          </div>
        )
      }
    </ReactLenis>
  );
}

export default Layout;