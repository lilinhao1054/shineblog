import withAuth from '@/hocs/withAuth';
import { removeToken } from '@/utils/auth';
import { MyIcon } from '@/utils/icon';
import {
  DesktopOutlined,
  FileOutlined,
  FolderOpenOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
  SettingOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from '@umijs/max';
import {
  Affix,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Tooltip,
  message,
  theme,
} from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useState } from 'react';

const { Header, Sider, Content, Footer } = Layout;

const menuItem: ItemType<MenuItemType>[] = [
  {
    key: '/admin',
    icon: <DesktopOutlined />,
    label: '仪表盘',
  },
  {
    key: '/admin/article',
    icon: <FileOutlined />,
    label: '文章管理',
  },
  {
    key: '/admin/category',
    icon: <FolderOpenOutlined />,
    label: '分类管理',
  },
  {
    key: '/admin/tag',
    icon: <TagOutlined />,
    label: '标签管理',
  },
  {
    key: '/admin/setting',
    icon: <SettingOutlined />,
    label: '博客设置',
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleSelect = ({ key }: { key: string }) => {
    navigate(key);
  };

  const [isFull, setIsFull] = useState(false);
  const changeScreen = (full: boolean) => {
    if (full) {
      document.exitFullscreen();
      setIsFull(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFull(true);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          onClick={() => {
            message.success('退出成功');
            removeToken();
            navigate('/login');
          }}
        >
          退出登录
        </div>
      ),
    },
  ];

  return (
    <Layout className="h-screen">
      <Affix>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="h-screen"
        >
          <div className="h-16 flex justify-center items-center gap-2 text-zinc-50 text-xl">
            <MyIcon type="icon-qing" style={{ fontSize: '28px' }} />
            <span
              style={{
                display: collapsed ? 'none' : 'inline',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              Shine Blog
            </span>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/admin']}
            items={menuItem}
            onSelect={handleSelect}
          />
        </Sider>
      </Affix>

      <Layout>
        <Affix>
          <Header
            style={{ padding: 0, background: colorBgContainer }}
            className="flex"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Tooltip placement="bottom" title="跳转博客前台">
              <Button
                type="text"
                icon={<HomeOutlined />}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
                onClick={() => navigate('')}
                className="ml-auto"
              />
            </Tooltip>
            <Tooltip placement="bottom" title="刷新">
              <Button
                type="text"
                icon={<ReloadOutlined />}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
                onClick={() => window.location.replace('/admin')}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="全屏">
              <Button
                type="text"
                icon={
                  isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />
                }
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
                onClick={() => changeScreen(isFull)}
              />
            </Tooltip>

            <Dropdown menu={{ items }}>
              <Button
                type="text"
                icon={<UserOutlined />}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Dropdown>
          </Header>
        </Affix>

        <Content
          style={{
            padding: 24,
            minHeight: 'unset',
          }}
        >
          <Outlet />
        </Content>
        <Footer className="text-center">Shine Blog ©2023 Created by Fzl</Footer>
      </Layout>
    </Layout>
  );
};

export default withAuth(App);
