import { db, auth } from "../firebase";
import {
  doc,
  collection,
  getDoc,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";

export async function getActivitiesCount(month, date) {
  const uid = auth.currentUser.uid;
  const result = {};

  const activeUsersColRef = collection(db, "activeUsers");
  const activeUserDocRef = doc(activeUsersColRef, uid);

  const activitiesColRef = collection(activeUserDocRef, "activities");

  const queryProject = query(
    activitiesColRef,
    where("month", "==", month),
    where("date", "==", date),
    where("type", "==", "Project")
  );

  const queryTask = query(
    activitiesColRef,
    where("month", "==", month),
    where("date", "==", date),
    where("type", "==", "Task")
  );

  const projectActivitiesCount = await getCountFromServer(queryProject);

  result.project = projectActivitiesCount.data().count;

  const taskActivitiesCount = await getCountFromServer(queryTask);

  result.task = taskActivitiesCount.data().count;

  return result;
}
