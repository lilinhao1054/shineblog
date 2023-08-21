import {
  getAdjacentArticleById,
  getArticleById,
} from '@/services/ArticleController';
import {
  CalendarOutlined,
  EyeOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useNavigate, useSearchParams } from '@umijs/max';
import { Divider, Space, Tag } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import Vditor from 'vditor';

const Article: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = useMemo(() => {
    const articleId = searchParams.get('id');
    if (articleId) return +articleId;
  }, [searchParams]);

  const [article, setArticle] = useState<Article>();
  const [adjacentArticle, setAdjacentArticle] = useState<AdjacentArticle>();
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      getArticleById(id).then(({ data }) => {
        setArticle(data);
        Vditor.preview(markRef.current as HTMLDivElement, data.content);
      });
      getAdjacentArticleById(id).then(({ data }) => setAdjacentArticle(data));
    }
  }, [id]);

  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="text-3xl font-bold">{article?.title}</div>
      <Space className="text-gray-400 mt-4">
        <Space size="small">
          <CalendarOutlined />
          发表于 {article?.pubTime}
        </Space>
        <Space size="small">
          <CalendarOutlined />
          分类于 {article?.category.name}
        </Space>
        <Space size="small">
          <EyeOutlined />
          阅读量 {article?.pageView}
        </Space>
      </Space>
      <div className="mt-4 markdown-body">
        <div ref={markRef}></div>
        <Space size={[0, 8]} wrap className="mt-4">
          {article?.tags.map((item) => (
            <Tag
              key={item.id}
              className="bg-green-100 hover:bg-green-300 cursor-default text-sm"
            >
              # {item.name}
            </Tag>
          ))}
        </Space>
      </div>
      <Divider />
      <div
        className="flex justify-between"
        style={{
          flexDirection: !adjacentArticle?.prev ? 'row-reverse' : 'row',
        }}
      >
        <Space
          direction="vertical"
          className="cursor-pointer"
          hidden={!adjacentArticle?.prev}
          onClick={() => navigate(`/article?id=${adjacentArticle?.prev?.id}`)}
        >
          <div className="text-xs text-gray-500">
            <Space size="small" align="center">
              <LeftOutlined style={{ fontSize: '10px' }} />
              上一篇
            </Space>
          </div>
          <div className="text-md tracking-widest hover:text-blue-400 text-center">
            {adjacentArticle?.prev?.title}
          </div>
        </Space>
        <Space
          direction="vertical"
          className="cursor-pointer"
          hidden={!adjacentArticle?.next}
          onClick={() => navigate(`/article?id=${adjacentArticle?.next?.id}`)}
        >
          <div className="text-xs text-gray-500">
            <Space size="small" align="center">
              下一篇
              <RightOutlined style={{ fontSize: '10px' }} />
            </Space>
          </div>
          <div className="text-md tracking-widest hover:text-blue-400 text-center">
            {adjacentArticle?.next?.title}
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Article;
