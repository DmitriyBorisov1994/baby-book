import { Table } from 'antd'
import React from 'react'


const ActivitiesTable = () => {

   const columns = [
      {
         title: 'Проснулся',
         dataIndex: 'endSleep',
         key: 'endSleep',
      },
      {
         title: 'Поел',
         dataIndex: 'eat',
         key: 'eat',
      },
      {
         title: 'Сколько поел',
         dataIndex: 'eatAmount',
         key: 'eatAmount',
      },
      {
         title: 'Уснул',
         dataIndex: 'startSleep',
         key: 'startSleep',
      },
   ];

   const dataSource = [
      {
         key: '1',
         eat: '15:00',
         eatAmount: '150мл',
         startSleep: '21:00',
         endSleep: '24:00',
      },
      {
         key: '2',
         eat: '12:00',
         eatAmount: '150мл',
         startSleep: '17:00',
         endSleep: '18:30',
      },
   ];

   return (
      <div>
         <Table scroll={{ x: true }} pagination={false} dataSource={dataSource} columns={columns} />
      </div>
   )
}

export default ActivitiesTable