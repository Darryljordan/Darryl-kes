import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../features/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('../features/favorite/favorite.page').then((m) => m.FavoritePage),
      },
      {
        path: 'order',
        loadComponent: () =>
          import('../features/order/order.page').then((m) => m.OrderPage),
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('../features/chat/chat.page').then((m) => m.ChatPage),
      },
      {
        path: 'profil',
        loadComponent: () =>
          import('../features/profil/profil.page').then((m) => m.ProfilPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
