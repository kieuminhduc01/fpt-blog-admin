import { apiTagAll, apiTagDelete, apiTagPut } from 'api/tagAPI'
import DTag from 'components/Base/DTag'
import { useEffect, useRef, useState } from 'react'
import { Card, Input, Tag, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const TagSetupBlock = () => {
  const [tags, setTags] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  const [isInputNewTag, setIsInputNewTag] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    apiTagAll()
      .then((res) => {
        setTags(res.data.result)
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.Detail,
        })
      })
  }, [])

  useEffect(() => {
    if (isInputNewTag) {
      inputRef.current?.focus()
    }
  }, [isInputNewTag])

  const handleDeleteTag = (id) => {
    const data = {
      tagId: id,
    }

    apiTagDelete(data)
      .then((res) => {
        setTags((pre) => pre.filter((item) => item.id !== id))

        messageApi.open({
          type: 'success',
          content: 'Xóa nhãn thành công',
        })
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.Detail,
        })
      })
  }

  const handleUpdateTag = (data) => {
    apiTagPut(data)
      .then((res) => {
        setTags((pre) =>
          pre.map((tag) => {
            if (tag.id === data.id) {
              return data
            }
            return tag
          }),
        )
        messageApi.open({
          type: 'success',
          content: 'Cập nhật nhãn thành công',
        })
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.Detail,
        })
      })
  }

  return (
    <Card size="small" title="Cài đặt nhãn">
      {contextHolder}
      {tags.map((item) => (
        <DTag
          key={item.id}
          onDelete={() => handleDeleteTag(item.id)}
          onUpdate={(value) =>
            handleUpdateTag({
              id: item.id,
              title: value,
            })
          }
          title={item.title}
        />
      ))}
      {isInputNewTag ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            width: 100,
          }}
          // onPressEnter={handlePressEnter}
          onBlur={() => setIsInputNewTag(false)}
        />
      ) : (
        <Tag
          onClick={() => {
            setIsInputNewTag(true)
          }}
          style={{ borderStyle: 'dashed', cursor: 'pointer' }}
        >
          <PlusOutlined /> Thêm nhãn
        </Tag>
      )}
    </Card>
  )
}

export default TagSetupBlock
