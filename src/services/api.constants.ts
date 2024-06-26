export const BASE_URL = 'https://cleverfit-proxy.onrender.com/';
export const AVATAR_BASE_URL = 'https://training-api.clevertec.ru';

export const AUTH_ENDPOINTS = {
    REGISTRATION: 'auth/registration',
    LOGIN: 'auth/login',
    CHECK_EMAIL: 'auth/check-email',
    CONFIRM_EMAIL: 'auth/confirm-email',
    CHANGE_PASSWORD: 'auth/change-password',
} as const;

export const CATALOGS_ENDPOINTS = {
    TRAINING_LIST: 'catalogs/training-list',
    TARIFF_LIST: 'catalogs/tariff-list',
    TRAINING_PALS: 'catalogs/training-pals',
    USER_JOINT_TRAINING_LIST: 'catalogs/user-joint-training-list',
} as const;

export const FEEDBACKS_ENDPOINTS = {
    FEEDBACK: 'feedback',
} as const;

export const TRAINING_ENDPOINTS = {
    TRAINING: 'training',
} as const;

export const USER_ENDPOINTS = {
    ME: 'user/me',
    USER: 'user',
} as const;

export const UPLOAD_IMAGE = `${BASE_URL}upload-image`;

export const TARIFF_ENDPOINTS = {
    TARRIFF: 'tariff',
} as const;

export const INVITE_ENDPOINTS = {
    INVITE: 'invite',
};
