import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function updateTaskName(projectId, taskId, taskName) {
  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);
  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  try {
    await setDoc(
      taskDocRef,
      {
        taskName: taskName,
        latestEdit: serverTimestamp(),
        nameSet: true,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}
