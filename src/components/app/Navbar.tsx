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

const RightPositionGrid = styled(Grid)`
  padding-left: 'inherit';
`;

const LeftPositionGrid = styled(Grid)`
  padding-right: 'inherit';
  /* flex-grow: 1; */
`;

interface Props {
  leftMenuItems: INavbarItem[];
  rightMenuItems: INavbarItem[];
}

const LogoContainer = styled.div`
  /* width: 20rem; */
  height: 7rem;
  cursor: pointer;
`;
export const Navbar: FC<Props> = ({ leftMenuItems, rightMenuItems }) => {
  // const { userInfo } = useUserInfo();
  const { userInfo } = { userInfo: { _id: '0' } };

  const GridContainerStyles: CSSProperties = {
    height: '10rem',
    position: 'fixed',
    zIndex: 1300,
    backgroundColor: 'rgb(74, 195, 142)',
    maxWidth: '83vw',
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
        <LeftPositionGrid item>
          {/* <Grid container>
            <Grid item>
              <TopBarContainer>
                <NavbarList
                  menuItems={leftMenuItems}
                  position="left"
                  loggedIn={isLoggedIn}
                />
              </TopBarContainer>
            </Grid>
          </Grid> */}
        </LeftPositionGrid>
        <LogoContainer>
          {/* <Logo className={classes.logo} /> */}
          <img src={'org.logo.png'} style={{ width: '100%', height: '100%' }} />
        </LogoContainer>
        <RightPositionGrid item>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item>
              <TopBarContainer>
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
