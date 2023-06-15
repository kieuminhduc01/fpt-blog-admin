import { EyeOutlined, HeartOutlined } from '@ant-design/icons'
import { Button, Checkbox, Image, Input, Select, Space } from 'antd'
import { apiTagAll } from 'api/tagAPI'
import DCard from 'components/Base/DCard'
import Editor from 'components/markdownEditor'
import { useEffect, useState } from 'react'

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
        <div>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Lựa chọn nhãn"
            onChange={() => {}}
            options={tags}
          />
        </div>
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Space>
      <Editor />
    </DCard>
  )
}

export default PostDetailContainer
