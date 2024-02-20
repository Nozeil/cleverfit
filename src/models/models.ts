export interface AuthUserBody {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}
