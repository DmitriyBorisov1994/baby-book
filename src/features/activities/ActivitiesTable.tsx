import { Table, Typography } from 'antd'
import React from 'react'
import { Activity, selectActivitiesByNoteId } from './activitiesApiSlice'
import { useAppSelector } from '../../app/hooks'


type ActivitiesTableProps = {
   noteId: string,
}

const { Paragraph, Text } = Typography

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({ noteId }) => {

   const activities = useAppSelector((state) => selectActivitiesByNoteId(state, noteId)) as Activity[]

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

   if (!activities?.length) return <Paragraph><Text type='secondary'>Вы не отмечали активность </Text></Paragraph>

   return (
      <Table scroll={{ x: true }} pagination={false} dataSource={dataSource} columns={columns} />
   )
}

export default ActivitiesTable