import { List, Typography, Checkbox } from 'antd'
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import './TodoList.less'
import { Todo, useUpdateTodoMutation } from './todosApiSlice'

const { Text } = Typography

type TodoListProps = {
   todos: Todo[]
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {

   const [updateTodo] = useUpdateTodoMutation()
   const userId = useAppSelector((state) => state.auth.userId)

   return (
      <div>
         <List size="large">
            {todos.map(todo => (
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
      </div>
   )
}

export default TodoList