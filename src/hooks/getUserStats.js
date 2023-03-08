import { db, auth } from "../firebase";
import { doc, collection, getDoc } from "firebase/firestore";

export async function getUserStats() {
  const uid = auth.currentUser.uid;

  const activeUsersColRef = collection(db, "activeUsers");
  const activeUserDocRef = doc(activeUsersColRef, uid);

  const userStatsSnapshot = await getDoc(activeUserDocRef);

  if (userStatsSnapshot.exists()) {
    return userStatsSnapshot.data();
  } else {
    return {};
  }
}
