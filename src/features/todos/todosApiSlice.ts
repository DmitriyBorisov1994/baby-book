import { firebaseDeleteTodo, firebaseGetTodos, firebaseAddTodo, firebaseUpdateTodo } from './firebaseTodos';
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
            const { todos, todosIds } = await firebaseGetTodos(userId)
            return {
               data: {
                  todos,
                  todosIds
               } as TodosState
            }
         },
         providesTags: [{ type: 'Todos' }]
      }),
      deleteTodo: build.mutation({
         queryFn: async ({ userId, todoId }) => {
            await firebaseDeleteTodo(userId, todoId)
            return { data: 'deleted' }
         },
         invalidatesTags: (result, error, arg) => [{ type: 'Todos', id: arg.todoId }]
      }),
      addTodo: build.mutation({
         queryFn: async ({ userId, newTodo }) => {
            await firebaseAddTodo(userId, newTodo)
            return { data: 'new todo added' }
         },
         invalidatesTags: (result, error, arg) => [{ type: 'Todos' }]
      }),
      updateTodo: build.mutation({
         queryFn: async ({ userId, updatedTodo }) => {
            await firebaseUpdateTodo(userId, updatedTodo.todoId, updatedTodo)
            return { data: 'todo has been updated' }
         },
         invalidatesTags: (result, error, arg) => [{ type: 'Todos' }]
      }),
   }),
})

export const { useGetTodosQuery, useDeleteTodoMutation, useAddTodoMutation, useUpdateTodoMutation } = notesApiSlice

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



