import { getToken } from '@/utils/auth';
import { Navigate } from '@umijs/max';
import React from 'react';

const withAuth = (Component: React.FC) => () => {
  if (getToken()) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default withAuth;
