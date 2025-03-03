import { useRef } from "react";
import { Project } from "../contexts/ProjectsContext";
import useCustomEffect from "../hooks/useCustomEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevice } from "../hooks/useDevice";


interface Props {
  selectedProject: Project
}

const ProjectLayout = ({selectedProject: project}: Props) => {
  const mainImageRef = useRef(null);
  const device = useDevice();

  useCustomEffect(() => {
    if (device.width < 1200) {
      return ScrollTrigger.killAll();
    }
    if (!mainImageRef.current) return;
    const mainImage = mainImageRef.current as HTMLImageElement;
    const parent = mainImage.parentElement;

    gsap.killTweensOf(mainImage);

    gsap.to(mainImage, {
      yPercent: 25,
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
  }, [device.width])

  return (
    <div className="min-h-screen h-full mt-[100px] xl:mt-0">
      <div className="xl:h-[150vh] md:h-[55vh] h-[45vh] w-full overflow-hidden">
        <img ref={mainImageRef} className="w-full h-[100%] xl:h-[130%] object-cover object-right" 
        src={project.media.image1} alt="" />
      </div>

      {/* OVERVIEW */}
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
      </div>
    </div>
  )
}

export default ProjectLayout;