export interface OnFinishLoginValues {
    email: string;
    password: string;
    remember: boolean;
}

export interface OnFinishRegistrationValues {
    email: string;
    password: string;
    'password-confirm': string;
}

export interface OnFinishChangePasswordValues {
    password: string;
    'password-confirm': string;
}

export type OnFinishAuth = (
    values: OnFinishLoginValues & OnFinishRegistrationValues & OnFinishChangePasswordValues,
) => void;
