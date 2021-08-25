import React from 'react';
import { useRouter } from 'next/router';

// import { useAuth } from '$lib/authorization/useAuth';
import { LoadingData } from '$components/shared';

export const PageAuthorization = (props) => {
  const router = useRouter();
  // const [isLoading, hasAccess] = useAuth(props.children.props);
  const [isLoading, hasAccess] = [false, true];

  if (isLoading) {
    return <LoadingData loading={isLoading}>{props.children}</LoadingData>;
  }

  if (!hasAccess) {
    router.push('/403');
  }

  return props.children;
};
