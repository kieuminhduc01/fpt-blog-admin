import { Button, Card, Form, Input, message } from 'antd'
import { apiAccountResetPass } from 'api/accountAPI'
import { useNavigate } from 'react-router-dom'

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const ResetPassContainer = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const handleLogin = (data) => {
    apiAccountResetPass(data)
      .then((res) => {
        messageApi.open({
          type: 'success',
          content: 'Mật khẩu mới đã gửi tới Email của bạn !',
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
          title="Quên mật khẩu"
          bordered={false}
          style={{ width: 600 }}
          actions={[
            <div key="changePass" onClick={() => navigate('/changePass')}>
              Đổi mật khẩu
            </div>,
            <div key="resetPass" onClick={() => navigate('/login')}>
              Đăng nhập
            </div>,
          ]}
        >
          <Form
            name="resetPass"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
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
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Gửi mật khẩu mới
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}
export default ResetPassContainer
