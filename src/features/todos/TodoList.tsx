import { List, Typography, Checkbox } from 'antd'
import React from 'react'
import './TodoList.less'

const { Text } = Typography

const TodoList: React.FC = () => {
   return (
      <div>
         <List size="large">
            <List.Item className='list-item'>
               <div className='list-content-wrapper'>
                  <Text>Lorem ipsum dolor sit amet.</Text> <Checkbox />
               </div>
            </List.Item>
            <List.Item className='list-item'>
               <div className='list-content-wrapper'>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, consequatur?</Text> <Checkbox />
               </div>
            </List.Item>
            <List.Item className='list-item'>
               <div className='list-content-wrapper'>
                  <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit sint soluta quisquam nulla natus consequatur culpa ipsa facilis quaerat?</Text> <Checkbox />
               </div>
            </List.Item>
         </List>
      </div>
   )
}

export default TodoList