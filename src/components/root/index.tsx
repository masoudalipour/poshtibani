import React, { FC } from 'react';
import styled from 'styled-components';

const RootPageContainer = styled.div`
  margin-top: 5rem;
`;

export const Root: FC = () => {
  return (
    <RootPageContainer>
      <h1>Hi</h1>
    </RootPageContainer>
  );
};

export default Root;
