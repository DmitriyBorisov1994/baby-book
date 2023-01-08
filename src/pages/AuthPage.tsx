import React from 'react'
import { Row, Col } from 'antd'
import AuthForm from '../features/auth/AuthForm'

const AuthPage = () => {
   return (
      <Row justify='center' align='middle' className='mh100'>
         <Col xs={24} md={12}><AuthForm /></Col>
      </Row>
   )
}

export default AuthPage