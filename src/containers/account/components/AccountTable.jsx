import { useEffect, useState } from 'react'

const { Table } = require('antd')


const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tên đăng nhập',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Link web',
    dataIndex: 'linkWeb',
    key: 'linkWeb',
    render: (text) => (
      <a target="blank" href={text}>
        {text}
      </a>
    ),
  },
]

const AccountTable = ({ rows, loading, total, current, onChangePage }) => {
  const [rowsData, setRowsData] = useState(rows)

  useEffect(() => {
    console.log('rowsData', rowsData)
    setRowsData(rows)
  }, [rows])

  return (
    <Table
      scroll={{ x: 1500 }}
      columns={columns}
      loading={loading}
      dataSource={rowsData}
      pagination={{ defaultCurrent: 1, total: total, pageSize: 5, current: current }}
      onChange={({ current }) => onChangePage(current ?? 1)}
    />
  )
}

export default AccountTable
