import { useNavigate } from "react-router-dom";
import { Project } from "../contexts/ProjectsContext";

interface Props {
  project: Project;
  index: number
}

const ProjectGrid = ({project}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (project.title.toLowerCase().includes("ui layouts")) {
      return navigate("/projects/ui-layouts");
    }

    console.log(project.title)
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