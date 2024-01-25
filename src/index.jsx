import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ProjectsContextProvider from "./store/projects-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProjectsContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ProjectsContextProvider>
);
