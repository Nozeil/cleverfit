export interface ErrorResponse {
    statusCode: number;
    error: string;
    message: string;
}
export interface AuthUserBody {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}
