import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateProject } from "./updateProject";
import { updateUserStats } from "./updateUserStats";

export async function deleteTask(
  projectId,
  taskId,
  list,
  projectData,
  taskData
) {
  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);
  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  try {
    updateUserStats("Task delete", {
      projectId: projectId,
      taskStatus: taskData.list,
      taskName: taskData.taskName,
      projectName: projectData.name,
      due: taskData.due,
      taskId: taskData.id,
    });
    await deleteDoc(taskDocRef);
    const newTotal = projectData.total - 1;
    if (list === "Done") {
      const newCompleted = projectData.completed - 1;
      await updateProject(projectId, {
        total: newTotal,
        completed: newCompleted,
      });
    } else {
      await updateProject(projectId, { total: newTotal });
    }
  } catch (error) {
    console.log(error);
  }
}
