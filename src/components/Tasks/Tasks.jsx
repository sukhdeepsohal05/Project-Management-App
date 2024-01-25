import React, { useContext } from "react";
import NewTask from "./NewTask";
import { ProjectsContext } from "../../store/projects-context";

export default function Tasks() {
  const { tasks, onAddTask, onDeleteTask, selectedProjectId } = useContext(ProjectsContext)

  const selectedProjectTasks = tasks.filter(task=>{
    return task.projectId === selectedProjectId;
  })

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Taks</h2>
      <NewTask onAdd={onAddTask} />
      {selectedProjectTasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {selectedProjectTasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {selectedProjectTasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-stone-700 hover:text-red-500"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
