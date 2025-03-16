import { Routes } from '@angular/router';
import {  EstablishmentPage} from './establishment.page';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () =>
                import('./establishment.page').then((m) => m.EstablishmentPage),
            },
            {
                path: ':id',
                loadComponent: () =>
                import('./detail/detail.page').then((m) => m.DetailPage),
            },
        ],
    },
];
