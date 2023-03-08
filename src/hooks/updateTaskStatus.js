import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { updateProject } from "./updateProject";
import { updateUserStats } from "./updateUserStats";

export async function updateTaskStatus(
  projectId,
  taskId,
  listDestination,
  projectData,
  taskData
) {
  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);
  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  try {
    await setDoc(
      taskDocRef,
      {
        list: listDestination,
        completedAt: new Date().toString(),
      },
      { merge: true }
    );

    if (listDestination === "Done") {
      const current = new Date().setHours(0, 0, 0, 0);
      if (taskData.due) {
        const due = new Date(taskData.due).setHours(0, 0, 0, 0);
        if (due < current) {
          updateUserStats("Task done late");
        } else {
          updateUserStats("Task done", { taskId: taskId });
        }
      }
      const newCompleted = projectData.completed
        ? projectData.completed + 1
        : 1;
      await updateProject(projectId, {
        completed: newCompleted,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
