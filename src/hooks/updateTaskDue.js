import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateUserStats } from "./updateUserStats";

export async function updateTaskDue(projectId, taskId, date, taskData) {
  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);
  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  try {
    updateUserStats("Task set due", {
      projectId: projectId,
      due: new Date(date).toString(),
      taskName: taskData.taskName,
      taskId: taskId,
      taskStatus: taskData.list,
    });
    await setDoc(
      taskDocRef,
      {
        due: new Date(date).toString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}
