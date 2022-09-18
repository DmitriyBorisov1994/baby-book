import { firebaseGetTodos } from './firebaseTodos';
import { apiSlice } from './../api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Todo = {
   completed: boolean,
   text: string,
   todoId: string,
   noteId: string
}

export type TodosState = {
   todos: Todo[] | null,
   todosIds: string[] | null
}

export const notesApiSlice = apiSlice.injectEndpoints({
   endpoints: (build) => ({
      getTodos: build.query({
         queryFn: async (userId: string) => {
            console.log('start loading...')
            const { todos, todosIds } = await firebaseGetTodos(userId)
            return {
               data: {
                  todos,
                  todosIds
               } as TodosState
            }
         },
         providesTags: [{ type: 'Todos' }]
      })
   }),
})

export const { useGetTodosQuery } = notesApiSlice

const selectTodosResult = notesApiSlice.endpoints.getTodos.select('')

const selectAllTodos = createSelector(
   [selectTodosResult],
   postsResult => {
      if (postsResult.data)
         return postsResult.data.todos as Todo[]
   }
)
export const selectTodosIds = createSelector(
   selectTodosResult,
   postsResult => {
      if (postsResult.data)
         return postsResult.data.todosIds
   }
)

export const selectTodosByNoteId = createSelector(
   [selectAllTodos, (state: RootState, noteId: string) => noteId],
   (todos, noteId) => {
      if (todos)
         return todos.filter(todo => todo.noteId === noteId) as Todo[]
   }
)

/*export const selectNoteBySearch = createSelector(
   [selectAllNotes, (state: RootState, searchByTitle, searchByDate) => ({ searchByTitle, searchByDate })],
   (notes, searchParams) => {
      const { searchByTitle, searchByDate } = searchParams
      if (notes && searchByTitle && !searchByDate) {
         return notes.filter(note => note.title.includes(searchByTitle)) as Todo[]
      } else if (notes && searchByDate && !searchByTitle) {
         return notes.filter(note => note.noteDateString === searchByDate) as Todo[]
      } else if (notes && searchByTitle && searchByDate) {
         return notes.filter(note => note.title.includes(searchByTitle) && note.noteDateString == searchByDate) as Todo[]
      } else if (notes) return notes

   }
)*/



