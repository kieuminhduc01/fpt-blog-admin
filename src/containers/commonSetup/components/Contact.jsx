import { Card, Input, Space } from 'antd'

const ContactBlock = () => {
  return (
    <Card size="small" title="Cài đặt thông tin liên hệ">
      <Space direction="vertical">
        <Space>
          Facebook:
          <Input defaultValue="Combine input and button" />
        </Space>
        <Space>
          Linkedin:
          <Input defaultValue="Combine input and button" />
        </Space>
        <Space>
          Email:
          <Input defaultValue="Combine input and button" />
          <Input defaultValue="Combine input and button" />
        </Space>
      </Space>
    </Card>
  )
}

export default ContactBlock
