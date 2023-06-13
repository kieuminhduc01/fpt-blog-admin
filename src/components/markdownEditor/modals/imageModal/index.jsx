import { Modal } from 'antd'
import FormUpload from 'components/markdownEditor/modals/imageModal/FormUpload'

const onChange = (key) => {
  console.log(key)
}

const ImageModal = ({ onCancel, onSubmit }) => {
  return (
    <Modal title="Đăng tải hình ảnh" width={800} open={true} footer={null} onCancel={onCancel}>
      <FormUpload />
    </Modal>
  )
}

export default ImageModal
