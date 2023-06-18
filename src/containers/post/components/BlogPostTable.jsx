import { Button, Popconfirm, Table, Tag, message } from 'antd'
import { apiBlogPostDelete } from 'api/blogPostAPI'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const BlogPostsTable = ({ current, rows, loading, total, onChangePage }) => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const [rowsData, setRowsData] = useState(rows)

  useEffect(() => {
    setRowsData(rows)
  }, [rows])

  const callApiDeletePost = (id) => {
    apiBlogPostDelete(id)
      .then(() => {
        console.log('rowsData', rowsData)
        const newRowsData = rowsData.filter((row) => row.key !== id)
        setRowsData(newRowsData)

        messageApi.open({
          type: 'success',
          content: 'Xóa bài viết thành công',
        })
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.Detail,
        })
      })
  }

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
          onConfirm={() => callApiDeletePost(record.key)}
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
      {contextHolder}

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
