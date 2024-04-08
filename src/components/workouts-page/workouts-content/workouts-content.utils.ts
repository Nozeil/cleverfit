import { DATE_FORMATS } from '@constants/index';
import moment from 'moment';

export const formatExerciseDate = (date: moment.Moment | string | null) => {
    const localISO = moment(date)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISOString(true);
    const iso = moment(localISO).format(DATE_FORMATS.ISO);
    const formated = moment(localISO).format(DATE_FORMATS.DMY);

    return { iso, formated };
};
