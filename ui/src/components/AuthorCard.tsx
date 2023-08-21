import { getSetting } from '@/services/SettingController';
import { MyIcon } from '@/utils/icon';
import { Avatar, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';

const AuthorCard: React.FC = () => {
  const [setting, setSetting] = useState<Setting>();
  useEffect(() => {
    getSetting().then(({ data }) => setSetting(data));
  }, []);
  return (
    <Space
      direction="vertical"
      align="center"
      size={'small'}
      className="w-full h-48 bg-white p-5 rounded-lg"
    >
      <Avatar
        size={54}
        src={`${process.env.FILE_SERVER}${setting?.authorAvatar}`}
      />
      <Space direction="vertical" align="center" size={'small'}>
        <div className="text-lg">{setting?.authorName}</div>
        <div className="text-gray-500">
          {setting?.introduction || '暂无介绍...'}
        </div>
      </Space>
      <Space size={'small'}>
        <Tooltip title="我的GitHub" placement="bottom">
          <a
            href={setting?.gitHubUrl}
            target="__blank"
            style={{ display: setting?.showGitHub ? 'inline' : 'none' }}
          >
            <MyIcon type="icon-github" style={{ fontSize: '28px' }} />
          </a>
        </Tooltip>
        <Tooltip title="我的CSDN" placement="bottom">
          <a
            href={setting?.CSDNUrl}
            target="__blank"
            style={{ display: setting?.showCSDN ? 'inline' : 'none' }}
          >
            <MyIcon type="icon-csdn" style={{ fontSize: '28px' }} />
          </a>
        </Tooltip>
        <Tooltip title="我的Gitee" placement="bottom">
          <a
            href={setting?.giteeUrl}
            target="__blank"
            style={{ display: setting?.showGitee ? 'inline' : 'none' }}
          >
            <MyIcon type="icon-gitee" style={{ fontSize: '28px' }} />
          </a>
        </Tooltip>
        <Tooltip title="我的知乎" placement="bottom">
          <a
            href={setting?.zhiHuUrl}
            target="__blank"
            style={{ display: setting?.showZhiHu ? 'inline' : 'none' }}
          >
            <MyIcon type="icon-zhihu" style={{ fontSize: '28px' }} />
          </a>
        </Tooltip>
      </Space>
    </Space>
  );
};

export default AuthorCard;
