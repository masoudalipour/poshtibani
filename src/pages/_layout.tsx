import React, { FC } from 'react';
import { useRouter } from 'next/router';
import GridSystem from './_grid';
import styled from 'styled-components';
import Navbar from '$components/app/Navbar';
import Sidebar from '$components/app/Sidebar';
import { sidebarTopMenuList } from '$components/layout/menu.config/sidebar.config';
import {
  adminLeftNavbarItems,
  adminRightNavbarItems,
} from '$components/layout/menu.config';

const HeaderContainer = styled.div`
  grid-area: header;
  position: sticky;
  z-index: 1001;
`;

const SidebarContainer = styled.div`
  height: 100vh;
  grid-area: sidebar;
  position: sticky;
  top: 0;
`;

const AdminComponentContainer = styled.div`
  grid-area: body;
  padding: 10px;
  margin: 4rem 2rem;
`;

const AdminContentBodyContainer = styled.div`
  height: 100%;
`;

interface AdminLayoutProps {
  routePathname: string;
}
const AdminLayout: FC<AdminLayoutProps> = (props) => {
  return (
    <>
      <HeaderContainer>
        <Navbar
          leftMenuItems={adminLeftNavbarItems}
          rightMenuItems={adminRightNavbarItems}
        />
      </HeaderContainer>
      <AdminComponentContainer>
        <AdminContentBodyContainer>{props.children}</AdminContentBodyContainer>
      </AdminComponentContainer>
      <SidebarContainer>
        <Sidebar topMenuList={sidebarTopMenuList} pathname={props.routePathname} />
      </SidebarContainer>
    </>
  );
};

export default function Layout(props: any) {
  const router = useRouter();

  return (
    <GridSystem>
      <AdminLayout routePathname={router.pathname}>{props.children}</AdminLayout>
    </GridSystem>
  );
}
