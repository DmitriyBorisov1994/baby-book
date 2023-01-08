import React, { useState, useCallback } from 'react'
import { Col, Row, Spin, Typography } from 'antd';
import SearchNotes from '../features/notes/SearchNotes';
import NotesList from '../features/notes/NotesList';
import { useGetActivitiesQuery } from './../features/activities/activitiesApiSlice'
import { useGetTodosQuery } from './../features/todos/todosApiSlice'
import { useGetNotesQuery } from './../features/notes/notesApiSlice'

const { Paragraph, Text } = Typography

const NotesPage: React.FC = () => {

   const [searchByTitle, setSearchByTitle] = useState<string>('')
   const [searchByDate, setSearchByDate] = useState<string>('')

   const handleSearchByTitle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>): void => {
         setTimeout(() => setSearchByTitle(e.target.value), 300)
      },
      [],
   )

   const handleSearchByDate = useCallback(
      (date: moment.Moment | null, dateString: string): void => {
         setTimeout(() => setSearchByDate(dateString), 300)
      },
      [],
   )

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

   const isContentLoading = isLoading || isTodosLoading || isActivitiesLoading
   const isContentError = isError || isTodosError || isActivitiesError

   if (isContentLoading) return <Row justify='center' align='middle' className='mh100'><Spin /></Row>
   if (isContentError) return <Row justify='center' align='middle' className='mh100'><Paragraph><Text type='danger'> Произошла ошибка, попробуйте перезагрузить страницу.</Text></Paragraph></Row>

   return (
      <Row justify='start' align='middle' className='mh100'>
         <Col xs={24}>
            <SearchNotes handleSearchByTitle={handleSearchByTitle} handleSearchByDate={handleSearchByDate} searchByTitle={searchByTitle} searchByDate={searchByDate} />
         </Col>
         <NotesList searchByTitle={searchByTitle} searchByDate={searchByDate} />
      </Row>



   )
}

export default NotesPage