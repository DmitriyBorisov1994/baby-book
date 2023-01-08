import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCurrentToken } from '../features/auth/authSlice'
import { Col, Row, Typography, Image } from 'antd';

const { Title, Paragraph, Text } = Typography;

const AppPublic: React.FC = () => {

   const token = useAppSelector(selectCurrentToken)

   return (
      <Row justify='center' align='middle' className='mh100 public_wrapper' style={{ backgroundColor: 'white' }}>
         <Col xs={{ span: 24, order: 2 }} md={{ span: 16, order: 1 }} className='public_cols'>
            <Title level={1} style={{ textAlign: 'center' }}><Text type='secondary'>Добро пожаловать на Baby Book</Text></Title>
            <Paragraph><Text type='secondary'>Здесь вы сможете вести дневник активности вашего малыша, отмечать его успехи и достижения, а также отмечать список дел</Text></Paragraph>
         </Col>
         <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 2 }}><Image preview={false} style={{ width: '100%' }} src={require('./../images/family.png')} /></Col>
         <Col xs={{ span: 24, order: 3 }}>
            {!token &&
               <Row justify='center'><Paragraph><Link to='auth'>Войдите в свой аккаунт или зарегистрируйтесь</Link></Paragraph></Row>}
            {token &&
               <Row justify='center' align='middle' style={{ backgroundColor: 'white' }}>
                  <Col xs={{ span: 24, order: 2 }} md={{ span: 8, order: 1 }} className='public_cols'>
                     <Link to='/notes'>
                        <Image preview={false} src={require('./../images/notes.png')} className='public_link custom-box-shadow' />
                     </Link>
                  </Col>
                  <Col xs={{ span: 24, order: 1 }} md={{ span: 16, order: 2 }} className='public_cols'>
                     <Paragraph style={{ textAlign: 'center' }}><Text type='secondary'>Перейдите в Ваши заметки...</Text></Paragraph>
                  </Col>
                  <Col xs={{ span: 24, order: 3 }} md={{ span: 16, order: 3 }} className='public_cols'>
                     <Paragraph style={{ textAlign: 'center' }}><Text type='secondary'>...или создайте новую</Text></Paragraph>
                  </Col>
                  <Col xs={{ span: 24, order: 4 }} md={{ span: 8, order: 4 }} className='public_cols'>
                     <Link to='/add'>
                        <Image preview={false} src={require('./../images/addNote.png')} className='public_link custom-box-shadow' />
                     </Link>
                  </Col>
               </Row>}
         </Col>
      </Row>
   )
}

export default AppPublic