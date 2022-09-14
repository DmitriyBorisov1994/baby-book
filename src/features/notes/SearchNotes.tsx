import React from 'react'
import './SearchNotes.less'
import { Typography, Input, Row, Col, DatePicker, Divider } from 'antd';
import type { DatePickerProps } from 'antd';
import { } from 'antd';
import './NotesCard.less'


const { Title } = Typography
const { Search } = Input

const SearchNotes = () => {

   const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      console.log(date, dateString);
   };

   return (
      <section className='searchnotes'>
         <Title level={3} className='card-title'>Искать:</Title>
         <Divider />
         <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={24}>
               <Search placeholder="По названию" allowClear /*onSearch={onSearch}*/ style={{ width: '100%' }} />
            </Col>
            <Col xs={24} sm={12} md={24}>
               <DatePicker placeholder="По дате" onChange={onChange} style={{ width: '100%' }} />
            </Col>
         </Row>
      </section>
   )
}

export default SearchNotes