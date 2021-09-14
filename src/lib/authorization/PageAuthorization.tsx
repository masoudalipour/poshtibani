import React from 'react';
import { useAuth } from './useAuth';
import { LoadingData } from '$components/shared';
import LoginPage from 'src/pages/login';

export const PageAuthorization = (props) => {
  const [isLoading, hasAccess] = useAuth(props.children.props);

  if (isLoading) {
    return <LoadingData loading={isLoading}>{props.children}</LoadingData>;
  }

  if (!hasAccess) {
    return <LoginPage />;
  }

  return props.children;
};
