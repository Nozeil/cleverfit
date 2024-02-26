export interface ErrorResponse {
    status: number;
    data: { statusCode: number; error: string; message: string };
}

export interface AuthUserBody {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface CheckEmailBody {
    email: string;
}

export interface CheckEmailResponse {
    email: string;
    message: string;
}

export interface ConfirmEmailBody {
    email: string;
    code: string;
}

export interface ConfirmEmailResponse {
    email: string;
    message: string;
}

export interface ChangePasswordBody {
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordResponse {
    message: string;
}
