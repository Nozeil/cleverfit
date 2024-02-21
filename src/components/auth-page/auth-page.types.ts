import {
    INPUT_GROUP_TYPE_KEYS,
    RESULT_CARD_TYPE_KEYS,
    RESULT_ICON_TYPE_KEYS,
} from './auth-page.constants';

export type ResultCardTypeValues =
    (typeof RESULT_CARD_TYPE_KEYS)[keyof typeof RESULT_CARD_TYPE_KEYS];

export type ResultIconTypeValues =
    (typeof RESULT_ICON_TYPE_KEYS)[keyof typeof RESULT_ICON_TYPE_KEYS];

export type InputGroupTypeValues =
    (typeof INPUT_GROUP_TYPE_KEYS)[keyof typeof INPUT_GROUP_TYPE_KEYS];
