import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectNoteById } from '../features/notes/notesApiSlice'
import { Col, Row } from 'antd';
import EditNote from '../features/notes/EditNote'
import { selectActivitiesByNoteId } from '../features/activities/activitiesApiSlice';
import { selectTodosByNoteId } from '../features/todos/todosApiSlice';

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

   let content = note ? <EditNote note={note} todos={todos} activities={activities} /> : <p>Запись не найдена</p>

   return (
      <Row justify='center'>
         <Col xs={24} md={12}>{content}</Col>
      </Row>
   )
}

export default EditNotePage