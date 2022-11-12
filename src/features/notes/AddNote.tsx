import React from 'react'
import { Typography, Input, InputNumber, Row, Col, DatePicker, TimePicker, Form, Button, Divider } from 'antd';
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

   const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
   }

   return (
      <>
         <Title level={3} className='card-title'>Добавить заметку:</Title>
         <Divider />
         <Form
            {...formItemLayout}
            onFinish={async (values: any) => {
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
                           eatTime: activity.eatTime.format('HH:mm'),
                           endSleep: activity.endSleep.format('HH:mm'),
                           startSleep: activity.startSleep.format('HH:mm'),
                           eatAmount: activity.eatAmount
                        }
                        addActivity({ userId, newActivity })
                     }))
                  }
               }
            }}
         >
            <Row gutter={[16, 16]}>
               <Col xs={24}>
                  <Form.Item label="Заголовок:" name={"title"} rules={[{ required: true, message: 'Обязательное поле!' }]}>
                     <Input placeholder="Введите заголовок" />
                  </Form.Item>
               </Col>
               <Col xs={24}>
                  <Form.Item label="Дата:" name={"date"} rules={[{ required: true, message: 'Обязательное поле!' }]}>
                     <DatePicker
                        placeholder="Введите дату поста"
                        onChange={() => { }}
                        format='DD/MM/YYYY'
                        style={{ width: '100%' }} />
                  </Form.Item>
               </Col>
               <Col xs={24}>
                  <Form.Item label="Текст:" name={"text"} rules={[{ required: true, message: 'Обязательное поле!' }]}>
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
                                    <Button type="dashed" shape='circle' style={{ marginLeft: '1rem' }} onClick={() => remove(field.name)} icon={<DeleteOutlined />}>
                                    </Button>
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
                                 >
                                    <TimePicker format={'HH:mm'} placeholder='Введите время' showNow={false} style={{ width: "100%" }} />
                                 </Form.Item>
                                 <Form.Item
                                    {...field}
                                    label="Поел"
                                    name={[field.name, 'eatTime']}
                                 >
                                    <TimePicker format={'HH:mm'} placeholder='Введите время' showNow={false} style={{ width: "100%" }} />
                                 </Form.Item>
                                 <Form.Item
                                    {...field}
                                    label="Сколько поел"
                                    name={[field.name, 'eatAmount']}
                                 >
                                    <InputNumber min={0} step={10} style={{ width: "100%" }} />
                                 </Form.Item>
                                 <Form.Item
                                    {...field}
                                    label="Уснул"
                                    name={[field.name, 'startSleep']}
                                 >
                                    <TimePicker format={'HH:mm'} placeholder='Введите время' showNow={false} style={{ width: "100%" }} />
                                 </Form.Item>
                                 <Button type="dashed" shape='circle' style={{ marginBottom: '1rem' }} onClick={() => remove(field.name)} icon={<DeleteOutlined />}>
                                 </Button>
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
            <Divider />
            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Добавить
               </Button>
            </Form.Item>
         </Form>
      </>
   )
}

export default AddNote