import CustomUpload from '@/components/CustomUpload';
import { getCategories } from '@/services/CategoryController';
import { getTags } from '@/services/TagController';
import { Form, FormInstance, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
interface ISaveModalProps {
  open: boolean;
  form: FormInstance;
  handleCancel: () => void | undefined;
  handleSubmit: () => void;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const SaveModal: React.FC<ISaveModalProps> = (props) => {
  const { open, handleCancel, form, handleSubmit } = props;

  const [categories, setCategories] = useState<Category[]>();
  const [tags, setTags] = useState<Tag[]>();

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(
        data.map((item) => ({
          ...item,
          value: item.id,
          label: item.name,
        })),
      );
    });
    getTags().then(({ data }) => {
      setTags(
        data.map((item) => ({
          ...item,
          value: item.id,
          label: item.name,
        })),
      );
    });
  }, []);

  return (
    <Modal
      title="发布文章"
      okText="发布"
      cancelText="取消"
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <div className="p-8">
        <Form form={form} wrapperCol={{ span: 24 }}>
          <Form.Item
            label="封面"
            name="cover"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: '请选择封面' }]}
          >
            <CustomUpload />
          </Form.Item>
          <Form.Item
            label="摘要"
            name="abstract"
            rules={[{ required: true, message: '请输入摘要' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="分类"
            name="categoryId"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select style={{ width: 120 }} options={categories} />
          </Form.Item>
          <Form.Item
            label="标签"
            name="tagIds"
            rules={[{ required: true, message: '请选择标签' }]}
          >
            <Select mode="multiple" style={{ width: 360 }} options={tags} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default SaveModal;
