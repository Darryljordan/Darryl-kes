export interface User {
    id: string;
    fullName: string;
    phone: string;
    email?: string;
    roles: string[];
    status: 'active' | 'inactive' | 'pending';
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
    preferences?: UserPreferences;
}

export interface UserPreferences {
    theme?: 'light' | 'dark';
    language?: string;
    notifications?: {
        email?: boolean;
        push?: boolean;
        sms?: boolean;
    };
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
}

export interface UserUpdateRequest {
    fullName?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    preferences?: UserPreferences;
}

export interface PasswordChangeRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
