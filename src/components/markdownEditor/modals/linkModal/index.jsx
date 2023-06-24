import { Modal } from 'antd'
import FormLink from 'components/markdownEditor/modals/linkModal/FormLink'

const LinkModal = ({ onCancel, onSubmit }) => {
  return (
    <Modal title="Đăng tải hình ảnh" width={800} open={true} footer={null} onCancel={onCancel}>
      <FormLink onSubmit={onSubmit} />
    </Modal>
  )
}

export default LinkModal
