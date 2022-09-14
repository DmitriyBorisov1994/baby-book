import { Col, Row } from 'antd'
import React from 'react'
import NotesCard from './NotesCard'
import './NotesList.less'

const NotesList = () => {
   return (
      <article className='notelist'>
         <Row align='top' gutter={[24, 24]}>
            <Col xs={24} lg={12}><NotesCard /></Col>
            <Col xs={24} lg={12}><NotesCard /></Col>
            <Col xs={24} lg={12}><NotesCard /></Col>
         </Row>
      </article>

   )
}

export default NotesList