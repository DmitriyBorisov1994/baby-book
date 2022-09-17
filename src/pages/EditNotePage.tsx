import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectNoteById } from '../features/notes/notesApiSlice'
import NotesCard from '../features/notes/NotesCard'
import { Col, Row } from 'antd';

const EditNotePage: React.FC = () => {

   const { noteId } = useParams()

   const note = useAppSelector((state) => {
      if (noteId) return selectNoteById(state, noteId)
   })

   let content = note ? <NotesCard note={note} /> : <p>Запись не найдена</p>

   return (
      <Row justify='center'>
         <Col xs={24} md={12}>{content}</Col>
      </Row>
   )
}

export default EditNotePage