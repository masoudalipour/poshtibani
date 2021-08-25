import React from 'react';

import { ISidebarList } from '$components/app/Sidebar/SidebarList';
import { Icon } from '$components/shared';

import SettingsIcon from '../../../../public/icons/sidebar/settings.svg';
import ToolIcon from '../../../../public/icons/sidebar/tools.svg';

const logoStyle = { width: '100%', height: '100%', fontSize: '3.2rem', color: '#fff' };

const getItemWithAbsoluteHref = (item, prefixPath) => {
  return { ...item, href: `${prefixPath}${item.href}` };
};

const concatAdminPath = (item: ISidebarList) => {
  const _item = { ...item, href: `/admin${item.href}` };

  if (_item.child) {
    _item.child = _item.child.map((childItem) =>
      getItemWithAbsoluteHref(childItem, _item.href),
    );
  }

  return _item;
};

export const sidebarTopMenuList: ISidebarList[] = [
  {
    label: 'Home',
    href: '',
    icon: <Icon style={logoStyle} icon="Home" />,
  },
  {
    label: 'User Management',
    href: '/user-management',
    icon: <Icon style={logoStyle} icon="Users" />,
    child: [
      {
        label: 'Users',
        href: '/users',
        orgAdminItem: true,
      },
      {
        label: 'Authority Groups',
        href: '/authorityGroups',
        orgAdminItem: true,
      },
      {
        label: 'Collection Access Management',
        href: '/authorizationRules',
      },
    ],
  },

  {
    label: 'Schemas',
    href: '/schemas',
    icon: <Icon style={logoStyle} icon="Schema" />,
    orgAdminItem: true,
  },
  {
    label: 'Trees',
    href: '/jungle',
    icon: <Icon style={logoStyle} icon="Tree" />,
    orgAdminItem: true,
  },
  {
    label: 'Plugins',
    href: '/plugins',
    icon: <Icon style={logoStyle} icon="Plugin" />,
  },
].map(concatAdminPath);

export const sidebarBottomMenuList: ISidebarList[] = [
  {
    label: 'Tools',
    href: '/tools',
    icon: <ToolIcon style={logoStyle} />,
    bold: true,
    orgAdminItem: true,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <SettingsIcon style={logoStyle} />,
    bold: true,
    orgAdminItem: true,
    child: [
      {
        label: 'Dictionaries',
        href: '/dictionaries',
        orgAdminItem: true,
      },
    ],
  },
].map(concatAdminPath);
