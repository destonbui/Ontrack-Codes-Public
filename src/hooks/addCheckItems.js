import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function addCheckItems(projectId, taskData, stringOfItems) {
  const taskId = taskData.id;

  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);

  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  const checklistColRef = collection(taskDocRef, "checkitems");

  //   Process string of items
  const arrOfItems = stringOfItems.split(",");
  const newTotal =
    taskData.checklistTotal || taskData.checklistTotal === 0
      ? taskData.checklistTotal + arrOfItems.length
      : arrOfItems.length;

  try {
    await arrOfItems.map(async (item) => {
      // Add check item to task sub collection
      await addDoc(checklistColRef, {
        title: item,
        checked: false,
      });
      // Update total of check items to task

      await setDoc(taskDocRef, { checklistTotal: newTotal }, { merge: true });
    });
  } catch (error) {
    console.log(error);
  }
}
