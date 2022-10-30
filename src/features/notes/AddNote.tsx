import React from 'react'
import { Typography, Input, Row, Col, DatePicker, Divider, Form, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
const { Title } = Typography

const AddNote = () => {
   return (
      <Form
         onFinish={(values: any) => {
            console.log('Success:', values);
            console.log(values.date.format('DD/MM/YYYY'))
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
               <Form.Item>
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
               <Form.List name="actvities">
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