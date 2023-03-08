import { db, auth } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  getDoc,
  Timestamp,
  deleteDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { getUserStats } from "./getUserStats";
import { useState } from "react";
import dayjs from "dayjs";

export async function updateUserStats(action, info) {
  const activeUsersColRef = collection(db, "activeUsers");

  const activeUserDocRef = doc(activeUsersColRef, auth.currentUser.uid);
  const activitiesColRef = collection(activeUserDocRef, "activities");

  const scheduledTasksColRef = collection(activeUserDocRef, "scheduledTasks");

  const monthsColRef = collection(activeUserDocRef, "months");
  const updateHighlightedDays = async () => {
    const monthDocRef = doc(monthsColRef, `${dayjs().month()}`);

    const snapshot = await getDoc(monthDocRef);

    if (snapshot.exists()) {
      await updateDoc(monthDocRef, {
        highlightedDays: arrayUnion(dayjs().date()),
      });
    } else {
      await setDoc(monthDocRef, { highlightedDays: [dayjs().date()] });
    }
  };

  const updateData = {};

  const updateStats = async () => {
    await setDoc(activeUserDocRef, updateData, { merge: true });
  };

  //    fetch active user current stats
  const result = getUserStats();

  result.then(async (data) => {
    switch (action) {
      case "Project create":
        updateHighlightedDays();
        const createNewTotal = !data.projectsTotal ? 1 : data.projectsTotal + 1;
        updateData.projectsTotal = createNewTotal;

        // update stats
        updateStats();

        // add new activity

        await addDoc(activitiesColRef, {
          desc: `You created a ${info.projectPriority.toLowerCase()} priority project: ${
            info.projectName
          }.`,
          type: "Project",
          month: dayjs().month(),
          date: dayjs().date(),
          hour: dayjs().hour(),
          minute: dayjs().minute(),
          timestamp: serverTimestamp(),
        });
        break;

      case "Project delete":
        updateHighlightedDays();
        const deleteNewTotal = data.projectsTotal - 1;
        updateData.projectsTotal = deleteNewTotal;
        const newTasksTotal =
          data.tasksTotal -
          (info.projectTasksTotal === undefined ? 0 : info.projectTasksTotal);
        updateData.tasksTotal = newTasksTotal;
        updateStats();
        await addDoc(activitiesColRef, {
          desc: `You deleted the ${info.projectName} project.`,
          type: "Project",
          month: dayjs().month(),
          date: dayjs().date(),
          hour: dayjs().hour(),
          minute: dayjs().minute(),
          timestamp: serverTimestamp(),
        });

        // query scheduled tasks that have projectId field same as the deleted project id
        if (
          (info.projectTasksTotal !== 0) &
          (info.projectTasksTotal !== undefined)
        ) {
          console.log(
            "searching for scheduled tasks from deleted project to delete"
          );
          const q = query(
            scheduledTasksColRef,
            where("projectId", "==", info.projectId)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (docSnap) => {
            const docRef = doc(scheduledTasksColRef, docSnap.id);
            await deleteDoc(docRef);
          });
        }

        break;

      //
      // For tasks
      //
      case "Task create":
        updateHighlightedDays();
        const createTasksTotal = !data.tasksTotal ? 1 : data.tasksTotal + 1;
        updateData.tasksTotal = createTasksTotal;
        updateStats();
        await addDoc(activitiesColRef, {
          desc: `New ${info.taskStatus.toLowerCase()} task created in ${
            info.projectName
          } project.`,
          projectId: info.projectId,
          type: "Task",
          month: dayjs().month(),
          date: dayjs().date(),
          hour: dayjs().hour(),
          minute: dayjs().minute(),
          timestamp: serverTimestamp(),
        });
        break;

      case "Task delete":
        updateHighlightedDays();
        const deleteTasksTotal = data.tasksTotal - 1;
        updateData.tasksTotal = deleteTasksTotal;
        updateStats();
        await addDoc(activitiesColRef, {
          desc: `You deleted ${
            info.taskStatus === "In Progress" ? "an" : "a"
          } ${info.taskStatus.toLowerCase()} task "${info.taskName}" in ${
            info.projectName
          } project.`,
          projectId: info.projectId,
          type: "Task",
          month: dayjs().month(),
          date: dayjs().date(),
          hour: dayjs().hour(),
          minute: dayjs().minute(),
          timestamp: serverTimestamp(),
        });

        // if task is scheduled then delete it from scheduledTasks collection
        if (info.due) {
          const docRef = doc(scheduledTasksColRef, info.taskId);
          await deleteDoc(docRef);
        }

        break;

      case "Task set due":
        updateHighlightedDays();
        // Add activity
        const dueDate = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(info.due));

        await addDoc(activitiesColRef, {
          desc: `${info.taskName}'s due date has been set to ${dueDate}.`,
          projectId: info.projectId,
          type: "Task",
          month: dayjs().month(),
          date: dayjs().date(),
          hour: dayjs().hour(),
          minute: dayjs().minute(),
          timestamp: serverTimestamp(),
        });

        const scheduledTaskDocRef_set = doc(scheduledTasksColRef, info.taskId);
        const isDone = Boolean(info.taskStatus === "Done");
        await setDoc(
          scheduledTaskDocRef_set,
          {
            taskName: info.taskName,
            projectId: info.projectId,
            due: dayjs(info.due).format("DD/MM/YYYY"),
            isDone: isDone,
            dueTimestamp: Timestamp.fromDate(
              new Date(new Date(info.due).setHours(23, 59, 59, 999))
            ),
          },
          { merge: true }
        );

        break;

      case "Task delete due":
        updateHighlightedDays();
        await addDoc(activitiesColRef, {
          desc: `${info.taskName}'s due date has been removed.`,
          projectId: info.projectId,
          type: "Task",
          month: dayjs().month(),
          date: dayjs().date(),
          hour: dayjs().hour(),
          minute: dayjs().minute(),
          timestamp: serverTimestamp(),
        });

        const scheduledTaskDocRef_delete = doc(
          scheduledTasksColRef,
          info.taskId
        );
        await deleteDoc(scheduledTaskDocRef_delete);

        break;

      case "Task done late":
        updateHighlightedDays();
        const lateTotal = !data.lateTotal ? 1 : data.tasksTotal + 1;
        updateData.lateTotal = lateTotal;
        updateStats();
        break;

      case "Task done":
        const scheduledTaskDocRef_done = doc(scheduledTasksColRef, info.taskId);
        await setDoc(
          scheduledTaskDocRef_done,
          {
            isDone: true,
          },
          { merge: true }
        );
        break;

      default:
        break;
    }
  });
}
