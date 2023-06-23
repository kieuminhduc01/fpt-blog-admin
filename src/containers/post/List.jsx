import { Breadcrumb, Button, Col, Input, Row, Select, Tabs, message } from 'antd'
import { apiBlogPostDelete, apiBlogPostPaging } from 'api/blogPostAPI'
import { apiTagAll } from 'api/tagAPI'
import DCard from 'components/Base/DCard'
import BlogPostsTable from 'containers/post/components/BlogPostTable'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PostListBreadcrumb = () => {
  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      items={[
        {
          title: <Link to="/post">Danh sách bài viết</Link>,
        },
      ]}
    />
  )
}

const PostListContainer = () => {
  const DEFAULT_PAGE = 1
  const PER_PAGE = 5
  const [messageApi, contextHolder] = message.useMessage()

  const [blogPosts, setBlogPosts] = useState({
    currentPage: DEFAULT_PAGE,
    total: 0,
    rows: [],
    keyWord: '',
    categoryIds: ['GrowingInThePRWorld'],
    tagIds: [],
  })

  const [tags, setTags] = useState([])

  const [loading, setLoading] = useState(false)

  const callApiBlogPostPaging = (query) => {
    setLoading(true)

    const data = {
      currentPage: query.currentPage,
      perPage: PER_PAGE,
      keyWord: query.keyWord,
      filter: {
        categoryIds: query.categoryIds,
        tagIds: query.tagIds,
      },
      shortBy: {
        title: 'Created',
        isIncrease: false,
      },
    }

    apiBlogPostPaging(data)
      .then((result) => {
        const rows = result.data.result.items.map((item) => ({
          key: item.id,
          likes: item.likes,
          summary: item.summary,
          title: item.title,
          views: item.views,
          tags: item.tags.map((tag) => tag.title),
          slug: item.slug,
        }))
        setBlogPosts((pre) => ({ ...pre, rows, total: result.data.result.total }))
      })
      .finally(() => setLoading(false))
  }

  const callApiTagAll = () => {
    apiTagAll().then((result) => {
      var newTagsSate = result.data.result.map((item) => ({
        value: item.id,
        label: item.title,
      }))
      setTags(newTagsSate)
    })
  }

  useEffect(() => {
    callApiBlogPostPaging(blogPosts)
    callApiTagAll()
  }, [])

  const handleChangeTab = (key) => {
    switch (key) {
      case 'growing-in-the-pr-world': {
        const newBlogPostSate = {
          ...blogPosts,
          categoryIds: ['GrowingInThePRWorld'],
          currentPage: DEFAULT_PAGE,
        }
        setBlogPosts(newBlogPostSate)

        callApiBlogPostPaging(newBlogPostSate)
        break
      }
      case 'see-think-share': {
        const newBlogPostSate = {
          ...blogPosts,
          categoryIds: ['SeeThinkShare'],
          currentPage: DEFAULT_PAGE,
        }
        setBlogPosts(newBlogPostSate)

        callApiBlogPostPaging(newBlogPostSate)
        break
      }
      case 'my-corner': {
        const newBlogPostSate = {
          ...blogPosts,
          categoryIds: ['MyCorner'],
          currentPage: DEFAULT_PAGE,
        }
        setBlogPosts(newBlogPostSate)

        callApiBlogPostPaging(newBlogPostSate)
        break
      }
      default: {
        break
      }
    }
  }

  const callApiDeletePost = (id) => {
    apiBlogPostDelete(id)
      .then(() => {
        callApiBlogPostPaging(blogPosts)
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
  const handleSelectTag = (value) => {
    var newBlogPostsSate = {
      ...blogPosts,
      tagIds: value,
      currentPage: DEFAULT_PAGE,
    }
    setBlogPosts(newBlogPostsSate)

    callApiBlogPostPaging(newBlogPostsSate)
  }

  const handleSearch = (value) => {
    const newBlogPostState = { ...blogPosts, keyWord: value.trim(), currentPage: DEFAULT_PAGE }
    setBlogPosts(newBlogPostState)

    callApiBlogPostPaging(newBlogPostState)
  }

  const handleChangePage = (value) => {
    const newBlogPostsState = { ...blogPosts, currentPage: value }
    setBlogPosts(newBlogPostsState)

    callApiBlogPostPaging(newBlogPostsState)
  }

  const navigate = useNavigate()

  return (
    <>
      {contextHolder}

      <PostListBreadcrumb />
      <DCard>
        <Row>
          <Col span={8}>
            <Button
              onClick={() => {
                navigate('/post/create')
              }}
            >
              Thêm
            </Button>
          </Col>
          <Col span={16}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '50%' }}
              placeholder="Lựa chọn nhãn"
              onChange={handleSelectTag}
              options={tags}
            />
            <Input.Search
              allowClear
              placeholder="Nhập từ khóa"
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
          </Col>
        </Row>

        <Tabs
          defaultActiveKey="growing-in-the-pr-world"
          onChange={handleChangeTab}
          items={[
            {
              label: `Growing in the PR world`,
              key: 'growing-in-the-pr-world',
              children: (
                <BlogPostsTable
                  current={blogPosts.currentPage}
                  rows={blogPosts?.rows ?? []}
                  loading={loading}
                  total={blogPosts.total}
                  onChangePage={handleChangePage}
                  onDelete={callApiDeletePost}
                />
              ),
            },
            {
              label: `See think share`,
              key: 'see-think-share',
              children: (
                <BlogPostsTable
                  current={blogPosts.currentPage}
                  rows={blogPosts?.rows ?? []}
                  loading={loading}
                  total={blogPosts.total}
                  onChangePage={handleChangePage}
                  onDelete={callApiDeletePost}
                />
              ),
            },
            {
              label: `My Corner`,
              key: 'my-corner',
              children: (
                <BlogPostsTable
                  current={blogPosts.currentPage}
                  rows={blogPosts?.rows ?? []}
                  loading={loading}
                  total={blogPosts.total}
                  onChangePage={handleChangePage}
                  onDelete={callApiDeletePost}
                />
              ),
            },
          ]}
        />
      </DCard>
    </>
  )
}

export default PostListContainer
