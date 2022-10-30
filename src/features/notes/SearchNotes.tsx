import React from 'react'
import './SearchNotes.less'
import { Typography, Input, Row, Col, DatePicker, Divider, Form, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import { } from 'antd';
import './NotesCard.less'
import AddNote from './AddNote';


const { Title } = Typography
const { Search } = Input

type SearchNotesProps = {
   setSearchByTitle: any,
   setSearchByDate: any
   searchByTitle: string,
   searchByDate: string
}

const SearchNotes: React.FC<SearchNotesProps> = ({ setSearchByTitle, setSearchByDate, searchByTitle, searchByDate }) => {

   const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      console.log(date, dateString);
   };

   return (
      <section className='searchnotes'>
         <Title level={3} className='card-title'>Искать:</Title>
         <Divider />
         <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={24}>
               <Search
                  placeholder="По названию"
                  allowClear
                  value={searchByTitle}
                  onChange={(e) => setSearchByTitle(e.target.value)}
                  style={{ width: '100%' }} />
            </Col>
            <Col xs={24} sm={12} md={24}>
               <DatePicker
                  placeholder="По дате"
                  onChange={(date, dateString) => {
                     console.log(dateString)
                     setSearchByDate(dateString)
                  }}
                  format='DD/MM/YYYY'
                  style={{ width: '100%' }} />
            </Col>
         </Row>
         <Divider />
         <Title level={3} className='card-title'>Добавить заметку:</Title>
         <Divider />
         <AddNote />
      </section>
   )
}

export default SearchNotes