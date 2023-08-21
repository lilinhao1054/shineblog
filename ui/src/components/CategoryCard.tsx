import { getCategories } from '@/services/CategoryController';
import { useNavigate } from '@umijs/max';
import { List } from 'antd';
import { useEffect, useState } from 'react';
import CategoryCardListItem from './CategoryCardListItem';

const CategoryCard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data));
  }, []);
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="text-base font-bold mb-2">分类</div>
      <List
        split={false}
        dataSource={categories}
        renderItem={(item) => (
          <CategoryCardListItem
            key={item.id}
            name={item.name}
            onClick={() =>
              navigate(`/category/list?id=${item.id}&name=${item.name}`)
            }
          />
        )}
      />
    </div>
  );
};

export default CategoryCard;
