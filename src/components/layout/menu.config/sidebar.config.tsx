import React from 'react';

import { ISidebarList } from '$components/app/Sidebar/SidebarList';
import { Icon } from '$components/shared';

const logoStyle = { width: '100%', height: '100%', fontSize: '3.2rem', color: '#fff' };

const getItemWithAbsoluteHref = (item, prefixPath) => {
  return { ...item, href: `${prefixPath}${item.href}` };
};

const concatAdminPath = (item: ISidebarList) => {
  const _item = { ...item, href: `/${item.href}` };

  if (_item.child) {
    _item.child = _item.child.map((childItem) =>
      getItemWithAbsoluteHref(childItem, _item.href),
    );
  }

  return _item;
};

export const sidebarTopMenuList: ISidebarList[] = [
  {
    label: 'صفحه اصلی',
    href: '',
    icon: <Icon style={logoStyle} icon="Home" />,
  },
  {
    label: 'فناوری اطلاعات',
    href: '/#',
    icon: <Icon style={logoStyle} icon="Folder" />,
    // child: [
    //   {
    //     label: 'آیتم ۱',
    //     href: '/users',
    //     orgAdminItem: true,
    //   },
    //   {
    //     label: 'آیتم ۲',
    //     href: '/authorityGroups',
    //     orgAdminItem: true,
    //   },
    //   {
    //     label: 'آیتم ۳',
    //     href: '/authorizationRules',
    //   },
    // ],
  },

  {
    label: 'اداری، مالی و پشتیبانی',
    href: '/#',
    icon: <Icon style={logoStyle} icon="Folder" />,
    orgAdminItem: true,
  },
  {
    label: 'مالی',
    href: '/#',
    icon: <Icon style={logoStyle} icon="Folder" />,
    orgAdminItem: true,
  },
  {
    label: 'آموزش',
    href: '/#',
    icon: <Icon style={logoStyle} icon="Folder" />,
  },
  {
    label: 'بیمه تکمیلی',
    href: '/#',
    icon: <Icon style={logoStyle} icon="Folder" />,
  },
  {
    label: 'رفاه',
    href: '/#',
    icon: <Icon style={logoStyle} icon="Folder" />,
  },
].map(concatAdminPath);
