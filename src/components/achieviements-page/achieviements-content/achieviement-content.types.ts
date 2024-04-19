import type { TrainingPerPeriodItem } from '@redux/slices/achieviements/achieviements.types';

export type WeekDaysData = Array<
    Pick<TrainingPerPeriodItem, 'dm' | 'dmy' | 'dayOfTheWeek' | 'dayOfTheWeekReadable'> & {
        info: string | number;
    }
>;
