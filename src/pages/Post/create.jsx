import { message } from 'antd'
import { apiBlogPostCreate } from 'api/blogPostAPI'
import PostDetailContainer from 'containers/post/Detail'
import { POST_DETAIL_MODE } from 'utils/enum'

const PostCreatePage = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const handleSubmit = (value) => {
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
  }

  return (
    <>
      {contextHolder}
      <PostDetailContainer onSubmit={handleSubmit} mode={POST_DETAIL_MODE.CREATE} />
    </>
  )
}

export default PostCreatePage
