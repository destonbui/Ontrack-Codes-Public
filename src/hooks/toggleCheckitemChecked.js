import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function toggleCheckitemChecked(
  projectId,
  taskId,
  checkitemData,
  taskData
) {
  const checkitemId = checkitemData.id;

  // if (checkitemData.checked) {
  //     // uncheck > decrease task total checked by 1
  //     // return taskData.checklistCheck - 1
  // } else {
  //     // check > increase task total checked by 1
  //     // taskData have checklistChecked ? return checklistChecked + 1 : 1
  // }

  const newTotalChecked = checkitemData.checked
    ? taskData.checklistChecked - 1
    : taskData.checklistChecked
    ? taskData.checklistChecked + 1
    : 1;

  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);

  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  const checklistColRef = collection(taskDocRef, "checkitems");
  const checkitemDocRef = doc(checklistColRef, checkitemId);

  try {
    await setDoc(
      checkitemDocRef,
      {
        checked: !checkitemData.checked,
      },
      { merge: true }
    );
    // Update total of check items to task
    await setDoc(
      taskDocRef,
      { checklistChecked: newTotalChecked },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}
