import React, { useCallback } from 'react'
import { Row, Col } from 'antd'
import NotesForm from '../features/notes/NotesForm'
import { nanoid } from '@reduxjs/toolkit';
import { useAppSelector } from '../app/hooks';
import { useAddNoteMutation } from '../features/notes/notesApiSlice';
import { useAddTodoMutation } from '../features/todos/todosApiSlice';
import { useAddActivityMutation } from '../features/activities/activitiesApiSlice';
import { useNavigate } from 'react-router-dom';



const AddNotePage = () => {

   const userId = useAppSelector((state) => state.auth.userId)
   const navigate = useNavigate()

   const [addNote] = useAddNoteMutation()
   const [addTodo] = useAddTodoMutation()
   const [addActivity] = useAddActivityMutation()

   const onFinish = useCallback(async (values: any) => {
      if (userId) {
         const noteId = `Note_${nanoid()}`
         /*if (photo) {
            firebaseUploadPhoto(photo, noteId)
         }*/
         const newNote = {
            title: values.title,
            text: values.text,
            noteDateString: values.date.format('DD/MM/YYYY'),
            noteId
         }
         await addNote({ userId, newNote })
         if (values.todos) {
            await Promise.all(values.todos.map((todo: any) => {
               const newTodo = {
                  todoId: `Todo_${nanoid()}`,
                  noteId: noteId,
                  text: todo
               }
               addTodo({ userId, newTodo })
            }))
         }
         if (values.activities) {
            await Promise.all(values.activities.map((activity: any) => {
               const newActivity = {
                  id: `Activity_${nanoid()}`,
                  noteId: noteId,
                  eatTime: activity.eatTime.format('HH:mm'),
                  endSleep: activity.endSleep.format('HH:mm'),
                  startSleep: activity.startSleep.format('HH:mm'),
                  eatAmount: activity.eatAmount
               }
               addActivity({ userId, newActivity })
            }))
         }
         navigate(-1)
      }
   }, [])

   return (
      <Row justify='center' align='middle' className='mh100 formWrapperPadding'>
         <Col xs={24} md={12}><NotesForm onFinish={onFinish} cardTitle={'Добавить новую заметку'} submitBtnText='Добавить' /></Col>
      </Row>
   )
}

export default AddNotePage