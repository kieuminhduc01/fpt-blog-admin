import { message } from 'antd'
import { apiBlogPostGetBySlug, apiBlogPostPatch } from 'api/blogPostAPI'
import PostDetailContainer from 'containers/post/Detail'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { POST_DETAIL_MODE } from 'utils/enum'

const PostDetailPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { slug } = useParams()
  const [postData, setPostData] = useState()
  const [loading, setLoading] = useState()
  const [postId, setPostId] = useState('')

  const handleSubmit = (value) => {
    const data = { ...value, id: postId }
    apiBlogPostPatch(data)
      .then((res) => {
        messageApi.open({
          type: 'success',
          content: 'Cập nhật bài viết thành công',
        })
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.Detail,
        })
      })
  }

  useEffect(() => {
    setLoading(true)
    apiBlogPostGetBySlug(slug)
      .then((res) => {
        const data = {
          title: res.data.result.title,
          category: res.data.result.category,
          tagIds: res.data.result.tags.map((item) => item.id),
          summary: res.data.result.summary,
          image: res.data.result.image,
          content: res.data.result.content,
        }
        setPostId(res.data.result.id)
        setPostData(data)
        setLoading(false)
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.Detail,
        })
      })
  }, [slug])

  return (
    <>
      {contextHolder}
      {loading ? (
        <div>loading</div>
      ) : (
        <PostDetailContainer
          data={postData}
          onSubmit={handleSubmit}
          mode={POST_DETAIL_MODE.UPDATE}
        />
      )}
    </>
  )
}

export default PostDetailPage
