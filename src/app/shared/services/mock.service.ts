import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, UserPreferences } from '../interfaces/user.interface';
import { LoginRequest, RegisterRequest, AuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private users: User[] = [];
  private readonly MOCK_DELAY = 500; // Simule un délai réseau

  constructor() {
    // Initialiser quelques utilisateurs de test
    this.users.push({
      id: '1',
      fullName: 'John Doe',
      phone: '677777777',
      email: 'john@example.com',
      roles: ['USER'],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          sms: true
        }
      }
    });
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    const user = this.users.find(u => u.phone === request.phone);
    if (!user) {
      return throwError(() => new Error('Identifiants invalides'));
    }

    return of({
      user,
      token: 'mock-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    }).pipe(delay(this.MOCK_DELAY));
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    if (this.users.some(u => u.phone === request.phone)) {
      return throwError(() => new Error('Ce numéro de téléphone est déjà utilisé'));
    }

    const newUser: User = {
      id: Date.now().toString(),
      fullName: request.fullName,
      phone: request.phone,
      roles: ['USER'],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          sms: true
        }
      }
    };

    this.users.push(newUser);

    return of({
      user: newUser,
      token: 'mock-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    }).pipe(delay(this.MOCK_DELAY));
  }

  getUserProfile(userId: string): Observable<User> {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      return throwError(() => new Error('Utilisateur non trouvé'));
    }
    return of(user).pipe(delay(this.MOCK_DELAY));
  }

  updateProfile(userId: string, updates: Partial<User>): Observable<User> {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return throwError(() => new Error('Utilisateur non trouvé'));
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date()
    };
    this.users[userIndex] = updatedUser;

    return of(updatedUser).pipe(delay(this.MOCK_DELAY));
  }

  changePassword(userId: string, currentPassword: string, newPassword: string): Observable<void> {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      return throwError(() => new Error('Utilisateur non trouvé'));
    }
    // Simuler la vérification du mot de passe
    return of(void 0).pipe(delay(this.MOCK_DELAY));
  }

  requestPasswordReset(phone: string): Observable<void> {
    const user = this.users.find(u => u.phone === phone);
    if (!user) {
      return throwError(() => new Error('Utilisateur non trouvé'));
    }
    return of(void 0).pipe(delay(this.MOCK_DELAY));
  }

  resetPassword(phone: string, code: string, newPassword: string): Observable<void> {
    const user = this.users.find(u => u.phone === phone);
    if (!user) {
      return throwError(() => new Error('Code invalide ou expiré'));
    }
    return of(void 0).pipe(delay(this.MOCK_DELAY));
  }
}
