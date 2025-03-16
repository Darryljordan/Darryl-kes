import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { User, UserPreferences, UserUpdateRequest } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let storageService: StorageService;

  const mockUserPreferences: UserPreferences = {
    theme: 'dark' as const,
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    fullName: 'John Doe',
    phone: '677777777',
    roles: ['USER'],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    preferences: mockUserPreferences
  };

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', ['get', 'set', 'remove']);
    
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: StorageService, useValue: storageSpy }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentUser', () => {
    it('should return current user from BehaviorSubject', () => {
      service.setCurrentUser(mockUser);
      expect(service.getCurrentUser()).toEqual(mockUser);
      expect(storageService.set).toHaveBeenCalledWith('user_data', mockUser);
    });
  });

  describe('getUserProfile', () => {
    it('should fetch user profile and update current user', () => {
      service.getUserProfile().subscribe(user => {
        expect(user).toEqual(mockUser);
        expect(service.getCurrentUser()).toEqual(mockUser);
        expect(storageService.set).toHaveBeenCalledWith('user_data', mockUser);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users/profile`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', () => {
      const updateData: UserUpdateRequest = {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        preferences: {
          theme: 'dark' as const,
          notifications: {
            email: true,
            push: true,
            sms: false
          }
        }
      };
      const updatedUser = { ...mockUser, ...updateData };

      service.updateProfile(updateData).subscribe(user => {
        expect(user).toEqual(updatedUser);
        expect(service.getCurrentUser()).toEqual(updatedUser);
        expect(storageService.set).toHaveBeenCalledWith('user_data', updatedUser);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users/profile`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(updateData);
      req.flush(updatedUser);
    });
  });

  describe('changePassword', () => {
    it('should send password change request', () => {
      const passwordData = {
        currentPassword: 'old',
        newPassword: 'new',
        confirmPassword: 'new'
      };

      service.changePassword(passwordData).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/users/change-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(passwordData);
      req.flush({ message: 'Password changed successfully' });
    });
  });

  describe('error handling', () => {
    it('should handle 404 error', () => {
      service.getUserProfile().subscribe({
        error: (error) => {
          expect(error.message).toBe('Not found');
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users/profile`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });

    it('should handle network error', () => {
      service.getUserProfile().subscribe({
        error: (error) => {
          expect(error.message).toBe('Une erreur est survenue');
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users/profile`);
      req.error(new ErrorEvent('Network error'));
    });
  });
});
