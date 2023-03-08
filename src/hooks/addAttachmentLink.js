import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function addAttachmentLink(projectId, taskData, desc, href) {
  const taskId = taskData.id;

  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);

  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  const attachmentsColRef = collection(taskDocRef, "attachments");

  try {
    await addDoc(attachmentsColRef, {
      desc: desc,
      href: href,
      createdAt: new Date().toString(),
    });

    const newTotal = taskData.attachmentsTotal
      ? taskData.attachmentsTotal + 1
      : 1;
    // Update total of check items to task
    await setDoc(taskDocRef, { attachmentsTotal: newTotal }, { merge: true });
  } catch (error) {
    console.log(error);
  }
}
