import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Tag, Space, Popconfirm, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'

const DTag = ({ title, onDelete, onUpdate }) => {
  const [isView, setView] = useState(true)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isView) {
      inputRef.current?.focus()
    }
  }, [isView])

  const handlePressEnter = (e) => {
    setView(true)
    onUpdate(e.target.value)
  }

  return (
    <>
      {isView ? (
        <Tag>
          <Space>
            {title}
            <EditOutlined style={{ cursor: 'pointer' }} onClick={() => setView(false)} />
            <Popconfirm
              title="Xóa nhãn"
              description="Bạn có muốn nhãn này không?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ cursor: 'pointer' }} />
            </Popconfirm>
          </Space>
        </Tag>
      ) : (
        <Input
          ref={inputRef}
          defaultValue={title}
          type="text"
          size="small"
          style={{
            width: 100,
          }}
          onPressEnter={handlePressEnter}
          onBlur={() => setView(true)}
        />
      )}
    </>
  )
}

export default DTag
