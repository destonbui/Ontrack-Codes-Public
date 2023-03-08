import { collection, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteAttachment(
  projectId,
  taskId,
  attachmentId,
  taskData
) {
  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);

  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  const attachmentsColRef = collection(taskDocRef, "attachments");
  const attachmentDocRef = doc(attachmentsColRef, attachmentId);

  try {
    await deleteDoc(attachmentDocRef);

    const updatedData = {};
    updatedData.attachmentsTotal = taskData.attachmentsTotal - 1;

    // Update total of check items to task
    await setDoc(taskDocRef, updatedData, { merge: true });
  } catch (error) {
    console.log(error);
  }
}
