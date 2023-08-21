import { getArticlePageWeb } from '@/services/ArticleController';
import { FolderOpenOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from '@umijs/max';
import { Col, Pagination, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';

const List: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('id');
  const categoryName = searchParams.get('name');

  const [articles, setArticles] = useState<Page<Article>>();
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    getArticlePageWeb(current, 4, categoryId ? +categoryId : undefined).then(
      ({ data }) => setArticles(data),
    );
  }, [categoryId]);

  const handlePageChange: (page: number) => void = (page) => {
    setCurrent(page);
    getArticlePageWeb(page, 4).then(({ data }) => setArticles(data));
  };

  const navigate = useNavigate();

  return (
    <Space direction="vertical" size={'large'} className="w-full">
      <Space className="text-2xl text-gray-600 font-bold">
        <FolderOpenOutlined />
        {categoryName}
      </Space>
      <Row gutter={[20, 20]} className="w-full">
        {articles?.records.map((item) => (
          <Col
            key={item.id}
            xs={24}
            lg={12}
            onClick={() => navigate(`/article?id=${item.id}`)}
          >
            <ArticleCard id={item.id as number} />
          </Col>
        ))}
      </Row>
      <div className="flex justify-center items-center">
        <Pagination
          current={current}
          pageSize={4}
          total={articles?.total}
          onChange={handlePageChange}
          hideOnSinglePage
        />
      </div>
    </Space>
  );
};

export default List;
