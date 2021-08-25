import { useRouter } from 'next/router';
import GridSystem from './_grid';
import styled from 'styled-components';
import Navbar from '$components/app/Navbar';
import Sidebar from '$components/app/Sidebar';
import {
  appLeftNavbarItems,
  appRightNavbarItems,
} from '$components/app/Navbar/navbar.config';
import {
  sidebarBottomMenuList,
  sidebarTopMenuList,
} from '$components/app/Sidebar/sidebar.config';

const HeaderContainer = styled.div`
  grid-area: header;
  position: sticky;
  z-index: 1001;
`;

const ComponentContainer = styled.div`
  grid-area: body;
  padding: 10px;
  margin: 2rem 0rem;
`;

const SidebarContainer = styled.div`
  height: 100vh;
  grid-area: sidebar;
  position: sticky;
  top: 0;
`;

export default function Layout(props: any) {
  const router = useRouter();

  return (
    <GridSystem>
      <>
        {/* <HeaderContainer>
          <Navbar
            leftMenuItems={appLeftNavbarItems({ redirectPath: router.asPath })}
            rightMenuItems={appRightNavbarItems}
          />
        </HeaderContainer> */}
        <ComponentContainer>{props.children}</ComponentContainer>
        {/* <SidebarContainer>
          <Sidebar
            bottomMenuList={sidebarBottomMenuList}
            topMenuList={sidebarTopMenuList}
            pathname={props.routePathname}
          />
        </SidebarContainer> */}
      </>
    </GridSystem>
  );
}
