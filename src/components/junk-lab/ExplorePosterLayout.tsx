import gsap from "gsap";
import { PosterLayout } from "../models";
import useCustomEffect from "../hooks/useCustomEffect";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExplorePosterLayout = ({posters}: PosterLayout) => {
  const containerRef = useRef(null);
  const [canNavigate, setCanNavigate] = useState(false);
  const posterPositions = useRef(posters.map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    transform: `rotate(${Math.random() * 20 - 10}deg)`,
  })));

  useCustomEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current as HTMLDivElement;
    gsap.killTweensOf(container);

    ScrollTrigger.create({
      trigger: container,
      pin: true,
      end: "max",
      onEnter: initNav,
      onLeave: () => {
        container.style.visibility = "hidden";
        setTimeout(() => {
          container.style.visibility = "visible";
        }, 50);
      },
      onEnterBack: () => {
        container.style.visibility = "hidden";
        setTimeout(() => {
          container.style.visibility = "visible";
        }, 50);
      }
    })

    return () => gsap.killTweensOf(container)
  })

  const initNav = () => { if(canNavigate !== true) setCanNavigate(true)};

  // ===== HANDLE WHEEL NAVIGATION =====
  useCustomEffect(() => {
    let x = 0, y = 0;

    const updatePosition = (dx: number, dy: number) => {
      if (!canNavigate) return;
      x += dx;
      y += dy;
      gsap.to(containerRef.current, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    // Handle scroll (mouse wheel)
    const handleWheel = (e: WheelEvent) => {
      const speed = 1.2;
      updatePosition(-e.deltaX * speed, -e.deltaY * speed);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [canNavigate]);

  const handlePosterHover = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    gsap.to(target, {
      scale: 1.5,
      duration: .6, 
      zIndex: 30,
      ease: "expo.inOut"
    })
  }

  const handlePosterHoverBlur = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    gsap.to(target, {
      scale: 1,
      duration: .6, 
      zIndex: 1,
      ease: "expo.inOut"
    })
  }

  let isDragging = false;
  let startX: number, startY: number, currentX = 0, currentY = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    gsap.to(containerRef.current, { x: currentX, y: currentY, duration: 0.2 });
  };

  const onMouseUp = () => {
    isDragging = false;
  };
  
  return (
    <div 
      ref={containerRef} 
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className="h-screen w-full">
      <div className="relative w-[200vw] h-[200vh]">
        {posters.map((poster, i) => {
          const style = posterPositions.current[i];
          return (
            <div 
              onMouseEnter={handlePosterHover} 
              onMouseLeave={handlePosterHoverBlur}
              style={style} className="absolute h-60 aspect-[4/5]">
              <img
                key={poster.name}
                src={poster.path}
                className="object-cover w-full h-full"
                style={style}
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ExplorePosterLayout;