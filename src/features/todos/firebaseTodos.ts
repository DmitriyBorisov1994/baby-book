import { Todo } from './todosApiSlice';
import { db } from './../../firebase'
import { set, ref, remove, update, get } from "firebase/database";

export const firebaseGetTodos = async (userId: string) => {
   const data = await get(ref(db, `/todos/${userId}`))
      .then((snapshot) => Object.values(snapshot.val()))
   console.log(data[0] as any)
   return {
      todos: Object.values(data[0] as any),
      todosIds: Object.keys(data[0] as any)
   }
}

export const firebaseDeleteTodo = (userId: string, todoId: string) => {
   return remove(ref(db, `/todos/${userId}/${todoId}`))
}

export const firebaseUpdateTodo = (userId: string, todoId: string, todo: Todo) => {
   return update(ref(db, `/${userId}/todos/${todoId}`), { ...todo })
}

export const firebaseAddTodo = (userId: string, todo: Todo) => {
   return set(ref(db, `/todos/${userId}/${todo.todoId}`), {
      ...todo
   });
}