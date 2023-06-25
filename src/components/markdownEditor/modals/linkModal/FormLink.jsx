import { Button, Form, Input } from 'antd'

const FormLink = ({ onSubmit }) => {
  return (
    <Form
      name="formLink"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: 'Nhập tiêu đề !' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Đường dẫn"
        name="link"
        rules={[{ required: true, message: 'Nhập đường dẫn !' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormLink
