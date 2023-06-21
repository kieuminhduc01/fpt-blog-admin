import { message, Card, Input, Button, Form } from 'antd'
import { apiAccountChangePass } from 'api/accountAPI'
import { useNavigate } from 'react-router-dom'

const ChangePassContainer = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const handleChangePass = (data) => {
    apiAccountChangePass(data)
      .then((res) => {
        messageApi.open({
          type: 'success',
          content: 'Đổi mật khẩu thành công !',
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
    <>
      {contextHolder}
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          title="Đổi mật khẩu"
          bordered={false}
          style={{ width: 600 }}
          actions={[
            <div key="changePass" onClick={() => navigate('/login')}>
              Đăng nhập
            </div>,
            <div key="resetPass" onClick={() => navigate('/resetPass')}>
              Quên mật khẩu
            </div>,
          ]}
        >
          <Form
            name="changePass"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={handleChangePass}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Nhập Email !',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: 'Nhập mật khẩu !',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Nhập mật khẩu !',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}

export default ChangePassContainer
