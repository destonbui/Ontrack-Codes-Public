import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

export function fetchAttachments(projectId, taskId) {
  const [attachments, setAttachments] = useState([]);

  const projectsColRef = collection(db, "projects");
  const projectRef = doc(projectsColRef, projectId);

  const tasksColRef = collection(projectRef, "tasks");
  const taskDocRef = doc(tasksColRef, taskId);

  const attachmentsColRef = collection(taskDocRef, "attachments");

  useEffect(() => {
    const unsub = onSnapshot(attachmentsColRef, (snapshot) => {
      const attachmentsList = [];

      snapshot.docs.forEach((attachment) => {
        attachmentsList.push({ ...attachment.data(), id: attachment.id });
      });

      setAttachments(attachmentsList);
    });

    return unsub;
  }, []);

  return { attachments };
}
