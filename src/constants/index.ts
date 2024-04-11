export const HTTP_STATUS_CODES = {
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
} as const;

export const ERROR_MESSAGES = {
    EMAIL_NOT_FOUND: 'Email не найден',
} as const;

export const STORAGE_TOKEN_KEY = 'accessToken';

export const WIDTH_540 = 540;

export const NAV_MENU_LABELS = {
    CALENDAR: 'Календарь',
    WORKOUT: 'Тренировки',
    ACHIEVEMENTS: 'Достижения',
    PROFILE: 'Профиль',
    EXIT: 'Выход',
    DIVIDER: 'Divider',
} as const;

export const DATE_FORMATS = {
    ISO: 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]',
    DMY: 'DD.MM.YYYY',
    DM: 'DD.MM',
} as const;

export const FORM_NAMES = {
    EXERCISES_FORM: 'exercise-form',
    TRAINING_INFO_FORM: 'training-info-form',
} as const;

export const TRAINING_COLORS: { [x: string]: string } = {
    Ноги: 'var(--character-light-error)',
    Руки: 'var(--tranie-cyan)',
    Силовая: 'var(--tranie-yellow)',
    Спина: 'var(--tranie-orange)',
    Грудь: 'var(--character-light-success)',
} as const;

export const INVITES_STATUS = {
    ACCEPTED: 'accepted',
    PENDING: 'pending',
    REJECTED: 'rejected',
} as const;

export const EXERCISES_FORM_MODES = {
    EDIT: 'edit',
    VIEW: 'view',
    NEW: 'new',
    JOINT: 'joint',
} as const;

export const SORT_BY = {
    ASC: 'asc',
    DSC: 'dsc',
} as const;
