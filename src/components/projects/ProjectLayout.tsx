import { Project } from "../contexts/ProjectsContext";


interface Props {
  selectedProject: Project
}

const ProjectLayout = ({selectedProject: project}: Props) => {
  return (
    <div className="min-h-screen h-full">
      <div className="h-[150vh] w-full">
        <img className="w-full h-full object-cover" 
        src={project.thumbnail} alt="" />
      </div>
    </div>
  )
}

export default ProjectLayout;