import { db, auth } from "../firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import dayjs from "dayjs";

export async function getTasksByDate(date) {
  const result = [];

  const uid = auth.currentUser.uid;

  const activeUsersColRef = collection(db, "activeUsers");
  const activeUserDocRef = doc(activeUsersColRef, uid);

  const scheduledTasksColRef = collection(activeUserDocRef, "scheduledTasks");

  const q = query(
    scheduledTasksColRef,
    where("due", "==", date),
    where("isDone", "==", false)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });

  return result;
}
