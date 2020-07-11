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
  }
];

export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Start Session',
    icon: 'home-outline',
    link: '/base/admin/home',
    home:true,
  }
];
