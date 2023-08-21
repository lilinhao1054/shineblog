import { getTags } from '@/services/TagController';
import { useNavigate } from '@umijs/max';
import { Space, Tag } from 'antd';
import { useEffect, useState } from 'react';

const TagCard: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    getTags().then(({ data }) => setTags(data));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="text-base font-bold mb-2">标签</div>
      <Space size={[0, 8]} wrap>
        {tags.map((item) => (
          <Tag
            key={item.id}
            className="bg-green-100 hover:bg-green-300 cursor-default"
            onClick={() =>
              navigate(`/tag/list?id=${item.id}&name=${item.name}`)
            }
          >
            {item.name}
          </Tag>
        ))}
      </Space>
    </div>
  );
};

export default TagCard;
