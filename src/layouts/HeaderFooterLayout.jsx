import {
  BellOutlined,
  FileDoneOutlined,
  SettingOutlined,
  UserOutlined,
  DoubleLeftOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { Badge, Button, Layout, Menu, message, Popover } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { ReadAllNotification } from 'api/notificationAPI'
import { notiFyContentAtom } from 'components/atom/store'
import NotifiContent from 'components/notification/NotifiContent'
import ReceiveNotifi from 'components/notification/ReceiveNotifi'
import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { zIndex } from 'utils/zIndex'

const menuItems = [
  {
    label: 'Tài khoản đăng ký',
    key: 'account',
    icon: <UserOutlined />,
  },
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
  const [current, setCurrent] = useState('account')
  const [openSideBar, setOpenSideBar] = useState(false)
  const navigate = useNavigate()
  const [totalNotification, setTotalNotification] = useState()
  const [fresherData, setFresherData] = useState(false)
  const [, setNotifyContent] = useAtom(notiFyContentAtom)
  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      ReadAllNotification()
        .then((res) => {
          setTotalNotification(0)
        })
        .catch((err) => {
          message.error(err)
        })
      setNotifyContent((pre) => pre.map((item) => ({ ...item, isRead: true })))
    }
  }
  const handleReceiveDataFromChild = (data) => {
    setTotalNotification(data)
    setFresherData(true)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

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
      case 'account':
        navigate('/')
        break
      default:
        break
    }

    setCurrent(e.key)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            zIndex: zIndex.sticky,
            background: '#fff',
            width: openSideBar ? 300 : 0,
            overflowX: 'hidden',
            transition: '0.5s',
            borderRight: '3px solid #e5e5e5',
          }}
        >
          <div
            style={{
              height: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              type="dashed"
              onClick={() => setOpenSideBar(false)}
              style={{
                marginBottom: 16,
              }}
            >
              <DoubleLeftOutlined />
            </Button>
          </div>
          <Menu
            mode="inline"
            style={{
              width: '100%',
              height: '100vh',
            }}
            onClick={onClick}
            selectedKeys={[current]}
            items={menuItems}
          />
        </div>
      </div>
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
          justifyContent: 'space-between',
          height: 70,
        }}
      >
        {isMobile ? (
          <Button
            type="dashed"
            onClick={() => setOpenSideBar(true)}
            style={{
              marginBottom: 16,
            }}
          >
            <MenuOutlined />
          </Button>
        ) : (
          <Menu
            style={{ width: '100%' }}
            mode="horizontal"
            onClick={onClick}
            selectedKeys={[current]}
            items={menuItems}
          />
        )}
        <Badge count={totalNotification}>
          <Popover
            content={<NotifiContent fresherData={fresherData} />}
            title="Thông Báo"
            trigger="click"
            onOpenChange={handleOpenChange}
          >
            <Button shape="circle" icon={<BellOutlined />}></Button>
          </Popover>
        </Badge>
        <ReceiveNotifi update={handleReceiveDataFromChild} />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  )
}

export default HeaderFooterLayout
