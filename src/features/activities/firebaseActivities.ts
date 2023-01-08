//import { Note } from './notesApiSlice';
import { db } from './../../firebase'
import { set, ref, remove, update, get } from "firebase/database";
import { Activity } from './activitiesApiSlice';

export const firebaseGetActivities = async (userId: string) => {
   const data = await get(ref(db, `/activities/${userId}`))
      .then((snapshot) => Object.values(snapshot.val()))
   return {
      activities: Object.values(data[0] as any),
      activitiesIds: Object.keys(data[0] as any)
   }
}

export const firebaseDeleteActivity = (userId: string, activityId: string) => {
   return remove(ref(db, `/activities/${userId}/${activityId}`))
}

export const firebaseUpdateActivity = (userId: string, id: string, activity: Activity) => {
   return update(ref(db, `/activities/${userId}/${id}`), { ...activity })
}

export const firebaseAddActivity = (userId: string, newActivity: Activity) => {
   return set(ref(db, `/activities/${userId}/${newActivity.id}`), {
      ...newActivity
   });
}