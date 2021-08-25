import React, { FC, ReactElement } from 'react';

import { ApolloError } from '@apollo/client';
import { Grid, Card, CardHeader, Box } from '@material-ui/core';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import styled from 'styled-components';

import AnimatedLoader from '$components/shared/Progress/AnimatedLoader';

const LoaderWrapper = styled.div`
  width: 18rem;
  height: fit-content;
  left: 50%;
  right: auto;
  top: 50%;
  bottom: auto;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const LoadingText = styled.span`
  display: block;
  font-size: 2rem;
  color: #6f6f6f;
  text-align: center;
`;

const StyledBox = styled(Box)`
  position: relative;
`;

export interface Props {
  loading: boolean;
  error?: ApolloError;
  children(): ReactElement<any>;
}

export const LoadingData: FC<Props> = (props) => {
  if (props.loading || props.error) {
    return (
      <>
        {props.loading ? (
          <StyledBox width="100%" height={'100%'}>
            <LoaderWrapper>
              <AnimatedLoader />
              <LoadingText>{'در حال بارگذاری...'}</LoadingText>
            </LoaderWrapper>
          </StyledBox>
        ) : props.error ? (
          <Grid container justify="center" alignItems="center">
            <Box m={4}>
              <Card>
                <CardHeader
                  avatar={<ErrorRoundedIcon fontSize="large" color="error" />}
                  title={props.error.message || 'در بارگزاری اطلاعات خطایی رخ داد'}
                />
              </Card>
            </Box>
          </Grid>
        ) : null}
      </>
    );
  }
  return <>{props.children()}</>;
};
