import { createContext, useEffect, useState } from "react";

export const ProjectsContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  selectedProject: {},
  tasks: [],
  onSelectProject: () => {},
  onStartAddProject: () => {},
  onCancelAddProject: () => {},
  onAddProject: () => {},
  onDeleteProject: () => {},
  onAddTask: () => {},
  onDeleteTask: () => {},
});

const lsProjects = JSON.parse(localStorage.getItem("projects"));
const lsTasks = JSON.parse(localStorage.getItem("tasks"));

export default function ProjectsContextProvider({ children }) {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: lsProjects ? lsProjects : [],
    tasks: lsTasks ? lsTasks : [],
  });

  useEffect(() => {
    localStorage.setItem(
      "projects",
      JSON.stringify([...projectsState.projects])
    );
    localStorage.setItem(
      "tasks",
      JSON.stringify([...projectsState.tasks])
    );
  }, [projectsState.projects, projectsState.tasks]);

  //Function to select a project
  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  //Function to start creating a project
  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  //Function to cancel creating a project
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  //Function to add project
  function handleAddProject(newProject) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: newProject.id,
        projects: [newProject, ...prevState.projects],
      };
    });
  }

  //Function to delete project
  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  //Function to add task
  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const newTask = {
        id: Math.random(),
        text: text,
        projectId: prevState.selectedProjectId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  //Function to delete task
  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const projectsValue = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    selectedProject: selectedProject,
    tasks: projectsState.tasks,
    onSelectProject: handleSelectProject,
    onStartAddProject: handleStartAddProject,
    onCancelAddProject: handleCancelAddProject,
    onAddProject: handleAddProject,
    onDeleteProject: handleDeleteProject,
    onAddTask: handleAddTask,
    onDeleteTask: handleDeleteTask,
  };

  return (
    <ProjectsContext.Provider value={projectsValue}>
      {children}
    </ProjectsContext.Provider>
  );
}
