import { db } from "../firebase";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

export async function updateProject(projectId, editData) {
  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);

  const runUpdate = async () => {
    try {
      await setDoc(
        projectRef,
        { ...editData, lastestEdit: serverTimestamp() },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  return runUpdate();
}
