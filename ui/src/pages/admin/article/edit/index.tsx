import { getArticleById, saveArticle } from '@/services/ArticleController';
import { LeftOutlined, SendOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from '@umijs/max';
import { Button, Form, Input, Space, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { UploadFile } from 'antd/lib/upload';
import { useEffect, useMemo, useState } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import SaveModal from './components/saveModal';

interface SaveForm {
  cover: UploadFile[];
  abstract: string;
  categoryId: number;
  tagIds: number[];
}

const Edit: React.FC = () => {
  const [title, setTitle] = useState<string>('【无标题】');
  const [form] = Form.useForm<SaveForm>();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const id = useMemo(() => {
    const res = searchParams.get('id');
    if (res) return +res;
  }, [searchParams]);

  const [vd, setVd] = useState<Vditor>();

  useEffect(() => {
    const fetchData = async (articleId: number | undefined) => {
      let data: Article;
      if (articleId) {
        data = (await getArticleById(articleId)).data;
        form.setFieldsValue({
          ...data,
          tagIds: data.tags.map((item) => item.id) as number[],
          categoryId: data.category.id,
          cover: [{ url: `${process.env.FILE_SERVER}${data.cover}` }],
        });
        setTitle(data.title);
      }

      const vd = new Vditor('vditor', {
        height: '100vh',
        after: () => {
          vd.setValue(data?.content || '');
        },
        cache: {
          enable: false,
        },
      });
      setVd(vd);
    };
    fetchData(id);
    return () => vd?.destroy();
  }, []);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (!title || title?.trim() === '') {
        message.info('文章标题不能为空');
        return;
      }
      if (!vd?.getValue() || vd.getValue()?.trim() === '') {
        message.info('文章内容不能为空');
        return;
      }

      const formData = new FormData();
      if (id) formData.append('id', id?.toString() as string);
      formData.append('title', title);
      formData.append('content', vd.getValue());
      formData.append('abstract', values.abstract);
      formData.append('categoryId', values.categoryId.toString());
      values.tagIds.forEach((id) => formData.append('tagIds[]', id.toString()));
      if (values.cover[0].originFileObj)
        formData.append('cover', values.cover[0].originFileObj as RcFile);

      saveArticle(formData).then(() => {
        message.success('发布成功');
        handleCancel();
        navigate('/admin/article');
      });
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-50 p-4">
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate('/admin/article')}
        />
        <div className="text-lg ">文章管理</div>
        <Input
          style={{ width: '1200px', borderRadius: '20px' }}
          value={title}
          showCount
          maxLength={40}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Space>
          <Button onClick={() => navigate('/admin/article')}>取消</Button>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => setOpen(true)}
          >
            发布
          </Button>
        </Space>
      </div>
      <div id="vditor" className="vditor" />
      <SaveModal
        open={open}
        handleCancel={handleCancel}
        form={form}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Edit;
