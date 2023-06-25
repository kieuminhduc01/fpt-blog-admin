import { Button, Card, Col, Form, Input, Row, Space, message } from 'antd'
import { apiContactGet, apiContactPatch } from 'api/contactAPI'
import { apiEmailConfigGet, apiEmailConfigPatch } from 'api/emailConfigAPI'
import { useEffect, useState } from 'react'

const ContactBlock = () => {
  const [contact, setContact] = useState()
  const [emailConfig, setEmailConfig] = useState()
  const [loadingContact, setLoadingContact] = useState(true)
  const [loadingEmailConfig, setLoadingEmailConfig] = useState(true)

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    // call api contact
    setLoadingContact(true)
    apiContactGet()
      .then((res) => setContact(res.data.result))
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.Detail,
        })
      })
      .finally(() => {
        setLoadingContact(false)
      })

    // call api email config
    setLoadingEmailConfig(true)
    apiEmailConfigGet()
      .then((res) => setEmailConfig(res.data.result))
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.Detail,
        })
      })
      .finally(() => {
        setLoadingEmailConfig(false)
      })
  }, [messageApi])

  const handleSubmitFormContact = (data) => {
    apiContactPatch(data)
      .then((_) => {
        messageApi.open({
          type: 'success',
          content: 'Sửa thông tin liên hệ thành công',
        })
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.Detail,
        })
      })
  }

  const handleSubmitFormEmailConfig = (data) => {
    apiEmailConfigPatch(data)
      .then((_) => {
        messageApi.open({
          type: 'success',
          content: 'Sửa thông tin Email tự động thành công',
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
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          {loadingContact ? (
            <></>
          ) : (
            <Card title="Thông tin liên hệ" size="small" bordered={false}>
              <Form
                name="contact"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ facebook: contact.facebook, linkedin: contact.linkedin }}
                onFinish={handleSubmitFormContact}
                onFinishFailed={() => {}}
                autoComplete="off"
              >
                <Form.Item
                  label="Facebook"
                  name="facebook"
                  rules={[{ required: true, message: 'Nhập Facebook !' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Linkedin"
                  name="linkedin"
                  rules={[{ required: true, message: 'Nhập LinkedIn !' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 4,
                  }}
                >
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Lưu
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          )}
        </Col>
        <Col xs={24} lg={16}>
          {loadingEmailConfig ? (
            <></>
          ) : (
            <Card title="Thông tin Email tự động" size="small" bordered={false}>
              <Form
                name="emailConfig"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 400 }}
                initialValues={{ email: emailConfig.email, appPassword: emailConfig.appPassword }}
                onFinish={handleSubmitFormEmailConfig}
                onFinishFailed={() => {}}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Nhập Email !' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="App Password"
                  name="appPassword"
                  rules={[{ required: true, message: 'Nhập App Password !' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 4,
                  }}
                >
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Lưu
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ContactBlock
