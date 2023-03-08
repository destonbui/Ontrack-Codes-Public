import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export function fetchProject(id) {
  const [projectData, setData] = useState({});

  const projectRef = doc(db, "projects", id);

  useEffect(() => {
    const unsub = onSnapshot(projectRef, (snapshot) => {
      setData(snapshot.data());
    });

    return unsub;
  }, []);

  return { projectData };
}
