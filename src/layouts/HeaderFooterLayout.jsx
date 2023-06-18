import { FileDoneOutlined, SettingOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const menuItems = [
  {
    label: 'Bài viết',
    key: 'post',
    icon: <FileDoneOutlined />,
    link: '/post',
  },
  {
    label: 'Cài đặt chung',
    key: 'setting',
    icon: <SettingOutlined />,
    link: '/setting',
  },
]

const HeaderFooterLayout = ({ children }) => {
  const [current, setCurrent] = useState('mail')
  const navigate = useNavigate()

  const onClick = (e) => {
    const { link } = menuItems.find((item) => item.key === e.key) || {}
    navigate(link)
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
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuItems} />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  )
}

export default HeaderFooterLayout
