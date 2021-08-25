import { INavbarItem } from '$components/app/Navbar/NavbarList';
// import UserLanguage from '$components/app/Navbar/UserLanguage';
import UserNavbarMenu from '$components/app/Navbar/UserNavbarMenu';

export const adminLeftNavbarItems: INavbarItem[] = [
  {
    label: 'صفحه اصلی',
    href: '/',
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
    key: 'UserMenu',
    onlyWhenLoggedIn: true,
    component: UserNavbarMenu,
    props: {
      items: [
        {
          label: 'پروفایل',
          href: '/profile',
        },
        {
          label: 'خروج',
          href: `/api/v1/auth/logout`,
        },
      ],
    },
  },
];
