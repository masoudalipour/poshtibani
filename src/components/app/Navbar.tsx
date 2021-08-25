import React, { CSSProperties, FC } from 'react';

import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import styled from 'styled-components';

// import { useUserInfo } from '$lib/useUserInfo';

import NavbarList, { INavbarItem } from './Navbar/NavbarList';

interface ITopBarContainer {
  isAdminPage?: boolean;
}

const TopBarContainer = styled.div<ITopBarContainer>`
  display: flex;
  height: 48px;
  padding-right: '0.5rem';
  padding-left: '2.5rem';
`;

const RightPositionGrid = styled(({ isAdminPage, ...props }) => <Grid {...props} />)`
  padding-left: 'inherit';
`;

const LeftPositionGrid = styled(({ isAdminPage, ...props }) => <Grid {...props} />)`
  padding-right: 'inherit';
  flex-grow: 1;
`;

interface Props {
  leftMenuItems: INavbarItem[];
  rightMenuItems: INavbarItem[];
}
export const Navbar: FC<Props> = ({ leftMenuItems, rightMenuItems }) => {
  // const { userInfo } = useUserInfo();
  const { userInfo } = { userInfo: { _id: '0' } };
  const isAdminPage = true;

  const GridContainerStyles: CSSProperties = {
    height: '10rem',
    position: 'fixed',
    zIndex: 1300,
    backgroundColor: '#ededed',
    maxWidth: '77vw',
  };

  const isLoggedIn = !!userInfo;

  return (
    <>
      <Head>
        <title>سازمان مدیریت گیلان</title>
      </Head>
      <Grid
        container
        style={GridContainerStyles}
        justifyContent={'space-between'}
        alignContent="center"
      >
        <LeftPositionGrid item isAdminPage={isAdminPage}>
          <Grid container>
            <Grid item>
              <TopBarContainer isAdminPage={isAdminPage} data-cy="navbar-left-links">
                <NavbarList
                  menuItems={leftMenuItems}
                  position="left"
                  loggedIn={isLoggedIn}
                />
              </TopBarContainer>
            </Grid>
          </Grid>
        </LeftPositionGrid>
        <RightPositionGrid item isAdminPage={isAdminPage}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item>
              <TopBarContainer isAdminPage={isAdminPage} data-cy="navbar-right-links">
                <NavbarList
                  menuItems={rightMenuItems}
                  position="right"
                  loggedIn={isLoggedIn}
                />
              </TopBarContainer>
            </Grid>
          </Grid>
        </RightPositionGrid>
      </Grid>
    </>
  );
};

export default Navbar;
