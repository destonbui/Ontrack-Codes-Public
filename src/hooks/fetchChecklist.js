import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

export function fetchChecklist(projectId, taskId) {
  const [checkitems, setCheckitems] = useState([]);

  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);

  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  const checklistColRef = collection(taskDocRef, "checkitems");

  useEffect(() => {
    const unsub = onSnapshot(checklistColRef, (snapshot) => {
      const checklist = [];

      snapshot.docs.forEach((checkitem) => {
        checklist.push({ ...checkitem.data(), id: checkitem.id });
      });

      setCheckitems(checklist);
    });

    return unsub;
  }, []);

  return { checkitems };
}
