import { Button, Card, message, Form, Input } from 'antd'
import { apiAccountAuthPost } from 'api/accountAPI'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const LoginContainer = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const handleLogin = (data) => {
    apiAccountAuthPost(data)
      .then((res) => {
        Cookies.set('jwt', res.data.result.token, { expires: 30 })
        messageApi.open({
          type: 'success',
          content: 'Chào mừng bạn đến với trang quản lý nội dung',
        })
        navigate('/')
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
          title="Đăng nhập"
          bordered={false}
          style={{ width: 600 }}
          actions={[
            <div key="changePass" onClick={() => navigate('/changePass')}>
              Đổi mật khẩu
            </div>,
            <div key="resetPass" onClick={() => navigate('/resetPass')}>
              Quên mật khẩu
            </div>,
          ]}
        >
          <Form
            name="login"
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
              label="Mật khẩu"
              name="password"
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
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}
export default LoginContainer
