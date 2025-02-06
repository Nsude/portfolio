import { Project, useProjectContext } from "../contexts/ProjectsContext";
import { useEffect, useRef} from "react";
import useCustomEffect from "../hooks/useCustomEffect";
import { useLenis } from "lenis/react";
import { useNavigate } from "react-router-dom";


const Projects = () => {
  const { projects, setActiveProject, activeProject } = useProjectContext();
  const containerRef = useRef(null);
  const lenis = useLenis();
  const activeProjectRef = useRef(activeProject); // Store activeProject in a ref to prevent snap scroll on active 
  const navigate = useNavigate();

  // ==== INIT ACTIVE PROJECT ON MOUNT ====
  useEffect(() => {
    const projectName = decodeURIComponent(location.pathname.split('/projects/')[1]);
    if (!projectName) return;
    const match = projects.find((project) => project.title === projectName);
    setActiveProject(match || null);
  }, [location])


  useEffect(() => {
    activeProjectRef.current = activeProject; // Keep ref in sync with state
  }, [activeProject]);

  useCustomEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current as HTMLDivElement;
    const sections = Array.from(container.children) as HTMLDivElement[];

    const handleScroll = () => {
      if (activeProjectRef.current) return; // ✅ always checks the latest activeProject state

      const scrollPosition = window.scrollY;
      let closest = sections[0];
      let closestDistance = Math.abs(closest.offsetTop - scrollPosition);

      for (const section of sections) {
        const distance = Math.abs(section.offsetTop - scrollPosition);
        if (distance < closestDistance) {
          closest = section;
          closestDistance = distance;
        }
      }

      if (lenis) {
        lenis.scrollTo(closest.offsetTop, { duration: 1 });
      }
    };

    let timeout: any;
    const onScrollStop = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 40);
    };

    window.addEventListener("scroll", onScrollStop);

    return () => {
      window.removeEventListener("scroll", onScrollStop);
    };
  }, [lenis]);


  // ===== SNAP TO SECTIO AND SET ACTIVE PROJECT =====
  const handleClick = (project: Project, section: HTMLDivElement | null ) => {
    if (!section) return;

    // open the project immediately if there is no scroll
    if (Math.abs(window.scrollY - section.offsetTop) <= 5) {
      setActiveProject(project);
      navigate(`/projects/${project.title}`, {replace: false});
      return;
    }

    lenis?.scrollTo(section.offsetTop, { duration: 1});

    const checkIfScrolled = () => {
      const scrollY = window.scrollY;
      const tolerance = 5; // small margin to account for subpixel differences

      if (Math.abs(scrollY - section.offsetTop) <= tolerance) {
        setActiveProject(project);
        navigate(`/projects/${project.title}`, {replace: false});

        lenis?.off('scroll', checkIfScrolled);
      }
    }

    lenis?.on("scroll", checkIfScrolled);
  }


  return (
    <div ref={containerRef} className="w-full h-full">
      {
        projects.map((project, i) => {
          if (i !== 0) return null;
          return <div key={i}>
            {/* <ProjectGrid 
              project={project} 
              index={i} 
              handleClick={(sectionRef) => handleClick(project, sectionRef)}
              /> */}
          </div>
        })
      }
    </div>
  )
}

export default Projects;