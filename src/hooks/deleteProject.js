import { db } from "../firebase";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { updateUserStats } from "./updateUserStats";

export async function deleteProject(projectId, projectName, projectTasksTotal) {
  const projectsRef = collection(db, "projects");
  const deleteTargetDocRef = doc(projectsRef, projectId);

  try {
    updateUserStats("Project delete", {
      projectName: projectName,
      projectId: projectId,
      projectTasksTotal: projectTasksTotal,
    });
    await deleteDoc(deleteTargetDocRef);
  } catch (error) {
    console.log(error);
  }
}
