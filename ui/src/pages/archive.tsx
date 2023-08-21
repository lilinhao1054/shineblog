import { getArchive } from '@/services/ArchiveController';
import { CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Pagination, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ArchiveCard: React.FC<{ archive: Archive }> = ({ archive }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="text-base font-bold mb-2">
        {dayjs(archive.date).format('MM-DD')}
      </div>
      {archive.data.map((item) => (
        <div
          key={item.id}
          className="hover:bg-gray-200 rounded-lg cursor-pointer p-3"
          onClick={() => navigate(`/article?id=${item.id}`)}
        >
          <Space>
            <img
              src={`${process.env.FILE_SERVER}${item.cover}`}
              className="w-24 h-12"
            />
            <Space direction="vertical">
              <div className="text-base">{item.title}</div>
              <Space size="small" className="text-gray-500 text-xs">
                <CalendarOutlined />
                {dayjs(archive.date).format('YYYY-MM-DD')}
              </Space>
            </Space>
          </Space>
        </div>
      ))}
    </div>
  );
};

const Archive: React.FC = () => {
  const [archives, setArchives] = useState<Page<Archive>>();

  const [current, setCurrent] = useState(1);
  useEffect(() => {
    getArchive(current, 4).then(({ data }) => setArchives(data));
  }, []);

  const handlePageChange: (page: number) => void = (page) => {
    setCurrent(page);
    getArchive(page, 4).then(({ data }) => setArchives(data));
  };

  return (
    <Space direction="vertical" size={'large'} className="w-full">
      {archives?.records.map((item) => (
        <ArchiveCard key={item.date} archive={item} />
      ))}
      <div className="flex justify-center items-center">
        <Pagination
          current={current}
          pageSize={4}
          total={archives?.total}
          onChange={handlePageChange}
          hideOnSinglePage
        />
      </div>
    </Space>
  );
};

export default Archive;
