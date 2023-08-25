import { getToken, removeToken, setToken } from '@/utils/auth';
import { useState } from 'react';

export default () => {
  const [isLogin, _setIsLogin] = useState(!!getToken());

  const login = (token: string) => {
    _setIsLogin(true);
    setToken(token);
  };

  const logout = () => {
    _setIsLogin(false);
    removeToken();
  };

  return { isLogin, login, logout };
};
