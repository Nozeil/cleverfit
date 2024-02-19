import { ROUTES } from '@constants/routes';

export const AUTH_URLS = {
    AUTH: `/${ROUTES.AUTH}`,
    REGISTRATION: `/${ROUTES.AUTH}/${ROUTES.REGISTRATION}`,
} as const;
