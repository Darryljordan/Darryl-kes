import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse, NewPasswordRequest } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { StorageService } from './storage.service';
import { MockService } from './mock.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isApiAvailable = false; // À mettre à true quand l'API sera disponible

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private mockService: MockService,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser() {
    const storedUser = this.storageService.get('user_data') as User | null;
    if (storedUser && this.isValidUser(storedUser)) {
      this.currentUserSubject.next(storedUser);
    }
  }

  private isValidUser(user: any): user is User {
    return user &&
      typeof user.id === 'string' &&
      typeof user.fullName === 'string' &&
      typeof user.phone === 'string' &&
      Array.isArray(user.roles) &&
      typeof user.status === 'string' &&
      user.createdAt instanceof Date &&
      user.updatedAt instanceof Date;
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    if (this.isApiAvailable) {
      return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, request).pipe(
        tap(this.handleAuthResponse.bind(this)),
        catchError(this.handleError)
      );
    }
    return this.mockService.login(request).pipe(
      tap(this.handleAuthResponse.bind(this))
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    if (this.isApiAvailable) {
      return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, request).pipe(
        tap(this.handleAuthResponse.bind(this)),
        catchError(this.handleError)
      );
    }
    return this.mockService.register(request).pipe(
      tap(this.handleAuthResponse.bind(this))
    );
  }

  private handleAuthResponse(response: AuthResponse) {
    if (response.user) {
      this.storageService.set('auth_token', response.token);
      this.storageService.set('refresh_token', response.refreshToken);
      this.storageService.set('user_data', response.user);
      this.currentUserSubject.next(response.user);
    }
  }

  logout(): void {
    if (this.isApiAvailable) {
      this.http.post(`${environment.apiUrl}/auth/logout`, {}).pipe(
        catchError(this.handleError)
      ).subscribe({
        complete: () => this.handleLogout()
      });
    } else {
      this.handleLogout();
    }
  }

  private handleLogout(): void {
    this.storageService.remove('auth_token');
    this.storageService.remove('refresh_token');
    this.storageService.remove('user_data');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  validateAuthState(): boolean {
    const token = this.storageService.get('auth_token');
    const user = this.getCurrentUser();
    
    if (!token || !user) {
      this.handleLogout();
      return false;
    }
    
    return true;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.roles.includes(role) : false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? user.roles.some(role => roles.includes(role)) : false;
  }

  requestPasswordReset(request: { phone: string }): Observable<void> {
    if (this.isApiAvailable) {
      return this.http.post<void>(`${environment.apiUrl}/auth/reset-password-request`, request).pipe(
        catchError(this.handleError)
      );
    }
    return this.mockService.requestPasswordReset(request.phone);
  }

  setNewPassword(request: NewPasswordRequest): Observable<void> {
    if (this.isApiAvailable) {
      return this.http.post<void>(`${environment.apiUrl}/auth/reset-password`, request).pipe(
        catchError(this.handleError)
      );
    }
    return this.mockService.resetPassword(request.phone, request.code, request.newPassword);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.storageService.get('refresh_token');
    if (!refreshToken) {
      return of({ user: null, token: '', refreshToken: '' });
    }

    if (this.isApiAvailable) {
      return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh-token`, { refreshToken }).pipe(
        tap(this.handleAuthResponse.bind(this)),
        catchError(() => {
          this.logout();
          return of({ user: null, token: '', refreshToken: '' });
        })
      );
    }

    // En mode mock, on renouvelle simplement le token
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return of({ user: null, token: '', refreshToken: '' });
    }

    return of({
      user: currentUser,
      token: 'mock-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    }).pipe(
      tap(this.handleAuthResponse.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = error.error.message || 'Requête invalide';
          break;
        case 401:
          errorMessage = 'Identifiants invalides';
          break;
        case 403:
          errorMessage = 'Accès refusé';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée';
          break;
        case 409:
          errorMessage = 'Ce numéro de téléphone est déjà utilisé';
          break;
        case 422:
          errorMessage = 'Données invalides';
          break;
        default:
          errorMessage = 'Erreur serveur';
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
