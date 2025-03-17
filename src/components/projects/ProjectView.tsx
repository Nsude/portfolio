import useCustomEffect from "../hooks/useCustomEffect";
import ProjectLayout from "./ProjectLayout";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useActiveProject from "../hooks/useActiveProject";

const ProjectView = () => {
  const {project} = useActiveProject();
  const projectLayoutRef = useRef(null);
  const heroRef = useRef(null);
  const [showLayout, setShowLayout] = useState(true);

  useEffect(() => {
    if (project?.title?.toLowerCase().includes("polygene")) {
      setShowLayout(false);
    } else {
      setShowLayout(true);
    }
  }, [project])

  useCustomEffect(() => {
    const layout = projectLayoutRef.current;
    const hero = heroRef.current;
    if (!layout || !hero) return;
    
    gsap.killTweensOf([hero, layout]);
    ScrollTrigger.killAll();

    const animation = ScrollTrigger.create({
      trigger: hero,
      start: "bottom bottom",
      end: `+=${window.innerHeight}`,
      pin: true,
      pinSpacing: false,
      onUpdate: (self) => {
        const opacityValue = 0.8 - self.progress;
        gsap.to(hero, {opacity: opacityValue, overwrite: true})
      }
    })

    return () => {
      gsap.killTweensOf([hero, layout]);
      animation.kill();
      ScrollTrigger.killAll();
    }

  }, [project])

  return (
    <div className="min-h-[100vh] w-full h-full relative ">
      {/* ===== COMING SOON ===== */}
      {
        !project?.overview ?
        <div>
          <div className="flex justify-center items-center w-full h-screen absolute left-0 top-0 z-[1] bg-gradient-to-b from-transparent to-myblack"></div>

          <div className="w-full h-full flex justify-center items-center absolute left-0 top-0">
           <h2 className="uppercase text-white opacity-50 text-[45px] sm:text-[60px] lg:text-[450px] leading-[1] -tracking-[0.08ch]">coming soon...</h2>
          </div>
        </div> : null
      }

      {/* ===== HERO SECTION ===== */}
      {
        project ? (
        <>
        <div ref={heroRef} className="h-screen w-full grid grid-cols-8 grid-rows-8 p-5 leading-[1]">
          <div className="col-start-1 sm:col-start-2 row-start-3 text-nowrap">
            <p>Case Study</p>
            <p className="opacity-40 mt-1">({project.category} Project)</p>
          </div>

          <div className="col-start-6 row-start-3 translate-x-[-25px] text-[25px]">
            {
              project.services.map((item, i) => (
                <p key={i} className="mb-2 last:mt-0"> {item} </p>
              ))
            }
          </div>

          <div className="uppercase text-wrap lg:text-nowrap text-[100px] sm:text-[165px] lg:text-[250px] -tracking-[0.04ch] font-appleG col-start-1 sm:col-start-2 row-start-6">
            <h2>{project.title}</h2>
          </div>

          <p className="col-start-1 sm:col-start-2 row-start-8 self-end">@{new Date().getFullYear()}</p>
          <p className="col-start-6 row-start-8 -translate-x-[25px] self-end">SCROLL</p>
          
        </div>

        <div ref={projectLayoutRef} className="relative z-[2]">
          { showLayout && <ProjectLayout selectedProject={project} />}
        </div>
        </>

        ) : <div className="text-[150px]"> Project is undefined </div>
      }
    </div>
  )
}

export default ProjectView;