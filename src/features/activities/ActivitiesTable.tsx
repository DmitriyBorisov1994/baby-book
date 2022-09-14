import { Table } from 'antd'
import React from 'react'


const ActivitiesTable = () => {

   const columns = [
      {
         title: 'Поел',
         dataIndex: 'eat',
         key: 'eat',
      },
      {
         title: 'Уснул',
         dataIndex: 'startSleep',
         key: 'startSleep',
      },
      {
         title: 'Проснулся',
         dataIndex: 'endSleep',
         key: 'endSleep',
      },
   ];

   const dataSource = [
      {
         key: '1',
         eat: '15:00',
         startSleep: '21:00',
         endSleep: '24:00',
      },
      {
         key: '2',
         eat: '12:00',
         startSleep: '17:00',
         endSleep: '18:30',
      },
   ];

   return (
      <div>
         <Table pagination={false} dataSource={dataSource} columns={columns} />
      </div>
   )
}

export default ActivitiesTable