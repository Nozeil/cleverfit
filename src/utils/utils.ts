import { STORAGE_TOKEN_KEY } from '@constants/index';

export const checkAccessToken = () =>
    localStorage.getItem(STORAGE_TOKEN_KEY) || sessionStorage.getItem(STORAGE_TOKEN_KEY);
