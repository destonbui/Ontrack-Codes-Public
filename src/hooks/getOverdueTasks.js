import { db, auth } from "../firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import dayjs from "dayjs";

export async function getOverdueTasks() {
  const result = [];

  const uid = auth.currentUser.uid;

  const activeUsersColRef = collection(db, "activeUsers");
  const activeUserDocRef = doc(activeUsersColRef, uid);

  const scheduledTasksColRef = collection(activeUserDocRef, "scheduledTasks");

  const q = query(
    scheduledTasksColRef,
    where("dueTimestamp", "<", Timestamp.now()),
    where("isDone", "==", false),
    orderBy("dueTimestamp")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });

  return result;
}
