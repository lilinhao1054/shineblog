import { Outlet, useLocation } from '@umijs/max';
import Back from './back';
import Front from './front';
import './index.less';

const Layout: React.FC = () => {
  const location = useLocation();
  if (location.pathname === '/login') return <Outlet />;
  else if (location.pathname === '/admin/article/edit') return <Outlet />;
  else if (location.pathname.startsWith('/admin')) return <Back />;
  else return <Front />;
};

export default Layout;
