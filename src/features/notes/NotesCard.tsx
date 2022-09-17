import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Typography, Card, Collapse } from 'antd';
import './NotesCard.less'
import TodoList from '../todos/TodoList';
import ActivitiesTable from '../activities/ActivitiesTable';
import { Note } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph, Title } = Typography;
const { Panel } = Collapse;

type NoteCardProps = {
   note: Note,
}

const NotesCard: React.FC<NoteCardProps> = ({ note }) => {

   const navigate = useNavigate()

   return (
      <Card
         hoverable={true}
         bordered={false}
         style={{
            width: '100%',
         }}
         cover={
            <img
               alt="example"
               src="https://abrakadabra.fun/uploads/posts/2022-02/1643775019_1-abrakadabra-fun-p-multyashnie-mladentsi-4.jpg"
            />
         }
         actions={[
            <div className='card-actionsWrapper'>
               <DeleteOutlined key="delete" />
               <span>Удалить</span>
            </div>,
            <div className='card-actionsWrapper' onClick={() => navigate(`/edit/${note.noteId}`)}>
               <EditOutlined key="edit" />
               <span>Редактировать</span>
            </div>,
         ]}
      >
         <Meta
            className='card-meta'
            title={<Title level={2} className='card-title'>{note.title}</Title>}
            description={<Paragraph type="secondary" className='card-description'>{note.noteDateString}</Paragraph>}
         />
         <Card.Grid hoverable className='card-grid'>
            <Paragraph>{note.text}</Paragraph>
         </Card.Grid>

         <Card.Grid hoverable className='card-grid card-grid-nopadding'>
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