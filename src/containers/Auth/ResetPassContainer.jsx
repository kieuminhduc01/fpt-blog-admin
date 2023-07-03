import { Button, Card, Form, Input, Spin, message } from 'antd'
import { apiAccountResetPass } from 'api/accountAPI'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const ResetPassContainer = () => {
  const [loading, setLoading] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const handleLogin = (data) => {
    setLoading(true)
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
      .finally(() => setLoading(false))
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
          <Spin spinning={loading}>
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
          </Spin>
        </Card>
      </div>
    </>
  )
}
export default ResetPassContainer
