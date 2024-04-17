import { DATE_FORMATS, MOMENT_SET, STORAGE_TOKEN_KEY } from '@constants/index';
import moment from 'moment';

export const getAccessToken = () => localStorage.getItem(STORAGE_TOKEN_KEY);

export const isArrayWithItems = <T>(arr?: T[]) => !!(arr && arr.length);

export const formatDate = (date: moment.MomentInput) => {
    const localISO = moment(date).set(MOMENT_SET).toISOString(true);
    const iso = moment(localISO).format(DATE_FORMATS.ISO);
    const formated = moment(localISO).format(DATE_FORMATS.DMY);

    return { iso, formated };
};

export const calcLoadPerExercise = (weight: number, approaches: number, replays: number) =>
    weight * approaches * replays;

export const capitalizeFirstLetter = (word: string) => word[0].toUpperCase() + word.slice(1);
