import { RedoOutlined } from '@ant-design/icons'
import { Spin, message } from 'antd'
import { apiBlogPostCreate } from 'api/blogPostAPI'
import PostDetailContainer from 'containers/post/Detail'
import { useState } from 'react'
import { POST_DETAIL_MODE } from 'utils/enum'

const PostCreatePage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (value) => {
    setLoading(true)
    apiBlogPostCreate(value)
      .then((res) => {
        messageApi.open({
          type: 'success',
          content: 'Thêm mới thành công',
        })
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err?.response?.data?.Detail,
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <PostDetailContainer onSubmit={handleSubmit} mode={POST_DETAIL_MODE.CREATE} />
      </Spin>
    </>
  )
}

export default PostCreatePage
