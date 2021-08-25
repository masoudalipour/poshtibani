import { INavbarItem } from '$components/app/Navbar/NavbarList';
// import UserLanguage from '$components/app/Navbar/UserLanguage';
import UserNavbarMenu from '$components/app/Navbar/UserNavbarMenu';

export const adminLeftNavbarItems: INavbarItem[] = [
  {
    label: 'Main Page',
    href: '/admin',
    as: '',
  },
  {
    label: 'Requests',
    href: '/requests',
    as: '',
  },
  {
    label: 'Reports',
    href: '/reports',
    as: '',
  },
];

// TODO: The UserLanguage will be uncomment when we support internationalization in the admin panel
export const adminRightNavbarItems: INavbarItem[] = [
  {
    label: 'Help',
    href: '/Help',
    as: '',
  },
  // {
  //   label: 'UserLanguage',
  //   component: UserLanguage,
  //   as: '',
  // },
  {
    key: 'UserMenu',
    onlyWhenLoggedIn: true,
    component: UserNavbarMenu,
    props: {
      items: [
        {
          label: 'Profile',
          href: '/profile',
        },
        {
          label: 'Logout',
          href: `/api/v1/auth/logout`,
        },
      ],
    },
  },
];
