import { List, Typography, Checkbox } from 'antd'
import React from 'react'
import './TodoList.less'
import { Todo } from './todosApiSlice'

const { Text } = Typography

type TodoListProps = {
   todos: Todo[]
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
   return (
      <div>
         <List size="large">
            {todos.map(todo => (
               <List.Item key={todo.todoId} className='list-item'>
                  <div className='list-content-wrapper'>
                     <Text>{todo.text}</Text> <Checkbox checked={todo.completed} />
                  </div>
               </List.Item>
            ))}
         </List>
      </div>
   )
}

export default TodoList