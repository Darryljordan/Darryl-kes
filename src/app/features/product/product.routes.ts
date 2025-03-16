import { Routes } from '@angular/router';
import { ProductPage } from './product.page';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () =>
                import('./product.page').then((m) => m.ProductPage),
            },
            {
                path: ':id',
                loadComponent: () =>
                import('./detail/detail.page').then((m) => m.DetailPage),
            },
        ],
    },
];
