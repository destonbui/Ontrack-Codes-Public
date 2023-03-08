import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export function fetchActivities() {
  const [activities, setActivities] = useState([]);

  const activeUsersColRef = collection(db, "activeUsers");
  const activeUserDocRef = doc(activeUsersColRef, auth.currentUser.uid);

  const activitiesColRef = collection(activeUserDocRef, "activities");

  const q = query(activitiesColRef, orderBy("timestamp"), limit(5));

  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      const activitiesList = [];
      console.log("fetchActivities just fetched a new snapshot");

      snapshot.docs.forEach((activity) => {
        activitiesList.push({ ...activity.data(), id: activity.id });
      });

      setActivities(activitiesList);
    });

    return unsub;
  }, []);

  return { activities };
}
