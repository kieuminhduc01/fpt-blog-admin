import { Breadcrumb, Space } from 'antd'
import TagSetupBlock from 'containers/commonSetup/components/TagSetup'
import { Link } from 'react-router-dom'
import ContactBlock from 'containers/commonSetup/components/Contact'

const PostListBreadcrumb = () => {
  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      items={[
        {
          title: <Link to="/setting">Cài đặt chung</Link>,
        },
      ]}
    />
  )
}

const CommonSetupContainer = () => {
  return (
    <>
      <PostListBreadcrumb />
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <TagSetupBlock />
        <ContactBlock />
      </Space>
    </>
  )
}

export default CommonSetupContainer
