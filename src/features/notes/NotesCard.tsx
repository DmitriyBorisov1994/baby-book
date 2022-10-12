import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Typography, Card, Collapse } from 'antd';
import './NotesCard.less'
import TodoList from '../todos/TodoList';
import ActivitiesTable from '../activities/ActivitiesTable';
import { Note } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectTodosByNoteId } from '../todos/todosApiSlice';
import { selectActivitiesByNoteId } from '../activities/activitiesApiSlice';

const { Meta } = Card;
const { Paragraph, Title } = Typography;
const { Panel } = Collapse;

type NoteCardProps = {
   note: Note,
   isTodosLoading?: boolean,
   isTodosSuccess?: boolean,
   isTodosError?: boolean,
   isActivitiesLoading?: boolean,
   isActivitiesSuccess?: boolean,
   isActivitiesError?: boolean,
}

const NotesCard: React.FC<NoteCardProps> = (
   { note,
      isTodosError,
      isTodosLoading,
      isTodosSuccess,
      isActivitiesError,
      isActivitiesLoading,
      isActivitiesSuccess }
) => {

   const navigate = useNavigate()

   const todos = useAppSelector((state) => selectTodosByNoteId(state, note.noteId))
   const activities = useAppSelector((state) => selectActivitiesByNoteId(state, note.noteId))

   let todosContent

   if (todos && !todos.length) {
      todosContent = <p>У вас нет списка дел на сегодня</p>
   } else if (isTodosSuccess && todos) { // что если не будет тудушек????
      todosContent = <TodoList todos={todos} />
   } else if (isTodosError) {
      todosContent = <p>Ошибка</p>
   } else if (isTodosLoading) {
      todosContent = <p>Загружаю...</p>
   }

   let activitiesContent

   if (activities && !activities.length) {
      activitiesContent = <p>Вы не отмечали активность</p>
   } else if (isActivitiesSuccess && activities) { // что если не будет тудушек????
      activitiesContent = <ActivitiesTable activities={activities} />
   } else if (isActivitiesError) {
      activitiesContent = <p>Ошибка</p>
   } else if (isActivitiesLoading) {
      activitiesContent = <p>Загружаю...</p>
   }

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
                  {todosContent}
               </Panel>
               <Panel header="Сон и кормление" key="2">
                  {activitiesContent}
               </Panel>
            </Collapse>
         </Card.Grid>
      </Card>
   )
}

export default NotesCard