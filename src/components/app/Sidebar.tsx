import React, { FC } from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import styled from 'styled-components';

import Logo from '../../../public/library.svg';

import SidebarList, { ISidebarList } from './Sidebar/SidebarList';

const LogoContainer = styled.div`
  /* width: 20rem; */
  /* height: 7rem; */
  cursor: pointer;
`;

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      background: 'rgb(74, 195, 142)',
      height: '10rem',
      display: 'flex',
      marginBottom: '3.5rem',
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: '11.5rem',
    },
    footerDivider: {
      width: '80%',
      height: '2px',
    },
    topListRoot: {
      '&>div': {
        marginBottom: '2.5rem',
      },
    },
    logo: {
      width: '100%',
      height: '100%',
    },
  }),
);

const StyledGrid = styled(Grid)`
  overflow-y: auto;
  flex-grow: 1;
  height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled(Grid)`
  min-height: calc(100% - 15rem);
`;

interface Props {
  topMenuList: ISidebarList[];
  pathname: string;
}
export const Sidebar: FC<Props> = ({ topMenuList, pathname }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" style={{ height: '100%', background: '#373b53' }}>
      <Grid item className={classes.toolbar}>
        <Link href={'/'}>
          <LogoContainer>
            {/* <Logo className={classes.logo} /> */}
            <img src={'iran.flag.png'} style={{ width: '100%', height: '100%' }} />
          </LogoContainer>
        </Link>
      </Grid>
      <Container container direction="column" justifyContent="space-between">
        <StyledGrid item>
          <List component="nav" classes={{ root: classes.topListRoot }}>
            <SidebarList list={topMenuList} pathname={pathname} />
          </List>
        </StyledGrid>
      </Container>
    </Grid>
  );
};

export default Sidebar;
