import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Col, Row } from 'antd'
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectNoteBySearch, selectNoteById, useGetNotesQuery } from './notesApiSlice'
import NotesCard from './NotesCard'
import './NotesList.less'

type NoteListProps = {
   searchByDate: string,
   searchByTitle: string
}

const NotesList: React.FC<NoteListProps> = ({ searchByDate, searchByTitle }) => {

   const { isLoading,
      isSuccess,
      isError,
      error } = useGetNotesQuery('')

   const notes = useAppSelector((state) => selectNoteBySearch(state, searchByTitle, searchByDate)) //temp!!!
   //const noteById = useAppSelector((state) => selectNoteById(state, '')) // temp!!!

   console.log(notes)

   let content

   if (isSuccess) {
      content = notes?.map(note => <Col xs={24} lg={12}><div className='notescard-wrapper'><NotesCard note={note} /></div></Col>)
   } else if (isError) {
      content = <Col xs={24} lg={12}><p>Ошибка</p></Col>
   } else if (isLoading) {
      content = <Col xs={24} lg={12}><p>Загружаю...</p></Col>
   }

   return (
      <article className='notelists'>
         <Row align='top' gutter={[24, 24]}>
            {content}
         </Row>
      </article>

   )
}

export default NotesList