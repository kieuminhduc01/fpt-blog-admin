import { UploadOutlined } from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  Form,
  Image,
  Input,
  Select,
  Space,
  Switch,
  Upload,
  message,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { apiTagAll } from 'api/tagAPI'
import DCard from 'components/Base/DCard'
import Editor from 'components/markdownEditor'
import { useEffect, useState } from 'react'
import { blogCategoryType } from 'utils/enum'
import { Link } from 'react-router-dom'

const PostDetailBreadcrumb = () => {
  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      items={[
        {
          title: <Link to="/post">Danh sách bài viết</Link>,
        },
        {
          title: <Link to="">Chi tiết bài viết</Link>,
        },
      ]}
    />
  )
}

const PostDetailContainer = ({ data, mode, onSubmit }) => {
  const [tags, setTags] = useState([])
  const [imageLink, setImageLink] = useState(data?.image)
  const [updateMode, setUpdateMode] = useState(false)

  useEffect(() => {
    apiTagAll().then((res) => {
      const tagsResponse = res.data.result.map((item) => ({
        value: item.id,
        label: item.title,
      }))
      setTags(tagsResponse)
    })
  }, [])

  useEffect(() => {
    setImageLink(data?.image)
  }, [data])

  const handleImageCoverChange = (info) => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      setImageLink(info.file.response.result.src)
      message.success(`tải ảnh ${info.file.name}  thành công`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.response.detail}`)
    }
  }

  const handleImageCoverRemove = () => {}
  const onFinish = (values) => {
    console.log('Success:', { ...values, image: imageLink })
    onSubmit({ ...values, image: imageLink })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <PostDetailBreadcrumb />
      <DCard>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={data}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 4,
              }}
            >
              <Space>
                <Switch
                  checkedChildren="Sửa"
                  unCheckedChildren="Chỉ xem"
                  onChange={(checked) => {
                    setUpdateMode(checked)
                  }}
                  defaultChecked={updateMode}
                />
                <Button disabled={!updateMode} type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Space>
            </Form.Item>
            <Form.Item
              label="Tiêu đề bài viết"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Nhập tiêu đề bài viết!',
                },
              ]}
            >
              <Input disabled={!updateMode} placeholder="Tiêu đề bài viết" />
            </Form.Item>
            <Space style={{ width: '100%' }} direction="vertical">
              <Form.Item
                name="category"
                label="Chủ đề"
                rules={[
                  {
                    required: true,
                    message: 'Chọn chủ đề',
                  },
                ]}
              >
                <Select
                  disabled={!updateMode}
                  style={{ flexGrow: 1 }}
                  onChange={() => {}}
                  options={blogCategoryType.map((item) => ({
                    value: item.key,
                    label: item.title,
                  }))}
                />
              </Form.Item>
              <Form.Item name="tagIds" label="Nhãn">
                <Select
                  disabled={!updateMode}
                  style={{ flexGrow: 1 }}
                  mode="multiple"
                  allowClear
                  placeholder="Lựa chọn nhãn"
                  onChange={() => {}}
                  options={tags}
                />
              </Form.Item>
              <Form.Item
                name="summary"
                label="Tóm tắt bài viết"
                rules={[
                  {
                    required: true,
                    message: 'Chọn chủ đề',
                  },
                ]}
              >
                <TextArea
                  disabled={!updateMode}
                  showCount
                  maxLength={5000}
                  style={{ height: 120, marginBottom: 24 }}
                  onChange={() => {}}
                  placeholder="Tóm tắt bài viết"
                />
              </Form.Item>
            </Space>
            <Form.Item
              name="image"
              label="Chọn ảnh bìa"
              rules={[
                {
                  required: true,
                  message: 'Chọn ảnh bìa',
                },
              ]}
            >
              {imageLink && (
                <Image
                  width={200}
                  alt={data?.title}
                  src={`${process.env.REACT_APP_API_URL}${imageLink}`}
                />
              )}
              <Upload
                disabled={!updateMode}
                showUploadList={false}
                name="file"
                action={`${process.env.REACT_APP_API_URL}api/File/CoverImage`}
                maxCount={1}
                onChange={handleImageCoverChange}
                onRemove={handleImageCoverRemove}
              >
                <Button icon={<UploadOutlined />}> Chọn tệp</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="content"
              label="Nội dung bài viết"
              rules={[
                {
                  required: true,
                  message: 'Nhập nội dung bài viết',
                },
              ]}
            >
              <Editor disabled={!updateMode} />
            </Form.Item>
          </Space>
        </Form>
      </DCard>
    </>
  )
}

export default PostDetailContainer
