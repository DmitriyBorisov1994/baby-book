import React, { useState, useEffect, Suspense } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Typography, Card, Collapse, Spin } from 'antd';
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

   //const [photoUrls, setPhotoUrls] = useState<string[]>([])
   /*useEffect(() => {
      firebaseDownloadUrls(note.noteId).then(urls => setPhotoUrls(urls))
   }, [])*/

   let cardCover = <img
      alt="card photo"
      src={'https://phonoteka.org/uploads/posts/2022-09/thumbs/1663691235_13-phonoteka-org-p-rebenok-bez-fona-pinterest-17.png'}
   />

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