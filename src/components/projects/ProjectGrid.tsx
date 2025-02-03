import { Project, useProjectContext } from "../contexts/ProjectsContext";
import useCustomEffect from "../hooks/useCustomEffect";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  project: Project;
  index: number;
  handleClick: (sectionRef: HTMLDivElement | null) => void;
}

const ProjectFlex = ({ project, index, handleClick }: Props) => {
  const { activeProject } = useProjectContext();
  const descRef = useRef(null);
  const mediaCon = useRef(null);
  const containerRef = useRef(null);
  const thumbnailRef = useRef(null);
  const otherMedia = useRef(null);

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
      scrub: 0.5,
    });

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
    };
  }, [activeProject]);

  const isActiveProject = () => {
    return activeProject?.index === project.index;
  };

  // ===== OPEN ACTIVE PROJECT =====
  useCustomEffect(() => {
    const duration = 0.8;
    const ease = "expo.inOut";

    const tl = gsap.timeline();
    tl.to(thumbnailRef.current, {
      width: isActiveProject() ? "75%" : "100%",
      marginBottom: isActiveProject() ? "20px" : "0",
      duration,
      ease,
    });

    tl.to(
      mediaCon.current,
      {
        padding: isActiveProject() ? "150px 0 150px 0" : "",
        duration,
        ease,
      },
      "<"
    );

    tl.to(otherMedia.current, {
      display: isActiveProject() ? "flex" : "hidden",
      duration,
      ease,
    });
  }, [activeProject]);

  return (
    <div
      ref={containerRef}
      onClick={() => handleClick(containerRef.current)}
      className={`flex flex-col w-full cursor-pointer ${isActiveProject() ? "h-fit" : "h-[100dvh]"}`}
    >
      <div className={`flex w-full h-full ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
        {/* ===== MEDIA CONTAINER ===== */}
        <div
          ref={mediaCon}
          className={`w-1/2 flex flex-col items-center overflow-hidden ${isActiveProject() ? "hide-scroll " : "min-h-[100vh]"}`}
        >
          {/* Thumbnail image */}
          <img
            ref={thumbnailRef}
            className={`object-cover aspect-square ${isActiveProject() ? "" : "min-h-full"}`}
            src={project.thumbnail}
            alt="featured project thumbnail image"
          />

          {/* Project images */}
          <div ref={otherMedia} className="w-[75%] h-full flex flex-col gap-y-5">
            {project.media.map((image, i) => (
              <div key={i} className="w-full aspect-square overflow-hidden">
                <img className="w-full h-full object-cover" src={image} alt={`Project image ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* ===== PROJECT TITLE / DESCRIPTION ===== */}
        <div ref={descRef} className="w-1/2 h-[100vh] flex flex-col justify-end pb-5 px-5">
          <div className="flex justify-between items-end">
            <h3 className="text-[30px] lg:text-[40px]">{project.title}</h3>
            <p className="text-base font-serif sm:text-[20px] lg:text-[25px]">{project.index}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFlex;
