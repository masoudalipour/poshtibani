import React, { useEffect, useState } from 'react';

import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { jssPreset, makeStyles, StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { create } from 'jss';
import { SnackbarProvider } from 'notistack';
import './index.css';
import '$lib/setupEnv';
import { DefaultTheme, ThemeProvider as SCThemeProvider } from 'styled-components';

import { AppLayout } from '$components/layout/App';
import { messageColors } from '$components/shared/messageColors';
import { theme, arabicTheme } from '$components/theme/muiTheme';
import { useApollo } from '$lib/apollo/apolloClient';
import { PageAuthorization } from '$lib/authorization/PageAuthorization';

import Layout from './_layout';

const jss = create({
  plugins: [...jssPreset().plugins],
  insertionPoint: 'mui-inject-first',
});

const useStyles = makeStyles({
  success: { backgroundColor: messageColors.success, fontWeight: 900, minWidth: '350px' },
  error: { backgroundColor: messageColors.error, fontWeight: 900, minWidth: '350px' },
  warning: { backgroundColor: messageColors.warning, fontWeight: 900, minWidth: '350px' },
  info: { backgroundColor: messageColors.info, fontWeight: 900, minWidth: '350px' },
});

const Providers = (props, pageProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [appStyle, _] = useState<DefaultTheme>({
    ...theme,
    direction: 'rtl',
    arabicTheme,
  });

  const classes = useStyles();

  return (
    <StylesProvider jss={jss}>
      <MuiThemeProvider theme={appStyle}>
        <SCThemeProvider theme={appStyle}>
          <ApolloProvider client={apolloClient}>
            <CssBaseline />
            <SnackbarProvider
              maxSnack={3}
              hideIconVariant
              classes={{
                variantSuccess: classes.success,
                variantError: classes.error,
                variantWarning: classes.warning,
                variantInfo: classes.info,
              }}
            >
              <AppLayout>{props.children}</AppLayout>
            </SnackbarProvider>
          </ApolloProvider>
        </SCThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/typedef
export default function App({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  });

  return (
    <Providers pageProps={pageProps}>
      <Layout>
        <PageAuthorization>
          <Component {...pageProps} />
        </PageAuthorization>
      </Layout>
    </Providers>
  );
}
