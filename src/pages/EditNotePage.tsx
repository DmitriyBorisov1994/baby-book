import React, { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { Note, selectNoteById, useDeleteNoteMutation, useUpdateNoteMutation } from '../features/notes/notesApiSlice'
import { Col, Row, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { selectActivitiesByNoteId, useAddActivityMutation, useDeleteActivityMutation, useUpdateActivityMutation } from '../features/activities/activitiesApiSlice';
import { selectTodosByNoteId, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '../features/todos/todosApiSlice';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import NotesForm from '../features/notes/NotesForm';
import { firebaseDeletePhoto } from '../features/photos/firebasePhotos';

const { Paragraph, Text } = Typography


const EditNotePage: React.FC = () => {

   const { noteId } = useParams()

   const note = useAppSelector((state) => {
      if (noteId) return selectNoteById(state, noteId)
   })

   const todos = useAppSelector((state) => {
      if (note) return selectTodosByNoteId(state, note.noteId)
   })
   const activities = useAppSelector((state) => {
      if (note) return selectActivitiesByNoteId(state, note.noteId)
   })

   const navigate = useNavigate()

   const [deleteNote] = useDeleteNoteMutation()
   const [updateNote] = useUpdateNoteMutation()

   const [addTodo] = useAddTodoMutation()
   const [updateTodo] = useUpdateTodoMutation()
   const [deleteTodo] = useDeleteTodoMutation()

   const [addActivity] = useAddActivityMutation()
   const [updateActivity] = useUpdateActivityMutation()
   const [deleteActivity] = useDeleteActivityMutation()

   const userId = useAppSelector((state) => state.auth.userId)

   const onDeleteNoteClick = useCallback(async (noteId: string) => {
      if (userId) await deleteNote({ userId, noteId })
      if (todos) await Promise.all(todos.map(todo => deleteTodo({ userId, todoId: todo.todoId })))
      if (activities) await Promise.all(activities.map(act => deleteActivity({ userId, activityId: act.id })))
      navigate(-1)
   }, [userId, noteId])

   const onBackClick = useCallback(async (prevUrl: string | undefined, currentUrl: string | undefined, path: string | undefined) => {
      if (prevUrl && currentUrl && prevUrl !== currentUrl && path) await firebaseDeletePhoto(path);
      navigate(-1)
   }, [])

   const onFinish = useCallback(async (values: any) => {
      if (userId) {
         const updatedNote = {
            title: values.title,
            text: values.text,
            noteDateString: values.date.format('DD/MM/YYYY'),
            noteId,
            imageUrl: values.dragger.url,
            imagePath: values.dragger.filePath
         } as Note
         await updateNote({ userId, updatedNote })
         if (values.todos) {
            await Promise.all(values.todos.map((todo: any) => {
               if (!todo.todoId) {
                  const newTodo = {
                     todoId: `Todo_${nanoid()}`,
                     noteId: noteId,
                     text: todo.text
                  }
                  addTodo({ userId, newTodo })
               } else {
                  updateTodo({ userId, todo })
               }
            }))
            if (todos) {
               await Promise.all(todos.map((prevTodo) => {
                  const findTodo = values.todos.find((todo: any) => todo.todoId = prevTodo.todoId)
                  if (!findTodo) deleteTodo({ userId, id: prevTodo.todoId })
               }))
            }
         }
         if (values.activities) {
            await Promise.all(values.activities.map((activity: any) => {
               if (!activity.id) {
                  const newActivity = {
                     id: `Activity_${nanoid()}`,
                     noteId: noteId,
                     eatTime: activity.eatTime.format('HH:mm'),
                     endSleep: activity.endSleep.format('HH:mm'),
                     startSleep: activity.startSleep.format('HH:mm'),
                     eatAmount: activity.eatAmount
                  }
                  addActivity({ userId, newActivity })
               } else {
                  const updatedActivity = {
                     ...activity,
                     eatTime: activity.eatTime.format('HH:mm'),
                     endSleep: activity.endSleep.format('HH:mm'),
                     startSleep: activity.startSleep.format('HH:mm'),
                  }
                  updateActivity({ userId, updatedActivity })
               }
            }))
            if (activities) {
               await Promise.all(activities.map((prevAct) => {
                  const findTodo = values.activities.find((act: any) => act.id = prevAct.id)
                  if (!findTodo) deleteActivity({ userId, id: prevAct.id })
               }))
            }
         }
         navigate(-1)
      }
   }, [])

   let content = note
      ? <NotesForm
         onFinish={onFinish}
         note={note}
         todos={todos}
         activities={activities}
         formAction='edit'
         onDeleteNoteClick={onDeleteNoteClick}
         onBackClick={onBackClick}
      />
      : <Paragraph style={{ textAlign: 'center' }}><Text type='secondary' strong>Запись не найдена!</Text></Paragraph>

   return (
      <Row justify='center' align='middle' className='mh100 formWrapperPadding'>
         <Col xs={24} md={12}>{content}</Col>
      </Row>
   )
}

export default EditNotePage