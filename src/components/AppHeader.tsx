import React from 'react'
import { Layout, Menu, Typography } from 'antd';
import { HomeOutlined, ContainerOutlined, IdcardOutlined, LogoutOutlined } from '@ant-design/icons';
import './AppHeader.less'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logOut, selectCurrentToken } from '../features/auth/authSlice';

const { Header } = Layout;
//const { Title } = Typography;


const AppHeader: React.FC = () => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const userToken = useAppSelector(selectCurrentToken)

   return (
      <Header className='header'>
         <div className="header-logo">
            <img className="header-pic" src={require('./../images/baby.png')} />
            <h1 className='header-title'>Baby Book</h1>
         </div>
         <Menu
            theme="dark"
            mode="horizontal"
         >
            <Menu.Item key="home" icon={<HomeOutlined />} disabled={!userToken}>
               <Link to={'/home'}>Домашняя</Link>
            </Menu.Item>
            <Menu.Item key="notes" icon={<ContainerOutlined />} disabled={!userToken}>
               <Link to={'/notes'}>Заметки</Link>
            </Menu.Item>
            <Menu.Item key="posts" icon={<IdcardOutlined />} disabled={!userToken}>
               <Link to={'/posts'}>Посты</Link>
            </Menu.Item>
            {!!userToken && <Menu.Item key="logout" icon={<LogoutOutlined />}>
               <span onClick={() => {
                  dispatch(logOut())
                  navigate('/')
               }}>Выйти</span>
            </Menu.Item>}
         </Menu>
      </Header>
   )
}

export default AppHeader