import React from 'react'
import './SearchNotes.less'
import { Typography, Input, Row, Col, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { } from 'antd';
import './NotesCard.less'
import { FileSearchOutlined } from '@ant-design/icons';


const { Title } = Typography
const { Search } = Input

type SearchNotesProps = {
   setSearchByTitle: any,
   setSearchByDate: any
   searchByTitle: string,
   searchByDate: string
}

const SearchNotes: React.FC<SearchNotesProps> = ({ setSearchByTitle, setSearchByDate, searchByTitle, searchByDate }) => {
   return (
      <section className='searchnotes'>
         <Title level={3} className='card-title'><FileSearchOutlined /> Поиск: </Title>
         <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
               <Search
                  placeholder="По названию"
                  allowClear
                  value={searchByTitle}
                  onChange={(e) => setSearchByTitle(e.target.value)}
                  style={{ width: '100%' }} />
            </Col>
            <Col xs={24} sm={12}>
               <DatePicker
                  placeholder="По дате"
                  onChange={(date, dateString) => {
                     setSearchByDate(dateString)
                  }}
                  format='DD/MM/YYYY'
                  style={{ width: '100%' }} />
            </Col>
         </Row>
      </section>
   )
}

export default SearchNotes