import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { updateProject } from "./updateProject";
import { db, auth } from "../firebase";
import { updateUserStats } from "./updateUserStats";

export async function createTask(projectId, list, projectData) {
  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);
  const tasksColRef = collection(projectRef, "tasks");

  const uid = auth.currentUser.uid;

  try {
    updateUserStats("Task create", {
      projectId: projectId,
      projectName: projectData.name,
      taskStatus: list,
    });
    if (list === "Done") {
      await addDoc(tasksColRef, {
        creatorId: uid,
        list: list,
        taskName: "New task",
        completedAt: new Date().toString(),
        createdAt: new Date().toString(),
        latestEdit: serverTimestamp(),
      });
    } else {
      await addDoc(tasksColRef, {
        creatorId: uid,
        list: list,
        taskName: "New task",
        createdAt: new Date().toString(),
        latestEdit: serverTimestamp(),
      });
    }

    const newTotal =
      projectData.total || projectData.total === 0 ? projectData.total + 1 : 1;

    if (list === "Done") {
      if (!projectData.completed || projectData.completed === 0) {
        const newCompleted = 1;
        await updateProject(projectId, {
          total: newTotal,
          completed: newCompleted,
        });
      } else {
        const newCompleted = projectData.completed + 1;
        await updateProject(projectId, {
          total: newTotal,
          completed: newCompleted,
        });
      }
    } else {
      await updateProject(projectId, { total: newTotal });
    }
  } catch (error) {
    console.log(error);
  }
}
