import { useNavigate } from "react-router-dom";
import { Project, useProjectContext } from "../contexts/ProjectsContext";

interface Props {
  project: Project;
  index: number
}

const ProjectGrid = ({project}: Props) => {
  const navigate = useNavigate();
  const {projects, setActiveProject} = useProjectContext();
  
  const initSelectedProject = () => {
    const title = project.title;

    const matchedProject = projects.find((item) => item.title.toLowerCase() === title.toLowerCase());

    if (!matchedProject) throw new Error("Invalid Selected Project");
    localStorage.setItem("activeProject", JSON.stringify(matchedProject));
    setActiveProject(matchedProject);
  }


  const handleClick = () => {
    initSelectedProject();

    if (project.title.toLowerCase().includes("ui layouts")) {
      return navigate("/projects/ui-layouts");
    }

    navigate(`/projects/${project.title}`);
  }

  return (
    <div
      onClick={handleClick} 
      className={`w-full h-full flex flex-col gap-y-[15px]`}>
      <div className="w-full h-[85%] overflow-hidden">
        <img className="w-full h-full object-cover hover:scale-[1.15] transition-all duration-[600ms]" src={`${project.thumbnail}`} />
      </div>

      <div>
        <p className="text-[12px] opacity-40">{project.category}</p>
        <h4 className="font-appleG text-[25px] leading-[1]">{project.title}</h4>
      </div>

    </div>
  )
}

export default ProjectGrid;