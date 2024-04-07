import { NAV_MENU_LABELS } from '@constants/index';
import { type TrainingExercise } from '@models/models';

type NavMenuActiveKeys = Omit<typeof NAV_MENU_LABELS, 'DIVIDER' | 'EXIT'>;

export type NavMenuSelectedKey = NavMenuActiveKeys[keyof NavMenuActiveKeys];

export type ExercisesFormValues = {
    [x: string]: Omit<TrainingExercise, 'isImplementation'> & {
        id: number;
        shouldDelete?: boolean;
        isImplementation?: boolean;
    };
};

export type TrainingsTableSortedBy = null | 'asc' | 'dsc';
