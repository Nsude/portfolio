import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './global/NavBar';
import Footer from './global/Footer';
import NavContextProvider from './contexts/NavContext';
import { useEffect, useRef, useState } from 'react';
import useCustomEffect from './hooks/useCustomEffect';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from 'lenis/react';
import { useDevice } from './hooks/useDevice';

gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const routesToHideFooter = "/";
  const location = useLocation();
  const [hideFooter, setHideFooter] = useState(false);
  const outletRef = useRef(null);
  const footerRef = useRef(null);
  const lenisRef = useRef<any>(null);
  const device = useDevice();
  const lenis = useLenis();

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

  // ===== SCROLL TO TOP ON PAGE NAVIGATE =====
  useEffect(() => {
    lenis?.scrollTo(0, {immediate: true})
  }, [location])

  useCustomEffect(() => {
    setHideFooter(routesToHideFooter.endsWith(location.pathname));
  }, [location])

  useCustomEffect(() => {
    if (device.width < 640) return null;
    if (!outletRef.current || !footerRef.current) return;

    gsap.killTweensOf([outletRef.current, footerRef.current]);

    const tl = gsap.timeline();

    tl.to(footerRef.current, {
      bottom: 0,
      scrollTrigger: {
        trigger: outletRef.current,
        start: "bottom bottom",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 1
      }
    })
  }, [device])
  
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
      <NavContextProvider>
        <div className="relative bg-myGray-100 overflow-hidden">
          <NavBar />
          <div ref={outletRef}>
            <Outlet />
          </div>
          <div
            ref={footerRef}
            className={`${(device.width > 640 ? 'absolute' : 'static')} left-0 -bottom-[100%] w-full h-fit`}
          >
            {!hideFooter && <Footer />}
          </div>
        </div>
      </NavContextProvider>
    </ReactLenis>
  );
}

export default Layout;