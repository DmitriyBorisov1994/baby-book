import React from 'react'
import './SearchNotes.less'
import { Typography, Input, Row, Col, DatePicker, Divider } from 'antd';
import type { DatePickerProps } from 'antd';
import { } from 'antd';
import './NotesCard.less'


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
                  //value={searchByDate}
                  onChange={(date, dateString) => {
                     console.log(dateString)
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