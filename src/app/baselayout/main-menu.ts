import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Book Token',
    icon: 'home-outline',
    link: '/base/client/home',
    home: true,
  },
  {
    title: 'Manage Bookings',
    icon: 'keypad-outline',
    link: '/base/client/managebooking',
  },
  {
    title: 'login',
    icon: 'keypad-outline',
    link: '/auth/login',
  },
];
