import React from 'react'
import { Typography, Input, Row, Col, DatePicker, Divider, Form, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useAddNoteMutation } from './notesApiSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useAddTodoMutation } from '../todos/todosApiSlice';
import { useAddActivityMutation } from '../activities/activitiesApiSlice';
import { useAppSelector } from '../../app/hooks';
const { Title } = Typography

const AddNote: React.FC = () => {

   const [addNote] = useAddNoteMutation()
   const [addTodo] = useAddTodoMutation()
   const [addActivity] = useAddActivityMutation()

   const userId = useAppSelector((state) => state.auth.userId)

   return (
      <Form
         onFinish={async (values: any) => {
            console.log('Success:', values);
            if (userId) {
               const noteId = `Note_${nanoid()}`
               const newNote = {
                  title: values.title,
                  text: values.text,
                  noteDateString: values.date.format('DD/MM/YYYY'),
                  noteId
               }
               await addNote({ userId, newNote })
               if (values.todos) {
                  await Promise.all(values.todos.map((todo: any) => {
                     const newTodo = {
                        todoId: `Todo_${nanoid()}`,
                        noteId: noteId,
                        text: todo
                     }
                     addTodo({ userId, newTodo })
                  }))
               }
               if (values.activities) {
                  await Promise.all(values.activities.map((activity: any) => {
                     const newActivity = {
                        id: `Activity_${nanoid()}`,
                        noteId: noteId,
                        ...activity
                     }
                     addActivity({ userId, newActivity })
                  }))
               }
            }
         }}
      >
         <Row gutter={[16, 16]}>
            <Col xs={24}>
               <Form.Item name={"title"}>
                  <Input placeholder="Введите заголовок" />
               </Form.Item>
            </Col>
            <Col xs={24}>
               <Form.Item name={"date"}>
                  <DatePicker
                     placeholder="Введите дату поста"
                     onChange={() => { }}
                     format='DD/MM/YYYY'
                     style={{ width: '100%' }} />
               </Form.Item>
            </Col>
            <Col xs={24}>
               <Form.Item name={"text"}>
                  <Input.TextArea placeholder="Введите текст" />
               </Form.Item>
            </Col>
            <Col xs={24}>
               <Title level={4} className='card-title'>Список дел:</Title>
            </Col>
            <Col xs={24}>
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
            </Col>
            <Col xs={24}>
               <Title level={4} className='card-title'>Активность:</Title>
            </Col>
            <Col xs={24} >
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
                                 <Input />
                              </Form.Item>
                              <Form.Item
                                 {...field}
                                 label="Поел"
                                 name={[field.name, 'eatTime']}
                              //rules={[{ required: true, message: 'Missing price' }]}
                              >
                                 <Input />
                              </Form.Item>
                              <Form.Item
                                 {...field}
                                 label="Сколько поел"
                                 name={[field.name, 'eatAmount']}
                              //rules={[{ required: true, message: 'Missing price' }]}
                              >
                                 <Input />
                              </Form.Item>
                              <Form.Item
                                 {...field}
                                 label="Уснул"
                                 name={[field.name, 'startSleep']}
                              //rules={[{ required: true, message: 'Missing price' }]}
                              >
                                 <Input />
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
            </Col>
         </Row>
         <Form.Item>
            <Button type="primary" htmlType="submit">
               Добавить
            </Button>
         </Form.Item>
      </Form>
   )
}

export default AddNote