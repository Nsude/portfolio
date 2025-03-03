import { useParams } from "react-router-dom";
import useGetProject from "../hooks/useGetProject";
import useCustomEffect from "../hooks/useCustomEffect";
import ProjectLayout from "./ProjectLayout";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ProjectView = () => {
  const {title} = useParams();
  const {data: selectedProject} = useGetProject(title || "");
  const projectLayoutRef = useRef(null);
  const heroRef = useRef(null);

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

  }, [selectedProject])

  return (
    <div className="min-h-[100vh] w-full h-full">
      {/* ===== HERO SECTION ===== */}
      {
        selectedProject ? (
        <>
        <div ref={heroRef} className="h-screen w-full grid grid-cols-8 grid-rows-8 p-5 leading-[1]">
          <div className="col-start-1 sm:col-start-2 row-start-3 text-nowrap">
            <p>Case Study</p>
            <p className="opacity-40 mt-1">({selectedProject.category} Project)</p>
          </div>

          <div className="col-start-6 row-start-3 translate-x-[-25px] text-[25px]">
            {
              selectedProject.services.map((item, i) => (
                <p key={i} className="mb-2 last:mt-0"> {item} </p>
              ))
            }
          </div>

          <div className="uppercase text-wrap lg:text-nowrap text-[100px] sm:text-[165px] lg:text-[250px] -tracking-[0.04ch] font-appleG col-start-1 sm:col-start-2 row-start-6">
            <h2>{title}</h2>
          </div>

          <p className="col-start-1 sm:col-start-2 row-start-8 self-end">@{new Date().getFullYear()}</p>
          <p className="col-start-6 row-start-8 -translate-x-[25px] self-end">SCROLL</p>
          
        </div>

        <div ref={projectLayoutRef} className="relative z-[2]">
          <ProjectLayout selectedProject={selectedProject} />
        </div>
        </>

        ) : ''
      }
    </div>
  )
}

export default ProjectView;