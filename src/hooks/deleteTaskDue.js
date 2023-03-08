import { collection, doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import { updateUserStats } from "./updateUserStats";

export async function deleteTaskDue(projectId, taskId, taskData) {
  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);
  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  try {
    updateUserStats("Task delete due", {
      taskName: taskData.taskName,
      projectId: projectId,
      taskId: taskId,
    });
    await updateDoc(taskDocRef, {
      due: deleteField(),
    });
  } catch (error) {
    console.log(error);
  }
}
