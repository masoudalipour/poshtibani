import { ISidebarList } from '$components/app/Sidebar/SidebarList';

export const useAccessIndicator = (menuList: ISidebarList[]): ISidebarList[] => {
  const [, isOrgAdmin] = [false, true];

  return menuList.filter(
    (menuItem) => menuItem.orgAdminItem == null || menuItem.orgAdminItem === isOrgAdmin,
  );
};
