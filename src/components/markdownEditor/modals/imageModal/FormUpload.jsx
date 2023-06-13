import { CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Space, Switch, Upload, message } from 'antd'
import { useRef, useState } from 'react'

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const props = {
  name: 'file',
  action: `${process.env.REACT_APP_API_URL}api/File/ContentImage`,
  maxCount: 1,
}

const FormUpload = ({ onSubmit }) => {
  const [isUpload, setUpload] = useState(false)

  const formRef = useRef()

  const handleChange = (info) => {
    console.log('info', info)
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      formRef.current?.setFieldsValue({
        link: `${process.env.REACT_APP_API_URL}${info.file.response.result.src}`,
      })
      message.success(`tải ảnh ${info.file.name}  thành công`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.response.detail}`)
    }
  }

  const handleChangeSwitch = (value) => {
    setUpload(value)
  }
  console.log('process.env', process.env)
  return (
    <Form
      ref={formRef}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      style={{
        maxWidth: 1000,
      }}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[
          {
            required: true,
            message: 'Nhập tiêu đề!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Row>
        <Col xs={24} md={12}>
          <div style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
            <Space>
              Tải tệp tư thiết bị
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={isUpload}
                onChange={handleChangeSwitch}
              />
            </Space>
          </div>
        </Col>

        <Col xs={24} md={12}>
          {isUpload && (
            <Upload {...props} onChange={handleChange}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          )}
        </Col>
      </Row>
      <Form.Item
        label="Đường dẫn"
        name="link"
        rules={[
          {
            required: true,
            message: 'Nhập đường dẫn!',
          },
          {
            type: 'url',
            message: 'Nhập đúng định dạng đường dẫn.',
          },
        ]}
      >
        <Input disabled={isUpload} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 12,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormUpload
