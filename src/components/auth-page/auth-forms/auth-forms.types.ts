export type OnFinishLoginValues = {
    email: string;
    password: string;
    remember: boolean;
};

export type OnFinishRegistrationValues = {
    email: string;
    password: string;
    'password-confirm': string;
};

export type OnFinishChangePasswordValues = {
    password: string;
    'password-confirm': string;
};

export type OnFinishAuth = (
    values: OnFinishLoginValues & OnFinishRegistrationValues & OnFinishChangePasswordValues,
) => void;
