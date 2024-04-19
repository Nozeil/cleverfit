export const ROUTES = {
    AUTH: '/auth',
    REGISTRATION: 'registration',
    MAIN: '/main',
    FEEDBACKS: '/feedbacks',
    CALENDAR: '/calendar',
    PROFILE: '/profile',
    ACHIEVEMENTS: '/achievements',
    TRAINING: '/training',
    SETTINGS: '/settings',
    NOT_FOUND: '/404',
    RESULT: '/result',
    ERROR_LOGIN: 'error-login',
    SUCCESS_REGISTRATION: 'success',
    ERROR_USER_EXIST: 'error-user-exist',
    ERROR_REGISTRATION: 'error',
    ERROR_CHECK_EMAIL_NO_EXIST: 'error-check-email-no-exist',
    ERROR_CHECK_EMAIL: 'error-check-email',
    CONFIRM_EMAIL: 'confirm-email',
    CHANGE_PASSWORD: 'change-password',
    ERROR_CHANGE_PASSWORD: 'error-change-password',
    SUCCESS_CHANGE_PASSWORD: 'success-change-password',
} as const;

export const COMPOUND_ROUTES = {
    AUTH_REGISTRATION: `${ROUTES.AUTH}/${ROUTES.REGISTRATION}`,
    RESULT_ERROR_LOGIN: `${ROUTES.RESULT}/${ROUTES.ERROR_LOGIN}`,
    RESULT_SUCCESS_REGISTRATION: `${ROUTES.RESULT}/${ROUTES.SUCCESS_REGISTRATION}`,
    RESULT_ERROR_USER_EXIST: `${ROUTES.RESULT}/${ROUTES.ERROR_USER_EXIST}`,
    RESULT_ERROR_REGISTRATION: `${ROUTES.RESULT}/${ROUTES.ERROR_REGISTRATION}`,
    RESULT_ERROR_CHECK_EMAIL_NO_EXIST: `${ROUTES.RESULT}/${ROUTES.ERROR_CHECK_EMAIL_NO_EXIST}`,
    RESULT_ERROR_CHECK_EMAIL: `${ROUTES.RESULT}/${ROUTES.ERROR_CHECK_EMAIL}`,
    AUTH_CONFIRM_EMAIL: `${ROUTES.AUTH}/${ROUTES.CONFIRM_EMAIL}`,
    AUTH_CHANGE_PASSWORD: `${ROUTES.AUTH}/${ROUTES.CHANGE_PASSWORD}`,
    RESULT_ERROR_CHANGE_PASSWORD: `${ROUTES.RESULT}/${ROUTES.ERROR_CHANGE_PASSWORD}`,
    RESULT_SUCCESS_CHANGE_PASSWORD: `${ROUTES.RESULT}/${ROUTES.SUCCESS_CHANGE_PASSWORD}`,
} as const;
