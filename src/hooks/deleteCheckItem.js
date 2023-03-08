import { collection, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteCheckItem(
  projectId,
  taskId,
  checkitemId,
  taskData,
  checkitemData
) {
  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);

  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  const checklistColRef = collection(taskDocRef, "checkitems");
  const checkitemDocRef = doc(checklistColRef, checkitemId);

  try {
    await deleteDoc(checkitemDocRef);

    const updatedData = {};
    updatedData.checklistTotal = taskData.checklistTotal - 1;
    if (checkitemData.checked) {
      updatedData.checklistChecked = taskData.checklistChecked - 1;
    }

    // Update total of check items to task
    await setDoc(taskDocRef, updatedData, { merge: true });
  } catch (error) {
    console.log(error);
  }
}
