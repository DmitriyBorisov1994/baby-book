import { apiSlice } from './../api/apiSlice';
import { firebaseDeleteNote, firebaseGetNotes, firebaseAddNote, firebaseUpdateNote } from './firebaseNotes';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Note = {
   title: string,
   text: string,
   noteDateString: string,
   noteId: string,
   imageUrl?: string,
   imagePath?: string
}

export type NotesState = {
   notes: Note[] | null,
   notesIds: string[] | null
}

export const notesApiSlice = apiSlice.injectEndpoints({
   endpoints: (build) => ({
      getNotes: build.query({
         queryFn: async (userId: string) => {
            const { notes, notesIds } = await firebaseGetNotes(userId)
            return {
               data: {
                  notes,
                  notesIds
               } as NotesState
            }
         },
         providesTags: [{ type: 'Notes' }]
      }),
      deleteNote: build.mutation({
         queryFn: async ({ userId, noteId }) => {
            await firebaseDeleteNote(userId, noteId)
            return { data: 'deleted' }
         },
         invalidatesTags: (result, error, arg) => [{ type: 'Notes' }]
      }),
      addNote: build.mutation({
         queryFn: async ({ userId, newNote }) => {
            await firebaseAddNote(userId, newNote)
            return { data: "New note added" }
         },
         invalidatesTags: (result, error, arg) => [{ type: 'Notes' }]
      }),
      updateNote: build.mutation({
         queryFn: async ({ userId, updatedNote }) => {
            await firebaseUpdateNote(userId, updatedNote.noteId, updatedNote)
            return { data: "note has been updated" }
         },
         invalidatesTags: (result, error, arg) => [{ type: 'Notes' }]
      }),
   }),
})

export const { useGetNotesQuery, useDeleteNoteMutation, useAddNoteMutation, useUpdateNoteMutation } = notesApiSlice

const selectNotesResult = notesApiSlice.endpoints.getNotes.select('')

const selectAllNotes = createSelector(
   [selectNotesResult],
   postsResult => {
      if (postsResult.data)
         return postsResult.data.notes as Note[]
   }
)
export const selectNotesIds = createSelector(
   selectNotesResult,
   postsResult => {
      if (postsResult.data)
         return postsResult.data.notesIds
   }
)

export const selectNoteById = createSelector(
   [selectAllNotes, (state: RootState, noteId: string) => noteId],
   (notes, noteId) => {
      if (notes)
         return notes.find(note => note.noteId === noteId) as Note
   }
)

export const selectNoteBySearch = createSelector(
   [selectAllNotes, (state: RootState, searchByTitle, searchByDate) => ({ searchByTitle, searchByDate })],
   (notes, searchParams) => {
      const { searchByTitle, searchByDate } = searchParams
      if (notes && searchByTitle && !searchByDate) {
         return notes.filter(note => note.title.includes(searchByTitle)) as Note[]
      } else if (notes && searchByDate && !searchByTitle) {
         return notes.filter(note => note.noteDateString === searchByDate) as Note[]
      } else if (notes && searchByTitle && searchByDate) {
         return notes.filter(note => note.title.includes(searchByTitle) && note.noteDateString == searchByDate) as Note[]
      } else if (notes) return notes

   }
)



