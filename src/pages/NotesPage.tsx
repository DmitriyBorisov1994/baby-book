import React, { useState } from 'react'
import { Col, Row } from 'antd';
import SearchNotes from '../features/notes/SearchNotes';
import NotesList from '../features/notes/NotesList';

const NotesPage: React.FC = () => {

   const [searchByTitle, setSearchByTitle] = useState('')
   const [searchByDate, setSearchByDate] = useState('')

   return (
      <Row gutter={[16, 16]}>
         <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 2 }}>
            <SearchNotes setSearchByTitle={setSearchByTitle} setSearchByDate={setSearchByDate} searchByTitle={searchByTitle} searchByDate={searchByDate} />
         </Col>
         <Col xs={{ span: 24, order: 2 }} md={{ span: 16, order: 1 }}>
            <NotesList searchByTitle={searchByTitle} searchByDate={searchByDate} />
         </Col>
      </Row>
   )
}

export default NotesPage