import { deleteTag, getTagPage } from '@/services/TagController';
import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import AddModal from './components/addModal';

const { Column } = Table;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

const Tag: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<Page<Tag>>();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { run, loading } = useRequest(getTagPage, {
    manual: true,
    onSuccess: (data) => {
      setTags(data);
    },
  });

  const [form] = Form.useForm();

  const refresh = () => {
    setCurrent(1);
    form.resetFields();
    run(1, pageSize);
  };

  useEffect(refresh, []);

  const getFormData = () => {
    const { name, createTimeRange } = form.getFieldsValue();
    const [startTime, endTime] = createTimeRange?.map(
      (item: any) => item.$d,
    ) || [undefined, undefined];
    return { name, startTime, endTime };
  };

  const onFinish = () => {
    const { name, startTime, endTime } = getFormData();
    run(1, pageSize, name, startTime, endTime);
  };

  const handleDelete = (id: number) => {
    confirm({
      title: '确定删除吗?',
      icon: <DeleteOutlined />,
      content: '删除后将无法恢复',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        deleteTag(id).then(() => {
          message.success('删除成功');
          refresh();
        });
      },
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
    const { name, startTime, endTime } = getFormData();
    run(page, pageSize, name, startTime, endTime);
  };

  return (
    <Space direction="vertical" size="middle" className="w-full">
      <div className="bg-white p-5">
        <Form form={form} layout="inline" onFinish={onFinish}>
          <Form.Item label="标签名称" name="name">
            <Input placeholder="请输入（模糊查询）" />
          </Form.Item>
          <Form.Item label="创建日期" name="createTimeRange">
            <RangePicker placeholder={['开始日期', '结束日期']} showTime />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button icon={<ReloadOutlined />} onClick={refresh}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="bg-white p-5">
        <div
          className="h-12 flex items-center"
          style={{ border: '1px solid #f0f0f0', borderBottom: 'none' }}
        >
          <Button
            type="link"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            新增
          </Button>
        </div>
        <Table
          dataSource={tags?.records}
          bordered
          rowKey="id"
          loading={loading}
          pagination={{
            total: tags?.total,
            pageSize,
            current,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: [5, 10],
            onChange: handlePageChange,
          }}
        >
          <Column title="标签名称" dataIndex="name" key="name" align="center" />
          <Column
            title="创建时间"
            dataIndex="createTime"
            key="createTime"
            align="center"
          />
          <Column
            title="操作"
            key="action"
            align="center"
            render={(value) => (
              <Space>
                <Button
                  type="primary"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(value.id)}
                >
                  删除
                </Button>
              </Space>
            )}
          />
        </Table>
      </div>
      <AddModal
        open={open}
        handleCancel={() => setOpen(false)}
        refresh={refresh}
      />
    </Space>
  );
};

export default Tag;
