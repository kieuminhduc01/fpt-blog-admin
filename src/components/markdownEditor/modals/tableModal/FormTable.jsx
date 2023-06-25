import { Button, Form, Input } from 'antd'

const FormTable = ({ onSubmit }) => {
  return (
    <Form
      name="formTable"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Số dòng"
        name="row"
        rules={[{ required: true, message: 'Nhập số dòng !' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Số cột"
        name="column"
        rules={[{ required: true, message: 'Nhập số cột !' }]}
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

export default FormTable
