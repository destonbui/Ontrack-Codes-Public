import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export function fetchTasks(projectId) {
  const [todo, setTodo] = useState(null);
  const [progress, setProgress] = useState(null);
  const [done, setDone] = useState(null);

  const tasksColRef = collection(db, "projects", projectId, "tasks");

  const queryTodoTasks = query(
    tasksColRef,
    where("list", "==", "To Do"),
    orderBy("latestEdit", "desc")
  );
  const queryProgressTasks = query(
    tasksColRef,
    where("list", "==", "In Progress"),
    orderBy("latestEdit", "desc")
  );
  const queryDoneTasks = query(
    tasksColRef,
    where("list", "==", "Done"),
    orderBy("latestEdit", "desc")
  );

  useEffect(() => {
    const unsubTodo = onSnapshot(queryTodoTasks, (snapshot) => {
      const todoTasks = [];

      snapshot.docs.forEach((task) => {
        todoTasks.push({ ...task.data(), id: task.id });
      });

      setTodo(todoTasks);
    });

    const unsubProgress = onSnapshot(queryProgressTasks, (snapshot) => {
      const progressTasks = [];

      snapshot.docs.forEach((task) => {
        progressTasks.push({ ...task.data(), id: task.id });
      });

      setProgress(progressTasks);
    });

    const unsubDone = onSnapshot(queryDoneTasks, (snapshot) => {
      const doneTasks = [];

      snapshot.docs.forEach((task) => {
        doneTasks.push({ ...task.data(), id: task.id });
      });

      setDone(doneTasks);
    });

    return () => {
      unsubTodo();
      unsubProgress();
      unsubDone();
    };
  }, []);

  return { todo, progress, done };
}
