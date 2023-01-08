import React from 'react'
import { Typography, Input, Row, Col, DatePicker, Card } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';


const { Title } = Typography
const { Search } = Input

type SearchNotesProps = {
   handleSearchByTitle: (e: React.ChangeEvent<HTMLInputElement>) => void,
   handleSearchByDate: (date: moment.Moment | null, dateString: string) => void
   searchByTitle: string,
   searchByDate: string
}

const SearchNotes: React.FC<SearchNotesProps> = ({ handleSearchByTitle, handleSearchByDate, searchByTitle, searchByDate }) => {
   return (
      <Card bordered={false}>
         <Title level={3}><FileSearchOutlined /> Поиск: </Title>
         <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
               <Search
                  placeholder="По названию"
                  allowClear
                  defaultValue={searchByTitle}
                  onChange={handleSearchByTitle}
                  style={{ width: '100%' }} />
            </Col>
            <Col xs={24} sm={12}>
               <DatePicker
                  placeholder="По дате"
                  onChange={handleSearchByDate}
                  format='DD/MM/YYYY'
                  style={{ width: '100%' }} />
            </Col>
         </Row>
      </Card>
   )
}

export default SearchNotes