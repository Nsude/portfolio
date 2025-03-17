import { useEffect, useState } from "react"
import { Project, useProjectContext } from "../contexts/ProjectsContext";


const useActiveProject = () => {
  const [project, setProject] = useState<Project>();
  const {activeProject} = useProjectContext();
  
  useEffect(() => {
    const prevProject = localStorage.getItem("activeProject");
    if (prevProject) {
      setProject(JSON.parse(prevProject));
    } else {
      setProject(activeProject as Project);
    }
  }, [])

  return { project };
}

export default useActiveProject;