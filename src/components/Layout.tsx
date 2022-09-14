import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import './Layout.less'
import { Content } from 'antd/lib/layout/layout';

const Layout: React.FC = () => {
   return (
      <div className='appWrapper'>
         <AppHeader />
         <Content className='appContent'>
            <Outlet />
         </Content>
      </div>
   )
}

export default Layout