import {
    INPUT_GROUP_TYPE_KEYS,
    RESULT_CARD_TYPE_KEYS,
    RESULT_ICON_TYPE_KEYS,
} from './auth-page.constants';

export type TypeValues = {
    resultCard: (typeof RESULT_CARD_TYPE_KEYS)[keyof typeof RESULT_CARD_TYPE_KEYS];
    resultIcon: (typeof RESULT_ICON_TYPE_KEYS)[keyof typeof RESULT_ICON_TYPE_KEYS];
    inputGroup: (typeof INPUT_GROUP_TYPE_KEYS)[keyof typeof INPUT_GROUP_TYPE_KEYS];
};
