import { Card, Form, Button, Input, DatePicker, Typography, TimePicker, InputNumber, Upload, message, Image } from 'antd';
import { DeleteOutlined, PlusOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState, useMemo } from 'react'

import { Note } from './notesApiSlice';
import { Todo } from './../todos/todosApiSlice'
import { Activity } from './../activities/activitiesApiSlice'

import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import moment from 'moment';
import { firebaseUploadPhoto } from '../photos/firebasePhotos';



const { Title, Text } = Typography
const { Dragger } = Upload;

type NotesFormProps = {
   onFinish: (values: any) => void,
   onDeleteNoteClick?: (noteId: string) => Promise<void>,
   onBackClick?: (prevUrl: string | undefined, currentUrl: string | undefined, path: string | undefined) => Promise<void>,
   note?: Note,
   todos?: Todo[],
   activities?: Activity[],
   formAction: string,
}

const NotesForm = ({ onFinish, note, todos, activities, formAction, onDeleteNoteClick, onBackClick }: NotesFormProps) => {

   const [imageUrl, setimageUrl] = useState<string | undefined>(note?.imageUrl)
   const [loading, setLoading] = useState<boolean>(false);

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

   const beforeUpload = (file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
         message.error('Вы можете загружать только изображения формата JPG/PNG!');
      }
      const isLt6M = file.size / 1024 / 1024 < 6;
      if (!isLt6M) {
         message.error('Размер картинки превышает 6MB!');
      }
      return isJpgOrPng && isLt6M;
   };

   const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {

      if (info.file.status === 'uploading') {
         setLoading(true);
         return;
      }
      if (info.file.status === 'done') {
         setLoading(false)
      }
   };

   const normFile = (e: any) => {
      return e?.file.response;
   };

   const uploadButton = (
      <div>
         {loading ? <LoadingOutlined /> : <PlusOutlined />}
         <div style={{ marginTop: 8 }}>Загрузить</div>
      </div>
   );

   const cardActions = useMemo((): React.ReactNode[] | undefined =>
      formAction === 'edit'
         ?
         [<div className='card-actionsWrapper'
            onClick={() => {
               if (note && onDeleteNoteClick) {
                  onDeleteNoteClick(note.noteId)
               }
            }}
         >
            <DeleteOutlined key="delete" />
            <Text>Удалить</Text>
         </div>,
         <div className='card-actionsWrapper'
            onClick={() => {
               if (note && onBackClick) onBackClick(note.imageUrl, imageUrl, note?.imagePath)
            }}
         >
            <EditOutlined key="edit" />
            <Text>Назад</Text>
         </div>,
         ]
         :
         undefined,
      [formAction])

   return (
      <Card
         hoverable={true}
         bordered={false}
         style={{
            width: '100%',
         }}
         actions={cardActions}
         title={formAction === 'edit' ? 'Отредактируйте заметку' : 'Добавить заметку'}
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
            <Form.Item name='dragger' valuePropName='file' getValueFromEvent={normFile}>
               <Dragger
                  multiple={false}
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  customRequest={async ({ onError, onSuccess, file, filename }) => {
                     const fileToUpload = file as RcFile
                     const url = await firebaseUploadPhoto(fileToUpload, `${fileToUpload.uid}`)
                     if (onSuccess && url) onSuccess({ url, filePath: fileToUpload.uid })
                     setimageUrl(url)
                  }}
               >
                  {imageUrl ? <Image preview={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
               </Dragger>
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
                  {formAction === 'edit' ? 'Сохранить изменения' : 'Добавить'}
               </Button>
            </Form.Item>
         </Form >
      </Card >
   )
}

export default NotesForm