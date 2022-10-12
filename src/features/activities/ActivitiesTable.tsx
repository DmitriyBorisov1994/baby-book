import { Table } from 'antd'
import React from 'react'
import { Activity } from './activitiesApiSlice'


type ActivitiesTableProps = {
   activities: Activity[],
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({ activities }) => {
   console.log(activities)

   const columns = [
      {
         title: 'Проснулся',
         dataIndex: 'endSleep',
         key: 'endSleep',
      },
      {
         title: 'Поел',
         dataIndex: 'eatTime',
         key: 'eatTime',
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

   const dataSource = activities

   return (
      <div>
         <Table scroll={{ x: true }} pagination={false} dataSource={dataSource} columns={columns} />
      </div>
   )
}

export default ActivitiesTable