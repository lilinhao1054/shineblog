import { addCategory } from '@/services/CategoryController';
import { Form, Input, Modal, message } from 'antd';

interface IAddModalProps {
  open: boolean;
  handleCancel: () => void;
  refresh: () => void;
}

const AddModal: React.FC<IAddModalProps> = (props) => {
  const { handleCancel, open, refresh } = props;
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addCategory(values).then(() => {
          message.success('新增成功');
          handleCancel();
          refresh();
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="新增分类"
      cancelText="取消"
      okText="提交"
      open={open}
      onCancel={handleCancel}
      onOk={handleSubmit}
    >
      <Form form={form}>
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: '分类名称不能为空' }]}
        >
          <Input maxLength={10} showCount />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
