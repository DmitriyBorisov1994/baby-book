import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCurrentToken } from '../features/auth/authSlice'
import { Col, Row, Typography } from 'antd';
import './AppPublic.less'

const { Title, Paragraph, Text } = Typography;

const AppPublic: React.FC = () => {

   const token = useAppSelector(selectCurrentToken)

   return (
      <Row>
         <Col md={16}>
            <h3 className='public-title'>Добро пожаловать на <Text className='public-logo'>Baby Book</Text></h3>
            <Paragraph>Здесь вы сможете вести дневник активности вашего малыша, отмечать его успехи и достижения, а также отмечать список дел</Paragraph>
            {!token && <Link to='auth'>Войдите в свой аккаунт или зарегистрируйтесь</Link>}
            {token && <Paragraph>Перейдите в ваши <Link to='/notes'>заметки</Link> или <Link to='/add'>создайте новую</Link></Paragraph>}
         </Col>
         <Col md={8}><img style={{ width: '100%', transform: 'rotate(3deg)' }} src={require('./../images/family.png')} /></Col>
      </Row>
   )
}

export default AppPublic