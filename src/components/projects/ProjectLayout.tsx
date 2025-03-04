import { useRef } from "react";
import { Project } from "../contexts/ProjectsContext";
import useCustomEffect from "../hooks/useCustomEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LazyLoadVideo from "../utils/LazyLoadVideo";


interface Props {
  selectedProject: Project
}

const ProjectLayout = ({selectedProject: project}: Props) => {
  const mainImageRef = useRef(null);

  useCustomEffect(() => {
    if (!mainImageRef.current) return;
    const mainImage = mainImageRef.current as HTMLImageElement;
    const parent = mainImage.parentElement;

    gsap.killTweensOf(mainImage);

    gsap.to(mainImage, {
      yPercent: -25,
      scrollTrigger: {
        trigger: parent,
        start: "top bottom",
        end: "max",
        pinSpacing: false,
        scrub: true,
      }
    })

    return () => {
      gsap.killTweensOf(mainImage);
      ScrollTrigger.killAll();
    }
  })

  return (
    <div className="min-h-screen h-full mt-[100px] xl:mt-0 bg-myGray-100">
      <div className="xl:h-[150vh] md:h-[55vh] h-[45vh] w-full overflow-hidden">
        <img ref={mainImageRef} className="w-full h-[100%] xl:h-[130%] object-cover object-right" 
        src={project.media.image1} alt="" />
      </div>

      {/* OVERVIEW START */}
      <div className="h-screen w-full flex lg:justify-end md:justify-around leading-[1] px-[20px]">
        <div className="w-[95%] md:w-1/2 h-full justify-center flex flex-col gap-y-[50px]">
          <div>
            <p className="uppercase mb-[20px] opacity-40">Overview</p>
            <p className="text-[20px] xl:w-[75%] leading-[1.2]">{project.overview}</p>
          </div>

          <div className="grid grid-cols-4">
            <div>
              <p className="uppercase mb-[20px] opacity-40">Sectors</p>
              <div className="flex flex-col gap-y-[10px]">
              {
                project.sectors.map((item, i) => (
                  <p key={i} className="text-[20px]">{item}</p>
                ))
              }
              </div>
            </div>

            <div>
              <p className="uppercase mb-[20px] opacity-40">Timeline</p>
              <p className="text-[20px]">{project.timeline}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4">
            <div className="mb-[45px] md:mb-0">  
              <p className="uppercase mb-[20px] opacity-40">Credits</p>
              <p className="text-[20px]">Meshach Nsude</p>
            </div>

            <div className="flex gap-x-[5px]">
              {
                project.services.map((item, i) => (
                  <div key={i} className="px-[25px] max-h-fit py-2 bg-myblack bg-opacity-10 rounded-[2px]">
                    {item}
                  </div>
                ))
              }
            </div>
          </div>

        </div>
      </div> {/* ===== OVERVIEW END ===== */}

      {/* logo-image2 START */}
      <div className="flex flex-col md:flex-row gap-2.5 h-[70vh] lg:h-screen mb-2.5 px-5 ">
        <div className="bg-myGray-300 h-[75%] w-full lg:w-1/2 flex justify-center items-center">
          <img className="opacity-45" src={project.media.logoBlack}/>
        </div>
        <div className="w-full h-1/2 md:h-full lg:w-1/2">
          <img className="w-full h-full object-cover" src={project.media.image2} />
        </div>
      </div>

      {/* DESKTOP 1 PROTOTYPE */}
      <div className="bg-myGray-300 w-full h-[55vh] lg:h-[150vh] mb-2.5 flex justify-center items-center">
        <div className="w-[75%] rounded-[12px]">
          <LazyLoadVideo src={project.media.desktopVideo1} />
        </div>
      </div>

      {/* IMAGE 3 */}
      <div className=" h-[55vh] lg:h-[75vh] flex justify-end mb-2.5">
        <div className="md:w-1/2 w-full h-full bg-myGray-300 flex justify-center items-center">
          <img className="" src={project.media.image3}/>
        </div>
      </div>

      {/* DESKTOP 2 PROTOTYPE */}
      <div className="bg-myGray-300 w-full h-[55vh] lg:h-[150vh] mb-2.5 flex justify-center items-center">
        <div className="w-[75%] rounded-[12px]">
          <LazyLoadVideo src={project.media.desktopVideo2} />
        </div>
      </div>

      {/* IMAGE 4-5 */}
      <div className="flex flex-col md:flex-row gap-2.5 h-[55vh] lg:h-screen mb-2.5 px-2.5 md:px-2.5">
        <div className="w-full h-1/2 lg:w-1/2 md:h-[75%]">
          <img className="h-full w-full object-cover" src={project.media.image4}/>
        </div>
        <div className="w-full h-1/2 md:h-full lg:w-1/2 relative">
          <img className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" src={project.media.logoWhite} alt="" />
          <img className="w-full h-full object-cover" src={project.media.image5} />
        </div>
      </div>

      {/* DESKTOP 3 PROTOTYPE */}
      {
        project.media.desktopVideo3 &&
        <div className="bg-myGray-300 w-full h-[55vh] lg:h-[150vh] mb-2.5 flex justify-center items-center">
          <div className="w-[75%] rounded-[12px]">
            <LazyLoadVideo src={project.media.desktopVideo3} />
          </div>
        </div>
      }

      {/* DESKTOP 4 PROTOTYPE */}
      {
        project.media.desktopVideo4 &&
        <div className="bg-myGray-300 w-full lg:w-[80%] mx-auto h-[55vh] lg:h-[100vh] mb-2.5 flex justify-center items-center">
          <div className="w-[75%] rounded-[12px]">
            <LazyLoadVideo src={project.media.desktopVideo4} />
          </div>
        </div>
      }

      {/* DESKTOP 5 PROTOTYPE */}
      {
        project.media.desktopVideo5 &&
        <div className="bg-myGray-300 w-full h-[55vh] lg:h-[150vh] mb-2.5 flex justify-center items-center">
          <div className="w-[75%] rounded-[12px]">
            <LazyLoadVideo src={project.media.desktopVideo5} />
          </div>
        </div>
      }
    </div>
  )
}

export default ProjectLayout;