import { STORAGE_TOKEN_KEY } from '@constants/index';

export const getAccessToken = () => localStorage.getItem(STORAGE_TOKEN_KEY);
