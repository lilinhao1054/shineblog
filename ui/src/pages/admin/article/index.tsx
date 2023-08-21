import {
  deleteArticle,
  getArticlePageAdmin,
} from '@/services/ArticleController';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useNavigate, useRequest } from '@umijs/max';
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  message,
} from 'antd';
import { useEffect, useState } from 'react';

const { Column } = Table;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

interface SearchForm {
  title: string;
  pubTimeRange: any;
}

const Article: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Page<Article>>();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { run, loading } = useRequest(getArticlePageAdmin, {
    manual: true,
    onSuccess: (data: any) => {
      setArticles(data);
    },
  });

  const [form] = Form.useForm<SearchForm>();

  const refresh = () => {
    setCurrent(1);
    form.resetFields();
    run(1, pageSize);
  };

  useEffect(refresh, []);

  const getFormData = () => {
    const { title, pubTimeRange } = form.getFieldsValue();
    const [startTime, endTime] = pubTimeRange?.map((item: any) => item.$d) || [
      undefined,
      undefined,
    ];
    return { title, startTime, endTime };
  };

  const onFinish = () => {
    const { title, startTime, endTime } = getFormData();
    run(1, pageSize, title, startTime, endTime);
  };

  const handleDelete = (id: number) => {
    confirm({
      title: '确定删除吗?',
      icon: <DeleteOutlined />,
      content: '删除后将无法恢复',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        deleteArticle(id).then(() => {
          message.success('删除成功');
          setTimeout(refresh, 1);
        });
      },
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
    const { title, startTime, endTime } = getFormData();
    run(page, pageSize, title, startTime, endTime);
  };

  return (
    <Space direction="vertical" size="middle" className="w-full">
      <div className="bg-white p-5">
        <Form form={form} layout="inline" onFinish={onFinish}>
          <Form.Item label="文章标题" name="title">
            <Input placeholder="请输入（模糊查询）" />
          </Form.Item>
          <Form.Item label="发布日期" name="pubTimeRange">
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
            icon={<FileAddOutlined />}
            onClick={() => navigate('edit')}
          >
            写文章
          </Button>
        </div>
        <Table
          dataSource={articles?.records}
          bordered
          loading={loading}
          rowKey="id"
          pagination={{
            total: articles?.total,
            pageSize,
            current,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: [5, 10],
            onChange: handlePageChange,
          }}
        >
          <Column
            title="文章标题"
            dataIndex="title"
            key="title"
            align="center"
          />
          <Column
            title="预览图"
            dataIndex="cover"
            key="cover"
            align="center"
            render={(value) => (
              <Image src={`${process.env.FILE_SERVER}${value}`} width={100} />
            )}
          />
          <Column
            title="发布时间"
            dataIndex="pubTime"
            key="pubTime"
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
                  icon={<EditOutlined />}
                  onClick={() => navigate(`edit?id=${value.id}`)}
                >
                  编辑
                </Button>
                <Button
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => navigate(`/article?id=${value.id}`)}
                >
                  预览
                </Button>
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
    </Space>
  );
};

export default Article;
