import { getDashboardData } from '@/services/DashboardController';
import { Column, Line } from '@ant-design/charts';
import {
  EyeOutlined,
  FileOutlined,
  FolderOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import dayjs from 'dayjs';
import { ReactElement, useEffect, useState } from 'react';

interface ISumCardProps {
  title: string;
  number: number;
  icon: ReactElement;
}

const SumCard: React.FC<ISumCardProps> = (props) => {
  const { icon, title, number } = props;
  return (
    <div className="flex gap-2 w-48 p-5 bg-white">
      <div className="flex justify-center items-center w-10">
        <Button icon={icon} shape="circle" type="text" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-gray-500 text-lg tracking-wider">{title}</div>
        <div className="font-bold text-xl">{number}</div>
      </div>
    </div>
  );
};

interface ChartProps {
  data?: ChartData[];
}

const PageViewLine: React.FC<ChartProps> = ({ data }) => {
  const config = {
    data: data || [],
    height: 400,
    xField: 'date',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    meta: {
      date: {
        alias: '日期',
      },
      value: {
        alias: '浏览量',
      },
    },
  };
  return <Line {...config} />;
};

const ArticlePubColumn: React.FC<ChartProps> = ({ data }) => {
  const config = {
    data: data || [],
    xField: 'date',
    yField: 'value',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      date: {
        alias: '日期',
      },
      value: {
        alias: '发布数量',
      },
    },
  };
  return <Column {...config} />;
};

const Admin: React.FC = () => {
  const [dashboard, setDashboard] = useState<Dashboard>();
  useEffect(() => {
    getDashboardData().then(({ data }) =>
      setDashboard({
        ...data,
        articlePubData: data.articlePubData.map((item) => ({
          date: dayjs(item.date).format('M-D'),
          value: item.value,
        })),
        pageViewData: data.pageViewData.map((item) => ({
          date: dayjs(item.date).format('M-D'),
          value: item.value,
        })),
      }),
    );
  }, []);
  return (
    <Space direction="vertical" size="middle" className="w-full">
      <Space size={'large'}>
        <SumCard
          title="文章"
          number={dashboard?.articleNum || 0}
          icon={<FileOutlined />}
        />
        <SumCard
          title="分类"
          number={dashboard?.categoryNum || 0}
          icon={<FolderOutlined />}
        />
        <SumCard
          title="标签"
          number={dashboard?.tagNum || 0}
          icon={<TagOutlined />}
        />
        <SumCard
          title="总浏览量"
          number={dashboard?.totalPageView || 0}
          icon={<EyeOutlined />}
        />
      </Space>
      <div className="flex justify-around bg-white p-5">
        <div className="w-5/12">
          <ArticlePubColumn data={dashboard?.articlePubData} />
        </div>
        <div className="w-5/12">
          <PageViewLine data={dashboard?.pageViewData} />
        </div>
      </div>
    </Space>
  );
};

export default Admin;
