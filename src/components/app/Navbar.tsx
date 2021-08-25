import React, { CSSProperties, FC, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import rtl from 'styled-components-rtl';

import { layoutContext } from '$lib/layoutContext';
import { useOrgInfo } from '$lib/useOrgInfo';
import { useUserInfo } from '$lib/useUserInfo';

import Logo from '../../../../public/library.svg';

import NavbarList, { INavbarItem } from './NavbarList';

const LogoContainer = styled.a`
  display: inline-block;
  vertical-align: top;
  width: 10rem;
  height: 47px;
  cursor: pointer;
  text-decoration: none;
`;

interface ITopBarContainer {
  isAdminPage?: boolean;
}

const TopBarContainer = styled.div<ITopBarContainer>`
  display: flex;
  height: 48px;
  ${rtl`
    padding-left: ${(props) => (props.isAdminPage ? '0.5rem' : 'inherit')};
    padding-right: ${(props) => (props.isAdminPage ? '2.5rem' : 'inherit')};
  `}
`;

const RightPositionGrid = styled((props) => <Grid {...props} />)`
  ${rtl`
    padding-right: ${(props) => (props.isAdminPage ? 'inherit' : '8vw')};
  `}
`;

const LeftPositionGrid = styled((props) => <Grid {...props} />)`
  ${rtl`
    padding-left:  ${(props) => (props.isAdminPage ? 'inherit' : '7vw')};
  `}
  flex-grow: 1;
`;

interface Props {
  leftMenuItems: INavbarItem[];
  rightMenuItems: INavbarItem[];
}
export const Navbar: FC<Props> = ({ leftMenuItems, rightMenuItems }) => {
  const { isAdminPage } = useContext(layoutContext);
  const orgInfo = useOrgInfo();
  const { userInfo } = useUserInfo();

  const GridContainerStyles: CSSProperties = {
    height: !isAdminPage ? '8.8rem' : '10rem',
    position: 'fixed',
    zIndex: 1300,
    backgroundColor: '#ededed',
  };

  const isLoggedIn = !!userInfo;

  return (
    <>
      <Head>
        <title>{orgInfo.name ?? 'Repository'}</title>
      </Head>
      <Grid
        container
        style={GridContainerStyles}
        justify={'space-between'}
        alignContent="center"
      >
        <LeftPositionGrid item isAdminPage={isAdminPage}>
          <Grid container>
            {!isAdminPage && (
              <Grid item>
                <Link href="/" passHref>
                  <LogoContainer data-cy="navbar-logo">
                    {orgInfo.logo ? (
                      <img src={orgInfo.logo} style={{ width: '100%', height: '100%' }} />
                    ) : (
                      <Logo style={{ width: '100%', height: '100%' }} />
                    )}
                  </LogoContainer>
                </Link>
              </Grid>
            )}
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
          <Grid container justify="flex-end" alignItems="center">
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
