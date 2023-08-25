import AuthorCard from '@/components/AuthorCard';
import CategoryCard from '@/components/CategoryCard';
import TagCard from '@/components/TagCard';
import { MyIcon } from '@/utils/icon';
import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, Outlet, useModel, useNavigate } from '@umijs/max';
import {
  Layout as AntdLayout,
  Button,
  Col,
  Drawer,
  Dropdown,
  MenuProps,
  Row,
  Space,
  message,
} from 'antd';
import { useState } from 'react';

const { Header, Content, Footer } = AntdLayout;

const pathMap = [
  { path: '/', title: '首页' },
  { path: '/category', title: '分类' },
  { path: '/tag', title: '标签' },
  { path: '/archive', title: '归档' },
];

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isLogin, logout } = useModel('userModel');

  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => navigate('/admin')}>进入后台</div>,
      key: '0',
    },
    {
      label: (
        <div
          onClick={() => {
            message.success('退出成功');
            logout();
          }}
        >
          退出登录
        </div>
      ),
      key: '1',
    },
  ];

  return (
    <AntdLayout className="h-screen">
      <Header className="bg-white p-0">
        <Row align={'middle'} className="h-full">
          <Col xs={{ span: 1, offset: 1 }} lg={{ span: 0, offset: 0 }}>
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={handleOpen}
            >
              <MenuOutlined />
            </div>
          </Col>
          <Col xs={{ span: 1, offset: 1 }} lg={{ span: 1, offset: 1 }}>
            <div className="flex justify-center items-center">
              <MyIcon type="icon-qing" style={{ fontSize: '32px' }} />
            </div>
          </Col>
          <Col xs={{ span: 0 }} lg={{ span: 3 }}>
            <div className="text-lg">Shine Blog</div>
          </Col>
          <Col xs={{ span: 0 }} lg={{ span: 8, offset: 5 }}>
            <Row align="middle">
              {pathMap.map((item) => (
                <Col span={6} key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'nav-active text-base' : 'nav text-base'
                    }
                  >
                    {item.title}
                  </NavLink>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={{ span: 2, offset: 17 }} lg={{ span: 1, offset: 4 }}>
            {isLogin ? (
              <Dropdown
                menu={{ items }}
                trigger={['click']}
                placement="bottom"
                className="flex justify-center items-center"
              >
                <UserOutlined style={{ fontSize: '20px' }} />
              </Dropdown>
            ) : (
              <Button
                type="link"
                onClick={() => navigate('/login')}
                className="p-0"
              >
                登录
              </Button>
            )}
          </Col>
        </Row>
      </Header>
      <Content className="py-8 bg-gray-200" style={{ minHeight: 'unset' }}>
        <Drawer
          title={
            <Space align="center">
              <MyIcon type="icon-qing" style={{ fontSize: '32px' }} />
              <div className="text-lg">Shine Blog</div>
            </Space>
          }
          placement="left"
          onClose={handleClose}
          open={open}
          closeIcon={false}
          extra={
            <CloseOutlined className="cursor-pointer" onClick={handleClose} />
          }
        >
          <Space direction="vertical" size={'large'} className="w-full">
            {pathMap.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'nav-active block p-2 rounded-lg hover:bg-gray-200'
                    : 'nav block p-2 rounded-lg hover:bg-gray-200'
                }
                onClick={handleClose}
              >
                {item.title}
              </NavLink>
            ))}
          </Space>
        </Drawer>
        <Row gutter={[20, 20]} className="w-full" style={{ margin: 0 }}>
          <Col offset={2} xs={20} lg={15}>
            <Outlet />
          </Col>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 5, offset: 0 }}>
            <Space direction="vertical" className="w-full">
              <AuthorCard />
              <CategoryCard />
              <TagCard />
            </Space>
          </Col>
        </Row>
      </Content>
      <Footer className="text-center">Shine Blog ©2023 Created by Fzl</Footer>
    </AntdLayout>
  );
};

export default Layout;
