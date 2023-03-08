import { db, auth } from "../firebase";
import { doc, collection, getDoc } from "firebase/firestore";

export async function getHighlightedDays(month) {
  const uid = auth.currentUser.uid;

  const activeUsersColRef = collection(db, "activeUsers");
  const activeUserDocRef = doc(activeUsersColRef, uid);

  const monthsColRef = collection(activeUserDocRef, "months");
  const monthDocRef = doc(monthsColRef, month);

  const snapshot = await getDoc(monthDocRef);

  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    return {};
  }
}
