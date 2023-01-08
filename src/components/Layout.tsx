import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import { Content } from 'antd/lib/layout/layout';
import { Layout as AntdLayout } from 'antd'

const Layout: React.FC = () => {
   return (
      <AntdLayout className='appWrapper'>
         <AppHeader />
         <Content className='appContent'>
            <Outlet />
         </Content>
      </AntdLayout>
   )
}

export default Layout