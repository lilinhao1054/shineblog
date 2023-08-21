import { getArticleById } from '@/services/ArticleController';
import { CalendarOutlined, FolderOutlined } from '@ant-design/icons';
import { Space, Tag } from 'antd';
import { useEffect, useState } from 'react';

interface IArticleCardProps {
  id: number;
}

const ArticleCard: React.FC<IArticleCardProps> = (props) => {
  const { id } = props;
  const [article, setArticle] = useState<Article>();
  useEffect(() => {
    getArticleById(id).then(({ data }) => setArticle(data));
  }, []);
  return (
    <div className="w-full max-w-md my-0 mx-auto h-96 bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg">
      <img
        src={`${process.env.FILE_SERVER}${article?.cover}`}
        className="h-48 w-full"
      />
      <Space
        direction="vertical"
        size={'middle'}
        className="p-4 text-gray-500 w-full"
      >
        <Space size={[0, 8]} wrap>
          {article?.tags.map((item) => (
            <Tag
              key={item.id}
              className="bg-green-100 hover:bg-green-300 cursor-default"
            >
              {item.name}
            </Tag>
          ))}
        </Space>
        <div className="font-bold text-lg text-black overflow-hidden text-ellipsis whitespace-nowrap">
          {article?.title}
        </div>
        <div className="text-ellipsis line-clamp-2">{article?.abstract}</div>
        <Space size={'middle'} className="text-sm">
          <Space size={'small'}>
            <CalendarOutlined />
            {article?.pubTime}
          </Space>
          <Space size={'small'}>
            <FolderOutlined />
            {article?.category.name}
          </Space>
        </Space>
      </Space>
    </div>
  );
};

export default ArticleCard;
