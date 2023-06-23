import { Button, Popconfirm, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogPostsTable = ({ current, rows, loading, total, onChangePage, onDelete }) => {
  const navigate = useNavigate()
  const [rowsData, setRowsData] = useState(rows)

  useEffect(() => {
    setRowsData(rows)
  }, [rows])

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      render: (text, record) => (
        <div
          style={{
            color: '#1677ff',
            cursor: 'pointer',
          }}
          onClick={() => {
            console.log(record)
            navigate(`${record.slug}`)
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: '10%',
    },
    {
      title: 'Lượt yêu thích',
      dataIndex: 'likes',
      key: 'likes',
      width: '10%',
    },
    {
      title: 'Giới thiệu',
      dataIndex: 'summary',
      key: 'summary',
      width: '30%',
    },
    {
      title: 'Nhãn',
      key: 'tags',
      dataIndex: 'tags',
      width: '20%',

      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Xóa bài viết"
          description="Bạn có muốn xóa bài viết này không?"
          onConfirm={() => onDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" danger>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <>
      <Table
        scroll={{ x: 1500 }}
        columns={columns}
        dataSource={rowsData}
        loading={loading}
        pagination={{ defaultCurrent: 1, total: total, pageSize: 5, current: current }}
        onChange={({ current }) => onChangePage(current ?? 1)}
      />
    </>
  )
}

export default BlogPostsTable
