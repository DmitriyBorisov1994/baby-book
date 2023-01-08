import { Note } from './notesApiSlice';
import { db } from './../../firebase'
import { set, ref, remove, update, get } from "firebase/database";

export const firebaseGetNotes = async (userId: string) => {
   const data = await get(ref(db, `/notes/${userId}`))
      .then((snapshot) => Object.values(snapshot.val()))
   return {
      notes: Object.values(data[0] as any),
      notesIds: Object.keys(data[0] as any)
   }
}

export const firebaseDeleteNote = (userId: string, noteId: string) => {
   return remove(ref(db, `/notes/${userId}/${noteId}`))
}

export const firebaseUpdateNote = (userId: string, noteId: string, note: Note) => {
   return update(ref(db, `/notes/${userId}/${noteId}`), { ...note })
}

export const firebaseAddNote = (userId: string, newNote: Note) => {
   return set(ref(db, `/notes/${userId}/${newNote.noteId}`), {
      ...newNote
   });
}