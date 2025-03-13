import { useState } from "react";
import useCustomEffect from "./useCustomEffect";
import { Project, useProjectContext } from "../contexts/ProjectsContext";

const useGetProject = (title: string) => {
  const [data, setData] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { projects } = useProjectContext();

  useCustomEffect(() => {
    if (title) {
      console.log("title is working: ", title );
    }

    if (!title.trim()) {
      setError("Invalid Project Title");
      console.log("iya nwam")
      throw new Error("Invalid project title")
    }

    if (!projects || projects.length === 0) {
      setError("Projects data is not available yet");
      return;
    }

    const matchedProject = projects.find(
      (item) => item.title.toLowerCase() === title.toLowerCase()
    );

    if (!matchedProject) {
      setError("Can't find matching project");
      return;
    }

    setError(null);
    setData(matchedProject);
  }, [title, projects]);

  return { data, error };
};

export default useGetProject;