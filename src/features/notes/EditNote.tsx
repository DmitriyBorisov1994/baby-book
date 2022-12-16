import React, { useState, useEffect } from 'react'
import { Note, useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice';
import { Typography, Card, Collapse, Form, Input, DatePicker, Button, TimePicker, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Activity, useAddActivityMutation, useDeleteActivityMutation, useUpdateActivityMutation } from './../activities/activitiesApiSlice'
import { Todo, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from './../todos/todosApiSlice'
import { nanoid } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { firebaseDeletePhotosFolderbyNoteId, firebaseDownloadUrls, firebaseUploadPhoto } from '../photos/firebasePhotos';
import PhotoUploader from '../photos/photoUploader';

type EditNoteProps = {
   note: Note,
   todos?: Todo[],
   activities?: Activity[],
}

const { Meta } = Card;
const { Paragraph, Title } = Typography;
const { Panel } = Collapse;

const EditNote: React.FC<EditNoteProps> = ({ note, todos, activities }) => {

   const navigate = useNavigate()

   const [deleteNote] = useDeleteNoteMutation()
   const [updateNote] = useUpdateNoteMutation()

   const [addTodo] = useAddTodoMutation()
   const [updateTodo] = useUpdateTodoMutation()
   const [deleteTodo] = useDeleteTodoMutation()

   const [addActivity] = useAddActivityMutation()
   const [updateActivity] = useUpdateActivityMutation()
   const [deleteActivity] = useDeleteActivityMutation()

   const userId = useAppSelector((state) => state.auth.userId)

   const [photo, setPhoto] = useState<any>(null)

   const onSetPhoto = (file: any) => {
      setPhoto(file)
   }

   const onDeleteNoteClick = async (userId: string, noteId: string) => {
      await deleteNote({ userId, noteId })
      if (todos) await Promise.all(todos.map(todo => deleteTodo({ userId, todoId: todo.todoId })))
      if (activities) await Promise.all(activities.map(act => deleteActivity({ userId, activityId: act.id })))
      firebaseDeletePhotosFolderbyNoteId(noteId)
      navigate(-1)
   }

   const [photoUrls, setPhotoUrls] = useState<string[]>([])

   useEffect(() => {
      firebaseDownloadUrls(note.noteId).then(urls => setPhotoUrls(urls))
   }, [])

   /*let cardCover

   if (!photoUrls.length) {
      cardCover = <></>
   } else {
      cardCover = <img
         alt="card photo"
         src={photoUrls[0]}
      />
   }*/


   return (
      <Card
         hoverable={true}
         bordered={false}
         style={{
            width: '100%',
         }}
         //cover={/*cardCover*/}
         actions={[
            <div className='card-actionsWrapper'
               onClick={() => {
                  if (userId) onDeleteNoteClick(userId, note.noteId)
               }}
            >
               <DeleteOutlined key="delete" />
               <span>Удалить</span>
            </div>,
            <div className='card-actionsWrapper'
               onClick={() => { navigate(-1) }}
            >
               <EditOutlined key="edit" />
               <span>Назад</span>
            </div>,
         ]}
      >
         <Form
            onFinish={async (values: any) => {
               console.log('Success:', values);
               console.log(values.date.format('DD/MM/YYYY'))
               if (photo) {
                  firebaseDeletePhotosFolderbyNoteId(note.noteId)
                  firebaseUploadPhoto(photo, note.noteId)
               }
               if (userId) {
                  const noteId = note.noteId
                  const updatedNote = {
                     title: values.title,
                     text: values.text,
                     noteDateString: values.date.format('DD/MM/YYYY'),
                     noteId
                  }
                  await updateNote({ userId, updatedNote })
                  if (values.todos) {
                     await Promise.all(values.todos.map((todo: any) => {
                        if (!todo.todoId) {
                           const newTodo = {
                              todoId: `Todo_${nanoid()}`,
                              noteId: noteId,
                              text: todo.text
                           }
                           addTodo({ userId, newTodo })
                        } else {
                           updateTodo({ userId, todo })
                        }
                     }))
                     if (todos) {
                        await Promise.all(todos.map((prevTodo) => {
                           const findTodo = values.todos.find((todo: any) => todo.todoId = prevTodo.todoId)
                           if (!findTodo) deleteTodo({ userId, id: prevTodo.todoId })
                        }))
                     }
                  }
                  if (values.activities) {
                     await Promise.all(values.activities.map((activity: any) => {
                        if (!activity.id) {
                           const newActivity = {
                              id: `Activity_${nanoid()}`,
                              noteId: noteId,
                              eatTime: activity.eatTime.format('HH:mm'),
                              endSleep: activity.endSleep.format('HH:mm'),
                              startSleep: activity.startSleep.format('HH:mm'),
                              eatAmount: activity.eatAmount
                           }
                           addActivity({ userId, newActivity })
                        } else {
                           const updatedActivity = {
                              ...activity,
                              eatTime: activity.eatTime.format('HH:mm'),
                              endSleep: activity.endSleep.format('HH:mm'),
                              startSleep: activity.startSleep.format('HH:mm'),
                           }
                           updateActivity({ userId, updatedActivity })
                        }
                     }))
                     if (activities) {
                        await Promise.all(activities.map((prevAct) => {
                           const findTodo = values.activities.find((act: any) => act.id = prevAct.id)
                           if (!findTodo) deleteActivity({ userId, id: prevAct.id })
                        }))
                     }
                  }
                  navigate(-1)
               }
            }}
            initialValues={{
               ...note,
               date: moment(note.noteDateString, 'DD/MM/YYYY'),
               todos: todos?.map(todo => todo),
               activities: activities?.map(act => {
                  const activityFormValues = {
                     ...act,
                     endSleep: moment(act.endSleep, 'HH:mm'),
                     eatTime: moment(act.eatTime, "HH:mm"),
                     startSleep: moment(act.startSleep, 'HH:mm'),
                  }

                  return activityFormValues
               })
            }}
         >
            <Form.Item name={"title"} rules={[{ required: true, message: 'Обязательное поле!' }]}>
               <Input placeholder="Введите заголовок" />
            </Form.Item>
            <Form.Item name={"date"} rules={[{ required: true, message: 'Обязательное поле!' }]}>
               <DatePicker
                  placeholder="Введите дату поста"
                  onChange={() => { }}
                  format='DD/MM/YYYY'
                  style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={"text"} rules={[{ required: true, message: 'Обязательное поле!' }]}>
               <Input.TextArea placeholder="Введите текст" />
            </Form.Item>
            <Title level={4} className='card-title'>Фото:</Title>
            <PhotoUploader onSetPhoto={onSetPhoto} url={photoUrls[0]} />
            <Title level={4} className='card-title'>Список дел:</Title>
            <Form.List name="todos">
               {(fields, { add, remove }, { errors }) => (
                  <>
                     {fields.map((field, index) => (
                        <Form.Item
                           label={index + 1}
                           required={false}
                           key={field.key}
                        >
                           <Form.Item
                              {...field}
                              name={[field.name, 'text']}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                 {
                                    required: true,
                                    whitespace: true,
                                    message: "Введите задачу или удалите поле",
                                 },
                              ]}
                              noStyle
                           >
                              <Input placeholder="Что нужно сделать" style={{ width: '80%' }} />
                           </Form.Item>
                           {fields.length >= 1 ? (
                              <DeleteOutlined
                                 style={{ marginLeft: "1rem", fontSize: '1.2rem' }}
                                 onClick={() => remove(field.name)}
                              />
                           ) : null}
                        </Form.Item>
                     ))}
                     <Form.Item>
                        <Button
                           type="dashed"
                           onClick={() => add()}
                           style={{ width: '60%' }}
                           icon={<PlusOutlined />}
                        >
                           Добавить
                        </Button>
                        <Button
                           type="dashed"
                           onClick={() => {
                              add('', 0);
                           }}
                           style={{ width: '80%', marginTop: '20px' }}
                           icon={<PlusOutlined />}
                        >
                           Добавить в начало списка
                        </Button>
                        <Form.ErrorList errors={errors} />
                     </Form.Item>
                  </>
               )}
            </Form.List>
            <Title level={4} className='card-title'>Активность:</Title>
            <Form.List name="activities">
               {(fields, { add, remove }) => (
                  <>
                     {fields.map(field => (
                        <>
                           <Form.Item
                              {...field}
                              label="Проснулся"
                              name={[field.name, 'endSleep']}
                           //rules={[{ required: true, message: 'Missing price' }]}
                           >
                              <TimePicker format={'HH:mm'} placeholder='Введите время' showNow={false} style={{ width: "100%" }} />
                           </Form.Item>
                           <Form.Item
                              {...field}
                              label="Поел"
                              name={[field.name, 'eatTime']}
                           //rules={[{ required: true, message: 'Missing price' }]}
                           >
                              <TimePicker format={'HH:mm'} placeholder='Введите время' showNow={false} style={{ width: "100%" }} />
                           </Form.Item>
                           <Form.Item
                              {...field}
                              label="Сколько поел"
                              name={[field.name, 'eatAmount']}
                           //rules={[{ required: true, message: 'Missing price' }]}
                           >
                              <InputNumber min={0} step={10} style={{ width: "100%" }} />
                           </Form.Item>
                           <Form.Item
                              {...field}
                              label="Уснул"
                              name={[field.name, 'startSleep']}
                           //rules={[{ required: true, message: 'Missing price' }]}
                           >
                              <TimePicker format={'HH:mm'} placeholder='Введите время' showNow={false} style={{ width: "100%" }} />
                           </Form.Item>

                           <DeleteOutlined style={{ fontSize: '1.2rem', margin: '0 0 1rem 0' }} onClick={() => remove(field.name)} />
                        </>
                     ))}

                     <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                           Добавить активность
                        </Button>
                     </Form.Item>
                  </>
               )}
            </Form.List>
            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Сохранить изменения
               </Button>
            </Form.Item>
         </Form >
      </Card >
   )
}

export default EditNote