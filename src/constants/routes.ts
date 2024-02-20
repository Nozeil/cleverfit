export const ROUTES = {
    AUTH: '/auth',
    REGISTRATION: 'registration',
    MAIN: '/main',
    RESULT: '/result',
    ERROR_LOGIN: 'error-login',
} as const;

export const COMPOUND_ROUTES = {
    RESULT_ERROR_LOGIN: `${ROUTES.RESULT}/${ROUTES.ERROR_LOGIN}`,
} as const;
