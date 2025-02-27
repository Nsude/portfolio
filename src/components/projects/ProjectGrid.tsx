import { useNavigate } from "react-router-dom";
import { Project } from "../contexts/ProjectsContext";

interface Props {
  project: Project;
  index: number
}

const ProjectGrid = ({project}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project.title}`);
  }

  return (
    <div
      onClick={handleClick} 
      className={`w-full h-full flex flex-col gap-y-[15px]`}>
      <div className="w-full h-[85%]">
        <img className="w-full h-full object-cover" src={`${project.thumbnail}`} />
      </div>

      <div>
        <p className="text-[12px] opacity-40">{project.category}</p>
        <h4 className="font-appleG text-[25px] leading-[1]">{project.title}</h4>
      </div>

    </div>
  )
}

export default ProjectGrid;