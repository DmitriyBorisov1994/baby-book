import { List, Typography, Checkbox } from 'antd'
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import './TodoList.less'
import { Todo, selectTodosByNoteId, useUpdateTodoMutation } from './todosApiSlice'

const { Text, Paragraph } = Typography

type TodoListProps = {
   noteId: string
}

const TodoList = ({ noteId }: TodoListProps) => {

   console.log('render todolist')

   const [updateTodo] = useUpdateTodoMutation()
   const userId = useAppSelector((state) => state.auth.userId)
   const todos = useAppSelector((state) => selectTodosByNoteId(state, noteId))

   if (!todos?.length) return <Paragraph><Text type='secondary'>У вас не запланировано никаких дел</Text></Paragraph>

   return (
      <List size="large">
         {todos?.map(todo => (
            <List.Item key={todo.todoId} className='list-item'>
               <div className='list-content-wrapper'>
                  <Text type={todo.completed ? "success" : "danger"} delete={todo.completed ? true : false}>{todo.text}</Text>
                  <Checkbox
                     onChange={() => {
                        const updatedTodo = {
                           ...todo,
                           completed: !todo.completed
                        }
                        updateTodo({ userId, updatedTodo })
                     }}
                     checked={todo.completed}
                  />
               </div>
            </List.Item>
         ))}
      </List>
   )
}

export default TodoList