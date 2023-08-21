import { login } from '@/services/UserController';
import { setToken } from '@/utils/auth';
import { MyIcon } from '@/utils/icon';
import { LeftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Button, Divider, Form, Input, message } from 'antd';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    login(values).then(async (res) => {
      message.success('登录成功');
      setToken(res.access_token);
      navigate('/admin');
    });
  };

  return (
    <div className="flex h-screen">
      <div className="grow flex flex-col justify-center items-center bg-slate-900">
        <div className="text-3xl text-slate-200 font-bold">
          Shine Blog 后台管理系统
        </div>
        <MyIcon type="icon-analytics" style={{ fontSize: '512px' }} />
      </div>
      <div className="flex p-4">
        <Button
          type="link"
          icon={<LeftOutlined />}
          className="absolute"
          onClick={() => navigate('/')}
        />
        <div className="flex flex-col justify-center items-center">
          <div className="mb-2 text-3xl font-bold">欢迎回来</div>
          {/* gray-400 */}
          <Divider style={{ color: 'rgb(156 163 175)' }}>账号密码登录</Divider>
          <Form
            name="basic"
            wrapperCol={{ offset: 4, span: 16 }}
            style={{ width: 488 }}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '用户名不能为空' }]}
            >
              <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input.Password
                placeholder="请输入密码"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
