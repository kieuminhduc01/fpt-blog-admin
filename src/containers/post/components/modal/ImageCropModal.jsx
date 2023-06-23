import { Modal } from 'antd'
import ImageCrop from 'containers/post/components/crop/ImageCrop'

const ImageCropModal = ({ onCancel, onSubmit }) => {
  return (
    <Modal
      style={{ display: 'flex', justifyContent: 'center' }}
      title="Đăng tải hình ảnh"
      width={800}
      open={true}
      footer={null}
      onCancel={onCancel}
    >
      <div style={{ padding: '50px' }}>
        <ImageCrop onSubmit={onSubmit} />
      </div>
    </Modal>
  )
}

export default ImageCropModal
