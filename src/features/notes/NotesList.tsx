import { Col, Row } from 'antd'
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { useGetActivitiesQuery } from '../activities/activitiesApiSlice'
import { useGetTodosQuery } from '../todos/todosApiSlice'
import { selectNoteBySearch, useGetNotesQuery } from './notesApiSlice'
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

   const { isLoading: isTodosLoading,
      isSuccess: isTodosSuccess,
      isError: isTodosError,
      error: todosError } = useGetTodosQuery('')

   const { isLoading: isActivitiesLoading,
      isSuccess: isActivitiesSuccess,
      isError: isActivitiesError,
      error: ActivitiesError } = useGetActivitiesQuery('')

   const notes = useAppSelector((state) => selectNoteBySearch(state, searchByTitle, searchByDate))

   //console.log(notes)

   let content

   if (isSuccess) {
      content = notes?.map(note =>
         <Col xs={24} lg={12}>
            <div className='notescard-wrapper'>
               <NotesCard
                  note={note}
                  isTodosLoading={isTodosLoading}
                  isTodosSuccess={isTodosSuccess}
                  isTodosError={isTodosError}
                  isActivitiesLoading={isActivitiesLoading}
                  isActivitiesSuccess={isActivitiesSuccess}
                  isActivitiesError={isActivitiesError}
               />
            </div>
         </Col>)
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