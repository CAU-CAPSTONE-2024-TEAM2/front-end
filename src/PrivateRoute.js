import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from './hooks/Auth';

const PrivateRoute = ({ children }) => {
  const accessToken = useRecoilValue(accessTokenState);

  console.log('PrivateRoute: Access token:', accessToken); // 디버깅용 콘솔 로그

  return accessToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;