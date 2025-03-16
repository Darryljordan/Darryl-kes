import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoPage } from './pages/logo/logo.page';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'product',
    loadChildren: () => import('./features/product/product.routes').then( m => m.routes)
  },
  {
    path: 'establishment',
    loadChildren: () => import('./features/establishment/establishment.routes').then( m => m.routes)
  },
  {
    path: 'order',
    loadChildren: () => import('./features/order/order.routes').then( m => m.routes)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/registration/registration.page').then( m => m.RegistrationPage)
  },
  {
    path: 'auth/reset-password',
    loadComponent: () => import('./features/auth/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'onboard',
    loadComponent: () => import('./features/onboard/onboard.page').then( m => m.OnboardPage)
  },
  {
    path: 'pages/logo',
    loadComponent: () => import('./pages/logo/logo.page').then( m => m.LogoPage)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
