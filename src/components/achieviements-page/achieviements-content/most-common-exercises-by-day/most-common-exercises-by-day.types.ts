import type { TrainingPerPeriodItem } from '@redux/slices/achieviements/achieviements.types';

type ExercisesMapValue = Pick<
    TrainingPerPeriodItem,
    'dm' | 'dmy' | 'dayOfTheWeek' | 'dayOfTheWeekReadable' | 'exerciseNames'
>;

export type ExercisesMap = Map<number, ExercisesMapValue>