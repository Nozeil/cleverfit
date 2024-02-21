export interface OnFinishLoginValues {
    email: string;
    password: string;
    remember: boolean;
}

export interface OnFinishRegistrationValues {
    email: string;
    password: string;
    passwordConfirm: string;
}

export type OnFinishAuth = (values: OnFinishLoginValues & OnFinishRegistrationValues) => void;
