import { useNavigate } from "react-router-dom";
import { Project, useProjectContext } from "../contexts/ProjectsContext"
import useCustomEffect from "../hooks/useCustomEffect";
import { useRef } from "react";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  project: Project;
  index: number
}

const ProjectGrid = ({project, index}: Props) => {
  const {activeProject, setActiveProject} = useProjectContext();
  const navigate = useNavigate();
  const descRef = useRef(null);
  const mediaCon = useRef(null);
  const lenis = useLenis();

  // ==== NAVIGATE  ====
  const handleClick = (project: Project) => {
    setActiveProject(project);
    navigate(`/projects/${project.title}`, {replace: false});
  }

  // ==== PIN DESCRIPTION WHILE SCROLLING IMAGES ====
  useCustomEffect(() => {
    if (!descRef.current || !mediaCon.current || activeProject?.index !== project.index) return;

    gsap.killTweensOf([descRef.current, mediaCon.current]);

    const trigger = ScrollTrigger.create({
      trigger: mediaCon.current,
      markers: true,
      pin: descRef.current,
      pinSpacing: true,
      pinReparent: true,
      start: "top top",
      end: "bottom bottom",
      scrub: .5
    })

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
    }
  }, [activeProject])

  const isActiveProject = () => {
    return activeProject?.index === project.index;
  }

  return (
    <div 
      onClick={() => handleClick(project)}
      className={`
        grid grid-cols-2 grid-rows-1 w-full 
        ${activeProject?.index === project.index ? 'h-fit' : 'h-[100dvh]'} cursor-pointer
      `}>

      {/* ===== MEDIA CONTAINER ===== */}
      <div 
        ref={mediaCon}
        className={`
          w-full min-h-[100vh] flex flex-col items-center
          ${isActiveProject() ? 'overflow-y-auto hide-scroll py-[150px] h-fit' : 'h-full'} 
          ${(index + 1) % 2 === 0 ? 'col-start-2' : ''}
        `}>

        {/* Thumnail image */}
        <img 
          className={`object-cover ${isActiveProject() ? 'w-[75%] aspect-square mb-5' : 'h-full w-full'}`}
          src={project.thumbnail} 
          alt="featured project thumbnail image" />

        {/* ...Project images */}
        {activeProject?.index === project.index && activeProject?.media.length > 0 ? (
          <div className='w-[75%] h-full flex flex-col gap-y-5'>
            {activeProject.media.map((image, i) => (
              <div key={i} className="w-full aspect-square overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt={`Project image ${i + 1}`}
                />
              </div>
            ))}
          </div>
        ) : ''}
      </div>

      {/* ===== PROJECT TITLE / DESCRIPTION ===== */}
      <div ref={descRef} className={`h-[100vh] flex flex-col justify-end pb-5 px-5 border-blue-600 border-2`}>
        <div className="flex justify-between items-end">
          <h3 className="text-[30px] lg:text-[40px]">{project.title}</h3>
          <p className="text-base font-serif sm:text-[20px] lg:text-[25px]">{project.index}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectGrid