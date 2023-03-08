import { createContext, useEffect, useState } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { auth, db } from "../firebase";

const ProjectsContext = createContext();

export function ProjectsContextProvider({ children }) {
  const [projects, setProjects] = useState([]);

  const uid = auth.currentUser.uid;
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("creatorUid", "==", uid));

  useEffect(() => {
    const unsub = onSnapshot(q, (snap) => {
      const currentProjects = [];

      snap.docs.forEach((project) => {
        currentProjects.push({ ...project.data(), id: project.id });
      });

      setProjects(currentProjects);
    });
    return unsub;
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export default ProjectsContext;
