import { Col, Row, Typography } from 'antd'
import React from 'react'
import NotesCard from './NotesCard'
import { useAppSelector } from '../../app/hooks'
import { selectNoteBySearch } from './notesApiSlice'

type NoteListProps = {
   searchByDate: string,
   searchByTitle: string
}

const { Paragraph, Text } = Typography

const NotesList: React.FC<NoteListProps> = ({ searchByDate, searchByTitle }) => {

   const notes = useAppSelector((state) => selectNoteBySearch(state, searchByTitle, searchByDate))

   if (notes?.length) return (
      <>
         {
            notes?.map(note =>
               <Col xs={24} md={12} key={note.noteId} className='notesCardWrapper'>
                  <NotesCard note={note} />
               </Col>)
         }
      </>
   )

   return (
      <Row align='top' gutter={[24, 24]} justify='center'>
         <Col><Paragraph><Text type='secondary'>Вы пока не создали ни одной заметки</Text></Paragraph></Col>
      </Row>
   )
}

export default NotesList