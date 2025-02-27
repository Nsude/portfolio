import { useProjectContext } from "../contexts/ProjectsContext";
import { useDevice } from "../hooks/useDevice";
import ProjectGrid from "./ProjectGrid";

const Projects = () => {
  const {projects} = useProjectContext();
  const device = useDevice();

  return (
    <div className="min-h-screen h-full w-full pt-[150px] flex flex-col items-center gap-y-[150px] px-[20px]">
      <h2 className="font-appleG text-[25px] leading-[1] w-[80%] sm:w-[65%] lg:text-[40px] 2xl:w-[48%] text-center">
        Here’s where the <span className="font-serif">magic</span> happens. From e-commerce brilliance to immersive <span className="font-serif">digital experiences</span>.
      </h2>

      <div className={`
        flex flex-wrap w-full gap-x-[5px] 
        ${device.width < 1024 ? 'justify-start' : 'justify-center'}
        `}>
        {
          projects.map((project, i) => (
            <div key={project.title} className={`${(i + 1) === 3 && device.width > 1023 ? 'w-[50%] h-[100vh]' : device.width < 1024 ? 'w-[49%] h-[60vh]' : 'w-[24%] h-[60vh]'}`}>
              <ProjectGrid project={project} index={i} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Projects;