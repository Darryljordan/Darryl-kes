import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () =>
                import('./order.page').then((m) => m.OrderPage),
            },
            {
                path: ':id',
                loadComponent: () =>
                import('./detail/detail.page').then((m) => m.DetailPage),
            },
        ],
    },
];