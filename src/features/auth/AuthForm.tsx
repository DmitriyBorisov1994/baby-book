import { Form, Input, Button, Divider, Segmented, Card, Row } from 'antd'
import React, { useState } from 'react'
import { SegmentedValue } from 'antd/lib/segmented';
import { AuthQueryArg, useSignInMutation, useSignUpMutation } from './authApiSlice';
import { useAppDispatch } from '../../app/hooks';
import { setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {

   const [form, setForm] = useState<SegmentedValue>('signIn')

   const [signIn, { isLoading: isSignInLoading, isError: isSignInError }] = useSignInMutation()
   const [signUp, { isLoading: isSignUpLoading, isError: isSignUpError }] = useSignUpMutation()

   const dispatch = useAppDispatch()

   const navigate = useNavigate()

   return (
      <Card className='custom-box-shadow'>
         <Row justify='center'>
            <Segmented
               size='large'
               options={[{ label: 'Войти', value: 'signIn' }, { label: 'Зарегистрироваться', value: 'signUp' }]}
               value={form}
               onChange={(value: SegmentedValue) => setForm(value)}
            />
         </Row>
         <Divider />
         <h1>Тестовые логин и пароль</h1>
         <div>Логин: test@gmail.com</div>
         <div>Пароль: 12345678Test!</div>
         <Divider />
         <Form
            layout="vertical"
            onFinish={async (values: AuthQueryArg) => {
               let userData: any
               if (form === 'signIn') {
                  userData = await signIn(values)
               } else {
                  userData = await signUp(values)
               }
               console.log(userData)
               const { userEmail, userId, userToken } = userData.data
               dispatch(setCredentials({ userEmail, userId, userToken }))
               navigate('/notes')
            }}
         >
            <Form.Item
               name="email"
               label="E-mail:"
               rules={[
                  {
                     type: 'email',
                     message: 'The input is not valid E-mail!',
                  },
                  {
                     required: true,
                     message: 'Пожалуйста, введите e-mail!',
                  },
               ]}
            >
               <Input placeholder="Введите e-mail" />
            </Form.Item>
            <Form.Item
               label="Пароль:"
               name="password"
               rules={[
                  {
                     required: true,
                     message: "Пожалуйста, введите пароль!",
                  },
                  {
                     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
                     message:
                        "Пароль должен содержать покрайней мере одну строчную букву, одну заглавную букву, одну цифру и один из символов: !@#$%. От 8ми до 24х символов.",
                  },
               ]}
            >
               <Input.Password placeholder="Введите пароль" />
            </Form.Item>
            {form === 'signUp' &&
               <Form.Item
                  label="Подтвердите пароль"
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                     {
                        required: true,
                        message: "Подтвердите пароль!",
                     },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(new Error("Пароли не совпадают!"));
                        },
                     }),
                  ]}>
                  <Input.Password />
               </Form.Item>
            }
            <Form.Item>
               <Button
                  type='primary'
                  htmlType="submit"
                  loading={form === 'signIn' ? isSignInLoading : isSignUpLoading}
               >
                  {form === 'signIn' ? 'Войти' : 'Зарегистрироваться'}
               </Button>
            </Form.Item>
         </Form >
      </Card>
   )
}

export default AuthForm