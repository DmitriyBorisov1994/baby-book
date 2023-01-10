import React, { Suspense } from 'react'
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Typography, Card, Collapse, Spin, Image } from 'antd';
import { Note } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';


const { Meta } = Card;
const { Paragraph, Title, Text } = Typography;
const { Panel } = Collapse;

const LazyTodoList = React.lazy(() => import('../todos/TodoList'))
const LazyActivitiesTable = React.lazy(() => import('../activities/ActivitiesTable'))

type NoteCardProps = {
   note: Note,
}

const NotesCard: React.FC<NoteCardProps> = ({ note }) => {

   const navigate = useNavigate()

   let cardCover = note.imageUrl
      ?
      <Image
         alt="card photo"
         src={note.imageUrl}
         preview={{
            mask: <><EyeOutlined /><Text style={{ color: 'white', marginLeft: '4px' }}>Просмотр</Text></>
         }}
      />
      : <></>

   return (
      <Card
         hoverable={true}
         bordered={false}
         cover={cardCover}
         style={{ width: '100%' }}
         actions={[
            <div className='card-actionsWrapper' onClick={() => navigate(`/edit/${note.noteId}`)}>
               <EditOutlined key="edit" />
               <Text>Редактировать</Text>
            </div>,
         ]}
      >
         <Meta
            className='card-meta'
            title={<Title level={2}>{note.title}</Title>}
            description={<Paragraph type="secondary">{note.noteDateString}</Paragraph>}
         />
         <Card.Grid hoverable className='card-grid'>
            <Paragraph>{note.text}</Paragraph>
         </Card.Grid>

         <Card.Grid hoverable className='card-grid card-grid-nopadding'>
            <Collapse bordered={false} ghost accordion>
               <Panel header="Нужно сделать" key="1">
                  <Suspense fallback={<Spin />}>
                     <LazyTodoList noteId={note.noteId} />
                  </Suspense>
               </Panel>
               <Panel header="Сон и кормление" key="2">
                  <Suspense fallback={<Spin />}>
                     <LazyActivitiesTable noteId={note.noteId} />
                  </Suspense>
               </Panel>
            </Collapse>
         </Card.Grid>
      </Card>
   )
}

export default NotesCard