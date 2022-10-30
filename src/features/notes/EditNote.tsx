import React from 'react'
import { Note } from './notesApiSlice';
import { Typography, Card, Collapse, Form, Input, DatePicker, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Activity } from './../activities/activitiesApiSlice'
import { Todo } from './../todos/todosApiSlice'

type EditNoteProps = {
   note: Note,
   todos?: Todo[],
   activities?: Activity[],
}

const { Meta } = Card;
const { Paragraph, Title } = Typography;
const { Panel } = Collapse;

const EditNote: React.FC<EditNoteProps> = ({ note, todos, activities }) => {
   console.log(activities)
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
            <div className='card-actionsWrapper'
               onClick={() => { }}
            >
               <DeleteOutlined key="delete" />
               <span>Удалить</span>
            </div>,
            <div className='card-actionsWrapper'
               onClick={() => { }}
            >
               <EditOutlined key="edit" />
               <span>Назад</span>
            </div>,
         ]}
      >
         <Form
            onFinish={(values: any) => {
               console.log('Success:', values);
               console.log(values.date.format('DD/MM/YYYY'))
            }}
            initialValues={{
               ...note,
               date: moment(note.noteDateString, 'DD/MM/YYYY'),
               todos: todos?.map(todo => todo.text),
               activities: activities?.map(act => act)
            }}
         >
            <Form.Item name={"title"}>
               <Input placeholder="Введите заголовок" />
            </Form.Item>
            <Form.Item name={"date"}>
               <DatePicker
                  placeholder="Введите дату поста"
                  onChange={() => { }}
                  format='DD/MM/YYYY'
                  style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={"text"}>
               <Input.TextArea placeholder="Введите текст" />
            </Form.Item>
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
            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Добавить
               </Button>
            </Form.Item>
         </Form >
      </Card >
   )
}

export default EditNote