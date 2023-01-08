import React from 'react'
import { Layout, Menu, Row, Col, Image } from 'antd';
import { HomeOutlined, ContainerOutlined, IdcardOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logOut, selectCurrentToken } from '../features/auth/authSlice';

const { Header } = Layout;

const AppHeader: React.FC = () => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const userToken = useAppSelector(selectCurrentToken)

   return (
      <Header className='header'>
         <Row justify='space-between'>
            <Col xs={12}>
               <Row wrap={false}>
                  <Col><Image preview={false} height={64} src={require('./../images/baby.png')} /></Col>
                  <Col><h1 className='header-title'>Baby Book</h1></Col>
               </Row>
            </Col>
            <Col xs={12}>
               <Row justify='end'>
                  <Col>
                     <Menu
                        theme="dark"
                        mode="horizontal"
                     >
                        <Menu.Item key="home" icon={<HomeOutlined />} disabled={!userToken}>
                           <Link to={'/'}>Домашняя</Link>
                        </Menu.Item>
                        <Menu.Item key="notes" icon={<ContainerOutlined />} disabled={!userToken}>
                           <Link to={'/notes'}>Заметки</Link>
                        </Menu.Item>
                        <Menu.Item key="posts" icon={<IdcardOutlined />} disabled={!userToken}>
                           <Link to={'/add'}>Добавить новую заметку</Link>
                        </Menu.Item>
                        {!!userToken && <Menu.Item key="logout" icon={<LogoutOutlined />}>
                           <span onClick={() => {
                              dispatch(logOut())
                              navigate('/')
                           }}>Выйти</span>
                        </Menu.Item>}
                     </Menu>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Header>
   )
}

export default AppHeader