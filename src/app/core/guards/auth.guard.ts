import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Vérifier si l'état d'authentification est valide
    if (!this.authService.validateAuthState()) {
      this.handleAuthFailure(state.url);
      return false;
    }

    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated()) {
      this.handleAuthFailure(state.url);
      return false;
    }

    // Vérifier les rôles requis si spécifiés dans les données de route
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && requiredRoles.length > 0) {
      if (!this.authService.hasAnyRole(requiredRoles)) {
        this.handleUnauthorized();
        return false;
      }
    }

    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  private handleAuthFailure(attemptedUrl: string): void {
    // Stocker l'URL tentée pour la redirection après connexion
    localStorage.setItem('returnUrl', attemptedUrl);
    this.router.navigate(['pages/logo']);
  }

  private handleUnauthorized(): void {
    // Rediriger vers une page d'erreur 403 ou la page d'accueil
    this.router.navigate(['/unauthorized']);
  }
}
