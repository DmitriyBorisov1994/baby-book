import { Form, Input, Button, Divider, Segmented } from 'antd'
import React, { useState } from 'react'
import './AuthForm.less'
import { SegmentedValue } from 'antd/lib/segmented';
import { AuthQueryArg, useSignInMutation, useSignUpMutation } from './authApiSlice';
import { useAppDispatch } from '../../app/hooks';
import { setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {

   const [form, setForm] = useState<SegmentedValue>('signIn')

   const [signIn, { isLoading: isSignInLoading }] = useSignInMutation()
   const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation()

   const dispatch = useAppDispatch()

   const navigate = useNavigate()

   return (
      <div className='form-wrapper'>
         <div className='form-select'>
            <Segmented
               size='large'
               options={[{ label: 'Войти', value: 'signIn' }, { label: 'Зарегистрироваться', value: 'signUp' }]}
               value={form}
               onChange={(value: SegmentedValue) => setForm(value)}
            />
         </div>
         <Divider />
         <h1>Тестовые логин и пароль</h1>
         <p>Логин: test@gmail.com</p>
         <p>Пароль: 12345678Test!</p>
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
               navigate('/home')
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
            {form === 'signIn' &&
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
               >
                  {form === 'signIn' ? 'Войти' : 'Зарегистрироваться'}
               </Button>
            </Form.Item>
         </Form >

      </div>
   )
}

export default AuthForm