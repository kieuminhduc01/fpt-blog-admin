import { EyeOutlined, HeartOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Input, Select, Space, Upload, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { apiTagAll } from 'api/tagAPI'
import DCard from 'components/Base/DCard'
import Editor from 'components/markdownEditor'
import { useEffect, useState } from 'react'
import { blogCategoryType } from 'utils/enum'

const uploadProps = {
  name: 'file',
  action: `${process.env.REACT_APP_API_URL}api/File/CoverImage`,
  maxCount: 1,
}

const PostDetailContainer = () => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    apiTagAll().then((res) => {
      const tagsResponse = res.data.result.map((item) => ({
        value: item.id,
        label: item.title,
      }))
      setTags(tagsResponse)
    })
  }, [])

  const handleImageCoverChange = (info) => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`tải ảnh ${info.file.name}  thành công`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.response.detail}`)
    }
  }

  const handleImageCoverRemove = () => {}

  return (
    <DCard>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <div>
          <Checkbox>Chế độ sửa</Checkbox>
          <Button>Lưu</Button>
        </div>
        <Input placeholder="Tiêu đề bài viết" />
        <Space size="large">
          <div>
            <EyeOutlined /> 10 lượt xem
          </div>
          <div>
            <HeartOutlined /> 10 lượt thích
          </div>
        </Space>
        <Space style={{ width: '100%' }} direction="vertical">
          <div style={{ width: '100%', display: 'flex' }}>
            <span style={{ marginRight: '10px' }}>Chủ đề:</span>
            <Select
              defaultValue={blogCategoryType[0].key}
              style={{ flexGrow: 1 }}
              onChange={() => {}}
              options={blogCategoryType.map((item) => ({
                value: item.key,
                label: item.title,
              }))}
            />
          </div>
          <div style={{ width: '100%', display: 'flex' }}>
            <span style={{ marginRight: '10px' }}>Nhãn :</span>
            <Select
              style={{ flexGrow: 1 }}
              mode="multiple"
              allowClear
              placeholder="Lựa chọn nhãn"
              onChange={() => {}}
              options={tags}
            />
          </div>
          <div>
            <div style={{ marginBottom: '10px' }}>Tóm tắt bài viết :</div>
            <TextArea
              showCount
              maxLength={5000}
              style={{ height: 120, marginBottom: 24 }}
              onChange={() => {}}
              placeholder="Tóm tắt bài viết"
            />
          </div>
        </Space>
        <Upload
          {...uploadProps}
          onChange={handleImageCoverChange}
          onRemove={handleImageCoverRemove}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Editor />
      </Space>
    </DCard>
  )
}

export default PostDetailContainer
