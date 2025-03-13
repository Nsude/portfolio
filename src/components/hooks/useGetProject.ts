import { useState } from "react"
import useCustomEffect from "./useCustomEffect";
import { Project, useProjectContext } from "../contexts/ProjectsContext";


const useGetProject = (title: string) => {
  const [data, setData] = useState<Project>();
  const {projects} = useProjectContext();

  useCustomEffect(() => {
    if (!title.trim()) throw new Error("Invalid Project Title");

    const matchedProject = projects.find((item) => item.title.toLowerCase() === title.toLowerCase());

    if (!matchedProject) throw new Error("Can't find matching project");
    setData(matchedProject);

  }, [title])

  return { data };
}

export default useGetProject;