import { useProjectContext } from "../contexts/ProjectsContext";
import { useEffect, useRef } from "react";
import ProjectGrid from "./ProjectGrid";
import useCustomEffect from "../hooks/useCustomEffect";
import { useLenis } from "lenis/react";


const Projects = () => {
  const { projects, setActiveProject, activeProject } = useProjectContext();
  const containerRef = useRef(null);
  const lenis = useLenis();

  // ==== INIT ACTIVE PROJECT ON MOUNT ====
  useEffect(() => {
    const projectName = decodeURIComponent(location.pathname.split('/projects/')[1]);
    if (!projectName) return;
    const match = projects.find((project) => project.title === projectName);
    setActiveProject(match || null);
  }, [location])

  useCustomEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current as HTMLDivElement;
    const sections = Array.from(container.children) as HTMLDivElement[];

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Find the closest section
      let closest = sections[0];
      let closestDistance = Math.abs(closest.offsetTop - scrollPosition);

      for (const section of sections) {
        const distance = Math.abs(section.offsetTop - scrollPosition);
        if (distance < closestDistance) {
          closest = section;
          closestDistance = distance;
        }
      }

      // Snap to closest section
      if (lenis) {
        lenis?.scrollTo(closest.offsetTop, {duration: 1});
      }
    };

    let timeout: any;
    const onScrollStop = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 40); // Fires after scrolling stops
    };

    
    window.addEventListener("scroll", onScrollStop);

    return () => {
      window.removeEventListener("scroll", onScrollStop);
    };
  }, [lenis, activeProject]);


  return (
    <div ref={containerRef} className="w-full h-full">
      {
        projects.map((project, i) => (
          <div key={i}>
            <ProjectGrid project={project} index={i} />
          </div>
        ))
      }
    </div>
  )
}

export default Projects;