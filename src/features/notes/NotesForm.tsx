import { Card, Form, Button, Input, DatePicker, Typography, TimePicker, InputNumber } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react'

import { Note } from './notesApiSlice';
import { Todo } from './../todos/todosApiSlice'
import { Activity } from './../activities/activitiesApiSlice'

import moment from 'moment';

const { Title } = Typography

type NotesFormProps = {
   onFinish: (values: any) => void
   note?: Note,
   todos?: Todo[],
   activities?: Activity[],
   cardActions?: React.ReactNode[],
   cardTitle: string,
   submitBtnText: string
}

const NotesForm = ({ onFinish, note, todos, activities, cardActions, cardTitle, submitBtnText }: NotesFormProps) => {
   const createInitialValues = () => {
      if (note) {
         return {
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
         }
      } else return undefined
   }

   return (
      <Card
         hoverable={true}
         bordered={false}
         style={{
            width: '100%',
         }}
         actions={cardActions}
         title={cardTitle}
      >
         <Form
            onFinish={onFinish}
            initialValues={(createInitialValues())}
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
            {/*<Title level={4} className='card-title'>Фото:</Title>
            <PhotoUploader onSetPhoto={onSetPhoto} url={photoUrls[0]} />*/}
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
                  {submitBtnText}
               </Button>
            </Form.Item>
         </Form >
      </Card >
   )
}

export default NotesForm