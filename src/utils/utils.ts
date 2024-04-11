import { STORAGE_TOKEN_KEY } from '@constants/index';

export const getAccessToken = () => localStorage.getItem(STORAGE_TOKEN_KEY);

export const isArrayWithItems = <T>(arr?: T[]) => !!(arr && arr.length);
