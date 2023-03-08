import { db, auth } from "../firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

export async function getActivitiesByType(month, date, type) {
  const uid = auth.currentUser.uid;

  const result = [];

  const activeUsersColRef = collection(db, "activeUsers");
  const activeUserDocRef = doc(activeUsersColRef, uid);

  const activitiesColRef = collection(activeUserDocRef, "activities");

  const q = query(
    activitiesColRef,
    where("month", "==", month),
    where("date", "==", date),
    where("type", "==", type),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    result.push(doc.data());
  });

  return result;
}
