import React, { FC } from 'react';

import { LoadingData } from '$components/shared';
// import { useInitData } from '$lib/useInitData';

export const AppLayout: FC = ({ children }) => {
  // const { loading, error } = useInitData();
  const { loading, error } = { loading: false, error: undefined };

  return (
    <LoadingData loading={loading} error={error}>
      {() => {
        return <>{children}</>;
      }}
    </LoadingData>
  );
};
