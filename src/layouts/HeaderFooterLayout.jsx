import { FileDoneOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const menuItems = [
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
  {
    label: 'Admin',
    key: 'user',
    icon: <UserOutlined />,
    children: [
      {
        key: 'logout',
        label: 'Đăng xuất',
      },
      {
        key: 'changePassword',
        label: 'Đổi mật khẩu',
      },
    ],
  },
]

const HeaderFooterLayout = ({ children }) => {
  const [current, setCurrent] = useState('mail')
  const navigate = useNavigate()

  const onClick = (e) => {
    switch (e.key) {
      case 'post':
        navigate('/post')
        break
      case 'setting':
        navigate('/setting')
        break
      case 'logout':
        Cookies.remove('jwt')

        navigate('/login')
        break
      case 'changePassword':
        navigate('/changePass')
        break
      default:
        break
    }

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
