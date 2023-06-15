import { FileDoneOutlined, SettingOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { useState } from 'react'

const items = [
  {
    label: 'Bài viết',
    key: 'post',
    icon: <FileDoneOutlined />,
  },
  {
    label: 'Cài đặt chung',
    key: 'setting',
    icon: <SettingOutlined />,
  },
]

const HeaderFooterLayout = ({ children }) => {
  const [current, setCurrent] = useState('mail')
  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          boxShadow: '0px 2px #f5f5f5',
        }}
      >
        <div className="demo-logo" />
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  )
}

export default HeaderFooterLayout
