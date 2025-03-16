import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User, UserUpdateRequest, PasswordChangeRequest, UserPreferences } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    // Initialiser l'utilisateur depuis le storage
    const storedUser = this.storageService.get<User>('user_data');
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Mettre à jour l'utilisateur actuel
   */
  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
    if (user) {
      this.storageService.set('user_data', user);
    } else {
      this.storageService.remove('user_data');
    }
  }

  /**
   * Obtenir le profil de l'utilisateur depuis l'API
   */
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`).pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(this.handleError)
    );
  }

  /**
   * Mettre à jour le profil de l'utilisateur
   */
  updateProfile(updateData: UserUpdateRequest): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/profile`, updateData).pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(this.handleError)
    );
  }

  /**
   * Changer le mot de passe
   */
  changePassword(passwordData: PasswordChangeRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/change-password`, passwordData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Mettre à jour les préférences utilisateur
   */
  updatePreferences(preferences: UserPreferences): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/preferences`, { preferences }).pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(this.handleError)
    );
  }

  /**
   * Mettre à jour l'avatar de l'utilisateur
   */
  updateAvatar(file: File): Observable<User> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.post<User>(`${this.apiUrl}/avatar`, formData).pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(this.handleError)
    );
  }

  /**
   * Obtenir la liste des utilisateurs (admin)
   */
  getUsers(page: number = 1, limit: number = 10): Observable<{ users: User[], total: number }> {
    return this.http.get<{ users: User[], total: number }>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtenir un utilisateur par son ID (admin)
   */
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Mettre à jour le statut d'un utilisateur (admin)
   */
  updateUserStatus(userId: string, status: 'active' | 'inactive'): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}/status`, { status }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Supprimer un utilisateur (admin)
   */
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Rechercher des utilisateurs
   */
  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Vérifier si l'email existe déjà
   */
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.post<{ exists: boolean }>(`${this.apiUrl}/check-email`, { email }).pipe(
      map(response => response.exists),
      catchError(this.handleError)
    );
  }

  /**
   * Gestion des erreurs HTTP
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 400:
          errorMessage = error.error.message || 'Requête invalide';
          break;
        case 401:
          errorMessage = 'Non autorisé';
          break;
        case 403:
          errorMessage = 'Accès refusé';
          break;
        case 404:
          errorMessage = 'Utilisateur non trouvé';
          break;
        case 409:
          errorMessage = 'Cet email est déjà utilisé';
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
