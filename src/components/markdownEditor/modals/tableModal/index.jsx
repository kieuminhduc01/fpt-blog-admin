import { Modal } from 'antd'
import FormTable from 'components/markdownEditor/modals/tableModal/FormTable'

const TableModal = ({ onCancel, onSubmit }) => {
  return (
    <Modal title="Tạo bảng" width={800} open={true} footer={null} onCancel={onCancel}>
      <FormTable onSubmit={onSubmit} />
    </Modal>
  )
}

export default TableModal
