import { INavbarItem } from '$components/app/Navbar/NavbarList';
import UserNavbarMenu from '$components/app/Navbar/UserNavbarMenu';

export const adminLeftNavbarItems: INavbarItem[] = [
  {
    label: 'صفحه اصلی',
    href: '/',
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
          href: '',
        },
        {
          label: 'خروج',
          href: ``,
        },
      ],
    },
  },
];
