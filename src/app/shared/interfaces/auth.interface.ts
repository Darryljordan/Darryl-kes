import { User } from './user.interface';

export interface LoginRequest {
    phone: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterRequest {
    fullName: string;
    phone: string;
    password: string;
}

export interface ResetPasswordRequest {
    phone: string;
}

export interface NewPasswordRequest {
    phone: string;
    code: string;
    newPassword: string;
    confirmPassword: string;
}

export interface AuthResponse {
    user: User | null;
    token: string;
    refreshToken?: string;
}
