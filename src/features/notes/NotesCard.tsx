import React from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Typography, Card, Collapse } from 'antd';
import './NotesCard.less'
import TodoList from '../todos/TodoList';
import ActivitiesTable from '../activities/ActivitiesTable';

const { Meta } = Card;
const { Paragraph, Title } = Typography;
const { Panel } = Collapse;

const NotesCard: React.FC = () => {
   return (
      <Card
         style={{ width: '100%' }}
         actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
         ]}
      >
         <Meta
            className='card-meta'
            title={<Title level={2} className='card-title'>Card Title</Title>}
            description={<Paragraph type="secondary" className='card-description'>Card Description</Paragraph>}
         />
         <Card.Grid className='card-grid'>
            <Paragraph>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias sunt quibusdam sit sequi at ut deleniti optio consequatur. Harum, quis.</Paragraph>
         </Card.Grid>

         <Card.Grid className='card-grid card-grid-nopadding'>
            <Collapse bordered={false} ghost accordion>
               <Panel header="Нужно сделать" key="1">
                  <TodoList />
               </Panel>
               <Panel header="Сон и кормление" key="2">
                  <ActivitiesTable />
               </Panel>
            </Collapse>
         </Card.Grid>


      </Card>
   )
}

export default NotesCard