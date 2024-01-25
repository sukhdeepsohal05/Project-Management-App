import NewProject from "./components/Project/NewProject";
import NoProjectSelected from "./components/Project/NoProjectSelected";
import ProjectSidebar from "./components/Sidebar/ProjectSidebar";
import SelectedProject from "./components/Project/SelectedProject";
import { ProjectsContext } from "./store/projects-context";
import { useContext } from "react";

function App() {
  const { selectedProjectId } = useContext(ProjectsContext);

  let content = <SelectedProject />;

  if (selectedProjectId === null) {
    content = <NewProject />;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen pt-8 flex gap-8">
      <ProjectSidebar />
      {content}
    </main>
  );
}

export default App;
