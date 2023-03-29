import React, { createContext, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { updateUserStats } from "../hooks/updateUserStats";

const CreateProjectContext = createContext();

export function CreateProjectProvider({ children }) {
  const [isOpen, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDone, setDone] = useState(false);
  const chipLabel = `${name.toLowerCase().split(" ").join("-")}`;

  const uid = auth.currentUser.uid;
  const navigate = useNavigate();
  const projectsRef = collection(db, "projects");

  const isDuplicate = (val, projectNames) => {
    projectNames.map((name) => {
      if (val.toLowerCase() === name.toLowerCase()) {
        setError(true);
        setErrorMsg("Project name already exist!");
        return;
      }
    });
  };

  const isInputEmpty = (val, errMsg) => {
    if (val === "") {
      setError(true);
      setErrorMsg(errMsg);
    } else {
      setError(false);
      setErrorMsg(null);
    }
  };

  const updateName = (val, projectNames) => {
    setName(val);
    isInputEmpty(val, "Project name must not be empty!");
    isDuplicate(val, projectNames);
  };
  const updateDesc = (val) => {
    setDesc(val);
    isInputEmpty(val, "Project description must not be empty!");
  };
  const updatePriority = (val) => {
    setPriority(val);
  };
  const close = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      updateUserStats("Project create", {
        projectName: name,
        projectPriority: priority,
      });
      const priorityLevel =
        priority === "Normal" ? 0 : priority === "Moderate" ? 1 : 2;
      await addDoc(projectsRef, {
        name: name,
        desc: desc,
        priority: priority,
        priorityLevel: priorityLevel,
        status: "Pending",
        createdAt: serverTimestamp(),
        creatorUid: uid,
      });
      setLoading(false);
      setDone(true);
      setTimeout(() => {
        close();
        setTimeout(() => {
          navigate("/Projects");
        }, 250);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CreateProjectContext.Provider
      value={{
        chipLabel,
        loading,
        isDone,
        isOpen,
        name,
        desc,
        priority,
        errorMsg,
        isError,
        updateName,
        updateDesc,
        updatePriority,
        close,
        handleSubmit,
      }}
    >
      {children}
    </CreateProjectContext.Provider>
  );
}

export default CreateProjectContext;
