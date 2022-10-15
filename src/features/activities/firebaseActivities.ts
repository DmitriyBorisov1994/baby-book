//import { Note } from './notesApiSlice';
import { db } from './../../firebase'
import { set, ref, remove, update, get } from "firebase/database";

export const firebaseGetActivities = async (userId: string) => {
   const data = await get(ref(db, `/activities/${userId}`))
      .then((snapshot) => Object.values(snapshot.val()))
   console.log(data[0] as any)
   return {
      activities: Object.values(data[0] as any),
      activitiesIds: Object.keys(data[0] as any)
   }
}

export const firebaseDeleteActivity = (userId: string, activityId: string) => {
   return remove(ref(db, `/activities/${userId}/${activityId}`))
}

/*export const firebaseUpdateNote = (userId: string, noteId: string, note: Note) => {
   return update(ref(db, `/${userId}/notes/${noteId}`), { ...note })
}

export const firebaseAddNote = (userId: string, note: Note) => {
   return set(ref(db, `/notes/${userId}/${note.noteId}`), {
      ...note
   });
}*/